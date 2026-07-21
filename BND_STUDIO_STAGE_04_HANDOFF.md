# BND.STUDIO — Stage 04 Handoff

## 1. Task goal

- **FACT:** Stage 04 replaces only the Stage 02 placeholder for “Собираем продукты под конкретные процессы”.
- **FACT:** The lower half of the supplied composite image was the visual reference.
- **FACT:** The section explains four BND.STUDIO product directions through an interactive technical interface.
- **FACT:** Hero, configurator, forms, Worker, production pages, and internal pages remain outside scope.

## 2. Branches and Draft PR

- **FACT:** Base branch: `feature/bnd-change-panel-v1`.
- **FACT:** Implementation branch: `feature/bnd-products-panel-v1`.
- **FACT:** Draft PR: [#52 — Stage 04: interactive BND products panel](https://github.com/konstantin1703/bondarenko.studio/pull/52).
- **FACT:** PR #50 and PR #51 remain Draft and unmerged.
- **FACT:** `main` was not modified or merged.

## 3. Exact changed files

- `src/home-v2/components/ProductsPanelShell.tsx`
- `src/home-v2/components/ProductEngine.tsx`
- `src/home-v2/components/ProductIcon.tsx`
- `src/home-v2/components/ProductTechPanel.tsx`
- `src/home-v2/data/product-directions.ts`
- `src/home-v2/styles/globals.css`
- `design-qa.md`
- `BND_STUDIO_STAGE_04_HANDOFF.md`

## 4. Component architecture

- **DECISION:** `ProductsPanelShell` owns only the active direction ID and derives the complete selected product during render.
- **DECISION:** `ProductEngine` owns the radial system view, four real direction buttons, routes, active modules, and keyboard behavior.
- **DECISION:** `ProductTechPanel` renders a direction-specific recommended stack and the stable BND.STUDIO engineering principles.
- **DECISION:** `ProductIcon` provides small dependency-free technical icons required by the product controls.
- **DECISION:** The workflow remains informational and has no progress-tracker semantics.

## 5. Typed product data

```ts
type ProductDirection = {
  id: ProductDirectionId;
  number: string;
  title: string;
  description: string;
  icon: ProductIconName;
  modules: string[];
  routes: string[];
  stack: string[];
  principles: ProductPrincipleId[];
  output: string;
};
```

- **FACT:** Four directions are present: web products, Telegram products, automation/API, and CRM/internal systems.
- **FACT:** Direction 01 is selected by default.
- **FACT:** Stable principle copy and the five workflow steps are also typed data.
- **FACT:** No client counts, project counts, savings, revenue, speed, percentage, price, or deadline claims were added.

## 6. Stack-selection logic

- **DECISION:** Every direction carries its own `stack` array; the right panel never relies on one universal technology list.
- **FACT:** Web direction includes TypeScript, React/Next.js, AI API, PostgreSQL, Docker, and Nginx.
- **FACT:** Telegram direction includes Telegram Bot API and an appropriate application/data stack.
- **FACT:** Automation direction emphasizes Python, FastAPI, REST/Webhooks, PostgreSQL, Redis, and Docker.
- **FACT:** CRM direction uses a web/API/data stack suited to an internal system.
- **FACT:** The interface explicitly says the stack is recommended and refined after task analysis; it is not a delivery promise.

## 7. Visual implementation decisions

- **DECISION:** Stage 04 reuses the established near-black, cyan, grid, dotted-matrix, technical-frame, and monospaced micro-label system from Stage 03.1.
- **DECISION:** The center uses a radial hub rather than copying the Stage 03.1 route diagram directly.
- **DECISION:** The active product direction controls the highlighted route and the four module labels inside the BND Engine.
- **DECISION:** The left metric area from the reference was replaced with factual labels: four directions, unified architecture, task-to-launch workflow, and modular assembly.
- **DECISION:** The right column separates recommended stack and engineering principles while retaining a continuous technical hierarchy.
- **DECISION:** No raster mockup, external image, canvas, video, WebGL, Three.js, or large icon dependency was introduced.

## 8. Responsive behavior

- **FACT:** Desktop uses left context, radial engine, right technical panels, and a full-width workflow.
- **FACT:** Tablet uses a full-width introduction followed by a balanced engine/technical-panel composition.
- **FACT:** Mobile order is heading, factual context, horizontally scrollable product selector, BND Engine, stack, principles, and workflow.
- **FACT:** Mobile shows one clear active direction and a controlled hint of the next direction.
- **FACT:** Page-level horizontal overflow is absent; only the intended selector has contained horizontal scrolling.

## 9. Accessibility

- **FACT:** Product directions are real `<button>` elements.
- **FACT:** `aria-pressed` exposes selected state independently of color.
- **FACT:** The active control also uses framing and an inset structural marker.
- **FACT:** Arrow keys cycle directions; Home and End select the first and last direction.
- **FACT:** Focus-visible styling is present.
- **FACT:** Selected technical content uses `aria-live="polite"`.
- **FACT:** Decorative routes and icons are hidden from assistive technology.
- **FACT:** Reduced-motion mode disables active route movement and nonessential transitions.

## 10. Tests and QA

```text
npm ci                         PASS
npm run typecheck:home-v2      PASS
npm run build:home-v2          PASS
npm run check:core             PASS with three pre-existing warnings in assets/js/main.js
```

- **FACT:** The Vite build transforms 32 modules and emits only the isolated `home-v2.html` entry and `assets/home-v2/` bundle.
- **FACT:** All four directions were selected at desktop and mobile sizes.
- **FACT:** Each direction produced its expected distinct stack array.
- **FACT:** ArrowRight changed active selection from direction `01` to `02`.
- **FACT:** Desktop/mobile application console errors: none.
- **FACT:** Desktop/mobile page overflow: none.
- **FACT:** Clipped product and technology labels: none.
- **FACT:** Reduced-motion active-route animation name: `none`.
- **FACT:** Stage 03.1 was recaptured after Stage 04 styling; no visual regression was found.

## 11. Screenshots

- **FACT:** Desktop: `BND_STAGE_04_desktop.png`, 1440 × 900.
- **FACT:** Mobile: `BND_STAGE_04_mobile.png`, 390 × 844.
- **FACT:** Optional engine close-up: `BND_STAGE_04_engine.png`.
- **FACT:** Internal regression evidence: `BND_STAGE_04_upper_regression.png`.

## 12. Deviations

- **DEVIATION:** A shared `.preview-header` background was changed from 96% opacity to solid near-black. This removes bleed-through when moving between the two full-width technical panels and does not change Stage 03.1 layout or content.
- **DEVIATION:** Temporary Puppeteer/Chromium packages were used for QA without changing `package.json` or `package-lock.json`; final `npm ci` removed them.
- **DEVIATION:** The dimensional reference core is translated into a real radial HTML/SVG/CSS system hub under the explicit no-raster/no-WebGL constraints.

## 13. Unresolved issues

- **UNRESOLVED:** The cloud browser still rejects localhost; repeatable local headless Chromium provided the screenshots and interaction checks.
- **UNRESOLVED:** Final BND.STUDIO typography remains unapproved, so the existing system font stack is retained.
- **UNRESOLVED:** The isolated preview is not production-deployed and has no public preview URL.

## 14. Recommended next stage

- **RECOMMENDATION:** Review the desktop/mobile screenshots and each direction's stack before starting another homepage section.
- **RECOMMENDATION:** Keep Hero, configurator, forms, and production routing isolated until this product panel is approved.

## Safety confirmation

- **FACT:** Root `index.html`, existing routes, production CSS/JS, SEO files, Worker, Telegram integration, and deployment settings are unchanged.
- **FACT:** No production API call, external runtime asset, merge, or production deployment was introduced.
