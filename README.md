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

## Replacing the headshot

Keep the original source at `public/images/tomas-simko-headshot-original.jpg`. The framed derivative used by the site is `public/images/tomas-simko-headshot-edited.png`, with optimized `tomas-simko-headshot.webp` and `tomas-simko-headshot.avif` variants alongside it. The hero uses the WebP variant with a 4:5 presentation.

To recreate image variants, use any image tool that preserves the face and crops to the head and upper torso. Keep the source and optimized files local; do not replace the portrait with a stock or generated image.
