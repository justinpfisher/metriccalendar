# 4 — Human rhythm, adversarial checks and remaining decisions

**Second stage begins only after selecting the decimal-year mathematics.** Nothing in 10 annual periods, five 73-day pairs or a leap-year midpoint objectively identifies the ideal period of labour or recovery.

## What the decimal structure can offer

- **Annual tenths:** ten similarly sized periods (~36–37 days) give predictable, numerically legible planning stages. That is a mathematical affordance, **not empirical proof** it improves planning or life satisfaction.
- **Five equal common-year pairs:** each pair is exactly **73 days** in an ordinary year. These form five optional larger planning stages. The central pair alone has 74 days in a leap year.
- **Two near-equal half-years:** 182+183 ordinary days, 183+183 leap days; the leap addition is placed at the boundary of the two five-month halves.
- **Decimal progress:** 10%, 20%, ... percentage reference points, or an optional civil-year progress bar. Boundaries are rounded to whole days; no implication about exact Earth–Sun geometry.
- **Uninterrupted independent schedules:** school, family, employer, religious or healthcare cycles are free to use 5, 6, 7, 10 or other day patterns without calendar-imposed zero-weekday dates or weekly resets.

These are potential organisational conveniences, not guarantees of wellness.

## Why *not* mandate a ten-day week?

A ten-day week superficially looks “more metric”, but if the goal is an elegant *solar* calendar it is arbitrary to require people to rest every tenth day. **365 mod 10=5**, so an unbroken ten-day schedule changes its position relative to year boundaries. A ten-day rest day that is outside the schedule would introduce five or six exceptions to re-establish alignment. That would defeat a major benefit of a continuous date index.

The historical [French Republican calendar](https://ccat.sas.upenn.edu/~haroldfs/540/handouts/french/frcalendar.html) experimented with ten-day weeks in twelve 30-day months, plus five or six festival days. This is background about precedent, not an experiment isolating human recovery or the present ten-month model. Whether 7/3, 6/4 or other ten-day rosters benefit people would require direct testing; ten-day unit labels provide no predictive evidence.

The [UK four-day-week trial (Cambridge)](https://www.cam.ac.uk/stories/fourdayweek), [Fan et al. 2025 reduced-hours study](https://pubmed.ncbi.nlm.nih.gov/40691306/) and [WHO/ILO evidence on long working hours](https://www.who.int/news-room/questions-and-answers/item/global-regional-and-national-burdens-of-ischemic-heart-disease-and-stroke-attributable-to-exposure-to-long-working-hours-for-194-countries-2000-2016) can inform independently trialled employment policy. They **do not** validate any particular base-ten calendar week. Four shifts in six elapsed days is not the same working-time exposure as four shifts in seven; four 10-hour shifts are not an hours reduction. See v1 [human research](../v1-2026-10-20/05-human-rhythm-and-wellbeing.md) and [annual hours analysis](../v1-2026-10-20/06-productivity-and-implementation.md).

**Recommendation:** an independent optional work/recovery layer with occupation-specific schedule, actual annual hours, pay, social synchronisation, fatigue and staffing checks. The mathematical calendar should say nothing about mandatory work versus rest.

## Adversarial review

1. **A completely exact decimal hierarchy is impossible with whole days.** Ten ideal deciyears would each require ~36.5/36.6 days, and a thousandth-year is less than one day. The proposal is *optimal rounding*, not an exact SI time system.
2. **Extra compulsory tiers may hurt simplicity.** Ten annual periods are required by the new brief; a hundred three-/four-day periods need not be. A continuous day count remains the computational source of truth.
3. **The leading arrangement is conditional.** Two mirror common-year length patterns are equally minimax optimal; choosing central month 5 rather than 6 is a transparent symmetry preference, not theorematically unique.
4. **The five-pair rule is a separate mathematical constraint.** It is justified by **365=5×73** and structural repeatability but should not be confused with decimal grouping. Removing it may admit more equally balanced layouts that are not as visually coherent.
5. **The leap astronomical rule is provisionally inherited.** A 31/128 leap cycle is close to *rounded* mean tropical year, but it is not proved better for the actual March-equinox year over any given long horizon. The base-ten priority has no reason to alter an otherwise independent leap fraction.
6. **Changing the epoch is costly.** The proposed March 2000 reference and signed year 0 come from v1 and are not fixed by decimal arithmetic; future global adoption may favour separate numbering, but convenience must not retroactively define the first-principles result.
7. **No intrinsic leap holiday:** month 05 day 37 is an ordinary date with an optional ceremonial name, not a forced rest day. Turning it into a universal holiday would be a labour and cultural decision.
8. **Work benefits are mostly available without reforming dates.** A shorter workweek or longer recovery periods can be piloted under Gregorian dates; calendar reform must be shown to improve comprehension or coordination on its own merits.

## Clear implementation boundary

- **Research**: v2 proposal, proofs, exhaustive 160-case enumeration and round-trip validation are ready for independent mathematical review.
- **Tested**: standard-library Python tests in Chat's container (522,484 counted checks), **not** on GMKtec, no browser or production converter changed. Rerun locally on the owner machine if accessible.
- **Current production**: original month pattern/Bonus Days/Focus–Rest rules untouched. Keep the existing `calendar.js` contract and site functioning.
- **Before selection for production**: perform independent astronomy ephemeris checking against specified seasonal definition and horizon; decide DC10 year label and epoch, clear migration/namespace rules, numeric aliases and labels; explicitly authorise adoption.
- **After selection**: build a versioned side-by-side converter without invalidating old Metric dates, perform independent tests and accessibility checks, then release using the existing public GitHub Pages deployment.

This v2 result narrows the mathematical choice but makes **no** claim of scientific proof that adopting ten months improves happiness, output or social cohesion.
