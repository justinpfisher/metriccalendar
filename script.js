// Metric Calendar converter
// Attribution: J. Fisher / MetricCalendar.org

(function(){
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  function pad2(n){ return String(n).padStart(2, "0"); }

  function isLeapYear(year){
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  function monthLengths(year){
    return [36,37,36,37,36,37,36,37,36,isLeapYear(year) ? 38 : 37];
  }

  function dayOfYearFromGregorian(year, month, day){
    const start = Date.UTC(year, 0, 1);
    const current = Date.UTC(year, month - 1, day);
    return Math.floor((current - start) / MS_PER_DAY) + 1;
  }

  function gregorianFromDayOfYear(year, doy){
    const date = new Date(Date.UTC(year, 0, doy));
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate()
    };
  }

  function metricFromDayOfYear(year, doy){
    const lengths = monthLengths(year);
    let remaining = doy;
    for(let i = 0; i < lengths.length; i++){
      if(remaining <= lengths[i]){
        return { year, month: i + 1, day: remaining };
      }
      remaining -= lengths[i];
    }
    throw new Error("Day of year is outside the Metric Calendar year.");
  }

  function dayOfYearFromMetric(year, month, day){
    const lengths = monthLengths(year);
    if(!Number.isInteger(year) || year < 1) throw new Error("Enter a valid Metric year.");
    if(!Number.isInteger(month) || month < 1 || month > 10) throw new Error("Metric month must be 01 through 10.");
    const max = lengths[month - 1];
    if(!Number.isInteger(day) || day < 1 || day > max){
      throw new Error(`mMonth ${pad2(month)} has ${max} days in ${year}.`);
    }
    return lengths.slice(0, month - 1).reduce((a,b) => a + b, 0) + day;
  }

  function classifyMetricDate(year, month, day){
    const leap = isLeapYear(year);
    const isEvenMonth = month % 2 === 0;
    const length = monthLengths(year)[month - 1];

    if(month === 10 && leap && day === 38){
      return {
        type: "leap",
        title: "Leap Day / New Year’s Eve",
        description: "The final day of a Metric leap year, outside the mWeek cycle.",
        weekInMonth: null,
        weekInYear: null,
        mDay: null
      };
    }

    if(isEvenMonth && day === 37){
      const final = month === 10 && !leap;
      return {
        type: "bonus",
        title: final ? "Bonus Rest Day / New Year’s Eve" : "Bonus Rest Day",
        description: "An additional rest day outside the regular mWeek cycle.",
        weekInMonth: null,
        weekInYear: null,
        mDay: null
      };
    }

    if(day > 36 && day <= length){
      return {
        type: "bonus",
        title: "Bonus Rest Day",
        description: "An additional rest day outside the regular mWeek cycle.",
        weekInMonth: null,
        weekInYear: null,
        mDay: null
      };
    }

    const mDay = ((day - 1) % 6) + 1;
    const weekInMonth = Math.floor((day - 1) / 6) + 1;
    const weekInYear = (month - 1) * 6 + weekInMonth;
    const focus = mDay >= 1 && mDay <= 4;

    return {
      type: focus ? "focus" : "rest",
      title: focus ? `Focus Day ${mDay}` : `Rest Day ${mDay - 4}`,
      description: focus ? "One of four Focus/Work Days in the mWeek." : "One of two Rest Days in the mWeek.",
      weekInMonth,
      weekInYear,
      mDay
    };
  }

  function formatMetric(obj){ return `m${obj.year}-${pad2(obj.month)}-${pad2(obj.day)}`; }
  function formatGregorian(obj){ return `g${obj.year}-${pad2(obj.month)}-${pad2(obj.day)}`; }

  function convertGregorianToMetric(year, month, day){
    const doy = dayOfYearFromGregorian(year, month, day);
    const metric = metricFromDayOfYear(year, doy);
    const status = classifyMetricDate(metric.year, metric.month, metric.day);
    return {
      gregorian: { year, month, day },
      metric,
      dayOfYear: doy,
      status,
      leap: isLeapYear(year)
    };
  }

  function convertMetricToGregorian(year, month, day){
    const doy = dayOfYearFromMetric(year, month, day);
    const gregorian = gregorianFromDayOfYear(year, doy);
    const metric = { year, month, day };
    const status = classifyMetricDate(year, month, day);
    return {
      gregorian,
      metric,
      dayOfYear: doy,
      status,
      leap: isLeapYear(year)
    };
  }

  function renderResult(target, data){
    if(!target) return;
    const status = data.status;
    target.className = "result-box success";
    target.innerHTML = `
      <div class="result-title">Converted date</div>
      <div class="result-date">${formatMetric(data.metric)}</div>
      <div class="note">Gregorian: <strong>${formatGregorian(data.gregorian)}</strong></div>
      <div class="result-list">
        <div><strong>${status.title}</strong><span>${status.description}</span></div>
        <div><strong>mMonth ${pad2(data.metric.month)}</strong><span>Day ${pad2(data.metric.day)} · Day ${data.dayOfYear} of the year</span></div>
        <div><strong>${status.weekInMonth ? "mWeek " + pad2(status.weekInMonth) + " of the month" : "Outside mWeek cycle"}</strong><span>${status.mDay ? "mDay " + status.mDay : "Bonus/leap days are not assigned an mDay."}</span></div>
        <div><strong>${status.weekInYear ? "Year mWeek " + pad2(status.weekInYear) : "No year mWeek number"}</strong><span>${data.leap ? "Leap year" : "Standard year"}</span></div>
      </div>
    `;
  }

  function renderError(target, message){
    if(!target) return;
    target.className = "result-box error";
    target.innerHTML = `<div class="result-title">Check the date</div><p><strong>${message}</strong></p>`;
  }

  function setTodayBlocks(){
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    let data;
    try { data = convertGregorianToMetric(year, month, day); } catch(e) { return; }

    document.querySelectorAll("[data-today-metric]").forEach(el => el.textContent = formatMetric(data.metric));
    document.querySelectorAll("[data-today-gregorian]").forEach(el => el.textContent = formatGregorian(data.gregorian));
    document.querySelectorAll("[data-today-status]").forEach(el => el.textContent = data.status.title);
    document.querySelectorAll("[data-today-month]").forEach(el => el.textContent = `mMonth ${pad2(data.metric.month)}`);
    document.querySelectorAll("[data-today-week]").forEach(el => el.textContent = data.status.weekInMonth ? `mWeek ${pad2(data.status.weekInMonth)}` : "Outside mWeek");
    document.querySelectorAll("[data-today-mday]").forEach(el => el.textContent = data.status.mDay ? `mDay ${data.status.mDay}` : "—");
  }

  function initConverter(){
    const gForm = document.querySelector("[data-gregorian-form]");
    const gInput = document.querySelector("[data-gregorian-input]");
    const gResult = document.querySelector("[data-gregorian-result]");

    if(gInput){
      const now = new Date();
      gInput.value = `${now.getFullYear()}-${pad2(now.getMonth()+1)}-${pad2(now.getDate())}`;
    }

    if(gForm){
      gForm.addEventListener("submit", function(event){
        event.preventDefault();
        try{
          const value = gInput.value;
          if(!value) throw new Error("Choose a Gregorian date.");
          const [year, month, day] = value.split("-").map(Number);
          renderResult(gResult, convertGregorianToMetric(year, month, day));
        }catch(e){ renderError(gResult, e.message); }
      });
      gForm.dispatchEvent(new Event("submit"));
    }

    const mForm = document.querySelector("[data-metric-form]");
    const yearInput = document.querySelector("[data-metric-year]");
    const monthInput = document.querySelector("[data-metric-month]");
    const dayInput = document.querySelector("[data-metric-day]");
    const mResult = document.querySelector("[data-metric-result]");

    if(yearInput){ yearInput.value = new Date().getFullYear(); }

    if(mForm){
      mForm.addEventListener("submit", function(event){
        event.preventDefault();
        try{
          const year = Number(yearInput.value);
          const month = Number(monthInput.value);
          const day = Number(dayInput.value);
          renderResult(mResult, convertMetricToGregorian(year, month, day));
        }catch(e){ renderError(mResult, e.message); }
      });
    }
  }

  function initYearExample(){
    const yearEl = document.querySelector("[data-year-example]");
    const output = document.querySelector("[data-year-example-output]");
    if(!yearEl || !output) return;

    function update(){
      const year = Number(yearEl.value || new Date().getFullYear());
      const leap = isLeapYear(year);
      const finalMetric = { year, month:10, day: leap ? 38 : 37 };
      const finalGreg = gregorianFromDayOfYear(year, leap ? 366 : 365);
      output.innerHTML = `
        <strong>${year} is a ${leap ? "leap" : "standard"} year.</strong><br>
        Final Gregorian day: ${formatGregorian(finalGreg)}<br>
        Final Metric day: ${formatMetric(finalMetric)}
      `;
    }
    yearEl.value = new Date().getFullYear();
    yearEl.addEventListener("input", update);
    update();
  }

  document.addEventListener("DOMContentLoaded", function(){
    setTodayBlocks();
    initConverter();
    initYearExample();
  });

  window.MetricCalendar = {
    isLeapYear,
    monthLengths,
    convertGregorianToMetric,
    convertMetricToGregorian,
    formatMetric,
    formatGregorian,
    classifyMetricDate
  };
})();
