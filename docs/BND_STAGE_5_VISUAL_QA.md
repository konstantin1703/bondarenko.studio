# BND.STUDIO — Stage 5 Visual QA

**Reference:** `tests/visual/references/hero.png`  
**Native comparison viewport:** `1630 × 965`  
**Status:** `COMPLETED — AWAITING USER VISUAL APPROVAL`

## Official fixtures

| Fixture | Path | Size |
|---|---|---:|
| Main desktop | `tests/visual/actual/stage5-hero-1630x965.png` | 1630 × 965 |
| Desktop | `tests/visual/actual/stage5-hero-1440x900.png` | 1440 × 900 |
| Tablet | `tests/visual/actual/stage5-hero-tablet-768x1024.png` | 768 × 1024 |
| Mobile | `tests/visual/actual/stage5-hero-mobile-390x844.png` | 390 × 844 |
| Overlay | `tests/visual/overlays/stage5-hero-runtime-overlay.png` | 1630 × 965 |
| Diff | `tests/visual/diffs/stage5-hero-runtime-diff.png` | 1630 × 965 |

## Visual comparison ledger

| Area | Stage 5 result | Status |
|---|---|---|
| Outer frame/Header | Brand left, navigation center, CTA right; calibrated frame height and gutters | Substantial match |
| H1 | Three-line hierarchy, cyan middle line, one semantic H1 | Substantial match; font residual |
| Body and CTA | Width, vertical rhythm and button hierarchy calibrated | Match |
| Core visual mass | Media zone now matches reference scale and center of gravity | Geometry match; asset intentionally differs |
| HUD cards | Six semantic HTML cards positioned without overlap | Match to product requirements |
| Routes | Bounded inline SVG paths with limited nodes and no route web | Match; lower micro-detail density |
| Capability strip | Four honest capability cells instead of unsupported metrics | Intentional content deviation |
| Technology/status strip | Width, separators, density and bottom alignment calibrated | Substantial match |
| Background | Restrained grid, radial Core support and sparse peripheral markers | Match |
| Mobile/tablet | Purpose-built stacked compositions with simplified HUD/routes | Pass |

## Matching macro zones

- Header height and horizontal distribution.
- Hero content top offset and left gutter.
- H1 block height and cyan emphasis.
- CTA group placement.
- Core media zone size and position.
- Separate HTML/SVG HUD ownership.
- Capability strip and bottom technology/status region.
- Near-black blue-green palette with controlled cyan.

## Remaining differences

### Missing Blender Cube

- The current Core is a deliberate technical wireframe prototype.
- Surface depth, perspective, panel density, reflections and platform lighting remain different.
- The final Blender crop may require small optical adjustments without changing the Hero contract.

### Font differences

- The exact display typeface used by the reference is unknown.
- Safe fallback fonts create residual Cyrillic glyph-width and vertical-proportion differences.
- Calibration uses container width, font size and line-height rather than illegal scaling or unlicensed font files.

### Intentional differences

- Unverified metrics were not copied.
- Six semantic modules are retained by architecture requirements.
- Background noise is lower for readability and performance.
- Tablet/mobile route density is reduced instead of shrinking the desktop composition.

## Supplemental pixel metrics

These metrics are secondary because the final Blender object is absent:

| Metric | Stage 4 | Stage 5 |
|---|---:|---:|
| Mean absolute error | 21.792 | 21.190 |
| RMSE | 54.307 | 53.090 |
| Grayscale correlation | 0.3115 | 0.3442 |

## Accessibility and responsive checks

- one visible H1;
- CTA visible and keyboard focusable;
- meaningful accessible Core label;
- decorative HUD/routes hidden from assistive technology;
- reduced motion keeps content usable;
- no horizontal overflow at all required viewports;
- no clipped heading or actions;
- mobile targets meet the 44 px minimum;
- no desktop interface scaled microscopically onto mobile.

## Blocking visual defects

None.

## Non-blocking visual differences

- display-font glyph mismatch;
- final Blender object absent;
- lower raster micro-detail density;
- small icon-metaphor and connector-bend differences;
- intentional honest-copy differences in the capability strip.

## Validation evidence

GitHub Actions run `30039427370` completed clean dependency installation, build, E2E, visual capture and overlay/diff generation successfully.

## Approval checklist

- [ ] Header
- [ ] H1 size and line breaks
- [ ] CTA position
- [ ] Left/right balance
- [ ] Core media zone
- [ ] HUD card placement
- [ ] Connector density
- [ ] Cyan/glow intensity
- [ ] Bottom technology panel
- [ ] Mobile Hero
