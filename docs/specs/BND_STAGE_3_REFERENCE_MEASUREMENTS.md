# BND.STUDIO — Stage 3 Reference Measurements

**Статус:** preliminary  
**Метод:** анализ фактических PNG-размеров, визуальная координатная оценка, выборочная RGB-кластеризация и ручная проверка композиционных границ.  
**Ограничение:** исходники не содержат Figma grids, CSS, шрифтов и исходных SVG; значения ниже не являются доказательством оригинальных design tokens.

## 1. Фактические исходники

| Reference | Фактический размер | Роль |
|---|---:|---|
| Hero | 1630 × 965 | Первый экран, кубический BND AI Core |
| Central panels | 1536 × 1024 | Problem Explorer и Product Assembler |
| Configurator | 1672 × 941 | Трёхколоночный конфигуратор |

## 2. Методология confidence

- `high` — граница или размер ясно читаются по пиксельной рамке/viewport.
- `medium` — значение оценено по устойчивым визуальным ориентирам, но может включать anti-aliasing и масштабирование.
- `low` — объект частично перекрыт, имеет glow, перспективу или неизвестный исходный масштаб.

## 3. Hero — 1630 × 965

| Параметр | Preliminary value | Метод измерения | Confidence | Комментарий |
|---|---:|---|---|---|
| Внешний page frame | 10–14 px | Видимая рамка по краям PNG | high | Рамка почти касается viewport |
| Основной полезный контейнер | ≈1604–1608 px | Viewport минус внешние рамки | high | Full-width interface frame |
| Высота header | 74–82 px | Верхняя граница до горизонтального divider | high | Активный nav underline входит в header |
| Левый контентный отступ | 86–112 px | Начало eyebrow/heading | medium | Больше базового page gutter |
| Hero grid | 2 основных зоны | Композиционный анализ | high | Copy слева, media/HUD справа |
| Соотношение зон | ≈40:60 | По bounding boxes copy и Core | medium | Core визуально выходит за колонку |
| Gap/overlap между зонами | 20–48 px | Между copy и периферийными HUD-панелями | low | Слои частично перекрываются |
| Верх основного контента | ≈145–155 px | Eyebrow и HUD card top | medium | После header остаётся 55–70 px |
| Нижняя technology/status strip | y≈830–920, h≈88–92 px | По внешним рамкам strip | high | Отдельная нижняя зона |
| Hero Core bounding box | ≈590–620 × 500–535 px | Видимый куб без внешней платформы | medium | Perspective/glow усложняют границу |
| HUD platform bounding box | ≈820 × 300 px | По круговой базе | low | Много прозрачных линий |
| Крупный display heading | ≈86–98 px | По высоте прописных и строк | medium | Condensed, line-height ≈0.92–0.96 |
| Supporting body | ≈17–19 px | По строкам под heading | medium | Серо-белый вторичный текст |
| CTA height | ≈50–54 px | По внешней рамке кнопки | medium | Primary и secondary равной высоты |
| Panel padding | 20–28 px | По HUD cards | medium | У панелей разная плотность |
| Базовая линия | 1 px | По frame/connector | high | Активные линии 1.5–2 px |
| Малый срез | 7–10 px | По CTA и небольшим cards | medium | Диагональ короткая |
| Большой срез | 16–24 px | По крупным outer frames | medium | Зависит от размера панели |
| Микродетали | высокая плотность справа, средняя слева | Визуальный аудит | high | Copy остаётся главным |

### Hero balance

- Заголовок и Core — два равноправных крупных фокуса.
- CTA находится ниже copy и не конкурирует с Core.
- HUD-панели имеют третичный приоритет.
- Нижняя strip связывает Hero с остальным интерфейсом.
- Метрики из референса не переносятся без подтверждения.

## 4. Central panels — 1536 × 1024

| Параметр | Preliminary value | Метод измерения | Confidence | Комментарий |
|---|---:|---|---|---|
| Внешний page frame | 7–10 px | Видимые угловые рамки | high | Два больших stacked frames |
| Верхняя секция | y≈8–515, h≈507 px | Frame boundaries | high | Problem Explorer |
| Нижняя секция | y≈530–1006, h≈476 px | Frame boundaries | high | Product Assembler |
| Межсекционный gap | ≈14–18 px | Между frames | high | Сохраняет «единый интерфейс» |
| Header внутри каждой секции | ≈38–44 px | Brand/nav/CTA line | high | Повторяющийся shell |
| Верхняя grid: left | ≈350–360 px | x≈45–405 | medium | Сценарии |
| Верхняя grid: center | ≈690–705 px | x≈412–1110 | medium | Куб и 6 модулей |
| Верхняя grid: right | ≈360–370 px | x≈1118–1485 | medium | Process flow |
| Основные gaps | 12–18 px | Между зонами | medium | Узкие технологические просветы |
| Нижняя grid: left | ≈375–390 px | Heading/metrics | medium | Текст и доказательные блоки |
| Нижняя grid: center | ≈650–680 px | Core + 4 directions | medium | Центральная сборочная схема |
| Нижняя grid: right | ≈355–370 px | Stack + principles | medium | Две stacked panels |
| Workflow strip | y≈894–982, h≈84–90 px | Нижняя рамка | high | 5 этапов |
| Problem cube | ≈235–270 px | По центральному объекту | low | Glow и 3D-перспектива |
| OctagonalCore | ≈185–205 × 165–182 px | По внешнему силуэту | medium | Ratio ≈1.08–1.18 |
| Левый display heading | ≈49–58 px | По прописным | medium | Condensed uppercase |
| UI heading/card title | ≈14–18 px | По карточкам | medium | Разные уровни |
| Body/microcopy | ≈11–14 px | Внутри modules | medium | Критический текст нельзя оставлять 9 px |
| Базовая линия | 1 px | Borders/routes | high | Active ≈1.5–2 px |
| Малый срез | 6–10 px | Module cards | medium | Преимущественно 45° |
| Section-frame срез | 12–18 px | Внешние frames | medium | Corner brackets отдельным слоем |
| Плотность микродеталей | высокая в center, средняя в side panels | Аудит | high | Нельзя равномерно шуметь по всей секции |

