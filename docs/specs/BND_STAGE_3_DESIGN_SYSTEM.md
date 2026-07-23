# BND.STUDIO — Stage 3 Design System

**Файл:** `BND_STAGE_3_DESIGN_SYSTEM.md`  
**Этап:** Stage 3 — Design System  
**Дата фиксации:** 23 июля 2026  
**Статус:** завершён на уровне preliminary design system; production-код не создавался  
**Режим:** local-first, без GitHub, Figma-мутаций, Supabase, Telegram и публикации

# 0. Gate-check Stage 2

| Проверка | Результат |
|---|---|
| Полный `BND_STAGE_2_ARCHITECTURE.md` | Да, 2126 строк |
| Полный `BND_STUDIO_REQUIREMENTS_BASELINE.md` | Да, 811 строк |
| Component tree | 70 компонентов/примитивов |
| Domain decomposition | 13 доменов |
| Server/client boundaries | Найдены |
| State architecture | Hero, Problem, Product, Configurator |
| Data entities | 23 |
| Resolver contracts | 10 |
| Hero media abstraction | Найдена |
| Graph architecture | 3 системы |
| Responsive map | Найдена |
| ADR | 12 |
| DoR Stage 3 | READY WITH NON-BLOCKING GAPS |

Gate пройден. Stage 2 не реконструировался по памяти.

# 1. Executive Design Summary

BND.STUDIO получает dark-only, reference-first design system: тонкие HUD-линии, полупрозрачные тёмные поверхности, срезанные углы, модульные grids и ограниченный cyan emission.

Система разделяет foundation tokens, grids, panel primitives, typography roles, icon/connector grammar, controlled glow, component variants, responsive simplification, motion, accessibility, Hero и OctagonalCore specifications, visual fixtures.

Все недоказуемые значения помечены `preliminary`.

# 2. Decisions

## Confirmed
- Reference-first.
- Dark-only first version.
- HTML-first content.
- SVG-first HUD/Core.
- 3D only for central media.
- Separate mobile compositions.
- Controlled motion/reduced motion.
- No fictitious data.
- Visual regression from Stage 4.

## Preliminary
- Exact colors/opacities.
- Exact fonts/type sizes.
- Fine grid measurements.
- Glow strength.
- CSS mask/clip-path browser choice.
- Core micro-detail density.
- Hero media format.

# 3. Design Principles — 16

| Principle | Meaning | Practical consequence | Related architecture | Related requirement IDs |
|---|---|---|---|---|
| reference-first | Референсы определяют геометрию и плотность | Каждый Stage 4 screenshot сравнивается с target PNG | Stage 2 reference-first, visual fixtures | VIS-001–VIS-014; QA-001–QA-012 |
| dark-only | Первая версия использует только тёмную тему | Не создавать light tokens/variants без нового требования | Stage 3 confirmed direction | VIS-001–VIS-003 |
| interface-as-system | Секции выглядят как одна платформа | Общий frame, numbering, panels, routes, statuses | IA/section architecture | IA-001–IA-005 |
| thin-line construction | Геометрия строится тонкими линиями | 1px default, active до 1.5–2px | HUD primitives | VIS-004–VIS-009; SVG-001–SVG-006 |
| controlled cyan emission | Cyan сообщает state, а не заполняет экран | Tokenized accent/glow; inactive elements не светятся | Motion/visual safeguards | VIS-010–VIS-014; MOTION-001–MOTION-010 |
| modular grid | Композиция основана на повторяемых зонах | Section-specific grids используют общую spacing scale | Responsive architecture | IA-002; RESP-001–RESP-012 |
| cut-corner geometry | Срезы заменяют большие radius | Scale cut-xs…hero; complex frames SVG | HUD architecture | VIS-004; SVG-001–SVG-005 |
| data-driven variants | State и content приходят через contracts | Variants не дублируются в JSX | Data/resolver architecture | FE-004–FE-006; DATA-001–DATA-011 |
| HTML-first content | Текст и controls остаются семантическими | Не экспортировать copy/forms в bitmap | Server/client boundaries | FE-003; A11Y-001–A11Y-011 |
| SVG-first technical graphics | Routes/frames/Core — редактируемый SVG | Canvas не используется для обычных HUD-линий | ADR-005/006 | SVG-001–SVG-010; PROD-003–PROD-007 |
| 3D-only-for-central-media | 3D ограничен Core assets | HUD, copy и controls независимы от media | Hero media abstraction | 3D-001–3D-010; HERO-008–HERO-016 |
| progressive-simplification | Mobile имеет отдельную композицию | Скрывать декор, сохранять interaction/text meaning | ADR-011 | RESP-001–RESP-012 |
| accessibility-by-construction | A11y является component property | Native controls, focus, contrast, text graph summary | A11Y architecture | A11Y-001–A11Y-011 |
| motion-explains-state | Движение отражает resolver/state change | No decorative overload; reduced motion | Motion architecture | MOTION-001–MOTION-010 |
| no-fictitious-data | UI не содержит неподтверждённых claims | Metrics/cases gated by approval | Content governance | BUS-004–BUS-005; CASE-001–CASE-008 |
| visual-regression-friendly | Состояния детерминированы для screenshots | Stable data fixtures и named states | QA architecture | QA-001–QA-012 |

