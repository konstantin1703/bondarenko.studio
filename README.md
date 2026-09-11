# BND Studio

Production site for **bndstudio.art**. The current implementation is a clean-slate rebuild focused on a single idea: strategy, product, media and automation are designed as one connected digital system.

## Product structure

1. **Hero** — positions BND Studio as a digital-systems practice rather than a catalogue of services.
2. **Diagnostics** — shows where a digital system loses speed, clarity or continuity.
3. **Capabilities** — three connected contours: digital systems, media projects and automation.
4. **Brief Builder** — a five-step configurator that assembles a structured project request and sends it to Telegram.

The visual language is generated in the browser. Each section has a responsive WebGL material field whose state changes with the current interaction. The shared ResilientCanvas switches to a lightweight static material asset when WebGL 2 is unavailable or a context is lost. Text, navigation and the configurator remain real accessible DOM content; no page mockup is baked into an image.

## Stack

- Next.js 16 / React 19 / TypeScript
- Three.js + React Three Fiber
- GSAP + ScrollTrigger
- Lenis
- Plain CSS design system
- Next.js Route Handler for Telegram delivery
- GitHub Actions + Playwright for build, interaction and visual QA

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production checks:

```bash
npm run typecheck
npm run build
npm run start
```

## Environment

Create `.env.local` from `.env.example`:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Both variables are server-only. They are required only for forwarding a completed brief to Telegram.

## Main files

- `app/page.tsx` — current integrated production route
- `components/hero-lab/`, `diagnostics-lab/`, `capabilities-lab/`, `brief-lab/`, `footer-lab/` — current production sections
- `components/system/ResilientCanvas.tsx` — WebGL support check, context-loss handling and visual fallback
- `components/system/useRenderActivity.ts` — viewport / visibility / reduced-motion rendering budget
- `public/material-fallback.webp` — 1536 × 1024 generated static material, 42,602 bytes
- `app/api/lead/route.ts` — validated Telegram delivery endpoint
- `.github/workflows/v12-quality.yml` — current production QA pipeline (filename retained)
- `tests/production.spec.ts` — current root-route, brief and graphics resilience tests
- `scripts/system-integration-qa.mjs` — desktop/mobile WebGL integration checks on `/`

The `components/v12/` files and earlier test files are retained historical code. They are not the production root.

## Quality and resilience

The CI pipeline performs strict type checking, a production Next.js build, route/API smoke checks, security-header checks, Playwright interaction tests and desktop/mobile section captures.

The interface respects `prefers-reduced-motion`, provides a non-WebGL fallback, supports keyboard focus and prevents incomplete configurator steps from being skipped.

## Deployment

The intended host is Vercel. Configure the two Telegram environment variables in the target Vercel project before testing a real form submission. Keep preview and production environments separate until the release candidate has passed the full QA workflow.

## Deployment status — 2026-09-11

- Production root was merged via PR #69, main `1482bef899b275dab45e2b4398f51396d2444ea3`.
- `https://bndstudio.vercel.app` serves the new implementation.
- `https://bndstudio.art` currently returns GitHub Pages 404 and is absent from the Vercel project's domain list. Domain/DNS migration is still required.
- Actual Telegram delivery has not been tested in this continuation; browser tests mock submission and do not send messages.
- The full visual composition is governed by `ART_DIRECTION.md`. This resilience patch does not reopen the visual design.
