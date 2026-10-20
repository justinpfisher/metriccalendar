# Metric Calendar — independent first-principles investigation (v1, 20 October 2026)

**Research recommendation only.** This review was undertaken independently of the existing public calendar's ten-month design. Its proposed **Ordinal Solar Calendar OSC1** is *not* adopted in `calendar.js` or the live website. The production Metric Calendar's Gregorian-aligned dates and converter remain unchanged.

## Eight deliverables

1. [Executive conclusion](01-executive-conclusion.md) — selected mathematical foundation, conditional priority ordering and structured alternative.
2. [Mathematical foundations](02-mathematical-foundations.md) — astronomy, exact leap-cycle comparisons, divisibility and mathematical proof.
3. [Alternatives and evaluation](03-alternatives-comparison.md) — candidate matrix, bounded enumeration and Pareto critique.
4. [Definitive proposed OSC1 specification](04-definitive-osc1-specification.md) — arithmetic, epoch, unambiguous notation, pseudocode, dates and recurrence.
5. [Human rhythm and well-being](05-human-rhythm-and-wellbeing.md) — occupational and biological evidence; scheduling is a separate optional layer.
6. [Productivity and implementation](06-productivity-and-implementation.md) — actual workdays, hours, coverage requirements and cautious adoption.
7. [Existing Metric Calendar assessment](07-existing-metric-calendar-assessment.md) — production/historical reconciliation and keep/replace/optional/archive decisions.
8. [Validation, evidence and open questions](08-validation-evidence-open-questions.md) — reproducibility, adversarial critique, research gaps and required ephemeris check.

## Computational reproduction

`python validation/verify.py` (Python 3 standard library only; run from any directory) verifies the candidate scheme, exact leap cycle, reverse conversion, representative proleptic Gregorian range, continuous-work schedules, candidate enumeration and drift *relative to a deliberately constant nominal mean*. Its first execution in Chat's isolated container yielded **344,234 counted checks passing**. This is not a run on the owner's GMKtec and not a prediction of observed equinox dates. The script is provided as a reproducible audit rather than as a new production dependency.

## Status and boundaries

- Existing production rules and browser converter: **unchanged**.
- Adopted calendar design: **unchanged**; OSC1 is **a recommended mathematical replacement candidate**, not an authorisation to migrate.
- Phase 40, 31/128 leap schedule and 2000-03-20 UTC anchor: **research assumptions requiring ephemeris validation** against the precisely selected seasonal reference and long-range horizon.
- Human rhythm: an optional schedule change, **not deduced from calendar mathematics** and not scientifically verified for the particular OSC1 system.
- Development: conducted via the Chat container and GitHub connector where GMKtec access was unavailable. Public repo standard GitHub CI/Pages remains a separate independent, free verification mechanism; no personal self-hosted runner was attached.

Project provenance: [main repository](https://github.com/justinpfisher/metriccalendar), base `d1487c966cbd3ba0de5e26534f21e85adda6000c`, [live site](https://metriccalendar.org/), production [calendar.js](https://github.com/justinpfisher/metriccalendar/blob/main/calendar.js).
