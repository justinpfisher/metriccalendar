#!/usr/bin/env python3
"""Check civil-date alignment of the provisional 31/128 DC10 year model.

Observations are UTC March-equinox *dates* (not instants) transcribed from
Timeanddate's two 50-year event tables on 24 October 2026. A separate
AstroPixels table independently confirms the critical 2073 date. This
standard-library-only test does not validate astronomical calculations.

Sources:
https://www.timeanddate.com/calendar/seasons.html?n=1440&year=2000
https://www.timeanddate.com/calendar/seasons.html?n=1440&year=2050
https://www.astropixels.com/ephemeris/soleq2001.html
"""
from datetime import date, timedelta

EPOCH = date(2000, 3, 20)
DAY_19 = frozenset((
    2044, 2048, 2052, 2056, 2060, 2064, 2068, 2072, 2076, 2077,
    2080, 2081, 2084, 2085, 2088, 2089, 2092, 2093, 2096, 2097,
))
DAY_21 = frozenset((2003, 2007))


def observed_utc_equinox_date(gregorian_year):
    assert 2000 <= gregorian_year <= 2099
    return date(gregorian_year, 3,
                19 if gregorian_year in DAY_19 else
                21 if gregorian_year in DAY_21 else 20)


def predicted_year_start_date(gregorian_year, phase):
    relative_year = gregorian_year - 2000
    # Candidate phase; 40 is the unchanged published research v3 phase.
    ordinal = 365 * relative_year + (31 * relative_year + phase) // 128
    return EPOCH + timedelta(days=ordinal)


def mismatches(phase):
    return [(y, predicted_year_start_date(y, phase).isoformat(),
             observed_utc_equinox_date(y).isoformat())
            for y in range(2000, 2100)
            if predicted_year_start_date(y, phase) != observed_utc_equinox_date(y)]


def verify():
    assert len(DAY_19) == 20 and len(DAY_21) == 2
    assert not DAY_19.intersection(DAY_21)
    assert all(2000 <= y < 2100 for y in DAY_19 | DAY_21)
    assert observed_utc_equinox_date(2073) == date(2073, 3, 20)
    assert predicted_year_start_date(2073, 40) == date(2073, 3, 19)
    assert predicted_year_start_date(2000, 40) == EPOCH

    # This is a *dated event-table check*, not a simulated ephemeris.
    assert mismatches(40) == [(2073, '2073-03-19', '2073-03-20')]
    assert mismatches(41) == []
    assert mismatches(42) == []
    assert mismatches(43) == [(2011, '2011-03-21', '2011-03-20')]
    assert [p for p in range(128) if not mismatches(p)] == [41, 42]
    assert all((predicted_year_start_date(y + 128, 40) -
                predicted_year_start_date(y, 40)).days == 46751
               for y in range(2000, 2100))
    print('PASS: 2000–2099 UTC equinox civil dates; phase 40 matches 99/100.')
    print('PASS: phase 40 mismatch: 2073-03-19 predicted, 2073-03-20 published.')
    print('PASS: phases 41 and 42 both match 100/100 in this finite table.')
    print('This does not select a unique phase or establish long-range accuracy.')


if __name__ == '__main__':
    verify()
