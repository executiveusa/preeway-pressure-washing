# Preeway Pressure Washing SPC — Smart Site MVP

Professional graffiti removal and pressure washing for the I-5 corridor (Tacoma, Seattle, King County, Pierce County) — built as a social-purpose exterior restoration company.

## Stack

- **Frontend**: [Astro](https://astro.build) with TypeScript
- **Styling**: Tailwind CSS (custom Synthia design system tokens)
- **Fonts**: Playfair Display · DM Mono · Lato
- **Deployment**: Vercel (via `@astrojs/vercel`) · Cloudflare Workers path available via `wrangler.toml`
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
  /components       # Astro UI components (all images via manifest loader)
  /i18n             # English + Spanish translations + helper
  /lib
    images.ts       # Image manifest loader — all image access goes through here
    agent.ts        # Preeway Scout classification logic
    types.ts        # Shared TypeScript types
  /pages
    index.astro     # English site (/)
    /es/index.astro # Spanish site (/es)
    /api            # API route handlers
  /worker           # Cloudflare Worker stub
/public
  /images
    image-manifest.json          # ← image registry (see below)
    01_hero_graffiti_removal_seattle.jpg
    02_pain_vandalized_storefront_seattle.jpg
    03_service_graffiti_closeup.jpg
    04_service_mural_recovery.jpg
    05_service_pressure_wash_before_after.jpg
    06_social_community_cleanup.jpg
    07_artist_mural_creation.jpg
    08_sponsor_neighborhood_transformation.jpg
    09_quote_flow_customer_interaction.jpg
    10_gallery_proof_collage.jpg
  llms.txt
  service-profile.json
  pricing-assumptions.json
/tools/vercel-agent
  vercelClient.ts   # Vercel API wrapper
  check-deployment.ts  # Deployment status checker
/.claude/skills
  deploy-vercel/    # Vercel deployment runbook
  e2e-test/         # E2E testing skill
  diagnose/         # Debugging skill
  tdd/              # TDD workflow skill
```

## Image System

### How images are managed

All images are registered in `/public/images/image-manifest.json`. **No image paths are hardcoded inside components** — every component imports from `src/lib/images.ts`.

### Adding or replacing an image

1. **Upload** the new file to `/public/images/` using the exact filename from the manifest.
2. **Name it** according to the naming convention: `NN_section_description_location.jpg`
   - `NN` = 2-digit sequence number matching the manifest slot
   - `section` = section ID (hero, pain, services, etc.)
   - `description` = short keyword description
   - `location` = city/region
3. **Update the manifest** (`/public/images/image-manifest.json`) with correct metadata.
4. No component code changes needed — the manifest loader picks it up automatically.

### Naming rules

| Prefix | Section | Placement |
|--------|---------|-----------|
| `01_` | hero | Homepage hero background |
| `02_` | pain | Pain point section |
| `03_` | services | Graffiti removal card |
| `04_` | services | Mural recovery card |
| `05_` | services | Pressure wash before/after |
| `06_` | social-purpose | Community cleanup |
| `07_` | artist-partnership | Artist/mural creation |
| `08_` | sponsor | Neighborhood transformation |
| `09_` | quote-flow | Customer consultation |
| `10_` | gallery | Gallery/proof |

### Accessing images in components

```typescript
import {
  getHeroImage,
  getPrimaryImageForSection,
  getImageById,
  getAlt,
  getCaption,
} from '../lib/images';

// Hero
const heroImg = getHeroImage();

// Section primary
const socialImg = getPrimaryImageForSection('social-purpose');

// By ID
const muralImg = getImageById('04_service_mural_recovery');

// i18n alt text
const alt = getAlt(heroImg, 'es'); // Spanish alt text
```

### Replacing tenant images (multi-tenant future)

The manifest has a `tenant` field. For future multi-tenant use:
1. Clone the manifest and rename with a tenant slug prefix
2. Override `TENANT_MANIFEST_PATH` env var
3. `images.ts` reads the env var and loads the tenant-specific manifest

### Format requirements

- Format: JPEG (preferred) or WebP
- Hero image: 1920×1080px minimum, landscape
- Section images: 800×600px minimum
- Before/after: split side-by-side in a single file, or separate files named `*_before.jpg` / `*_after.jpg`
- Max file size: 2MB per image (optimize before upload)

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

## Deploy to Vercel

1. Connect GitHub repo to Vercel dashboard
2. Framework: Astro (auto-detected via `vercel.json`)
3. Build command: `npm run build`
4. Node.js version: 20+
5. Push to `main` → Vercel auto-deploys production

### Check deployment status

```bash
# Copy .env.example → .env and fill in VERCEL_TOKEN
npm run deploy:check
```

### Cloudflare Workers (alternative)

The `wrangler.toml` is retained for future migration. To activate, swap the adapter in `astro.config.mjs` back to `@astrojs/cloudflare` and run `npx wrangler deploy`.

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
