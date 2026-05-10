# Preeway Pressure Washing SPC — Smart Site MVP

Professional graffiti removal and pressure washing for the I-5 corridor (Tacoma, Seattle, King County, Pierce County) — built as a social-purpose exterior restoration company.

## Stack

- **Frontend**: [Astro](https://astro.build) with TypeScript
- **Styling**: Tailwind CSS (custom Synthia design system tokens)
- **Fonts**: Playfair Display · DM Mono · Lato
- **Deployment**: Cloudflare Pages / Workers (via `@astrojs/cloudflare`)
- **i18n**: English + Spanish (built-in Astro i18n routing)

## Design System

| Token | Value |
|-------|-------|
| Primary Gold | `#c4963c` |
| Accent Green | `#5a7a52` |
| Dark | `#0a1108` |
| Surface | `#1a2a1a` |
| Text | `#f5f0e8` |
| Muted | `#8a9e7e` |

## Project Structure

```
/src
  /components       # Astro UI components
  /i18n             # English + Spanish translations + helper
  /lib              # TypeScript types + agent logic
  /pages
    index.astro     # English site (/)
    /es/index.astro # Spanish site (/es)
    /api            # API route handlers
  /worker           # Cloudflare Worker stub
/public
  llms.txt
  service-profile.json
  pricing-assumptions.json
```

## Development

```bash
npm install
npm run dev        # http://localhost:4321
```

## Build & Lint

```bash
npm run build      # Production build → dist/
npm run lint       # tsc --noEmit && astro check
npm run preview    # Preview production build
```

## Deploy to Cloudflare Pages

1. Connect GitHub repo to Cloudflare Pages
2. Build command: `npm run build`
3. Output directory: `dist`
4. Node.js version: 20+

Or via Wrangler: `npx wrangler pages deploy dist`

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/quote` | Submit a quote request |
| POST | `/api/agent` | Preeway Scout classification |
| GET | `/api/tenant` | Company config |
| GET | `/api/health` | Health check |

## i18n

- English: `/` (default)
- Spanish: `/es/`

## Agent / Scout Logic

Preeway Scout always flags for human review: final pricing, legal statements, grant submissions, refunds, public commitments.

## Legal Notes

- Washington Social Purpose Corporation (SPC) — not a nonprofit
- SPC status does **not** make donations automatically tax-deductible

## License

Proprietary — Preeway Pressure Washing SPC © 2025
