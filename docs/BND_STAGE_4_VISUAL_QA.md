# BND.STUDIO — Stage 4 Visual QA

**Статус:** runtime visual acceptance blocked; static calibration fallback completed.  
**Причина:** npm registry returned HTTP 503, поэтому Next.js dependencies, JavaScript Playwright runner and project build could not be installed/run in this execution environment.

## Important distinction

The files under `tests/visual/fallback/` were rendered with **Python Playwright + system Chromium from an explicit static QA fallback document**. They validate composition direction, reference dimensions, responsive overflow and visual hierarchy, but they are **not substitutes for screenshots of the Next.js runtime**.

Official configured outputs remain:

```text
tests/visual/actual/
tests/visual/overlays/
tests/visual/diffs/
```

They must be generated after `npm install` succeeds.

## Fixture matrix

| Fixture | Viewport | Screenshot | Reference | Overlay / diff | Main mismatches | Priority |
|---|---:|---|---|---|---|---|
| Hero | 1630×965 | `tests/visual/fallback/hero-1630x965-static-fallback.png` | `tests/visual/references/hero.png` | `fallback-overlays/hero-static-overlay.png`; `fallback-diffs/hero-static-diff.png` | Core is an honest placeholder; original font unavailable; peripheral HUD reduced; screenshot is static fallback, not Next runtime | P0 after install |
| Central panels | 1536×1024 | `tests/visual/fallback/central-panels-1536x1024-static-fallback.png` | `tests/visual/references/central-panels.png` | `fallback-overlays/central-panels-static-overlay.png`; `fallback-diffs/central-panels-static-diff.png` | Problem cube remains fixture shell; connector detail is intentionally reduced; interactions unresolved | P0 Stage 7/8 |
| Configurator | 1672×941 | `tests/visual/fallback/configurator-1672x941-static-fallback.png` | `tests/visual/references/configurator.png` | `fallback-overlays/configurator-static-overlay.png`; `fallback-diffs/configurator-static-diff.png` | Static step 1 only; architecture graph is preview shell; original typeface unavailable | P0 Stage 9 |
| Mobile page | 390×844 viewport | `tests/visual/fallback/mobile-390-static-fallback.png` | None | None | Long page screenshot; static fallback only | P1 after install |
| OctagonalCore active | 820×430 fixture viewport | `tests/visual/fallback/octagonal-core-active-static-fallback.png` | Lower Product Assembler reference | None | SVG prototype is simpler than target micro-detail; no runtime screenshot yet | P0 Stage 4 calibration |

## Static fallback browser checks

| Check | Result | Scope |
|---|---|---|
| Chromium render | Passed | Python Playwright, system `/usr/bin/chromium` |
| 390 px horizontal overflow | 0 px | Static fallback only |
| Reference files copied without modification | Passed | PNG dimensions preserved |
| Hero reference size | 1630×965 | Confirmed from PNG |
| Central panels reference size | 1536×1024 | Confirmed from PNG |
| Configurator reference size | 1672×941 | Confirmed from PNG |
| Alpha overlays generated | Passed | Pillow fallback implementation |
| Difference images generated | Passed | Pillow fallback implementation |
| JavaScript Playwright project tests | Blocked | `@playwright/test` unavailable because npm install failed |
| Next runtime screenshots | Blocked | Next package unavailable because npm install failed |

## First calibration findings

### Structural

- The full-width interface frame, dark-only palette and three main reference compositions are reproduced in foundation form.
- Hero copy/Core hierarchy is readable; the third heading line has an explicit condensed fallback rule to prevent accidental wrapping.
- Central panels preserve left selector / central system / right outcome logic.
- Configurator preserves 410 px / flexible center / 430 px desktop zoning at the reference viewport.

### Known visual gaps

1. Final Hero Core asset and render sequence do not exist by design on Stage 4.
2. Oswald, Manrope and IBM Plex Mono were not downloaded; the project keeps stable roles and system fallbacks.
3. Problem Explorer cube is a transparent fixture shell rather than final 3D media.
4. OctagonalCore requires a strict Next-runtime isolated screenshot and overlay after package installation.
5. Static fallback screenshots cannot validate CSS Modules, hydration, Next font loading, compiled Sass or React runtime layout.

## Required rerun order after registry recovery

```bash
npm install
npm run tokens:build
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run test:visual
npm run visual:overlay -- tests/visual/references/hero.png tests/visual/actual/hero-1630x965.png hero
npm run visual:overlay -- tests/visual/references/central-panels.png tests/visual/actual/central-panels-1536x1024.png central-panels
npm run visual:overlay -- tests/visual/references/configurator.png tests/visual/actual/configurator-1672x941.png configurator
```
