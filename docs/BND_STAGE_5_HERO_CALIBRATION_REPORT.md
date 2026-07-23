# BND.STUDIO — Stage 5 Hero Calibration Report

**Stage:** 5 — Static Hero Composition & Reference Calibration  
**Branch:** `stage5-hero-calibration`  
**Base commit:** `9875743f6c1887950b3260cc5a944d8e44ad32ae`  
**Primary reference:** `tests/visual/references/hero.png`  
**Reference viewport:** `1630 × 965`  
**Status:** `PENDING FINAL CI VALIDATION`

## 1. Scope

Stage 5 changes only the Hero viewport and Hero-specific infrastructure:

- Header and primary navigation;
- Hero copy and CTA group;
- replaceable Core media contract;
- semantic HTML/CSS HUD cards;
- inline SVG connector routes;
- background technical layer;
- capability strip;
- technology strip and status console;
- Hero responsive states and Hero-specific tests.

The remaining eight homepage sections were not redesigned. Blender, render sequences, scroll-driven reveal, GSAP, WebGL, Three.js, Supabase, Telegram and backend work are outside this stage.

## 2. Implementation structure

### New components

- `HeroCopy`
- `HeroFeatureStrip`
- `HeroBottomStrip`
- `HeroBackground`

### Calibrated components

- `HeroFoundation`
- `HeroCorePlaceholder`
- `HeroHudLayer`
- `Header`
- `Navigation`

### Data and tests

- `src/data/hero.ts`
- `src/tests/e2e/hero-stage5.spec.ts`
- updated unit tests;
- updated visual fixtures;
- Stage 5 GitHub Actions validation workflow.

The Hero remains componentized. Copy, media, HUD, routes, bottom strip and status are separate ownership zones.

## 3. Calibration passes

### Pass 1 — Macro layout

- Calibrated the Header height, brand position, central navigation and right CTA.
- Rebuilt the first viewport as a bounded two-column Hero grid.
- Increased and repositioned the Core media zone to match the reference visual mass.
- Reserved stable media dimensions for future Blender render sequence integration.
- Reconstructed the lower capability and technology/status zones.

### Pass 2 — Typography and density

- Calibrated H1 size, line-height, maximum width and controlled line breaks.
- Preserved one semantic H1 without duplicated decorative text.
- Rebalanced body copy and CTA spacing.
- Reduced navigation to the three items visible in the reference composition.
- Reworked HUD card titles, captions and panel padding.
- Replaced unsupported business metrics with honest capability labels.

### Pass 3 — Surface calibration

- Reduced cyan flooding and constrained glow to active edges and the Core zone.
- Added thin cut-corner frames and restrained nested borders.
- Rebuilt connector routes as a controlled inline SVG network.
- Added a low-contrast technical background grid and radial support light.
- Calibrated the status console and bottom panel separators.
- Added explicit mobile/tablet simplification instead of scaling desktop UI.

## 4. Accessibility and responsive behavior

Validated requirements:

- exactly one H1;
- semantic Header, navigation and Hero structure;
- visible keyboard focus;
- primary and secondary CTA remain accessible;
- Core placeholder has an accessible name;
- decorative graphics are `aria-hidden` and ignore pointer input;
- reduced-motion mode does not hide or break the Hero;
- no positive `tabindex`;
- no horizontal overflow at 390, 768, 1024, 1440 and 1630 px;
- touch targets remain at least 44 × 44 CSS px;
- mobile moves the Core below copy and simplifies HUD/routes.

## 5. Local validation

| Command | Exit code | Result |
|---|---:|---|
| `npm ci` using the environment-injected internal registry | 1 | Infrastructure blocker: registry HTTP 503 |
| `npm run tokens:build` | 0 | PASS — 235 CSS variables |
| `npm run source:check` | 0 | PASS — 88 checks |
| `npm run lint` | 0 | PASS |
| `npm run typecheck` | 0 | PASS |
| `npm run test` | 0 | PASS — 7 tests |
| `npm run build` | 0 | PASS |
| `npm run test:e2e` | 0 | PASS — 18 tests |
| `npm run test:visual` | 0 | PASS — 3 tests |
| Stage 5 overlay generation | 0 | PASS |

The clean `npm ci` gate is delegated to GitHub Actions using `https://registry.npmjs.org`; Stage 5 cannot become `COMPLETED` until that run succeeds on the final branch HEAD.

## 6. Runtime evidence

- `tests/visual/actual/stage5-hero-1630x965.png`
- `tests/visual/actual/stage5-hero-1440x900.png`
- `tests/visual/actual/stage5-hero-mobile-390x844.png`
- `tests/visual/actual/stage5-hero-tablet-768x1024.png`
- `tests/visual/overlays/stage5-hero-runtime-overlay.png`
- `tests/visual/diffs/stage5-hero-runtime-diff.png`

## 7. Acceptance status

| Criterion | Status |
|---|---|
| Hero materially closer to the reference | PASS |
| Desktop calibrated at 1630 × 965 | PASS |
| Header/H1/CTA/Core zone calibrated | PASS |
| HUD and connectors readable | PASS |
| Honest lower strip content | PASS |
| Mobile/tablet layouts stable | PASS |
| Accessibility preserved | PASS |
| Local lint/typecheck/tests/build | PASS |
| Official runtime screenshots/overlay/diff | PASS locally; pending branch publication |
| Clean `npm ci` on final branch HEAD | PENDING CI |
| Blender Cube excluded | PASS |
| Stage 6 not started | PASS |

## 8. Deferred to Blender integration

- final cube surface, silhouette and materials;
- render sequence frame assets;
- scroll-to-frame controller;
- staged shell opening and internal layers;
- production media loading strategy;
- image sequence/video fallback benchmarking;
- final Core lighting match and optical crop.

## 9. Gaps

### Blocking

- Successful final GitHub Actions validation on the branch HEAD, including clean `npm ci`.

### Non-blocking

- Exact display font is unavailable; safe fallback stacks create residual glyph-width differences.
- Core surface and perspective cannot match until the Blender asset exists.
- Reference contains denser raster micro-detail than the intentionally lightweight HTML/SVG layer.
- Six semantic HUD modules are retained even where the reference visibly emphasizes fewer cards.

## 10. Approval gate

Before Blender integration, the user must approve:

1. Header.
2. H1 size and line breaks.
3. CTA position.
4. Left/right balance.
5. Core media zone size.
6. HUD card placement.
7. Connector density.
8. Cyan/glow intensity.
9. Bottom technology panel.
10. Mobile Hero.
