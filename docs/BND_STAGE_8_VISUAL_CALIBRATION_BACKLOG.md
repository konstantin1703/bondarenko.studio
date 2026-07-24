# BND.STUDIO — Stage 8 Visual Calibration Backlog

**Status:** open backlog  
**Stage 8 status:** `COMPLETED / AWAITING USER INTERACTION APPROVAL`  
**Branch:** `stage8-central-panels-interactions`

This backlog preserves visual and advanced interaction work deliberately deferred beyond Stage 8. It does not authorize Stage 9 automatically. Work resumes only after the user reviews all ten interactive states and provides a separate prompt.

## P0 — User interaction review

- Review all six Problem Explorer scenarios.
- Review all four Product Assembler directions.
- Confirm whether selected controls are sufficiently clear.
- Confirm whether central Core changes are noticeable but restrained.
- Confirm whether process-chain and stack changes explain the selection.
- Confirm transition speed and glow intensity.
- Review desktop, tablet and mobile evidence.

## P1 — Final typography calibration

- Revisit display-font choice when the approved licensed font is available.
- Recalibrate Russian heading width, line breaks and optical alignment.
- Recheck scenario descriptions with final content.
- Recheck process-chain labels and right-panel density.
- Recheck product-card titles, stack names and principle descriptions.
- Test Cyrillic metrics across Windows, macOS and Linux browser rendering.

## P1 — Further reference approximation

- Re-measure left, center and right ratios against the approved reference.
- Recalibrate System Core silhouette and optical scale after final media strategy is known.
- Recalibrate Octagonal Core contour density and horizontal proportions.
- Rework connector bends only where they improve architectural explanation.
- Revisit panel-border opacity, cut corners and nested-frame density.
- Revisit icon metaphors without copying raster artifacts.
- Preserve honest text and avoid unsupported metrics, prices or promises.

## P1 — Interactive surface calibration

- Fine-tune primary, active, secondary and inactive module contrast.
- Fine-tune selected-card border strength.
- Recheck hover/focus states in the final browser environment.
- Recheck capability-tag density with approved content.
- Recheck long stack/principle labels.
- Recheck process chains if future copy changes step count.
- Capture versioned evidence after any accepted calibration pass.

## P1 — Advanced motion system

Stage 8 intentionally uses only light CSS transitions. Any future complex motion requires a separate design and performance task.

Possible future work:

- coordinated but short module-emphasis transitions;
- subtle Core layer sequencing;
- controlled route-node pulses;
- transition timing tokens;
- interruption-safe state changes;
- explicit reduced-motion equivalents;
- performance budgets for low-end mobile devices.

Do not add decorative timeline animation that delays content or obscures state.

## P1 — Possible 3D media integration

- Decide whether System Core remains HTML/SVG, uses pre-rendered media or connects to an approved 3D asset.
- Keep text, controls and state semantics outside 3D media.
- Define static and reduced-motion fallback.
- Define loading and failure state.
- Keep the current inline SVG and semantic architecture available until replacement is explicitly approved.
- Do not introduce WebGL, Blender output, Three.js or React Three Fiber as an incidental visual tweak.

## P1 — Full-page context

- Compare interactive central-panel density with final Hero media.
- Compare transition rhythm with Configurator after its own interactive stage.
- Recheck section-to-section vertical spacing.
- Recheck repeated cyan accents across the complete page.
- Recheck whether cumulative HUD microcopy becomes noisy.
- Verify that selected states remain focal when the full page is visible.

## P1 — Responsive final calibration

### 1024 px

- Recheck two-column geometry with all dynamic states.
- Recheck process-panel height and stack/principle balance.
- Confirm routes remain inside the frame.

### Tablet 768 px

- Review control order and selected-state visibility.
- Review System Core and Octagonal Core scale.
- Review the transition from center object to secondary panels.
- Capture full-section screenshots, not only viewport crops.

### Mobile 390 px

- Review complete long-page captures for both sections.
- Confirm all controls remain at least 44 px.
- Recheck expanded text wrapping.
- Recheck module order and process-chain readability.
- Recheck stack/principle density.
- Confirm live regions cause no visual shift.

## P2 — State expansion

Only after a real product requirement exists:

- loading state;
- disabled state;
- invalid or unavailable direction;
- resolver-data failure fallback;
- staged content loading;
- externally controlled selection state.

Do not invent these states only to add visual variety.

## Evidence preservation

Do not delete or overwrite without an explicit later calibration task:

- all `stage8-problem-*` screenshots;
- all `stage8-product-*` screenshots;
- Stage 8 default/tablet/mobile evidence;
- both Stage 8 contact sheets;
- Hero and Configurator regression evidence;
- Stage 8 overlays and diffs;
- Stage 8 reports and validation artifacts;
- Stage 6 baseline evidence used for default comparison.

Future work must use versioned names or a new stage prefix so Stage 8 remains available as a before-state.

## Stage 9 boundary

No Stage 9 task is defined or authorized by this backlog.

A future Stage 9 prompt must explicitly define:

- scope;
- base branch and accepted HEAD;
- visual and interaction goals;
- regression boundaries;
- evidence requirements;
- approval gate.

## Completion rule

This backlog remains open until:

- the user approves or requests corrections to all interactive states;
- final typography is known;
- full-page context is reviewed;
- desktop, tablet and mobile full compositions are approved;
- any approved advanced motion or media integration has its own tested fallback;
- a separate user instruction closes the calibration work.
