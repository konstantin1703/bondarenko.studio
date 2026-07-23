# BND.STUDIO — Stage 5.1 Visual QA

**Status:** `COMPLETED / AWAITING USER VISUAL APPROVAL`  
**Validated source commit:** `{{VALIDATED_SHA}}`  
**Actions run:** `{{ACTIONS_RUN_ID}}`

## Fixtures

| Fixture | Path | Size |
|---|---|---:|
| Reference | `tests/visual/references/hero.png` | 1630 × 965 |
| Previous Stage 5 | `tests/visual/actual/stage5-hero-1630x965.png` | 1630 × 965 |
| Stage 5.1 desktop | `tests/visual/actual/stage5-1-hero-1630x965.png` | 1630 × 965 |
| Stage 5.1 desktop | `tests/visual/actual/stage5-1-hero-1440x900.png` | 1440 × 900 |
| Stage 5.1 tablet | `tests/visual/actual/stage5-1-hero-tablet-768x1024.png` | 768 × 1024 |
| Stage 5.1 mobile | `tests/visual/actual/stage5-1-hero-mobile-390x844.png` | 390 × 844 |
| Overlay | `tests/visual/overlays/stage5-1-hero-runtime-overlay.png` | 1630 × 965 |
| Diff | `tests/visual/diffs/stage5-1-hero-runtime-diff.png` | 1630 × 965 |

## Comparison ledger

| Area | Stage 5.1 result | Status |
|---|---|---|
| Header | Top/height/frame/nav/CTA now align closely with reference | Substantial match |
| H1 | Reference-scale left edge, width and visual height; stronger cyan line | Substantial match; font residual |
| Left column | Top offset, description and CTA rhythm compacted | Match |
| Core zone | Dark filled silhouette proxy restores mass and bounding box | Geometry match; asset intentionally differs |
| HUD hierarchy | Analysis, Integration and Automation are primary; other modules secondary | Improved hierarchy |
| Routes | Main routes thicker/brighter, secondary routes restrained | Match |
| Capability strip | Size, height, icon weight and separators strengthened | Geometry match; honest content deviation |
| Bottom strip | Height, border and status console restored as Hero terminus | Substantial match |
| Background | More depth with controlled grid/radial guides | Match; lower raster detail |
| Tablet/mobile | Purpose-built stack, simplified routes, no horizontal overflow | PASS |

## Material improvements versus Stage 5

- Hero content begins 18 px higher.
- H1 visual block height increased from 279 px to 308 px.
- Core silhouette width increased from ≈498 px to ≈540 px.
- H1/Core gap reduced from ≈164 px to ≈147 px.
- Pixel MAE improved from 21.190 to 19.303.
- Grayscale correlation improved from 0.3425 to 0.4533.

## Remaining differences caused by missing Blender Cube

- no hard-surface panel density;
- no final front/right/top face lighting;
- no material reflections or recessed shell geometry;
- no final circular platform lighting;
- central BND Core is a neutral proxy, not the final asset.

## Remaining font difference

The exact reference display face is unknown. Current safe fallback is width-calibrated against measured H1 boxes; glyph counters and Cyrillic vertical proportions remain different.

## Intentional differences

- no unverified `50+ / 120+ / 300+ / -65%` claims;
- 3 primary + 3 secondary semantic modules instead of copying raster emphasis blindly;
- reduced background noise for readability/performance;
- no animation, WebGL or pseudo-material imitation.

## Accessibility / responsive results

- one H1;
- semantic Header and navigation;
- accessible Core label;
- decorative routes/background hidden from assistive technology;
- visible keyboard focus;
- reduced-motion content remains usable;
- no positive tabindex;
- no horizontal overflow at 390, 768, 1024, 1440 and 1630 px;
- CTA targets are at least 44 px;
- mobile Core follows copy and actions.

## Blocking visual defects

None detected by automated/runtime QA. User visual approval is still required.

## Approval checklist

- [ ] Header
- [ ] H1 size, weight and line breaks
- [ ] CTA position and strength
- [ ] Left/right balance
- [ ] Core silhouette scale and position
- [ ] HUD hierarchy and placement
- [ ] Connector density
- [ ] Cyan/glow levels
- [ ] Capability and bottom strips
- [ ] Tablet/mobile Hero
