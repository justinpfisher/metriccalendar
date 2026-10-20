# 2 — Mathematical foundations and independent derivation

## Astronomy before human rhythm

The Earth's rotation gives a day; seasons arise from Earth's orbital motion and axial orientation. The sidereal year (~365.2564 mean solar days) does not maintain seasons. The *mean tropical year* around the present epoch is about **365.24219 days**, often rounded to **365.2422**, and changes gradually. An interval between consecutive March equinoxes is **not identical** to that mean; observed equinox events vary in date and time.

For transparent arithmetic, freeze **T=365.2422 = 1826211/5000 days** as a *nominal stationary target*. All drift figures in this document compare **calendar average minus T**, not actual far-future seasonal drift. Modelling real seasons over centuries requires choosing mean ecliptic longitude or a specific equinox/solstice, an astronomical ephemeris, a reference time scale, secular changes and a phase. A civil-date boundary (here 00:00 UTC) is also a convention. An observed-equinox calendar avoids a fixed mean approximation but is difficult to precompute, may vary with the ephemeris, and requires a precise worldwide civil-day rule.

References: [USNO calendars](https://aa.usno.navy.mil/faq/calendars), [USNO leap years](https://aa.usno.navy.mil/faq/leap_years), [NOAA definitions](https://www.noaa.gov/jetstream/appendix/weather-glossary-y), [USNO seasons](https://aa.usno.navy.mil/data/Earth_Seasons), [year-length observation table](https://www.timeanddate.com/astronomy/tropicalyearlength.html), [2000 equinox time](https://www.timeanddate.com/calendar/seasons.html?n=1440&year=2000).

## Evaluation principles established in advance

Without weights, compare: chronological validity; minimum mandatory unit/rule count; common-year off-core days; equal periods; intact nested week groupings; number of divisors; mean solar-year approximation **and phase oscillation**; easily reversed date computations; stable recurrence; and clearly separate human legibility. No dimension is a proven universal "elegance" function. A particular structure can dominate another on some dimensions but lose on others.

Minimality lower bound: if a date already has year and ordinal-day, introducing an obligatory month or week adds information and rules **without increasing the ability to identify a civil day**. Under minimal mandatory primitives, year+ordinal is therefore optimal. This is conditional on permitting no named subperiods, not a theorem about preferred everyday displays.

## Prime factorisation

| Year core | Factorisation | Positive divisor count | Common-year remainder |
|---|---|---:|---:|
| 360 | 2³×3²×5 | 24 | 5 |
| 361 | 19² | 3 | 4 |
| 362 | 2×181 | 4 | 3 |
| 363 | 3×11² | 6 | 2 |
| 364 | 2²×7×13 | 12 | 1 |
| 365 | 5×73 | 4 | 0 |
| 366 | 2×3×61 | 8 | not a common-year core |

**Exact impossibility proof:** If an entire 365-day ordinary year consists of p>1 equal periods, with q>1 complete equal weeks each, and each week has w>1 days, then **p×q×w = 365**. But 365=5×73 has only two prime factors; it cannot be factored into three integers all greater than one. Thus a non-trivial equal *period/week/day* hierarchy covering exactly 365 days is impossible. At least one constraint must change: omit a regular core day, allow unequal periods, cross period boundaries with weeks, or dispense with a unit.

360's 24 divisors enable 10×36, 12×30, 6×60 and more. 364's 12 divisors enable 4×91, 13×28 and 52×7 while needing four fewer off-core days. 365's 5×73 permits no evenly nested small-week multi-period design. **36+37=73** explains the current project's five identical pairs but also demonstrates that the individual months are unequal and the prime pair size cannot be split into small equal weeks.

## Leap algorithms: exact fractions

A periodic calendar with K leap years among N has mean **365+K/N**. Signs below are signed days relative to a constant T=365.2422. Multiply the yearly value by the horizon; this is only the *average slope*, excluding individual leap step and change in astronomical year.

| Pattern | Mean | Error / year | After 100y | After 1,000y | After 10,000y |
|---|---:|---:|---:|---:|---:|
| 1/4 | 365.250000000 | +0.007800000 | +0.7800 | +7.800 | +78.000 |
| Gregorian 97/400 | 365.242500000 | +0.000300000 | +0.0300 | +0.300 | +3.000 |
| 8/33 | 365.242424242 | +0.000224242 | +0.022424 | +0.224242 | +2.242424 |
| 218/900 | 365.242222222 | +0.000022222 | +0.002222 | +0.022222 | +0.222222 |
| **31/128** | **365.242187500** | **−0.000012500** | **−0.001250** | **−0.012500** | **−0.125000** |
| 1211/5000 | 365.242200000 | 0 by definition | 0 | 0 | 0 |

The precise 5000-year fraction fits **the rounded target**, not nature; it is an example of meaningless extra precision absent an astronomical model. Against mean ~365.24219, 31/128 differs by ~−0.0000025 day/year, but *not* necessarily against a March-equinoctial year. Comparing future March equinoxes with actual ephemerides could change the ranking. A 1-day/80,000-years shorthand from −0.0000125 ignores phase and secular variation and must never be presented as a physical accuracy guarantee.

## Phase-balanced 128-year rule

Simply taking every fourth leap except each 128th produces a **single eight-year separation** across the omission; the average is attractive but intra-cycle phase behaviour is needlessly poor. For OSC1 choose:

**B(y) = 365y + floor((31y+40)/128)** days since epoch.

**L(y) = floor((31(y+1)+40)/128) − floor((31y+40)/128)**.

For any integer y, including negative y, L∈{0,1}; leaps are distributed at four- or five-year intervals. There are 31 in any consecutive 128 OSC1 years, with an exact cycle **128×365+31=46,751 days**. Proof: replacing y by y+128 adds 31 inside the floor and 365×128 outside it. The phase constant **40** approximates 40/128≈0.3125 of a day, close to the 2000 March equinox's UTC phase 07:35/24h≈0.316. This helps line up early year boundaries with the reference event without relying on January 1. It is a **provisional phase convention**, not a fit against a multi-century observed equinox series.

In cycle y=0..127, leap years are:
2,6,11,15,19,23,27,31,35,39,44,48,52,56,60,64,68,73,77,81,85,89,93,97,101,106,110,114,118,122,126.

## Bounded systematic search

Enumerate nested equal designs p periods of q complete weeks each of w days, core C=pqw and r=365−C surplus days. Taking **w 2..12, p 2..20, q 1..100, r 0..5**, exhaustive integer search returns **81 layouts**: 69 with C=360, 3 with C=363, 9 with C=364. None has C=365 in these bounds; the prime-factor proof rules out any C=365 with all three factors >1 even without bounds. Such a search does not include variable periods, month-free systems, crossed week boundaries or observed-astronomical calendars. Those require separate reasoning and are included in the comparisons.

## What mathematics does not decide

Selecting a year-name zero, March versus September equinox, UTC meridian, phase 40, appropriate period length, whether a week ought to be continuous, and whether a date should read year/ordinal or year/period/day are **conventions**. Mathematics determines consequences once conventions are fixed. Demanding a unique context-free answer would invent a weighting scheme that is not derivable from astronomy.
