/* Metric Calendar rules. Attribution: J. Fisher / MetricCalendar.org.
   Date-only arithmetic deliberately avoids JavaScript Date's year 0–99 remapping
   and time-zone / daylight-saving conversions. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.MetricCalendar = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const pad2 = n => String(n).padStart(2, '0');
  const padYear = n => String(n).padStart(4, '0');
  function validateYear(year) {
    if (!Number.isInteger(year) || year < 1 || year > 9999) throw new Error('Enter a whole year from 1 to 9999.');
  }
  function isLeapYear(year) {
    validateYear(year);
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }
  function monthLengths(year) { return [36,37,36,37,36,37,36,37,36,isLeapYear(year) ? 38 : 37]; }
  function gregorianMonthLengths(year) { return [31,isLeapYear(year) ? 29 : 28,31,30,31,30,31,31,30,31,30,31]; }
  function ordinal(year, month, day, lengths, label) {
    validateYear(year);
    if (!Number.isInteger(month) || month < 1 || month > lengths.length) throw new Error(`${label} month must be 01 through ${pad2(lengths.length)}.`);
    if (!Number.isInteger(day) || day < 1 || day > lengths[month - 1]) throw new Error(`${label} month ${pad2(month)} has ${lengths[month - 1]} days in ${padYear(year)}. Enter a day from 1 to ${lengths[month - 1]}.`);
    return lengths.slice(0, month - 1).reduce((sum, value) => sum + value, 0) + day;
  }
  function fromOrdinal(year, dayOfYear, lengths) {
    if (!Number.isInteger(dayOfYear) || dayOfYear < 1 || dayOfYear > lengths.reduce((a,b) => a+b, 0)) throw new Error('Day is outside the calendar year.');
    let month = 1;
    while (dayOfYear > lengths[month - 1]) dayOfYear -= lengths[month++ - 1];
    return { year, month, day: dayOfYear };
  }
  function classifyMetricDate(year, month, day) {
    ordinal(year, month, day, monthLengths(year), 'Metric');
    if (day === 38) return { type: 'leap', status: 'Leap Day / New Year’s Eve', week: null, weekDay: null };
    if (day === 37) return { type: 'bonus', status: month === 10 && !isLeapYear(year) ? 'Bonus Rest Day / New Year’s Eve' : 'Bonus Rest Day', week: null, weekDay: null };
    const weekDay = (day - 1) % 6 + 1;
    return { type: weekDay <= 4 ? 'focus' : 'rest', status: weekDay <= 4 ? `Focus Day ${weekDay}` : `Rest Day ${weekDay - 4}`, week: Math.ceil(day / 6), weekDay };
  }
  function result(gregorian, metric, dayOfYear) {
    return { gregorian, metric, dayOfYear, leap: isLeapYear(metric.year), ...classifyMetricDate(metric.year, metric.month, metric.day) };
  }
  function convertGregorianToMetric(year, month, day) {
    const dayOfYear = ordinal(year, month, day, gregorianMonthLengths(year), 'Gregorian');
    return result({ year, month, day }, fromOrdinal(year, dayOfYear, monthLengths(year)), dayOfYear);
  }
  function convertMetricToGregorian(year, month, day) {
    const dayOfYear = ordinal(year, month, day, monthLengths(year), 'Metric');
    return result(fromOrdinal(year, dayOfYear, gregorianMonthLengths(year)), { year, month, day }, dayOfYear);
  }
  const formatMetric = ({year, month, day}) => `${padYear(year)}-${pad2(month)}-${pad2(day)}`;
  const formatGregorian = date => `g${formatMetric(date)}`;
  return { isLeapYear, monthLengths, gregorianMonthLengths, classifyMetricDate, convertGregorianToMetric, convertMetricToGregorian, formatMetric, formatGregorian };
});
