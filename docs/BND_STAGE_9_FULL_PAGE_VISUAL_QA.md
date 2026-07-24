# BND.STUDIO — Stage 9 Full-Page Visual QA

**Status:** `COMPLETED / AWAITING USER FULL-PAGE APPROVAL`  
**Validated implementation:** `312b042828c957c9a10f76e748d459ed06a9ebe3`  
**Locked evidence commit:** `7a3cfeab823ccfb6595446a5f7e7ed4a060bebf5`  
**Actions run:** `30100102682`  
**Artifact ID:** `8599329893`

The final documentation-only branch HEAD is validated separately by the latest Stage 9 commit status. Runtime PNG evidence remains locked and is not rewritten by report commits.

## 1. Visual sources and claim boundary

No dedicated pixel-perfect raster reference exists for Projects, Workflow, Technologies, Contact or Footer.

The attached earlier references are used only to preserve the established BND.STUDIO system language:

- dark technical surfaces;
- cyan hierarchy;
- thin borders;
- cut corners;
- restrained glow;
- modular grid;
- micro-labels and status lines.

Stage 9 therefore claims internal continuity and stable composition, not pixel-perfect reconstruction.

## 2. Official fixtures

| Fixture | Path | Size |
|---|---|---:|
| Projects | `tests/visual/actual/stage9-projects-1536x700.png` | 1536 × 700 |
| Workflow | `tests/visual/actual/stage9-workflow-1536x700.png` | 1536 × 700 |
| Technologies | `tests/visual/actual/stage9-technologies-1536x700.png` | 1536 × 700 |
| Contact + Footer transition | `tests/visual/actual/stage9-contact-footer-1536x900.png` | 1536 × 900 |
| Lower page desktop | `tests/visual/actual/stage9-lower-page-1536x3000.png` | 1536 × 3000 |
| Lower page tablet | `tests/visual/actual/stage9-lower-page-tablet-768x3000.png` | 768 × 3000 |
| Lower page mobile | `tests/visual/actual/stage9-lower-page-mobile-390x3600.png` | 390 × 3600 |
| Full page desktop | `tests/visual/actual/stage9-full-page-1440.png` | 1440 × 6374 |
| Full page mobile | `tests/visual/actual/stage9-full-page-390.png` | 390 × 15365 |
| Desktop contact sheet | `tests/visual/contact-sheets/stage9-full-page-desktop-contact-sheet.png` | 1220 × 4412 |
| Mobile contact sheet | `tests/visual/contact-sheets/stage9-full-page-mobile-contact-sheet.png` | 418 × 5060 |

Full-page images were captured with Playwright `fullPage: true`; they were not manually stretched.

## 3. Runtime inspection result

### Projects

- Large pending-status panel creates a clear transition after Configurator.
- Six direction cards provide content without inventing case studies.
- Main panel and cards have different visual weights.
- CTA remains secondary and points to Contact.
- Desktop density is high enough without becoming a second Configurator.

Residual:

- real project material may later replace the pending panel and alter section height;
- category tags may need copy refinement after the final portfolio taxonomy is approved.

### Workflow

- Five-stage timeline is immediately readable on desktop.
- One primary step provides hierarchy without implying animation.
- Result artifacts anchor the lower edge of every step.
- Tablet changes to `2 + 2 + 1`.
- Mobile becomes a vertical sequence.

Residual:

- desktop timeline is intentionally calmer than the adjacent HUD-heavy sections;
- the final active step may change when motion or scroll context is designed.

### Technologies and Principles

- Technology map and Principles use clearly different structures.
- Allowed technology labels are grouped by layer rather than shown as one badge cloud.
- Principle explanations remain concrete and non-promotional.
- The right Principles panel balances the larger left system map.

Residual:

- exact technology taxonomy may change after production architecture approval;
- Cyrillic display-font metrics remain provisional.

### Contact

- Contact is visually prominent enough to close the user journey.
- Pending contact channels are explicit rather than fake links.
- Static disabled form is visually complete but cannot be mistaken for working submission.
- Privacy link is available and has a usable touch target.

Residual:

- production contact details, legal consent copy and final CTA wording are pending;
- form density must be revisited when real validation/error states exist.

### Footer

- Footer continues the same frame and status language.
- Navigation remains readable and touch-friendly.
- Status labels communicate local preview state honestly.
- Footer does not look like a separate white sitemap.

Residual:

- copyright and production description require copy approval;
- final version/build label may be replaced during deployment preparation.

## 4. Full-page rhythm review

