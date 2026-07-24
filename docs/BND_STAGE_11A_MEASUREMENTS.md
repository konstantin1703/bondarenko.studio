# BND.STUDIO — Stage 11A Measurements

## Measurement method

Runtime values are collected by Playwright from actual DOM bounding boxes and `document.documentElement.scrollHeight`. Screenshots are rendered with animation and transition effects disabled. The measurements are not estimates from the reference rasters.

## Section heights

### Desktop — 1440 px viewport width

| Section | Before height | After height | Change | Visual objective |
|---|---:|---:|---:|---|
| Hero | 965 px | 965 px | 0 px | Preserve media contract and future Blender crop |
| Problem Explorer | 500 px | 530 px | +30 px | Give the central Core stronger authority without crowding routes |
| Product Assembler | 514 px | 548 px | +34 px | Rebalance heading, central Core and right evidence stack |
| Configurator | 941 px | 941 px | 0 px | Preserve approved desktop composition |
| Projects | 700 px | 634 px | -66 px | Create a focused pending-evidence scene |
| Workflow | 700 px | 568 px | -132 px | Convert to a compact five-stage engineering timeline |
| Technologies | 720 px | 710 px | -10 px | Distinguish system layers from principles without over-compression |
| Contact | 763 px | 685 px | -78 px | Increase conversion focus and remove low-energy height |
| Footer | 355 px | 342 px | -13 px | Produce a quieter termination |
| Full page | 6374 px | 6157 px | -217 px | Improve scene rhythm without flattening section roles |

Desktop full-page reduction: `3.4%`.

### Mobile — 390 px viewport width

| Section | Before height | After height | Change | Visual objective |
|---|---:|---:|---:|---|
| Hero | 1385 px | 1385 px | 0 px | Preserve Hero composition before Blender integration |
| Problem Explorer | 1909 px | 1920 px | +11 px | Maintain readable ordered modules and stronger Core separation |
| Product Assembler | 1521 px | 1546 px | +25 px | Keep all four directions and full product evidence |
| Configurator | 3249 px | 2404 px | -845 px | Remove repeated vertical cost while retaining all data |
| Projects | 1845 px | 1565 px | -280 px | Reduce repeated card height and keep honest pending status |
| Workflow | 1336 px | 1165 px | -171 px | Compact five-stage timeline and preserve artifacts |
| Technologies | 1764 px | 1381 px | -383 px | Group technology layers and retain all principles |
| Contact | 1416 px | 1249 px | -167 px | Keep conversion copy dominant and form preview subordinate |
| Footer | 758 px | 748 px | -10 px | Preserve navigation/readability with quieter ending |
| Full page | 15365 px | 13559 px | -1806 px | Improve mobile narrative and reduce scroll cost |

Mobile full-page reduction: `11.8%`.

Mobile Configurator reduction: `26.0%`.

## Core and focal-point bounds

Measured at the Stage 11A visual QA viewport:

| Object | Bounding box |
|---|---|
| Problem Explorer Core | `291 × 291 px` |
| Product Assembler Octagonal Core | `235 × 210 px` |
| Contact focal heading | `560 × 179 px` |

The Hero H1 retains its established desktop composition. Its viewport-relative `y` value can be negative after section scrolling during the shared measurement pass; the dedicated Hero screenshot is the authoritative framing evidence.

## Route hierarchy

| Tier | Opacity | Stroke width | Role |
|---|---:|---:|---|
| Background | 0.46 | 0.52 px | Construction context only |
| Structural | 0.62 | 0.90 px | Maintains system topology |
| Active | 1.00 | 1.75 px | Explains the selected scenario |
| Nodes | 0.94 | 1.00 px default outline | Confirms endpoints and junctions |

## Overflow

- Desktop horizontal overflow: `false`.
- Mobile horizontal overflow: `false`.

## Evidence source

The measurements are written by `src/tests/visual/stage11a.visual.spec.ts` to:

`stage11a-validation/measurements.json`

The validation workflow gates the mobile Configurator on a minimum `20%` reduction and fails if desktop or mobile horizontal overflow is detected.
