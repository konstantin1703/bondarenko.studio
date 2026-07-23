# Stage 5.1 validation path

The authoritative full Stage 5.1 validation is executed by the `pull_request` workflow stored on the `stage5-hero-calibration` base branch.

This branch contains only the targeted Hero calibration, tests, visual fixtures and reports. Stage 6 is not started.

The first clean CI pass generated and committed official runtime evidence. This docs-only checkpoint requests a second clean validation against the branch HEAD that already contains those evidence files; it does not change product code or visual output.
