# BND.STUDIO — Stage 3 Component Variants

**Статус:** preliminary specification  
**Источник:** Stage 2 component tree (70 components), visual references and Stage 3 tokens.  
**Назначение:** единый handoff для Figma variants и будущих component states; production-компоненты на этом этапе не создаются.

## 1. Variant rules

1. Foundation geometry переиспользуется; секции не получают уникальную рамку без системной причины.
2. Hover не является единственным индикатором.
3. Selected отличается минимум тремя признаками: geometry/marker, fill/border и semantic control state.
4. Focus-visible не зависит от glow и не должен обрезаться `clip-path`.
5. Completed не выглядит как selected/current.
6. Error не обозначается только красным.
7. Disabled остаётся читаемым и при необходимости объясняет причину.
8. Motion всегда interruptible; latest selection wins.
9. Native control остаётся владельцем семантики, visual shell — presentation.
10. На mobile декоративные variants сокращаются, interaction states сохраняются.

## 2. Panel library — 10 variants

| Panel | Purpose | Geometry | Layers | Padding | States | Content limits | Responsive |
|---|---|---|---|---|---|---|---|
| HudPanel | Базовая системная поверхность | cut-sm/cut-md + optional SVG frame | surface, border, nested frame, content | 20–28 | default/hover/focus/active/selected | 1 heading + bounded slots | Padding/cut reduce |
| CutCornerPanel | Простая панель/контрол | CSS clip-path or mask | surface + border workaround + content | 16–24 | all control states | Без сложных segmented borders | cut-sm→cut-xs |
| NestedFramePanel | Крупный section/system frame | CSS shell + inline SVG inner frame | outer border, inner frame, micro corners | 24–40 | default/active | Medium/large content | Inner layer count reduces |
| InteractiveOptionPanel | Scenario/product/config option | Native control + visual shell | control, surface, marker, content | 18–24 | default/hover/focus/selected/disabled/error | Title + ≤2 short lines | Single-column cards on mobile |
| StatusPanel | Короткие системные statuses | cut-xs/cut-sm | surface, indicator, status list | 12–20 | default/live/success/error | ≤5 visible lines | Collapse to summary |
| ConsolePanel | Технический console block | rectangular with interrupted frame | surface, divider, monospace rows | 14–20 | idle/updating/error | Non-critical only | Hide decorative timestamp |
| ArchitecturePanel | Graph/summary/stack container | cut-md + SVG inner grid | surface, graph, summary, tags | 18–28 | empty/configuring/ready/invalid | Bounded node count | Graph→text/rail |
| HeroSystemPanel | Peripheral Hero module | cut-sm/cut-md | surface, label, mini graph/status | 16–22 | inactive/active/error | Short label + one status | Secondary panels hidden |
| MetricPanel | Verified trust indicator only | cut-sm | icon, value/label | 16–22 | default | No unsupported claims | Replace with principles if no metrics |
| ProjectCasePanel | System case narrative | cut-md/cut-lg | media, task, architecture, stack, result | 24–32 | default/hover/loading | Approved content only | Single stream; media manual |

## 3. Foundation and interactive variant matrix — 61 rows

