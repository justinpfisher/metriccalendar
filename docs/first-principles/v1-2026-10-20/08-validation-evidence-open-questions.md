# 8 — Validation, evidence ledger, uncertainty and adversarial review

## What can be certified by mathematics

- **Bijective dates:** strict monotonic B(y) means [B(y),B(y+1)) intervals are disjoint and cover all integer civil days; `encode`/`decode` are inverses, including negative years and boundaries.
- **Leap integrity:** the floor difference is in {0,1}, because 31/128 lies strictly between zero and one. Exactly 31 leap years are obtained per 128-year cycle, **46,751 elapsed days**.
- **No external-day contradictions:** OSC1 has exactly ordinal 1..365 each year and ordinal 366 if leap. No date is assigned outside its year and no "weekday" needs to be invented.
- **Divisibility:** integer factorisation and divisor counts for 360..366 are exact, and proof rules out a fully regular three-tier equal p>1,q>1,w>1 hierarchy across exactly 365 common-year days.
- **Nominal mean drift:** arithmetic errors compare rational mean lengths to **365.2422** exactly as a chosen rounded rational target, not to an ephemeris or changing real tropical year.
- **Workday counts:** exact counting across all phases of repeated duty schedules; no productivity or medical effect follows from these integers.

## Reproducibility artefacts

The versioned research directory contains `validation/verify.py`, an **independent pure-Python 3 standard-library** numerical check; rerun with:

    python validation/verify.py

