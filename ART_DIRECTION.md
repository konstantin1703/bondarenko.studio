# BND Studio — Art Direction Source of Truth

## Status
Hero, Diagnostics and Capabilities are FROZEN after browser-render QA.

The visual language is now allowed to propagate one section at a time, in this order:
1. Hero — frozen
2. Diagnostics — frozen
3. Capabilities — frozen
4. Brief — current P0
5. Footer / transition details
6. Mobile choreography

No section may invent a separate visual language. Each one must inherit the frozen system.

## Product logic that remains fixed
User arrives with a fragmented task -> we diagnose where the system loses result -> show how BND connects the necessary capabilities -> user assembles a project brief.

The product logic is retained. The visual shell is rebuilt from the frozen system.

## Frozen Hero record
Reference branch: `hero-lab-premium`
Acceptance run: GitHub Actions run `34554559721`
Acceptance head: `dfdebc9b8b2f61134aaeb0ae90fc9f9209134e8f`

Hero acceptance evidence:
- production build passed
- production dependency audit passed
- TypeScript passed
- live shader motion verified by frame comparison
- pointer response verified by frame comparison
- Chromium desktop capture passed at 1440x1000
- wide desktop capture passed at 1728x1117
- WebKit desktop parity passed
- iPhone-sized WebKit sanity passed at 430x932
- mobile WebGL animation verified by frame comparison
- no horizontal overflow in the accepted viewports
- no production-breaking console/runtime errors in the gate

Frozen Hero characteristics:
- oversized asymmetric Russian typography
- graphite / silver / restrained champagne palette
- one authored living material ribbon rather than a decorative object
- sparse mono metadata as secondary structure
- integrated navigation and CTA
- frame/corner registration marks used as spatial architecture, not decoration
- quiet grain and low-contrast atmospheric light
- slow weighted shader motion and damped pointer response

Do not re-open the Hero composition unless a real integration or accessibility defect is discovered.

## Frozen Diagnostics record
Reference branch: `diagnostics-lab`
Acceptance run: GitHub Actions run `34555169557`
Acceptance head: `ac6a5a3bf4055dbe0b7dba0d3e52a9d2f21e3cdb`

Diagnostics acceptance evidence:
- production build passed
- production dependency audit passed
- TypeScript passed
- Chromium interaction gate passed
- WebKit interaction gate passed
- active state changes both DOM reading surface and WebGL material field
- canvas frame comparison confirms material state change
- visual capture is aligned exactly to the section origin
- no horizontal overflow in desktop gate
- no production-breaking console/runtime errors in the gate

Frozen Diagnostics characteristics:
- one typographic diagnostic instrument, no cards or accordion chrome
- five conditions remain visible as one editorial list
- active condition uses restrained champagne registration and positional emphasis
- focused reading surface sits opposite the list, not in a stacked card
- the living material becomes a fracture/loss band tied to active state
- motion is state-driven rather than decorative

Do not re-open Diagnostics unless a real integration or accessibility defect is discovered.

## Frozen Capabilities record
Reference branch: `capabilities-lab`
Acceptance run: GitHub Actions run `34555946525`
Acceptance head: `3fa8f6a0967b7f82d01a23e98b10dc818727c699`

Capabilities acceptance evidence:
- production dependency audit passed with 0 vulnerabilities
- TypeScript passed
- optimized production build passed
- Chromium interaction gate passed
- WebKit interaction gate passed
- active contour changes both DOM hierarchy and WebGL routing material
- canvas frame comparison confirms the material routing changes with active contour
- active Automation route and payload update are verified in-browser
- visual capture is aligned to the section origin
- no horizontal overflow in desktop gate
- no production-breaking console/runtime errors in the gate

Frozen Capabilities characteristics:
- one system / three contours expressed as a routed editorial instrument, not service cards
- all three contours remain structurally visible while one holds focus
- typography and routing geometry carry hierarchy
- living material splits into lanes / currents and converges toward one output
- restrained champagne registration identifies active path without neon UI language
- modules read as route payload rather than tags
- composition holds in both Chromium and WebKit still frames

Do not re-open Capabilities unless a real integration or accessibility defect is discovered.

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

## Frozen composition rules
- strong asymmetric composition
- dominant typography carries identity
- one authored material / spatial field with real depth
- deliberate negative space
- navigation and actions integrated into the composition
- hierarchy readable at a glance
- still frame must remain strong without animation

## Visual material
The primary visual carrier is a living material field rather than a stock illustration or decorative 3D prop.

Physical language:
- graphite / metallic-liquid surface
- refractive film tension
- soft volumetric light
- controlled interference highlight
- sparse grain
- displacement and depth response

The same material system mutates semantically by section rather than being replaced by unrelated artwork.

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
Motion hierarchy:
1. first-load / section composition reveal
2. subtle continuous material motion
3. pointer response with inertia where appropriate
4. scroll-driven depth / deformation
5. authored transition into the next section

Motion must feel slow, weighted and expensive. Avoid constant busy motion.

## Performance rules
- clamp DPR
- adaptive shader complexity
- reduce particle counts on weaker devices
- pause / reduce expensive work outside relevant viewport states
- honor prefers-reduced-motion
- maintain a high-quality visual fallback
- validate Safari/WebKit separately

## Section production loop
For each section after Hero:
1. implement only that section inside a lab route with the frozen sections above it
2. run production build
3. render in real browser at the target desktop viewport
4. capture the section in context
5. critique composition, hierarchy, material continuity, typography, contrast and depth
6. correct the implementation
7. repeat until the still frame passes
8. add section-specific motion/state transitions
9. verify interaction in browser
10. freeze the section
11. only then move to the next section

## Brief design contract
Brief is the current P0.

It must feel like assembling a project inside the same authored system, not filling out a generic multi-step form.

Required behavior:
- preserve the five-stage product logic: project type, modules, priority, constraints, contact
- preserve the approved option vocabulary and lead payload semantics
- progress must read as system assembly / routing completion, not a SaaS wizard
- selected modules and choices should alter the spatial/material state where meaningful, but motion stays restrained
- the brief summary must feel like a live project specification, not a boxed sidebar card
- controls must remain fully keyboard accessible and understandable without animation
- mobile must remain practical to complete with one hand
- submission compatibility with `/api/lead` must be retained
- no Footer redesign until Brief is frozen

## Scope discipline
Do not create V14/V15-style full-site concepts.
Do not redesign Footer in parallel with Brief.
Do not merge the lab system into main until the propagated sections pass their own gates.
