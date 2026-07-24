# BND.STUDIO — Stage 11A Rule Traceability

## Purpose

This matrix maps every significant Stage 11A correction to the normative Stage 10 rules, the documented visual gap, changed files and validation evidence.

| Change | Stage 10 rules | Gap / backlog source | Files changed | Validation | Result |
|---|---|---|---|---|---|
| Localized Hero focal energy around the proxy Core and reduced secondary-strip competition | RULE-01, RULE-09, RULE-12, RULE-52, RULE-57 | Gap 01, Gap 02; Hero hierarchy backlog | `src/styles/stage11a-calibration.scss` | Hero runtime screenshot, reference overlay/diff, full-page contact sheet | Implemented; final Cube remains dependent on Blender |
| Increased Problem Explorer Core scale, contrast, silhouette and separation | RULE-01, RULE-03, RULE-05, RULE-09, RULE-26, RULE-32, RULE-52, RULE-59 | Gap 03; P0 Core dominance | `src/styles/stage11a-calibration.scss` | Core bounding box, grayscale/visual inspection, central-panel screenshot | Pass |
| Separated background, structural, active and node route tiers | RULE-39, RULE-40, RULE-42, RULE-43, RULE-46, RULE-54, RULE-56 | Gap 04; P0 route hierarchy | `src/styles/stage11a-calibration.scss`, `src/tests/visual/stage11a.visual.spec.ts` | Computed stroke/opacity measurement, central-panel overlay/diff | Pass |
| Strengthened primary/active/secondary/inactive module states with border, fill, label and marker differences | RULE-13, RULE-14, RULE-34, RULE-55, RULE-70 | Problem Explorer module-hierarchy backlog | `src/styles/stage11a-calibration.scss` | Selected-state E2E, visual inspection | Pass |
| Rebalanced Product Assembler heading, copy, Core and right evidence stack | RULE-01, RULE-04, RULE-05, RULE-07, RULE-15, RULE-17, RULE-27 | Product Assembler balance backlog | `src/styles/stage11a-calibration.scss`, `src/styles/stage11a-safety.scss` | Central-panel screenshot, element bounds, visual inspection | Pass |
| Reinforced Product direction selected state without changing interaction contracts | RULE-14, RULE-31, RULE-55, RULE-70 | P1 selected-state backlog | `src/styles/stage11a-calibration.scss` | E2E, `aria-pressed` regression, screenshot | Pass |
| Preserved desktop Configurator while reducing secondary borders/noise | RULE-01, RULE-13, RULE-15, RULE-24, RULE-46, RULE-53 | Configurator desktop calibration backlog | `src/styles/stage11a-calibration.scss` | 1672 × 941 screenshot, reference overlay/diff | Pass |
| Reconstructed mobile Configurator into a compact semantic sequence without scaling or deletion | RULE-18, RULE-22, RULE-29, RULE-44, RULE-62, RULE-63, RULE-64, RULE-65, RULE-66, RULE-67 | Gap 05; P0 mobile length | `src/styles/stage11a-calibration.scss`, `src/styles/stage11a-safety.scss` | Before/after height `3249 → 2404 px`, overflow gate, mobile screenshot | Pass, 26.0% reduction |
| Converted Projects into one focal pending panel plus compact direction register | RULE-01, RULE-02, RULE-05, RULE-06, RULE-08, RULE-38, RULE-78 | Gap 06; Projects rhythm backlog | `src/styles/stage11a-calibration.scss` | Before/after overlay/diff, section height | Pass |
| Compressed Workflow into a five-stage engineering timeline | RULE-02, RULE-06, RULE-08, RULE-24, RULE-29, RULE-62 | Gap 06; Workflow density backlog | `src/styles/stage11a-calibration.scss`, `src/styles/stage11a-safety.scss` | Desktop/mobile screenshots, section height, E2E | Pass |
| Differentiated Technologies system layers from Principles rules list | RULE-02, RULE-05, RULE-13, RULE-38, RULE-49 | Gap 06; Technologies/Principles distinction backlog | `src/styles/stage11a-calibration.scss`, `src/styles/stage11a-safety.scss` | Before/after overlay/diff, responsive screenshots | Pass |
| Normalized typography ratios and protected Cyrillic display headings | RULE-16, RULE-17, RULE-18, RULE-20, RULE-21, RULE-22 | Gap 07; typography-ratio backlog | `src/styles/stage11a-calibration.scss`, `src/styles/stage11a-safety.scss` | Runtime screenshots, source check, responsive inspection | Pass |
| Mapped cyan/glow into four semantic visual levels | RULE-09, RULE-10, RULE-11, RULE-12, RULE-46, RULE-52, RULE-53, RULE-54, RULE-55, RULE-56 | Gap 08; cyan/glow hierarchy backlog | `src/styles/stage11a-calibration.scss` | Computed route hierarchy, screenshots, overlays | Pass |
| Strengthened Contact as an honest conversion preview | RULE-01, RULE-05, RULE-08, RULE-15, RULE-22, RULE-30, RULE-48, RULE-51, RULE-79, RULE-82 | Gap 09; Contact P0 | `src/styles/stage11a-calibration.scss`, `src/styles/stage11a-safety.scss` | Contact focal bounds, section screenshot, disabled-form/security tests | Pass |
| Reduced Footer energy and connected it to Contact termination | RULE-08, RULE-28, RULE-30, RULE-57, RULE-79, RULE-80 | Contact/Footer transition backlog | `src/styles/stage11a-calibration.scss` | Contact/Footer screenshot, mobile readability, privacy-route regression | Pass |
| Replaced repeated section dividers with varied line/density/axis mechanisms | RULE-02, RULE-06, RULE-08, RULE-28, RULE-58 | Gap 10; section-transition backlog | `src/styles/stage11a-calibration.scss` | Full-page before/after overlays and contact sheets | Pass |
| Added runtime measurement, screenshots, overlays, diffs and contact sheets | RULE-63, RULE-71; Stage 10 application gate | Stage 11A QA protocol | `src/tests/visual/stage11a.visual.spec.ts`, `scripts/create-stage11a-contact-sheets.mjs`, workflows | CI artifact and all-zero validation matrix | Pass |
| Preserved data honesty and disabled production boundaries | RULE-77, RULE-78, RULE-79, RULE-80, RULE-81, RULE-82 | Stage 11A prohibitions and remaining dependencies | Existing components plus Stage 11A visual-only styles | Secret/network/form scans, source diff, manual review | Pass |

