# 2 — Six-day-week rationale, comparisons and human-rhythm limits

**This is an owner-selected design constraint, not a newly discovered biological optimum.** Mathematics establishes what happens once six-day weeks and four Focus/two Rest labels are chosen; it cannot prove that exactly six days is the ideal human rest rhythm.

## Mathematical interaction with the ten-period decimal year

The optimally rounded decimal periods have 36 or 37 whole days. With a **six-day week**, every period contains exactly **six** complete weeks: `36=6×6`. The tenth-of-year structure thus has:

    10 months × 6 weeks × 6 days = 360 ordinary in-week days
    + 5 Bonus Rest Days = 365 (ordinary year)
    + 1 centrally placed Leap Rest Day = 366 (leap year)

The 360-day core is highly divisible (`360=2³×3²×5`). It accommodates ten equal 36-day grids while all 365/366 physical days remain inside the ten months. The five (or six) surplus whole days are not missing: they are all designated **additional Rest Days** in months that contain Day 37.

This is the principal reason the six-day week is particularly compatible with this *chosen* ten-month design. It is **not** itself base ten, and it does not minimise the number of days outside a continuous week. That trade-off is explicit and acceptable under the owner's preference.

## Why the week restarts at each month

A 37-day month has six complete six-day weeks (36 dates), followed by a Bonus Rest Day (37). Because the 37th day has **no regular weekday position**, the next month can begin Week 1 / Begin exactly as every other month does. A 36-day month ends directly after Week 6 / Renew. The special day interrupts the sequence in long months; a globally continuous cycle using absolute-day-modulo-6 would instead shift next-month weekday positions, undoing the identical six-week monthly grid.

The word **week** therefore refers to a *month-local* calendar week, and not a fixed interval that remains uninterrupted across all physical dates. A fixed interval of 6 elapsed days is a different recurrence concept; software must not substitute one for the other.

**Long month (37 days):** Days 31–34 Focus; 35 and 36 Rest; Day 37 Bonus Rest; next month Day 1 Focus. **Short month (36 days):** Days 35 and 36 Rest, followed immediately by next month's Focus Day 1. These are exact sequences, not promises of paid weekends or holidays.

## v2 vs v3 vs deployed v1

| Choice | Deployed v1 calendar | Research v2 | Selected research v3 |
|---|---|---|---|
| Ten months | Yes | Yes | **Yes** |
| Month length sequence | 36,37 alternating; leap month10=38 | Optimally spaced 36/37; central month5 leap | **Same optimal 36/37 layout as v2** |
| Six-day weeks | Yes, month-local | Not compulsory; optional continuous overlays | **Yes, month-local** |
| Focus/Rest | 4 then 2 | None prescribed | **4 then 2** |
| Extra Rest Days | Five Bonus + one terminal Leap | No required work/rest label | **Five or six Bonus Rest Days, at each 37th month day** |
| Leap-day location | End of last month (10–38) | Midpoint (05–37) | **Midpoint (05–37), itself a Bonus/Leap Rest Day** |
| Rest days | 125 common / 126 leap | Not prescribed | **125 common / 126 leap** |
| Year rule/epoch | Gregorian / January 1 | Provisional 31/128 / March 2000 | **Same provisional 31/128 / March 2000 as v2** |
| Live status | Implemented, public | Historical research | **Latest research, not yet adopted into public converter** |

The unchanged annual total of 240 Focus Days is **not evidence** that v3 and production v1 have interchangeable dates. Their month positions, leap placement and proposed year boundaries differ materially.

## Is four-on/two-off good for health and output?

A 4 Focus / 2 Regular Rest cycle is a **calendar classification**. If an organisation treats every Focus Day as a paid eight-hour workday, it would schedule `240×8=1,920` annual hours before public holidays, vacation, sickness and coverage adjustments, whereas a continuous 4-on/2-off rotation without Bonus Rest interruptions normally yields 243–244 workdays in 365 days. The five or six additional Rest Days reduce work exposure relative to that *hypothetical* continuous rota.

Four-on/two-off under a six-day work cycle yields **two consecutive normal Rest Days**, and every long month grants a third consecutive designated rest day. This looks orderly but has **not been clinically shown to maximise happiness** or maintain output across occupations. The shorter-working-week trials reviewed in [v1 evidence](../v1-2026-10-20/05-human-rhythm-and-wellbeing.md) chiefly tested reduced working hours in conventional seven-day contexts. They cannot validate this six-day system directly.

A calendar label does not automatically create employer leave, compensation or service availability. Treat actual employment scheduling and pay as a separate, optional implementation policy even when Focus/Rest is a required **display label** of the adopted *candidate* calendar. An eight-hour Focus Day is only an illustration, not a mandatory day length or a change to clocks.

## Consistency checks and exceptional cases

- All Day 37 dates must be classified as **rest**, and must not also receive a normal six-day weekday.
- **Month 05 Day 37 in leap years** is both the leap-added date and the sixth Bonus Rest Day, **counted once**. Month 10 still ends at Day 37, not Day 38.
- All ten months contain Week 1–6, weekday positions 1–6; no partial week is counted as a seventh week.
- Each long month has a three-day terminal rest block (Days 35, 36, 37).
- Every short month ends with two Regular Rest Days (35, 36).
- After a bonus day, next-month Week 1 begins on the immediately following civil date; absolute-day arithmetic remains continuous.
- Leap-year anniversary Month 05 Day 37 is absent in ordinary years and requires a stated recurrence policy.
- This research v3 leaves the existing public calendar implementation unchanged.

**Recommendation:** Adopt this explicit **month-local 6-day week** as the current selected research design, with four Focus and two Rest weekdays and an extra Rest Day for any 37-day month; preserve the v1 production converter until migration decisions about astronomy, epoch, naming and date namespaces are finalised.
