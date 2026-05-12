# Vercel Deployment — Preeway Pressure Washing

## When to use
Run this skill when asked to deploy, check deployment status, fix 404s, or monitor a Vercel build.

## Setup
1. Copy `.env.example` → `.env`
2. Set `VERCEL_TOKEN` (https://vercel.com/account/tokens — NEVER commit)
3. Set `VERCEL_PROJECT_ID=prj_RY3nddcHvowhoBvop7ztByCiEAHy`
4. Set `VERCEL_TEAM_ID=team_2MkWeFBaSCv7DOvEy0OlX4s3`

## Check deployment status
```bash
npm run deploy:check
```

## Common 404 fix checklist
- [ ] Adapter is `@astrojs/vercel` (NOT `@astrojs/cloudflare`) in `astro.config.mjs`
- [ ] `vercel.json` exists with `"framework": "astro"`
- [ ] `output: 'server'` in `astro.config.mjs`
- [ ] `npm run build` passes locally before pushing

## Build → Push → Deploy flow
1. `npm run build` — verify 0 errors
2. `npm run lint` — verify 0 TS errors
3. `git add -p && git commit -m "..."` — commit to feature branch
4. `git push origin <branch>` — Vercel auto-deploys preview
5. Merge PR to `main` → Vercel auto-deploys production

## Environment variables required in Vercel dashboard
- None required for MVP (all config is static)
- For future D1/KV/R2: add `DB_URL`, `KV_NAMESPACE` etc.

## Adapter note
This project targets **Vercel** for deployment.
The `wrangler.toml` exists for future Cloudflare Workers migration — do not activate it until the adapter is switched back to `@astrojs/cloudflare`.
