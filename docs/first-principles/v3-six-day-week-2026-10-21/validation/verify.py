#!/usr/bin/env python3
"""Verify the revised six-day weeks and 4 Focus / 2 Rest / Bonus classification.

Imports and re-runs the already tested independent v2 decimal-calendar
conversion/astronomy arithmetic suite. Python 3 standard library only.
This file is research validation, not the production website converter.
"""
from collections import Counter
from pathlib import Path
import importlib.util

BASE = Path(__file__).resolve().parents[2]
V2_PATH = BASE / "v2-base10-2026-10-20" / "validation" / "verify.py"
spec = importlib.util.spec_from_file_location("dc10_v2_verification", V2_PATH)
if spec is None or spec.loader is None:
    raise RuntimeError("Cannot load v2 mathematical reference")
v2 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v2)

WEEKDAY_NAMES = ("Begin", "Create", "Connect", "Share", "Pause", "Renew")
FOCUS_WEEKDAYS = frozenset((1, 2, 3, 4))
REST_WEEKDAYS = frozenset((5, 6))


def classify(year, month, day):
    """(kind, week, weekday, leap_rest) for a validated research DC10 date.

    day 37 is in its month but outside the six-day metric-week cycle.
    """
    v2.encode(year, month, day)  # strict v2 date validation
    if day == 37:
        return ("bonus_rest", None, None, bool(v2.is_leap(year) and month == 5))
    week = (day - 1) // 6 + 1
    weekday = (day - 1) % 6 + 1
    kind = "focus" if weekday in FOCUS_WEEKDAYS else "regular_rest"
    return (kind, week, weekday, False)


def verify():
    # Preserve all v2 mathematical and conversion guarantees before adding
    # classifications. This verifier is not a duplicate implementation.
    v2.verify()
    assert WEEKDAY_NAMES == ("Begin", "Create", "Connect", "Share", "Pause", "Renew")
    assert FOCUS_WEEKDAYS == {1, 2, 3, 4}
    assert REST_WEEKDAYS == {5, 6}

    checked_dates = 0
    checked_years = 0
    leap_years = 0
    for year in range(-256, 256):  # Four complete 128-year cycles, signed years
        lengths = v2.lengths(year)
        is_leap_year = bool(v2.is_leap(year))
        assert len(lengths) == 10
        assert set(lengths) == {36, 37}
        assert sum(lengths) == 365 + int(is_leap_year)

        counts = Counter()
        for month, last_day in enumerate(lengths, start=1):
            # Every month restarts its regular six-week sequence.
            assert classify(year, month, 1) == ("focus", 1, 1, False)
            assert classify(year, month, 4) == ("focus", 1, 4, False)
            assert classify(year, month, 5) == ("regular_rest", 1, 5, False)
            assert classify(year, month, 6) == ("regular_rest", 1, 6, False)
            assert classify(year, month, 35) == ("regular_rest", 6, 5, False)
            assert classify(year, month, 36) == ("regular_rest", 6, 6, False)

            for day in range(1, last_day + 1):
                kind, week, weekday, is_leap_rest = classify(year, month, day)
                counts[kind] += 1
                if day <= 36:
                    assert week == (day - 1) // 6 + 1
                    assert weekday == (day - 1) % 6 + 1
                    assert kind == ("focus" if weekday <= 4 else "regular_rest")
                    assert not is_leap_rest
                else:
                    assert day == 37
                    assert (kind, week, weekday) == ("bonus_rest", None, None)
                    assert is_leap_rest == (is_leap_year and month == 5)
                checked_dates += 1

            if last_day == 37:
                # Last two regular Rest Days + one Bonus Rest Day.
                assert [classify(year, month, d)[0] for d in (35, 36, 37)] == [
                    "regular_rest", "regular_rest", "bonus_rest"]
                assert classify(year, month, 37)[1:3] == (None, None)

            # The next civil day begins a new month's Week 1, day 1.
            end = v2.encode(year, month, last_day)
            next_date = v2.decode(end + 1)
            expected = (year, month + 1, 1) if month < 10 else (year + 1, 1, 1)
            assert next_date == expected
            assert classify(*next_date) == ("focus", 1, 1, False)

        assert counts["focus"] == 240
        assert counts["regular_rest"] == 120
        assert counts["bonus_rest"] == 5 + int(is_leap_year)
        assert counts["focus"] + counts["regular_rest"] + counts["bonus_rest"] == 365 + int(is_leap_year)
        assert counts["regular_rest"] + counts["bonus_rest"] == 125 + int(is_leap_year)
        assert sum(last_day == 37 for last_day in lengths) == 5 + int(is_leap_year)
        checked_years += 1
        leap_years += int(is_leap_year)

    assert checked_years == 512
    assert leap_years == 124
    assert checked_dates == 512 * 365 + 124

    # The leap addition is one Bonus Rest Day, not an extra end-of-year date.
    assert v2.is_leap(2)
    assert classify(2, 5, 37) == ("bonus_rest", None, None, True)
    assert v2.decode(v2.encode(2, 5, 37) + 1) == (2, 6, 1)
    assert v2.lengths(2)[-1] == 37
    assert v2.lengths(3)[-1] == 37
    assert classify(3, 10, 37) == ("bonus_rest", None, None, False)
    for args in ((2, 5, 38), (3, 5, 37), (2, 10, 38)):
        try:
            classify(*args)
        except ValueError:
            pass
        else:
            raise AssertionError(f"Invalid date accepted: {args}")

    print(
        f"PASS: six-week month-local calendars, four Focus / two Rest "
        f"and 37th-day Bonus Rest classification verified for "
        f"{checked_dates:,} dates in {checked_years} signed years "
        f"({leap_years} leap years)."
    )
    print("PASS: 240 Focus, 120 Regular Rest, and 5/6 Bonus Rest days annually.")
    print("PASS: Month 05 Day 37 is the centrally located Leap Rest Day once.")
    print("Research tests, not an independent human-outcomes or ephemeris study.")


if __name__ == "__main__":
    verify()
