# BND.STUDIO — Stage 6 Central Panels Calibration Report

**Status:** `COMPLETED / AWAITING USER VISUAL APPROVAL`  
**Branch:** `stage6-central-panels-calibration`  
**Base:** `stage5-hero-calibration-pass-2@8ed0413eaf8357a3510a42793cf14e1f1664c5e9`  
**Draft PR:** `#59`  
**Validated visual implementation:** `73769987d539ddae58f17d3ce8275b9d6b74328b`  
**Validation run:** `30052701499`  
**Artifact:** `stage6-central-panels-73769987d539ddae58f17d3ce8275b9d6b74328b` (`8581635926`)

Final report and evidence-lock commits contain no changes to the calibrated composition. Their exact HEAD is validated by the final Stage 6 workflow run recorded in Draft PR #59.

## Scope

Stage 6 calibrates only:

- Problem Explorer / «Что можно изменить»;
- Product Assembler / «Собираем продукты под конкретные процессы»;
- System Core and SystemModuleShell;
- OctagonalCore presentation;
- section-specific cards, routes, data, responsive states and tests.

Hero, Header, Configurator, Projects, Workflow, Technologies, Contact and Footer were not redesigned. Stage 5.1 Hero remains locked until Blender integration.

## Three-pass calibration

### Pass 1 — Macro geometry

- Central panels were grouped into one Stage 6 visual fixture.
- Desktop composition was normalized to `1536 × 1024`.
- Problem Explorer received a three-zone layout: scenario column, system architecture, process example.
- Product Assembler received a three-zone layout: product directions, OctagonalCore assembly, stack/principles.
- The second section received a full-width five-stage process strip.
- Central objects were enlarged and centered against their corresponding route systems.

### Pass 2 — Typography and density

- All six Problem Explorer scenarios now fit in the first section.
- One static selected fixture is retained; no scenario resolver was added.
- Scenario rows, process steps, stack cells and principles were compacted without microscopic text.
- Product directions now display code, name and selected state.
- Right-side panels fit without clipping.
- Large headings were recalibrated without `scaleX()` or extreme tracking.

### Pass 3 — Surface calibration

- Main and secondary routes received separate stroke hierarchy.
- Cyan was divided into focal, functional and decorative levels.
- System Core gained controlled depth through face contrast and restrained shadow.
- OctagonalCore remained inline SVG with its existing component contract.
- Grid, borders, nodes, cut corners and internal dividers were balanced against the reference.
- Tablet fixture capture was corrected to align to the true top of the Stage 6 container.

## Numerical calibration ledger

The reference values below are measured visual estimates from the supplied raster reference. They are not claimed as pixel-perfect geometry.

| Parameter | Reference | Before Stage 6 | After Stage 6 | Residual difference |
|---|---:|---:|---:|---|
| Problem Explorer left zone | ≈380 px | ≈350 px | 350 px | ≈30 px narrower; content density compensates |
| Problem Explorer central zone | ≈690 px | ≈760 px | ≈708 px | ≈18 px wider |
| Problem Explorer right zone | ≈360 px | ≈350 px | 350 px | ≈10 px narrower |
| System Core horizontal center | ≈780 px | visually weak / dispersed | ≈780 px | aligned |
| System Core visual size | ≈250–270 px | ≈190 px | 250 px | within reference range |
| First section height | ≈500 px | responsive foundation expanded composition | 500 px | aligned |
| Product Assembler left zone | ≈400 px | sparse heading/content zone | 370 px | ≈30 px narrower |
| OctagonalCore center | ≈780 px | visually undersized | ≈780 px | aligned |
| OctagonalCore size | ≈230–250 px | ≈190 px | 235 px | within reference range |
| Product Assembler right zone | ≈350–370 px | ≈350 px | 350 px | aligned |
| Process strip height | ≈85–95 px | secondary/weak | 88 px | aligned |
| Total central composition | 1024 px | 1545 px source fixture | 1024 px | normalized to reference viewport |

## Functional and accessibility results

- six Problem Explorer scenarios are present;
- exactly one static scenario has selected state;
- System Core and six semantic modules are present;
- four product directions are present;
- OctagonalCore contains no raster `<image>`;
- five workflow stages are present;
- no horizontal overflow at 390, 768, 1024, 1440 and 1536 px;
- mobile central objects precede secondary panels;
- decorative routes are separated from meaningful text;
- semantic headings and accessible central-object names are retained;
- no positive tabindex;
- reduced-motion foundation remains active;
- Stage 5.1 Hero contract and fixture version remain unchanged.

## Validation

| Command/check | Exit code | Result |
|---|---:|---|
| `npm ci` | 0 | PASS |
| `npm run tokens:build` | 0 | PASS — 235 variables |
| `npm run source:check` | 0 | PASS — 104 checks |
| `npm run lint` | 0 | PASS |
| `npm run typecheck` | 0 | PASS |
| `npm run test` | 0 | PASS |
| `npm run build` | 0 | PASS |
| `npm run test:e2e` | 0 | PASS — 28 tests |
| `npm run test:visual` | 0 | PASS — 3 tests |
| Stage 6 reference overlay/diff | 0 | PASS |
| Stage 5.1 Hero regression overlay/diff | 0 | PASS |
| Runtime evidence existence | 0 | PASS |

## Runtime evidence

- `tests/visual/actual/stage6-central-panels-1536x1024.png`
- `tests/visual/actual/stage6-problem-explorer-1536x620.png`
- `tests/visual/actual/stage6-product-assembler-1536x620.png`
- `tests/visual/actual/stage6-central-panels-tablet-768x1400.png`
- `tests/visual/actual/stage6-central-panels-mobile-390x1600.png`
- `tests/visual/actual/stage6-hero-regression-1630x965.png`
- `tests/visual/overlays/stage6-central-panels-runtime-overlay.png`
- `tests/visual/diffs/stage6-central-panels-runtime-diff.png`
- `tests/visual/overlays/stage6-hero-regression-overlay.png`
- `tests/visual/diffs/stage6-hero-regression-diff.png`

## Blocking gaps

No technical blocking gaps remain. User visual approval is intentionally not granted automatically.

## Non-blocking gaps

- The reference contains raster micro-detail, iconography and decorative labels not reproduced one-for-one.
- The reference central Problem Explorer object is a complex rendered cube; Stage 6 uses a controlled HTML/SVG system proxy.
- Unverified metrics and business claims from the reference were not copied.
- Exact display typography differs because the original reference font is unknown.
- Tablet/mobile screenshots show the beginning of the long stacked composition at their required viewport heights rather than the complete multi-thousand-pixel document.

## Deferred interaction

- scenario switching;
- route animation;
- state machine and resolver;
- dynamic stack recommendations;
- dynamic product direction selection;
- Blender/WebGL integration;
- Configurator logic;
- backend/API/Telegram submission;
- Stage 7.

## Approval gate

The user must separately approve Problem Explorer, scenario list, System Core, modules, routes, process panel, Product Assembler, directions, OctagonalCore, stack, principles, workflow strip and tablet/mobile composition.