| Component | Variant | State | Visual change | Interaction | A11y requirement | Motion |
|---|---|---|---|---|---|---|
| Header | desktop / compact / mobile | default | Высота, плотность nav и CTA меняются по breakpoint | Якорная навигация | Landmark header; menu button labelled | Nav underline 180ms |
| Header | desktop / compact / mobile | scrolled | Surface opacity слегка повышена; нижняя линия читаемее | Сохраняет доступ к nav | Не перекрывает target; focus visible | 140–220ms |
| NavigationItem | primary | default | Muted text, no glow | Link/button | Native link semantics | none |
| NavigationItem | primary | hover | Text secondary→primary; short line visible | Pointer feedback | Не единственный active indicator | 140ms |
| NavigationItem | primary | focus-visible | 2px offset outline + underline | Keyboard | AA contrast; outline not clipped | instant |
| NavigationItem | primary | active/current | Primary text + cyan underline + aria-current | Current section | `aria-current=page/location` | 220ms |
| CTA Button | primary | default | Cyan border, dark translucent fill, arrow | Primary action | Button/link role matches action | none |
| CTA Button | primary | hover | Fill +8–12% opacity; arrow shifts 3px | Pointer | Text remains stable | 140ms |
| CTA Button | primary | focus-visible | High-contrast outer focus ring | Keyboard | Visible without glow | instant |
| CTA Button | primary | loading | Label retained + progress indicator; no repeated activation | Submit | aria-busy; disabled semantics | standard |
| CTA Button | secondary | default | Muted border/text | Secondary action | Native link/button | none |
| CTA Button | ghost / technical / back | default | Minimal fill, directional icon | Navigation | Clear label, 44px target | none |
| HudPanel | default / elevated / interactive / console / architecture | default | Shared cut geometry and nested border | Container | Semantic element configurable | none |
| HudPanel | interactive | hover | Border opacity and surface lift; no large halo | Pointer | Hover not required for meaning | 180ms |
| HudPanel | interactive | focus-visible | Separate focus outline outside geometry | Keyboard | Not clipped by clip-path | instant |
| HudPanel | interactive | selected | Active outline + marker + selected fill | Selection | aria-checked/pressed from control | 220ms |
| HudPanel | status | error | Error icon + label + error edge; cyan reduced | Status | Error not color-only | 220ms |
| ScenarioCard | radio-like | default | Number, title, description, muted route cue | Selectable scenario | Radio/button semantics | none |
| ScenarioCard | radio-like | hover | Local border and arrow activate | Preview only or select on click | No domain change on hover | 140ms |
| ScenarioCard | radio-like | focus-visible | Focus bracket + visible label | Keyboard | Enter/Space activates | instant |
| ScenarioCard | radio-like | selected | Cyan border, left marker, selected fill, check/route state | Emits scenarioId | aria-checked=true | 220ms + route 480ms |
| ScenarioCard | radio-like | disabled | Muted but readable, no pointer cues | Unavailable option | disabled + reason text | none |
| SystemModule | node | inactive | Muted icon/line/text | Read-only visualization | Included in text summary | none |
| SystemModule | node | active | Bright node, active border, text primary | Derived state | Not focusable unless interactive | 280ms |
| SystemModule | node | transitioning | Short single pulse; no looping | State explanation | Reduced motion static | 480–650ms |
| ProductDirectionCard | radio-like | default | Panel + icon + concise description | Selectable direction | Radio semantics | none |
| ProductDirectionCard | radio-like | selected | Route anchor and edge emphasized; marker | Emits stable ID | aria-checked | 220ms |
| TechnologyItem | badge / tile / official-logo | default | Neutral container, label readable | Optional info action | Official logo alt rules | none |
| TechnologyItem | badge / tile | active | Cyan edge or icon accent; no invented logo recolor | Derived selection | Text label always present | 180ms |
| SelectableOptionCard | checkbox | default | Native control visually integrated | Multi-select | input + label + description | none |
| SelectableOptionCard | checkbox | selected | 2px active edge, check marker, selected fill | Toggle | aria-checked via native input | 220ms |
| SelectableOptionCard | radio | selected | Single selected marker; previous deselects | Single-select | fieldset/legend | 220ms |
| SelectableOptionCard | any | error | Error edge/label and linked message | Validation | aria-describedby; not red-only | 220ms |
| SelectableOptionCard | any | disabled | Readable muted state + reason | No activation | disabled semantics | none |
| FormField | text / textarea / select | default | Dark input, 1px border, label above | Edit | Explicit label | none |
| FormField | text / textarea / select | focus-visible | 1.5px cyan border + external focus cue | Edit | No clipped shadow dependency | 140ms |
| FormField | text / textarea / select | error | Error icon/text + border; helper preserved | Correct field | aria-invalid; linked error | 220ms |
| FormField | text / textarea / select | disabled | Lower opacity, readable label | Unavailable | disabled/read-only semantics | none |
| Tag | system / filter / status | default | Compact technical capsule, no large radius | Read-only or removable | Button only when actionable | none |
| Tag | removable | focus-visible | Visible focus and remove label | Remove | Accessible name | instant |
| ProgressStep | horizontal / vertical / compact | upcoming | Muted icon/text | Not activatable unless allowed | Step text present | none |
| ProgressStep | horizontal / vertical / compact | active | Cyan contour, current label, status marker | Current step | aria-current=step | 220ms |
| ProgressStep | horizontal / vertical / compact | completed | Success/check marker, lower intensity than selected | May navigate back | Completed ≠ active | 220ms |
| ArchitectureNode | source / ai / data / integration / output | default | Type-specific icon; common geometry | Optional focus | Text summary counterpart | none |
| ArchitectureNode | any | active | Edge + port active; restrained glow | Derived from graph | Not color-only | 220ms |
| ArchitectureNode | any | invalid | Warning marker; graph falls back to text | No broken interaction | Warning announced | none |
| Connector | straight / elbow / branch / external | inactive | 1px muted line | Decorative | aria-hidden; text summary exists | none |
| Connector | straight / elbow / branch / external | active | 1.5px active stroke + terminal nodes | Derived state | Reduced motion static | 480ms |
| Connector | straight / elbow / branch / external | pulse-once | Short moving segment once | State transition | Disabled for reduced motion | 650ms |
| ProjectCase | card / featured / detail | default | Task/solution/stack hierarchy | Open case | Article/heading semantics | none |
| ProjectCase | card / featured | hover | Preview cue + local border | Open/play preview | No autoplay with audio | 180ms |
| ProjectCase | card / featured | loading | Reserved media ratio + status | Wait | aria-busy where meaningful | none |
| StatusConsole | compact / full / live | default | Monospace lines, muted statuses | Read-only | Critical messages not micro-only | none |
| StatusConsole | live | updating | One current line/node updates | Derived state | aria-live only for meaningful changes | 220ms |
| StatusConsole | error | Error prefix/icon + safe text | Read-only | polite/assertive by severity | none |
| OctagonalCore container | static / active / transition | static | Transparent isolated SVG, no external routes | Read-only visual | aria-hidden if decorative | none |
| OctagonalCore container | static / active / transition | active | Selected inner contour and node accents | Derived state | No text-only meaning inside SVG | 320ms |
| OctagonalCore container | static / active / transition | transition | Single route response; no rotation | Explains selection | Reduced motion static active | 480ms |
| HeroSystemPanel | label / status / module | inactive | Low opacity frame/text | Read-only | Critical copy remains outside | none |
| HeroSystemPanel | label / status / module | active | One stage-related panel brightens | Derived from Hero stage | Stage summary announced separately | 320ms |
| HeroSystemPanel | label / status / module | media-error | Static fallback/status remains readable | No interaction loss | Error does not hide CTA | none |

