type RateLimitBinding = {
  limit: (input: { key: string }) => Promise<{ success: boolean }>;
};

interface Env {
  CONTACT_TO: string;
  MAIL_FROM: string;
  RESEND_API_KEY: string;
  TURNSTILE_SECRET: string;
  CONTACT_RATE_LIMITER?: RateLimitBinding;
}

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
  formStartedAt?: unknown;
  turnstileToken?: unknown;
};

type TurnstileResponse = {
  success: boolean;
  action?: string;
  hostname?: string;
};

const allowedOrigins = new Set([
  "https://tomsimko.com",
  "https://www.tomsimko.com",
]);

const allowedTurnstileHosts = new Set([
  "tomsimko.com",
  "www.tomsimko.com",
]);

const maxBodyBytes = 20_000;
const maxMessageLength = 5_000;

function responseHeaders(origin?: string): Headers {
  const headers = new Headers({
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=UTF-8",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    Vary: "Origin",
  });

  if (origin && allowedOrigins.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Headers", "content-type");
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    headers.set("Access-Control-Max-Age", "86400");
  }

  return headers;
}

function jsonResponse(status: number, body: Record<string, boolean>, origin?: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders(origin),
  });
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function textValue(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const valueWithoutControls = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  const trimmed = valueWithoutControls.trim();
  return trimmed.length > 0 && trimmed.length <= maxLength ? trimmed : null;
}

async function hashKey(value: string): Promise<string> {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function readPayload(request: Request): Promise<ContactPayload | null> {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maxBodyBytes) return null;

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > maxBodyBytes) return null;

  try {
    const payload: unknown = JSON.parse(raw);
    return isPlainObject(payload) ? payload as ContactPayload : null;
  } catch {
    return null;
  }
}

async function validateTurnstile(token: string, request: Request, secret: string): Promise<boolean> {
  try {
    const verificationResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        remoteip: request.headers.get("CF-Connecting-IP") ?? undefined,
        idempotency_key: crypto.randomUUID(),
      }),
    });

    if (!verificationResponse.ok) return false;
    const verification = await verificationResponse.json() as TurnstileResponse;
    return verification.success
      && verification.action === "contact"
      && typeof verification.hostname === "string"
      && allowedTurnstileHosts.has(verification.hostname);
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") ?? undefined;

    if (request.method === "OPTIONS") {
      return origin && allowedOrigins.has(origin)
        ? new Response(null, { status: 204, headers: responseHeaders(origin) })
        : jsonResponse(403, { ok: false });
    }

    if (request.method !== "POST" || !origin || !allowedOrigins.has(origin)) {
      return jsonResponse(403, { ok: false }, origin);
    }

    if (request.headers.get("Content-Type")?.split(";", 1)[0].trim().toLowerCase() !== "application/json") {
      return jsonResponse(415, { ok: false }, origin);
    }

    const payload = await readPayload(request);
    if (!payload) return jsonResponse(400, { ok: false }, origin);

    const honeypot = typeof payload.website === "string" ? payload.website.trim() : "";
    if (honeypot) return jsonResponse(200, { ok: true }, origin);

    const ipAddress = request.headers.get("CF-Connecting-IP") ?? "unknown";
    if (env.CONTACT_RATE_LIMITER) {
      const rate = await env.CONTACT_RATE_LIMITER.limit({ key: await hashKey(`contact:${ipAddress}`) });
      if (!rate.success) return jsonResponse(429, { ok: false }, origin);
    }

    const name = textValue(payload.name, 120);
    const email = textValue(payload.email, 254)?.toLowerCase();
    const message = textValue(payload.message, maxMessageLength);
    const token = textValue(payload.turnstileToken, 2048);
    const formStartedAt = typeof payload.formStartedAt === "number" ? payload.formStartedAt : Number(payload.formStartedAt);
    const elapsed = Date.now() - formStartedAt;

    if (!name || !email || !message || message.length < 2 || !token
      || /[\r\n]/u.test(name)
      || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(email)
      || !Number.isFinite(formStartedAt) || elapsed < 2500 || elapsed > 7_200_000) {
      return jsonResponse(400, { ok: false }, origin);
    }

    if (!env.TURNSTILE_SECRET || !(await validateTurnstile(token, request, env.TURNSTILE_SECRET))) {
      return jsonResponse(400, { ok: false }, origin);
    }

    if (!env.CONTACT_TO || !env.MAIL_FROM || !env.RESEND_API_KEY) {
      return jsonResponse(503, { ok: false }, origin);
    }

    try {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.MAIL_FROM,
          to: [env.CONTACT_TO],
          reply_to: email,
          subject: `Website contact from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        }),
      });

      if (!emailResponse.ok) return jsonResponse(502, { ok: false }, origin);
    } catch {
      return jsonResponse(502, { ok: false }, origin);
    }

    return jsonResponse(200, { ok: true }, origin);
  },
} satisfies { fetch: (request: Request, env: Env) => Promise<Response> };
