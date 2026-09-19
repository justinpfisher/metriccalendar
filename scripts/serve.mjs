import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../',import.meta.url));
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.ico':'image/x-icon','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain','.webmanifest':'application/manifest+json'};
const port = Number(process.env.PORT || 4318);
http.createServer(async(req,res)=>{
  try {
    const name = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const file = path.resolve(root,`.${name === '/' ? '/index.html' : name}`);
    if (!file.startsWith(root) || name.split('/').some(p => p.startsWith('.'))) { res.writeHead(403); res.end(); return; }
    const data = await fs.readFile(file);
    res.writeHead(200,{'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'}); res.end(data);
  } catch { res.writeHead(404,{'Content-Type':'text/html'}); res.end(await fs.readFile(path.join(root,'404.html'))); }
}).listen(port,'127.0.0.1',()=>console.log(`Preview at http://127.0.0.1:${port}`));
