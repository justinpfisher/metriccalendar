/* DC10 research tests are independent of the deployed legacy calendar. */
const {test} = require('node:test');
const assert = require('node:assert/strict');
const D = require('../dc10.js');
const Legacy = require('../calendar.js');

test('epoch, versioned notation, and published research example', () => {
  assert.equal(D.researchOnly, true);
  assert.equal(D.phase, 40);
  assert.deepEqual(D.fromGregorian(2000,3,20), {year:0,month:1,day:1});
  assert.deepEqual(D.toGregorian(0,1,1), {year:2000,month:3,day:20});
  assert.equal(D.formatDate({year:0,month:1,day:1}), 'DC10:+000000-01-01');
  assert.deepEqual(D.fromGregorian(2026,10,19), {year:26,month:6,day:32});
  assert.deepEqual(D.fromGregorian(2026,10,24), {year:26,month:6,day:37});
  assert.equal(D.classify(26,6,37).kind, 'bonus_rest');
  assert.equal(D.formatDate(D.fromGregorian(2026,10,24)), 'DC10:+000026-06-37');
  assert.deepEqual(D.parseDate('DC10:-000001-10-37'), {year:-1,month:10,day:37});
  assert.notDeepEqual(Legacy.convertGregorianToMetric(2026,10,19).metric, D.fromGregorian(2026,10,19));
});

test('ten optimal month lengths, 31/128 leap cycle, and symmetric leap year', () => {
  const common = [37,36,37,36,36,37,36,37,36,37];
  const leap = [37,36,37,36,37,37,36,37,36,37];
  assert.deepEqual(D.monthLengths(0),common);
  assert.deepEqual(D.monthLengths(2),leap);
  assert.equal(D.monthName(1),'Renewal');
  assert.equal(D.monthName(10),'Restore');
  assert.deepEqual(D.weekdayNames,['Begin','Create','Connect','Share','Pause','Renew']);
  assert.equal(Array.from({length:128},(_,y)=>D.isLeap(y)).filter(Boolean).length,31);
  assert.deepEqual(leap,leap.slice().reverse());
  assert.equal(leap.slice(0,5).reduce((a,b)=>a+b,0),183);
  assert.equal(leap.slice(5).reduce((a,b)=>a+b,0),183);
  for(let year=-128;year<128;year++) {
    assert.equal(D.yearStart(year+128)-D.yearStart(year),46751);
    assert.equal(D.yearStart(year+1)-D.yearStart(year),365+Number(D.isLeap(year)));
  }
  function error(months,days) {
    let sum=0,largest=0;
    for(let k=1;k<=10;k++){sum+=months[k-1];largest=Math.max(largest,Math.abs(sum-k*days/10));}
    return largest;
  }
  assert.ok(Math.abs(error(common,365)-0.5)<1e-10);
  assert.ok(Math.abs(error(leap,366)-0.4)<1e-10);
});

test('all dates round trip across 512 signed research years, no day 38', () => {
  let checks=0,leaps=0;
  for(let year=-256;year<256;year++){
    const lengths=D.monthLengths(year);
    const leap=D.isLeap(year);
    const counts={focus:0,regular_rest:0,bonus_rest:0};
    if(leap) leaps++;
    let ordinal=0;
    for(let month=1;month<=10;month++){
      assert.deepEqual(D.classify(year,month,1),{
        kind:'focus',week:1,weekday:1,weekdayName:'Begin',
        isLeapRestDay:false,label:'Focus Day 1'
      });
      for(let day=1;day<=lengths[month-1];day++){
        const absolute=D.toAbsolute(year,month,day);
        assert.deepEqual(D.fromAbsolute(absolute),{year,month,day});
        const formatted=D.formatDate({year,month,day});
        assert.deepEqual(D.parseDate(formatted),{year,month,day});
        const kind=D.classify(year,month,day);
        counts[kind.kind]++;
        if(day<=36){
          assert.equal(kind.week,Math.floor((day-1)/6)+1);
          assert.equal(kind.weekday,(day-1)%6+1);
          assert.equal(kind.isLeapRestDay,false);
        }else{
          assert.equal(day,37);
          assert.equal(kind.week,null);
          assert.equal(kind.weekday,null);
          assert.equal(kind.isLeapRestDay,leap&&month===5);
        }
        assert.equal(absolute-D.yearStart(year),ordinal++);
        checks++;
      }
      const end=D.toAbsolute(year,month,lengths[month-1]);
      assert.deepEqual(D.fromAbsolute(end+1), month===10?
        {year:year+1,month:1,day:1}:{year,month:month+1,day:1});
    }
    assert.equal(ordinal,365+Number(leap));
    assert.deepEqual(counts,{focus:240,regular_rest:120,bonus_rest:5+Number(leap)});
    assert.throws(()=>D.toAbsolute(year,10,38));
    if(!leap) assert.throws(()=>D.toAbsolute(year,5,37));
  }
  assert.equal(leaps,124);
  assert.equal(checks,187004);
  assert.equal(D.classify(2,5,37).isLeapRestDay,true);
  assert.deepEqual(D.fromAbsolute(D.toAbsolute(2,5,37)+1),{year:2,month:6,day:1});
});

test('Gregorian cross-conversion against independent UTC Date over 1999–2400', () => {
  let checked=0;
  for (let year=1999;year<=2400;year++){
    const time=new Date(0);
    time.setUTCFullYear(year,0,1);
    time.setUTCHours(0,0,0,0);
    while(time.getUTCFullYear()===year){
      const g={year,month:time.getUTCMonth()+1,day:time.getUTCDate()};
      const d=D.fromGregorian(g.year,g.month,g.day);
      assert.deepEqual(D.toGregorian(d.year,d.month,d.day),g);
      time.setUTCDate(time.getUTCDate()+1);
      checked++;
    }
  }
  assert.equal(checked,146828);
  assert.deepEqual(D.toGregorian(73,1,1),{year:2073,month:3,day:19});
});

test('strict rejection of invalid dates, canonical spellings, and out-of-range values',()=>{
  for(const invalid of [
    'DC10:-000000-01-01','DC10:+0000000-01-01','DC10:000000-01-01',
    'DC10:+000003-05-37','DC10:+000000-01-38','DC10:+000000-11-01',
    'DC10:+000000-00-01','DC10:+000000-01-00','DC10:+000000-1-01',
    'DC10:+1000000001-01-01', 'g2026-10-24','2026-10-24',''
  ]) assert.throws(()=>D.parseDate(invalid),invalid);
  assert.throws(()=>D.parseDate(null));
  for(const year of [1.5,NaN,Infinity,1000000001,-1000000001,'26']) {
    assert.throws(()=>D.monthLengths(year));
  }
  for(const month of [0,11,-1,1.5,'1',NaN]) assert.throws(()=>D.toAbsolute(26,month,1));
  for(const day of [0,38,1.5,-1,NaN,'1']) assert.throws(()=>D.toAbsolute(26,1,day));
  for(const g of [[0,1,1],[10000,1,1],[2026,2,29],[1900,2,29],[2000,2,30],[2026,13,1]]) {
    assert.throws(()=>D.fromGregorian(...g));
  }
  assert.throws(()=>D.toGregorian(-100000,1,1));
  assert.throws(()=>D.toGregorian(100000,1,1));
  assert.deepEqual(D.toGregorian(...Object.values(D.fromGregorian(1,1,1))), {year:1,month:1,day:1});
  assert.deepEqual(D.toGregorian(...Object.values(D.fromGregorian(9999,12,31))), {year:9999,month:12,day:31});
});