### Central panels balance

- Top panel: left selector → center system → right outcome.
- Bottom panel: left proposition → center product assembly → right evidence.
- Центральные объекты не занимают всю секцию; они работают как routing hub.
- Восьмиугольное ядро визуально легче куба и должно оставаться фронтальным.

## 5. Configurator — 1672 × 941

| Параметр | Preliminary value | Метод измерения | Confidence | Комментарий |
|---|---:|---|---|---|
| Внешний page gutter | ≈16 px | Main frames | high | Header растянут по viewport |
| Header height | ≈69–72 px | Divider y≈70 | high | CTA справа |
| Main section top/bottom | y≈88–906 | Frame boundaries | high | h≈818 px |
| Left column | ≈410 px | x≈16–426 | high | Intro + progress |
| Center column | ≈748–752 px | x≈442–1193 | high | Form |
| Right column | ≈430–434 px | x≈1204–1637 | high | Preview |
| Inter-column gaps | ≈14–16 px | По рамкам | high | Системный rhythm |
| Center inner horizontal padding | ≈38–42 px | Content start | medium | Stable across cards/form controls |
| Left inner padding | ≈28–32 px | Heading start | medium | Title visually dominates |
| Option card width | ≈207–210 px | 3 cards in row | high | 3-column card grid |
| Option card height | ≈188–198 px | First/second row | medium | Variable due to text |
| Card gap | ≈18–22 px | Между cards | high | Horizontal and vertical similar |
| Left display heading | ≈56–64 px | По 4 строкам | medium | Condensed uppercase |
| Center step heading | ≈29–34 px | Main form heading | medium | UI grotesk |
| Body | ≈14–16 px | Instructions/card text | medium | Secondary text smaller |
| Technical labels | ≈10–12 px | Eyebrow/LIVE/tags | medium | Не критическая информация |
| Form control height | ≈38–44 px | Selects/chips | medium | Stage 3 raises touch target to 44px |
| Bottom action button | ≈50–54 px | Continue button | medium | Primary CTA |
| Базовая линия | 1 px | Frame and cards | high | Selected outline ≈2 px |
| Малый срез | 7–10 px | Chips/controls | medium | Не стандартный radius |
| Крупный frame срез | 12–16 px | Main center frame | medium | Corner brackets отдельны |
| Preview node size | ≈108–135 × 110–118 px | 3+2 architecture nodes | medium | Нужен responsive bounded DAG |

### Configurator balance

- Левая колонка объясняет и ориентирует.
- Центральная колонка является primary task area.
- Правая колонка должна быть видимой, но не перетягивать внимание с текущего шага.
- Selected card отличается outline, fill, marker и иконкой, а не только glow.
- Bottom action row стабилизирует навигацию между шагами.

## 6. Preliminary color sampling

| Роль | Наблюдаемый диапазон | Принятый preliminary token | Confidence |
|---|---|---|---|
| Самый тёмный фон | RGB ≈ (0–3, 7–13, 11–19) | `#020C11` | high |
| Вторичный фон/panel dark | RGB ≈ (2–10, 18–32, 25–38) | `#041117` / `#071820` | medium |
| Основной cyan в Hero | RGB ≈ (58–72, 190–205, 184–198) | `#49C9C1` | medium |
| Активный cyan в panels | RGB ≈ (0–20, 200–240, 200–240) | `#2ED8D5` | medium |
| Muted cyan line | RGB ≈ (0–30, 105–140, 110–145) | `#16777C` / `#1A8B90` | medium |
| Primary text | RGB ≈ (232–248, 237–249, 239–249) | `#F3F6F6` | high |
| Secondary text | RGB ≈ (140–185, 155–205, 158–216) | `#A7B4B8` | medium |
| Muted text | RGB ≈ (73–120, 85–138, 90–144) | `#788A90` | medium |

## 7. Measurement decisions for Stage 4

1. Использовать фактические PNG-size как screenshot viewport.
2. Сначала сравнивать structural/spatial geometry, затем typography и цвета.
3. Не пытаться подогнать неизвестный шрифт через десятки исключений.
4. Все размеры Core держать за responsive container contract.
5. Первая browser calibration должна проверить CSS pixel scale, line wrapping, 1px border sharpness, clip-path artifacts, SVG filter strength и DPR.
6. После первого overlay значения можно обновлять, сохраняя token names.
