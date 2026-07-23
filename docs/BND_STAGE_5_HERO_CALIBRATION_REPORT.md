# BND.STUDIO — Stage 5 Hero Calibration Report

**Stage:** 5 — Static Hero Composition & Reference Calibration  
**Branch:** `stage5-hero-calibration`  
**Base commit:** `9875743f6c1887950b3260cc5a944d8e44ad32ae`  
**Primary reference:** `tests/visual/references/hero.png`  
**Reference viewport:** `1630 × 965`  
**Status:** `COMPLETED — AWAITING USER VISUAL APPROVAL`

## Scope

Stage 5 changed only the Hero viewport and Hero-specific infrastructure:

- Header and primary navigation;
- Hero copy and CTA group;
- replaceable Core media contract;
- semantic HTML/CSS HUD cards;
- inline SVG connector routes;
- technical background layer;
- honest capability strip;
- technology strip and status console;
- desktop, tablet and mobile Hero states;
- Hero-specific unit, E2E and visual tests.

The remaining homepage sections were not redesigned. Blender, render sequences, scroll reveal, GSAP, WebGL, Three.js, Supabase, Telegram and backend work were not added.

## Component architecture

### Added

- `HeroCopy`
- `HeroFeatureStrip`
- `HeroBottomStrip`
- `HeroBackground`
- `src/data/hero.ts`
- `src/tests/e2e/hero-stage5.spec.ts`

### Calibrated

- `HeroFoundation`
- `HeroCorePlaceholder`
- `HeroHudLayer`
- `Header`
- `Navigation`
- source checks, unit tests and visual fixtures.

Copy, media, HUD, routes, lower strip and status remain separate ownership zones; the Hero was not converted into a monolithic component.

## Three calibration passes

### Pass 1 — Macro layout

- calibrated Header height and horizontal distribution;
- rebuilt the Hero as a bounded two-column composition;
- increased and repositioned the Core media zone;
- reserved stable dimensions for the future Blender render sequence;
- reconstructed the capability and technology/status regions.

### Pass 2 — Typography and density

- calibrated H1 size, line-height, width and controlled line breaks;
- preserved exactly one semantic H1;
- rebalanced body copy and CTA spacing;
- aligned navigation with the reference composition;
- recalibrated HUD copy and panel padding;
- replaced unsupported metrics with capability labels.

### Pass 3 — Surfaces

- constrained cyan and glow intensity;
- added thin cut-corner frames and restrained nested borders;
- rebuilt routes as bounded inline SVG paths;
- added a low-contrast grid and Core support light;
- calibrated the status console and bottom separators;
- implemented separate tablet/mobile simplification.

## Accessibility and responsive behavior

Validated:

- one H1;
- semantic Header/navigation/Hero;
- keyboard-accessible CTA and visible focus;
- accessible Core media label;
- decorative graphics hidden from assistive technologies;
- reduced-motion mode retains full content;
- no positive `tabindex`;
- no horizontal overflow at 390, 768, 1024, 1440 and 1630 px;
- touch targets remain at least 44 × 44 CSS px;
- mobile moves the Core below copy and removes route noise.

## Validation

### Local environment

| Command | Exit code | Result |
|---|---:|---|
| `npm ci` through the environment-injected internal registry | 1 | Registry infrastructure returned HTTP 503 |
| `npm run tokens:build` | 0 | PASS — 235 variables |
| `npm run source:check` | 0 | PASS — 88 checks |
| `npm run lint` | 0 | PASS |
| `npm run typecheck` | 0 | PASS |
| `npm run test` | 0 | PASS — 7 tests |
| `npm run build` | 0 | PASS |
| `npm run test:e2e` | 0 | PASS — 18 tests |
| `npm run test:visual` | 0 | PASS — 3 tests |
| overlay generation | 0 | PASS |

### Clean GitHub Actions validation

Workflow run `30039427370` completed successfully with:

- clean `npm ci` from `https://registry.npmjs.org`;
- Playwright Chromium installation;
- tokens, source checks, lint, typecheck, unit tests and production build;
- E2E and visual tests;
- official Stage 5 screenshots;
- overlay/diff generation;
- runtime evidence publication.

## Runtime evidence

- `tests/visual/actual/stage5-hero-1630x965.png`
- `tests/visual/actual/stage5-hero-1440x900.png`
- `tests/visual/actual/stage5-hero-mobile-390x844.png`
- `tests/visual/actual/stage5-hero-tablet-768x1024.png`
- `tests/visual/overlays/stage5-hero-runtime-overlay.png`
- `tests/visual/diffs/stage5-hero-runtime-diff.png`

## Acceptance result

| Criterion | Status |
|---|---|
| Hero materially closer to reference | PASS |
| 1630 × 965 composition calibrated | PASS |
| Header/H1/CTA/Core zone calibrated | PASS |
| HUD and routes readable | PASS |
| honest lower-strip content | PASS |
| mobile/tablet stable | PASS |
| accessibility preserved | PASS |
| lint/typecheck/tests/build | PASS |
| official screenshot/overlay/diff | PASS |
| clean CI `npm ci` | PASS |
| Blender excluded | PASS |
| Stage 6 not started | PASS |

## Gaps

### Blocking

None.

### Non-blocking

- the exact reference display font is unavailable;
- the Core surface and perspective remain intentionally different until Blender integration;
- the reference contains denser raster micro-detail than the lightweight HTML/SVG layer;
- six required semantic HUD modules are retained even where the reference emphasizes fewer visible cards.

## Deferred to Blender integration

- final cube silhouette, materials and surface panels;
- render-sequence frame assets;
- scroll-to-frame controller;
- staged shell opening and internal architecture layers;
- media loading/fallback benchmarking;
- final lighting, optical crop and Core-zone micro-adjustment.

## Approval gate

Before Blender integration, the user must approve Header, H1, CTA, left/right balance, Core zone, HUD placement, route density, cyan/glow, bottom panel and mobile Hero.
