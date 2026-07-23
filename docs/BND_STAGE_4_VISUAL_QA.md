# BND.STUDIO — Stage 4 Visual QA

**Статус:** runtime visual acceptance completed.

| Fixture | Viewport | Screenshot | Reference | Overlay | Diff | Main mismatches | Priority |
|---|---:|---|---|---|---|---|---|
| Hero | 1630×965 | `tests/visual/actual/hero-1630x965.png` | `tests/visual/references/hero.png` | `tests/visual/overlays/hero-runtime-overlay.png` | `tests/visual/diffs/hero-runtime-diff.png` | Core placeholder; HUD and density lighter than reference. | P1 / Stage 5 |
| Central panels | 1536×1024 | `tests/visual/actual/central-panels-1536x1024.png` | `tests/visual/references/central-panels.png` | `tests/visual/overlays/central-panels-runtime-overlay.png` | `tests/visual/diffs/central-panels-runtime-diff.png` | Structure matches; cube shell and panel density need refinement. | P1 |
| Configurator | 1672×941 | `tests/visual/actual/configurator-1672x941.png` | `tests/visual/references/configurator.png` | `tests/visual/overlays/configurator-runtime-overlay.png` | `tests/visual/diffs/configurator-runtime-diff.png` | Three-column foundation works; density is preliminary. | P1 |
| Mobile | 390 px | `tests/visual/actual/mobile-390.png` | — | — | — | No horizontal overflow; approved mobile reference absent. | P1 later |
| OctagonalCore idle | isolated | `tests/visual/actual/octagonal-core-idle.png` | — | — | — | Inline SVG, no raster embed. | PASS |
| OctagonalCore active | isolated | `tests/visual/actual/octagonal-core-active.png` | — | — | — | Fine contour calibration remains preliminary. | P1 |

## Browser QA

- Chromium runtime: PASS.
- 390, 768 and 1440 px horizontal overflow: PASS.
- Keyboard skip-link, navigation and CTA focus: PASS.
- `prefers-reduced-motion`: PASS.
- Header and Hero at 200% zoom: PASS.
- OctagonalCore scaling and absence of raster `<image>`: PASS.

## Test evidence

- Playwright E2E: 9 passed.
- Playwright visual: 2 passed.
- Overlays/diffs for Hero, Central panels and Configurator: exit code 0.

Stage 4 diff is structural calibration evidence, not a final pixel-perfect acceptance threshold.
