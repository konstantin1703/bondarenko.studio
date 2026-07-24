# BND.STUDIO — Stage 8 Interactive Central Panels Report

**Status:** `COMPLETED / AWAITING USER INTERACTION APPROVAL`  
**Branch:** `stage8-central-panels-interactions`  
**Base:** `stage7-configurator-calibration@4f47fd4f0b7ccfc9c9008ac71ce297e46580d316`  
**Draft PR:** `#61`  
**Validated implementation:** `fc7f96936b2cd767e91bbdc97ceea244ef2c4787`  
**Runtime evidence commit:** `4826fdaff6384c9b784057b126f0d701031764e2`  
**Validation run:** `30090701886`  
**Artifact ID:** `8595610318`

Stage 8 adds real deterministic client interaction to the two Stage 6 central-panel sections while preserving their geometry as the visual baseline. No backend, persistence, API request, Configurator logic or Stage 9 work is included.

## 1. Implemented architecture

The interaction pipeline is:

```text
typed source data
→ selected ID in local React state
→ pure resolver
→ deterministic typed view model
→ presentational components
```

Business mappings are not stored inside JSX. Resolver functions do not import React, access the DOM, issue network requests or perform side effects.

## 2. New state and resolver files

- `src/domain/central-panels/types.ts`
- `src/data/central-panels-interactions.ts`
- `src/lib/central-panels/problem-resolver.ts`
- `src/lib/central-panels/product-resolver.ts`
- `src/tests/unit/central-panels-resolvers.test.ts`

## 3. Problem Explorer

Six supported scenario IDs:

1. `manual-automation`
2. `telegram-product`
3. `web-service`
4. `api-integration`
5. `ai-process`
6. `internal-crm`

Each scenario resolves:

- selected scenario copy;
- six module emphasis values;
- one or more primary modules;
- route profile;
- five-step process chain;
- capability labels;
- solution parameters;
- accessible result description;
- short live-region announcement.

At selection time the following zones update together:

- selected scenario control;
- central System Core profile and status;
- six module emphasis states;
- connector emphasis;
- right-side process chain;
- capability labels;
- lower solution parameters.

Module hierarchy:

- `primary` — strongest cyan hierarchy;
- `active` — functional active state;
- `secondary` — supporting state;
- `inactive` — neutral but still readable.

No module is removed from the overall architecture.

## 4. Product Assembler

Four supported direction IDs:

1. `ai-web`
2. `telegram`
3. `api-automation`
4. `crm-internal`

Each direction resolves:

- selected product card;
- active Octagonal Core layers;
- primary Core layer;
- connector profile;
- capability labels;
- preliminary stack;
- ordered principles;
- accessible architecture description.

The central Octagonal Core remains one inline SVG component with a stable `viewBox="0 0 224 200"`. State is controlled through props:

- `activeLayers`;
- `primaryLayer`;
- `routeProfile`;
- existing `state`, `label` and `subtitle` props.

No `<image>` embed, raster replacement or duplicated per-direction SVG is used.

## 5. Accessibility

- Scenario and product cards are real `<button type="button">` controls.
- Controls expose `aria-pressed`.
- Only one option is selected in each section.
- Tab, Shift+Tab, Enter and Space work through native button behavior.
- Focus remains on the selected control after activation.
- Each section has an `aria-live="polite"` status region.
- Live messages are brief and do not repeat the complete section.
- Meaningful state exists in HTML text, not only through color or SVG.
- Decorative routes remain `aria-hidden`.
- No positive tabindex or click-handler `<div>` was added.
- Touch controls remain at least 44 px high on responsive layouts.
- Reduced-motion mode preserves all interaction states.

## 6. Visual stability

- Existing desktop grid geometry remains fixed.
- Card dimensions do not change between selected states.
- System Core and Octagonal Core sizes remain fixed.
- Right-side panel tracks use reserved heights.
- Product Assembler layout-box width and height remain stable through all four directions.
- Routes do not leave their section frame.
- At mobile widths routes simplify or disappear while the semantic content remains available.
- No horizontal overflow was detected at `390`, `768`, `1024`, `1440` or `1536 px`.

## 7. Validation results

