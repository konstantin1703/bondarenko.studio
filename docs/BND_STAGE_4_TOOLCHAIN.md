# BND.STUDIO — Stage 4 Toolchain

**Проверено фактической установкой, lint, typecheck, tests и production build 23 июля 2026.**

| Package/tool | Selected version | Source / validation | Result |
|---|---:|---|---|
| Node.js | 22.23.1 runner | GitHub Actions runtime | PASS |
| npm | 10.9.2 declaration | Real `npm install` | Lock generated |
| Next.js | 16.2.11 | Official setup + production build | PASS |
| React | 19.2.8 | npm resolution / Next peer compatibility | PASS |
| React DOM | 19.2.8 | Version-aligned with React | PASS |
| TypeScript | 5.9.3 | Typecheck and Next build | PASS |
| Sass | 1.101.3 | SCSS Modules production build | PASS |
| ESLint | 9.39.3 | Flat config execution | PASS |
| eslint-config-next | 16.2.10 | Core Web Vitals / TypeScript rules | PASS |
| Playwright Test | 1.61.1 | E2E and runtime screenshots | 11 tests PASS |
| Vitest | 4.1.10 | Unit tests | 7 tests PASS |
| Sharp | 0.34.1 | Overlay and diff generation | PASS |
| html-validate | 11.5.6 | Dependency compatibility | Resolved |

## Setup notes

- App Router with `src/`, TypeScript, `@/*` alias and SCSS Modules.
- Node requirement: `>=20.9.0`.
- ESLint runs separately; Next.js build does not substitute lint.
- `playwright.config.ts` uses Playwright-managed Chromium by default.
- Optional `BND_SYSTEM_CHROMIUM_PATH` is supported; no hard-coded `/usr/bin/chromium`.
- Preliminary font roles remain fallbacks until approved font assets are provided.
- `package-lock.json` was created by a successful npm install and was not handwritten.
