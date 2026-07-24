# BND.STUDIO — Stage 7 Configurator Visual QA

**Status:** `COMPLETED / AWAITING USER VISUAL APPROVAL`  
**Reference:** `tests/visual/references/configurator.png`  
**Reference viewport:** `1672 × 941`  
**Validated implementation/evidence:** `1918d0c7a7f9aa88c63bf5bbecaa325af3a1f5c7`  
**Validation run:** `30087636113`  
**Artifact ID:** `8594414992`

The final documentation-only branch HEAD is validated separately by the latest Stage 7 commit status. Locked runtime evidence is not overwritten by report commits.

## Official fixtures

| Fixture | Path | Size |
|---|---|---:|
| Reference | `tests/visual/references/configurator.png` | 1672 × 941 |
| Desktop | `tests/visual/actual/stage7-configurator-1672x941.png` | 1672 × 941 |
| Desktop compact | `tests/visual/actual/stage7-configurator-1440x1000.png` | 1440 × 1000 |
| Tablet | `tests/visual/actual/stage7-configurator-tablet-768x1400.png` | 768 × 1400 |
| Mobile | `tests/visual/actual/stage7-configurator-mobile-390x1800.png` | 390 × 1800 |
| Left zone | `tests/visual/actual/stage7-configurator-left-1672x941.png` | element capture |
| Center zone | `tests/visual/actual/stage7-configurator-center-1672x941.png` | element capture |
| Preview zone | `tests/visual/actual/stage7-configurator-preview-1672x941.png` | element capture |
| Overlay | `tests/visual/overlays/stage7-configurator-runtime-overlay.png` | 1672 × 941 |
| Diff | `tests/visual/diffs/stage7-configurator-runtime-diff.png` | 1672 × 941 |
| Hero regression | `tests/visual/actual/stage7-hero-regression-1630x965.png` | 1630 × 965 |
| Central Panels regression | `tests/visual/actual/stage7-central-panels-regression-1536x1024.png` | 1536 × 1024 |

## Visual comparison ledger

| Area | Stage 7 result | Status |
|---|---|---|
| Outer frame | Dedicated full-height technical frame with nested contour | Substantial match |
| Three-column geometry | ≈412 / 750 / 431 px at target viewport | Match |
| Left heading | Four-line dominant Russian heading with readable description | Match in role; font residual |
| Progress | Five steps, one active state, strong vertical hierarchy | Match |
| Center heading | Clear question, supporting line and local mode marker | Match |
| Scenario grid | Six equal-height cards in `3 × 2` layout | Match |
| Selected card | Strong cyan edge, calm fill and status marker | Match |
| Lower parameters | Product, integrations, timeline and honest budget state | Substantial match; factual deviation |
| Navigation | Back/Continue placed at bottom and honestly disabled | Match in composition; intentionally non-functional |
| Preview hierarchy | Full-height right system panel, not a weak sidebar | Match |
| Architecture graph | Three upper and two lower HTML/CSS nodes with SVG routes | Match in structure |
| Summary | Five honest fields and local-preview status | Match; intentionally incomplete state |
| Tags and stack | Controlled cyan tags and four honest technologies | Match |
| Tablet | Intro, progress, workspace and preview stack semantically | PASS |
| Mobile | One-column layout, compact progress, cards and parameters remain readable | PASS |

## Overlay interpretation

The main residual zones are expected around:

- the global Header present in the raster reference but intentionally absent from the isolated Configurator capture;
- exact display-font glyph width and vertical proportions;
- raster iconography and reference-specific micro-illustrations;
- reference values that imply a more complete configuration;
- unsupported concrete budget value;
- route bends and node icon metaphors;
- minor panel-padding differences required by honest Russian copy.

These are not classified as runtime regressions.

## Pixel indicators

Pixel metrics are supplementary only:

| Comparison | MAE | RMSE | Grayscale correlation |
|---|---:|---:|---:|
| Pre-Stage-7 normalized fixture → reference | 18.407 | 49.716 | 0.0191 |
| Stage 7 → reference | 17.884 | 47.402 | 0.1466 |

The numerical improvement supports the visual calibration, but does not prove pixel-perfect equivalence.

## Regression QA

### Stage 5.1 Hero

- Hero component source and fixture contract remain unchanged.
- Regression diff is visually black except the browser development badge region.
- Normalized diff mean is approximately `0.016 / 255`.
- No structural, textual or responsive Hero regression is detected.

### Stage 6 Central Panels

- Stage 6 source and fixture contract remain unchanged.
- Regression diff mean is approximately `0.0004 / 255`.
- No visible structural or layout regression is detected.

## Responsive and accessibility QA

- one H1 remains in Hero only;
- Configurator title is semantic H2;
- progress is an ordered list;
- exactly one current step is exposed;
- scenario fixtures are articles, not fake controls;
- navigation buttons use real disabled states;
- Architecture Preview has a meaningful accessible label;
- decorative route SVG is hidden from assistive technology;
- no positive tabindex;
- no horizontal overflow at all required widths;
- mobile buttons remain at least 44 px high;
- critical text remains HTML, not SVG-only.

## Intentional deviations

- no global Header duplication inside Configurator;
- no real selection interaction;
- no concrete price;
- no completed solution claim;
- no dynamic architecture;
- no raster preview;
- no animation, WebGL or backend behavior.

## Blocking visual defects

None detected by automated/runtime QA. User visual approval is still required.

## Non-blocking visual differences

- unknown original display font;
- different icon metaphors;
- lower micro-detail than generated raster reference;
- isolated section capture excludes the global Header;
- honest incomplete preview differs from the reference’s apparently configured state;
- tablet/mobile evidence captures only the beginning of the long stacked composition at fixed viewport heights.

## User approval checklist

- [ ] Left four-line heading
- [ ] Five-step progress hierarchy
- [ ] Central question and local-state marker
- [ ] Six-card grid
- [ ] Selected card strength
- [ ] Lower parameter group
- [ ] Disabled Back/Continue controls
- [ ] Architecture Preview graph
- [ ] Summary table
- [ ] Capability labels
- [ ] Preliminary stack
- [ ] Cyan/glow hierarchy
- [ ] Desktop 1672 × 941
- [ ] Tablet 768 × 1400
- [ ] Mobile 390 × 1800
