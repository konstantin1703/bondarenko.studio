# BND.STUDIO — Stage 7 Static Configurator Calibration Report

**Status:** `COMPLETED / AWAITING USER VISUAL APPROVAL`  
**Branch:** `stage7-configurator-calibration`  
**Base:** `stage6-central-panels-calibration@1acca29e957eb9bb90bde10a3320f939637721e7`  
**Draft PR:** `#60`  
**Validated implementation and runtime evidence:** `1918d0c7a7f9aa88c63bf5bbecaa325af3a1f5c7`  
**Validation run:** `30087636113`  
**Artifact:** `stage7-configurator-1918d0c7a7f9aa88c63bf5bbecaa325af3a1f5c7` (`8594414992`)  
**Reference:** `tests/visual/references/configurator.png` — `1672 × 941`

The report and backlog are documentation-only additions. Their final branch HEAD is validated separately by the Stage 7 commit status and recorded in Draft PR #60/final handoff. No Configurator source or locked runtime evidence is changed after the implementation commit above.

## 1. Scope

Stage 7 calibrates only the static Configurator visual foundation:

- `ConfiguratorFoundation`;
- `ConfiguratorProgress`;
- `SelectableOptionCard`;
- `ArchitecturePreviewFoundation`;
- `ArchitectureNode`;
- Configurator fixture data;
- Configurator-specific source, E2E, visual and security tests;
- official screenshots, overlay, diff and regression evidence.

Hero and Central Panels were not redesigned. No Stage 8 behavior was implemented.

## 2. Architecture of the result

The Configurator is a semantic static fixture, not a fake working form:

- one H2 and three visual zones;
- five progress steps with only step 01 active;
- six scenario cards with only scenario 01 selected;
- no `<form>`, `<input>`, `<select>` or `<textarea>`;
- static parameter values and tags;
- disabled Back and Continue buttons;
- five-node Architecture Preview built with HTML/CSS/inline SVG;
- honest `LOCAL PREVIEW` status;
- no persistence, resolver, API request or submission path.

## 3. Three-pass calibration

### Pass 1 — Macro layout

- Replaced the generic SectionFrame composition with a Configurator-specific full-height system frame.
- Calibrated the desktop grid to approximately `412 / 750 / 431 px` after section padding and gaps.
- Preserved the central workspace as the widest zone.
- Built a fixed `3 × 2` card grid.
- Reserved a full-height Architecture Preview rather than a light secondary sidebar.
- Positioned parameters and navigation at the lower edge of the central workspace.
- Added independent tablet and mobile stacking rather than scaling the desktop screen.

### Pass 2 — Typography and density

- Built the four-line left heading without duplicated text or horizontal transforms.
- Increased progress-item readability and separated active/upcoming hierarchy.
- Normalized option-card heights, titles, descriptions and icon scale.
- Reworked the central question and local fixture status.
- Rebalanced summary rows, capability tags and preliminary-stack labels.
- Preserved readable Cyrillic sizes across desktop, tablet and mobile.

### Pass 3 — Surface calibration

- Added Configurator-local outer and nested frame geometry.
- Separated focal, functional and decorative cyan levels.
- Strengthened the selected scenario without excessive bloom.
- Added primary and secondary connector routes in Architecture Preview.
- Added restrained dots/grid only inside the Configurator frame.
- Calibrated cut corners, dividers, status nodes and card surfaces.

## 4. Numerical calibration ledger

Values are measured estimates from the raster reference and CSS/runtime boxes. They are not pixel-perfect claims.

| Parameter | Reference | Before Stage 7 | After Stage 7 | Residual difference |
|---|---:|---:|---:|---|
| Left column | ≈400–420 px | ≈400 px but generic/sparse | ≈412 px | Within target range |
| Center column | ≈748–752 px | ≈760 px with weak lower structure | ≈750 px | Aligned |
| Right column | ≈420–440 px | ≈430 px but visually light | ≈431 px | Aligned |
| Configurator viewport | 1672 × 941 | Source fixture ≈1632 × 1010 | 1672 × 941 | Exact target viewport |
| Central heading top inside frame | ≈44–55 px | ≈38 px | ≈54 px | Within measured range |
| Option card | ≈207–210 × 188–198 px | ≈176 px height | ≈214 × 190 px | Width slightly larger; height aligned |
| Card gap | ≈18–22 px | 18 px | 16 px | 2–6 px tighter to fit honest copy |
| Progress item height | ≈58–66 px | ≈48–54 px | 66 px | Aligned to upper reference range |
| Lower parameter group | ≈70–82 px | Missing/underdeveloped | 70 px | Aligned |
| Architecture Preview width | ≈430 px | ≈430 px | ≈431 px | Aligned |
| Architecture graph | ≈250–275 px | ≈210 px | 264 px | Aligned |
| Summary table | ≈170–180 px | ≈150 px | ≈170 px | Aligned |
| Navigation buttons | bottom ≈816–872 px | Weak generic placement | bottom workspace row, 52 px high | Aligned in role and height |