Run from the `docs/first-principles/v1-2026-10-20` directory. The standalone script exercises:
- complete day-to-ordinal round trips across OSC1 years −256 through +255 (four full 128-year cycles), each leap boundary and the day after it;
- a complete independent Gregorian civil-day comparison spanning **1999-01-01 through 2400-12-31** using Python `datetime.date` as a separate implementation of the Gregorian calendar;
- centurial examples, early and negative OSC1 years, invalid ordinals and phase-cycle invariants;
- 10,000 successive simulated leap decisions (2,422 leap years) and exact rational year comparisons;
- exhaustive *bounded* candidate enumeration (w=2..12, periods p=2..20, weeks q=1..100, ordinary off-core days 0..5);
- complete canonical signed date-notation parse/format round trips and rejection of negative-zero and redundant-leading-zero duplicates;
- **50 of 50 UTC March-equinox event *civil dates* match 2000–2049** using [this published table](https://www.timeanddate.com/calendar/seasons.html?n=1440&year=2000). Four dates depart from 20 March: 2003/2007 on 21 March and 2044/2048 on 19 March. This is a secondary-source 50-year check, not ephemeris, time-of-day, or millennial validation;
- all phases of continuous 5/2-over-7, 4/3-over-7, 4/2-over-6, 3/2-over-5 and 4/1-over-5 activity patterns.

**Recorded Chat-container result:** **531,297 counted assertions/check-steps passed**. 81 nested triples enumerated (69 core360, 3 core363, 9 core364). Leap cycle exactly 31/128. Physical working-day counts agree with document 6. This is **not** evidence of running on the owner's GMKtec PC, an independent ephemeris simulation, GitHub CI, Pages deployment, security review or human-subject research. The count combines step checks rather than meaning 344,234 independent research results.

Because `datetime.date` is limited to Gregorian years 1–9999, the full-integer OSC1 algorithm is more general than the Python Gregorian adapter. A separate precise proleptic Gregorian date converter would be needed for astronomical BCE dates or years greater than 9999.

## Evidence ledger and confidence

| Claim | Classification | Grounding and limitations |
|---|---|---|
| Leap 31/128 is closer *in average* to nominal 365.2422 than Gregorian 97/400 | Mathematical theorem | Exact fractions; not a prediction of actual equinox phase over 10,000 years |
| Proleptic Gregorian rule 97/400 | Primary historical/rule reference | [USNO](https://aa.usno.navy.mil/faq/leap_years) |
| March equinox 2000 UTC ~07:35 | Astronomical event table | [Timeanddate seasonal calculations](https://www.timeanddate.com/calendar/seasons.html?n=1440&year=2000); 00:00 UTC civil start is our convention |
| Earth's tropical year approximately 365.2422 days | Approximate astronomical fact | [USNO](https://aa.usno.navy.mil/faq/calendars), [NOAA](https://www.noaa.gov/jetstream/appendix/weather-glossary-y); the specific equinox year is not constant |
| 360 versus 364 versus 365 divisibility | Exact number theory | Prime factorisations and reproducible divisor check |
| Current Metric v1 structure and Gregorian epoch | Production code / documentation | [calendar.js](https://github.com/justinpfisher/metriccalendar/blob/main/calendar.js), [README.md](https://github.com/justinpfisher/metriccalendar/blob/main/README.md) at the audit SHA |
| Income-preserving shorter workweek may improve reported well-being in participating organisations | Observational/intervention evidence, with selection/confounding caveats | [Fan et al., Nature Human Behaviour 2025](https://pubmed.ncbi.nlm.nih.gov/40691306/); [Cambridge pilot](https://www.cam.ac.uk/stories/fourdayweek) |
| Very long work hours increase certain health risks | Systematic epidemiology, not an optimal-week schedule | [WHO/ILO](https://www.who.int/news-room/questions-and-answers/item/global-regional-and-national-burdens-of-ischemic-heart-disease-and-stroke-attributable-to-exposure-to-long-working-hours-for-194-countries-2000-2016) |
| Compressed schedules have varied consequences | Systematic review, heterogeneous measures | [2025 review](https://pmc.ncbi.nlm.nih.gov/articles/PMC12484334/) |
| Circaseptan biological rhythms mandate a particular civil week | **Not established** | [2016 review](https://pubmed.ncbi.nlm.nih.gov/27830946/); interpretations of endogeneity are contested |
| OSC1 increases happiness/productivity | **Not established** | No controlled experimental trial of OSC1 found in audited public project sources |

## Strongest critique of OSC1

1. **Tautological minimisation:** an ordinal date always wins if number of compulsory period types is the primary criterion. This is a legitimate mathematical minimum but not universal "best civil calendar." Many people need shorter planning chunks and may rationally prefer 4×91 or 13×28 even from scratch.
2. **Reference-phase arbitrariness:** March equinox, Gregorian 2000 reference, 00:00 UTC, signed year 0 and phase 40 are conventions. They do not emerge uniquely from number theory.
3. **Equinox drift is under-modelled:** nominal 365.2422 is near the mean tropical year, but the duration between March equinoxes varies. A 31/128 formula with +40 phase may be inferior to observed equinox starts on some horizons. A 10,000-year mean extrapolation would be false physical precision.
4. **Competing objective:** 4×91 has an actual mathematically rich human-readable hierarchy at only one off-core day, a compelling counterexample if nested periods are a non-negotiable requirement.
5. **No automatic humane outcome:** the selected mathematics does not create recovery days. The arguably most defensible occupational intervention is a shorter *working* schedule, possible without any civil calendar change.
6. **Continuous schedules cannot have perpetual period/weekday alignment without special treatment:** any attempt to make 4×91 a compulsory public-facing calendar must decide whether one/two year-end days interrupt weekday counting. OSC1 avoids falsely asserting both.
7. **Time-zone and legal semantics:** the mapping here is of UTC civil dates, not instants or local dates in every jurisdiction. A global dual-display plan needs specified conversion conventions for local time.
8. **Sampling bias in candidate enumeration:** integer search was deliberately restricted. The formal argument, not exhaustive computer enumeration, underpins OSC1's minimality claim. A genuine new mathematical criterion could reverse the ranking.

## Open scientific and mathematical questions — order of importance

**Astronomy (decision-critical before recommending live replacement):**
- Choose precisely mean tropical longitude or March equinox as the objective, then test actual new-year dates against authoritative JPL/IMCCE ephemerides over 2000±100, ±500 and ±2000 years with an explicitly documented time scale, calendar dates and future uncertainty. Benchmark Gregorian, 31/128 phase variants and observed-equinoctial calendars; measure *maximum* and RMS misalignment as well as mean drift.
- Optimise phase **only if** an astronomical target/horizon has been chosen. Compare 31/128 against other low-complexity rational leap approximations and algorithmic bisection calendars.
- Decide whether UTC midnight and March epoch remain defensible for a global reference or whether a longitude-neutral continuous day count is preferable.

**Mathematical interpretation and human comprehension:**
- Independently test comprehension and data-entry error of year/ordinal OSC1 vs 4×91, 5×73, 13×28 and Gregorian display labels, without recruiting participant preference as a hidden factor in Stage One.
- Evaluate checksum or ISO 8601 ordinal-date namespace collision risks, signed-year sorting, negative-year parsing, reproducible local/UTC conversion and universal date identity.
- Consider whether the strong 364+1 fixed-year-date correspondence justifies one mandatory regular grid rather than a configurable one.

**Human outcomes (not gates on mathematical research):**
- Separate reduced weekly hours from compressed days and from weekday naming. Pre-register comparative output, quality, sleep, recovery, engagement, service, income and household effects. Include caregivers, essential services, religious variation and distribution of costs.
- Study whether new calendar ordinal/grouping has any measurable independent effect at fixed actual hours, taking dual-calendar cognitive overhead seriously.

## Validation gates before any production adoption

1. Astronomical event-model validation and year-phase decision.
2. Public mathematical/independent algorithm review, including BCE and ≥10000 years.
3. Converter migration contract and forward/reverse cross-version tests.
4. Explicit owner decision to change the canonical calendar — **not granted merely by commissioning this research**.
5. On an authorised later change, use GMKtec local development/tests where reachable; preserve free independent public GitHub Actions and GitHub Pages security/release checks; verify live production after any deployment.

**Finite astronomical check caveat:** A 20 March fixed-date rule would match 46/50 of those civil equinox dates, versus 50/50 for OSC1, but other phase-adjusted calendars might perform equally on that short sample. A day-level match is not proof that the instant of the equinox is near the civil-day boundary or that seasonal alignment persists over centuries.

The strongest available present conclusion is a defensible **foundational** mathematical recommendation, not empirical proof of a new universal civil calendar or human work schedule.
