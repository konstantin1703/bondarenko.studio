# BND Studio

Production site for **bndstudio.art**. BND Studio presents strategy, product, media and automation as one connected digital system rather than a catalogue of separate services.

## Product structure

The site is a small route system, not a single landing page:

1. **`/`** — the primary system journey: Hero → Diagnostics → Capabilities → Brief → Resolution/Footer.
2. **`/studio`** — studio operating model, principles and authored route choreography.
3. **`/systems`** — the digital/media/automation system architecture and interactive routing model.
4. **`/brief`** — a dedicated project-specification route with the same five-stage Brief instrument plus the post-Brief handoff protocol.
5. **404** — a first-class recovery surface that routes back into the system instead of falling back to framework chrome.

## Architecture

The production surfaces use semantic React/Next.js UI with section-scoped CSS and authored WebGL material fields. `components/system/useRenderActivity.ts` governs which canvases may render continuously so off-screen sections do not keep expensive render loops alive. `prefers-reduced-motion` removes decorative motion while preserving navigation, focus handoff and content semantics.

Cross-route navigation is coordinated by `components/system/RouteTransitionBridge.tsx`, including the visual route transition, route-change focus handoff and live-region announcement. Studio and Systems add restrained GSAP route choreography without changing their still-frame composition on mobile or reduced-motion clients.

The old `*-lab`, `system-lab` and V12/V13 production concepts are retired. Their public paths intentionally return the authored 404 surface, and CI rejects any legacy V12/V13 selectors that leak into the production bundle.

## Stack

- Next.js 16.3.4 / React 19.2.8 / TypeScript 6
- Three.js 0.186 + React Three Fiber 9.7
- GSAP 3.15 + Lenis 1.3
- CSS Modules plus a small production global layer
- Next.js Route Handler for validated Telegram lead delivery
- GitHub Actions + Playwright for Chromium/WebKit, accessibility, metadata, performance and visual QA
- Vercel production deployment with exact-SHA live verification

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

Core checks:

```bash
npm run typecheck
npm run build
npm run qa:performance
npm run qa:accessibility
npm run qa:metadata
npm run test:e2e
```

The browser gates cover desktop Chromium, desktop/mobile WebKit, reduced motion, multi-route navigation, route focus/announcement, 390px touch ergonomics, 320px reflow, WebGL/render budgets, metadata/structured data, Brief failure/retry states and the route choreography contract.

## Environment

Create `.env.local` from `.env.example`:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Both values are server-only. A valid Brief submission is reported as delivered only after the Telegram Bot API acknowledges the request with `ok: true`. Browser QA never sends a real production lead.

## Main files

- `app/page.tsx` — integrated home system and verified page-level structured data
- `app/studio/page.tsx` / `components/studio/` — Studio route
- `app/systems/page.tsx` / `components/systems/` — Systems route
- `app/brief/page.tsx` / `components/brief-route/` — dedicated Brief route and handoff surface
- `components/hero-lab/` — frozen Hero production section/material field
- `components/diagnostics-lab/` — frozen Diagnostics production section/material field
- `components/capabilities-lab/` — frozen Capabilities production section/material field
- `components/brief-lab/` — shared project configurator/material field
- `components/footer-lab/` — frozen Resolution/Footer production section/material field
- `components/system/RouteTransitionBridge.tsx` — cross-route visual, focus and announcement bridge
- `components/system/useRenderActivity.ts` — shared render-activity governor
- `app/api/lead/route.ts` — validated Telegram delivery boundary
- `lib/site-metadata.ts` — canonical, social and structured-data metadata helpers
- `scripts/performance-budget-qa.mjs` — JS/WebGL/DPR performance contract
- `scripts/accessibility-touch-qa.mjs` — focus, reduced-motion, touch and 320px reflow contract
- `scripts/metadata-integrity-qa.mjs` — route metadata/JSON-LD contract
- `scripts/route-choreography-qa.mjs` — Studio/Systems motion contract
- `.github/workflows/production-quality.yml` — pull-request production gate
- `.github/workflows/live-production-quality.yml` — exact-SHA live production gate
- `ART_DIRECTION.md` — visual source of truth and frozen-section rules

## Quality gate

Every pull request to `main` must pass dependency audit, strict type checking, optimized production build, legacy-output guards, route/API/security smoke checks, performance/WebGL budgets, accessibility/touch/reflow checks, metadata/structured-data checks, Chromium/WebKit system tests and real visual captures.

A merge is not considered released until `bndstudio.art/api/health` reports the exact merged SHA and the live workflow repeats the metadata, browser, accessibility, continuity and choreography gates against the public production domain.

## Deployment

Vercel is the production host. Preview and production deployments are treated separately. The apex domain is canonical; `www.bndstudio.art` is retained as the redirecting alias. DNS and Search Console ownership are external release concerns and should not be changed as part of ordinary application QA.
