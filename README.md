# BND Studio

Production site for **bndstudio.art**. The current implementation is a clean-slate rebuild focused on a single idea: strategy, product, media and automation are designed as one connected digital system.

## Product structure

1. **Hero** — positions BND Studio as a digital-systems practice rather than a catalogue of services.
2. **Diagnostics** — shows where a digital system loses speed, clarity or continuity.
3. **Capabilities** — three connected contours: digital systems, media projects and automation.
4. **Brief Builder** — a five-step configurator that assembles a structured project request and sends it to Telegram.

The visual language is generated in the browser. The persistent background is a responsive WebGL signal field whose state changes with the current section and interaction. Text, navigation and the configurator remain real accessible DOM content; no page mockup is baked into an image.

## Stack

- Next.js 15 / React 19 / TypeScript
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

- `components/v12/StudioExperience.tsx` — page composition
- `components/v12/SceneCanvas.tsx` — responsive procedural WebGL field
- `components/v12/MotionController.tsx` — scroll/scene orchestration
- `components/v12/Hero.tsx` — positioning and primary action
- `components/v12/Diagnostics.tsx` — problem diagnosis interface
- `components/v12/Capabilities.tsx` — connected capability contours
- `components/v12/BriefBuilder.tsx` — sequential project configurator
- `app/api/lead/route.ts` — validated Telegram delivery endpoint
- `app/art-direction.css` — primary visual system
- `app/polish.css` — final state/responsive refinements
- `.github/workflows/v12-quality.yml` — production QA pipeline
- `tests/v12.spec.ts` — interaction tests

## Quality and resilience

The CI pipeline performs strict type checking, a production Next.js build, route/API smoke checks, security-header checks, Playwright interaction tests and desktop/mobile section captures.

The interface respects `prefers-reduced-motion`, provides a non-WebGL fallback, supports keyboard focus and prevents incomplete configurator steps from being skipped.

## Deployment

The intended host is Vercel. Configure the two Telegram environment variables in the target Vercel project before testing a real form submission. Keep preview and production environments separate until the release candidate has passed the full QA workflow.
