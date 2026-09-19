/* Optional browser QA: install playwright and axe-core, or provide NODE_PATH and QA_AXE_PATH.
   Start scripts/serve.mjs first. BASE_URL may target the deployed site. */
const { chromium } = require('playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const base = process.env.BASE_URL || 'http://127.0.0.1:4318';
const out = process.env.QA_OUTPUT || '.qa';
const axePath = process.env.QA_AXE_PATH || require.resolve('axe-core/axe.min.js');
(async () => {
  await fs.mkdir(out,{recursive:true});
  const pages = JSON.parse(await fs.readFile('content/pages.json','utf8'));
  const browser = await chromium.launch({headless:true,...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
  const context = await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',timezoneId:'America/Toronto'});
  const page = await context.newPage();
  const errors=[], violations=[], layout=[];
  page.on('pageerror',error=>errors.push(error.message));
  for(const width of [1440,768,390,320]) {
    await page.setViewportSize({width,height:width>700?1000:844});
    for(const p of [...pages,{file:'404.html'}]) {
      const response=await page.goto(`${base}/${p.file==='index.html'?'':p.file}`);
      assert.ok(response.status()===200 || (p.file==='404.html' && response.status()===404));
      await page.evaluate(()=>document.fonts.ready);
      const info=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,images:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src)}));
      assert.equal(info.h1,1);
      assert.equal(info.images.length,0);
      if(info.scroll>info.width+1) layout.push({file:p.file,width,scroll:info.scroll});
      if(width===1440 || width===390) {
        await page.addScriptTag({path:axePath});
        const audit=await page.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']}}));
        violations.push(...audit.violations.map(v=>({file:p.file,width,id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
        await page.screenshot({path:path.join(out,`${p.file.replace('.html','')}-${width}.png`),fullPage:true});
      }
    }
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto(base+'/');
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').textContent(),'Skip to content');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').getAttribute('id'),'main');
  await page.getByRole('button',{name:/Menu/}).click();
  assert.equal(await page.locator('#main-nav').isVisible(),true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#main-nav').isVisible(),false);
  assert.equal(await page.locator(':focus').getAttribute('aria-controls'),'main-nav');

  await page.goto(base+'/converter.html?date=2028-12-31&from=gregorian');
  assert.equal(await page.locator('.result-date').textContent(),'2028-10-38');
  assert.match(await page.locator('#conversion-result').textContent(),/Leap Day \/ New Year’s Eve/);
  await page.getByRole('button',{name:'Metric → Gregorian',exact:true}).click();
  assert.equal(await page.locator('#metric-day').inputValue(),'38');
  assert.equal(await page.locator('.result-date').textContent(),'g2028-12-31');
  await page.locator('#metric-year').fill('2026');
  assert.equal(await page.locator('#metric-day').getAttribute('max'),'37');
  assert.equal(await page.locator('#result-actions').isVisible(),false);
  await page.getByRole('button',{name:/Convert date/}).click();
  assert.match(await page.locator('#input-error').textContent(),/37 days/);
  assert.equal(await page.locator('#metric-day').getAttribute('aria-invalid'),'true');
  assert.equal(await page.locator(':focus').getAttribute('id'),'metric-day');
  await page.locator('#metric-day').fill('37');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('.result-date').textContent(),'g2026-12-31');
  await page.locator('#metric-year').fill('1');
  await page.locator('#metric-month').selectOption('1');
  await page.locator('#metric-day').fill('1');
  await page.getByRole('button',{name:/Convert date/}).click();
  assert.equal(await page.locator('.result-date').textContent(),'g0001-01-01');
  assert.match(await page.locator('#share-result').getAttribute('href'),/date=0001-01-01&from=metric/);
  await context.grantPermissions(['clipboard-read','clipboard-write']);
  await page.locator('#copy-result').click();
  await page.waitForFunction(()=>document.querySelector('#copy-status').textContent.length>0);
  assert.match(await page.locator('#copy-status').textContent(),/copied/);
  assert.match(await page.evaluate(()=>navigator.clipboard.readText()),/g0001-01-01 = 0001-01-01/);
  await page.getByRole('button',{name:'Bonus Rest Day',exact:true}).click();
  assert.equal(await page.locator('.result-date').textContent(),'2026-02-37');
  await page.getByRole('button',{name:'February 29',exact:true}).click();
  assert.equal(await page.locator('.result-date').textContent(),'2028-02-24');
  await page.locator('#gregorian-date').fill('');
  await page.getByRole('button',{name:/Convert date/}).click();
  assert.match(await page.locator('#input-error').textContent(),/valid Gregorian/);
  await page.getByRole('button',{name:'Use today',exact:true}).click();
  const expected=await page.evaluate(()=>{const d=new Date();return MetricCalendar.formatMetric(MetricCalendar.convertGregorianToMetric(d.getFullYear(),d.getMonth()+1,d.getDate()).metric)});
  assert.equal(await page.locator('.result-date').textContent(),expected);
  await page.goto(base+'/converter.html?date=2100-02-29&from=gregorian');
  assert.match(await page.locator('#input-error').textContent(),/28 days/);
  assert.equal(await page.locator('#result-actions').isVisible(),false);
  await page.goto(base+'/converter.html?date=%3Cscript%3E&from=bad');
  assert.match(await page.locator('#input-error').textContent(),/invalid date/);
  await page.goto(base+'/faq.html#leap');
  assert.equal(await page.locator('#leap').getAttribute('open'),'');
  const missing=await page.goto(base+'/nonexistent-check-page');
  assert.equal(missing.status(),404);
  assert.match(await page.locator('h1').textContent(),/can’t be found/);
  const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const staticPage=await noJS.newPage();
  await staticPage.goto(base+'/');
  assert.equal(await staticPage.locator('#main-nav').isVisible(),true);
  assert.equal(await staticPage.locator('.mini-calendar td').count(),36);
  assert.equal(await staticPage.locator('.hero-calendar [aria-current="date"]').count(),0);
  assert.match(await staticPage.locator('.calendar-top .eyebrow').textContent(),/Example/);
  await staticPage.goto(base+'/converter.html');
  assert.match(await staticPage.locator('noscript').textContent(),/needs JavaScript/);
  await noJS.close();
  const local=await browser.newContext({timezoneId:'America/Los_Angeles'});
  const localPage=await local.newPage();
  await localPage.clock.install({time:new Date('2028-01-01T03:00:00Z')});
  await localPage.goto(base+'/');
  assert.equal(await localPage.locator('[data-today-gregorian]').textContent(),'g2027-12-31');
  assert.equal(await localPage.locator('[data-today-metric]').textContent(),'2027-10-37');
  assert.equal(await localPage.locator('.hero-calendar [aria-current="date"]').count(),1);
  assert.match(await localPage.locator('.hero-calendar [aria-current="date"]').textContent(),/37.*Today/);
  // Exercise changing day types and month lengths in an already-open homepage.
  const dates = [
    ['2026-01-05','2026-01-05','Rest Day 1',0],
    ['2026-02-05','2026-01-36','Rest Day 2',0],
    ['2026-02-06','2026-02-01','Focus Day 1',1],
    ['2026-03-14','2026-02-37','Bonus Rest Day',1],
    ['2026-09-19','2026-08-07','Focus Day 1',1],
    ['2026-12-31','2026-10-37','Bonus Rest Day / New Year’s Eve',1],
    ['2028-12-30','2028-10-37','Bonus Rest Day',2],
    ['2028-12-31','2028-10-38','Leap Day / New Year’s Eve',2]
  ];
  for (const [date,metric,status,extras] of dates) {
    await localPage.clock.setSystemTime(new Date(date+'T20:00:00Z'));
    await localPage.evaluate(()=>window.dispatchEvent(new Event('focus')));
    assert.equal(await localPage.locator('.hero-calendar [aria-current="date"]').count(),1);
    assert.equal(await localPage.locator('.hero-calendar [aria-current="date"]').evaluate(el=>el.tagName==='TD'?el.textContent:el.querySelector('.bonus-number').textContent),metric.slice(-2));
    assert.equal(await localPage.locator('.calendar-heading h2').textContent(),'Metric month '+metric.slice(5,7));
    assert.equal(await localPage.locator('.calendar-top .small-label').textContent(),metric.slice(5,7)+' / 10');
    assert.equal(await localPage.locator('.hero-calendar .bonus-strip').count(),extras);
    assert.equal(await localPage.locator('#calendar-caption strong').textContent(),`Today: ${metric} · ${status}`);
  }
  // A visible tab updates across midnight without a reload or focus event.
  for (const [before,after] of [['2028-01-01T07:59:59.500Z','2028-01-01'],['2029-01-01T07:59:59.500Z','2029-01-01']]) {
    await localPage.clock.setSystemTime(new Date(before));
    await localPage.reload();
    await localPage.clock.runFor(1000);
    assert.equal(await localPage.locator('[data-today-metric]').textContent(),after);
    assert.equal(await localPage.locator('.hero-calendar [aria-current="date"]').textContent(),'01');
    assert.equal(await localPage.locator('.hero-calendar .bonus-strip').count(),0);
  }
  await local.close();
  const east=await browser.newContext({timezoneId:'Asia/Tokyo'});
  const eastPage=await east.newPage();
  await eastPage.clock.install({time:new Date('2028-01-01T03:00:00Z')});
  await eastPage.goto(base+'/');
  assert.equal(await eastPage.locator('[data-today-metric]').textContent(),'2028-01-01');
  assert.equal(await eastPage.locator('.hero-calendar [aria-current="date"]').textContent(),'01');
  await east.close();
  await fs.writeFile(path.join(out,'browser-report.json'),JSON.stringify({base,pages:9,widths:[1440,768,390,320],errors,layout,violations},null,2));
  await browser.close();
  console.log(JSON.stringify({pages:9,widths:4,errors,layout,violations},null,2));
  assert.equal(errors.length,0,'Browser exceptions');
  assert.equal(layout.length,0,'Horizontal overflow');
  assert.equal(violations.length,0,'Accessibility violations');
  console.log('Browser interactions, no-JavaScript access, clipboard, local-date handling, and accessibility checks passed.');
})().catch(error=>{console.error(error);process.exit(1)});
