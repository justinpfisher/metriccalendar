# 1 — Deriving the decimal calendar, rather than adding a decimal label

## The amended mathematical brief

The earlier objective **minimised mandatory units** and produced an ordinal-only calendar. This logically wins that limited criterion but does not embody metric structure. The new *mathematical* constraint, before any human considerations, requires a **genuine base-ten year hierarchy**, not merely writing numbers in base ten, which nearly all current civil systems already do.

The least nontrivial power-of-ten subdivision is **ten**. Treat a solar civil year as the reference unit, and divide it into ten numbered intervals as close as possible to **10% of a year** while retaining whole physical days. Let those intervals be neutral **decimal periods**, with “month” a possible display label. Every date also retains a continuous ordinal and an absolute day number. No fixed week is a compulsory part of the civil date.

This distinction matters: [NIST describes SI multiples and submultiples as powers of ten](https://www.nist.gov/pml/owm/metric-si-prefixes), but Earth's day count is not itself a multiple of ten. Calling ten unequal whole-day periods *exact deciyears* would be incorrect. Their boundaries are the **nearest possible discrete approximations** to exact tenths. Hundredths and thousandths can be expressed as **fractional civil-year progress**, not automatically as equal integer-day weeks.

## The mathematical lower bounds

An ordinary year is 365 whole days. With exactly ten periods and no days outside periods, the pigeonhole principle shows that the smallest achievable length range is **one day**, by distributing the days as:
- **5 × 36 + 5 × 37 = 365.**

For a 366-day leap year, the same optimal range requires:
- **4 × 36 + 6 × 37 = 366.**

An **entirely uniform ten-month 365-day year is impossible**, as 365 is not divisible by ten. Neither moving surplus days outside months nor inventing a clock system eliminates the astronomical mismatch; it merely changes which rule is made exceptional.

Now further require (A) five equal common-year *pairs* of two months (each exactly 73 days), (B) complete month-day identity preservation during leap years, so no common-year month can shrink, and (C) no month ever exceeds 37 days. The constraints force every common pair to be **(37,36) or (36,37)** and force the leap addition to enlarge **exactly one of the five 36-day months**. There are **2^5=32** common pair arrangements and **32×5=160** valid common/leap paired designs. This is a complete finite enumeration **within explicitly stated conditions**, not a proof that every imaginable calendar was enumerated.

## Rigorous decimal-boundary error minimisation

For any ten consecutive period lengths p1...p10 totalling N, define cumulative boundary Bk=sum(p1...pk), for k=0..10. The ideal exact decimal boundary is **kN/10**. Measure the integer-rounding error:

    E(N,p)=max over k=0..10 |Bk - kN/10|.

For **N=365**, the ideal at odd k ends with 0.5. Therefore *any* integer boundary scheme must have E≥**0.5 day**. For **N=366**, at k=1 the ideal is 36.6 days, so E≥**0.4 day**. These are rigorous lower bounds independent of candidate choice.

The exhaustive 160-case search finds **exactly two designs** attaining both theoretical minima while satisfying all of (A)–(C):

| Case | Ordinary period lengths | Leap insertion | Leap period lengths |
|---|---|---|---|
| **A (selected)** | **37,36,37,36,36,37,36,37,36,37** | **Month 5: 36→37** | **37,36,37,36,37,37,36,37,36,37** |
| B (mirror case) | 37,36,37,36,37,36,36,37,36,37 | Month 6: 36→37 | Same leap sequence |

Both reach **E_common=0.5** and **E_leap=0.4**. Common pair totals are exactly **73,73,73,73,73**. Leap pair totals are **73,73,74,73,73**; the centre pair receives the extra day. There is **no fabricated numerical scoring scale**; the underlying mathematical objective, an absolute maximum boundary error, is exact, reproducible and explained.

**Tie-breaker:** choose **A** because the *additional date itself* is at the geometric year centre: in leap years Month 5 Day 37 is **ordinal 183**, immediately followed by Month 6 Day 1 as ordinal 184. The five periods before and after the midpoint each span exactly **183 days**. Case B has an equally valid 183/183 division but places the extra date at **Month 6 Day 37, ordinal 220**. Positioning the extra day at the midpoint is a transparent mathematical symmetry tie-breaker, not a claim that people ought to take it as a holiday.

This is **not** the same as merely changing the last month in the existing model to 38 days, or appending six "outside-month" dates to a 360-day grid. Nor is it the original strict 36,37 alternation. The leap-year ten-month pattern is **palindromic**: reading the 10 lengths backward produces the same sequence. The ordinary-year pattern differs at the two central months only.

## Decimal scale and its limits

The year contains **10 conceptual tenths** of a civil year. Each spans 36 or 37 whole days, a necessary discrete approximation to 36.5 or 36.6. A hundredth of the year spans nominally 3.65 or 3.66 days; to make **100 integer-day intervals**, 35 would have 3 days and 65 would have 4 in a common year (34 with 3 and 66 with 4 in a leap year). This is a valid optional decimal view, but many unequal very-short periods increase complexity without aiding date identity. A thousandth is ~0.365 day; exact integer-day blocks for all 1000 cannot exist without zero-day or sub-day units, which the brief forbids.

**Thus base ten is applied where useful and rigorous: one obligatory 10-part annual division plus a decimal percentage/progress representation.** A specific numeric week length or rest pattern cannot be deduced from ten-month arithmetic.

## What remains conventional

The decimal constraint does not select an equinox over a solstice as the year start; it does not uniquely choose a leap-cycle algorithm or an epoch. DC10 inherits the **provisional** OSC1 31/128 balanced leap rule and 2000-03-20 UTC reference as independent astronomical parameters to avoid conflating month regularity with leap-year accuracy. The long-horizon comparison with actual equinox instants still requires dedicated ephemeris validation.
