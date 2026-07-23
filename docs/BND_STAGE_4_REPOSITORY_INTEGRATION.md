# Stage 4 repository integration

- Target repository: `konstantin1703/bondarenko.studio`.
- Target branch: `stage4-foundation-recovery`.
- Existing static site files are retained in place.
- Root conflicts (`package.json`, lock file, README and gitignore) are preserved under `docs/legacy/` before replacement.
- The Stage 4 source archive is downloaded from `konstantin1703/anna-copywriter-landing` and verified against SHA-256 `5139df17e259e1e9c2cea98c16655edbaf907efe4dd2c27e2599a72f1cd94e31`.
- Git blob verification performed before recovery: `5f7d00ade9be433a756b164761dab6af062af7e9` matches the local Stage 4 archive.
- No legacy HTML/CSS/JS pages are deleted.
- No secrets or production environment values are introduced.
