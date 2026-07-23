# BND.STUDIO — Stage 5.1 Targeted Hero Calibration Report

**Status:** `COMPLETED / AWAITING USER VISUAL APPROVAL`  
**Branch:** `stage5-hero-calibration-pass-2`  
**Base:** `stage5-hero-calibration@7087cada00baec6dd75d75ab1be7423f250e217a`  
**Validated implementation and evidence commit:** `764a273fc969a4a3cac7b8a42e4f490443302681`  
**Authoritative GitHub Actions run:** `30047476658`  
**Validation artifact:** `stage5-1-hero-764a273fc969a4a3cac7b8a42e4f490443302681` (`8579731176`)  
**Reference:** `tests/visual/references/hero.png` — 1630 × 965

The commit containing this finalized report is documentation-only. Its exact HEAD is validated by the latest successful PR check and recorded in PR #58/final handoff; product code and locked runtime evidence are unchanged after the commit above.

## Scope

Один ограниченный calibration pass. Stage 6 не запускался. Blender, render sequence, GSAP, WebGL, backend, Telegram и Supabase не добавлялись.

## Macro corrections

| Параметр | Reference | Stage 5 current | Stage 5.1 result | Target correction |
|---|---:|---:|---:|---|
| Левая граница H1 | 115 px | 119 px | 116 px | Сдвиг влево на 3 px |
| Максимальная ширина H1 | 585 px | 585 px | 590 px | Сохранён reference-scale; остаток 5 px относится к fallback font |
| Высота H1 block | 316 px | 279 px | 308 px | Увеличение визуальной высоты на 29 px |
| Центр Core zone | ≈1120 px | ≈1117 px | ≈1121 px | Возврат к reference center |
| Ширина Core silhouette | ≈540 px | ≈498 px | ≈540 px | +42 px visual mass |
| Высота Core silhouette | ≈500 px | ≈490 px | ≈500 px | Восстановлен reference bounding box |
| Расстояние H1 → Core | ≈150 px | ≈164 px | ≈147 px | Сокращение пустого промежутка |
| Верх Hero content | ≈159 px | ≈177 px | ≈159 px | Сдвиг вверх на 18 px |
| Нижняя technology zone | ≈918 px | ≈916 px | ≈921 px | Сохранён нижний ритм, расхождение 3 px |

Bounding boxes измерены по runtime PNG и overlay; Core значения имеют medium confidence из-за отсутствия финального Blender asset.

## Изменения

- H1 стал выше и плотнее, сохранил один semantic H1 и контролируемые переносы.
- Левая колонка поднята и получила reference-like вертикальный ритм.
- Детализированный wireframe заменён на честный тёмный silhouette proxy будущего Blender-куба.
- Core media zone увеличена без имитации финальных материалов.
- 3 основных HUD-модуля получили повышенную визуальную силу; вторичные модули приглушены.
- Connector routes разделены на основные и вторичные уровни.
- Header поднят и усилен как часть общего interface frame.
- Primary CTA, capability strip и bottom strip получили больший визуальный вес.
- Фон получил слабые radial guides, направляющие и более читаемую depth-систему.
- Cyan разделён на focal / primary route / decorative уровни.
- Tablet/mobile сохраняют самостоятельную композицию и упрощённые маршруты.

## Pixel comparison

| Метрика | Stage 5 | Stage 5.1 | Изменение |
|---|---:|---:|---:|
| Mean absolute error | 21.190 | 19.303 | улучшение 8.9% |
| RMSE | 53.090 | 49.359 | улучшение 7.0% |
| Grayscale correlation | 0.3425 | 0.4533 | +0.1108 |

Метрики являются дополнительным индикатором: финальный Blender Cube отсутствует и формирует значительную часть diff.

## Validation

| Command | Exit code | Result |
|---|---:|---|
| `npm ci` — local environment | 1 | Internal registry HTTP 503; clean CI run is authoritative |
| `npm ci` — GitHub Actions | 0 | PASS — official npm registry |
| `npm run tokens:build` | 0 | PASS — 235 variables |
| `npm run source:check` | 0 | PASS — 88 checks |
| `npm run lint` | 0 | PASS |
| `npm run typecheck` | 0 | PASS |
| `npm run test` | 0 | PASS — 7 tests |
| `npm run build` | 0 | PASS |
| `npm run test:e2e` | 0 | PASS — 18 tests |
| `npm run test:visual` | 0 | PASS — 3 tests |
| Stage 5.1 overlay/diff | 0 | PASS |
| Runtime evidence check | 0 | PASS |

GitHub Actions выполняет чистый `npm ci` через `https://registry.npmjs.org`, устанавливает Playwright Chromium и повторяет весь gate. Official evidence locked marker предотвращает побайтовое переписывание PNG после первоначальной фиксации, но каждый последующий run заново генерирует и проверяет screenshots в runner/artifact.

## Runtime evidence

- `tests/visual/actual/stage5-1-hero-1630x965.png`
- `tests/visual/actual/stage5-1-hero-1440x900.png`
- `tests/visual/actual/stage5-1-hero-tablet-768x1024.png`
- `tests/visual/actual/stage5-1-hero-mobile-390x844.png`
- `tests/visual/overlays/stage5-1-hero-runtime-overlay.png`
- `tests/visual/diffs/stage5-1-hero-runtime-diff.png`

## Blocking gaps

Нет технических blocking gaps после успешного CI gate. Визуальное утверждение намеренно не выставляется автоматически.

## Non-blocking differences

- неизвестный display font создаёт остаточную разницу в форме кириллических глифов;
- silhouette proxy не повторяет материалы, глубину панелей и свет Blender-куба;
- reference содержит более плотный raster micro-detail;
- capability strip использует честные labels вместо неподтверждённых цифр;
- шесть semantic modules сохранены по архитектуре BND, но имеют иерархию 3 primary + 3 secondary.

## Deferred to Blender integration

- финальная геометрия, материалы и surface panels;
- render sequence;
- scroll-to-frame и раскрытие слоёв;
- media loading/fallback benchmarking;
- финальный optical crop и lighting match.

## Approval gate

Пользователь должен сравнить reference, Stage 5, Stage 5.1, overlay и mobile и отдельно утвердить Header, H1, CTA, column balance, Core zone, HUD hierarchy, routes, cyan/glow, bottom strip и mobile Hero.
