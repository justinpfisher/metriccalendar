# Metric Calendar — ten-month / six-day-week research v3

**Recorded owner decision: 21 October 2026.** The research model now **requires six-day weeks with four Focus Days and two Rest Days**, and **each 37-day month has an additional Rest Day** after its six complete weeks. This supersedes v2's “no compulsory week” *design proposal*, without negating v2's mathematical derivation of the most balanced ten-month pattern.

**This is the current selected research-design framework, not a deployed converter specification.** The [original website](https://metriccalendar.org/) already uses six-day, four-Focus/two-Rest weeks but retains its own older month order, Gregorian January 1 year boundary and last-month 38-day leap treatment. Do not treat the two date systems as interchangeable.

## The revised framework, at a glance

| Rule | Ordinary year | Leap year |
|---|---|---|
| Month lengths, 01–10 | `37,36,37,36,36,37,36,37,36,37` | `37,36,37,36,37,37,36,37,36,37` |
| Months with Day 37 | 01, 03, 06, 08, 10 | 01, 03, **05**, 06, 08, 10 |
| Complete regular weeks | 10 × 6 = **60** | **60** |
| Focus Days | 60 × 4 = **240** | **240** |
| Regular Rest Days | 60 × 2 = **120** | **120** |
| Extra Rest Days in 37-day months | **5** | **6** |
| Total designated Rest Days | **125** | **126** |
| Total civil days | **365** | **366** |

Every month has **six consecutive six-day weeks**. Weekday positions 1–4 are Focus Days (Begin, Create, Connect, Share); positions 5–6 are Rest Days (Pause, Renew). When a month has Day 37, it is a **Bonus Rest Day**, assigned **no regular week number or weekday**. In leap years Month 05 Day 37 is also the **Leap Rest Day**: *the leap addition is itself a Bonus Rest Day*, not another day outside the month or a date at the end of year. Thus every 37-day month ends with **three consecutive designated Rest Days** (35–37).

**The week resets at each month.** After Month 01 Day 37, Month 02 Day 01 starts Week 1 / Begin. Six-day weeks are **not an uninterrupted global weekday cycle** because extra Rest Days are outside the week. That is a deliberate chosen trade-off for month-level identical six-week grids.

The mathematics of the ten-month structure remains [v2](../v2-base10-2026-10-20/README.md): ten nearest-integer decimal periods, exactly five 73-day pairs in ordinary years, centrally located additional leap day and 0.5/0.4-day maximum decimal-boundary errors. Those properties are compatible with **360 regular week days + 5 extra Rest Days + L**.

## Research files and validation

- [Detailed candidate rules and month/week/day classification](01-six-day-week-specification.md)
- [Mathematical trade-offs, rest pattern and work-time limits](02-rationale-and-human-rhythm.md)
- [Runnable research validation](validation/verify.py) (Python 3, standard library; imports the unchanged v2 arithmetic verifier)
- [100-year equinox phase stress test and optional decimal time](03-equinox-phase-and-decimal-time.md), with [independent finite-window regression](validation/verify_phase.py)

The mathematical six-day-week classification and transition rules were independently checked for **187,004 individual dates across 512 signed years** in Chat's container. The v3 checked-in script additionally calls the existing v2 full date-conversion/regression verifier; the exact checked-in script is required to pass the repository's isolated public GitHub CI. These tests are **not GMKtec-local execution**, nor evidence of improved health or employee output.

**Experimental public preview:** [Open the DC10 v3 side-by-side converter](https://metriccalendar.org/dc10-preview.html). This separate noindex preview uses the research namespace and provisional year-start formula; it is **not** the canonical website converter. No legacy date behaviour changes.

**New research implementation (24 October 2026):** A separate [JavaScript DC10 date engine](../../../dc10.js) with [independent Node test suite](../../../tests/dc10.test.cjs) now implements signed-year date identity, the unchanged provisional phase-40 year start, strict namespaced canonical parsing, Gregorian civil-date conversion over years 1–9999, and month-local Focus/Rest classification. The original production `calendar.js` remains unchanged; this is an implementation reference, not a live converter switch or an adopted astronomical boundary. Tests run as part of public-repository CI.

## Production and history boundaries

The user's **week/rest decision is settled for this candidate**; no routine reapproval is necessary for further research work. Astronomical epoch, phase, and any future migration of public dates remain separate unresolved design/adoption choices. The live `calendar.js` and generated site were **not modified**; existing v1 Metric dates remain valid in their current namespace. Historical [v1](../v1-2026-10-20/README.md) and [v2](../v2-base10-2026-10-20/README.md) investigations are preserved for traceability.

Owner-local GMKtec execution remains the default when accessible. Free, isolated public GitHub site CI and GitHub Pages are maintained without attaching the owner's PC to untrusted public repository jobs.
