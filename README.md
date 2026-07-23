# BND.STUDIO — Stage 4 Foundation Recovery

Next.js foundation for the new BND.STUDIO platform interface, integrated without deleting the repository's legacy static HTML/CSS/JavaScript site.

This branch is Stage 4 recovery only. It does not contain Stage 5, the final Blender Core, WebGL, GSAP, Supabase, Telegram or a production backend.

## Install and run

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## Required validation

```bash
npm run tokens:build
npm run source:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run test:visual
```

Optional system browser override:

```bash
BND_SYSTEM_CHROMIUM_PATH=/path/to/chromium npm run test:e2e
```

The Playwright config has no hard-coded Linux path.

## Repository integration

The existing `index.html`, `assets/`, internal pages, worker and historical documentation remain available for later migration. Conflicting root files from the static project are preserved in `docs/legacy/` before the Next.js foundation replaces their active role.

## Current limits

- Hero Core remains a replaceable placeholder/media contract.
- Central panels are honest static fixture states.
- Configurator is a layout foundation, not the full state machine.
- External services are disabled.
- Project cases and metrics are not invented.
