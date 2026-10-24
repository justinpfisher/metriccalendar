/* Accessible optional DC10 research converter. Never changes the canonical site. */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    const D = window.DC10Research;
    const gregForm = document.getElementById('gregorian-form');
    const decimalForm = document.getElementById('dc10-form');
    const gregInput = document.getElementById('gregorian-date');
    const decimalInput = document.getElementById('dc10-date');
    const gregResult = document.getElementById('gregorian-result');
    const decimalResult = document.getElementById('dc10-result');
    if (!D || !gregForm || !decimalForm || !gregInput || !decimalInput) return;

    function gregorianFormat(date) {
      return 'g' + String(date.year).padStart(4,'0') + '-'
        + String(date.month).padStart(2,'0') + '-'
        + String(date.day).padStart(2,'0');
    }
    function readGregorian(value) {
      const match = /^g([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(value.trim());
      if (!match) throw new RangeError('Use gYYYY-MM-DD, for example g2026-10-24.');
      const year = Number(match[1]);
      const month = Number(match[2]);
      const day = Number(match[3]);
      // The research engine validates the actual Gregorian date, including leap years.
      D.fromGregorian(year,month,day);
      return {year,month,day};
    }
    function describe(date) {
      const kind = D.classify(date.year,date.month,date.day);
      return 'Month ' + String(date.month).padStart(2,'0') + ' (' + D.monthName(date.month) + ')'
        + ' · ' + (kind.week === null ? kind.label :
          'week ' + kind.week + ', ' + kind.weekdayName + ' · ' + kind.label);
    }
    function publish(element, message, error) {
      element.textContent = message;
      element.classList.toggle('error', Boolean(error));
    }
    gregForm.addEventListener('submit', function (event) {
      event.preventDefault();
      try {
        const g = readGregorian(gregInput.value);
        const date = D.fromGregorian(g.year,g.month,g.day);
        publish(gregResult, D.formatDate(date) + ' — ' + describe(date), false);
      } catch (error) {
        publish(gregResult, error.message || 'Invalid Gregorian date.', true);
      }
    });
    decimalForm.addEventListener('submit', function (event) {
      event.preventDefault();
      try {
        const date = D.parseDate(decimalInput.value.trim());
        const g = D.toGregorian(date.year,date.month,date.day);
        publish(decimalResult, gregorianFormat(g) + ' — ' + describe(date), false);
      } catch (error) {
        publish(decimalResult, error.message || 'Invalid DC10 research date.', true);
      }
    });
    gregForm.dispatchEvent(new Event('submit', {bubbles: false, cancelable: true}));
  });
})();
