# Metric Calendar

Static reference site and date converter at [metriccalendar.org](https://metriccalendar.org/).
Attribution: **J. Fisher / MetricCalendar.org**.

## Site structure

- `/` — introduction and calendar diagrams
- `/calendar.html` — definitive calendar specification and stable rule anchors
- `/converter.html` — bidirectional converter, method, and worked examples
- `/comparison.html` — Gregorian comparison and trade-offs
- `/rationale.html` — research, source-specific limitations, and citation guidance
- `/adoption.html` — planning overlays and possible pilot evaluation
- `/faq.html` — common questions with linkable answers
- `/about.html` — existing project background, attribution, scope, and feedback
- `/404.html` — GitHub Pages error page

The previous `index.html`, `converter.html`, `rationale.html`, and `faq.html` URLs
remain valid. Home uses `/` as its canonical URL; the existing `/#model` anchor is
retained. No host-level redirect service is needed. Internal paths are root-relative
for the custom domain, including on the 404 page.

## Editing and building

Requires Node.js 22 or later. The build and core tests have **no npm dependencies**.

1. Edit page bodies in `content/*.html` and metadata in `content/pages.json`.
2. Edit the shared shell and static diagram generation in `scripts/build.mjs`.
3. Run `node scripts/build.mjs` and commit the generated root HTML and sitemap.

`styles.css` contains the shared responsive styling. `calendar.js` is the date-only
calculation module, usable in the browser and Node. `script.js` handles the UI.
Original logos, favicons, colours, and Inter typography are retained. The Inter
Latin variable font is served locally; its SIL Open Font License is in
`assets/fonts/OFL.txt`. No third-party scripts or analytics run on the website.

Preview: `node scripts/serve.mjs`, then open `http://127.0.0.1:4318`.
Set `PORT` to choose a different port. The preview server binds only to localhost.

## Calendar rules and resolved edge cases

- Ten months with lengths `36,37,36,37,36,37,36,37,36,37`.
- In leap years, month 10 has 38 days. Leap rule: divisible by 4, except centuries
  must be divisible by 400.
- Six six-day metric weeks per month. Four Focus Days followed by two Rest Days.
- Day 37 of an even month is a Bonus Rest Day, outside the regular metric weeks.
- Month 10 day 38 is Leap Day, also outside the regular metric weeks.
- Year number and ordinal day are preserved in both conversion directions.
- New Year's Eve is day 37 in a common year, day 38 in a leap year. The old
  implementation also labelled leap-year month 10 day 37 as New Year's Eve;
  this contradicted its own final-day rule and has been corrected.
- Gregorian February 29 and Metric Leap Day do not identify the same day.
- Metric dates have no prefix; Gregorian dates use the project's lowercase `g`.
  Years are padded to four digits. Use “metric month”, “metric week”, and “metric day”.
- The tool supports years 1–9999, with no year zero, applying Gregorian rules
  proleptically. It does not interpret historical local cutovers. Years 1–99 now
  work correctly; arithmetic avoids the JavaScript Date 1900 offset entirely.
- “Today” uses the device's local date; conversions are date-only and do not use
  timestamps or daylight-saving arithmetic.
- The homepage month follows that local date, highlighting today in the regular
  grid or on the Bonus Rest / Leap Day strip. It updates at midnight, on return to
  the tab, and when a changed device date is detected. Without JavaScript, the
  calendar is clearly labelled as an example instead of a current date.

## Verification

Run before publishing:

```text
node scripts/build.mjs
node --test tests/calendar.test.cjs
node scripts/check.mjs
```

The calendar suite compares 182,621 dates to independent UTC arithmetic, covering
a full Gregorian 400-year cycle, years 1–99, year 9999, published examples,
forward/reverse round trips, every month boundary, annual day-type totals, bonus
and leap days, and invalid inputs. The site checker verifies local links and
fragments, assets, one H1 per page, unique metadata, canonical/OG agreement,
JSON-LD, sitemap, crawler access, existing URLs, and domain configuration.
GitHub Actions repeats the dependency-free checks and ensures generated pages
have been committed. It does not replace the existing Pages deployment setup.

Optional browser suite: make `playwright` and `axe-core` available to Node
(for example, `npm install --no-save --package-lock=false playwright axe-core`
and `npx playwright install chromium`), start the preview, and run:

```text
node tests/browser.cjs
```

Configuration: `BASE_URL` (defaults to the local preview), `CHROME_PATH` (optional
installed Chrome executable), `QA_AXE_PATH` (optional axe script path), and
`QA_OUTPUT` (defaults to `.qa`). Browser dependencies are for development only.
The suite checks all nine pages at 320, 390, 768, and 1440 pixels; runs axe at
mobile and desktop sizes; checks navigation, keyboard focus, invalid dates,
shared links, copy, timezone-local “Today”, and no-JavaScript access. Screenshots
and reports go to the ignored `.qa` directory. Inspect the screenshots manually;
automated accessibility checks are not a full accessibility audit.

## Content and sources

Preserve the specification unless a deliberate calendar change is requested.
Distinguish rule-derived facts, supporting research, proposed benefits, and
untested hypotheses. Do not invent author credentials, project history, adoption,
trials, or endorsements. The research page cites verified primary publisher,
report-author, WHO/ILO, OECD, and USNO sources and explains the relevance and
limits of each. The 2025 study summary is limited to the publisher's public
description; this site is not a systematic literature review.

All reference content and diagrams are in static HTML. Only the converter and
current-date display require JavaScript. Canonical URLs, breadcrumbs, accurate
WebSite/WebPage structured data, social metadata, and an eight-page sitemap are
generated from one metadata file. `robots.txt` permits all crawlers. No claims
are made about search rankings, indexing, or AI recommendations.

## Publishing

The existing GitHub Pages setup publishes **`main`, repository root `/`**, with
custom domain **`metriccalendar.org`** and HTTPS enforced. `CNAME` preserves the
domain; `.nojekyll` makes this an ordinary static site. No production runtime,
package installation, new hosting account, or deployment credentials in the
repository are needed.

After local checks and visual review, commit the source and generated files and
push to `main`. Verify the Pages build belongs to the new commit, then check the
live HTML, assets, sitemap, 404 response, and converter. A browser test run can
target production with `BASE_URL=https://metriccalendar.org`.
