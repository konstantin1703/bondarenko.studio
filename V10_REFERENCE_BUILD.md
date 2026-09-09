# V10 Reference Build

## Frozen visual source of truth
The current desktop mockup supplied in chat is the only reference for Hero composition.
No new core, panels, background, or concept generation during the tracing pass.

## Frozen approved assets
- public/hero/background-desktop.png
- public/hero/bnd-core.png
- public/hero/systems.png
- public/hero/media.png
- public/hero/automation.png

## Build checkpoints
- [x] Step 2 — clean branch + approved assets + desktop tracing scaffold
- [ ] Step 3 — temporary reference overlay + exact asset geometry, no routes
- [ ] Step 4 — SVG bus routes traced from the mockup
- [ ] Step 5 — background/light integration
- [ ] Step 6 — desktop Vercel preview and visual approval
- [ ] Step 7 — separate mobile composition
- [ ] Step 8 — interaction only after visual approval

## Rules
1. One checkpoint at a time.
2. No redesign while tracing.
3. Do not tune motion before static composition is approved.
4. Desktop and mobile are separate compositions.
5. The temporary reference overlay is removed before the approved build is promoted.
