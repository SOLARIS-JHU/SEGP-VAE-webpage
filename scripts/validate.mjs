import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';

const root=path.resolve(fileURLToPath(new URL('..',import.meta.url)));
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const body=html.replace(/<script\b[\s\S]*?<\/script>/gi,'');
const errors=[];
const check=(condition,message)=>{if(!condition)errors.push(message);};
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
function checkReference(file,ref){
  if(/^(https?:|mailto:|data:|#|\/\/)/.test(ref))return;
  const target=path.resolve(path.dirname(file),decodeURIComponent(ref.split(/[?#]/)[0]));
  check(target.startsWith(root+path.sep)&&fs.existsSync(target),`Missing or escaping local reference: ${ref}`);
}
for(const m of html.matchAll(/\b(?:href|src|data)="([^"]+)"/g))checkReference(path.join(root,'index.html'),m[1]);
const ids=[...body.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
check(new Set(ids).size===ids.length,'Duplicate HTML IDs');
for(const m of body.matchAll(/\bhref="#([^"]+)"/g))check(ids.includes(m[1]),`Broken anchor ${m[1]}`);
for(const m of body.matchAll(/<img\b[^>]*>/g))check(/\balt="[^"]*"/.test(m[0]),'Missing image alternative');
for(const m of body.matchAll(/<button\b[^>]*>/g))check(/type="button"/.test(m[0]),'Missing button type');
for(const id of ['copy-bibtex','bibtex','copy-status','abstract-animation','toggle-animation','restart-animation'])check(ids.includes(id),`Missing interaction target ${id}`);
for(const field of ['name="description"','rel="canonical"','property="og:image"','name="twitter:card"','name="citation_title"','name="citation_arxiv_id"'])check(html.includes(field),`Missing metadata ${field}`);
check((html.match(/name="citation_author"/g)||[]).length===4,'Citation author count');
const structured=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
check(structured.url==='https://solaris-jhu.github.io/SEGP-VAE-webpage/','Canonical URL');
check(structured.author.length===4,'Structured author count');
const bib=body.match(/<code id="bibtex">([\s\S]*?)<\/code>/)[1].trim();
check(bib===fs.readFileSync(path.join(root,'citation.bib'),'utf8').trim(),'Visible and downloadable BibTeX mismatch');
const katex=createRequire(import.meta.url)(path.join(root,'static/vendor/katex/katex.min.js'));
let mathCount=0;
for(const m of body.matchAll(/\$\$([\s\S]*?)\$\$|\\\(([\s\S]*?)\\\)/g)){
  try {katex.renderToString((m[1]??m[2]).replaceAll('&amp;','&'),{throwOnError:true,displayMode:!!m[1]});mathCount++;}
  catch(e){errors.push(e.message);}
}
let svgCount=0;
for(const file of walk(path.join(root,'static'))){
  if(file.endsWith('.css'))for(const m of fs.readFileSync(file,'utf8').matchAll(/url\(["']?([^"')]+)["']?\)/g))checkReference(file,m[1]);
  if(file.endsWith('.svg')){
    svgCount++;
    const svg=fs.readFileSync(file,'utf8');
    check(!/<script\b|\bon\w+\s*=/.test(svg),`Unexpected active content in ${file}`);
    const svgIds=[...svg.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
    check(new Set(svgIds).size===svgIds.length,`Duplicate SVG IDs ${file}`);
    for(const m of svg.matchAll(/(?:href="#|url\(#)([^"\)]+)/g))check(svgIds.includes(m[1]),`Missing SVG reference ${m[1]}`);
  }
}
const abstract=fs.readFileSync(path.join(root,'static/abstract/graphical-abstract.svg'),'utf8');
const writes=new Map();
const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'static/abstract/graphical-abstract.js'),'utf8'),context);
const svgStub={querySelector(selector){
  check(abstract.includes(`id="${selector.slice(1)}"`),`Missing animation target ${selector}`);
  return {setAttribute(key,value){check(Number.isFinite(Number(value)),`Nonfinite animation value ${key}`);writes.set(`${selector}:${key}`,String(value));}};
}};
context.window.CopipAbstract.render(svgStub,2);
const first=JSON.stringify([...writes]);
context.window.CopipAbstract.render(svgStub,5);
check(first!==JSON.stringify([...writes]),'Animation does not change its targets');
const main=fs.readFileSync(path.join(root,'main.js'),'utf8');
check(main.includes('prefers-reduced-motion')&&main.includes('visibilitychange'),'Motion preference / background pause handling missing');
check(fs.existsSync(path.join(root,'static/og.png')),'Missing social preview');
check(!/TODO|PLACEHOLDER|\[PAPER\]|\[CODE URL\]/.test(body),'Placeholder content');
for(const error of errors)console.error('FAIL:',error);
if(errors.length)process.exitCode=1;
else console.log(`Validated ${mathCount} math expressions, ${svgCount} SVGs, metadata, local links, citation, accessibility hooks, and animation updates.`);
