const {test} = require('node:test');
const assert = require('node:assert/strict');
const C = require('../calendar.js');
const g = (...date) => C.convertGregorianToMetric(...date);
const m = (...date) => C.convertMetricToGregorian(...date);

test('published examples, boundaries, and century rules', () => {
  assert.deepEqual(C.monthLengths(2026),[36,37,36,37,36,37,36,37,36,37]);
  assert.deepEqual(C.monthLengths(2028),[36,37,36,37,36,37,36,37,36,38]);
  const examples = [
    [[2026,1,1],[2026,1,1]], [[2026,2,5],[2026,1,36]], [[2026,2,6],[2026,2,1]],
    [[2026,3,14],[2026,2,37]], [[2026,3,15],[2026,3,1]], [[2026,7,1],[2026,5,36]],
    [[2028,7,1],[2028,6,1]], [[2028,2,29],[2028,2,24]], [[2028,3,14],[2028,3,1]],
    [[2026,12,31],[2026,10,37]], [[2028,12,30],[2028,10,37]], [[2028,12,31],[2028,10,38]],
    [[2100,12,31],[2100,10,37]], [[2000,12,31],[2000,10,38]], [[1,1,1],[1,1,1]],
    [[99,12,31],[99,10,37]], [[9999,12,31],[9999,10,37]]
  ];
  for (const [gregorian,metric] of examples) {
    assert.deepEqual(Object.values(g(...gregorian).metric),metric);
    assert.deepEqual(Object.values(m(...metric).gregorian),gregorian);
  }
  for (const year of [4,96,400,1600,2000,2028,2400]) assert.equal(C.isLeapYear(year),true);
  for (const year of [1,99,100,1900,2026,2100,9999]) assert.equal(C.isLeapYear(year),false);
  assert.equal(C.formatGregorian(g(1,1,1).gregorian),'g0001-01-01');
  assert.equal(C.formatMetric(g(99,12,31).metric),'0099-10-37');
});

test('every date in a 400-year cycle and years 1–99 agrees with independent UTC dates', () => {
  let checked = 0;
  const years = [...Array.from({length:400},(_,i)=>2000+i),...Array.from({length:99},(_,i)=>i+1),9999];
  for (const year of years) {
    const date = new Date(0);
    date.setUTCFullYear(year,0,1); date.setUTCHours(0,0,0,0);
    let dayOfYear = 0;
    while (date.getUTCFullYear() === year) {
      dayOfYear++;
      const input=[year,date.getUTCMonth()+1,date.getUTCDate()];
      const data=g(...input);
      assert.equal(data.dayOfYear,dayOfYear);
      assert.deepEqual(Object.values(m(...Object.values(data.metric)).gregorian),input);
      assert.equal(data.metric.year,year);
      checked++;
      date.setUTCDate(date.getUTCDate()+1);
    }
    assert.equal(dayOfYear,C.monthLengths(year).reduce((a,b)=>a+b,0));
  }
  console.log(`Verified ${checked} dates against independent UTC arithmetic and reverse conversion.`);
});

test('all metric dates classify and cross month boundaries correctly', () => {
  for (const year of [1,4,99,100,1900,2000,2026,2028,2100,2400,9999]) {
    const counts={focus:0,rest:0,bonus:0,leap:0};
    let expectedOrdinal=0;
    C.monthLengths(year).forEach((length,index) => {
      for(let day=1;day<=length;day++) {
        const data=m(year,index+1,day);
        assert.equal(data.dayOfYear,++expectedOrdinal);
        assert.deepEqual(g(...Object.values(data.gregorian)).metric,{year,month:index+1,day});
        counts[data.type]++;
        if(day>36) { assert.equal(data.week,null); assert.equal(data.weekDay,null); }
        else { assert.equal(data.week,Math.ceil(day/6)); assert.equal(data.weekDay,(day-1)%6+1); }
      }
      assert.equal(m(year,index+1,1).status,'Focus Day 1');
    });
    assert.deepEqual(counts,{focus:240,rest:120,bonus:5,leap:C.isLeapYear(year)?1:0});
  }
  assert.equal(m(2028,10,37).status,'Bonus Rest Day');
  assert.equal(m(2026,10,37).status,'Bonus Rest Day / New Year’s Eve');
  assert.equal(m(2028,10,38).status,'Leap Day / New Year’s Eve');
  assert.equal(m(2026,3,17).status,'Rest Day 1');
});

test('invalid dates and non-integer inputs are rejected without rollover', () => {
  for(const fn of [g,m]) {
    for(const year of [0,-1,10000,2026.5,NaN,Infinity,'2026',null]) assert.throws(()=>fn(year,1,1));
    for(const month of [0,-1,13,1.5,NaN,'1',null]) assert.throws(()=>fn(2026,month,1));
    for(const day of [0,-1,39,1.5,NaN,'1',null]) assert.throws(()=>fn(2026,1,day));
  }
  for(const date of [[2026,2,29],[1900,2,29],[2100,2,29],[2028,2,30],[2026,4,31]]) assert.throws(()=>g(...date));
  for(const date of [[2026,1,37],[2026,10,38],[2028,9,37],[2026,11,1]]) assert.throws(()=>m(...date));
  assert.throws(()=>C.classifyMetricDate(2026,1,37));
});

test('weekday comparison count is 260–262 per Gregorian year', () => {
  for(let year=2000;year<2400;year++) {
    const date=new Date(Date.UTC(year,0,1)); let count=0;
    while(date.getUTCFullYear()===year) {
      if(date.getUTCDay()>=1 && date.getUTCDay()<=5) count++;
      date.setUTCDate(date.getUTCDate()+1);
    }
    assert.ok(count>=260 && count<=262);
  }
});
