# BND Studio — Art Direction Source of Truth

## Status
This document is the visual source of truth for the next production pass.
Do not expand the visual language to the rest of the site until the desktop Hero is approved internally through browser-render QA.

## Product logic that remains fixed
User arrives with a fragmented task -> we diagnose where the system loses result -> show how BND connects the necessary capabilities -> user assembles a project brief.

The product logic is retained. The visual shell is not.

## Current production rule
P0: only one screen matters: desktop Hero at 1440x1000.

No visual work on Diagnostics, Capabilities, Brief or footer until Hero reaches the target quality. Existing implementations remain functional but are visually frozen.

## Target character
BND should feel like an independent premium digital studio / digital atelier rather than a generic agency landing page.

Keywords:
- editorial-tech
- industrial luxury
- cinematic material
- controlled tension
- high contrast
- restrained motion
- precise typography
- authored, not template-like

Avoid:
- generic SaaS cards
- neon cyberpunk
- decorative glassmorphism everywhere
- random gradients
- dashboard aesthetics
- fake terminals
- gratuitous 3D objects
- central "core" / capsule motif as a mandatory device
- effects that exist only to look technical

## Hero composition
The first frame must already work as a still image before motion is considered.

Required:
- strong asymmetric composition
- one dominant typographic statement
- one authored material / spatial field with real depth
- deliberate negative space
- navigation integrated into the composition rather than floating above it
- clear project CTA without looking like a template button
- visual hierarchy readable at a glance

The Hero must not depend on motion to feel premium.

## Visual material
The primary visual carrier should be a living material field rather than a stock illustration or decorative 3D prop.

Possible physical language:
- metallic-liquid surface
- refractive film / glass tension
- soft volumetric light
- interference / spectral highlights
- controlled particle residue
- displacement and depth response

The material must feel proprietary to BND and should be capable of changing state later across the rest of the site.

## Technical map
Every visible effect must have an explicit implementation source.

- layout / typography / navigation: semantic HTML + CSS
- text reveal: GSAP + clipping / mask
- scroll choreography: GSAP + ScrollTrigger
- smooth scroll: Lenis only if it improves control
- material field: Three.js / R3F + GLSL shaders
- displacement / distortion: fragment shader
- depth / parallax: WebGL z-space and controlled DOM parallax
- pointer physics: damped pointer velocity, never direct mouse-follow translation
- grain: shader or lightweight texture pass
- image assets: only isolated production assets, never full-page baked mockups

GSAP is the primary DOM animation system. Do not add Framer Motion unless there is a specific local UI need that cannot be handled cleanly otherwise.

## Motion rules
Motion is designed after the static Hero passes visual QA.

Motion hierarchy:
1. first-load composition reveal
2. subtle continuous material motion
3. pointer response with inertia
4. scroll-driven depth / deformation
5. transition into the next section

Motion must feel slow, weighted and expensive. Avoid constant busy motion.

## Performance rules
Desktop can receive the full experience, but the implementation must be designed for adaptive quality from the start.

- clamp DPR
- adaptive shader complexity
- reduce particle counts on weaker devices
- pause / reduce expensive work outside relevant viewport states
- honor prefers-reduced-motion
- maintain a high-quality visual fallback
- validate Safari/WebKit separately

## QA loop
The production loop is fixed:

1. implement only Hero
2. run production build
3. render in real browser at 1440x1000
4. capture screenshot
5. critique composition, hierarchy, material, typography, contrast and depth
6. correct the implementation
7. repeat until the still frame is strong
8. add motion
9. record / verify motion in browser
10. freeze Hero
11. only then propagate the design system to the rest of the site

## Acceptance gate for Hero
Hero is not considered frozen until all are true:
- still frame looks premium without animation
- composition has no template / SaaS feel
- material is visually authored and not a generic shader demo
- typography carries the identity
- CTA and navigation feel integrated
- depth survives screenshot capture
- motion adds value rather than hiding weak layout
- Chromium and WebKit render consistently
- no production-breaking console/runtime errors
- performance remains acceptable on modern mobile hardware

## Scope discipline
Do not create V14/V15-style full-site concepts while Hero remains unresolved.
Do not redesign the remaining sections in parallel.
Do not merge the Hero lab into main until the Hero acceptance gate is passed.
