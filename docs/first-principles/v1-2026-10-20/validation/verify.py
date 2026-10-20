#!/usr/bin/env python3
"""OSC1 arithmetic and candidate-search verification; standard library only.

Astronomical comparison uses a constant nominal target, not an ephemeris.
This validation was run in Chat's container and not on the owner's GMKtec.
"""
from datetime import date, timedelta
from fractions import Fraction
from collections import defaultdict
import json

TARGET = Fraction(1826211, 5000)  # 365.2422 EXACT nominal benchmark ONLY
EPOCH = date(2000, 3, 20)
CYCLE = 128 * 365 + 31
PHASE = 40  # 2000-03-20 equinox ~07:35 UTC, ~0.316 civil day

def leap(y):
    return (31*(y+1)+PHASE)//128 - (31*y+PHASE)//128 == 1

def before(y):
    return y * 365 + (31*y+PHASE)//128

def encode(y, ordinal):
    if not isinstance(y, int) or isinstance(y, bool) or not isinstance(ordinal, int) or isinstance(ordinal, bool):
        raise ValueError('integer fields only')
    if not 1 <= ordinal <= 365 + leap(y):
        raise ValueError('invalid ordinal')
    return before(y) + ordinal - 1

def decode(absolute):
    if not isinstance(absolute, int) or isinstance(absolute, bool):
        raise ValueError('integer day required')
    era, _ = divmod(absolute, CYCLE)
    lo = era * 128
    hi = lo + 128
    while lo < hi:
        mid = (lo + hi + 1)//2
        if before(mid) <= absolute:
            lo = mid
        else:
            hi = mid - 1
    return lo, absolute - before(lo) + 1

def gregorian_to_osc(g):
    return decode((g-EPOCH).days)

def osc_to_gregorian(y,d):
    return EPOCH + timedelta(days=encode(y,d))

def comparison():
    candidates = {
        'Every 4 years': Fraction(1,4),
        'Gregorian 400y': Fraction(97,400),
        '128y / 31': Fraction(31,128),
        'Revised Julian 900y /218': Fraction(218,900),
        '33y / 8': Fraction(8,33),
        'Exact nominal fraction 5000y /1211': Fraction(1211,5000),
    }
    return {name: {'mean_year':f'{float(365+frac):.11f}',
        'signed_error_days_per_year': f'{float(365+frac-TARGET):+.11f}',
        **{f'drift_{n}_years': f'{float((365+frac-TARGET)*n):+.6f}' for n in [100,1000,10000]}}
      for name,frac in candidates.items()}

def enumerated_candidates():
    designs = []
    for w in range(2,13):
        for p in range(2,21):
            for q in range(1,101):
                core = p*q*w
                r=365-core
                if 0 <= r <= 5:
                    designs.append({'periods':p,'weeks_per_period':q,'days_per_week':w,'core':core,'surplus':r})
    bycore=defaultdict(list)
    for d in designs: bycore[d['core']].append(d)
    return designs, {str(core):len(bycore[core]) for core in sorted(bycore)}

def count_divisors(n):
    return sum(n%i == 0 for i in range(1,n+1))

def verify():
    checks=0
    samples=[-100001,-10000,-1000,-257,-129,-128,-127,-5,-4,-1,0,1,3,4,127,128,129,9999,100000]
    assert before(0)==0
    assert before(128)==CYCLE==46751
    assert sum(leap(y) for y in range(128)) == 31
    assert all(before(y+1)-before(y) == 365 + leap(y) for y in range(-260,10000));checks+=10260
    for year in range(-256,256):
        for ordinal in range(1,366+int(leap(year))):
            ab=encode(year,ordinal)
            assert decode(ab)==(year,ordinal)
            assert decode(ab+1)==(year,ordinal+1) if ordinal < 365+int(leap(year)) else decode(ab+1)==(year+1,1)
            checks+=1
    for y in samples:
        for day in [1,2,10,100,364,365,366]:
            if day <=365+leap(y):
                assert decode(encode(y,day)) ==(y,day)
                checks+=1
    for dt in [date(1999,12,31),date(2000,3,19),date(2000,3,20),date(2001,3,20),date(2003,3,20),date(2003,3,21),date(2004,3,19),date(2004,3,20),date(2026,10,19),date(2100,3,20),date(9999,12,31)]:
        yy,od=gregorian_to_osc(dt)
        assert osc_to_gregorian(yy,od)==dt
        checks+=1
    g=date(1999,1,1)
    end=date(2401,1,1)
    while g<end:
        yy,od=gregorian_to_osc(g)
        assert osc_to_gregorian(yy,od)==g
        g += timedelta(days=1)
        checks+=1
    for y in [2,3,6,7,126,127,130,255,383,511,-5,-1]:
        expected= ((31*(y+1)+PHASE)//128 - ((31*y+PHASE)//128)) == 1
        assert leap(y)==expected
        checks+=1
    for fail in [(2,367),(127,366),(3,366),(0,0)]:
        try: encode(*fail)
        except ValueError: checks+=1
        else: raise AssertionError(fail)
    assert osc_to_gregorian(0,1)==date(2000,3,20)
    assert osc_to_gregorian(2,366)==date(2003,3,20)
    assert osc_to_gregorian(3,365)==date(2004,3,19)
    assert osc_to_gregorian(4,1)==date(2004,3,20)
    assert sum(int(leap(y)) for y in range(10000)) == 2422
    print('PASS', checks,'roundtrips/boundary checks; century, negative-year, and UTC epoch examples')
    print('Sources: exact nominal 365.2422 reference; no astronomical ephemeris simulation')
    print('Epoch examples:')
    for g in [date(2000,3,20),date(2004,3,19),date(2004,3,20),date(2026,10,19),date(2100,3,20)]:print(g,gregorian_to_osc(g))
    print('Leap comparison:')
    print(json.dumps(comparison(),indent=2))
    designs,groups=enumerated_candidates()
    print('Enumerated nested layouts with w 2..12, p 2..20, q 1..100, surplus 0..5:',len(designs),'by core:',groups)
    print('Divisor counts:',{n:count_divisors(n) for n in [360,361,362,363,364,365,366]})
    print('Top mathematical counterexamples with surplus<=1:',[d for d in designs if d['surplus']<=1 and d['periods']<=14 and d['days_per_week']>=4 and d['weeks_per_period']>=3][:40])
    print('Continuous-cycle workdays in 365 and 366 days across every possible phase:')
    for w,on in [(7,5),(7,4),(6,4),(5,3),(5,4)]:
        print(f'{on}/{w-on} cycle:',{n:sorted(set(sum((d+shift)%w<on for d in range(n)) for shift in range(w))) for n in (365,366)})

if __name__=='__main__':verify()
