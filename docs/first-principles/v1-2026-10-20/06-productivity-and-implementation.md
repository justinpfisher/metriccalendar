# 6 — Productivity, annual hours and practical implementation

**Productivity does not determine the mathematical winner.** This document evaluates possible *human schedules* after OSC1 was selected, not consequences inherent in a date formula.

## Actual workdays in complete civil years

For a continuous cycle of w days with a work block of k days, the workday count over N consecutive civil days depends on the starting phase. Exhaustively test all phase offsets 0..w−1. The table assumes **eight paid hours per workday**, no public holidays, vacation or leave, and no annual "reset" of a person's schedule. The Gregorian baseline range depends on which weekday the year starts.

| Continuous roster | Common year workdays | Leap year workdays | Common year at 8h/day |
|---|---:|---:|---:|
| 5 work / 2 rest per 7 | 260–261 | 260–262 | 2,080–2,088 hours |
| 4 work / 3 rest per 7 | 208–209 | 208–210 | 1,664–1,672 hours |
| 4 work / 2 rest per 6 | 243–244 | **244** | 1,944–1,952 hours |
| 3 work / 2 rest per 5 | **219** | 219–220 | 1,752 hours |
| 4 work / 1 rest per 5 | **292** | 292–293 | 2,336 hours |
| Current Metric calendar labels (not an ordinary continuous work rota) | **240** Focus | **240** Focus | **1,920** eight-hour equivalents |

**Important distinction:** the production Metric Calendar gets 240 Focus Days by defining five Bonus Rest Days and any Leap Day **outside** its six-day weekly cycle, with six-day weeks resetting by month. A *continuous* four-on/two-off six-day schedule instead has 243–244 ordinary-year working days. The current calendar's labelled rest days are not guaranteed actual paid leave and must not be conflated with a labour standard.

Annual equivalences for ordinary fixed 52-week illustrative baselines: **5×8×52 = 2,080h**; **4×8×52 = 1,664h**; 4×8 per 6 elapsed days averaged over seven = **37⅓ h/week**, not 32h/week. The tables include the additional calendar day(s) beyond 52 full seven-day weeks, where relevant.

## Exact productivity implications, not predictions

Let Q be a fixed quantity of annual useful output, H scheduled paid hours, and q=Q/H productivity per hour. Holding Q fixed while reducing H requires **q_new/q_old = H_old/H_new**.

Using 2,080h as a simple common benchmark:
- Four eight-hour days per seven (1,664h): **20% fewer hours**; fixed Q requires **25% greater output/hour**.
- Four eight-hour days per six (~1,944h in a 365-day year): ~**6.54% fewer hours**, so fixed Q requires ~**7.00%** output/hour improvement. The 1,952h phase requires ~6.56%.
- Current 240 eight-hour Focus labels (1,920h): **7.69% fewer hours**, so fixed Q requires **8.33%** output/hour improvement.
- Three eight-hour days per five (1,752h): ~15.77% fewer hours and fixed Q needs ~18.72% more output/hour.
- Four nine-hour days per seven (36h/week versus 40h/week) is a **10%** hours reduction, needing **11.11%** output/hour improvement at fixed Q; this differs from four ten-hour shifts (40h/week, *no* reduction).

These are ratios, not forecast productivity gains, wage results or salary entitlements. If fewer hours produce lower total Q, q may nevertheless rise. Error-adjusted quality, time-to-delivery, queue lengths and capital inputs also matter. The OECD cautions that GDP per hour worked depends on capital and organisational factors, not just individual effort. [OECD productivity definition](https://www.oecd.org/en/data/indicators/labour-productivity-and-utilisation.html).

## What empirical studies actually show

The 2025 141-organisation, 2,896-worker *Nature Human Behaviour* intervention found better reported well-being after income-preserving reduced-hours trials and organisational redesign; **it did not randomise humanity across alternative calendars or prove equal net output for every sector**. [Fan et al.](https://pubmed.ncbi.nlm.nih.gov/40691306/).

The Cambridge UK six-month pilot had 61 self-selecting organisations, with survey outcomes and a smaller company-revenue sample; changes in sick leave and attrition are relevant, but revenue trends cannot be generalised to every workplace. [Cambridge](https://www.cam.ac.uk/stories/fourdayweek). Iceland's public-sector studies found maintained/improved service in most participating settings after changing work practices, but are not directly transferable to all manufacturing, education or emergency services. [Alda](https://en.alda.is/2021/07/04/going-public-icelands-journey-to-a-shorter-working-week/).

A systematic review of compressed schedules finds mixed occupational health and performance outcomes, including concerns about prolonged shifts. Working fewer **days** with the same **hours** is not the same as shorter working time. [Review](https://pmc.ncbi.nlm.nih.gov/articles/PMC12484334/). WHO/ILO identify higher health risks at 55+ hours/week; reducing hours may improve health, but no schedule should be claimed universally healthy without testing. [WHO/ILO](https://www.who.int/news-room/questions-and-answers/item/global-regional-and-national-burdens-of-ischemic-heart-disease-and-stroke-attributable-to-exposure-to-long-working-hours-for-194-countries-2000-2016).

## Organisation-dependent constraints

- **Knowledge work:** redesign meetings, attention fragmentation, documentation and hand-offs. Quality/output might be maintained with shorter time but requires measured evidence.
- **Education:** student instructional contact, timetable, learner support, student employment, laboratory access and parental coverage are constraints; simply shortening employee days does not preserve delivery obligations.
- **Manufacturing/logistics:** physical throughput and machine uptime may depend on staffed hours. Cross-training or shifts can preserve capacity but raise cost.
- **Health, emergency and customer-facing services:** coverage must be modelled for every elapsed hour, with safe handovers and fatigue limits. Assuming identical throughput from absent staff is not defensible.
- **Hourly and part-time employment:** equivalent income requires explicit pay/contract treatment; a new calendar alone cannot protect wages or overtime.
- **Families, multilingual and religious communities:** synchronised rest may matter more than perfect mathematical division; do not remove established observance options.

A pure illustrative continuous **168 staffed service-hours per week** with one full-time employee providing 40 paid coverage hours requires 168/40=**4.2 full-time equivalents** before leave, overlaps and skill constraints. At 32 paid hours/week it requires 168/32=**5.25**, **25% more FTE** at unchanged hourly staffing productivity. At 37⅓ hours/week it needs ~**4.5 FTE**, ~7.14% more. Real services need more and different staffing due to breaks, multiple staff/shift, absence and coverage patterns; this is only the mathematical floor.

## Best practical path (must not drive Stage One)

1. Preserve current Gregorian contracts and system-of-record dates.
2. Introduce an **optional OSC1 ordinal overlay** behind explicit calendar labels, with error-safe conversion and user research before public promotion.
3. Test date comprehension and the additional dual-calendar burden; do not simultaneously change staffing.
4. Separately, pilot income-preserving reduced-hours work where feasible with pre-registered service coverage, quality, financial and well-being outcomes.
5. For civil reform at scale, review international standards (ISO 8601, locale/CLDR, finance, tax, payroll, legal dates, historical data), cultural observances, software ecosystems, accessibility, calendar interoperability and the cost of teaching a new year numbering system.

**Ideal mathematical calendar:** OSC1. **Preferred human rhythm:** optional context-specific reduced-hours experiment, not a mandated new week. **Adoption:** cautious, labelled interoperability first. Most putative well-being gains may be available through labour reform without changing the Gregorian calendar at all.
