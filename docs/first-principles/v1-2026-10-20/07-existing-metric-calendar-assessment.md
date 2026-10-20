# 7 — Existing Metric Calendar: what to retain, modify, replace or archive

**Audit baseline:** public repository [justinpfisher/metriccalendar](https://github.com/justinpfisher/metriccalendar), audited `main` commit `d1487c966cbd3ba0de5e26534f21e85adda6000c`, and public website [metriccalendar.org](https://metriccalendar.org), 20 October 2026. Code paths reviewed include `calendar.js`, `tests/calendar.test.cjs`, `README.md`, `VERIFICATION.md`, `content/calendar.html`, `content/comparison.html`, `content/rationale.html`, `content/adoption.html`, `.github/workflows/checks.yml` and the four merged PRs. Repository history includes June 2026 initial upload and replacement, September 2026 usability and verification redesign and October 2026 month/weekday naming and GMKtec-first changes.

This is an **independent assessment**, not a migration order. The current implementation stays canonical until the owner adopts a new standard.

## Findings from production code, not just project descriptions

- Year identifiers are Gregorian (1–9999), proleptic, **no year 0**, Jan 1 year starts. Gregorian leap year uses `y%4==0 && (y%100 !=0 || y%400==0)`.
- Each Gregorian ordinal day has a same-year Metric date. Common month lengths **36,37,36,37,36,37,36,37,36,37**. Leap month 10 has 38.
- Each month has six weeks × six days; regular week days 1–4 are Focus, 5–6 Rest; six-day week is reset within each month. Day 37 in an even month has **no weekday**. Leap year 10-38 has **no weekday**. Five Bonus Rest Days occur in months 2,4,6,8,10.
- Five 73-day *pairs* are exactly equal, yet 73 is prime and the months in each pair are unequal. Mathematically, this gives symmetry but neither uniform months nor a whole six-day-week partition of each 73-day pair.
- Current display names: months **Renewal, Awaken, Bloom, Thrive, Radiate, Sustain, Gather, Reflect, Diminish, Restore**; weekday positions **Begin, Create, Connect, Share, Pause, Renew**. Numeric positions govern calculations; names are display vocabulary.
- Metric text uses no prefix, `YYYY-MM-DD`; proleptic Gregorian uses the project's lowercase `gYYYY-MM-DD`. Leap-day day37 in month10 is **not** New Year's Eve in leap years: day38 is. This former defect was identified and corrected in the September site redesign.
- The site is dependency-light static Pages with Node build/check tools, a date-only JavaScript library and validation covering historical year 1–99 JavaScript Date remapping errors, later fixed. Research accurately warns that work-time studies do not validate Metric Calendar's specific rhythm.

## Decision by component

| Existing component | Proposed category | Reason / change control |
|---|---|---|
| Current live published rules and working converter | **Retain in production pending explicit adoption** | These are supported and tested existing public contracts; research is not an implied migration |
| Day remains unchanged; no metric clock | **Retain** | Astronomy requires dates and days, not time-of-day redesign |
| Verified date-only conversion tests, semantic URLs, accessibility, provenance and no invented productivity claims | **Retain and extend** | Engineering and scientific integrity independent of chosen calendar |
| Ten months / alternating 36 and 37 | **Replace in the mathematical recommendation** | Extra unit system; equal pairs do not justify ten mandatory months |
| Six-day week; six weeks reset per month | **Remove from canonical date identity** | A choice of week length is not implied by Earth's year; interruptions are unnecessary when weeks are optional continuous overlays |
| 360 regular core, five Bonus Rest Days | **Replace in the mathematical recommendation** | 364+1 offers more complete nested week regularity with fewer exclusions; ordinal year requires no non-weekday dates |
| One Gregorian leap-day rule | **Replace in OSC1 research candidate** | Use phase-balanced 31/128 rule under explicitly nominal mean tropical-year and stated epoch; requires ephemeris study before claiming superiority to observation-based solar dating |
| Gregorian January 1 boundary and inherited year numbers | **Replace in OSC1 research candidate** | Neither has independent mathematical authority; separate documented equinox-derived epoch |
| Five 73-day pairs | **Preserve as historical mathematical insight** | Exact identity is useful to explain the design; not optimality evidence |
| Four Focus / two Rest | **Separate as optional human work-schedule hypothesis** | Does not follow from mathematical date indexing; four-in-six ≠ four-in-seven |
| Month and weekday names | **Archive as named v1 display vocabulary** | Valuable intellectual/brand history, not canonical numeric identity for OSC1 |
| Site's historical adoption and work-time comparisons | **Retain with updated caveat links** | Evidence supports evaluating work schedules, not calendar-driven human outcomes |
| New OSC1 notation and algorithms | **Document only in versioned research area** | No silent change to `calendar.js`, `script.js`, HTML converter, CNAME, sitemap or Pages |

## Contradictions and historical reconciliation

1. **Math versus advocacy:** early site's framing connects ten months and six-day weeks to "better rhythm" and "research-backed" reform; current rationale distinguishes proven arithmetic, external occupational research, proposed benefits and untested calendar-specific mechanisms. New documentation should keep that distinction upfront, while not changing existing production copy without a separate adoption decision.
2. **Bonus Day versus month membership:** Bonus Days are *in* their even numbered months, yet *outside* the weekly cycle; Leap Day is **10-38** and within the final month. Saying they are "outside the calendar" would be false. OSC1 avoids this distinction by not mandating a week.
3. **Old year-end description:** the 2026 September verification notes older code labelled month10 day37 as New Year's Eve even in leap years; this was corrected so only final 10-38 has that label in leap years. This is historical, **not an outstanding bug**.
4. **Old JavaScript years 1–99:** historical Date year remapping was corrected by explicit UTC-full-year/date-only calculation; retain that test history rather than suggesting current years 1–99 are broken.
5. **Names after mechanics:** October 2026 PRs introduced months and weekday names as display choices without changing numeric positions or conversion logic; do not backdate the naming system to the initial specification.
6. **Metric time:** an older exploration included metric/decimal-time discussion, while the June 2026 website-specification draft explicitly said **do not mention metric time** and current production has no metric time. Scope for this investigation remains calendar/day structure only.
7. **Earlier work/rest ordering:** the currently audited `main` and June 2026 build requirements consistently say **four successive Focus days, then two Rest days**; source evidence furnished in the accessible project does **not** establish the exact ordering of any allegedly earlier alternative sequence. Any prior iterations should be indexed from dated archival versions rather than inventing a precise past rule and calling it a conflict.
8. **Free public CI versus owner local default:** `AGENTS.md` specifically says ordinary development/tests should run on the owner's GMKtec Windows machine where accessible and independent limited standard **public** GitHub Actions/Pages checks should remain free and isolated. Never call Chat's own environment a self-hosted GMKtec runner.

## Migration boundary if a future owner decision adopts OSC1

A future change should be a **new major version** with namespace-separated OSC1 dates, independently tested arithmetic, published migration and legacy conversion policy, new API contract, and parallel dual-calendar comparison. Historical Metric dates must remain reproducible and labelled as original Metric Calendar v1; never quietly reinterpret stored `2026-05-36` as an OSC1 date. Retain the website, brand archive and old converter in a clearly identified legacy area until software consumers have migrated deliberately. A research PR itself must not publish a new canonical standard.

## Missing evidence to seek

Archived early design notes showing work/rest variants, old decimal-time proposal, unindexed pre-repository discussions, website screenshots before September 2026, private test protocols and any independently commissioned real-world pilots. None may be reconstructed from assumption alone.
