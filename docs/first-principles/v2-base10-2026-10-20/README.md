# Metric Calendar — base-ten first-principles revision (research v2, 20 October 2026)

## Current research recommendation: decimal solar calendar DC10

The owner's added **genuine base-ten structural requirement** changes the prior conditional mathematical recommendation. The v1 **ordinal-only OSC1** result was minimal under *no required subperiods*, but is no longer sufficient as the complete Metric Calendar design. **DC10** retains the mathematically minimal continuous civil day/year index, then **requires exactly ten annual periods** with the most balanced integer lengths possible. These ten periods are nominal *deciyears*, not exact one-tenth-year SI units (they cannot be exactly equal numbers of whole days).

Ordinary month lengths: **37,36,37,36,36,37,36,37,36,37** (five exact 73-day pairs, **forced by optimally rounding the 20%, 40%, 60% and 80% boundaries**). In a leap year **only month 5 gains one day**, giving **37,36,37,36,37,37,36,37,36,37** (pairs 73,73,74,73,73). No days fall outside months; months differ in length by no more than one day in either year type. Leap-year lengths are palindromic, its two five-month halves each contain 183 days, and the leap date is **DC10 year–05–37**, at ordinal 183, the centre of the 366-day year.

These are **derived, non-obvious patterns**, not simply the old alternating months with a new label. Exhaustive search of all 32 arrangements of five balanced 73-day pairs, each with five possible monotonic leap-month insertions (**160 cases**), finds exactly **two** that minimise the maximum rounding discrepancy of all ten decimal boundaries in both ordinary and leap years. DC10 selects the one whose additional day occurs at the central five-month boundary. Ordinary boundaries differ from exact 10% fractions by at most **0.5 civil day**; leap boundaries differ by at most **0.4 civil day**, both theoretical minima for the corresponding integer-boundary optimisation.

**Equation:** common 5×73=365; leap 4×73+74=366. **Base-ten identity:** 10 consecutive decimal annual periods; the two underlying mathematical identifiers remain an epoch-referenced year and absolute ordinal day.

**No compulsory week** and **no automatic work/rest designations**. Any 5-, 6-, 7- or 10-day schedule can be a *continuous optional independent* overlay. Extra decimal subunits such as hundredths or thousandths of a year are real fractions of the civil year, but they cannot all be whole-day calendar cells without unequal 3/4-day blocks or sub-day timing. This project does **not** change the length or structure of the physical day or introduce metric clocks.

## Research package

1. [Decision and arithmetic proof](01-decimal-derivation.md): what genuine decimal structure means; 160-case proof and leap-centre decision.
2. [Alternatives, limits and calendar comparison](02-comparison-and-metric-constraints.md): ten months versus equal 30-day months, ordinal only, 364+1, 36 ten-day decades, 100 centiyear blocks; Pareto critique.
3. [Definitive *candidate* specification](03-dc10-research-spec.md): epoch, continuous days, year start, date syntax, recurring dates and converters.
4. [Human rhythm, scientific limits and decision gates](04-human-rhythm-and-validation.md): optional schedules, no biological leap from decimal units to human happiness, careful implementation.
5. [Reproducible integer checks](validation/verify.py): pure Python 3, no dependencies.

The validation script passed **522,484 counted checks in Chat's isolated container**, covering four full 128-year cycles, independently converted Gregorian days in 1999–2400, all 160 bounded arrangements, exact worst-boundary errors, canonical text notation and interval continuity. This was **not** executed on the owner's GMKtec Windows machine. Mean astronomy and leap-phase accuracy beyond the v1 finite equinox comparison remain open.

## Decision boundary and source lineage

- **v2** is the leading research recommendation **given the explicit base-ten constraint**.
- [v1](../v1-2026-10-20/README.md) is retained as historical first-principles analysis before the decimal requirement; its ordinal-only *final recommendation is superseded under the amended brief*, while its astronomical and human evidence remains relevant.
- **Production is unchanged**: the deployed ten-month Metric Calendar still uses the original Gregorian-aligned, six-week-per-month, 4-Focus/2-Rest model and date converter. This v2 document does **not** authorise changing that production contract.
- Existing month/weekday names are preserved as historic production names; the new structure is derived with numeric identifiers rather than assumed display labels.
- Preserve the owner's **GMKtec-first** development policy; never attach a private/personal computer as an untrusted public-repository PR runner. Retain independent free standard public GitHub Actions and GitHub Pages.

Source basis: [NIST SI decimal multiples](https://www.nist.gov/pml/owm/metric-si-prefixes), [USNO year and leap-year reasoning](https://aa.usno.navy.mil/faq/leap_years), production [Metric Calendar](https://metriccalendar.org/), original [v1 documents](../v1-2026-10-20/README.md).
