# BND.STUDIO — Stage 03 Handoff

## 1. Task goal

- **FACT:** Stage 03 implements one production-quality interactive section: “Что можно изменить”.
- **FACT:** Only the upper section of the supplied composite mockup was used as visual reference.
- **FACT:** The lower “Собираем продукты под конкретные процессы” section remains the neutral Stage 02 placeholder and was not implemented.

## 2. Branches and Draft PR

- **FACT:** Base branch: `feature/bnd-home-foundation-v1`.
- **FACT:** Implementation branch: `feature/bnd-change-panel-v1`.
- **FACT:** Draft PR: pending creation at the time of the first implementation commit.
- **FACT:** `main` was not modified or merged.
- **FACT:** Draft PR #50 remains the unmerged foundation PR.

## 3. Exact changed files

- `src/home-v2/components/ChangePanelShell.tsx`
- `src/home-v2/components/EngineDiagram.tsx`
- `src/home-v2/components/GeneratedFlow.tsx`
- `src/home-v2/components/ScenarioIcon.tsx`
- `src/home-v2/components/StatusStrip.tsx`
- `src/home-v2/data/change-scenarios.ts`
- `src/home-v2/styles/globals.css`
- `src/home-v2/styles/tokens.css`
- `design-qa.md`
- `BND_STUDIO_STAGE_03_HANDOFF.md`

## 4. Component and data architecture

- **DECISION:** `ChangePanelShell` owns only the selected scenario ID. All displayed state is derived during render from typed data; no duplicated state or effect synchronization is used.
- **DECISION:** `EngineDiagram` renders the central system model and activates modules/routes from the selected scenario.
- **DECISION:** `GeneratedFlow` renders the four-stage flow, result, and deterministic interface log.
- **DECISION:** `StatusStrip` renders selected scenario, active modules, architecture status, and UI mode.
- **DECISION:** `ScenarioIcon` keeps the small technical icons dependency-free and decorative.

## 5. Scenario data structure

```ts
type ChangeScenario = {
  id: ChangeScenarioId;
  number: string;
  title: string;
  description: string;
  icon: ScenarioIconName;
  input: string;
  process: string;
  data: string;
  output: string;
  result: string;
  modules: EngineModule[];
  routes: string[];
  status: string;
  log: string[];
};
```

- **DECISION:** `result` was added to the minimum requested shape so the generated flow can explain the selected outcome without hardcoded component copy.
- **FACT:** Six scenarios are present and scenario 01 is active by default.
- **FACT:** No metrics, prices, revenue, savings, deadlines, or real-backend claims were added.

## 6. Visual implementation decisions

- **DECISION:** The panel uses near-black surfaces, cyan technical framing, subtle dotted/grid detail, restrained glow, monospaced micro-labels, and compact uppercase hierarchy based on the approved reference.
- **DECISION:** The BND Engine is semantic HTML plus SVG connector routes; it uses no canvas, WebGL, Three.js, video, raster panel, or external runtime image.
- **DECISION:** Route animation is limited to active SVG paths and does not update React state per frame.
- **DECISION:** The central node remains an abstract system diagram. It is not a fake substitute for the future Hero cube.
- **DEVIATION:** The reference's rendered 3D engine object was translated into a crisp 2D technical node because Stage 03 explicitly forbids a fake 3D asset and requires HTML/SVG.

## 7. Responsive behavior

- **FACT:** Desktop uses three zones plus a bottom status strip.
- **FACT:** Tablet uses a two-column system/flow layout and a two-column selector.
- **FACT:** Mobile order is heading, horizontally scrollable selector, BND Engine, generated flow, then status information.
- **FACT:** Mobile page overflow is absent; overflow inside the selector is deliberate and contained.
- **FACT:** Touch controls exceed the requested approximate 44 px minimum.

## 8. Accessibility behavior

- **FACT:** Scenarios are real `<button>` elements.
- **FACT:** `aria-pressed` exposes selection independently of color.
- **FACT:** Active styling also uses an inset marker and framed state.
- **FACT:** Arrow keys cycle scenarios; Home and End select boundary scenarios.
- **FACT:** Focus-visible styling is present.
- **FACT:** Flow changes use `aria-live="polite"`.
- **FACT:** Decorative icons and route SVG are hidden from assistive technology.
- **FACT:** `prefers-reduced-motion` disables route animation and nonessential transitions.

## 9. Commands and results

```text
npm ci                         PASS
npm run typecheck:home-v2      PASS
npm run build:home-v2          PASS
npm run check:core             PASS with three pre-existing warnings in assets/js/main.js
```

- **FACT:** The final Vite build transforms 29 modules and emits only the isolated `home-v2.html` entry and its `assets/home-v2/` bundle.
- **FACT:** Source/build inspection found no production API request, Worker endpoint, Telegram submission, Cloudinary runtime, legacy homepage CSS import, or legacy homepage JavaScript import in the Stage 03 implementation.

## 10. Screenshots and visual QA

- **FACT:** Desktop screenshot: `BND_STAGE_03_desktop.png`, 1440 × 900.
- **FACT:** Mobile screenshot: `BND_STAGE_03_mobile.png`, 390 × 844.
- **FACT:** Final design QA result in `design-qa.md`: `passed`.
- **DEVIATION:** The connected cloud browser still blocks `localhost` with `ERR_BLOCKED_BY_CLIENT`.
- **FACT:** A temporary, non-committed local Chromium/Puppeteer setup was used for screenshot and interaction QA as allowed by the Stage 03 prompt.

## 11. Browser-console and overflow checks

- **FACT:** Application console errors: none at desktop and mobile viewports.
- **FACT:** Desktop horizontal page overflow: none.
- **FACT:** Mobile horizontal page overflow: none.
- **FACT:** All scenario identifiers `SCN_01` through `SCN_06` appeared after sequential selection.
- **FACT:** Keyboard ArrowDown changed active selection from `01` to `02`.
- **FACT:** Reduced-motion computed animation name for an active route: `none`.

## 12. Deviations

- **DEVIATION:** Cloud-browser validation was replaced by local headless Chromium validation after the cloud browser rejected the localhost URL.
- **DEVIATION:** One small responsive rule (`min-width: 0` and heading wrapping) also protects the existing Stage 02 Hero placeholder from causing mobile page overflow. The Hero visual itself was not redesigned.

## 13. Unresolved issues

- **UNRESOLVED:** The isolated preview is not production-deployed and therefore has no public preview URL.
- **UNRESOLVED:** Final brand typography has not been approved; the implementation uses the existing system font stack.
- **UNRESOLVED:** Hero, final products panel, configurator, Worker integration, and production routing remain intentionally outside Stage 03.

## 14. Recommended next stage

- **RECOMMENDATION:** Review the attached desktop/mobile screenshots and interaction behavior before expanding the same visual system to another section.
- **RECOMMENDATION:** Keep the products panel out of scope until this panel's density, typography, and cyan framing are explicitly approved.

## Safety confirmation

- **FACT:** Root `index.html`, existing routes, legacy production assets, SEO files, Worker, Telegram integration, and deployment configuration are unchanged.
- **FACT:** No merge or production deployment was performed.
