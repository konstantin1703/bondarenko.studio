# BND.STUDIO — Stage 02 Handoff

**Stage:** 02 — Isolated Homepage Foundation

**Repository:** `konstantin1703/bondarenko.studio`

**Base revision:** `main@ef6a6b149b92f84a21ded3a410a8d74f8e2e84a0`

**Branch:** `feature/bnd-home-foundation-v1`

**Draft PR:** [#50 — Stage 02: isolated BND homepage foundation](https://github.com/konstantin1703/bondarenko.studio/pull/50)

**Date:** 21 July 2026

## Status legend

- **FACT** — verified repository, source-code, command, or GitHub state.
- **DECISION** — implementation choice within the approved Stage 02 architecture.
- **DEVIATION** — documented difference from the supplied specification.
- **UNRESOLVED** — work that could not be verified in the current environment.
- **RECOMMENDATION** — proposed next action; not implemented in this stage.

---

## 1. Task goal

**FACT.** Stage 02 creates an isolated technical foundation for the future BND.STUDIO homepage while preserving the current production homepage and all existing static routes.

**FACT.** The implementation adds:

- an isolated `home-v2.html` entry;
- React + TypeScript + Vite;
- neutral structural shells for the header, Hero, change scenarios, product directions, and configurator;
- typed data for six change scenarios, four product directions, and five configurator steps;
- isolated Vite assets under `dist/assets/home-v2/`.

**FACT.** This stage does not implement the final Hero, cube, HUD, Blender assets, GSAP animation, final mockup styling, forms, or Telegram submission.

---

## 2. Branch and Draft PR

**FACT.** Branch: `feature/bnd-home-foundation-v1`.

**FACT.** Base: `main@ef6a6b149b92f84a21ded3a410a8d74f8e2e84a0`.

**FACT.** Draft PR: [#50](https://github.com/konstantin1703/bondarenko.studio/pull/50).

**FACT.** PR #50 is open and remains in Draft state.

**FACT.** Auto-merge is disabled for the repository and was not enabled for this PR.

**FACT.** The PR must not be merged as part of Stage 02.

---

## 3. Installed dependency versions

Versions were resolved from the npm registry on 21 July 2026 and installed as exact versions.

### Runtime dependencies

| Dependency  |  Version |
| ----------- | -------: |
| `react`     | `19.2.8` |
| `react-dom` | `19.2.8` |

### Development dependencies added

| Dependency             |   Version |
| ---------------------- | --------: |
| `vite`                 |   `8.1.5` |
| `typescript`           |   `7.0.2` |
| `@vitejs/plugin-react` |   `6.0.3` |
| `@types/react`         | `19.2.17` |
| `@types/react-dom`     |  `19.2.3` |

**FACT.** Vite 8.1.5 and `@vitejs/plugin-react` 6.0.3 declare compatibility with Node `^20.19.0 || >=22.12.0`, which includes the required Node 22 line.

---

## 4. Complete list of changed files

### Modified

- `package.json`
- `package-lock.json`

### Added

- `home-v2.html`
- `tsconfig.home-v2.json`
- `vite.home-v2.config.ts`
- `src/home-v2/main.tsx`
- `src/home-v2/App.tsx`
- `src/home-v2/vite-env.d.ts`
- `src/home-v2/components/HeaderShell.tsx`
- `src/home-v2/components/HeroShell.tsx`
- `src/home-v2/components/ChangePanelShell.tsx`
- `src/home-v2/components/ProductsPanelShell.tsx`
- `src/home-v2/components/ConfiguratorShell.tsx`
- `src/home-v2/data/change-scenarios.ts`
- `src/home-v2/data/product-directions.ts`
- `src/home-v2/data/configurator-steps.ts`
- `src/home-v2/styles/tokens.css`
- `src/home-v2/styles/globals.css`
- `BND_STUDIO_STAGE_02_HANDOFF.md`

### Explicitly unchanged

**FACT.** The following production and legacy files were not modified:

- root `index.html`;
- all files in `about/`, `audit/`, `blog/`, `brief/`, `contacts/`, `en/`, `portfolio/`, `process/`, and `services/`;
- `assets/js/main.js`;
- all legacy CSS in `assets/css/`;
- `worker/`;
- `CNAME`;
- `.nojekyll`;
- `robots.txt`;
- `sitemap.xml`;
- GitHub Pages settings.

---

## 5. Final project structure

```text
home-v2.html
vite.home-v2.config.ts
tsconfig.home-v2.json
src/
└── home-v2/
    ├── main.tsx
    ├── App.tsx
    ├── vite-env.d.ts
    ├── components/
    │   ├── HeaderShell.tsx
    │   ├── HeroShell.tsx
    │   ├── ChangePanelShell.tsx
    │   ├── ProductsPanelShell.tsx
    │   └── ConfiguratorShell.tsx
    ├── data/
    │   ├── change-scenarios.ts
    │   ├── product-directions.ts
    │   └── configurator-steps.ts
    └── styles/
        ├── tokens.css
        └── globals.css
```

**DECISION.** `vite-env.d.ts` was added because TypeScript 7 requires Vite client declarations for side-effect CSS imports. Without it, `typecheck:home-v2` reported `TS2882` for `tokens.css` and `globals.css`.

---

## 6. Build configuration

### Added npm scripts

```json
{
  "dev:home-v2": "vite --config vite.home-v2.config.ts --host 127.0.0.1",
  "build:home-v2": "vite build --config vite.home-v2.config.ts",
  "typecheck:home-v2": "tsc --project tsconfig.home-v2.json --noEmit"
}
```

**FACT.** Existing format, ESLint, Stylelint, and HTML validation scripts were retained.

### Vite output

```text
dist/home-v2.html
dist/assets/home-v2/home-v2-[hash].css
dist/assets/home-v2/home-v2-[hash].js
```

**FACT.** `vite.home-v2.config.ts` uses:

- `home-v2.html` as the only Rollup input;
- `dist/` as build output;
- `assets/home-v2/` as the generated asset directory;
- relative asset paths via `base: './'`;
- `emptyOutDir: true` because this is an isolated preview build, not a production site artifact.

**FACT.** No production deployment configuration was added.

---

## 7. Commands and test results

| Command/check                                  | Result                                                                                                                                                |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm ci`                                       | PASS — 256 packages installed from lockfile                                                                                                           |
| `npm run typecheck:home-v2`                    | PASS                                                                                                                                                  |
| `npm run build:home-v2`                        | PASS                                                                                                                                                  |
| `npm run check:core`                           | PASS with 3 pre-existing ESLint warnings in `assets/js/main.js`                                                                                       |
| Root `index.html` diff against `main`          | PASS — unchanged                                                                                                                                      |
| Existing route directories diff against `main` | PASS — unchanged                                                                                                                                      |
| Forbidden import/API source scan               | PASS — no legacy homepage CSS, `assets/js/main.js`, Cloudinary, sphere prototype, `/api/lead`, Telegram, or Worker endpoint references in the preview |
| Build output isolation                         | PASS — generated assets are under `dist/assets/home-v2/`                                                                                              |

### Build result

```text
vite v8.1.5 building client environment for production...
25 modules transformed.
dist/home-v2.html                           0.65 kB | gzip:  0.43 kB
dist/assets/home-v2/home-v2-[hash].css      4.43 kB | gzip:  1.45 kB
dist/assets/home-v2/home-v2-[hash].js     197.69 kB | gzip: 62.43 kB
Build completed successfully.
```

### Existing warnings

**FACT.** `npm run check:core` still reports three existing `no-unused-vars` warnings in `assets/js/main.js` at lines 18, 26, and 521. They predate Stage 02 and are outside its scope. There are no ESLint errors.

---

## 8. Preview and screenshot evidence

**FACT.** The Vite development server starts successfully and reports the local preview URL.

**FACT.** The preview contains no `fetch`, XMLHttpRequest, form submit handler, production endpoint, Telegram URL, or Cloudinary dependency. The disabled configurator button cannot send a request.

**UNRESOLVED.** Browser-based visual QA could not be completed in the current environment. The connected cloud browser returned:

```text
net::ERR_BLOCKED_BY_CLIENT
```

for both:

```text
http://127.0.0.1:4173/home-v2.html
http://localhost:4173/home-v2.html
```

**UNRESOLVED.** A desktop preview screenshot is not attached because the cloud browser cannot access localhost.

**UNRESOLVED.** A mobile preview screenshot is not attached because the cloud browser cannot access localhost.

**UNRESOLVED.** Console-error inspection and rendered overflow checks at desktop/mobile widths require a browser that can reach the preview.

---

## 9. Deviations from the specification

**DEVIATION.** The specification requested desktop and mobile screenshots. They could not be produced because the cloud browser blocks localhost. This is an environment limitation, not an application build failure.

**DEVIATION.** The local `gh` CLI is not installed in the execution environment. GitHub branch publication, commit creation, and Draft PR creation are therefore performed through the authenticated GitHub connector. The requested branch name, Draft state, base branch, and no-merge rules remain unchanged.

**DECISION.** Styling is intentionally neutral and structural. It does not attempt to reproduce the supplied mockups or create a new visual direction.

**DECISION.** No GSAP, Tailwind, router, form library, state library, analytics library, or API client was added because none is required for the Stage 02 foundation.

---

## 10. Known problems

**UNRESOLVED.** Visual layout, browser console health, and responsive behavior have not been browser-verified due to the localhost block.

**FACT.** The preview is not a production deployment artifact. Its `dist/` output intentionally contains only `home-v2.html` and isolated homepage assets; it does not copy the existing static site.

**FACT.** The configurator is structural only. It does not collect answers, persist state, validate contacts, or call the existing Worker.

**FACT.** The header navigation is preview-only and uses same-page anchors.

**FACT.** The current homepage, internal pages, Worker, Telegram integration, and production domain remain unchanged.

---

## 11. Recommended next stage

**RECOMMENDATION.** Before implementing final visuals, run the Draft PR locally in a browser-capable environment and capture:

1. desktop screenshot at `1440 × 900` or `1920 × 1080`;
2. mobile screenshot at `390 × 844`;
3. browser console output;
4. horizontal-overflow check;
5. keyboard navigation through header links and the disabled configurator action.

**RECOMMENDATION.** After visual QA is available, the next implementation stage should introduce one approved Hero slice only. It should not yet migrate internal pages or connect the production Worker.

---

## Final safety confirmation

**FACT.** `main` was not modified.

**FACT.** The production root `index.html` was not modified.

**FACT.** Production deployment settings were not modified.

**FACT.** The Cloudflare Worker and Telegram integration were not modified or invoked.

**FACT.** The Pull Request is Draft-only and must not be merged during Stage 02.
