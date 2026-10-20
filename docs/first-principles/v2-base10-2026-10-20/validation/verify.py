#!/usr/bin/env python3
"""Verify the proposed Metric Calendar decimal structure (DC10 research v2).

Standard-library only. Run in the actual execution environment specified in the
report; a Chat container run is not a run on the owner's GMKtec.
The epoch and leap formula are research assumptions inherited from OSC1,
not a new astronomy/equinox ephemeris measurement.
"""
from datetime import date, timedelta
from fractions import Fraction
from itertools import product
from collections import Counter
import re

EPOCH = date(2000, 3, 20)
CYCLE = 46751
PHASE = 40
COMMON = (37, 36, 37, 36, 36, 37, 36, 37, 36, 37)
EXTRA_MONTH_INDEX = 4  # zero-based index: period 5 gains its 37th day
SYNTAX = re.compile(r'DC10:([+-])([0-9]{6,})-([0-9]{2})-([0-9]{2})')


def year_start(y):
    return 365 * y + (31*y + PHASE)//128


def is_leap(y):
    return year_start(y+1) - year_start(y) == 366


def lengths(y):
    a=list(COMMON)
    if is_leap(y): a[EXTRA_MONTH_INDEX] += 1
    return tuple(a)


def encode(y, month, day):
    if any(type(x) is not int for x in (y, month, day)):
        raise ValueError('integer fields required')
    lens=lengths(y)
    if not 1 <= month <= 10 or not 1 <= day <= lens[month-1]:
        raise ValueError('invalid month or day')
    return year_start(y) + sum(lens[:month-1]) + day - 1


def decode(absolute):
    if type(absolute) is not int:
        raise ValueError('integer absolute day required')
    # Exact 128-year 46751-day cycle; floor works for negative dates.
    era=absolute//CYCLE
    lo,hi=era*128, (era+1)*128
    while lo < hi:
        mid=(lo+hi+1)//2
        if year_start(mid)<=absolute:lo=mid
        else:hi=mid-1
    ordinal=absolute-year_start(lo)+1
    for m,n in enumerate(lengths(lo),start=1):
        if ordinal<=n:
            return lo,m,ordinal
        ordinal -= n
    raise AssertionError('unreachable civil date')


def format_date(y, month, day):
    encode(y,month,day)
    return f'DC10:{"+" if y>=0 else "-"}{abs(y):06d}-{month:02d}-{day:02d}'


def parse_date(value):
    if not isinstance(value,str):raise ValueError('string required')
    match=SYNTAX.fullmatch(value)
    if match is None:raise ValueError('malformed decimal date')
    year=int(match.group(2)) * (1 if match.group(1)=='+' else -1)
    month=int(match.group(3))
    day=int(match.group(4))
    if format_date(year,month,day) != value:
        raise ValueError('non-canonical decimal date')
    return year,month,day


def from_gregorian(g):
    return decode((g-EPOCH).days)


def to_gregorian(y,m,d):
    return EPOCH+timedelta(days=encode(y,m,d))


def bounds(months):
    b=[0]
    for length in months:b.append(b[-1]+length)
    return b


def max_deviation(months, nominal_n):
    b=bounds(months)
    return max(abs(Fraction(10 * b[k]-nominal_n*k,10)) for k in range(11))


def exact_enumeration():
    """All pairs are 73 in a common year; adding leap day can only lengthen a 36-day month.

    2^5 common pair arrangements x 5 eligible insertion months = 160 options.
    """
    options=[]
    for pair_ends in product((0,1),repeat=5):
        common=[]
        for bit in pair_ends:common.extend((36+bit,37-bit))
        for j,v in enumerate(common):
            if v!=36: continue
            leap=common.copy();leap[j]+=1
            options.append((max(max_deviation(common,365),max_deviation(leap,366)),
                            max_deviation(leap,366),tuple(common),tuple(leap),j+1))
    return options


