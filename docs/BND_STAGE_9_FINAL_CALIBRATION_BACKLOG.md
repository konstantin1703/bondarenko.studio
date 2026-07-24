# BND.STUDIO — Stage 9 Final Calibration Backlog

**Stage 9 status:** `COMPLETED / AWAITING USER FULL-PAGE APPROVAL`  
**Branch:** `stage9-remaining-sections`

This backlog preserves work intentionally deferred from the static Stage 9 foundation. It does not authorize Stage 10 automatically.

## P0 — Full-page visual approval

- Review the complete page in desktop, tablet and mobile context.
- Approve or correct the vertical rhythm between all nine sections.
- Recheck the balance of dense and calm interface zones.
- Recheck the common working width and left guide.
- Recheck Contact prominence and Footer completion.
- Preserve Stage 9 evidence as the before-state for future passes.

## P0 — Real Projects and cases

- Supply confirmed project names or approved anonymized labels.
- Supply the actual problem, architecture, technologies and result for every case.
- Supply approved screenshots, video or interactive preview assets.
- Verify permission to use client names, logos and data.
- Remove the pending-state panel only after materials are approved.
- Do not add metrics, timelines, budgets or testimonials without a source.
- Decide whether categories remain beside real cases or move into a separate capability section.

## P0 — Production contact data

- Provide the approved Telegram contact.
- Provide the approved email address.
- Decide whether phone or another channel is needed.
- Approve the public company/studio description.
- Replace `Production contact pending` only after verification.
- Recheck spam exposure before publishing direct contact data.

## P0 — Production form architecture

- Decide whether Contact uses the Stage 7 Configurator payload, a short contact form or both.
- Implement server-side validation and normalization.
- Define rate limiting and abuse protection.
- Define idempotency and duplicate-submission handling.
- Define durable storage before reporting success.
- Keep Telegram/email/database credentials on the server only.
- Add error, success and retry states without clearing entered values.
- Recalibrate Contact height after real fields and errors exist.

## P0 — Privacy and legal review

- Review `/privacy` with qualified legal input where required.
- Approve consent text and policy versioning.
- Define data retention and deletion rules.
- Define controller/contact information.
- Define analytics and cookie requirements before adding tracking.
- Ensure consent is not preselected.
- Recheck Contact and Footer legal copy after review.

## P0 — Stage 8 live interaction review

Before final site acceptance, provide one of:

1. public preview URL;
2. Playwright trace;
3. genuine browser recording from the current runtime;
4. local preview accessible to the user.

Manually verify:

- six Problem Explorer scenario switches;
- four Product Assembler direction switches;
- selected-state clarity;
- System Core and Octagonal Core changes;
- right-panel changes;
- transition speed and subjective feel;
- focus preservation;
- keyboard navigation;
- real-time mobile interaction;
- absence of layout shift.

## P0 — Blender Hero integration

- Replace the silhouette proxy only after the Blender asset contract is approved.
- Define render sequence, sprite or optimized 3D delivery method.
- Define fallback and loading states.
- Recalibrate Core crop and optical center.
- Recheck HUD card positions and connector anchors.
- Re-run full-page rhythm after the real visual mass is present.
- Preserve reduced-motion and mobile fallback behavior.

## P1 — Production copy approval

- Approve Hero copy and CTA labels.
- Approve all Problem Explorer and Product Assembler descriptions.
- Approve Configurator labels and recommendations.
- Approve Projects pending/real-case copy.
- Approve Workflow descriptions and artifact labels.
- Approve Technology grouping and Principle explanations.
- Approve Contact heading and helper copy.
- Approve Footer description, copyright and build label.
- Remove temporary English technical copy where it does not serve the final product.

## P1 — Final typography calibration

- Select or confirm the licensed display font.
- Recalibrate Cyrillic line breaks.
- Recheck H1/H2 widths and section heights.
- Recheck small technical copy at 100% and 200% zoom.
- Recheck contrast of muted labels.
- Avoid `scaleX()` or other artificial font distortion.
- Re-run visual fixtures on the production font stack.

## P1 — Motion refinement

- Define section-entry motion only after static full-page approval.
- Keep motion subordinate to comprehension.
- Avoid scroll-jacking.
- Define reduced-motion equivalents.
- Recheck timeline and technology-map motion separately from Stage 8 controls.
- Prevent transitions from changing layout dimensions.
- Capture real browser recordings rather than screenshot sequences.

## P1 — Interactive Configurator

- Implement the five-step state machine from the Stage 7 backlog.
- Add deterministic answer/resolver models.
- Add accessible validation.
- Add dynamic Architecture Preview.
- Add draft handling only after privacy decisions.
- Add secure server submission only after backend architecture is approved.
- Recheck lower-page rhythm when the Configurator expands with real error and success states.

## P1 — Full-page viewport recheck

Repeat after real content, form and Blender integration:

- 390 px;
- 768 px;
- 1024 px;
- 1440 px;
- 1536/1630 px;
- 200% zoom;
- reduced motion;
- keyboard-only use;
- touch-device use.

Required checks:

- no horizontal overflow;
- no hidden content;
- no fixed element covering controls;
- no microscopic Footer navigation;
- stable section order;
- stable focus order;
- no layout shift during loading or state changes.

## P1 — Final visual calibration

Return to:

- Stage 5.1 Hero after Blender integration;
- Stage 6/8 Central Panels after live interaction review;
- Stage 7 Configurator after real state logic;
- Stage 9 lower sections after production copy and data.

Create versioned screenshots and diffs rather than overwriting the approved Stage 5–9 evidence.

## P2 — Deployment and operations

- Choose deployment environment.
- Define environment variables and secret ownership.
- Define monitoring and redacted logs.
- Define rollback procedure.
- Define form-delivery monitoring.
- Define database backup/retention where applicable.
- Define production status language; do not reuse local preview statuses blindly.
- Verify sitemap, metadata, robots and canonical URLs.

## Evidence preservation

Do not delete or silently overwrite:

- Stage 5.1 Hero evidence;
- Stage 8 interaction screenshots/contact sheets/reports;
- Stage 7 Configurator evidence;
- all `stage9-*` screenshots;
- Stage 9 desktop/mobile contact sheets;
- Stage 9 regression overlays and diffs;
- Stage 9 reports and validation artifacts.

Future stages must use new versioned fixture names.

## Completion rule

Final site calibration is not complete until:

- real cases are approved or Projects remains intentionally pending;
- production contacts are verified;
- privacy/legal copy is approved;
- production submission is secure and tested;
- Stage 8 receives live interaction review;
- Blender Hero integration is reviewed;
- typography is calibrated on the final font stack;
- full-page desktop/tablet/mobile compositions are approved;
- all regression, accessibility and security gates pass;
- the user explicitly grants final site approval.
