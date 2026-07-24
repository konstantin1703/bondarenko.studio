# BND.STUDIO — Visual Architecture Reference

**Stage:** 10 — Visual Architecture Audit & Reference Control System  
**Status:** analytical baseline  
**Product code changes:** none  
**Stage 9 working baseline:** `8243504ac614ce99dfc80545aa987d47116bf492`

## 1. Purpose

This document converts the supplied Hero, Central Panels and Configurator references, the Stage 3 specifications and Stage 9 runtime evidence into a testable visual architecture system.

Conclusion labels:

- **REFERENCE PRINCIPLE** — directly observable in supplied references.
- **CURRENT BND IMPLEMENTATION** — directly observable in Stage 9 runtime evidence.
- **INFERENCE** — reasoned BND adaptation.
- **ASSUMPTION** — must be rechecked after real content, Blender or production functionality.
- **UNCONFIRMED** — source evidence is insufficient.

Pixel-perfect identity is not the objective. The objective is controlled transfer of composition, hierarchy, density, framing, routes, light, color, typography and system character.

## 2. Source hierarchy

1. Hero reference — 1630 × 965.
2. Central Panels reference — 1536 × 1024.
3. Configurator reference — 1672 × 941.
4. Additional user continuity images.
5. Stage 3 architecture, design system, component variants, motion spec, measurements and tokens.
6. Stage 9 runtime evidence: desktop/mobile full page, section screenshots, contact sheets, overlays and diffs.

Product truth, accessibility and honest data override decorative imitation.

## 3. Core principles

### Composition

- **REFERENCE PRINCIPLE:** each scene has one dominant focal point and one supporting focal point.
- **REFERENCE PRINCIPLE:** controlled asymmetry is stabilized by an outer frame and repeated alignment anchors.
- **REFERENCE PRINCIPLE:** dense technical regions are balanced by readable copy zones.
- **REFERENCE PRINCIPLE:** a central object explains the section; it is not decorative filler.
- **ADAPTATION RULE:** literal dimensions may change, relative visual weight and reading order may not.

### Hierarchy

| Level | Typical role | Contrast | Border/glow budget |
|---|---|---|---|
| PRIMARY | Hero H1, Hero Cube, selected task/current step | highest | one local maximum glow source |
| SECONDARY | module group, architecture preview, major evidence panel | medium-high | border glow or restrained fill |
| TERTIARY | labels, chips, status rows, inactive cards | medium/low | thin line, no bloom |
| BACKGROUND | grid, guides, coordinate marks, peripheral routes | low | no bloom |

No local scene may contain two equally bright PRIMARY surfaces unless they intentionally form one pair, such as Hero H1 and Hero Cube.

### Density

The references use controlled overload, not uniform clutter:

- Hero: high density around Core, medium around copy.
- Problem Explorer: high density center/right.
- Product Assembler: high density around the octagonal core, medium at left.
- Configurator: high task density center, controlled orientation left, structured preview right.
- Lower page: alternating medium and low density.

### Light

- Primary light belongs to the active object or state.
- Secondary panels use border/node light, not broad cyan fill.
- Background grids never bloom.
- Disabled/pending states remain readable.
- Glow must explain hierarchy, state or route.

## 4. Composition maps

Documentation-only diagrams:

- `docs/visual-audit/hero-composition-map.svg`
- `docs/visual-audit/central-panels-composition-map.svg`
- `docs/visual-audit/configurator-composition-map.svg`
- `docs/visual-audit/full-page-composition-map.svg`

## 5. Hero architecture

Reading path:

`brand/nav → technical label → H1 → body → CTA → Core → supporting HUD → bottom system strip`

| Parameter | Reference | Current BND | Target rule |
|---|---:|---:|---|
| Copy zone | ≈40% width | ≈48–50% visible width | 39–44% working width |
| Core/HUD zone | ≈60% | ≈50–52% | 56–61% working width |
| Core bbox | ≈590–620 × 500–535 at 1630 | ≈595 × 480 at 1400 | physical bbox may remain; perceived mass must increase |
| Header | ≈74–82 px | ≈75 px | 72–82 px |
| H1 | ≈86–98 px condensed | visually ≈72–82 px, wider fallback | three-line dominance, 34–42% scene height |
| Bottom strip | ≈88–92 px | ≈92 px | 9–11% Hero height |

