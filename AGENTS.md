# Metric Calendar — repository instructions

These instructions apply to the entire repository. The latest explicit owner direction takes precedence if it changes a decision here.

## Work and compute locations

- Canonical repository: `justinpfisher/metriccalendar`; public static site: `https://metriccalendar.org`.
- **GMKtec-first** is the default for ordinary editing, page generation, tests, browser checks and previews. Use an existing owner-local checkout (normally under `C:\Projects\metriccalendar` if present). Confirm that the checkout and tools exist; do not claim that GitHub-connected Chat or a remote container actually ran on the GMKtec.
- Never commission paid GitHub-hosted development agents, disposable cloud coding environments, larger runners or outside build services for work that can run locally. Keep independent review and version control in GitHub.
- Required source checks are dependency-free on Node 22+: `node scripts/build.mjs`, `node --test tests/calendar.test.cjs`, then `node scripts/check.mjs`. Commit the generated root HTML and sitemap. Check `git diff --exit-code` after rebuilding committed outputs. Optional browser/axe checks use the existing local preview and are proportionate to changed UI.
- If the owner PC cannot be reached from the active tool environment, use available tooling to advance reversible work, clearly identify where tests actually ran, and never imply that GitHub-hosted checks were local. Do not create cloud development work just to bypass local access.

## Why limited GitHub-hosted jobs remain

- This is a **public** repository. Standard GitHub-hosted Actions runners for its independent PR/main checks, and GitHub Pages deployment, do **not** consume the owner's private-repository monthly runner-minute allowance under GitHub's public-repository billing rules.
- The existing `.github/workflows/checks.yml` uses a standard Ubuntu runner for independent verification. Retain that bounded, no-secret public validation and the existing Pages publishing configuration; do not introduce larger billed runners.
- **Never** connect the owner's GMKtec or any private-project self-hosted runner to this public repository or execute untrusted fork PR code on a personal computer. The public-site exception is for free, isolated CI/Pages, not cloud-first development.
- If GitHub's billing/security model changes, reassess before moving CI, never silently add a charge or weaken PR isolation.

## Change and release contract

- Follow the existing `README.md` and `VERIFICATION.md`. Keep the static, accessible, dependency-light site and existing branded/domain files. No unrequested hosting, analytics, paid providers or secrets.
- Work against current `main`, use reviewable changes and existing checks, then merge and verify the live site as part of an authorised change. No second routine approval is required for an already authorised release. A passing check, merge and live deployment are distinct results.
- Respect the calendar specification and date invariants. Distinguish proven calculations from speculative adoption or research claims. Use Canadian English.
