# BND.STUDIO — Stage 3 Motion Specification

**Статус:** preliminary  
**Принцип:** motion объясняет состояние системы; не используется как самостоятельный спектакль.

## 1. Principles

1. State first.
2. Restrained.
3. Interruptible.
4. Reversible.
5. Low bloom.
6. No decorative overload.
7. Reduced-motion ready.
8. Performance bounded.
9. Focus stable.
10. No scroll trap.

## 2. Motion tokens — 15 tokens

### Durations

| Token | Value | Use |
|---|---:|---|
| duration-instant | 80 ms | Focus/state acknowledgement |
| duration-fast | 140 ms | Hover/icon response |
| duration-standard | 220 ms | Selected/focus surface transitions |
| duration-panel | 320 ms | Panel/module state |
| duration-route | 480 ms | Connector activation |
| duration-section | 620 ms | Section reveal |
| duration-hero-stage | 700 ms fallback | Non-scrub Hero key-state transition |

### Easing

| Token | Value | Use |
|---|---|---|
| easing-standard | `cubic-bezier(0.2, 0, 0, 1)` | UI state |
| easing-enter | `cubic-bezier(0.16, 1, 0.3, 1)` | Appearance |
| easing-exit | `cubic-bezier(0.4, 0, 1, 1)` | Exit |
| easing-emphasized | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Selected/important |
| easing-linear-progress | `linear` | Scroll/frame/pulse |

### Stagger

| Token | Value | Use |
|---|---:|---|
| stagger-tight | 35 ms | Small status rows |
| stagger-standard | 60 ms | Module/card group |
| stagger-section | 90 ms | Section children, max 5 items |

## 3. Animation matrix

| Animation | Trigger | Duration | Easing | Properties | Mobile | Reduced motion |
|---|---|---|---|---|---|---|
| Nav active | current section changes | 180–220ms | standard | opacity, underline scaleX | same | Immediate underline; no slide |
| Button hover | pointer hover | 140ms | standard | border/fill opacity, icon x 0→3px | same | No icon movement |
| Panel hover | pointer hover | 180ms | standard | border opacity, background alpha, translateY max -1px | No translate on coarse pointer | Static state |
| Card selected | selection commit | 220–320ms | emphasized | border/fill/marker; content stays stable | same | Instant state change |
| Route activation | scenario/product selection | 420–480ms | enter | stroke opacity + dashoffset once | Shorter 300ms or static | Static active route |
| Active pulse | after route activation | 600–700ms | linearProgress | single moving segment | optional one short pulse | Disabled |
| System module activation | resolver output changes | 240–320ms | standard | icon/border/text opacity | same | Instant |
| Hero stage change | scroll progress threshold | scrub; fallback 600–700ms | linearProgress / emphasized fallback | media progress, HUD state | keyframe/video/static | Static semantic state |
| Configurator step transition | valid next/back | 240–280ms | enter | old opacity 1→0, new 0→1; x max 8px | opacity only | Instant + focus moved |
| Validation error | validation result | 180–240ms | standard | border/icon/message opacity; no shake by default | same | Immediate |
| Submission loading | submit start | indeterminate bounded | linearProgress | small status indicator | same | Text status only |
| Success state | server stored response | 420–520ms | enter | status icon draw, panel state | same | Immediate success |
| Section reveal | intersection | 480–620ms | enter | opacity and y 8–16px | opacity only or none | No reveal dependency |

## 4. Hero motion contract

- `progress` нормализован `0..1`.
- Core renderer не знает scroll library.
- HUD получает named stage.
- Reverse scroll симметричен.
- Resize сохраняет semantic state.
- Media error даёт poster/static fallback.
- Timeline cleanup обязателен.
- Mobile не загружает desktop sequence по умолчанию.
- Reduced motion отключает pin/scrub/pulse.

## 5. Connector motion

1. Inactive routes присутствуют с muted opacity.
2. Active stroke проявляется 420–480 ms.
3. Pulse — отдельный overlay path, один проход.
4. Pulse не зацикливается.
5. Новый выбор отменяет предыдущий pulse.
6. Mobile pulse optional.
7. Reduced motion использует static active line.

## 6. Configurator motion

- Step transition не скрывает focus target.
- После Next/Back focus идёт на heading шага.
- Dependent reset показывает inline notice без shake.
- Loading блокирует повторный submit, но не очищает данные.
- Success сообщает requestId.

## 7. Forbidden motion

- Infinite bright pulse.
- Full-screen glitch.
- Continuous cube rotation.
- Large parallax.
- Random particles.
- Flashing cyan/white.
- Strong spring overshoot.
- Scroll-jacking.
- Content hidden until animation ends.

## 8. QA checklist

- Latest selection wins.
- No persistent offscreen animation.
- Reduced motion removes dependencies.
- Focus remains visible.
- Reverse Hero state correct.
- No layout shift from motion.
- Glow remains within token budget.
