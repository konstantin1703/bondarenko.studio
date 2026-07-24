# BND.STUDIO — Stage 7 Configurator Interaction Backlog

**Status:** open backlog  
**Stage 7 status:** `COMPLETED / AWAITING USER VISUAL APPROVAL`  
**Branch:** `stage7-configurator-calibration`

This backlog records functionality and visual calibration deliberately deferred from the static Stage 7 foundation. It does not authorize Stage 8 automatically. Work resumes only after a separate user prompt and visual decision on the Stage 7 fixtures.

## P0 — Five-step state machine

- Define stable IDs for all five steps.
- Implement forward and backward transitions.
- Block forward navigation until required answers are valid.
- Preserve answers when navigating backward.
- Distinguish active, completed, upcoming and invalid steps.
- Keep latest user action authoritative during transitions.
- Provide reduced-motion and no-animation behavior.

## P0 — Answers model

- Define normalized task-type selections.
- Define product selection and `requires recommendation` state.
- Define multiple integrations and custom integration entries.
- Define AI requirements and clarifying answers.
- Define timeline, budget and contact fields.
- Separate display labels from stable transport IDs.
- Version the payload schema before production persistence.

## P0 — Resolver and recommendations

- Build a deterministic resolver from answers to product candidates.
- Build a deterministic preliminary-stack resolver.
- Build architecture-node and connection resolvers.
- Expose confidence/assumption notes rather than pretending recommendations are final.
- Handle conflicting or incomplete selections.
- Keep resolver logic independent from presentation components.

## P0 — Live Architecture Preview

- Update nodes after every committed answer.
- Update routes without random crossings.
- Update summary values and capability tags.
- Preserve a text equivalent of the graph.
- Announce meaningful changes accessibly without excessive live-region noise.
- Add bounded loading/transition states.
- Add invalid/incomplete preview fallback.

## P0 — Validation

- Define required fields per step.
- Add inline errors connected with `aria-describedby`.
- Add group-level errors for checkbox/radio-like selections.
- Prevent error information from relying on color alone.
- Preserve entered values after validation failure.
- Move focus to the first meaningful error only when appropriate.

## P0 — Secure server submission

- Implement submission only on the server.
- Validate and normalize payload server-side.
- Add CSRF/origin and abuse-rate controls appropriate to the deployment.
- Prevent double submission.
- Generate a request ID only after accepted storage.
- Never expose Telegram, database or AI credentials to the browser.
- Do not report success until durable acceptance is confirmed.

## P0 — Database persistence

- Select the production storage only after architecture approval.
- Define requests, contacts, selections, architecture preview and audit metadata.
- Define retention and deletion rules.
- Store consent timestamp and policy version.
- Add idempotency and retry-safe writes.
- Restrict service credentials to server runtime.

## P0 — Telegram notification

- Send notification from a secure server environment only.
- Escape or safely format user-controlled content.
- Include request ID and normalized brief.
- Treat notification failure separately from database acceptance.
- Add retry/backoff and operational logging.
- Do not store bot token in repository or client bundle.

## P1 — Progress transitions

- Calibrate completed and active visual states against the Stage 7 baseline.
- Add restrained state-change motion.
- Ensure keyboard focus moves to the new step heading.
- Preserve usable state with `prefers-reduced-motion`.
- Recheck progress density on 390 and 768 px after real content exists.

## P1 — Draft persistence

- Decide whether persistence is anonymous, authenticated or session-scoped.
- Do not use localStorage for contacts or sensitive business details by default.
- Define expiry and explicit clear-draft behavior.
- Restore drafts without silently submitting them.
- Handle schema migrations.

## P1 — Error, success and retry states

- Network unavailable.
- Validation rejected.
- Server temporarily unavailable.
- Database accepted but notification delayed.
- Duplicate/idempotent request.
- Successful request with visible request ID.
- Safe retry without clearing the form.
- Explicit ability to edit and resubmit a corrected brief.

## P1 — Analytics events

- Define only necessary funnel events.
- Avoid sending contact fields or free-form comments to analytics.
- Track step view, valid continue, back, validation failure and accepted submission.
- Respect consent and deployment privacy requirements.
- Document event names and payload allowlist.

## P1 — Dynamic accessibility

- Announce step changes and meaningful preview changes.
- Preserve logical focus order.
- Re-test keyboard navigation for every interactive card and field.
- Test screen-reader semantics for progress and graph summary.
- Test errors, loading, success and retry states.
- Re-run 200% zoom and touch-target checks.

## P1 — Interactive visual calibration

- Recalibrate option-card hover, focus, selected and disabled states.
- Recalibrate cyan density after several selections become active simultaneously.
- Recalibrate parameter chips with long custom integration names.
- Recalibrate graph routes for every supported product configuration.
- Recalibrate right-panel summary for long Russian values.
- Capture deterministic fixture screenshots for every approved state.
- Compare Configurator density with Hero and Central Panels in full-page context.

## P1 — Responsive interaction

### 1024 px

- Decide whether preview remains beside workspace or moves below.
- Test long integration lists and validation messages.
- Ensure disabled/loading controls remain clear.

### Tablet 768 px

- Preserve order: intro/progress → workspace → parameters/actions → preview.
- Recheck two-column cards with dynamic descriptions.
- Recheck graph route simplification.

### Mobile 390 px

- Use one-column cards and fields.
- Keep the active progress summary compact.
- Avoid fixed/sticky elements that cover content.
- Keep action buttons at least 44 px.
- Provide a readable textual architecture sequence when routes are hidden.

## P2 — Operational requirements

- Define observability and redacted logs.
- Define notification monitoring and alert thresholds.
- Define data-export/deletion workflow.
- Define CMS/config ownership for timeline and budget ranges.
- Define analytics retention.
- Define deployment rollback for submission failures.

## Evidence preservation

Do not delete or overwrite without an explicit later task:

- `tests/visual/references/configurator.png`;
- all `stage7-configurator-*` screenshots;
- Stage 7 overlay and diff;
- Stage 7 Hero/Central Panels regression evidence;
- Stage 7 reports and validation metadata.

Future interactive passes should create versioned fixture names so static Stage 7 remains available as a before-state.

## Completion rule

This backlog is not complete until:

- all five steps work;
- answers persist correctly during navigation;
- the preview and stack resolve deterministically;
- validation is accessible;
- submission is secure and durable;
- Telegram notification is server-only and failure-aware;
- error/success/retry states are tested;
- desktop, tablet and mobile interactive states are visually approved;
- the user explicitly authorizes completion of the interactive Configurator stage.
