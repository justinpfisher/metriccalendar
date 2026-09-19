import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const pages = JSON.parse(await readFile(path.join(root, 'content/pages.json'), 'utf8'));
const base = 'https://metriccalendar.org';
const esc = s => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const url = p => `${base}/${p.file === 'index.html' ? '' : p.file}`;
function diagrams(body) {
  const headings = [1,2,3,4,5,6].map(n => `<th scope="col">${n < 5 ? 'Focus' : 'Rest'}<span>${n < 5 ? n : n-4}</span></th>`).join('');
  const rows = Array.from({length:6},(_,w)=>`<tr>${Array.from({length:6},(_,d)=>`<td${d>3?' class="rest"':''}>${String(w*6+d+1).padStart(2,'0')}</td>`).join('')}</tr>`).join('');
  const month = `<table class="mini-calendar"><caption class="sr-only">Six metric weeks: four Focus Days then two Rest Days in each row</caption><thead><tr>${headings}</tr></thead><tbody>${rows}</tbody></table>`;
  const year = Array.from({length:10},(_,i)=>`<div class="year-month${i%2?' even':''}"><div class="month-label">${String(i+1).padStart(2,'0')}<small>Month</small></div><div class="month-ticks" aria-hidden="true">${'<i></i>'.repeat(36)}</div><span class="month-days">${i===9?'37 / 38 days':`${i%2?37:36} days`}</span></div>`).join('');
  return body.replace('<div class="month-diagram" data-static-month></div>',`<div class="month-diagram">${month}</div>`).replace('<div class="year-diagram" aria-label="Metric month lengths" data-year-diagram></div>',`<div class="year-diagram" role="group" aria-label="Metric month lengths">${year}</div>`);
}
function nav(p, footer = false) {
  return pages.filter(item => footer || !['index.html','about.html'].includes(item.file)).map(item => `<a href="/${item.file === 'index.html' ? '' : item.file}"${p.file === item.file ? ' aria-current="page"' : ''}>${item.label}</a>`).join('\n');
}
function render(p, body) {
  const data = { '@context':'https://schema.org', '@graph':[
    {'@type':'WebSite','@id':`${base}/#website`,url:`${base}/`,name:'Metric Calendar',inLanguage:'en-CA'},
    {'@type':'WebPage','@id':`${url(p)}#webpage`,url:url(p),name:p.title,description:p.description,inLanguage:'en-CA',isPartOf:{'@id':`${base}/#website`},author:{'@type':'Person',name:'J. Fisher'}},
    ...(p.file === 'index.html' || p.file === '404.html' ? [] : [{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:`${base}/`},{'@type':'ListItem',position:2,name:p.label,item:url(p)}]}])
  ]};
  return `<!doctype html>
<html lang="en-CA">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(p.title)}</title>
  <meta name="description" content="${esc(p.description)}">
  <meta name="author" content="J. Fisher / MetricCalendar.org">
  <meta name="theme-color" content="#0B1D3A">
  ${p.file === '404.html' ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url(p)}">`}
  <meta property="og:title" content="${esc(p.title)}">
  <meta property="og:description" content="${esc(p.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url(p)}">
  <meta property="og:site_name" content="Metric Calendar">
  <meta property="og:locale" content="en_CA">
  <meta property="og:image" content="${base}/assets/social-card.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Metric Calendar: 10 months, 6-day metric weeks, 5 Bonus Rest Days. A calendar proposal.">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/assets/favicons/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png">
  <link rel="apple-touch-icon" href="/assets/favicons/apple-touch-icon.png">
  <link rel="manifest" href="/assets/favicons/site.webmanifest">
  <link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/styles.css?v=3">
  <script type="application/ld+json">${JSON.stringify(data).replaceAll('<','\\u003c')}</script>
  <script defer src="/calendar.js?v=2"></script>
  <script defer src="/script.js?v=3"></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="container nav-shell">
    <a class="brand" href="/" aria-label="Metric Calendar home"><img src="/assets/logos/metric-calendar-logo-horizontal.png" alt="Metric Calendar" width="420" height="140"></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" hidden>Menu <span aria-hidden="true">☰</span></button>
    <nav id="main-nav" class="nav-links" aria-label="Main navigation">${nav(p)}</nav>
  </div>
</header>
<main id="main" tabindex="-1">
${p.file === 'index.html' ? '' : `<div class="page-intro container"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>${p.label}</span></nav><p class="eyebrow">${p.eyebrow}</p><h1>${esc(p.heading).replaceAll('\n','<br>')}</h1><p class="lead">${p.intro}</p></div>`}
${p.toc ? `<div class="container reading-layout"><aside class="contents"><nav aria-label="On this page"><p class="eyebrow">On this page</p>${p.toc.map(([id,title])=>`<a href="#${id}">${title}</a>`).join('')}</nav><a class="contents-cta" href="/converter.html">Try a date <span aria-hidden="true">↗</span></a></aside><div class="article-body">${body}</div></div>` : body}
</main>
<footer class="site-footer"><div class="container"><div class="footer-grid"><div class="footer-about"><img src="/assets/logos/metric-calendar-logo-icon.png" alt="" width="56" height="56"><p class="footer-title">A different rhythm.<br>The same shared year.</p><p>A calendar proposal by<br>J. Fisher / MetricCalendar.org.</p></div><nav aria-label="Footer navigation">${nav(p,true)}</nav><div class="footer-note"><p class="eyebrow">Explore with an open mind</p><p>The rules are defined. The wider benefits are questions to test.</p><a href="/rationale.html#limitations">Read the limitations <span aria-hidden="true">↗</span></a></div></div><div class="footer-bottom"><span>Shared for common public use with attribution.</span><a href="https://github.com/justinpfisher/metriccalendar">Source on GitHub <span aria-hidden="true">↗</span></a></div></div></footer>
</body>
</html>
`;
}
for (const p of pages) await writeFile(path.join(root,p.file),render(p,diagrams(await readFile(path.join(root,'content',p.file),'utf8'))));
await writeFile(path.join(root,'404.html'),render({file:'404.html',label:'Page not found',title:'Page not found | Metric Calendar',description:'Find your way back to the Metric Calendar.',eyebrow:'404 · Page not found',heading:'A date can be converted.\nThis page can’t be found.',intro:'The address may be incomplete or the page may have moved.'},'<div class="container error-actions"><a class="btn primary" href="/">Return home</a><a class="btn secondary" href="/converter.html">Open the converter</a></div>'));
await writeFile(path.join(root,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p=>`  <url><loc>${url(p)}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`Built ${pages.length} pages, 404.html, and sitemap.xml.`);
