# Revamp verification — September 19, 2026

## Scope

Eight content pages plus a custom 404, using the existing GitHub Pages repository
and custom domain. Existing page URLs and `/#model` are preserved. Navy, gold,
cream, Inter, and original logos remain. Calendar rules are unchanged.

Two defects in the earlier implementation were corrected: years 1–99 no longer
map through JavaScript Date's 1900 offset, and leap-year month 10 day 37 is no
longer incorrectly labelled New Year's Eve (day 38 is the final day).

## Checks completed before publishing

- 182,621 individual dates checked against independent Gregorian UTC arithmetic
  and reverse conversion, including the 400-year cycle, early years, and 9999.
- Published examples, exact month lengths, annual Focus/Rest/Bonus/Leap totals,
  century exceptions, boundaries, and invalid dates tested.
- Nine pages at 320, 390, 768, and 1440 CSS pixels: no horizontal page overflow or
  JavaScript exceptions. Enlarged text also checked at an effective narrow width.
- Mobile and desktop screenshots visually reviewed, including converter results,
  tables, research citations, FAQ, and the social preview image.
- Automated axe checks against WCAG A/AA tags (including 2.1/2.2) and best-practice
  rules: no detected violations at mobile and desktop widths. Keyboard skip link,
  menu, Escape, focus, form submission, and error focus checked manually/by browser
  interactions. This is not a full assistive-technology accessibility audit.
- Gregorian/Metric direction changes, blank and invalid values, leap-day examples,
  years 1–99, dynamic day limits, copy, shared links, malformed URLs, FAQ fragments,
  and timezone-local “Today” exercised in Chrome.
- Static content and navigation available without JavaScript; converter fallback
  links to the documented method and examples.
- 323 local link/asset/fragment references, unique titles/descriptions, canonicals,
  Open Graph URLs, JSON-LD, sitemap, robots, manifest assets, and CNAME checked.
- External citations verified against primary sources. Report and publisher links
  resolve; the OECD page restricts direct automated requests (HTTP 403), but its
  definition was verified through web retrieval. Nature uses a cookie redirect;
  the study summary was verified on the publisher's issue page and publication
  record. No paywalled full-text findings are claimed.
- GitHub Pages API confirmed `main`, root `/`, custom domain `metriccalendar.org`,
  and enforced HTTPS. No hosting migration or redirect service is introduced.

## Ongoing limits

Research cited is contextual evidence about other working-time arrangements,
not a trial of this calendar. The site is explicit about that distinction and
does not invent endorsements, credentials, trials, or adoption figures.
Converter support is date-only, proleptic Gregorian years 1–9999. Historical local
calendar transitions, holiday rules, and recurrence policies are outside scope.
Browser review used Chrome; a full multi-browser/screen-reader audit remains a
separate exercise. External sources can change after this review.