# 4. Grid and Layout

## Page frame

| Token | Preliminary value | Rule |
|---|---:|---|
| page max | 1760 px | Interface frame limit |
| content max | 1640 px | Main bounded content |
| desktop gutter | 40 px, reference calibration 12–20 | Full-width reference character |
| laptop gutter | 28–32 px | Reduce decor before content |
| tablet gutter | 24 px | No overflow |
| mobile gutter | 16 px | Touch-safe |
| header desktop | 76 px | Hero/configurator estimate |
| header compact | 64 px | Tablet/mobile |
| major frame gap | 16 px | Unified platform rhythm |
| panel gap | 12–20 px | Section-specific |
| panel padding | 16–40 px | Variant/breakpoint |

## Spacing scale

Base unit 4 px:

```text
0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
```

## Section grids

| Section | Desktop | Laptop | Tablet | Mobile |
|---|---|---|---|---|
| Hero | copy 5/12, media 7/12 | compressed 5/7 | stacked 8-col | one flow |
| Problem Explorer | 23/48/25% | compressed | selector + graph + flow | selector → summary → flow |
| Product Assembler | 25/45/25% | compressed | stacked | active card + Core + stack |
| Configurator | 25/46/27% | 3/2-column adaptive | preview below | single flow |
| Projects | featured grid | 2 columns | 1–2 | one stream |
| Workflow | 5 equal | compressed | wrapped/vertical | vertical |
| Technologies | grouped | reduced | wrapped | prioritized |
| Contact/Footer | wide zones | reduced | stacked | one column |

Container rules:
- Media may exceed logical column but reserves aspect ratio.
- Routes use viewBox, not page overflow.
- Focus wrapper remains outside clipped shell.
- Mobile visual order can adapt; semantic order stays logical.

# 5. Color System

All values preliminary.

```css
:root {
  --bnd-color-bg-primary: #020C11;
  --bnd-color-bg-secondary: #041117;
  --bnd-color-panel: rgba(5, 22, 29, 0.72);
  --bnd-color-panel-active: rgba(7, 46, 53, 0.86);
  --bnd-color-line-muted: #16777C;
  --bnd-color-line-primary: #1A8B90;
  --bnd-color-cyan-primary: #2ED8D5;
  --bnd-color-cyan-secondary: #49C9C1;
  --bnd-color-text-primary: #F3F6F6;
  --bnd-color-text-secondary: #A7B4B8;
  --bnd-color-text-muted: #788A90;
}
```

Contrast targets:
- body ≥4.5:1;
- large display ≥3:1;
- critical muted text ≥4.5:1;
- error/success not color-only.

# 6. Opacity and Layers

```text
background → grid → panel → nested frame → content → connector → active route → media/HUD → glow → micro-detail
```

Key opacities:
- grid .16;
- panel .72;
- inactive border .36;
- active border .92;
- muted route .22;
- active route .92;
- technical text .78;
- disabled .46;
- core glow .44.

# 7. Lines and Borders

| Token | Value | Use |
|---|---:|---|
| hairline | .75 SVG / 1 CSS px low opacity | grid/micro |
| standard | 1 px | default panels/routes |
| emphasized | 1.25 px | secondary active |
| active | 1.5 px | selected/route |
| hero-accent | 2 px max | focal edge |

