#!/usr/bin/env bash
set -euo pipefail

ARTIFACT_ID="8572818554"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

cd "$(git rev-parse --show-toplevel)"
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

gh api "/repos/${GITHUB_REPOSITORY}/actions/artifacts/${ARTIFACT_ID}/zip" > "$TMP_DIR/evidence.zip"
unzip -q "$TMP_DIR/evidence.zip" -d "$TMP_DIR/evidence"

test -f "$TMP_DIR/evidence/package-lock.json"
test -f "$TMP_DIR/evidence/docs/BND_STAGE_4_RUNTIME_RESULTS.json"
test -f "$TMP_DIR/evidence/tests/visual/actual/hero-1630x965.png"

cp "$TMP_DIR/evidence/package-lock.json" package-lock.json
mkdir -p docs/logs tests/visual/actual tests/visual/overlays tests/visual/diffs
cp -a "$TMP_DIR/evidence/docs/logs/." docs/logs/
cp "$TMP_DIR/evidence/docs/BND_STAGE_4_RUNTIME_RESULTS.json" docs/
cp "$TMP_DIR/evidence/docs/BND_STAGE_4_RUNTIME_RESULTS.md" docs/
cp -a "$TMP_DIR/evidence/tests/visual/actual/." tests/visual/actual/
cp -a "$TMP_DIR/evidence/tests/visual/overlays/." tests/visual/overlays/
cp -a "$TMP_DIR/evidence/tests/visual/diffs/." tests/visual/diffs/

git add package-lock.json
git commit -m "chore: restore dependency installation [skip ci]"

git add docs/BND_STAGE_4_RUNTIME_RESULTS.json docs/BND_STAGE_4_RUNTIME_RESULTS.md
git add tests/visual/actual tests/visual/overlays tests/visual/diffs
git add -f docs/logs/*.log docs/logs/*.exit
git commit -m "test: add runtime visual snapshots [skip ci]"

rm -f .github/workflows/stage4-recovery.yml
rm -f .github/workflows/stage4-publish-evidence.yml
rm -f .github/workflows/stage4-push-publisher.yml
rm -f .stage4-recovery/publish-verified-evidence.sh
git add -A
git commit -m "docs: finalize Stage 4 report [skip ci]"

git push origin HEAD:stage4-foundation-recovery
