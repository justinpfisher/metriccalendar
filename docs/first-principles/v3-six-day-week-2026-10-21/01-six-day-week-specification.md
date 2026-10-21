# 1 — DC10 research v3: definitive six-day-week and Rest Day rules

**Scope:** Versioned research candidate, not production `calendar.js`. This v3 specification inherits the ten-period month/epoch/notation/leap algorithms from [v2's exact specification](../v2-base10-2026-10-20/03-dc10-research-spec.md), and changes **only the weekly and Focus/Rest classification**. No new astronomical result is claimed.

## Civil-year arithmetic — unchanged from v2

For signed research year `y`, the provisional UTC-civil-day index of the beginning of that year remains:

    B(y) = 365*y + floor((31*y + 40)/128)
    L(y) = B(y+1) − B(y) − 365

`L(y)` is 0 or 1; 31 leap additions occur in each 128-year period. This is a **provisional astronomical model**, not an ephemeris-qualified exact seasonal calendar. Epoch: research year 0 day 1 at Gregorian 2000-03-20 UTC civil date. The signed, namespaced research format remains `DC10:+000026-06-32` (not comparable to the live project's unprefixed Metric date without explicit conversion).

Whole-day lengths for months 01–10:

    common: 37,36,37,36,36,37,36,37,36,37
    leap:   37,36,37,36,37,37,36,37,36,37

Every date belongs to exactly one month; no month ever contains Day 38. Leap addition occurs only on **Month 05 Day 37**. The final date of either year is **Month 10 Day 37**, including leap years. The ten-month boundaries and ordinal conversion remain exactly as v2 defined.

## Six-day weeks — normative for the v3 research candidate

Each month has a core of **six complete weeks of six days** covering month days 01–36. The six weekday numbers and existing English display labels are:

| Weekday | Display name | Day classification |
|---|---|---|
| 1 | Begin | Focus |
| 2 | Create | Focus |
| 3 | Connect | Focus |
| 4 | Share | Focus |
| 5 | Pause | Regular Rest |
| 6 | Renew | Regular Rest |

For any valid DC10 `(y, m, d)` with `1 ≤ d ≤ 36`:

    week_number = 1 + floor((d−1)/6)           # 1..6
    weekday_number = 1 + ((d−1) mod 6)        # 1..6
    kind = Focus if weekday_number ≤ 4 else Regular Rest

For any valid `d=37`:

    kind = Bonus Rest
    week_number = null
    weekday_number = null
    isLeapRestDay = L(y)==1 and m==5 and d==37

This means the **additional day is part of the month but outside the six ordinary metric weeks**. Every month begins Week 1 / Begin regardless of whether the preceding month had 36 or 37 days. Thus the metric week is **month-local, not continuous across month boundaries** in the sense of a globally unbroken six-day sequence. On 37-day months the special Rest Day is an intentional cycle interruption.

Day 35 = Week 6 / Pause (Regular Rest), Day 36 = Week 6 / Renew (Regular Rest), and Day 37 (if present) = Bonus Rest. This yields **three consecutive Rest Days** before the next month's Begin. Month 36-day endings yield two consecutive Rest Days before the next Begin.

**Leap-year naming:** The 05–37 date is the *extra leap date*, classified as a **Bonus Rest Day** and optionally displayed as **Leap Rest Day**. It must **not be counted twice** and no further leap day exists after 10–37. All other Bonus Rest Days are regular 37th month days and count once.

## Exact annual invariants and proof

For any ordinary or leap research year, each of the ten months supplies `6×6=36` ordinary week dates:

    10 × 6 weeks × 6 days = 360 in-week days
    10 × 6 weeks × 4 Focus Days = 240 Focus Days
    10 × 6 weeks × 2 Rest Days = 120 Regular Rest Days
    Extra Rest Days = 5 + L(y)
    Year length = 240 + 120 + 5 + L(y) = 365 + L(y)
    Total Rest Days = 120 + 5 + L(y) = 125 + L(y)

This is a counting identity; it is **not** evidence that salary, paid leave, or productivity will change. It also proves there can be exactly 60 *month-local* six-day regular weeks per year. The civil days outside the weekly cycle are accounted for uniquely within their respective months.

## Conversion and recurrence

- Encode/decode DC10 dates to an **absolute integer civil day** using v2. The new Focus/Rest classification is derived from the *month/day*, not the absolute day modulo 6.
- An event recurring every absolute six elapsed days is **not equivalent** to every regular weekday labelled Begin: it will be disrupted by 37th-day rest interruptions. Use `(month, week, weekday)` to refer to a regular weekday, or use the continuous integer day for fixed elapsed-day recurrence.
- Yearly DC10 `(month,day)` recurrences keep month/day if valid; Month 05 Day 37 exists only in leap years and requires an explicit missing-anniversary policy.
- External Gregorian birthday/event recurrences should be recalculated in the source calendar and separately converted. The two year-number systems do not share the same January 1 boundary.
- No new mandatory decimal clock or change in 24-hour-day timing is implied.

## Sample boundaries

| Date within a 37-day month | Week | Weekday | Type |
|---|---|---|---|
| 01 | 1 | Begin | Focus |
| 04 | 1 | Share | Focus |
| 05 | 1 | Pause | Rest |
| 06 | 1 | Renew | Rest |
| 35 | 6 | Pause | Rest |
| 36 | 6 | Renew | Rest |
| 37 | — | — | Bonus Rest |
| Next month 01 | 1 | Begin | Focus |

Weekdays have only 1–6 numeric positions. There is no seventh weekday. The 37th date is explicitly **not** a weekday, even though it is a Rest Day.