**CURRENT GAP:** the proxy has a credible bounding box but insufficient material mass, occlusion and local light. It reads as a wireframe system panel rather than a heavy AI Core.

**ADAPTATION RULE:** do not enlarge the future Blender Cube first. Restore material weight, shadow, concentrated Core halo and local contrast, then recalibrate size.

## 6. Central Panels architecture

Reference top grid is approximately `23% / 46% / 24%` plus narrow gaps. Current BND is approximately `27% / 45% / 27%`.

- Left: diagnosis and selection.
- Center: system logic and central object.
- Right: process outcome/evidence.
- Bottom: normalized properties or workflow.

Macro proportions are viable. The central Core is currently too close in luminance to selected cards and right evidence panels.

**ADAPTATION RULE:** preserve geometry; strengthen central object occlusion/local light and reduce tertiary border intensity by one hierarchy level.

The Product Assembler uses the same narrative direction but a different object role:

- cube = analysis/routing;
- octagonal core = product assembly;
- right panel = preliminary stack and principles;
- workflow strip = delivery path.

## 7. Configurator architecture

Reference columns: approximately `24.5% / 45% / 25.7%`. Current BND: approximately `24% / 46% / 26%`.

Macro layout is already close. Future correction must focus on:

- stronger current-step dominance;
- clearer selected-card contrast;
- reduced microcopy noise;
- more legible preview routes;
- stronger distinction between orientation, task and result areas;
- major mobile simplification.

## 8. Full-page measurements

### Desktop — 1440 × 6374

| Section | Height | Page share | Density | Audit |
|---|---:|---:|---|---|
| Hero | 965 | 15.1% | high/uneven | correct scene height; Core mass low |
| Problem Explorer | 500 | 7.8% | high | compact; hierarchy needs calibration |
| Product Assembler | 514 | 8.1% | high | left side visually weaker |
| Configurator | 941 | 14.8% | high | correct desktop scale |
| Projects | 700 | 11.0% | medium | credible but grid-heavy |
| Workflow | 700 | 11.0% | low-medium | sparse for its height |
| Technologies | 720 | 11.3% | medium | balanced split; low microcopy contrast |
| Contact | 763 | 12.0% | medium-low | long pending low-energy scene |
| Footer | 355 | 5.6% | low | appropriate closing band |

Projects, Workflow and Technologies repeat a 700/700/720 px cadence. Future calibration must vary internal and vertical rhythm without forcing equal heights.

### Mobile — 390 × 15365

| Section | Height | Page share | Main issue |
|---|---:|---:|---|
| Hero | 1385 | 9.0% | Core becomes isolated/secondary |
| Problem Explorer | 1909 | 12.4% | long selector/module stack |
| Product Assembler | 1521 | 9.9% | repetitive vertical sequence |
| Configurator | 3249 | 21.1% | dominates total page length |
| Projects | 1845 | 12.0% | six-card fatigue |
| Workflow | 1336 | 8.7% | readable vertical timeline |
| Technologies | 1764 | 11.5% | two long stacks |
| Contact | 1416 | 9.2% | disabled controls consume height |
| Footer | 758 | 4.9% | acceptable |

**P0 INFERENCE:** mobile correction must be structural simplification, not global scaling.

## 9. Global alignment system

Approximate desktop guides:

- outer frame: 8–14 px from viewport;
- content gutter inside major frame: 40–56 px;
- primary left anchor: 4–7% viewport;
- center split: 42–46%;
- right evidence anchor: 73–76%;
- bottom strip baseline: 88–94% scene height;
- section number: top-right, tertiary.

| Region | Current | Rule |
|---|---|---|
| Header ↔ Hero | aligned | preserve |
| Hero copy ↔ Problem heading | close | shared anchor range, not exact pixel identity |
| Central Panels ↔ Configurator | coherent frame width | preserve |
| Projects/Workflow/Technologies | same width but repetitive | preserve width, vary internal rhythm |
| Contact ↔ Footer | aligned | strengthen closing transition |
| Mobile | stable narrow column | reduce repeated bordered stacks |

## 10. Scene and spacing hierarchy

Scene classes:

- **XL:** Hero, Configurator.
- **L:** Projects, Technologies, Contact.
- **M:** Problem Explorer, Product Assembler, Workflow.
- **S:** Footer and transition bands.

Spacing tiers:

