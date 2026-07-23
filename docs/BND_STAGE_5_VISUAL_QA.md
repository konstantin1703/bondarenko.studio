# BND.STUDIO — Stage 5 Visual QA

**Reference:** `tests/visual/references/hero.png`  
**Native comparison viewport:** `1630 × 965`  
**Status:** `PENDING FINAL CI VALIDATION`

## 1. Official Stage 5 fixtures

| Fixture | Path | Size |
|---|---|---:|
| Main desktop | `tests/visual/actual/stage5-hero-1630x965.png` | 1630 × 965 |
| Desktop | `tests/visual/actual/stage5-hero-1440x900.png` | 1440 × 900 |
| Tablet | `tests/visual/actual/stage5-hero-tablet-768x1024.png` | 768 × 1024 |
| Mobile | `tests/visual/actual/stage5-hero-mobile-390x844.png` | 390 × 844 |
| Overlay | `tests/visual/overlays/stage5-hero-runtime-overlay.png` | 1630 × 965 |
| Diff | `tests/visual/diffs/stage5-hero-runtime-diff.png` | 1630 × 965 |

## 2. Comparison ledger

| Area | Reference evidence | Stage 5 result | Status |
|---|---|---|---|
| Outer frame/Header | Thin full-width top frame, brand left, nav center, CTA right | Geometry and alignment reconstructed; spacing is close | Substantial match |
| H1 | Large condensed three-line hierarchy with cyan middle line | Same hierarchy, controlled line breaks and one semantic H1 | Substantial match; font residual |
| Body and CTA | Short body copy and two horizontal actions | Width, vertical rhythm and button hierarchy calibrated | Match |
| Core visual mass | Large cube occupying right-center | Media zone now has comparable width/height and visual center | Geometry match; asset intentionally differs |
| HUD cards | Small technical modules around Core | Six semantic HTML cards arranged without overlap | Match to product requirements |
| Routes | Thin cyan connectors with few luminous nodes | Inline SVG routes use bounded paths and nodes | Match; lower micro-detail density |
| Capability strip | Four dark cells under Hero copy | Four honest capability cells replace unsupported metrics | Intentional content deviation |
| Technology/status strip | Wide lower strip and compact status console | Width, separators, density and bottom alignment calibrated | Substantial match |
| Background | Dark blue-green field with sparse technical detail | Low-contrast grid, radial Core support and peripheral markers | Match; deliberately restrained |
| Mobile | Not defined by desktop reference | Purpose-built single-column composition, simplified HUD and routes | Pass |

## 3. Major zones that now align

- Header height and horizontal distribution.
- Hero content top offset and left gutter.
- H1 block height and cyan emphasis.
- CTA group placement.
- Core media zone scale and center of gravity.
- HUD ownership as a separate HTML/SVG layer.
- Lower capability strip and bottom technology/status zone.
- Near-black blue-green palette with restrained cyan.

## 4. Remaining visual differences

### Caused by the missing Blender Cube

- The placeholder is a deliberate technical wireframe, not the final hard-surface object.
- Surface depth, perspective, panel density, material reflections and platform lighting differ.
- The final Blender crop may require small media-zone optical adjustments.

### Caused by fonts

- The exact reference display font is unknown.
- Safe fallback fonts produce different Cyrillic glyph widths and vertical proportions.
- H1 width, column size and line-height were calibrated without illegal scaling or unlicensed font files.

### Intentional implementation differences

- Reference metrics are not copied because they are unverified.
- Six semantic modules are represented as required by the BND architecture.
- Background noise is lower to preserve text readability and performance.
- Desktop decorative routing is reduced on tablet/mobile.

## 5. Supplemental pixel metrics

Pixel comparison is not the acceptance source because the final Blender Core is absent, but it confirms directional improvement:

| Metric | Stage 4 foundation | Stage 5 |
|---|---:|---:|
| Mean absolute error | 21.792 | 21.190 |
| RMSE | 54.307 | 53.090 |
| Grayscale correlation | 0.3115 | 0.3442 |

## 6. Accessibility and responsive visual checks

- one visible H1;
- CTA visible and focusable;
- meaningful Core accessible label;
- HUD/routes decorative for assistive technology;
- reduced motion retains complete content;
- no horizontal overflow at required viewports;
- no clipped H1 or actions;
- mobile touch targets meet 44 px minimum;
- no microscopic desktop UI scaled onto mobile.

## 7. Blocking visual defects

None found in the final local render. Final status remains pending until the same implementation passes clean CI on the branch HEAD.

## 8. Non-blocking differences

- display-font glyph mismatch;
- final Blender object absent;
- lower raster micro-detail density;
- slight differences in icon metaphors and exact connector path bends;
- intentional honest-copy differences in the capability strip.

## 9. Approval checklist

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