| Command/check | Exit code | Result |
|---|---:|---|
| `npm ci` | 0 | PASS |
| `npm run tokens:build` | 0 | PASS — 235 variables |
| `npm run source:check` | 0 | PASS — 182 checks |
| `npm run lint` | 0 | PASS |
| `npm run typecheck` | 0 | PASS |
| `npm run test` | 0 | PASS — 19 tests |
| `npm run build` | 0 | PASS |
| `npm run test:e2e` | 0 | PASS — 55 tests |
| `npm run test:visual` | 0 | PASS — 5 tests |
| Contact-sheet generation | 0 | PASS |
| Stage 6 default-state overlay/diff | 0 | PASS |
| Hero regression overlay/diff | 0 | PASS |
| Configurator regression overlay/diff | 0 | PASS |
| Evidence existence | 0 | PASS |
| `.env.local` check | 0 | PASS |
| Secret-pattern scan | 0 | PASS |
| Client network/persistence scan | 0 | PASS |

## 8. Security and scope checks

Confirmed absent from Stage 8 central-panel sources:

- backend logic;
- server actions;
- API requests;
- localStorage and sessionStorage;
- URL state;
- Supabase;
- Telegram integration;
- database integration;
- authentication;
- analytics;
- WebGL, Three.js, React Three Fiber, GSAP or Blender;
- client-side secrets.

## 9. Official visual evidence

### Default and responsive

- `tests/visual/actual/stage8-central-panels-default-1536x1024.png`
- `tests/visual/actual/stage8-central-panels-tablet-768x1400.png`
- `tests/visual/actual/stage8-central-panels-mobile-390x1800.png`

### Problem Explorer states

- `tests/visual/actual/stage8-problem-01-manual-automation.png`
- `tests/visual/actual/stage8-problem-02-telegram-product.png`
- `tests/visual/actual/stage8-problem-03-web-service.png`
- `tests/visual/actual/stage8-problem-04-api-integration.png`
- `tests/visual/actual/stage8-problem-05-ai-process.png`
- `tests/visual/actual/stage8-problem-06-internal-crm.png`

### Product Assembler states

- `tests/visual/actual/stage8-product-01-ai-web.png`
- `tests/visual/actual/stage8-product-02-telegram.png`
- `tests/visual/actual/stage8-product-03-api-automation.png`
- `tests/visual/actual/stage8-product-04-crm-internal.png`

### Contact sheets

- `tests/visual/contact-sheets/stage8-problem-states.png`
- `tests/visual/contact-sheets/stage8-product-states.png`

### Regression evidence

- `tests/visual/actual/stage8-hero-regression-1630x965.png`
- `tests/visual/actual/stage8-configurator-regression-1672x941.png`
- Stage 8 default, Hero and Configurator overlays and diffs under `tests/visual/overlays` and `tests/visual/diffs`.

## 10. Regression interpretation

- Stage 7 Configurator regression diff is completely black in the validated run.
- Hero regression differs only in a tiny browser development-badge region.
- Stage 8 default central panels retain Stage 6 macro geometry. The non-zero diff is expected from converting static cards into buttons, updated honest explanatory copy, module hierarchy, capability tags and prop-driven Core state.
- No Hero or Configurator source redesign was performed.

## 11. Blocking gaps

No technical blocking gaps remain.

The only blocking gate is user interaction and visual approval.

## 12. Non-blocking gaps

- Final typography and exact reference matching remain provisional.
- Transition timing may need subjective calibration after user review.
- Stage 6 default-state pixel identity is intentionally not exact because semantic controls and dynamic text were added.
- Mobile evidence is a fixed-height viewport crop of a longer functional composition.
- Full-page density must be reviewed again after later sections and final Hero media are assembled.

## 13. Approval gate

The user must separately evaluate:

- six Problem Explorer selections;
- selected-state clarity;
- module hierarchy changes;
- right process-chain changes;
- connector emphasis;
- transition character;
- four Product Assembler selections;
- Octagonal Core layer changes;
- preliminary stack and capability changes;
- visual stability on desktop, tablet and mobile.

Do not merge into `main` and do not start Stage 9 without a separate user instruction.