| Tier | Range | Use |
|---|---:|---|
| XS | 4–8 px | icon/label, micro-node |
| S | 10–14 px | chips and compact rows |
| M | 16–24 px | card padding/internal groups |
| L | 28–40 px | major panel padding |
| XL | 48–72 px | heading-to-scene offsets |
| SECTION | 72–112 px | section top/bottom rhythm |
| SCENE | 120–180 px | controlled breathing between focal regions |

Dense technical clusters use S/M; copy and focal-object separation use L/XL.

## 11. HUD dictionary

| Element | Role | Use | Avoid | Mobile |
|---|---|---|---|---|
| Outer frame | scene boundary | one per major section | frame around every chip | retain, simplify corners |
| Double/nested frame | focal depth | Core and primary system panels | generic text cards | preserve only around focal object |
| Cut corner | brand geometry | major panels, selected cards, primary CTA | every badge | smaller cut |
| Micro-label | technical support | eyebrow, category, state | essential instructions | merge/remove nonessential |
| System index | orientation | section/process number | random repetition | retain major indices |
| Status marker | state | live/pending/selected/verified | fake production status | icon/shape plus text |
| Connector endpoint | route port | semantic modules | decorative line endings | simplify and enlarge visually |
| Route | relation | Core/module/process flow | arbitrary crossing | ordered path/sequence |
| Data/stack chip | metadata | short technology/capability label | prose | wrap in compact groups |
| Status console | operational evidence | Hero/system diagnostics | every section | reduce or hide |
| Coordinate marker | background orientation | Hero/Central Panels | Contact form | remove |
| Active border | selected state | one local item | all cards | preserve high contrast |
| Timeline node | progression | Workflow/progress | decorative card icon | vertical line/node |
| System map | architecture explanation | Core/preview/stack | generic illustration | linearize |

## 12. Line system

| Category | Width | Opacity | Glow | Meaning |
|---|---:|---:|---|---|
| STRUCTURAL | 1 px | 18–32% | none | frame support |
| BOUNDARY | 1 px | 24–40% | minimal | panel limit |
| CONNECTOR | 1–1.5 px | 32–60% | node only | semantic relation |
| ACTIVE ROUTE | 1.5–2 px | 75–100% | restrained | active semantic flow |
| BACKGROUND ROUTE | 1 px | 8–18% | none | composition only |
| GUIDE | 1 px | 6–14% | none | orientation |
| GRID | dot/1 px | 5–12% | none | depth |
| DIVIDER | 1 px | 12–24% | none | grouping |

Current issue: multiple categories share similar cyan and opacity, flattening hierarchy.

## 13. Color and glow roles

- BACKGROUND: near-black blue/green — preserve.
- SURFACE: dark transparent — preserve.
- ELEVATED SURFACE: currently weak — use only around primary panels.
- PRIMARY TEXT: near-white — preserve.
- SECONDARY TEXT: raise contrast in long copy.
- MUTED TEXT: technical support only; currently overused.
- CYAN PRIMARY: concentrate on focal state.
- CYAN SECONDARY: modules/routes.
- CYAN TECHNICAL: frames/grid; reduce frequency.
- ACTIVE: bright border + fill + marker.
- DISABLED: dim but readable.

Glow rules:

1. only PRIMARY may use maximum glow;
2. secondary panels use border or node glow, not both at maximum;
3. grid/guides never bloom;
4. selected glow is reinforced by fill, border and marker;
5. glow cannot obscure 1 px geometry or text edges.

## 14. Typography architecture

| Role | Relative scale | Behavior | Current gap |
|---|---|---|---|
| Hero display | 1.00 | condensed, 3 lines, 0.92–0.98 line-height | fallback wider/less compressed |
| Section H2 | 0.42–0.55 | scale varies by scene role | lower sections too uniform |
| Panel heading | 0.18–0.26 | 1–2 lines | hierarchy sometimes collapses |
| Body | 0.13–0.17 | 45–75 characters | muted contrast |
| Secondary body | 0.10–0.13 | support only | often too small |
| Micro-label | 0.07–0.09 | technical uppercase | cannot carry critical meaning |
| Status/terminal | 0.06–0.08 | short monospace | limit frequency |
| Numeric index | 0.08–0.14 | orientation | preserve |
| Button | 0.10–0.13 | concise/high contrast | 44–52 px target |
| Technology tag | 0.07–0.10 | compact | no long labels |

