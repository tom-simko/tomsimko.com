# tomsimko.com

Personal website for Tomáš Šimko, built as a bilingual, static Next.js site.

## Stack

- Next.js App Router and TypeScript
- Tailwind CSS with custom editorial CSS
- Framer Motion for restrained entrance/reveal motion
- Lucide React for interface icons
- Static export compatible with GitHub Pages, Cloudflare Pages, Vercel, and conventional static hosting

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site is available at `/sk/` and `/en/`; `/` selects a language using the saved choice or browser language.

## Checks and production build

```bash
npm run typecheck
npm run lint
npm run build
```

The static output is written to `out/` by Next.js. Deploy that directory to a static host, or let Vercel/Cloudflare Pages build the project from the repository.

## GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The workflow builds `out/` and publishes it automatically on pushes to `main`.

The included `public/CNAME` targets `tomsimko.com`. Point the domain’s DNS at GitHub Pages using the current GitHub Pages DNS instructions, then add the custom domain in the repository’s Pages settings.

## Content and links

All visible bilingual copy is stored in [content/site-content.ts](./content/site-content.ts). The verified external links currently included are [liva.sk](https://liva.sk) and [ditoconsulting.com](https://ditoconsulting.com). The Shipendo card intentionally has no link because no verified URL was present in the source material.

## Private contact form

The public site contains no recipient email address or `mailto:` link. The contact form posts to a separate Cloudflare Worker at `api.tomsimko.com`, which keeps the recipient and mail credentials in encrypted Worker secrets. The Worker also validates Cloudflare Turnstile server-side, rejects cross-origin requests, applies a 5-per-minute rate limit, uses a honeypot and timing check, caps payload sizes, and sends plain-text mail through Resend with the visitor’s address as `Reply-To`.

One-time setup:

1. Create a Turnstile widget for `tomsimko.com` and keep its **sitekey** and **secret key**.
2. Verify `tomsimko.com` in Resend and choose a verified sender address.
3. Authenticate Wrangler and add the Worker secrets without putting their values in Git:

   ```bash
   npx wrangler login
   npx wrangler secret put CONTACT_TO
   npx wrangler secret put MAIL_FROM
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put TURNSTILE_SECRET
   npm run worker:deploy
   ```

   Enter the private inbox as `CONTACT_TO`, the verified sender as `MAIL_FROM`, and the Turnstile secret when prompted. The `wrangler.toml` custom domain creates `api.tomsimko.com`; remove any pre-existing `api` CNAME before deploying if Cloudflare reports a conflict.
4. In GitHub, add a repository **Actions variable** named `NEXT_PUBLIC_TURNSTILE_SITE_KEY` containing only the public Turnstile sitekey. Push or manually run the Pages workflow once more.

Do not put the recipient address, Resend key, Turnstile secret, or a Worker `.dev.vars` file in this repository.

## Replacing the headshot

Keep the original source at `public/images/tomas-simko-headshot-original.jpg`. The framed derivative used by the site is `public/images/tomas-simko-headshot-edited.png`, with optimized `tomas-simko-headshot.webp` and `tomas-simko-headshot.avif` variants alongside it. The hero uses the WebP variant with a 4:5 presentation.

To recreate image variants, use any image tool that preserves the face and crops to the head and upper torso. Keep the source and optimized files local; do not replace the portrait with a stock or generated image.
