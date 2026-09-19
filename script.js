/* Site interactions. Calendar arithmetic lives in calendar.js. */
(() => {
  'use strict';
  const C = window.MetricCalendar;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const pad = n => String(n).padStart(2, '0');
  function todayData(now = new Date()) {
    return C.convertGregorianToMetric(now.getFullYear(), now.getMonth() + 1, now.getDate());
  }
  let todayTimer;
  let displayedDate;
  function renderTodayCalendar(today) {
    const calendar = $('[data-today-calendar]');
    if (!calendar) return;
    const {year, month, day} = today.metric;
    calendar.querySelector('.calendar-top .eyebrow').textContent = 'Your metric month';
    calendar.querySelector('.calendar-top .small-label').textContent = `${pad(month)} / 10`;
    calendar.querySelector('h2').textContent = `Metric month ${pad(month)}`;
    calendar.querySelector('.calendar-heading p').textContent = `${year} · ${C.monthLengths(year)[month - 1]} days · 6 metric weeks`;
    calendar.querySelector('caption').textContent = `Metric month ${pad(month)}, ${year}. Today is day ${day}.`;
    calendar.querySelectorAll('td').forEach((cell, index) => {
      const current = index + 1 === day;
      cell.classList.toggle('is-today', current);
      if (current) cell.setAttribute('aria-current', 'date');
      else cell.removeAttribute('aria-current');
    });
    const extras = [];
    for (let extra = 37; extra <= C.monthLengths(year)[month - 1]; extra++) {
      const current = day === extra;
      const label = C.classifyMetricDate(year, month, extra).status;
      extras.push(`<div class="bonus-strip${current ? ' is-today' : ''}"${current ? ' aria-current="date"' : ''}><span class="bonus-number">${extra}</span><div><strong>${label}${current ? ' · Today' : ''}</strong><span>Outside the metric week</span></div><span class="sun-mark" aria-hidden="true">✳</span></div>`);
    }
    calendar.querySelector('[data-today-extras]').innerHTML = extras.join('');
    calendar.querySelector('figcaption').innerHTML = `<strong>Today: ${C.formatMetric(today.metric)} · ${today.status}</strong><span>Gregorian: ${C.formatGregorian(today.gregorian)} · Your local date</span>`;
  }
  function refreshToday() {
    clearTimeout(todayTimer);
    const now = new Date();
    const today = todayData(now);
    const date = C.formatGregorian(today.gregorian);
    // Keep an open tab current without rebuilding or announcing an unchanged day.
    if (date !== displayedDate) {
      $$('[data-today-metric]').forEach(el => el.textContent = C.formatMetric(today.metric));
      $$('[data-today-gregorian]').forEach(el => el.textContent = date);
      $$('[data-today-status]').forEach(el => el.textContent = today.status);
      renderTodayCalendar(today);
      displayedDate = date;
    }
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    todayTimer = setTimeout(refreshToday, Math.min(midnight - now + 50, 60000));
  }
  refreshToday();
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshToday(); });
  window.addEventListener('pageshow', refreshToday);
  window.addEventListener('focus', refreshToday);
  const menu = $('.menu-toggle');
  menu.hidden = false;
  document.documentElement.classList.add('js');
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    $('#main-nav').classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      menu.setAttribute('aria-expanded', 'false');
      $('#main-nav').classList.remove('is-open');
      menu.focus();
    }
  });
  function openFragment() {
    try {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target?.tagName === 'DETAILS') target.open = true;
    } catch { /* Malformed fragments do not affect the page. */ }
  }
  openFragment();
  window.addEventListener('hashchange', openFragment);
  const form = $('#date-form');
  if (!form) return;
  let mode = 'gregorian';
  let lastData = null;
  const dateInput = $('#gregorian-date');
  const yearInput = $('#metric-year');
  const monthInput = $('#metric-month');
  const dayInput = $('#metric-day');
  const error = $('#input-error');
  const output = $('#conversion-result');
  function clearError() {
    error.hidden = true; error.textContent = '';
    form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
  }
  function invalidateResult() {
    lastData = null;
    output.innerHTML = '<p class="eyebrow">Your converted date</p><p class="result-placeholder">Ready when you are.</p><p>Convert the date to update your result.</p>';
    $('#result-actions').hidden = true;
    $('#result-context').hidden = true;
    $('#copy-status').textContent = '';
  }
  function updateLimit() {
    try {
      const max = C.monthLengths(Number(yearInput.value))[Number(monthInput.value) - 1];
      dayInput.max = max;
      $('#metric-limit').textContent = `Metric month ${pad(monthInput.value)} has ${max} days in ${String(Number(yearInput.value)).padStart(4,'0')}.`;
    } catch {
      dayInput.max = 38;
      $('#metric-limit').textContent = 'Enter a whole year from 1 to 9999 to check the month length.';
    }
  }
  function populate(data) {
    dateInput.value = C.formatMetric(data.gregorian);
    yearInput.value = data.metric.year;
    monthInput.value = data.metric.month;
    dayInput.value = data.metric.day;
    updateLimit();
  }
  function setMode(next) {
    if (lastData) populate(lastData);
    mode = next;
    $$('[data-mode]').forEach(b => b.setAttribute('aria-pressed',String(b.dataset.mode === mode)));
    $('#gregorian-fields').hidden = mode !== 'gregorian';
    $('#metric-fields').hidden = mode !== 'metric';
    dateInput.disabled = mode !== 'gregorian';
    [yearInput,monthInput,dayInput].forEach(el => el.disabled = mode !== 'metric');
    clearError(); invalidateResult();
  }
  function renderMonth(data) {
    const { year, month, day } = data.metric;
    $('#result-month-heading').textContent = `Metric month ${pad(month)}, ${String(year).padStart(4,'0')}`;
    $('#result-month-explanation').textContent = `Six metric weeks, plus ${month % 2 ? 'no Bonus Rest Day' : 'one Bonus Rest Day'}${month === 10 && data.leap ? ' and one Leap Day' : ''}. The outlined cell is your date. Each regular column is labelled Focus or Rest.`;
    const headings = [1,2,3,4,5,6].map(n=>`<th scope="col">${n < 5 ? 'Focus' : 'Rest'}<span>${n < 5 ? n : n-4}</span></th>`).join('');
    let rows = '';
    for (let w=0;w<6;w++) {
      rows += '<tr>';
      for (let d=1;d<=6;d++) {
        const value=w*6+d;
        rows += `<td class="${d>4?'rest ':''}${value === day?'selected':''}"${value===day?' aria-label="Selected date, metric day '+value+'"':''}>${pad(value)}</td>`;
      }
      rows += '</tr>';
    }
    const extra=[];
    if (month % 2 === 0) extra.push(`<span class="extra-day ${day===37?'selected':''}">37 · Bonus Rest Day${day===37?' · selected':''}</span>`);
    if (month===10 && data.leap) extra.push(`<span class="extra-day ${day===38?'selected':''}">38 · Leap Day${day===38?' · selected':''}</span>`);
    $('#result-month').innerHTML = `<table class="mini-calendar"><caption class="sr-only">Metric month ${pad(month)} in ${year}</caption><thead><tr>${headings}</tr></thead><tbody>${rows}</tbody></table>${extra.length?`<div class="extra-days">${extra.join('')}</div>`:''}`;
    $('#result-context').hidden = false;
  }
  function render(data) {
    clearError(); lastData = data;
    const primary = mode === 'gregorian' ? C.formatMetric(data.metric) : C.formatGregorian(data.gregorian);
    const prior = C.monthLengths(data.metric.year).slice(0,data.metric.month-1).reduce((a,b)=>a+b,0);
    output.innerHTML = `<p class="eyebrow">${mode==='gregorian'?'Metric':'Gregorian'} date</p><p class="result-date">${primary}</p><p class="result-pair">${C.formatGregorian(data.gregorian)} <span aria-hidden="true">=</span> ${C.formatMetric(data.metric)}</p><p class="status-chip">${data.status}</p><dl class="result-facts"><div><dt>Day of year</dt><dd>${data.dayOfYear} of ${data.leap?366:365}</dd></div><div><dt>Year type</dt><dd>${data.leap?'Leap':'Common'} year</dd></div><div><dt>Metric week</dt><dd>${data.week?`${data.week} of 6 · day ${data.weekDay}`:'Outside the metric week'}</dd></div><div><dt>Metric month</dt><dd>${pad(data.metric.month)} · ${C.monthLengths(data.metric.year)[data.metric.month-1]} days</dd></div></dl><p class="result-calculation">${prior} days before metric month ${pad(data.metric.month)} + day ${data.metric.day} = day ${data.dayOfYear} of the year.</p>`;
    $('#result-actions').hidden = false;
    $('#copy-status').textContent = '';
    const source = mode === 'gregorian' ? data.gregorian : data.metric;
    $('#share-result').href = `/converter.html?date=${C.formatMetric(source)}&from=${mode}`;
    renderMonth(data);
  }
  function convert(reveal = false) {
    try {
      let data;
      if (mode === 'gregorian') {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateInput.value)) throw new Error('Choose a valid Gregorian date in years 1 to 9999.');
        data = C.convertGregorianToMetric(...dateInput.value.split('-').map(Number));
      } else data = C.convertMetricToGregorian(Number(yearInput.value),Number(monthInput.value),Number(dayInput.value));
      render(data);
      if (reveal && window.matchMedia('(max-width: 700px)').matches) {
        $('.converter-output').scrollIntoView({block:'start',behavior:'instant'});
      }
    } catch (e) {
      invalidateResult(); error.textContent = e.message; error.hidden = false;
      const invalid = mode === 'gregorian' ? dateInput : (!yearInput.validity.valid || !yearInput.value ? yearInput : dayInput);
      invalid.setAttribute('aria-invalid','true'); invalid.focus();
    }
  }
  form.addEventListener('submit', event => { event.preventDefault(); convert(true); });
  form.addEventListener('input', () => { clearError(); updateLimit(); invalidateResult(); });
  $$('[data-mode]').forEach(b => b.addEventListener('click', () => { setMode(b.dataset.mode); convert(); }));
  $('#use-today').addEventListener('click', () => { populate(todayData()); convert(true); });
  $$('[data-example]').forEach(b => b.addEventListener('click', () => { setMode('gregorian'); dateInput.value = b.dataset.example; convert(true); }));
  $('#copy-result').addEventListener('click', async () => {
    if (!lastData) return;
    try {
      await navigator.clipboard.writeText(`${C.formatGregorian(lastData.gregorian)} = ${C.formatMetric(lastData.metric)} · ${lastData.status}`);
      $('#copy-status').textContent = 'Dates copied.';
    } catch { $('#copy-status').textContent = 'Copy is unavailable here. Select the dates above and copy them.'; }
  });
  populate(todayData()); setMode('gregorian');
  const params = new URLSearchParams(location.search);
  if (params.has('date')) {
    const value = params.get('date');
    const direction = params.get('from') || 'gregorian';
    try {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !['metric','gregorian'].includes(direction)) throw new Error('This link contains an invalid date or conversion direction. Enter a valid date below.');
      const numbers = value.split('-').map(Number);
      const data = direction === 'metric' ? C.convertMetricToGregorian(...numbers) : C.convertGregorianToMetric(...numbers);
      populate(data); setMode(direction); render(data);
    } catch (e) { invalidateResult(); error.textContent = e.message; error.hidden = false; }
  } else convert();
})();
