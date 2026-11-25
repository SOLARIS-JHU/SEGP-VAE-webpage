import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const output = path.join(root, '_site');
fs.mkdirSync(output, {recursive:true});
for (const item of ['index.html','style.css','main.js','citation.bib','static','LICENSE','NOTICE','.nojekyll']) {
  fs.cpSync(path.join(root,item), path.join(output,item), {recursive:true});
}
console.log('Prepared static GitHub Pages artifact in _site.');
