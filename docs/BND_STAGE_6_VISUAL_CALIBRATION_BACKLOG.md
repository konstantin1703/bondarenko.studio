# BND.STUDIO — Stage 6 Visual Calibration Backlog

**Status:** open backlog  
**Stage 6 acceptance:** `PROVISIONALLY ACCEPTED / SUBJECT TO FURTHER VISUAL CALIBRATION`  
**Branch:** `stage6-central-panels-calibration`

This backlog preserves the visual differences that remain after Stage 6. It does not authorize an immediate broad calibration pass. Work resumes only after a separate user prompt.

## Mandatory future review triggers

1. After interactive states, scenario switching, dynamic routes and product-selection states are implemented.
2. After Hero, central panels, Configurator, Projects and the remaining sections are assembled and calibrated together as one page.
3. Before final desktop, tablet and mobile acceptance.

## P0 — Central composition and objects

- Recheck the exact width ratio of left, center and right zones against the reference.
- Recalibrate System Core scale, silhouette, optical center and surrounding negative space.
- Replace or refine the simplified central proxy when the approved asset strategy is available.
- Recalibrate OctagonalCore scale, horizontal proportions, contour density and relationship to the four direction cards.
- Re-evaluate section heights after real interactive content changes card and panel dimensions.
- Check that neither central object becomes visually weak after full-page composition is assembled.

## P0 — Interactive-state calibration

- Calibrate scenario selected, hover, focus, completed and transition states against the static baseline.
- Re-evaluate route hierarchy after routes become dynamic.
- Ensure latest-selection transitions do not create excessive cyan density.
- Recalibrate right-side process content for every scenario, not only the current static fixture.
- Recalibrate product cards, stack and architecture description for every product direction.
- Capture dedicated screenshots for all approved stable fixture states.

## P1 — Typography

- Revisit display-font choice when the final licensed font is known.
- Recalibrate heading width, line breaks, line-height and vertical placement.
- Recheck scenario labels, module titles, process steps and technical microcopy after dynamic content is introduced.
- Prevent typography fixes based on `scaleX()` or extreme tracking.
- Recheck Cyrillic rendering on Windows, macOS and Linux browser runners.

## P1 — HUD density and surfaces

- Increase or reduce micro-detail only after evaluating the complete page rhythm.
- Recalibrate border opacity, nested-frame count and cut-corner size.
- Revisit background grid, local radial guides and technical markers.
- Ensure cyan levels remain separated into focal, functional and decorative tiers.
- Check that right-side panels do not feel lighter or heavier than the central architecture.
- Revisit icon size, stroke and container weight using approved icon assets.

## P1 — Connector routes

- Re-measure anchor positions after interactive card dimensions stabilize.
- Rework bends and route spacing where the current paths differ noticeably from the reference.
- Preserve primary/secondary route hierarchy.
- Avoid random crossings and decorative lines that do not explain the architecture.
- Recheck route visibility and node scale at 1024, 1440 and 1536 px.
- Keep reduced-motion and static-route fallbacks.

## P1 — Right-side panels

- Recalibrate Problem Explorer process-example hierarchy, row heights and result note.
- Recalibrate Product Assembler stack and principles balance.
- Check long Russian labels and content-dependent wrapping.
- Revisit panel heights when real product/stack data is connected.
- Confirm that process, stack and principles remain subordinate to the central objects.

## P1 — Full-page context

- Compare central-panel density with the final Hero after Blender integration.
- Compare section junctions with Configurator and Projects.
- Recheck repeated frame geometry so the page feels like one interface rather than separate screens.
- Adjust vertical spacing only in full-page screenshots, not isolated fixtures alone.
- Re-evaluate where technical microcopy should be hidden to reduce cumulative page noise.

## P1 — Responsive calibration

### Tablet

- Reassess order and spacing after interaction controls become real.
- Recheck selected-state visibility and route simplification.
- Recalibrate central-object size and right-panel placement at 768 and 1024 px.
- Capture full-section screenshots, not only viewport crops, before final acceptance.

### Mobile

- Reassess card stacking and content order after dynamic states are implemented.
- Verify touch targets, focus order and expanded content.
- Recalibrate Core size, route summary and bottom workflow.
- Ensure no desktop-only density is reproduced by shrinking text.
- Capture full mobile composition before final acceptance.

## P2 — Reference-specific details

- Decide which reference icon metaphors should be recreated and which should remain intentionally different.
- Revisit decorative labels and micro-illustrations that add useful system context.
- Keep unsupported metrics and business claims excluded.
- Do not copy duplicated raster Header/navigation elements into the sections.
- Preserve HTML text and SVG/CSS technical graphics separation.

## Evidence preservation

Do not delete or replace without an explicit calibration task:

- `tests/visual/references/central-panels.png`;
- all `stage6-*` runtime screenshots;
- Stage 6 overlays and diffs;
- Hero regression evidence;
- validation artifact metadata;
- Stage 6 reports.

Future passes must create new evidence names or intentionally version the existing Stage 6 baseline so before/after comparison remains possible.

## Completion rule

This backlog is not complete until:

- interactive fixtures are visually calibrated;
- full-page desktop context is reviewed;
- tablet and mobile full compositions are reviewed;
- final central assets are integrated or explicitly accepted as final;
- the user grants separate final visual approval.