def verify():
    checks=0
    assert len(COMMON)==10 and sum(COMMON)==365
    assert lengths(2)[4] == 37
    assert COMMON == (37,36,37,36,36,37,36,37,36,37)
    assert bounds(COMMON)==[0,37,73,110,146,182,219,255,292,328,365]
    assert bounds(lengths(2))==[0,37,73,110,146,183,220,256,293,329,366]
    assert sum(is_leap(y) for y in range(128))==31
    assert all(year_start(y+128)-year_start(y)==46751 for y in range(-500,500))
    assert all(year_start(y+1)-year_start(y)==365+is_leap(y) for y in range(-1000,1000))
    assert max_deviation(COMMON,365)==Fraction(1,2)
    assert max_deviation(lengths(2),366)==Fraction(2,5)
    assert tuple(reversed(lengths(2)))==lengths(2)
    assert tuple(map(sum,zip(COMMON[::2],COMMON[1::2]))) == (73,)*5
    assert tuple(map(sum,zip(lengths(2)[::2],lengths(2)[1::2]))) == (73,73,74,73,73)
    assert sum(COMMON[:5])==182 and sum(COMMON[5:])==183
    assert sum(lengths(2)[:5])==183 and sum(lengths(2)[5:])==183
    checks+=13

    choices=exact_enumeration()
    assert len(choices)==160
    minima=min(v[0] for v in choices)
    optimal=[x for x in choices if x[0]==minima]
    assert minima==Fraction(1,2)
    assert len(optimal)==2
    assert all(x[1]==Fraction(2,5) for x in optimal)
    assert any(x[2]==COMMON and x[4]==5 for x in optimal)
    assert {x[4] for x in optimal}=={5,6}
    checks += 6

    # Full integer years and arbitrary signed dates across four complete 128y cycles.
    for y in range(-256,256):
        year_lens=lengths(y)
        assert sum(year_lens)==365+is_leap(y)
        assert min(year_lens)==36 and max(year_lens)==37
        for m in range(1,11):
            for d in range(1,year_lens[m-1]+1):
                a=encode(y,m,d)
                assert decode(a)==(y,m,d)
                assert parse_date(format_date(y,m,d))==(y,m,d)
                checks+=2
        end=encode(y,10,year_lens[-1])
        assert decode(end+1)==(y+1,1,1)
        checks+=3

    # Gregorian independently implemented in Python's date library, 1999..2400 inclusive.
    dt=date(1999,1,1)
    finish=date(2401,1,1)
    while dt<finish:
        y,m,d=from_gregorian(dt)
        assert to_gregorian(y,m,d)==dt
        dt+=timedelta(days=1)
        checks+=1

    assert from_gregorian(date(2000,3,20)) == (0,1,1)
    assert from_gregorian(date(2026,10,19)) == (26,6,32)
    assert to_gregorian(2,5,37)==EPOCH+timedelta(days=year_start(2)+182)
    for invalid in ('DC10:-000000-01-01','DC10:+0000000-01-01',
                    'DC10:+000003-05-37','DC10:+000000-01-38',
                    'DC10:+000000-00-01','DC10:+000000-11-01',
                    'DC10:+000000-01-00','OSC1:+000000-001','DC10:000000-01-01'):
        try: parse_date(invalid)
        except ValueError:checks+=1
        else:raise AssertionError(f'accepted invalid date {invalid}')

    # Decimal subdivisions: 100 rounded short segments require 3- or 4-day lengths.
    for n in (365,366):
        b=[(n*k+50)//100 for k in range(101)]
        spans=[b[k+1]-b[k] for k in range(100)]
        assert set(spans)=={3,4}
        assert Counter(spans)==Counter({3:400-n,4:n-300})
        checks+=2
    # A continuous optional scheduling cycle (5,6,7,10 days) never resets on a leap date.
    for w in (5,6,7,10):
        for y in range(-10,10):
            end=encode(y,10,lengths(y)[-1])
            assert (end+1)%w==((end%w)+1)%w
            checks+=1
    print('PASS:',checks,'counted round-trip, period, recurrence, enumeration checks')
    print('Common months',COMMON,'boundaries',bounds(COMMON))
    print('Leap months  ',lengths(2),'boundaries',bounds(lengths(2)))
    print('160 complete pair/insertion alternatives; exactly 2 minimax-optimal mirror cases.')
    print('Selected 5th-month leap insertion has max integer boundary error common 0.5, leap 0.4 days.')
    print('Last month never >37; normal and leap years never remove a month-day.')
    print('2000-03-20 ->',format_date(*from_gregorian(date(2000,3,20))))
    print('2026-10-19 ->',format_date(*from_gregorian(date(2026,10,19))))
    print('No real-world astronomical ephemeris validation or owner-PC execution implied.')


if __name__ == '__main__': verify()