| Zone | Density | Transition behavior | QA result |
|---|---|---|---|
| Hero | High focal density | Strong opening | Preserved |
| Problem Explorer | High interactive density | Direct diagnostic continuation | Preserved |
| Product Assembler | High but more symmetrical | Product/architecture continuation | Preserved |
| Configurator | High form-system density | Conversion mechanism | Preserved |
| Projects | Medium-high | Prevents a visual drop after Configurator | PASS |
| Workflow | Medium / calm | Gives visual rest after card systems | PASS |
| Technologies | Medium-high | Reintroduces structured density | PASS |
| Contact | Medium-high focal endpoint | Clear final action zone | PASS |
| Footer | Low-medium | Technical completion | PASS |

No excessively long empty desktop area was detected. The lower page alternates dense and calmer zones rather than repeating the same card structure.

## 5. Responsive review

### 1536 / 1440 px

- All lower sections fit the common working width.
- No horizontal overflow.
- Section headings align on a common left guide.
- Contact remains visible as a distinct endpoint.

### 1024 / 768 px

- Projects switches to one large panel plus two-column categories.
- Workflow avoids horizontal scrolling.
- Technology groups stay readable.
- Principles remain distinct from technology labels.
- Contact stacks without overlap.
- Footer hierarchy remains clear.

The required `768 × 3000` fixture is a viewport crop, not a replacement for the full-page screenshot; the full sequence is represented in the contact sheet and fullPage mobile/desktop evidence.

### 390 px

- Projects categories are sequential.
- Workflow becomes vertical.
- Technology groups and Principles do not require horizontal scrolling.
- Contact fields and consent remain inside the viewport.
- Footer links remain readable.
- No horizontal overflow was detected.

The required `390 × 3600` lower-page fixture captures the beginning of a longer stacked lower page. The complete mobile page is available in `stage9-full-page-390.png` and the mobile contact sheet.

## 6. Regression QA

### Hero

- Baseline: `tests/visual/actual/stage5-1-hero-1630x965.png`
- Stage 9: `tests/visual/actual/stage9-hero-regression-1630x965.png`
- Diff mean: approximately `0.0165 / 255`.
- Nonzero pixels are concentrated around the browser development badge.
- No structural Hero regression detected.

### Central Panels

- Baseline: `tests/visual/actual/stage8-central-panels-default-1536x1024.png`
- Stage 9: `tests/visual/actual/stage9-central-panels-regression-1536x1024.png`
- Diff mean: approximately `0.0053 / 255`.
- Maximum channel difference: `1`.
- No visible layout or interaction-state regression detected.

### Configurator

- Baseline: `tests/visual/actual/stage7-configurator-1672x941.png`
- Stage 9: `tests/visual/actual/stage9-configurator-regression-1672x941.png`
- Diff mean: approximately `0.0018 / 255`.
- Maximum channel difference: `2`.
- No visible structural regression detected.

## 7. Accessibility visual checks

- one H1 remains in Hero;
- lower sections use H2/H3 hierarchy;
- Projects categories are articles, not false buttons;
- Workflow is an ordered list;
- Contact controls are native and disabled;
- consent is not checked by default;
- privacy link is available;
- Footer uses native anchors;
- visible focus styles remain inherited from the foundation;
- no positive tabindex;
- critical content is HTML, not decorative SVG;
- mobile interactive links preserve usable target sizes.

## 8. Security and behavior checks

Visual completeness does not imply working submission.

Confirmed:

- no client network request;
- no server action;
- no external form endpoint;
- no local persistence;
- no fake success state;
- no analytics/tracking script;
- no production secret.

## 9. Blocking visual defects

None detected in the Stage 9 runtime evidence.

Final user full-page approval remains required.

## 10. Non-blocking visual differences

- lower sections have no independent raster target;
- exact display font is unknown;
- real cases and contact details are pending;
- full-page mobile height will change when real data and Configurator interaction are added;
- final motion and section-transition treatment are deferred;
- Blender Hero integration will require a new full-page optical review;
- Stage 8 transitions still require live interaction review.

## 11. User approval checklist

### Projects

- [ ] Honest content state
- [ ] Section scale
- [ ] Category density
- [ ] Transition after Configurator

### Workflow

- [ ] Five-stage readability
- [ ] Desktop timeline
- [ ] Tablet `2 + 2 + 1`
- [ ] Mobile vertical sequence

### Technologies and Principles

- [ ] Technology groups
- [ ] Principle wording
- [ ] Asymmetric composition
- [ ] Interface density

### Contact

- [ ] Heading and description
- [ ] Pending contact treatment
- [ ] Disabled form state
- [ ] Consent/privacy presentation
- [ ] Mobile composition

### Footer

- [ ] Navigation
- [ ] Status labels
- [ ] Technical completion of the page

### Full page

- [ ] Vertical rhythm
- [ ] Sequence of dense and calm sections
- [ ] Desktop
- [ ] Tablet
- [ ] Mobile
