# 3 — Alternatives, systematic comparison and ranking

Every candidate spans **365 days normally, 366 in leap years**. A *surplus* is a day outside a proposed *regular substructure*, never a day outside the year. L is 0 or 1. The selection is **mathematical first**: no assessment of employee well-being enters this table.

| Candidate | Year equation | Surplus: common/leap | Strength | Mathematical weakness |
|---|---|---:|---|---|
| **OSC1 ordinal** — winner under minimal-primitives priority | 365 numbered days + L | **0/0** outside the year; 366 simply exists when leap | No compulsory month/week or reset; every civil day numbered; unique stable date | No intrinsic repeating subperiod or week |
| **5×73 equal periods** | 5×73+L | 0/1 | All five periods exactly equal in common year | 73 prime: no short integer week nests within a period |
| **4×91 nested** | 4×13×7+1+L | 1/2 | Four equal 91-day periods, each exactly 13 seven-day weeks | Seven-day choice not given by astronomy; year-end dates interrupt weeks |
| **13×28 nested** | 13×4×7+1+L | 1/2 | Thirteen exactly equal four-week periods | 13 period labels; same interruption; no mathematical reason to privilege 28 over 91 |
| **Current Metric** | 10×6×6+5+L | 5/6 | Ten similar months; six uniform six-day weeks per month; small w=6 | 36/37 inequality, five off-week dates, resets and extra labels |
| **12×30** | 12×5×6+5+L | 5/6 | Twelve equal 30-day periods | Five surplus days need placement; no intrinsic superiority to 10×36 |
| **6×60** | 6×10×6+5+L | 5/6 | Six equal 60-day periods; ten six-day weeks each | Five surplus days; limited independent value of six |
| **5×72** | 5×12×6+5+L | 5/6 | Five equal 72-day periods | Five surplus days; still imposes six-day week |
| **4×90** | 4×15×6+5+L | 5/6 | Four equal 90-day periods; many factors | Five surplus days and arbitrary six-day weeks |
| **3×121** | 3×11×11+2+L | 2/3 | 363 core with 2 ordinary-year surplus days | Rigid eleven-day hierarchy; less rich divisibility |
| **73 five-day weeks** | 73×5+L | 0/1 | A whole five-day cycle tiles 365 exactly | No full equal multi-week month hierarchy; leap may interrupt cycle |
| **Continuous w-day rhythm, unequal months** | 365+L | 0 outside cycle | Every civil day participates continuously, including leap | Month starts cannot always repeat same weekday |
| **No months, 365 day single period** | 365+L | 0 | Reduces to OSC1 | Calling it one "month" is redundant |

The popular 13×28 system is related to the International Fixed Calendar; the 4×91 structure resembles the World Calendar's quarters. Historical examples supply practical objections to an interrupted traditional week, but historical uptake has no weight in this stage of selection. [USNO calendar overview](https://aa.usno.navy.mil/faq/calendars); [International Fixed Calendar history](https://en.wikipedia.org/wiki/International_Fixed_Calendar).

## Three ways a different system can win

### A. Maximum useful divisibility

**360 = 2³×3²×5** has 24 positive divisors: this is genuinely exceptional. It supports 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180 and 360 as whole-divisor choices. But using 360 as the regular core produces five *extra* common-year dates and six in leap years. **Divisor count and few extra days pull in opposite directions.**

### B. Fewest additional days while retaining identical periods

**5×73=365** yields *zero* common-year off-period days; in a leap year, the additional 366th day must belong to one unequal period or be intercalated. Five equal prime-length periods are elegant for annual accounting but cannot each consist of multiple equal short weeks. If weeks cross period boundaries, period weekday positions change. The mathematical benefit over ordinal dates is purely presentational.

### C. Exact nested periods with minimal extra days

**364=4×91=13×28=52×7**. Both 4×91 and 13×28 need only **one** ordinary-year off-week day, two in a leap year. Four×91 has fewer period identifiers; thirteen×28 has smaller, equal repeatable months. We recommend **4×91** if a regular *multi-level* structure is an independent requirement, because it gets the same mathematical nesting with fewer period labels. This is a principled tie-breaker, not a dominance proof. Both solutions break week continuity at year-end if every period is to start in the same weekday column. A continuous seven-day week with period start drift avoids the break but loses the perpetual grid.

## Testing the existing five pairs

Current months are **36,37,36,37,36,37,36,37,36,37**; in leap years month 10 has day 38. Their five 36+37 **pairs** each total 73 and cover the year. But "five identical 73-day pairs" is **not** a deeper division into six-day weeks: each 73-day pair contains twelve complete six-day weeks (**72 days**) and **one** Bonus Rest Day. As 73 is prime, its exact factors are only 1 and 73. Every pair's endpoint is an invented week interruption. This is useful for visual symmetry, but weaker than the same 365 expressed as five equal 73-day periods, and it cannot match the 364 core's minimal extra-day count while also keeping subperiod nesting.

## Pareto and adversarial review

No single design dominates **all** of equal periods, week nesting, no surplus, many divisors, few labels and continuous cycles. Under ordered priorities we nevertheless select **OSC1**, then identify **4×91** as the best alternative if aligned periods and weeks are a mandatory feature. The major objection to OSC1 is practical readability: ordinal 214 has less everyday meaning than a named month/day, and a naked year provides no rhythm or short planning block. That objection is *important* but concerns display or human scheduling; adding optional 4×91, 5×73 or genuinely astronomical season marks does not alter canonical date identity.

A permanent seven-day week could run independently of the calendar, with an immutable absolute-day anchor. In that case **no weekday should ever be removed** by an extra day; a leap date is just a day and the weekly position proceeds normally. This separation is a stronger solution to the theological and computational contradiction between "continuous weeks" and "perpetual date-to-weekday mapping" than inventing more special weekdays.

## Reproducibility and scope

An exhaustive **bounded** nested-layout enumeration (w=2..12 days/week, p=2..20 equal periods, q=1..100 weeks/period, C=pqw and 0≤365−C≤5) returns **81** parameter triples: 69 with core 360, 3 with 363 and 9 with 364. No 365 core appears; the factorisation proof explains why a three-factor all-greater-than-one nested structure is impossible for 365. Parameter limits exclude several conceivable implementations, so this is *not* an exhaustive search of all abstract calendars. Document 2 and the validation script provide the exact method.

**Result:** a structural winner conditional on mathematical priority has been selected. Work/rest claims begin only in document 5.
