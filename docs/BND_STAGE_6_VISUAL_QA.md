# BND.STUDIO — Stage 6 Visual QA

**Status:** `COMPLETED / AWAITING USER VISUAL APPROVAL`  
**Reference:** `tests/visual/references/central-panels.png`  
**Reference viewport:** `1536 × 1024`  
**Validated visual source:** `73769987d539ddae58f17d3ce8275b9d6b74328b`  
**Validation run:** `30052701499`  
**Artifact ID:** `8581635926`

## Official fixtures

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

## Visual comparison ledger

| Area | Stage 6 result | Status |
|---|---|---|
| Combined geometry | Two sections now occupy the complete 1536 × 1024 fixture with a controlled 10 px junction | Substantial match |
| Problem heading | Strong two-line hierarchy, clear separation from intro | Match in role; font residual |
| Scenario list | Six compact rows with one dominant selected state | Match |
| System Core | Centered 250 px system proxy with readable top/front/right faces | Functional match; asset differs |
| System modules | Six modules connected around the center with main/secondary route hierarchy | Match |
| Process example | Five-step static chain with numbers, labels and result note | Match |
| Problem bottom strip | Five architectural outputs occupy the working width | Match; honest content deviation |
| Product heading | Three-line condensed hierarchy with readable supporting copy | Substantial match |
| Product directions | Four directions with code, label and selected fixture state | Match |
| OctagonalCore | Enlarged inline SVG, active state, stronger contour hierarchy | Match to component requirements |
| Stack panel | Six justified technologies without filler entries | Match |
| Principles panel | Five engineering principles fit without clipping | Match |
| Process strip | Five stages across the complete section width | Match |
| Tablet | Correct top alignment, stacked scenario list, central architecture and process panel | PASS |
| Mobile | Readable cards, independent Core row, routes simplified, no overflow | PASS |

## Deliberate deviations from the raster reference

- No duplicated Header/navigation is embedded into either section.
- No unsupported `50+`, `120+`, `300+`, percentages or business-performance claims are copied.
- Problem Explorer uses a system architecture proxy rather than imitating a final Blender cube.
- Final user-facing text remains HTML; decorative graphics remain SVG/CSS.
- Product technology list is limited to the supplied preliminary stack.
- Route density is lower on tablet/mobile instead of shrinking desktop routes into noise.

## Reference overlay interpretation

The overlay intentionally shows significant residual difference around:

- the reference rendered cube and its platform;
- icon metaphors and micro-illustrations;
- exact display-font metrics;
- duplicated raster Header elements;
- unsupported metric blocks;
- fine noise and raster lighting.

These differences are not treated as regressions because they conflict with the Stage 6 implementation constraints or with factual-content requirements.

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

## Blocking visual defects

None found in the final runtime candidate.

## Non-blocking visual differences

- unknown original display font;
- final Blender object absent;
- reference iconography not copied exactly;
- reduced raster micro-detail;
- honest-content substitutions;
- some route bends and node positions differ from the reference image;
- the required tablet/mobile fixtures are viewport crops of a long stacked composition.

## User approval checklist

### Problem Explorer

- [ ] Heading and left column
- [ ] Six-scenario list
- [ ] Selected scenario strength
- [ ] System Core scale and silhouette
- [ ] Six external modules
- [ ] Connector hierarchy
- [ ] Process example panel
- [ ] Bottom architecture strip
- [ ] Overall density

### Product Assembler

- [ ] Heading and intro
- [ ] Four product directions
- [ ] OctagonalCore scale and contour density
- [ ] Connector routes
- [ ] Preliminary stack
- [ ] Principles panel
- [ ] Five-stage process strip
- [ ] Tablet/mobile composition