Frame types: normal, nested, segmented, corner brackets, interrupted, route, focus, divider, input.

# 8. Cut Corners

| Token | Size | Use | Technique |
|---|---:|---|---|
| cut-xs | 4 | chips/micro | clip/pseudo |
| cut-sm | 8 | buttons/cards | clip/mask |
| cut-md | 12 | standard panels | mask/SVG |
| cut-lg | 18 | section panels | SVG frame |
| cut-hero | 28 | large Hero only | SVG/mask |

Focus and glow live on an unclipped wrapper.

# 9. Panel System

10 variants. Full matrix: `BND_STAGE_3_COMPONENT_VARIANTS.md`.

Rules:
- Max 3 visible border layers for ordinary panels.
- Section identity comes from composition, not random frame.
- Error/loading/success are semantic.
- Micro brackets are optional layers.

# 10. Typography

Original font unknown.

| Font | Role | Similarity | Cyrillic | Web availability | Risk |
|---|---|---|---|---|---|
| Oswald | Display Condensed | Высокая по пропорциям/ритму | Да | Open-source web fonts; self-host recommended | Проверить русские line breaks |
| IBM Plex Sans Condensed | Display Condensed | Средняя/высокая, инженерная | Да | Official IBM family, web files available | Может быть недостаточно узким |
| Roboto Condensed | Display Condensed | Средняя, нейтральнее | Да | Open-source web distribution | Может выглядеть стандартно |
| Manrope | UI Grotesk | Высокая для чистого UI | Да | Open-source web fonts | Геометричность может смягчить HUD |
| Inter | UI Grotesk | Высокая по читаемости | Да | Official web distribution/self-host | Не использовать как display replacement |
| IBM Plex Sans | UI Grotesk | Средняя/высокая, техническая | Да | Official IBM web family | Требует визуального сравнения |
| IBM Plex Mono | Technical / Mono | Высокая | Да | Official IBM web family | Следить за длиной статусов |
| PT Mono | Technical / Mono | Средняя/высокая | Да | Open-source/self-host | Ограниченная weight flexibility |
| Roboto Mono | Technical / Mono | Средняя | Да | Open-source web distribution | Может быть нейтральным |

A/B/C:
- A: Oswald + Manrope + IBM Plex Mono.
- B: IBM Plex Sans Condensed + IBM Plex Sans + IBM Plex Mono.
- C: Roboto Condensed + Inter + Roboto Mono.

13 type styles defined in JSON:
display-xl/lg, heading-xl/lg/md, body-lg/md/sm, label-md/sm, technical-md/sm, micro.

Critical rules:
- Main body ≥14 px.
- Critical technical text ≥11 px.
- Micro is decorative.
- Condensed display is not body.
- Cyrillic and line wraps validated before acceptance.

# 11. Iconography

- 24×24 base grid.
- Sizes 16/20/24/32/40.
- Stroke 1.5, active max 1.75.
- Hit target min 44.
- Custom SVG for system/product icons.
- Official assets for technology logos.
- No approximate brand redraw.

# 12. Connectors and Nodes

| Element | Geometry | Stroke | Motion |
|---|---|---:|---|
| connector | straight/45/orthogonal | 1 px | none |
| elbow | hard + chamfer | 1 px | activation |
| branch | explicit node | 1 px | bounded |
| active pulse | 18–36 px segment | 1.5 px | once |
| node | 3–4 px | fill | none |
| active node | 6–8 px | ring/fill | short |
| port | 6–10 px | ring | none |

Parallel routes ≥8 px desktop, ≥6 compact. Mobile uses rail/summary. SVG is decorative; HTML carries meaning.

# 13. Glow

| Token | Blur | Opacity | Use |
|---|---:|---:|---|
| none | 0 | 0 | inactive |
| subtle | 4 | .18 | node/hover |
| interactive | 8 | .24 | active control |
| selected | 14 | .32 | selected Core/card |
| hero | 24 | .38 | Hero media only |

No body glow, no large panel halo, no glow-only focus.

# 14. Background