## 4. Buttons

| Variant | Основная роль | Border/fill | Icon | Минимальная высота | Ограничения |
|---|---|---|---|---:|---|
| primary | Главный CTA / submit | active cyan border + dark active fill | trailing arrow/status | 52 px desktop, 48 px mobile | Один primary в локальной action group |
| secondary | Вторичный CTA | muted border + transparent fill | optional | 50 px | Не конкурирует с primary |
| ghost | Тихое действие | no persistent fill; local hover line | optional | 44 px | Не для единственного критического действия |
| technical | Utility/status action | compact frame + mono label | optional | 44 px | Не мельче touch target |
| icon | Один узнаваемый action | square visual, 44 px hit box | required | 44 px | Обязательный accessible name |
| back | Возврат | muted outline, leading arrow | required | 48 px | Не очищает данные |
| submit | Финальная отправка | primary + loading/success states | status icon | 52 px | Double-submit protection |

## 5. Form control specification

| Control | Desktop height | Mobile height | Border | Focus | Error | Notes |
|---|---:|---:|---|---|---|---|
| Text input | 44–48 px | 48–52 px | standard | active border + external ring | error border + icon + message | Label always visible |
| Textarea | min 112 px | min 128 px | standard | same as input | same | Resize policy controlled |
| Select | 44–48 px | 48–52 px | standard | same | same | Native/custom choice decided Stage 4 |
| Checkbox | 20 px control, 44 px hit area | same | 1–1.5 px | external focus | linked group error | Used for multi-select |
| Radio | 20 px control, 44 px hit area | same | 1–1.5 px | external focus | linked group error | Used for product/single choice |
| Multi-select chip | min 36 px visual, 44 px hit | 44–48 px | standard | outline | group error | Removable action named |
| Custom integration | 44–48 px | 48–52 px | standard | same | limit/format error | Not persisted in localStorage |
| Budget selector | 44–48 px | 48–52 px | standard | same | required error | Options externalized |
| Timeline selector | 44–48 px | 48–52 px | standard | same | required error | Options externalized |

## 6. Variant naming for Figma

```text
Component/Variant
Property=Value
State=Default|Hover|Focus|Active|Selected|Completed|Disabled|Loading|Error|Success
Density=Comfortable|Compact
Viewport=Desktop|Tablet|Mobile
```

## 7. Component-specific constraints

### ScenarioCard
- До 2 строк title и 2 строк description на desktop.
- Number/marker имеют фиксированную колонку.
- Выбор не зависит от hover.
- Route animation запускается родительским transition token.

### SelectableOptionCard
- Wrapper не заменяет `input`.
- Вся карточка может быть label/hit target.
- Custom option раскрывает отдельное поле.
- Selected marker видим в reduced-motion режиме.

### ArchitectureNode
- Node type определяется icon + label + category marker.
- Цвет не является единственным различием.
- Mobile имеет текстовую последовательность.

### OctagonalCore
- Внутренний SVG не знает selected product ID.
- External connectors принадлежат `ProductRoutes`.
- Core screenshot-тестируется на прозрачном фоне.

### HeroSystemPanel
- 1–2 ярких peripheral panels одновременно.
- Неинтерактивные panels не перехватывают pointer.
- Media error не скрывает CTA.

## 8. Acceptance checks

- Все interactive components имеют default, focus-visible, disabled и applicable selected/error states.
- Нет состояния, понятного только по glow.
- Минимальный hit area 44×44 CSS px.
- Selected и completed различимы.
- Critical microcopy не ниже 11 px.
- Cut-corner focus не обрезается.
