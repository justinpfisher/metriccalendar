# 3 — Research specification of DC10: the proposed base-ten civil calendar

**Provisional / research only. Not the current canonical Metric Calendar.** The current live converter, names, Gregorian-aligned year numbers and leap algorithm stay untouched unless a later deliberate decision authorises a versioned migration.

## Mathematical units

- **Absolute civil-day A:** continuous integer count of whole UTC-labelled civil days from the chosen epoch (not an instant of UTC time-of-day).
- **Year y:** signed integer (including 0, negatives). This is not the Gregorian year number.
- **Decimal period m:** mandatory identifier 01..10. The ten periods are the equal-as-possible integer-day approximation to tenths of the civil year.
- **Within-period day d:** integer 01..36 or 01..37 as validated for year/m.
- **Week:** none is mandatory; any ongoing w-day cycle is a **separate overlay**, not part of date identity. No day sits outside a period, year or continuous absolute-day sequence.

## Astronomical year definition (inherited, not re-optimised here)

Epoch: **year 0, period 1, day 1 = Gregorian 2000-03-20**, the UTC date of the March equinox that year, with UTC civil midnight chosen for date labelling. The proposed year starts at:

    B(y) = 365*y + floor((31*y+40)/128)
    L(y) = B(y+1)-B(y)-365               # 0 or 1
    N(y) = 365+L(y)

There are exactly **31 leap years per 128-year cycle**, 46,751 days per cycle, and 4/5-year gaps between leap years. **This leap selection is *provisional*:** the mean tropical year is approximately 365.2422 days [USNO](https://aa.usno.navy.mil/faq/leap_years), but no fixed formula is permanently exact for actual equinoxes. The base-ten annual grouping **does not demand** a decimal leap-period algorithm.

## Exact whole-day period sizes

For y where L=0:

    M = [37,36,37,36,36,37,36,37,36,37]

If L=1, change **only M[5] from 36 to 37**, using 1-based month indexing:

    M = [37,36,37,36,37,37,36,37,36,37]

Cumulative boundaries at the *end* of each period (ordinal days):

| Period | Common end | Leap end |
|---|---:|---:|
| 01 | 037 | 037 |
| 02 | 073 | 073 |
| 03 | 110 | 110 |
| 04 | 146 | 146 |
| 05 | 182 | 183 |
| 06 | 219 | 220 |
| 07 | 255 | 256 |
| 08 | 292 | 293 |
| 09 | 328 | 329 |
| 10 | 365 | 366 |

This produces the theoretical minimum maximum deviations from equally spaced decimal boundaries: common **0.5 day**; leap **0.4 day**. The leap date is **m05-d37**, ordinal 183, and is a valid ordinary day *within* the month. It does not have to be a rest day or stop a weekly cycle. The last day of each year is m10-d37 in both common and leap years; its *ordinal* is 365/366 respectively.

## Date notation and versioning

**DC10:+000026-06-32** is the proposed civil date for proleptic Gregorian **2026-10-19**, under the provisional 2000-03-20 epoch/31-in-128-year leap rule. **DC10:+000000-01-01** is the epoch. `DC10:` is a required versioned namespace; signed year contains at least six decimal digits (leading zeroes only to six), month/day always two digits, and negative year zero is prohibited. A strict parser must validate actual day ranges and round-trip to the canonical string.

This namespace distinguishes the proposal from legacy unprefixed Metric `YYYY-MM-DD`, the project's Gregorian `gYYYY-MM-DD`, ISO-style dates and OSC1 ordinal dates. Numeric IDs, not English month names, determine dates. Historical ten names may be considered as display labels only, after separately deciding whether their symbolic meaning works with an equinox year boundary.

## Reference conversion

Define common/leap array lengths, and:

    to_absolute(y,m,d) =
        B(y) + sum(monthLengths(y)[0:m-1]) + (d-1)

Reject invalid y, m, d. Reverse: given integer absolute A, find unique year y for which B(y)≤A<B(y+1), set `within=A−B(y)+1`, and successively subtract the ten positive month lengths until `within` fits. It is then within-month day d. B is strictly increasing by 365 or 366 and covers every civil-day integer; conversion is therefore bijective. Python reference implementation with Gregorian 1..9999 date adapter, signed-year floor arithmetic and strict canonical parser is in [validation/verify.py](validation/verify.py).

## Recurrence and decimal measurement

- Same **decimal period/day** next year: retain m,d if legal; the **only** date not present in ordinary years is m05-d37, so it needs an explicit recurrence policy (skip, move to 05-36, or move to 06-01). Every other date has stable identifiers from year to year.
- Fixed n-day interval: use `A+n` rather than assuming a period has constant duration.
- Continuous independent week: choose an absolute anchor A0; compute `1+((A−A0) mod w)` for any integer w≥2, including ten.
- Original Gregorian anniversary: preserve its Gregorian recurrence, then convert every occurrence into DC10; do not transfer the anniversary by blindly holding the DC10 month/day.
- Decimal progress in a *civil* year: at the beginning of ordinal day k, `100*(k−1)/N` percent has elapsed; `1000*(k−1)/N` per-mille progress. This is a **fractional proportion**, not a claim about exact solar ecliptic longitude or physical equinox passage. Optional `centiyear` whole-day presentation requires 100 variable 3/4-day periods; do not make it compulsory.
- Time zones/instants: an application should separately specify whether the input is a UTC date, a local civil date or an instant. Converting a local date label to DC10 is *date arithmetic*, not a UTC timestamp transformation.

## Verification requirements and established results

`python validation/verify.py` verifies all dates in four complete 128-year cycles (year −256 to +255), all Gregorian dates 1999–2400 through independent Python Gregorian date arithmetic, round trips, invalid formats and dates, year boundaries, 160 structural candidates, minimax errors, the mirrored leap year, decimal 100-block counts and continuity for optional 5/6/7/10 cycles.

**522,484 counted checks passed in Chat's container.** The tests are not evidence of executing on the owner's GMKtec, astrophysical validation beyond the earlier v1 phase table, external peer review, or any adoption. Before any production switch, validate against ephemerides over a declared horizon and make an explicit owner design decision; preserve the functioning current converter.
