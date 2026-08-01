"use client";

import { ArrowUpRight, Send } from "lucide-react";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import type { SiteContent } from "../content/site-content";
import { Reveal } from "./reveal";

type TurnstileApi = {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme: "light";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (widgetId?: string) => void;
  getResponse: (widgetId?: string) => string;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "https://api.tomsimko.com/contact";
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export function ContactSection({ content }: { content: SiteContent["contact"] }) {
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileIdRef = useRef<string>();
  const startedAtRef = useRef(Date.now());
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const mountTurnstile = useCallback(() => {
    if (!turnstileSiteKey || !turnstileRef.current || !window.turnstile || turnstileIdRef.current) return;

    turnstileIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: turnstileSiteKey,
      action: "contact",
      theme: "light",
      callback: () => setTurnstileReady(true),
      "expired-callback": () => setTurnstileReady(false),
      "error-callback": () => setTurnstileReady(false),
    });
  }, []);

  useEffect(() => {
    mountTurnstile();
  }, [mountTurnstile]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSending) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const token = turnstileIdRef.current && window.turnstile
      ? window.turnstile.getResponse(turnstileIdRef.current)
      : "";

    if (!turnstileSiteKey || !turnstileReady || !token) {
      setStatus(content.error);
      return;
    }

    setIsSending(true);
    setStatus(null);

    try {
      const controller = new AbortController();
      const abortId = window.setTimeout(() => controller.abort(), 15000);
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          message: String(data.get("message") ?? "").trim(),
          website: String(data.get("website") ?? ""),
          formStartedAt: startedAtRef.current,
          turnstileToken: token,
        }),
        signal: controller.signal,
      });
      window.clearTimeout(abortId);

      if (!response.ok) throw new Error("Contact request failed");

      form.reset();
      startedAtRef.current = Date.now();
      if (turnstileIdRef.current && window.turnstile) {
        window.turnstile.reset(turnstileIdRef.current);
      }
      setTurnstileReady(false);
      setStatus(content.success);
    } catch {
      setStatus(content.error);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Reveal>
      {turnstileSiteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={mountTurnstile}
        />
      ) : null}
      <div className="contact-block">
        <p className="contact-label mono-label">{content.label}</p>
        <h2 className="contact-title">{content.title}</h2>
        <p className="contact-body">{content.body}</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-grid">
            <label className="form-field">
              <span className="form-label">{content.nameLabel} <span aria-hidden="true">*</span></span>
              <input
                className="form-input"
                name="name"
                type="text"
                placeholder={content.namePlaceholder}
                autoComplete="name"
                maxLength={120}
                required
              />
            </label>
            <label className="form-field">
              <span className="form-label">{content.emailLabel} <span aria-hidden="true">*</span></span>
              <input
                className="form-input"
                name="email"
                type="email"
                placeholder={content.emailPlaceholder}
                autoComplete="email"
                maxLength={254}
                required
              />
            </label>
          </div>
          <label className="form-field">
            <span className="form-label">{content.messageLabel} <span aria-hidden="true">*</span></span>
            <textarea
              className="form-input form-textarea"
              name="message"
              placeholder={content.messagePlaceholder}
              maxLength={5000}
              rows={6}
              required
            />
          </label>
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          {turnstileSiteKey ? <div className="turnstile-shell" ref={turnstileRef} /> : null}
          <div className="contact-actions">
            <button className="button contact-button" type="submit" disabled={isSending}>
              <Send size={16} aria-hidden="true" />
              {isSending ? content.sending : content.button}
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
            <span className="contact-secondary">{content.secondary}</span>
          </div>
          <p className="form-security">{content.security}</p>
          <p className="form-status" role="status" aria-live="polite">{status}</p>
        </form>
      </div>
    </Reveal>
  );
}