## Component and contract preservation

Stage 11A did not remove or rewrite:

- the six Problem Explorer scenarios;
- the four Product Assembler directions;
- `aria-pressed` state contracts;
- resolver-layer behavior;
- Configurator labels or architecture data;
- the five Workflow stages;
- Technologies or Principles content;
- Contact disabled fieldset and no-network statement;
- privacy navigation;
- reduced-motion support.

## Intentional deviations

No Stage 10 rule was intentionally overridden.

The following measured increases are deliberate rather than regressions:

- Problem Explorer desktop height: `+30 px`, used to protect a stronger Core and route readability;
- Product Assembler desktop height: `+34 px`, used to remove copy/Core competition;
- Problem Explorer mobile height: `+11 px`, used to preserve readable ordered modules;
- Product Assembler mobile height: `+25 px`, used to preserve all four directions and evidence.

These increases are offset by substantial reductions in Configurator, Projects, Workflow, Technologies and Contact.

## Unresolved rule dependencies

- RULE-09 / RULE-52 final Hero focal light depends on the Blender render.
- RULE-45 and Stage 8 subjective transition quality require live interaction review.
- RULE-77 / RULE-78 final proof hierarchy requires real project content.
- RULE-79 final channel emphasis requires approved production contacts.
- RULE-82 final form state requires backend and legal scope.

See `docs/BND_STAGE_11_REMAINING_DEPENDENCIES.md`.
