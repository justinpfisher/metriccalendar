import {readFile,access,readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('../',import.meta.url));
const pages=JSON.parse(await readFile(path.join(root,'content/pages.json'),'utf8'));
const origin='https://metriccalendar.org';
let links=0;
const titles=new Set(), descriptions=new Set();
const cache=new Map();
for(const p of [...pages,{file:'404.html'}]) cache.set('/'+p.file,await readFile(path.join(root,p.file),'utf8'));
for(const p of [...pages,{file:'404.html'}]) {
  const html=cache.get('/'+p.file);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`${p.file}: duplicate IDs`);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,`${p.file}: exactly one H1`);
  assert.match(html,/<html lang="en-CA">/);
  const title=html.match(/<title>(.*?)<\/title>/)[1];
  const description=html.match(/<meta name="description" content="([^"]+)"/)[1];
  assert.ok(!titles.has(title)); titles.add(title);
  assert.ok(!descriptions.has(description)); descriptions.add(description);
  if(p.file!=='404.html') {
    const canonical=origin+'/'+(p.file==='index.html'?'':p.file);
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}">`));
    assert.ok(html.includes(`<meta property="og:url" content="${canonical}">`));
  } else assert.match(html,/<meta name="robots" content="noindex">/);
  const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(schema['@context'],'https://schema.org');
  assert.ok(schema['@graph'].some(n=>n['@type']==='WebPage' && n.name===p.title || p.file==='404.html'));
  for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const raw=match[1].replaceAll('&amp;','&');
    if(raw.startsWith('http')) continue;
    const u=new URL(raw,`${origin}/${p.file}`);
    const filename=u.pathname==='/'?'/index.html':u.pathname;
    await access(path.join(root,filename));
    if(u.hash) {
      const target=cache.get(filename)||await readFile(path.join(root,filename),'utf8');
      assert.ok(target.includes(`id="${decodeURIComponent(u.hash.slice(1))}"`),`${p.file}: missing anchor ${raw}`);
    }
    links++;
  }
  for(const img of html.matchAll(/<img\b[^>]*>/g)) assert.match(img[0],/\balt="/);
}
const sitemap=await readFile(path.join(root,'sitemap.xml'),'utf8');
const listed=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]).sort();
assert.deepEqual(listed,pages.map(p=>origin+'/'+(p.file==='index.html'?'':p.file)).sort());
assert.equal((await readFile(path.join(root,'CNAME'),'utf8')).trim(),'metriccalendar.org');
assert.match(await readFile(path.join(root,'robots.txt'),'utf8'),/User-agent: \*\s+Allow: \/\s+Sitemap: https:\/\/metriccalendar.org\/sitemap.xml/);
await access(path.join(root,'.nojekyll'));
const manifest=JSON.parse(await readFile(path.join(root,'assets/favicons/site.webmanifest'),'utf8'));
for(const icon of manifest.icons) await access(path.join(root,'assets/favicons',icon.src));
for(const name of ['converter.html','faq.html','rationale.html','index.html']) assert.ok(cache.has('/'+name));
console.log(`Checked ${cache.size} pages, ${links} local links/assets/anchors, unique metadata, JSON-LD, sitemap, crawler access, and Pages configuration.`);