Base CSS gradient, faint grid, local dotted matrix, selective coordinate SVG, controlled Hero radial support, subtle vignette, optional tiny noise texture. No moiré, moving full-page background or particles.

# 15. Component Variants and Controls

- 61 state rows.
- 10 panel variants.
- Native controls own semantics.
- Selected uses multiple cues.
- Controls min 44 px, comfortable 48–52 px.
- Full file: `BND_STAGE_3_COMPONENT_VARIANTS.md`.

# 16. OctagonalCore Specification

Only lower Product Assembler reference.

- Front-facing, no perspective.
- Ratio 1.08–1.18.
- Reference ≈185–205 × 165–182.
- Transparent isolated SVG.
- No background/platform/clipped external connectors.
- Dark glass center, thin segmented contours.
- Title BND ENGINE, subtitle ЯДРО СИСТЕМЫ.
- External anchors owned by ProductRoutes.

| Layer | Purpose | Geometry | Stroke/fill | Opacity | Animation allowed |
|---|---|---|---|---|---|
| 0 Isolation box | Независимый transparent canvas | Invariant viewBox; no clipped connectors | transparent | 1.0 | none |
| 1 Outer silhouette | Главная octagon geometry | 8-sided chamfered frame | stroke muted/active | 0.55–0.95 | active opacity |
| 2 Outer segmented contour | Технологическая разбивка края | Short segmented paths | cyan muted | 0.40–0.75 | single reveal |
| 3 Corner brackets | Акцентирует узлы/срезы | 4–8 short brackets | cyan line | 0.45–0.9 | short activation |
| 4 Secondary frame | Создаёт вложенность | Inset octagonal path | stroke | 0.38–0.72 | active |
| 5 Glass shell | Тёмный прозрачный объём | Inset fill shape | dark glass fill | 0.35–0.60 | fill alpha |
| 6 Inner segmented frame | Фокус к центру | Concentric stepped segments | cyan muted/active | 0.35–0.85 | stroke activation |
| 7 Central glass panel | Подложка title | Near-square dark panel | dark fill + thin border | 0.70–0.88 | none |
| 8 Title | BND ENGINE | HTML preferred or controlled SVG text | text primary | 1.0 | none |
| 9 Subtitle | ЯДРО СИСТЕМЫ | Technical label | technical cyan | 0.9 | none |
| 10 Internal nodes | Микро status points | bounded dots/short lines | cyan | 0.25–0.80 | one-shot |
| 11 Anchor map | Точки внешнего подключения | Named coordinates | invisible | n/a | none |

Mobile retains silhouette, 2–3 inner frames and title; minimum ≈132 px.

# 17. Hero Visual Specification

Priority: heading → Core → primary CTA → description → HUD labels → status details.

| Element | Position logic | Scale | Visual priority | Responsive behavior | Motion |
|---|---|---|---|---|---|
| Eyebrow | Left column top | Technical small | Tertiary | Hide non-critical parts | none/short reveal |
| Heading | Left dominant block | Display XL | Primary | 48px mobile clamp | none or opacity-only |
| Description | Below heading | Body LG | Supporting | Full text retained | none |
| Primary CTA | Below description | 52px control | Primary action | Full-width/fit | hover/press |
| Secondary CTA | Adjacent/stacked | 50px control | Secondary | Stack on mobile | hover |
| Trust indicators | Below actions | Cards/text | Conditional | Use principles if metrics unavailable | none |
| Technology strip | Bottom Hero | Compact row | Tertiary | Wrap/prioritized list | subtle |
| Status console | Bottom/right | Technical | Tertiary | Summary only | status update |
| Hero Core media | Right dominant | max 620px | Primary visual | max 340px / fallback | scroll-driven |
| HUD module cards | Around Core | small panels | Tertiary | Hide peripheral modules | stage activation |
| Connector routes | HUD overlay | thin paths | Tertiary/state | Reduce count | single pulse |
| Lower support platform | Under Core | large support | Secondary visual | simplified/removed | controlled |

Copy/HUD/media are separate layers. Hero remains useful on media failure. Mobile chooses lightweight source before desktop download.

# 18. Responsive Tokens

