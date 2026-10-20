# 1 — Executive conclusion

**Date:** 20 October 2026. **Status:** independent research recommendation, NOT an adopted production specification. The current website and converter remain unchanged and authoritative for the current product.

## Decision

**Recommend the Ordinal Solar Calendar (OSC1)** as the most mathematically parsimonious *foundational* calendar: one solar-year identifier, one ordinal day from **001–365**, and an ordinal **366** in leap years. There is no obligatory month, week, excluded weekday, work/rest designation or change to the physical day. Every elapsed civil day has one date. Weeks and periods become optional views or schedules rather than components of date identity.

This is a substantive recommendation under an explicit, ordered mathematical priority: (1) complete and reversible chronology, (2) the least necessary units, divisions and special-case rules, (3) reasonable seasonal alignment with transparent approximation, (4) fast integer algorithms, (5) optional divisibility for presentation. No workplace or cultural advantage was used to select the mathematical structure.

There is **no objective mathematical scalar called elegance**. If one instead requires a fixed, nested week-and-period display, the recommendation changes. The choice is thus defensible but conditional on the first-principles interpretation that *unnecessary civil divisions should not be mandatory*.

## Defining equations

Use the 2000 March equinox as an astronomical reference: **OSC1:+000000-001 = Gregorian 2000-03-20** (00:00 UTC civil date containing the equinox at 07:35 UTC). For every signed integer year y:

- **B(y) = 365y + floor((31y + 40)/128)** elapsed civil days since the epoch at start of year y.
- **L(y) = B(y+1) − B(y) − 365**, which is 0 or 1.
- **Year length = 365 + L(y)**; an ordinal d is valid iff 1 ≤ d ≤ 365+L(y).
- **Absolute civil day A = B(y)+d−1**, and its inverse is the unique y with B(y) ≤ A < B(y+1).
- **Average length = 365+31/128 = 365.2421875 days**.

Against the fixed *nominal* reference of 365.2422 days, the signed average difference is **−0.0000125 day per year**. The physical tropical year changes, and a specific equinox-to-equinox interval differs from the mean tropical year. Neither the mean approximation nor the phase constant 40 guarantees perpetual observed equinox alignment.

The phase-balanced 128-year formula spaces leaps four or five years apart. It is preferable to naively omitting every 128th leap in an every-four-year scheme, which introduces a single eight-year gap. The numerator, denominator, epoch and phase are **design decisions**, not constants derived uniquely from nature.

## Why this challenges the existing Metric Calendar

Current production: **10×6×6+5+L = 365+L**, i.e., ten months of six six-day weeks, five extra off-week days, Gregorian leap rule and January 1 alignment. Month names, weekday names, Focus/Rest labels and the arrangement in five 73-day pairs are understandable design choices but not consequences of astronomy.

360 has **24 divisors**, making it attractive for nested grids, but requires **five** common-year off-week days. 364 has **12 divisors** and needs just **one**. The exact common year **365 = 5×73** could be divided into 73 five-day cycles with **no** ordinary-year extra day, but 73 is prime and offers poor further nesting. Five identical current 73-day **pairs** are not ten identical months. Their equality does not increase six-day week divisibility.

## Strongest structured mathematical alternative

If named period-and-week nesting is compulsory, the preferred *structured* alternative is **4×13×7+1+L = 365+L**: four equal 91-day periods, each with 13 seven-day weeks, one common year-end extra day, plus another on leap years. It dominates the current model for both equal period lengths and number of non-core days (1 versus 5). **13×28+1+L** has identical 364-day mathematics, but more periods and shorter four-week months. Neither is inherently superior without an additional rule for what a "period" should do.

If *minimum surplus* alone takes priority, **5×73+L** wins against 364+1. If *maximum divisor count* takes priority, 360 is notable. That Pareto tension is why OSC1 does not mandate any of them.

## Stage Two, separated from the mathematics

An ordinal year has **no intrinsic employment rhythm**. Evidence for income-preserving reduced-hours experiments is promising for well-being, but does not validate four workdays per *six* days. The human-facing recommendation is an **optional, flexible reduced-hours scheduling layer** (including, where appropriate, four eight-hour days out of seven), not a mandatory new week. Different service sectors require different rosters.

Illustrative work exposure, before statutory holidays or annual leave: 5-on/2-off seven-day cycle **260–262 days**, 2,080–2,096 hours at eight hours/day; 4-on/3-off seven-day cycle **208–210 days**, 1,664–1,680 hours; 4-on/2-off six-day cycle **243–244 days**, 1,944–1,952 hours; existing Metric labels **240 Focus Days**, 1,920 eight-hour equivalents. Annual phase determines the range in continuous cycles.

Actual 4×8 hours in seven rather than 5×8 hours in seven reduces scheduled time by 20%; unchanged total output would require 25% greater output/hour, not a demonstrated calendar effect. Four-on/two-off in six averages 37⅓ hours per seven elapsed days, not 32.

## Implementation decision

**Research publication only.** Do not reconfigure the public converter, site rule text, calendar naming or existing URLs. Keep the research candidate versioned and visually separate from the adopted model. A future opt-in parallel prototype would be the appropriate next decision, after astronomical event-table validation and independent review.

**Proven:** factorisation, numerical mean, unique date mapping and finite-cycle mathematics. **Judgement:** the priority ordering, optional units, epoch and phase. **Unknown:** enduring astronomical alignment, calendar-specific human benefit, transition cost and global desirability. See documents 2–8 and the reproducible validation script.
