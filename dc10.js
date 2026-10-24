/* DC10 v3 research calendar — a separate, provisional calendar namespace.
   Does not alter the live Gregorian-aligned MetricCalendar API.
   UTC civil dates are converted by integer arithmetic, not Date timestamps.
   Astronomical epoch / 31-in-128 phase 40 are research assumptions. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.DC10Research = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const MAX_YEAR = 1000000000;
  const CYCLE_DAYS = 46751;
  const MONTHS = Object.freeze([37,36,37,36,36,37,36,37,36,37]);
  const MONTH_NAMES = Object.freeze(['Renewal','Awaken','Bloom','Thrive','Radiate','Sustain','Gather','Reflect','Diminish','Restore']);
  const WEEKDAY_NAMES = Object.freeze(['Begin','Create','Connect','Share','Pause','Renew']);
  const G_MONTH_OFFSETS = Object.freeze([0,31,59,90,120,151,181,212,243,273,304,334]);

  function whole(value, label) {
    if (!Number.isSafeInteger(value)) throw new RangeError(label + ' must be a safe integer.');
  }
  function validYear(year) {
    whole(year, 'DC10 year');
    if (Math.abs(year) > MAX_YEAR) throw new RangeError('DC10 year outside supported range.');
  }
  function yearStartUnchecked(year) {
    return 365 * year + Math.floor((31 * year + 40) / 128);
  }
  function yearStart(year) {
    validYear(year);
    return yearStartUnchecked(year);
  }
  function isLeap(year) {
    validYear(year);
    return yearStartUnchecked(year + 1) - yearStartUnchecked(year) === 366;
  }
  function monthLengths(year) {
    const lengths = MONTHS.slice();
    if (isLeap(year)) lengths[4] = 37;
    return lengths;
  }
  function toAbsolute(year, month, day) {
    const lengths = monthLengths(year);
    whole(month, 'DC10 month');
    whole(day, 'DC10 day');
    if (month < 1 || month > 10 || day < 1 || day > lengths[month - 1]) {
      throw new RangeError('Invalid DC10 month or day.');
    }
    let absolute = yearStartUnchecked(year) + day - 1;
    for (let index = 0; index < month - 1; index++) absolute += lengths[index];
    return absolute;
  }
  function fromAbsolute(absolute) {
    whole(absolute, 'Absolute day');
    if (Math.abs(absolute) > MAX_YEAR * 366 + 366) {
      throw new RangeError('Absolute day outside supported range.');
    }
    const era = Math.floor(absolute / CYCLE_DAYS);
    let low = era * 128;
    let high = low + 128;
    while (low < high) {
      const middle = Math.floor((low + high + 1) / 2);
      if (yearStartUnchecked(middle) <= absolute) low = middle;
      else high = middle - 1;
    }
    validYear(low);
    let ordinal = absolute - yearStartUnchecked(low) + 1;
    const lengths = monthLengths(low);
    for (let month = 1; month <= 10; month++) {
      if (ordinal <= lengths[month - 1]) return { year: low, month, day: ordinal };
      ordinal -= lengths[month - 1];
    }
    throw new Error('Internal DC10 date inconsistency.');
  }
  function formatDate(date) {
    toAbsolute(date.year, date.month, date.day);
    const sign = date.year < 0 ? '-' : '+';
    return 'DC10:' + sign + String(Math.abs(date.year)).padStart(6, '0') + '-'
      + String(date.month).padStart(2, '0') + '-' + String(date.day).padStart(2, '0');
  }
  function parseDate(value) {
    if (typeof value !== 'string') throw new TypeError('DC10 date must be text.');
    const match = /^DC10:([+-])([0-9]{6,})-([0-9]{2})-([0-9]{2})$/.exec(value);
    if (!match) throw new RangeError('Invalid DC10 date notation.');
    const year = Number(match[2]) * (match[1] === '-' ? -1 : 1);
    const result = { year, month: Number(match[3]), day: Number(match[4]) };
    if (formatDate(result) !== value) throw new RangeError('Noncanonical DC10 date notation.');
    return result;
  }
  function classify(year, month, day) {
    toAbsolute(year, month, day);
    if (day === 37) {
      const leapRest = isLeap(year) && month === 5;
      return { kind: 'bonus_rest', week: null, weekday: null, weekdayName: null,
        isLeapRestDay: leapRest, label: leapRest ? 'Leap Rest Day' : 'Bonus Rest Day' };
    }
    const weekday = (day - 1) % 6 + 1;
    return { kind: weekday <= 4 ? 'focus' : 'regular_rest', week: Math.floor((day - 1) / 6) + 1,
      weekday, weekdayName: WEEKDAY_NAMES[weekday - 1], isLeapRestDay: false,
      label: weekday <= 4 ? 'Focus Day ' + weekday : 'Rest Day ' + (weekday - 4) };
  }
  function monthName(month) {
    whole(month, 'DC10 month');
    if (month < 1 || month > 10) throw new RangeError('Invalid DC10 month.');
    return MONTH_NAMES[month - 1];
  }
  function gregorianLeap(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }
  function gregorianYearStart(year) {
    const before = year - 1;
    return 365 * before + Math.floor(before / 4) - Math.floor(before / 100)
      + Math.floor(before / 400);
  }
  function gregorianOrdinal(year, month, day) {
    whole(year, 'Gregorian year');
    whole(month, 'Gregorian month');
    whole(day, 'Gregorian day');
    if (year < 1 || year > 9999 || month < 1 || month > 12) {
      throw new RangeError('Gregorian date outside supported years 1–9999.');
    }
    const lengths = [31,gregorianLeap(year) ? 29 : 28,31,30,31,30,31,31,30,31,30,31];
    if (day < 1 || day > lengths[month - 1]) throw new RangeError('Invalid Gregorian day.');
    return gregorianYearStart(year) + G_MONTH_OFFSETS[month - 1]
      + (gregorianLeap(year) && month > 2 ? 1 : 0) + day - 1;
  }
  const EPOCH_GREGORIAN_ORDINAL = gregorianOrdinal(2000, 3, 20);
  function fromGregorian(year, month, day) {
    return fromAbsolute(gregorianOrdinal(year, month, day) - EPOCH_GREGORIAN_ORDINAL);
  }
  function toGregorian(year, month, day) {
    const ordinal = EPOCH_GREGORIAN_ORDINAL + toAbsolute(year, month, day);
    if (ordinal < 0 || ordinal >= gregorianYearStart(10000)) {
      throw new RangeError('Gregorian conversion supports years 1–9999.');
    }
    let low = 1;
    let high = 9999;
    while (low < high) {
      const middle = Math.floor((low + high + 1) / 2);
      if (gregorianYearStart(middle) <= ordinal) low = middle;
      else high = middle - 1;
    }
    let within = ordinal - gregorianYearStart(low) + 1;
    const lengths = [31,gregorianLeap(low) ? 29 : 28,31,30,31,30,31,31,30,31,30,31];
    for (let month = 1; month <= 12; month++) {
      if (within <= lengths[month - 1]) return { year: low, month, day: within };
      within -= lengths[month - 1];
    }
    throw new Error('Internal Gregorian date inconsistency.');
  }
  return Object.freeze({
    yearStart, isLeap, monthLengths, toAbsolute, fromAbsolute, formatDate,
    parseDate, classify, monthName, fromGregorian, toGregorian,
    weekdayNames: WEEKDAY_NAMES.slice(), monthNames: MONTH_NAMES.slice(),
    researchOnly: true, phase: 40
  });
});