| Feature | Mobile | Tablet | Laptop | Desktop | Wide |
|---|---|---|---|---|---|
| gutter | 16 | 24 | 28–32 | 40 | 48 |
| columns | 4 | 8 | 12 | 12 | 12 |
| panel padding | 16–20 | 18–24 | 20–28 | 24–40 | 28–40 |
| line density | low | medium-low | medium | full | full |
| microcopy | hidden/prioritized | priority | partial | full | full |
| connector | summary | reduced | medium | full | full |
| motion | low | medium | medium/full | full | full |

| Section | Desktop ≥1440 | Laptop 1024–1439 | Tablet 768–1023 | Mobile <768 | Hidden/simplified | Interaction preserved |
|---|---|---|---|---|---|---|
| Header | Full nav + CTA | Tighter nav | Compact nav | Menu + CTA | Extra status details | yes |
| Hero | 2-column + full Core | 2-column compressed | Stack/overlap | Single flow | Peripheral HUD/routes | yes |
| Hero HUD | Full modules/routes | Reduced density | Current labels | Text summary | Micro labels | meaning preserved |
| Problem Explorer | 3-zone radial graph | Compressed 3-zone | Selector, graph, flow stacked | Selector → Core/summary → flow | Radial detail | yes |
| Product Assembler | 4 routes + right stack | Reduced gaps | Core/cards stacked | Active direction + compact Core | Inactive routes | yes |
| Configurator | 3 columns | Adaptive 3/2 | Intro/form then preview | Single flow + sticky progress | Desktop graph details | yes |
| Projects | Featured grid | 2 columns | 1–2 columns | Single stream | Autoplay | yes |
| Workflow | Horizontal | Compressed | Wrapped/vertical | Vertical | Decor arrows | yes |
| Technologies | Dense groups | Reduced columns | Wrapped groups | Prioritized list | Secondary logos | yes |
| Contact/Footer | Wide multi-zone | Reduced | Stacked | Single column | Decor routing/microcopy | yes |

# 19. Motion

Companion: `BND_STAGE_3_MOTION_SPEC.md`.

15 tokens: 7 durations, 5 easing, 3 stagger. No infinite pulse, glitch, rotation or scroll trap.

# 20. Accessibility

- Semantic landmarks/headings.
- Native controls, fieldset/legend.
- Visible external focus.
- Error icon + text + color.
- aria-current/aria-live where meaningful.
- Graph text summary.
- Decorative SVG aria-hidden.
- Touch targets ≥44.
- Reduced motion.
- No critical microcopy.

# 21. Figma Architecture

Pages 00 References through 18 Visual QA:
Foundations, Tokens, Grid, Typography, Colors, Icons, HUD Primitives, Components, Hero, Problem, Product, Configurator, Projects, Remaining, Responsive, Motion, Dev Handoff, Visual QA.

Naming:
`BND / Category / Component`, properties State/Density/Viewport/Motion.

No Figma file modified.

# 22. Token Naming

Examples:
`bnd.color.background.primary`, `bnd.color.surface.panel-default`, `bnd.border.width.hairline`, `bnd.corner.cut.md`, `bnd.type.heading.lg`, `bnd.motion.duration.standard`.

Token names remain stable when preliminary values change. JSON: `BND_STAGE_3_TOKENS.json` — 237 leaves.

# 23. Visual Regression Preparation

| Reference | Viewport | Main areas | Ignore until available |
|---|---:|---|---|
| Hero | 1630×965 | frame/header/copy-Core ratio/CTA/HUD | final Core surface and unsupported metrics |
| Panels | 1536×1024 | stacked frames/grids/Core/routes/workflow | exact 3D cube detail |
| Configurator | 1672×941 | columns/cards/progress/preview/actions | final content wrapping |

Order: frame → grid → columns → Core scale → headings → panels → connectors → color → opacity → line → glow → micro-details.

# 24. Risk Register — 15

