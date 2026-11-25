// Copies published assets only; does not synthesize experimental results.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const commit = '44cb56fc3408ed0cb08db3f85aee13d18d731aae';
const raw = `https://raw.githubusercontent.com/SOLARIS-JHU/solaris-website/${commit}/`;
async function get(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return new Uint8Array(await response.arrayBuffer());
}
await mkdir(path.join(root, 'static/abstract'), { recursive: true });
await mkdir(path.join(root, 'static/figures'), { recursive: true });
await writeFile(path.join(root, 'static/abstract/graphical-abstract.svg'),
  await get(raw + 'static/images/papers/v13/arxiv-2604.09331.svg'));
const gallery = new TextDecoder().decode(await get(raw + 'static/js/paper-abstracts-v13.js'));
const marker = '"v10-gpvae":';
const start = gallery.indexOf(marker) + marker.length;
const end = gallery.indexOf('\n"v10-cbd":', start);
if (start < marker.length || end <= start) throw new Error('Expected v13 GP-VAE updater not found.');
const updater = gallery.slice(start, end).replace(/,\s*$/, '');
const script = `/* Exact v13 GP-VAE updater copied from SOLARIS papers gallery.\n * Source: static/js/paper-abstracts-v13.js, blob ad22efa8b90b6bd40580744a7e9c1626ce8f447a.\n * Geometry is the unchanged matching v13 SVG. Playback is owned by main.js.\n */\nwindow.CopipAbstract = Object.freeze({\n  initialTime: 2,\n  render: ${updater}\n});\n`;
await writeFile(path.join(root, 'static/abstract/graphical-abstract.js'), script);

const figures = [
  ['fig2-training.svg', 'kl_l1_split_curve.svg'],
  ['fig3-covariance.png', 'Figures/Cov_comp.png'],
  ['fig4-prior-posterior.svg', 'evaluate_mse_var_0590.svg'],
  ['fig5-ablation.png', 'Figures/Ablation1.png'],
  ['fig6-segp-posterior.png', 'Figures/evaluate_paper_0590_posterior.png'],
  ['fig7-mlp2-posterior.png', 'Figures/MLP.png'],
  ['fig8-pegp-posterior.png', 'Figures/nostab.png'],
  ['fig9-nreg-posterior.png', 'Figures/noreg.png'],
  ['fig10-reconstruction.png', 'evaluate_paper_0590.png'],
];
for (const [filename, source] of figures) {
  await writeFile(path.join(root, 'static/figures', filename),
    await get('https://arxiv.org/html/2604.09331v2/' + source));
}
console.log('Copied the pinned SOLARIS scene and original arXiv v2 figures.');
