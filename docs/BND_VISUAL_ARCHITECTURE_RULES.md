# BND.STUDIO — Visual Architecture Rules

**Stage:** 10  
**Status:** normative visual audit rules  
**Rule count:** 82  
**Scope:** all future design corrections, responsive passes, Blender integration and interaction refinement.

## Rule format

Each rule is intended to be testable through one or more of:

- browser screenshot;
- bounding-box measurement;
- computed typography;
- overlay/diff;
- responsive inspection;
- accessibility inspection;
- live interaction review.

## Composition

**RULE-01:** Each scene has one PRIMARY focal point; a deliberate Hero pair is the only default exception.

**RULE-02:** Major sections use a shared outer frame but must not repeat the same internal layout.

**RULE-03:** Central objects align to the semantic center of their system, not necessarily the geometric viewport center.

**RULE-04:** Copy and system object must form a readable left-to-right path on desktop.

**RULE-05:** A dense technical cluster must be paired with a quieter copy or status region.

**RULE-06:** Section height follows content and scene role; equal-height repetition is not a goal.

**RULE-07:** Large empty space is valid only when it protects a focal point or transition.

**RULE-08:** Every section must expose a clear entry point and a clear exit toward the next section.

## Hierarchy

**RULE-09:** PRIMARY elements use the highest contrast and only one local glow source.

**RULE-10:** SECONDARY panels may use bright borders but no broad bloom.

**RULE-11:** TERTIARY labels cannot compete with headings or selected states.

**RULE-12:** BACKGROUND graphics must disappear before any meaningful text loses contrast.

**RULE-13:** Adjacent panels may not have identical luminance when their importance differs.

**RULE-14:** Selected, active, completed and disabled states require more than color alone.

**RULE-15:** Right-side evidence panels remain subordinate to the current task area.

## Typography

**RULE-16:** Hero uses exactly one H1 and preserves a three-line dominant composition on desktop.

**RULE-17:** Section H2 scale must vary by scene role rather than use one universal size.

**RULE-18:** Critical body copy stays at or above the project accessibility floor and cannot become microtext.

**RULE-19:** Micro-labels are uppercase technical support, never the only carrier of essential meaning.

**RULE-20:** Line length for explanatory body copy targets 45–75 characters.

**RULE-21:** Display headings use tight line-height but cannot clip Cyrillic glyphs.

**RULE-22:** Button labels remain concise, high-contrast and visually centered within 44–52 px controls.

**RULE-23:** Numeric indices use a stable technical style and are not repeated without orientation value.

## Spacing

**RULE-24:** Panel padding uses M/L tiers; dense chips use S; section rhythm uses XL/SECTION.

**RULE-25:** Heading-to-body spacing is smaller than body-to-primary-action spacing.

**RULE-26:** Core-to-HUD distance must preserve route readability without isolating the Core.

**RULE-27:** Inter-column gaps stay visually narrower than internal panel padding.

**RULE-28:** Section boundary spacing cannot create the impression of separate websites.

**RULE-29:** Mobile removes low-value gaps before reducing text size.

**RULE-30:** Footer spacing closes the page and must not resemble another full marketing section.

## HUD

**RULE-31:** Cut corners are reserved for major panels, selected cards and primary controls.

**RULE-32:** Nested frames are used around focal objects, not every container.

**RULE-33:** System indices orient the user and remain visually tertiary.

**RULE-34:** Status markers combine shape or icon with text.

**RULE-35:** Status consoles are limited to scenes where operational evidence adds meaning.

**RULE-36:** Coordinate markers are decorative and hidden from assistive technologies.

**RULE-37:** Data and stack chips contain short labels only.

**RULE-38:** One local component family must not be reused for semantically different roles without a visible variant.

## Connectors

**RULE-39:** Every connector explains a relation or supports composition; otherwise it is removed.

**RULE-40:** Active routes are thicker and brighter than inactive routes.

**RULE-41:** Routes do not cross primary copy or interactive labels.

**RULE-42:** Connector endpoints align to explicit ports or nodes.

**RULE-43:** Decorative background routes cannot terminate like semantic routes.

**RULE-44:** Mobile converts complex route networks to a reduced path or ordered sequence.

**RULE-45:** Route motion runs once per state change and is disabled under reduced motion.

## Color

**RULE-46:** Cyan is used for state, route and focal emphasis, not broad surface filling.

**RULE-47:** Primary text stays neutral near-white; cyan headings are deliberate exceptions.

**RULE-48:** Muted text is never used for instructions required to complete a task.

**RULE-49:** Surface levels require at least two distinguishable dark values.

**RULE-50:** Warning and success colors appear only for real semantic states.

**RULE-51:** Disabled state reduces contrast without falling below readable thresholds.

## Glow

**RULE-52:** Only the PRIMARY focal point may use the maximum glow token.

**RULE-53:** Secondary panels use border glow or node glow, not both at maximum.

**RULE-54:** Background grids and guides never bloom.

**RULE-55:** Selected-state glow is reinforced by fill, border and marker.

**RULE-56:** Glow must not obscure 1px geometry or text edges.

## Background

**RULE-57:** Hero may use the richest background field; complexity decreases toward Contact and Footer.

**RULE-58:** Global grids align across sections or intentionally reset at a visible transition.

**RULE-59:** Radial guides belong around central objects, not behind long copy.

**RULE-60:** Noise remains subtle and does not simulate compression artifacts.

**RULE-61:** Peripheral labels are capped and removed on mobile unless they add orientation.

## Responsive

**RULE-62:** Mobile is a recomposed sequence, not a scaled desktop scene.

**RULE-63:** At 390 px, primary text and controls remain readable without horizontal scrolling.

**RULE-64:** Desktop three-column layouts become one ordered semantic flow on mobile.

**RULE-65:** Nonessential HUD modules and routes are reduced before primary content.

**RULE-66:** Configurator mobile height must be reduced through grouping/progressive disclosure in a future functional pass.

**RULE-67:** Touch targets remain at least 44 × 44 CSS px.

## Accessibility

**RULE-68:** Decorative SVG and background graphics use `aria-hidden` and no pointer capture.

**RULE-69:** Focus-visible styling must survive cut corners and overflow clipping.

**RULE-70:** Color and glow are never the only state indicators.

**RULE-71:** 200% zoom cannot hide primary actions or create horizontal overflow.

## Motion

**RULE-72:** Motion explains state and never delays access to content.

**RULE-73:** Animations are interruptible, reversible and cleaned up on state change.

**RULE-74:** Hero scroll reveal must preserve semantic state on resize and reverse scroll.

**RULE-75:** Continuous bright pulse, random particles and scroll-jacking are forbidden.

**RULE-76:** Reduced motion produces a complete static state, not an empty scene.

## Data honesty

**RULE-77:** Unverified metrics and percentages are prohibited.

**RULE-78:** Project categories cannot be labeled as completed client cases.

**RULE-79:** Pending contacts remain explicitly pending.

**RULE-80:** Preview/build statuses cannot imply production uptime.

**RULE-81:** Recommended technology is presented as preliminary, not guaranteed.

**RULE-82:** Visual polish cannot conceal disabled or unavailable functionality.

## Application gate

A future correction pass must list:

1. rules affected;
2. screenshots used;
3. measurements before and after;
4. intentional deviations;
5. unresolved conflicts;
6. user approval decision.

A pass that improves pixel similarity while violating hierarchy, readability, state honesty or responsive rules does not pass.
