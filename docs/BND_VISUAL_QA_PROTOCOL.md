# BND.STUDIO — Visual QA Protocol

**Stage:** 10  
**Purpose:** mandatory evidence system for all future correction passes.

## 1. Required evidence package per section

Every section under review must include:

1. `reference` — original supplied reference or an approved BND baseline.
2. `current actual` — runtime screenshot from the tested commit.
3. `overlay` — reference/current composite at aligned viewport.
4. `diff` — pixel or perceptual difference image.
5. `annotated comparison` — marked focal points, bounds and gaps.
6. `measurement table` — viewport, container, columns, focal bbox, heading bbox and section height.
7. `visual gap list` — ranked P0/P1/P2.
8. `approval decision` — approved, provisionally accepted or correction required.

## 2. Source control contract

- Evidence identifies branch and commit SHA.
- Runtime screenshots must come from the application, not fallback mockups.
- Reference files are immutable.
- Snapshot updates require written reason.
- Product code and evidence commits are separated where practical.
- A successful workflow on an earlier SHA does not validate a later HEAD.

## 3. Method selection

| Method | Use when | Does not prove |
|---|---|---|
| Pixel diff | same viewport, stable raster and nearly identical structure | visual quality, hierarchy, intentional adaptation |
| Grayscale correlation | checking mass, contrast and large layout zones | color hierarchy and semantic state |
| Bounding-box comparison | heading/Core/panel scale and position | surface quality and motion |
| Visual inspection | hierarchy, perceived weight, density, typography character | deterministic regression |
| Density assessment | clutter/air balance and full-page rhythm | exact geometry |
| Typography check | size, weight, line-height, wrap, line length | overall composition alone |
| Responsive check | reflow, overflow, touch targets, order | desktop fidelity |
| Live interaction review | transition speed, focus, keyboard, layout shift | static visual similarity |
| Accessibility audit | semantic/state/zoom/reduced-motion | art-direction fidelity |

Pixel similarity is one signal, not the final quality criterion.

## 4. Native viewport matrix

Minimum:

| Surface | Viewports |
|---|---|
| Hero | 1630×965, 1440×900, 768×1024, 390×844 |
| Central Panels | 1536×1024, 1024 wide, 768 wide, 390 wide |
| Configurator | 1672×941, 1440 wide, 768 wide, 390 wide |
| Lower page | 1536 desktop, 768 tablet, 390 mobile |
| Full page | 1440 fullPage, 390 fullPage |

Add 1024 and 200% zoom checks for layout robustness.

## 5. Measurement table template

| Metric | Reference | Current | Target | Delta | Confidence |
|---|---:|---:|---:|---:|---|
| Section height | | | | | |
| Working width | | | | | |
| Left gutter | | | | | |
| Primary heading bbox | | | | | |
| Central object bbox | | | | | |
| Column ratios | | | | | |
| Primary CTA bbox | | | | | |
| Bottom strip height | | | | | |

All approximate values are marked as approximate. Unknown source geometry is not invented.

## 6. Visual review sequence

### Pass A — macro
- frame and working width;
- section height;
- column ratios;
- focal-point position;
- transition to adjacent section.

### Pass B — hierarchy and typography
- primary/secondary/tertiary order;
- heading wrap and line-height;
- body contrast and line length;
- CTA prominence;
- selected-state visibility.

### Pass C — surfaces
- dark surface levels;
- borders and cut corners;
- line categories;
- cyan intensity;
- glow budget;
- background field.

### Pass D — responsive
- semantic order;
- section length;
- route reduction;
- touch targets;
- overflow;
- 200% zoom.

### Pass E — interaction
- keyboard and focus;
- transition duration;
- reverse/repeated selection;
- reduced motion;
- layout shift;
- mobile touch.

## 7. Approval statuses

### VISUALLY APPROVED / LOCKED
Use only when:
- native screenshots reviewed;
- material P0/P1 gaps resolved;
- live interactions reviewed where applicable;
- responsive evidence accepted;
- content is production-representative.

### PROVISIONALLY ACCEPTED
Use when:
- foundation is usable;
- no technical blocking issue;
- known visual or content dependencies remain;
- backlog is explicit.

### CORRECTION REQUIRED
Use when:
- focal architecture is wrong;
- important content is clipped/unreadable;
- mobile structure is broken;
- state hierarchy is ambiguous;
- evidence does not match tested commit.

## 8. Fidelity ledger template

| Checkpoint | Reference evidence | Runtime evidence | Finding | Action/decision |
|---|---|---|---|---|
| focal point | | | | |
| copy hierarchy | | | | |
| central object | | | | |
| route system | | | | |
| surface/color | | | | |
| typography | | | | |
| spacing | | | | |
| mobile | | | | |
| interaction | | | | |

## 9. Automated gates

Future workflows should retain:

- lint;
- typecheck;
- unit;
- build;
- E2E;
- visual fixtures;
- no horizontal overflow;
- single H1;
- accessibility states;
- console/hydration error scan;
- secret/network/persistence checks where relevant;
- evidence existence and commit linkage.

Automation cannot grant visual approval on its own.

## 10. Final human checklist

- What is seen first?
- Is that the intended focal point?
- Does cyan communicate state rather than decoration?
- Are the central object's size and mass sufficient?
- Do connectors explain something?
- Is any critical text treated as microcopy?
- Does the page alternate density?
- Does mobile feel designed rather than compressed?
- Is unavailable functionality honest?
- Would a high-end digital studio sign off on this exact runtime?
