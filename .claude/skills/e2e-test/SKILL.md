# E2E Application Testing

Source: coleam00/link-in-bio-page-builder — adapted for Preeway Pressure Washing

## When to use
Run this skill when asked to validate the site end-to-end, fix UI regressions, or confirm a deployment is healthy.

## Workflow

### Phase 1 — Research
Spawn three parallel agents:
1. Map all user journeys (Hero CTAs → Quote form → Submit → Confirmation)
2. Map API routes (`/api/health`, `/api/quote`, `/api/agent`, `/api/tenant`)
3. Identify potential breakpoints (i18n routing, form validation, mobile layout)

### Phase 2 — Server
Start dev server: `npm run dev` on port 4321.
Confirm homepage loads at `http://localhost:4321`.

### Phase 3 — Test tasks
For each journey, create a structured task:
- Hero → CTA click → Quote form
- Quote form → fill all fields → submit → confirm success message
- Spanish route `/es` → verify i18n strings display
- Mobile 375px viewport → hero, nav hamburger, form all visible
- `/api/health` → GET → `{ status: "ok" }`
- Preeway Scout classification buttons → click each → verify response text

### Phase 4 — Execute
Run `npm run test:e2e` and capture output.
For any failure: diagnose, fix, re-run.
Screenshot on failure is automatic (playwright config).

### Phase 5 — Cleanup
Stop dev server. Close browser sessions.

### Phase 6 — Report
Summary: journeys tested / passed / failed / fixed.
Offer to export findings to `e2e/report.md`.

## Key rules
- Re-snapshot after navigation or DOM changes
- Test all viewports: 375px mobile, 768px tablet, 1440px desktop
- Never mark passing if console errors exist
- Always verify `/api/health` before testing form submissions
