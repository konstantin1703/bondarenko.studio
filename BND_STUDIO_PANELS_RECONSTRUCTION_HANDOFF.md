# BND.STUDIO Panels Reference Reconstruction Handoff

## 1. Goal

- **FACT:** Reconstruct the “Что можно изменить” and “Собираем продукты под конкретные процессы” panels from the supplied 1536 × 1024 composite reference.
- **FACT:** The result is an interactive React/CSS/SVG implementation, not a rasterized panel.
- **FACT:** The supplied reference remains the visual source of truth for panel proportions, column balance, technical framing, route density, cyan glow, card hierarchy, stack tiles, principles, and workflow rhythm.

## 2. Branch and Draft PR

- **FACT:** Base branch: `feature/bnd-products-panel-v1`.
- **FACT:** Implementation branch: `feature/bnd-panels-reference-reconstruction-v1`.
- **FACT:** Draft PR: [#53 — Reconstruct BND panels from supplied reference](https://github.com/konstantin1703/bondarenko.studio/pull/53).
- **FACT:** The PR remains Draft and is not configured for auto-merge.
- **FACT:** `main` was not checked out, modified, merged, or used as the PR base.

## 3. Changed files

- **FACT:** `home-v2.html`
- **FACT:** `src/home-v2/App.tsx`
- **FACT:** `src/home-v2/main.tsx`
- **FACT:** `src/home-v2/components/ChangePanelShell.tsx`
- **FACT:** `src/home-v2/components/EngineDiagram.tsx`
- **FACT:** `src/home-v2/components/GeneratedFlow.tsx`
- **FACT:** `src/home-v2/components/StatusStrip.tsx`
- **FACT:** `src/home-v2/components/ProductsPanelShell.tsx`
- **FACT:** `src/home-v2/components/ProductEngine.tsx`
- **FACT:** `src/home-v2/components/ProductTechPanel.tsx`
- **FACT:** `src/home-v2/components/TechPrimitives.tsx`
- **FACT:** `src/home-v2/components/PanelReferenceOverlay.tsx`
- **FACT:** `src/home-v2/styles/panels-reconstruction.css`
- **FACT:** `BND_STUDIO_PANELS_RECONSTRUCTION_HANDOFF.md`

## 4. Reusable primitives

- **DECISION:** `TechFrame` and `TechCorner` define clipped technical framing without coupling it to one panel.
- **DECISION:** `TechCard` provides the shared cut-corner surface and active cyan treatment.
- **DECISION:** `TechConnectorSvg` standardizes decorative route layers with explicit view boxes.
- **DECISION:** `TechGrid` provides the shared matrix background.
- **DECISION:** `TechStatusStrip` renders the five compact system attributes in Panel A.
- **DECISION:** `TechIconTile`, `TechPrincipleRow`, and `TechWorkflowStep` provide the stack, principles, and workflow component families used by Panel B.
- **FACT:** Shared visual tokens live in the isolated reconstruction stylesheet and do not alter production CSS.

## 5. SVG architecture

- **FACT:** Panel A uses an SVG route field, connector nodes, dotted matrix, layered technical base rings, a three-face isometric BND Engine, internal circuit paths, and six module routes.
- **FACT:** Panel B uses an SVG route field, three octagonal orbits, four directional routes, active route nodes, layered octagonal core frames, and internal circuit traces.
- **FACT:** Scenario, product, technology, workflow, and principle icons remain small dependency-free SVG components.
- **FACT:** No canvas, WebGL, Three.js, rasterized panel, external runtime 3D image, or large icon library was introduced.

## 6. Panel A changes

- **FACT:** Desktop uses a compact 500 px panel aligned to the reference’s wide, shallow composition.
- **FACT:** The left column contains the two-line heading, short copy, and six 47 px scenario rows with compact numbers, active cyan framing, and descriptions.
- **FACT:** The center contains six surrounding functional modules, dense cyan routes, a dimensional isometric BND Engine, base rings, circuit nodes, and controlled glow.
- **FACT:** The right column is a five-stage icon-led flow with a short deterministic explanation and scenario-specific system log.
- **FACT:** The bottom strip contains five icon/label/value attributes and extends beneath the central system area, matching the reference rhythm.
- **FACT:** Selecting any scenario updates the flow copy, log, module states, integration label, AI label, and result status.

## 7. Panel B changes

- **FACT:** Desktop uses a compact 472 px panel with a two-line display heading.
- **FACT:** The left capability strip contains only the factual labels `04 направления`, `единая архитектура`, `от задачи до запуска`, and `модульная сборка`.
- **FACT:** The center contains four real direction buttons connected to a compact layered octagonal BND Engine.
- **FACT:** The active direction updates the highlighted route and its direction-specific technology stack.
- **FACT:** The right column uses six technology icon tiles and five dense principle rows.
- **FACT:** The bottom workflow is a shallow six-cell strip: label plus five icon-led steps with connector arrows.

## 8. Overlay QA method

- **FACT:** Development-only `?overlay=1` mode renders an on-page file picker and opacity control from `0.25` through `0.60`.
- **FACT:** The overlay accepts the local reference at runtime through a blob URL; the reference image is not committed.
- **FACT:** Automated local QA captured 1440 × 900 desktop views and 390 × 844 mobile views.
- **FACT:** The supplied reference and each desktop capture were combined into 48% overlay comparison images before visual judgment.
- **DECISION:** The first comparison found actionable drift in the Panel B heading wrap, the fifth principle row, the Panel A status/log split, and a favicon 404.
- **FACT:** The second comparison confirmed the Panel B heading at two lines, all five principle rows visible, the wider five-item status strip, the narrower right-side log, and no console errors.
- **FACT:** Final overlay evidence:
  - `BND_PANELS_A_overlay.png`
  - `BND_PANELS_B_overlay.png`

## 9. Remaining mismatches

- **DEVIATION:** The reference’s highly rendered 3D engines are represented with layered semantic HTML and SVG geometry under the explicit no-raster, no-WebGL, and no-Three.js constraints.
- **DEVIATION:** The unchanged preview header is 72 px tall, while the composite reference depicts a shallower header. Panel internals were matched without changing header code.
- **DEVIATION:** Final brand display typography is not available locally; the reconstruction uses the established system stack with condensed scaling for the Panel B heading.
- **UNRESOLVED:** In-app Browser access to the local Vite URL is blocked in this desktop environment. Local headless Chromium supplied the required rendered screenshots and interaction evidence.
- **RECOMMENDATION:** If an approved BND.STUDIO condensed display font becomes available, replace only the display token and re-run overlay QA.

## 10. Responsive decisions

- **DECISION:** Desktop preserves the reference’s three-zone architecture and shallow panel bounds instead of inheriting the earlier tall dashboard composition.
- **DECISION:** Mobile uses one-column hierarchy: heading, horizontally scrollable active selector with a controlled next-item hint, engine, supporting panel, and status/workflow continuation.
- **FACT:** At 390 px, the active scenario is approximately 323 px wide and the active product direction is 314 px wide.
- **FACT:** Panel B’s mobile heading remains two deliberate lines through a wider layout box and condensed visual scaling.
- **FACT:** Page-level horizontal overflow is `0` at 1440 × 900 and 390 × 844; horizontal movement is contained only inside the intended selectors/status/workflow strips.

## 11. Accessibility

- **FACT:** Scenario and product choices remain native `<button>` controls.
- **FACT:** `aria-pressed` exposes selected state independently of color.
- **FACT:** Exactly one scenario and one product direction remain selected after every interaction.
- **FACT:** Arrow keys cycle selections; Home and End continue to select the first and last option.
- **FACT:** Updated scenario and product content remains exposed through polite live regions.
- **FACT:** Decorative SVG routes and icons remain hidden from assistive technology.
- **FACT:** `prefers-reduced-motion: reduce` disables active route and scan animations.

## 12. Commands and results

```text
npm ci
PASS after rerun with an isolated temporary npm cache and network permission.

npm run typecheck:home-v2
PASS

npm run build:home-v2
PASS — Vite 8.1.5, 37 modules transformed.

npm run check:core
PASS — 0 errors; 3 pre-existing no-unused-vars warnings in assets/js/main.js.
```

- **FACT:** All 6 scenarios were selected and each produced one active control plus its expected distinct log.
- **FACT:** All 4 product directions were selected and each produced one active control plus its expected distinct six-item stack.
- **FACT:** ArrowRight moved scenario `01` → `02` and product direction `01` → `02`.
- **FACT:** Desktop/mobile console errors: none.
- **FACT:** External runtime requests: none.
- **FACT:** Reduced-motion route animation: `none`.
- **FACT:** Reduced-motion scan animation: `none`.

## 13. Screenshots

- **FACT:** Panel A desktop: `BND_PANELS_A_desktop.png` — 1440 × 900.
- **FACT:** Panel A mobile: `BND_PANELS_A_mobile.png` — 390 × 844.
- **FACT:** Panel B desktop: `BND_PANELS_B_desktop.png` — 1440 × 900.
- **FACT:** Panel B mobile: `BND_PANELS_B_mobile.png` — 390 × 844.
- **FACT:** Panel A overlay: `BND_PANELS_A_overlay.png` — 1440 × 480.
- **FACT:** Panel B overlay: `BND_PANELS_B_overlay.png` — 1440 × 480.
- **FACT:** Screenshots are local QA artifacts and are attached directly in the Codex task rather than committed.

## 14. Deviations and safety

- **DEVIATION:** A data-URL favicon was added only to the isolated `home-v2.html` entry to keep console QA clean.
- **DEVIATION:** A temporary Playwright Core install outside the repository drove headless Chromium because the in-app Browser blocked the local server.
- **FACT:** The temporary Playwright package and screenshots did not change `package.json`, `package-lock.json`, or repository dependencies.
- **FACT:** Hero, Blender cube, configurator behavior, production pages, Worker, Telegram integration, SEO files, deployment configuration, and production APIs were untouched.
- **FACT:** No merge, auto-merge, or deployment was performed.

## 15. Next step

- **RECOMMENDATION:** Review the six attached screenshots and the Draft PR overlay evidence.
- **RECOMMENDATION:** Keep this PR Draft until the panel geometry and dimensional engine treatment are visually approved.
- **RECOMMENDATION:** If changes are requested, iterate only on `home-v2.html` and `src/home-v2/` before merging the stacked feature branches in their intended order.
