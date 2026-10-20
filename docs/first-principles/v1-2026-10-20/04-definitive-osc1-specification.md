# 4 — Definitive mathematical specification of proposed OSC1

**Status: proposed research candidate only, version OSC1. Not adopted into the existing site's normative converter.** It is a date-only calendar. Time of day, seconds, leap seconds and the physical day are **not redesigned**.

## Fundamental identifiers

1. **Year y:** any signed integer, including 0 and negative years. Its number has *no equality requirement* with a Gregorian year number.
2. **Ordinal d:** positive integer 1..365; also 366 in an OSC1 leap year. Each civil day belongs to precisely one year.
3. **Epoch:** absolute index A=0 at the UTC civil day **Gregorian 2000-03-20**, containing the March equinox observed at approximately 07:35 UTC. All Gregorian dates in this specification are *proleptic*.
4. No normative months, weeks, weekday numbers, Focus Days, Rest Days or exceptional days outside any week. Numbered day 366 is an **ordinary valid ordinal** in a leap year, not a second date outside the year.

## Exact formula — floor for negative numbers

    B(y) = 365*y + floor((31*y+40)/128)
    L(y) = B(y+1)-B(y)-365                     # 0 or 1
    length(y) = 365+L(y)
    A(y,d) = B(y)+d-1

The **40** is a phase term: the 2000 March equinox was ~0.316 of a UTC civil day after 00:00; 40/128=0.3125 provides a nearby phase. This is not a guarantee that the new year continues to fall on the equinox for all future centuries; 31/128 approximates a mean tropical period, not the time-dependent March-equinox interval.

The 128-year period contains exactly 31 leap years. For y=0..127 they occur at **2, 6, 11, 15, 19, 23, 27, 31, 35, 39, 44, 48, 52, 56, 60, 64, 68, 73, 77, 81, 85, 89, 93, 97, 101, 106, 110, 114, 118, 122, 126**. Successive leaps are separated by four or five years. Exactly **46,751 days** elapse over any 128 OSC1 years. For every integer y, **B(y+128)=B(y)+46,751**.

## Versioned, collision-resistant text notation

Pattern: **OSC1:[+-][0-9]{6,}-[0-9]{3}**. Require a sign, at least six year digits, a dash, and exactly three ordinal digits; zero-pad year and day and reject a leap-only ordinal in a common year. Examples:

- **OSC1:+000000-001** — epoch day.
- **OSC1:+000002-366** — final valid day of leap year 2.
- **OSC1:+000003-001** — immediately following day.
- **OSC1:+000026-214** — Gregorian 2026-10-19.
- **OSC1:-000001-365** — day immediately before epoch.

The format cannot be mistaken for existing unprefixed Metric dates (YYYY-MM-DD), project-prefixed Gregorian dates (gYYYY-MM-DD), or standard ISO civil date strings. Names and display labels must be mapped *from* numeric identifiers and never replace them as keys. The year field can expand indefinitely with arbitrary-precision integer support. Chronological sorting is by **A**, not raw lexicographic sorting of variable-length signed labels.

## Reference implementation (Python 3; standard library)

~~~python
from datetime import date, timedelta
EPOCH = date(2000, 3, 20)
CYCLE = 46751

def start(y):
    return 365*y + (31*y+40)//128  # // is FLOOR in Python

def leap(y):
    return start(y+1)-start(y) == 366

def encode(y, d):
    if type(y) is not int or type(d) is not int:
        raise ValueError("integers only")
    if not 1 <= d <= 365+int(leap(y)):
        raise ValueError("invalid date")
    return start(y)+d-1

def decode(a):
    if type(a) is not int:
        raise ValueError("integer required")
    era = a//CYCLE
    lo, hi = 128*era, 128*(era+1)
    while lo < hi:
        mid = (lo+hi+1)//2
        if start(mid) <= a: lo = mid
        else: hi = mid-1
    return lo, a-start(lo)+1

def gregorian_to_osc(g):
    return decode((g-EPOCH).days)

def osc_to_gregorian(y,d):
    return EPOCH + timedelta(days=encode(y,d))
~~~

Python datetime supports only Gregorian civil years **1..9999**, even though OSC1 integer algorithms cover all integers y, negative and positive. For astronomical or remote-time conversion beyond the datetime range, separately implement Gregorian 400-year date-to-ordinal arithmetic. Do not conflate this adapter limit with an OSC1 year limit. Require Euclidean floor division in other languages; truncation toward zero breaks negative dates. Mapping a *timestamp* to a civil date is a separate time-zone problem.

## Worked year boundaries

| Proleptic Gregorian civil date | OSC1 |
|---|---|
| 2000-03-19 | OSC1:-000001-365 |
| 2000-03-20 | OSC1:+000000-001 |
| 2001-03-20 | OSC1:+000001-001 |
| 2003-03-20 | OSC1:+000002-366 |
| 2003-03-21 | OSC1:+000003-001 |
| 2004-03-19 | OSC1:+000003-365 |
| 2004-03-20 | OSC1:+000004-001 |
| 2026-10-19 | OSC1:+000026-214 |
| 2100-03-20 | OSC1:+000100-001 |

Gregorian centuries, including 2100, do not determine OSC1 leap years. This is an explicit independent epoch/calendar, not a relabelled Gregorian ordinal calendar.

## Recurrence and display

- **Every n civil days:** add n to absolute integer A, decode the result. Leap days need no special-case logic.
- **Every year at ordinal d:** keep d and increment y; ordinal 366 is valid only in leap years. For missing anniversaries require an explicit application policy (**skip**, **use 365**, or **use next year's 001**), never silently change the occasion.
- **Original Gregorian anniversaries:** calculate the original Gregorian recurrence first, then convert anew; do not equate OSC1 anniversaries with Gregorian anniversaries.
- **Weekly schedule optional:** choose an absolute anchor A0 and schedule length w. Position is 1+((A−A0) mod w); it progresses *through* leap dates and year boundaries, never resets.
- **Optional four-period visual grouping:** ordinal 001–091, 092–182, 183–273, 274–364, with 365 (and 366 when valid) displayed after the regular four-period grid. This is **not** a normative second calendar or a rule requiring a seven-day week.
- **Year boundary:** the civil day after d=length(y) is (y+1,001); for negative years the same formula applies.

## Proof and test contract

B(y) increases by either 365 or 366. Its contiguous half-open intervals [B(y),B(y+1)) cover each integer absolute day exactly once. Thus A↔(y,d) is a bijection. Since floor(x+31)=floor(x)+31, the 128-year cycle identity is exact. These are *proofs*, not empirical claims.

Validation must cover all dates in multiple full 128-year cycles, negative years, all leap boundaries, 2100/other Gregorian exceptions, date−1/date+1, every ordinal of a full cycle, exact reverse conversion and invalid dates. The accompanying standard-library test script also compares a Gregorian 1999–2400 day range against independent Gregorian date arithmetic, and separately enumerates bounded structural layouts. **Tests performed in Chat's container are not GMKtec-local tests, GitHub CI checks or astronomical ephemeris verification.**
