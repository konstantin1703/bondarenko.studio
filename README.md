# BND Studio

Production site for **bndstudio.art**. BND Studio presents strategy, product, media and automation as one connected digital system rather than a catalogue of separate services.

## Product structure

1. **Hero** — establishes the studio position and the primary project path.
2. **Diagnostics** — maps where a digital system loses speed, clarity or continuity.
3. **Capabilities** — routes the task through digital systems, media and automation contours.
4. **Brief** — assembles a five-step project specification and forwards a validated lead to Telegram.
5. **Footer** — resolves the system narrative and returns to the project or diagnostic path.

## Architecture

The production page is assembled from section-scoped React components with real accessible DOM content and independent WebGL material surfaces. `components/system/useRenderActivity.ts` governs which material canvases may render continuously, keeping the visual system active near the viewport without running every scene at once. `prefers-reduced-motion` disables continuous decorative rendering.

The root route is the production integration target. The `*-lab` and `system-lab` routes are isolated, `noindex` QA surfaces used to inspect sections without changing the production composition.

## Stack

- Next.js 16.3.4 / React 19.2.8 / TypeScript 6
- Three.js 0.186 + React Three Fiber 9.7
- GSAP 3.15 + Lenis 1.3
- CSS Modules plus a small production global layer
- Next.js Route Handler for Telegram lead delivery
- GitHub Actions + Playwright for Chromium/WebKit integration and visual QA

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

Production checks:

```bash
npm run typecheck
npm run build
npm run test:e2e
```

`npm run test:e2e` runs the current full-system QA against a production server and covers desktop Chromium, desktop/mobile WebKit, reduced-motion behavior, section ordering, anchor navigation, render budgets, accessibility structure and the Brief recovery path.

## Environment

Create `.env.local` from `.env.example`:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Both values are server-only. A valid Brief submission is reported as delivered only after the Telegram Bot API acknowledges the request with `ok: true`.

## Main files

- `app/page.tsx` — production composition, integration-level overrides and verified JSON-LD
- `components/hero-lab/` — Hero section and material surface
- `components/diagnostics-lab/` — diagnostics interaction and material surface
- `components/capabilities-lab/` — capability routing and material surface
- `components/brief-lab/` — project configurator and material surface
- `components/footer-lab/` — resolution/footer section and material surface
- `components/system/useRenderActivity.ts` — shared render-activity governor
- `app/api/lead/route.ts` — validated Telegram delivery endpoint
- `app/globals.css` — tokens, reset, focus and global resilience rules
- `app/production-polish.css` — production-only cross-section refinements
- `app/opengraph-image.tsx` — generated BND social preview
- `scripts/system-integration-qa.mjs` — current full-system browser QA
- `.github/workflows/production-quality.yml` — production quality gate
- `ART_DIRECTION.md` — current art-direction source of truth

## Quality gate

Every pull request to `main` runs dependency audit, strict type checking, a production Next.js build, a guard against shipping legacy V12/V13 CSS selectors, route/API and security-header smoke checks, Chromium/WebKit integration tests, mobile and reduced-motion checks, and section-level visual captures including 404 and Open Graph output.

The Brief transport is isolated in browser QA: failure, retry and success states are tested without sending a real Telegram lead. Real Telegram delivery still requires correctly configured production environment variables.

## Deployment

Vercel is the intended host. Treat a reviewed merge and a production release as separate events: the production deployment must be verified against the exact reviewed `main` revision before it is considered live. Keep preview and production environments separate, verify the Telegram environment independently, and handle custom-domain/DNS changes as an explicit release step rather than as part of application QA.
