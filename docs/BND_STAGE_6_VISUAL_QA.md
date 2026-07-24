# BND.STUDIO — Stage 6 Visual QA

**Status:** `PROVISIONALLY ACCEPTED / SUBJECT TO FURTHER VISUAL CALIBRATION`  
**Reference:** `tests/visual/references/central-panels.png`  
**Reference viewport:** `1536 × 1024`  
**Validated visual source:** `73769987d539ddae58f17d3ce8275b9d6b74328b`  
**Validation run:** `30052701499`  
**Artifact ID:** `8581635926`

This QA package is accepted as an intermediate visual baseline, not as final visual approval. The current screenshots remain valid evidence of the Stage 6 working foundation and must be retained for future comparison.

## Official preserved fixtures

| Fixture | Path | Size |
|---|---|---:|
| Reference | `tests/visual/references/central-panels.png` | 1536 × 1024 |
| Combined desktop | `tests/visual/actual/stage6-central-panels-1536x1024.png` | 1536 × 1024 |
| Problem Explorer | `tests/visual/actual/stage6-problem-explorer-1536x620.png` | 1536 × 620 |
| Product Assembler | `tests/visual/actual/stage6-product-assembler-1536x620.png` | 1536 × 620 |
| Tablet | `tests/visual/actual/stage6-central-panels-tablet-768x1400.png` | 768 × 1400 |
| Mobile | `tests/visual/actual/stage6-central-panels-mobile-390x1600.png` | 390 × 1600 |
| Combined overlay | `tests/visual/overlays/stage6-central-panels-runtime-overlay.png` | 1536 × 1024 |
| Combined diff | `tests/visual/diffs/stage6-central-panels-runtime-diff.png` | 1536 × 1024 |
| Hero regression | `tests/visual/actual/stage6-hero-regression-1630x965.png` | 1630 × 965 |
| Hero overlay | `tests/visual/overlays/stage6-hero-regression-overlay.png` | 1630 × 965 |
| Hero diff | `tests/visual/diffs/stage6-hero-regression-diff.png` | 1630 × 965 |

These files are not final-design snapshots. They are the comparison baseline for later interactive and full-page calibration passes.

## Visual comparison ledger

| Area | Stage 6 result | Acceptance status |
|---|---|---|
| Combined geometry | Two sections occupy the complete 1536 × 1024 fixture with a controlled junction | Accepted as structural foundation |
| Problem heading | Strong two-line hierarchy, clear separation from intro | Provisional; font and proportions may change |
| Scenario list | Six compact rows with one dominant selected state | Provisional; density and spacing may change |
| System Core | Centered system proxy with readable faces | Provisional proxy; not final object |
| System modules | Six modules connected around the center | Provisional; hierarchy and placement may change |
| Process example | Five-step static chain | Accepted as structural pattern, not final styling |
| Problem bottom strip | Five architectural outputs occupy the working width | Provisional visual treatment |
| Product heading | Three-line hierarchy with supporting copy | Provisional; font and line breaks may change |
| Product directions | Four directions with static selected fixture | Accepted as structural pattern |
| OctagonalCore | Enlarged inline SVG with active state | Provisional scale and contour density |
| Stack panel | Six justified technologies | Structural foundation accepted |
| Principles panel | Five principles without clipping | Structural foundation accepted |
| Process strip | Five stages across the section width | Structural foundation accepted |
| Tablet | Correct top alignment and stacked sections | Provisional responsive treatment |
| Mobile | Readable stacked composition without overflow | Provisional responsive treatment |

No row in this table means `VISUALLY APPROVED` or `LOCKED`.

## Deliberate deviations from the raster reference

- No duplicated Header/navigation is embedded into either section.
- No unsupported `50+`, `120+`, `300+`, percentages or business-performance claims are copied.
- Problem Explorer uses a system architecture proxy rather than imitating a final Blender cube.
- Final user-facing text remains HTML; decorative graphics remain SVG/CSS.
- Product technology list is limited to the supplied preliminary stack.
- Route density is lower on tablet/mobile instead of shrinking desktop routes into noise.

## Residual differences accepted for this intermediate stage

- the composition is not a direct copy of the reference;
- central objects are simplified;
- typography differs from the original raster;
- HUD and background detail density is lower;
- connector routes are simpler;
- sizes, panel proportions and spacing remain adjustable;
- tablet/mobile may require additional calibration after interactive states are introduced.

## Reference overlay interpretation

The overlay intentionally shows significant residual difference around:

- the reference rendered cube and its platform;
- icon metaphors and micro-illustrations;
- exact display-font metrics;
- duplicated raster Header elements;
- unsupported metric blocks;
- fine noise and raster lighting;
- route bends, card positions and right-panel proportions.

These differences are retained in the visual calibration backlog. They are not considered resolved or finally approved.

## Required future review points

The panels must be re-reviewed at minimum:

1. after implementation of interactive states and dynamic route changes;
2. after all page sections are placed and calibrated together in the complete page;
3. before final desktop, tablet and mobile site acceptance.

## Hero regression

The Stage 5.1 Hero source and media contract were not modified during Stage 6. Runtime comparison shows only negligible rasterization drift between independent browser captures; there is no structural, textual, layout or responsive regression.

Measured mean absolute pixel drift between the locked Stage 5.1 screenshot and the Stage 6 control capture is approximately `0.026 / 255`, caused by browser rasterization/PNG output rather than product changes.

## Accessibility and responsive QA

- all section headings remain semantic H2 elements;
- scenario and direction fixtures do not pretend to be active controls;
- meaningful central objects expose accessible names;
- decorative route SVGs are hidden from assistive technologies;
- no critical content exists only inside decorative SVG;
- focus and reduced-motion foundation remain unchanged;
- no positive tabindex;
- no horizontal overflow at all required widths;
- mobile rows and panels preserve readable line-height and spacing;
- route systems are removed or simplified where they would become noise.

## Blocking defects

No technical blocking defects prevent continued development from this foundation.

Final visual approval is still open. The absence of a technical blocker must not be interpreted as final visual acceptance.

## Backlog reference

Detailed remaining work is recorded in:

`docs/BND_STAGE_6_VISUAL_CALIBRATION_BACKLOG.md`

## Provisional approval checklist

### Problem Explorer

- [x] Working structural foundation accepted
- [ ] Final heading and left-column calibration
- [ ] Final scenario density and selected-state strength
- [ ] Final System Core asset, scale and silhouette
- [ ] Final six-module placement and hierarchy
- [ ] Final connector geometry and density
- [ ] Final process-example composition
- [ ] Final bottom architecture strip
- [ ] Final desktop/tablet/mobile density

### Product Assembler

- [x] Working structural foundation accepted
- [ ] Final heading and intro calibration
- [ ] Final product-direction card geometry
- [ ] Final OctagonalCore scale and contour density
- [ ] Final connector routes
- [ ] Final stack and principles visual hierarchy
- [ ] Final process-strip spacing
- [ ] Final tablet/mobile composition

No new calibration pass or next development stage is started by this document update.
