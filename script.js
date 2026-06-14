// Metric Calendar converter
// Attribution: J. Fisher / MetricCalendar.org

(function(){
  "use strict";

  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  function pad2(n){ return String(n).padStart(2, "0"); }

  function isLeapYear(year){
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  function monthLengths(year){
    return [36,37,36,37,36,37,36,37,36,isLeapYear(year) ? 38 : 37];
  }

  function validateGregorianDate(year, month, day){
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year &&
           date.getUTCMonth() + 1 === month &&
           date.getUTCDate() === day;
  }

  function dayOfYearFromGregorian(year, month, day){
    if(!validateGregorianDate(year, month, day)){
      throw new Error("Choose a valid Gregorian date.");
    }
    const start = Date.UTC(year, 0, 1);
    const current = Date.UTC(year, month - 1, day);
    return Math.floor((current - start) / MS_PER_DAY) + 1;
  }

  function gregorianFrometric_dayOfYear(year, dayOfYear){
    const date = new Date(Date.UTC(year, 0, dayOfYear));
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate()
    };
  }

  function metricFrometric_dayOfYear(year, dayOfYear){
    const lengths = monthLengths(year);
    let remaining = dayOfYear;
    for(let i = 0; i < lengths.length; i++){
      if(remaining <= lengths[i]){
        return { year, month: i + 1, day: remaining };
      }
      remaining -= lengths[i];
    }
    throw new Error("Day is outside the Metric Calendar year.");
  }

  function dayOfYearFromMetric(year, month, day){
    if(!Number.isInteger(year) || year < 1) throw new Error("Enter a valid Metric year.");
    if(!Number.isInteger(month) || month < 1 || month > 10) throw new Error("Metric month must be 01 through 10.");

    const lengths = monthLengths(year);
    const max = lengths[month - 1];
    if(!Number.isInteger(day) || day < 1 || day > max){
      throw new Error(`Metric month ${pad2(month)} has ${max} days in ${year}.`);
    }

    return lengths.slice(0, month - 1).reduce((sum, value) => sum + value, 0) + day;
  }

  function classifyMetricDate(year, month, day){
    const leap = isLeapYear(year);
    if(month === 10 && leap && day === 38) return "Leap Day / New Year’s Eve";
    if(month % 2 === 0 && day === 37) return month === 10 ? "Bonus Rest Day / New Year’s Eve" : "Bonus Rest Day";
    const metric_day = ((day - 1) % 6) + 1;
    return metric_day <= 4 ? `Focus Day ${metric_day}` : `Rest Day ${metric_day - 4}`;
  }

  function formatMetric(obj){ return `${obj.year}-${pad2(obj.month)}-${pad2(obj.day)}`; }
  function formatGregorian(obj){ return `g${obj.year}-${pad2(obj.month)}-${pad2(obj.day)}`; }

  function convertGregorianToMetric(year, month, day){
    const dayOfYear = dayOfYearFromGregorian(year, month, day);
    const metric = metricFrometric_dayOfYear(year, dayOfYear);
    return {
      gregorian: { year, month, day },
      metric,
      dayOfYear,
      status: classifyMetricDate(metric.year, metric.month, metric.day),
      leap: isLeapYear(year)
    };
  }

  function convertMetricToGregorian(year, month, day){
    const dayOfYear = dayOfYearFromMetric(year, month, day);
    const gregorian = gregorianFrometric_dayOfYear(year, dayOfYear);
    const metric = { year, month, day };
    return {
      gregorian,
      metric,
      dayOfYear,
      status: classifyMetricDate(year, month, day),
      leap: isLeapYear(year)
    };
  }

  function renderResult(target, data, mode){
    if(!target) return;

    const primaryLabel = mode === "metricToGregorian" ? "Gregorian date" : "Metric date";
    const primary = mode === "metricToGregorian" ? formatGregorian(data.gregorian) : formatMetric(data.metric);
    const secondaryLabel = mode === "metricToGregorian" ? "Metric" : "Gregorian";
    const secondary = mode === "metricToGregorian" ? formatMetric(data.metric) : formatGregorian(data.gregorian);

    target.className = "result-box success";
    target.innerHTML = `
      <div class="result-title">${primaryLabel}</div>
      <div class="result-date">${primary}</div>
      <div class="result-secondary">${secondaryLabel}: <strong>${secondary}</strong></div>
    `;
  }

  function renderError(target, message){
    if(!target) return;
    target.className = "result-box error";
    target.innerHTML = `<div class="result-title">Check the date</div><p><strong>${message}</strong></p>`;
  }

  function setToday(){
    const now = new Date();
    const data = convertGregorianToMetric(now.getFullYear(), now.getMonth() + 1, now.getDate());

    document.querySelectorAll("[data-today-metric]").forEach(el => el.textContent = formatMetric(data.metric));
    document.querySelectorAll("[data-today-gregorian]").forEach(el => el.textContent = formatGregorian(data.gregorian));
    document.querySelectorAll("[data-today-status]").forEach(el => el.textContent = data.status);
    document.querySelectorAll("[data-today-month]").forEach(el => el.textContent = `Metric month ${pad2(data.metric.month)}`);
  }

  function initConverter(){
    const result = document.querySelector("[data-converter-result]");
    const toggleButtons = document.querySelectorAll("[data-converter-mode]");
    const gregorianForm = document.querySelector("[data-gregorian-form]");
    const metricForm = document.querySelector("[data-metric-form]");
    const gregorianPanel = document.querySelector("[data-panel-gregorian]");
    const metricPanel = document.querySelector("[data-panel-metric]");
    const gregorianInput = document.querySelector("[data-gregorian-input]");
    const metricYear = document.querySelector("[data-metric-year]");
    const metricMonth = document.querySelector("[data-metric-month]");
    const metric_day = document.querySelector("[data-metric-day]");

    if(!result || !toggleButtons.length) return;

    let mode = "gregorianToMetric";

    function setMode(next){
      mode = next;
      toggleButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.converterMode === mode);
        button.setAttribute("aria-pressed", button.dataset.converterMode === mode ? "true" : "false");
      });
      gregorianPanel.classList.toggle("hidden", mode !== "gregorianToMetric");
      metricPanel.classList.toggle("hidden", mode !== "metricToGregorian");
      result.className = "result-box";
      result.innerHTML = `<div class="result-title">Ready</div><p>Enter a date and select convert.</p>`;
    }

    toggleButtons.forEach(button => button.addEventListener("click", () => setMode(button.dataset.converterMode)));

    const today = new Date();
    if(gregorianInput) gregorianInput.value = `${today.getFullYear()}-${pad2(today.getMonth()+1)}-${pad2(today.getDate())}`;
    if(metricYear) metricYear.value = today.getFullYear();

    gregorianForm?.addEventListener("submit", function(event){
      event.preventDefault();
      try{
        const [year, month, day] = gregorianInput.value.split("-").map(Number);
        renderResult(result, convertGregorianToMetric(year, month, day), "gregorianToMetric");
      }catch(error){
        renderError(result, error.message);
      }
    });

    metricForm?.addEventListener("submit", function(event){
      event.preventDefault();
      try{
        const year = Number(metricYear.value);
        const month = Number(metricMonth.value);
        const day = Number(metric_day.value);
        renderResult(result, convertMetricToGregorian(year, month, day), "metricToGregorian");
      }catch(error){
        renderError(result, error.message);
      }
    });

    setMode(mode);
  }

  function initYearCheck(){
    const input = document.querySelector("[data-year-check]");
    const output = document.querySelector("[data-year-check-output]");
    if(!input || !output) return;

    function update(){
      const year = Number(input.value || new Date().getFullYear());
      const leap = isLeapYear(year);
      const finalMetric = `${year}-10-${leap ? "38" : "37"}`;
      const finalGregorian = `g${year}-12-31`;
      output.innerHTML = `<strong>${year} is a ${leap ? "leap" : "standard"} year.</strong><br>Final Gregorian day: ${finalGregorian}<br>Final Metric day: ${finalMetric}`;
    }

    input.value = new Date().getFullYear();
    input.addEventListener("input", update);
    update();
  }

  document.addEventListener("DOMContentLoaded", function(){
    setToday();
    initConverter();
    initYearCheck();
  });

  window.MetricCalendar = {
    isLeapYear,
    monthLengths,
    convertGregorianToMetric,
    convertMetricToGregorian,
    formatMetric,
    formatGregorian
  };
})();