| Risk ID | Risk | Probability | Impact | Mitigation | Validation stage |
|---|---|---|---|---|---|
| DSR-001 | Неизвестный оригинальный шрифт | High | High | Role-based shortlist; не лечить line wrap локальными хаками | Stage 4 typography overlay |
| DSR-002 | Кандидат имеет слабую кириллицу | Medium | High | Проверить русский specimen, Ё/Й/Щ/Ц и цифры | Figma/font proof |
| DSR-003 | Неточное масштабирование референса | Medium | High | PNG viewport preliminary; structural calibration первым шагом | First overlay |
| DSR-004 | Cyan слишком яркий | High | Medium | Accent/glow tokens, ограничение active zones | Visual diff + contrast |
| DSR-005 | Muted text теряет contrast | Medium | High | Minimum body/micro roles; AA targets | A11y QA |
| DSR-006 | Слишком много panel variants | Medium | Medium | 10 системных variants; reuse audit | Component review |
| DSR-007 | Clip-path обрезает focus/shadow | Medium | High | Focus layer outside clipped shell; browser matrix | Stage 4 browser QA |
| DSR-008 | SVG filters перегружают GPU | Medium | High | Shared filters, max visible filter budget | Performance profiling |
| DSR-009 | Иконография становится несогласованной | Medium | Medium | Grid/stroke normalization; official tech logos | Icon audit |
| DSR-010 | Микродетали конкурируют с контентом | High | Medium | Priority levels and responsive hiding | Visual hierarchy review |
| DSR-011 | Mobile теряет идентичность | Medium | High | Keep frame/cyan/core; simplify connectors only | Mobile visual QA |
| DSR-012 | Central object не совпадает с референсом | High | High | Isolated contracts and strict visual diff | Core asset QA |
| DSR-013 | Borders становятся слишком толстыми | Medium | Medium | 1px default; active cap 2px | Screenshot diff |
| DSR-014 | Pixel consistency невозможно поддерживать | Medium | Medium | Tokens + reusable primitives + fixtures | Regression cycle |
| DSR-015 | Figma и CSS tokens расходятся | Medium | High | One token JSON, mapped variables, change log | Dev handoff audit |

# 25. Traceability

Design target categories contain 161 P0/P1 requirements (109 P0, 52 P1).

| Artifact | IDs | Verification |
|---|---|---|
| Visual foundations | VIS-001–014 | visual audit |
| Hero | HERO-001–016 | fixture/diff |
| Problem | PROB-001–014 | state fixtures |
| Product | PROD-001–014 | Core/route diff |
| Configurator | CONF-001–029 | E2E/a11y/visual |
| Frontend handoff | FE-001–012 | Stage 4 review |
| SVG/HUD | SVG-001–010 | geometry snapshots |
| Accessibility | A11Y-001–011 | axe/manual |
| Responsive | RESP-001–012 | viewport matrix |
| Motion | MOTION-001–010 | reduced-motion tests |
| Performance | PERF-001–010 | profiling |
| QA | QA-001–012 | overlay/diff |

# 26. Acceptance Checklist

Все обязательные Stage 3 артефакты, tokens, measurements, grids, colors, panel/typography/icon/connector/glow systems, variants, controls, Core/Hero specs, responsive/motion/a11y/Figma/visual QA, risks и traceability созданы. Production-код и внешние мутации отсутствуют.

# 27. Definition of Ready — Stage 4 Local Foundation

# READY WITH NON-BLOCKING GAPS

Foundation можно начинать: tokens, panel primitives, cuts, typography roles, grids, states, SVG rules, OctagonalCore layers, Hero placeholder contract и reference viewports определены.

Gaps: exact font/logo/colors, final Hero copy/Core asset, approved cases and production privacy/budget data.

# 28. Stage Report

## Выполнено
- Gate-check Stage 2/Baseline.
- 3 references analyzed.
- 16 principles.
- 237 tokens.
- 10 panel variants.
- 61 component state rows.
- 13 type styles.
- 15 motion tokens.
- 15 risks.
- 161 P0/P1 requirements mapped.

## Tools
Files/Library, PNG references, Python/Pillow and JSON validation. Font shortlist availability checked via current public project sources. Figma/Adobe/GitHub/Supabase/Telegram not mutated.

## Artifacts
- BND_STAGE_3_DESIGN_SYSTEM.md
- BND_STAGE_3_TOKENS.json
- BND_STAGE_3_COMPONENT_VARIANTS.md
- BND_STAGE_3_MOTION_SPEC.md
- BND_STAGE_3_REFERENCE_MEASUREMENTS.md

## Next step
After approval: Stage 4 Local Foundation only.
