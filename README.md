# Fimber Elemuwa — Portfolio

Personal portfolio and technical blog for [fimberelemuwa.com](https://fimberelemuwa.com).

Built with React, Vite, Tailwind CSS, and static prerendering for SEO and LLM-friendly crawling.

## Run locally

**Prerequisites:** Node.js 18+

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and set `VITE_SITE_URL` (optional) and `GEMINI_API_KEY` if using AI features in the admin panel
3. Start dev server: `npm run dev`

## Build

```bash
npm run build
```

Generates `dist/` with prerendered routes (`/`, `/blog`, `/writing/:id`), `sitemap.xml`, `robots.txt`, and `llms.txt`.

## Deploy

Serve the `dist/` folder as static files. Ensure each prerendered path (e.g. `/blog`, `/writing/post-id`) resolves to its `index.html`.