Critical copy must not be reduced to reference-like unreadable microtext. Density is recreated through grouping, layers and spacing.

## 15. Card system

| Type | Required anatomy | Distinguishing feature |
|---|---|---|
| Primary action | number/icon, title, explanation, state marker | strongest local border/fill |
| Selectable card | semantic control, title, description | selected marker + border + surface |
| System module | icon/code, label, role | connector port |
| Info panel | heading/body/tags | no selected state |
| Status panel | state label/evidence rows | strong state header |
| Process step | index/title/artifact | timeline node |
| Stack chip | short label/code | compact, one level |
| Principle item | number/title/explanation | ordered ruleset, not badge grid |
| Project category | category/description/tags | static article, not button |
| Contact field | visible label/control/help | form semantics |
| Footer item | navigation/status | low hierarchy |

Lower sections already use distinct semantic component families, but outer-frame intensity remains too similar.

## 16. Central objects

### Hero Cube

- dominant physical object on the right;
- safe crop preserves front, right and top faces;
- approximate visible target: 36–41% viewport width, 50–58% Hero height;
- dark material creates mass while preserving panel detail;
- cyan belongs to seams, Core and active internal layers;
- no HTML/navigation/peripheral HUD rendered into Blender;
- scroll reveal exposes data, AI, integrations, interfaces, automation and analytics as architecture, not explosion.

### Problem Explorer Core

- routing hub, not second Hero;
- approximate width: 17–21% section width;
- supports six module relations;
- selected state changes inner light/route priority, not geometry;
- visually heavier than peripheral modules.

### OctagonalCore

- front-facing layered SVG-like product core;
- approximate width: 13–16% section width;
- one primary active contour among several transparent layers;
- external routes belong to layout;
- lighter/flatter than both cubes.

### Configurator preview

- diagram, not decorative centerpiece;
- nodes remain legible and routes encode direction;
- hierarchy is improved through grouping, not additional glow;
- mobile becomes an ordered vertical flow.

## 17. Background and motion intent

Global background:

- near-black base;
- restrained vignette;
- shared outer frame;
- low-opacity grid/coordinate logic.

Local background:

- Hero: radial halo and directional lines;
- Central Panels: dot grid and route field;
- Configurator: preview grid;
- Projects/Workflow/Technologies: sparse guides;
- Contact/Footer: reduced complexity.

Motion intent only:

| Region | Intended response | Static fallback |
|---|---|---|
| Hero Cube | controlled scroll reveal | closed cube + named layers |
| Hero HUD | staged emphasis | one active panel |
| Problem Explorer | selection changes Core/modules/routes/process | visible selected state |
| Product Assembler | direction changes core layers/stack/principles | active route and labels |
| Configurator | step/preview update | current step and summary |
| Workflow | optional reveal | complete static timeline |
| Footer | static closure | unchanged |

Reduced motion removes scrubbing, pulse and nonessential transforms.

## 18. Must Keep

1. One focal point per local composition zone.
2. Controlled asymmetry inside stable frames.
3. Modular cut-corner language.
4. State-based cyan hierarchy.
5. Layered panel depth.
6. Semantic connector logic.
7. Technical microcopy as support only.
8. Dark system background.
9. Controlled glow near active state.
10. Alternation of high/low density.
11. Readable whitespace.
12. Distinct objects for distinct business meanings.
13. HTML/CSS/SVG separated from Blender assets.
14. Responsive simplification.
15. Honest data/pending states.
16. Accessibility as visual architecture.
17. One H1 and semantic heading order.
18. Reversible/interruption-safe motion.
19. Selected state independent of glow.
20. Full-page continuity from problem to contact.

## 19. Must Not Copy

1. Reference text/logos.
2. Unverified metrics, case counts or percentages.
3. Fake cases/testimonials.
4. Unconfirmed technology claims.
5. Raster defects, duplicate/malformed text.
6. Unreadable micro-labels.
7. Literal dimensions without adaptation.
8. Rasterized UI controls.
9. Random HUD noise.
10. Connectors with no role.
11. Equal cyan glow everywhere.
12. Fake production status.
13. Game-interface theatrics.
14. Excessive bloom/particles/glitch/pulse.
15. Desktop density compressed into mobile.
16. Embedded UI text inside Blender render.
17. Identical card grids across all sections.
18. Typography distortion hacks.
19. Unmatched generic icons.
20. Content hidden until animation completes.
