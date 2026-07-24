# BND.STUDIO — Stage 11A Visual QA

## Status

`IMPLEMENTATION VALIDATED / USER VISUAL APPROVAL REQUIRED`

Visual QA confirms that the Stage 11A implementation is technically stable and that the required evidence was generated. It does not replace the user's full-page visual approval.

## Normative sources

- `docs/BND_VISUAL_ARCHITECTURE_REFERENCE.md`
- `docs/BND_VISUAL_ARCHITECTURE_RULES.md`
- `docs/BND_VISUAL_ADAPTATION_MATRIX.md`
- `docs/BND_FULL_PAGE_VISUAL_GAP_AUDIT.md`
- `docs/BND_FINAL_VISUAL_CALIBRATION_BACKLOG.md`
- `docs/BND_VISUAL_QA_PROTOCOL.md`
- `tests/visual/references/hero.png`
- `tests/visual/references/central-panels.png`
- `tests/visual/references/configurator.png`

Reference PNG files were not modified.

## Runtime evidence

### Hero

- `tests/visual/actual/stage11a-hero-1630x965.png`
- `tests/visual/actual/stage11a-hero-mobile-390x844.png`
- `tests/visual/overlays/stage11a-hero-runtime-overlay.png`
- `tests/visual/diffs/stage11a-hero-runtime-diff.png`

Decision: hierarchy calibrated within Stage 11A boundaries. The proxy Core remains intentionally non-final.

### Central Panels

- `tests/visual/actual/stage11a-central-panels-1536x1024.png`
- `tests/visual/actual/stage11a-central-panels-mobile-390x1800.png`
- `tests/visual/overlays/stage11a-central-panels-runtime-overlay.png`
- `tests/visual/diffs/stage11a-central-panels-runtime-diff.png`

Decision: Problem Explorer Core authority and route hierarchy improved. Product Assembler remains a distinct system scene with preserved interactive contracts.

### Configurator

- `tests/visual/actual/stage11a-configurator-1672x941.png`
- `tests/visual/actual/stage11a-configurator-mobile-390x2404.png`
- `tests/visual/overlays/stage11a-configurator-runtime-overlay.png`
- `tests/visual/diffs/stage11a-configurator-runtime-diff.png`

Decision: desktop layout preserved; mobile is structurally recomposed and shortened by `26.0%`. No CSS scaling or horizontal scrolling was introduced.

### Lower sections

- `tests/visual/actual/stage11a-projects-1536.png`
- `tests/visual/actual/stage11a-workflow-1536.png`
- `tests/visual/actual/stage11a-technologies-1536.png`
- `tests/visual/actual/stage11a-contact-footer-1536.png`

Before/after overlays and diffs are generated for Projects, Workflow and Technologies. Full-page before/after overlays and diffs cover Contact/Footer in context.

### Full page

- `tests/visual/actual/stage11a-full-page-1440.png`
- `tests/visual/actual/stage11a-full-page-390.png`
- `tests/visual/contact-sheets/stage11a-full-page-desktop-contact-sheet.png`
- `tests/visual/contact-sheets/stage11a-full-page-mobile-contact-sheet.png`
- `tests/visual/overlays/stage11a-full-page-desktop-before-after-overlay.png`
- `tests/visual/diffs/stage11a-full-page-desktop-before-after-diff.png`
- `tests/visual/overlays/stage11a-full-page-mobile-before-after-overlay.png`
- `tests/visual/diffs/stage11a-full-page-mobile-before-after-diff.png`

Decision: the lower-page `700 / 700 / 720 px` repetition was removed, the Contact endpoint gained a focal point, and the Footer became quieter.

## Visual inspection decisions

### Problem Explorer

- Core is the local PRIMARY focal point.
- Primary, active, secondary and inactive module states are distinguishable through border, surface, label, icon and route intensity.
- Active routes do not share one opacity/stroke with structural routes.
- Background grid remains subordinate.

Result: `PASS / USER APPROVAL REQUIRED`.

### Product Assembler

- Heading and explanatory copy no longer collide with the central map.
- The Octagonal Core retains the center without becoming a pseudo-3D object.
- Direction selection uses a stronger border, fill and marker.
- Right-side stack and principles remain evidence, not the task focal point.

Result: `PASS / USER APPROVAL REQUIRED`.

### Configurator

- Desktop remains three-column and reference-oriented.
- Mobile preserves all six option cards and all architecture data.
- The architecture graph is converted to an ordered mobile grid.
- Repeated panel padding and card height are reduced.
- Primary CTA remains visually dominant over the disabled back action.

Result: `PASS / USER APPROVAL REQUIRED`.

### Projects

- Pending state remains explicit and honest.
- One feature panel acts as the focal point.
- Direction cards form a compact register rather than another equal-card wall.

Result: `PASS / USER APPROVAL REQUIRED`.

### Workflow

- All five stages and artifacts remain present.
- Desktop and mobile density were reduced.
- One primary stage has clear emphasis without converting the timeline into a carousel or control.

Result: `PASS / USER APPROVAL REQUIRED`.

### Technologies and Principles

- Technologies read as horizontal system layers with grouped tags.
- Principles read as a calmer ordered rules list.
- The two zones no longer reuse the same card-grid composition.

Result: `PASS / USER APPROVAL REQUIRED`.

### Contact and Footer

- Contact contains one dominant next-step message.
- Disabled fields are deliberately subordinate but readable.
- Pending contact channels and disabled submission remain explicit.
- Footer closes the page without fake operational status or excessive visual energy.

Result: `PASS / USER APPROVAL REQUIRED`.

## Responsive and accessibility QA

Validated by the existing E2E/visual suites and the Stage 11A measurement pass:

- no horizontal overflow at 1440 or 390 px;
- keyboard and selected-state contracts preserved by regression tests;
- `aria-pressed`, live regions and accessible labels unchanged;
- decorative route/SVG semantics unchanged;
- reduced-motion behavior preserved;
- disabled Contact submission remains disabled;
- no external form action or client network integration added;
- no critical state depends on cyan alone.

## Validation matrix

All checks completed with exit code `0`:

- tokens build;
- source check;
- lint;
- typecheck;
- unit tests;
- production build;
- E2E;
- visual tests;
- contact sheets;
- three normative reference overlays/diffs;
- lower-section and full-page before/after comparisons;
- overflow gate;
- Configurator reduction gate;
- environment, secret, network and form-action scans.

## Known dependencies

The following are not defects in Stage 11A and remain intentionally unresolved:

- final Blender Cube silhouette/material/light;
- live interaction feel review;
- real project cases;
- production contact data;
- final form/backend/legal implementation;
- final display-font decision.

See `docs/BND_STAGE_11_REMAINING_DEPENDENCIES.md`.