## 5. Functional and accessibility results

- five ordered progress steps;
- exactly one `aria-current="step"`;
- six static scenario articles;
- exactly one selected fixture;
- two honest disabled navigation buttons;
- five architecture nodes;
- no raster image or canvas in Architecture Preview;
- no horizontal overflow at `390`, `768`, `1024`, `1440`, `1672 px`;
- tablet/mobile order: intro → workspace → preview;
- one H1 remains only in Hero;
- Configurator title is H2;
- decorative SVG routes are hidden from assistive technologies;
- no positive tabindex;
- no critical information exists only inside SVG.

## 6. Validation

| Command/check | Exit code | Result |
|---|---:|---|
| `npm ci` | 0 | PASS |
| `npm run tokens:build` | 0 | PASS — 235 variables |
| `npm run source:check` | 0 | PASS — 141 checks |
| `npm run lint` | 0 | PASS |
| `npm run typecheck` | 0 | PASS |
| `npm run test` | 0 | PASS — 7 tests |
| `npm run build` | 0 | PASS |
| `npm run test:e2e` | 0 | PASS — 39 tests |
| `npm run test:visual` | 0 | PASS — 4 tests |
| Configurator overlay/diff | 0 | PASS |
| Hero regression overlay/diff | 0 | PASS |
| Central Panels regression overlay/diff | 0 | PASS |
| Runtime evidence existence | 0 | PASS |
| `.env.local` check | 0 | PASS |
| Secret-pattern scan | 0 | PASS |

## 7. Runtime evidence

- `tests/visual/actual/stage7-configurator-1672x941.png`
- `tests/visual/actual/stage7-configurator-1440x1000.png`
- `tests/visual/actual/stage7-configurator-tablet-768x1400.png`
- `tests/visual/actual/stage7-configurator-mobile-390x1800.png`
- `tests/visual/actual/stage7-configurator-left-1672x941.png`
- `tests/visual/actual/stage7-configurator-center-1672x941.png`
- `tests/visual/actual/stage7-configurator-preview-1672x941.png`
- `tests/visual/overlays/stage7-configurator-runtime-overlay.png`
- `tests/visual/diffs/stage7-configurator-runtime-diff.png`
- `tests/visual/actual/stage7-hero-regression-1630x965.png`
- `tests/visual/actual/stage7-central-panels-regression-1536x1024.png`

## 8. Security result

Confirmed absent:

- `.env.local` in Git;
- Telegram bot token;
- Supabase service-role or anon key;
- OpenAI API key;
- webhook secret;
- client-side network submission;
- server actions;
- fake successful submit state.

`.env.example` contains only an empty optional Chromium-path variable and no secret value.

## 9. Blocking gaps

No technical blocking gaps remain. User visual approval is intentionally not granted automatically.

## 10. Non-blocking differences

- The isolated Stage 7 fixture does not duplicate the global Header from the reference because Header is outside Stage 7 scope.
- The original display font is unknown; safe fallback metrics differ slightly.
- Reference cards contain raster icon detail that is represented by controlled inline SVG.
- The reference shows a more completed configuration; Stage 7 intentionally shows an honest incomplete local preview.
- The reference contains a concrete budget value; Stage 7 uses `Определяется после брифа`.
- Tablet/mobile screenshots are required viewport crops of a longer stacked composition.
- Dynamic state-dependent density can only be calibrated after the interaction stage.

## 11. Deferred interaction

All interactive work is transferred to `BND_STAGE_7_CONFIGURATOR_INTERACTION_BACKLOG.md` and is not implemented in Stage 7.

## 12. Approval gate

The user must separately evaluate:

- left heading;
- five-step progress;
- central heading;
- six-card grid;
- selected state;
- lower parameters;
- disabled navigation fixtures;
- Architecture Preview;
- summary table;
- preliminary stack;
- cyan/glow hierarchy;
- desktop, tablet and mobile composition.
