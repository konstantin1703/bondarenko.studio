# V10 Reference Build

## Frozen visual source of truth
The desktop mockup stored at `public/hero/reference-desktop.jpeg` is the single source of truth for Hero composition during Steps 3–5.

## Frozen approved assets
- public/hero/background-desktop.png
- public/hero/bnd-core.png
- public/hero/systems.png
- public/hero/media.png
- public/hero/automation.png

## Build checkpoints
- [x] Step 2 — clean branch + approved assets + desktop tracing scaffold
- [x] Step 3 — temporary reference overlay + exact asset geometry, no routes
- [x] Step 4 — static SVG bus routes traced from the mockup
- [ ] Step 5 — background/light integration
- [ ] Step 6 — desktop Vercel preview and visual approval
- [ ] Step 7 — separate mobile composition
- [ ] Step 8 — interaction only after visual approval

## Step 3 geometry
Reference coordinate system: 1536 × 864.

- Systems: left 3.0%, top 15.8%, width 27.1%, height 30.0%
- Media: left 70.2%, top 15.9%, width 27.0%, height 31.0%
- Core: centered, top 12.8%, width 25.2%, height 42.0%
- Automation: left 34.35%, top 63.8%, width 31.65%, height 25.3%

## Step 4 bus network
The SVG network is static and sits behind the approved PNG assets.

- Five parallel left buses: panel 01 → left core connector
- Five parallel right buses: right core connector → panel 02
- Five lower buses: bottom core connector → panel 03
- Five upper feed lines to reproduce the vertical energy/data spine from the reference
- Soft under-glow plus brighter inner traces; no moving packets or other animation

The REF control remains available and overlays the source mockup at 42% opacity for tracing verification.

## Rules
1. One checkpoint at a time.
2. No redesign while tracing.
3. Do not tune motion before static composition is approved.
4. Desktop and mobile are separate compositions.
5. The temporary reference overlay is removed before the approved build is promoted.
