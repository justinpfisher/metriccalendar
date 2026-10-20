# 2 — Decimal alternatives, Pareto trade-offs and adversarial review

The test is **not** “which calendar happens to have a ten somewhere”. A base-ten constraint should structurally divide the annual unit into powers-of-ten groupings or mathematically interpretable fractions. The day remains a whole day; this precludes an exact division of the physical year into ten identical whole-day months.

## Alternatives reconsidered with explicit constraint

| Structure | Genuine decimal feature | Ordinary-day structure | Leap-year difference | Why not first |
|---|---|---|---|---|
| **DC10 (preferred)** | 10 near-equal decimal annual periods; optional 10%, 1%, 0.1% progress | **5×36+5×37**; five equal 73-day pairs | A central 36-day period becomes 37; six37/four36; no month >37 | Smallest compelling decimal annual hierarchy, all dates ordinary, continuous weekday overlays possible |
| Original Metric Calendar | 10 months, 360 six-week regular core | 10×(6×6)+5 | One last month reaches 38 (6 off-week days in total) | Makes nondecimal six-day week mandatory, puts five common dates outside that week and adds a bigger leap month |
| 10 alternating 37/36 months; leap in final short month | Ten periods equal-as-possible | 37,36 repeating | Final 36→37 | Simpler end-of-year intercalation, but worst leap boundary rounding error **0.8 day**, versus DC10's **0.4** |
| Ten equal conceptual deciyears | Exactly 1/10 of an ideal 365.2422-day year | Each ~36.52422 physical days | No discrete scheme specified | Calendar dates would require fractional days, contrary to invariant day length |
| 100 near-equal blocks | 10×10, strong decimal hierarchy | 65×4 and 35×3 days | 66×4 and 34×3 days | 100 variable short blocks, much more obligatory calendrical metadata |
| 1000 equal fraction-year marks | 10³ | ~0.365 physical day per mark | Fractional | Cannot have one non-empty whole-day interval per thousandth |
| Thirty-six ten-day blocks | 10-day cycles | 36×10+5 | +6 off-core days | The 36 block count is not a decimal power, and excluding five/six days is an avoidable convention |
| 12×30 (French Republican type) | Ten-day subdivisions of a 30-day month, but **twelve months** | 12×30+5 | +6 off-core days | Strong 10-day “decades” but 12 months, and five/six out-of-grid days; violates ten-part-year preference |
| Five 73-day periods | Decimal notation only, five divisions not ten | 5×73 | One additional day | All periods equal but no first-order decimal annual division |
| Four 91-day periods | Decimal notation only, four divisions not ten | 4×91+1 | +2 off-week days | Strong structured alternative from v1 but **not base-ten** at the annual level |
| Standalone year / ordinal (OSC1 v1) | Three-digit base-ten ordinal is merely notation | 365 numbered days | +1 ordinal day | Minimal, but does **not implement a required decimal annual subdivision** |
| A continuous ten-day week with ten variable months | True ten-day counting but independent of months | 365 days | 366 days | Legitimate optional schedule: month and week never nest evenly; if uninterrupted, weekday position shifts at year starts |

Historical context: the [French Republican calendar](https://ccat.sas.upenn.edu/~haroldfs/540/handouts/french/frcalendar.html) had twelve 30-day months, ten-day *décades*, and five or six festival days. It demonstrates a structurally decimal week was attempted; it does not provide clinical evidence that a 10-day work/rest cycle is optimal.

## Does a year need a week?

**No, not for defining a date.** A week is a recurring grouping, with its size and associated employment/religious practice set independently. For DC10, any optional cycle may be uninterrupted:

    weekday_position = 1 + ((absolute_day − schedule_anchor) mod w).

A six-day, seven-day or ten-day w works equally as a calendar overlay; year-end and leap days carry positions like other days. A ten-day week is *base-ten in its length*, but the solar year is **365≡5 (mod10)** and 366≡6. Therefore an uninterrupted ten-day cycle cannot start in the same position each new year; demanding both a ten-day uninterrupted week and invariant year-start weekday columns is impossible. This is mathematical, not an argument for a particular labour policy.

The old six-day 4 Focus / 2 Rest schedule remains a legitimate **optional** experiment, but has no special standing in the new mathematical framework. A repeated four-on/two-off **continuous** six-day rota generates more workdays annually than the old 240 labelled Focus Days, since old Bonus Rest Days interrupt the cycle. Careful actual-hours calculations are in [v1 productivity evaluation](../v1-2026-10-20/06-productivity-and-implementation.md).

## What is mathematically proved versus chosen?

**Proven:** 365 mod 10=5 makes equal whole-day decimonths impossible; 36/37 are the only possible lengths at one-day maximum spread; 160 balanced pair/insertion designs are enumerated; exactly two minimise common/leap maximum deciyear-boundary error; the preferred leap year has exact 183/183 half-years and mirrored month lengths; all dates remain in an ordinary month.

**Assumed constraint:** exactly ten annual periods are mandatory; the tenfold division is central to the project rather than just a display option; five common-year equal pairs are valuable for structural symmetry; no common month-day should disappear in leap years.

**Judgement:** choosing the A mirror because the extra day occurs at the midpoint, not the B mirror because its placement alters the start positions of fewer later months. Both are equally optimal on the stated minimax criterion. The selection is not an objective theorem about user preferences.

**Separate open astronomy:** the pre-existing research leap rule 31/128 and equinox epoch might or might not be the best horizon-specific astronomical alignment. Requiring “decimal” does **not** logically force a 100-year or 1000-year leap cycle: doing so merely for appearance could worsen average accuracy or event-phase variance. The calendar division and astronomic approximation should be evaluated independently.

## The strongest criticism of DC10

Ten periods of 36/37 days are *not exact metric deciyears*, just best integer-day approximations. The five 73-day pairs incorporate the prime 73 and cannot nest a week of 5/6/7/10 days evenly. If one makes strict uniform 10-day weeks more important than ten near-equal periods, **36×10+5+L** becomes a strong alternative but requires surplus conventions. Similarly, real long-term year-start alignment, programme adoption and whether 36-day planning periods are useful remain unknown.

The proposed correction is not to add exceptions: keep **date identity = continuous integer day**, with ten derivable civil groupings, leave 10-day groupings optional and rigorously label fractional-year progress. This makes the decimal design stronger without pretending solar mechanics obey powers of ten.
