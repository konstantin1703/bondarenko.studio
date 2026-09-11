# BND Studio — Art Direction Source of Truth

## Status
Hero is FROZEN after browser-render QA.

The visual language is now allowed to propagate one section at a time, in this order:
1. Diagnostics
2. Capabilities
3. Brief
4. Footer / transition details
5. Mobile choreography

No section may invent a separate visual language. Each one must inherit the frozen Hero system.

## Product logic that remains fixed
User arrives with a fragmented task -> we diagnose where the system loses result -> show how BND connects the necessary capabilities -> user assembles a project brief.

The product logic is retained. The visual shell is rebuilt from the Hero system.

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

## Frozen Hero composition rules
- strong asymmetric composition
- one dominant typographic statement
- one authored material / spatial field with real depth
- deliberate negative space
- navigation integrated into the composition rather than floating above it
- clear project CTA without looking like a template button
- visual hierarchy readable at a glance
- the still frame must remain strong without animation

## Visual material
The primary visual carrier is a living material field rather than a stock illustration or decorative 3D prop.

Physical language:
- graphite / metallic-liquid surface
- refractive film tension
- soft volumetric light
- controlled interference highlight
- sparse grain
- displacement and depth response

The same material system should mutate semantically by section rather than being replaced by unrelated artwork.

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
1. implement only that section inside a lab route with the frozen Hero above it
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

## Diagnostics design contract
Diagnostics is the current P0.

It must express "where the system loses result" without becoming a dashboard or a grid of cards.

Required behavior:
- 5 diagnostic conditions remain the content source
- one active condition at a time
- list interaction must feel editorial / instrument-like, not accordion-like
- the living material field must fracture / redirect / expose loss in response to active state
- active state must alter both DOM hierarchy and material field
- details appear as one focused reading surface, not a card stack
- no capabilities redesign until Diagnostics is frozen

## Scope discipline
Do not create V14/V15-style full-site concepts.
Do not redesign Capabilities, Brief or Footer in parallel with Diagnostics.
Do not merge the lab system into main until the propagated sections pass their own gates.
