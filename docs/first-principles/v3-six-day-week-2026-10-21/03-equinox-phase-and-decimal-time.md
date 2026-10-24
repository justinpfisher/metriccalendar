# 3 — Astronomical phase stress test and optional decimal time (24 October 2026)

**Status: research addendum, not a new production rule.** This file supplements [v3's selected ten-month/six-day model](README.md). The owner-selected **four Focus / two Rest** week and Bonus Rest Days are unchanged. The published site and converter retain their previous Gregorian-aligned calendar. In particular, **do not silently change the DC10 year-start phase**, since that reinterprets future research date labels.

## New finite-horizon check: phase 40 is not a perfect equinox-date match

V3 provisionally starts signed research year `y` at the UTC civil date `2000-03-20 + B(y)` where:

```
B(y) = 365*y + floor((31*y + 40)/128)
```

`31/128` makes the arithmetic average year **365.2421875 days**, very close to the approximate *mean* tropical year of 365.24219 days. This does not mean that the particular March equinox falls on the selected year-start *civil date* every year. Even a tiny displacement across midnight changes the observed date by one whole day. See [USNO's distinction between seasonal years and Gregorian dates](https://aa.usno.navy.mil/faq/seasons_orbit) and [NASA's discussion of noncommensurate astronomical cycles](https://eclipse.gsfc.nasa.gov/SEhelp/calendars.html).

I extended the earlier **2000–2049** observation comparison to **2000–2099**. The source is the published March equinox **UTC civil date** (not a personally computed ephemeris), from [Timeanddate 2000–2049](https://www.timeanddate.com/calendar/seasons.html?n=1440&year=2000) and [2050–2099](https://www.timeanddate.com/calendar/seasons.html?n=1440&year=2050), reviewed on 24 October 2026. The independent [AstroPixels 2001–2100 table](https://www.astropixels.com/ephemeris/soleq2001.html) corroborates the decisive event: **2073-03-20 at approximately 00:12 GMT** (Timeanddate: 00:13 UTC).

| Constant floor phase | Matching UTC equinox dates, 2000–2099 | Mismatch |
|---|---:|---|
| `40` — currently published v3 research assumption | **99/100** | **2073-03-19 predicted versus 2073-03-20 observed** |
| `41` | **100/100** | None in these 100 years |
| `42` | **100/100** | None in these 100 years |
| `43` | **99/100** | 2011-03-21 predicted versus 2011-03-20 observed |

The [dependency-free regression test](validation/verify_phase.py) encodes just the 22 non-March-20 years in the published hundred-year observation set, preserves the 31/128 arithmetic, and exhaustively evaluates all 128 integer phase positions. **Only phases 41 and 42 match all 100 civil dates in this window.** This constitutes a new finite-window comparison, *not* validation of predicted equinox instants, ±500/2000-year accuracy, or the uniqueness of a best astronomical calendar. The observational tables are published secondary calculations; an independent authoritative ephemeris comparison remains outstanding. Optimising against this window alone could overfit the same dates used to select a phase.

**Decision:** Do **not** replace `+40` with `+41` or `+42` automatically. Preserve existing v3 examples and date identity while recording this defect in phase-40 alignment. Before canonisation, specify (a) the astronomical reference event and UTC/other day-boundary rule, (b) a declared date range and acceptable error measure, (c) ephemeris inputs and uncertainty, and (d) a tie-breaker for phase and leap-cycle complexity. Then explicitly version any changed rule.

## Does metric or decimal time belong inside the calendar?

It can be a **non-normative display layer**. The ten-period annual structure is genuinely decimal at its highest civil subdivision; the physical day does not need to be redefined to use decimal fractions within a day. A conventional nominal day of **86,400 SI seconds** can be displayed as ten decimal hours, each with 100 decimal minutes, each with 100 decimal seconds:

| Decimal time unit | Conventional elapsed duration |
|---|---|
| 1 decimal hour (one tenth of a day) | 2 h 24 min = 8,640 SI seconds |
| 1 decimal minute | 86.4 SI seconds |
| 1 decimal second | 0.864 SI seconds |

For example, **09:00 conventional = 03:75:00 decimal**, **12:00 = 05:00:00**, and **18:00 = 07:50:00**. These are exact mappings for nominal 24-hour wall-clock notation; the sub-day decimal unit is *not* an SI second. As a cleaner alternative, show fractional daily progress, such as `0.375 day` at 09:00, without introducing a second wall-clock standard.

Decimal time has historical precedent in the [French Revolutionary calendar and clocks](https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/revolutionary), but that precedent does not establish its practical superiority. **Do not require decimal time**, change existing time input or APIs, or replace 24-hour/SI-second timestamps. Any later optional display must say whether it converts a wall-clock time, a UTC instant, or actual elapsed seconds; local daylight-saving transitions and leap seconds must not be mistaken for ordinary 86,400-second elapsed days.

## What remains invariant

- Ten research months; common lengths `37,36,37,36,36,37,36,37,36,37`, leap month 05 gets Day 37, month 10 never has Day 38.
- Each month's first 36 days comprise six month-local weeks: four Focus then two Rest; each Day 37 is an additional Rest Day with no regular weekday.
- Year totals: **240 Focus, 125 Rest common / 126 Rest leap**. No outcome claims about health or productivity.
- Research dates remain visibly namespaced (`DC10:`), distinct from deployed Gregorian-aligned unprefixed Metric dates. No current user-entered production date is reinterpreted.