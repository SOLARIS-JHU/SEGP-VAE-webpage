// Rasterizes the unchanged graphical abstract with ImageMagick 7.
// Temporary xlink aliases preserve SVG2 glyph references in its legacy renderer.
import { readFile, writeFile, copyFile, mkdtemp, unlink, rmdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const folder = await mkdtemp(path.join(tmpdir(), 'copip-social-'));
try {
  const original = await readFile(path.join(root, 'static/abstract/graphical-abstract.svg'), 'utf8');
  const legacy = original.replace('<svg xmlns="http://www.w3.org/2000/svg"',
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"')
    .replaceAll(' href="#', ' xlink:href="#');
  const temporary = path.join(folder, 'abstract.svg');
  await writeFile(temporary, legacy);
  execFileSync('magick', ['-background', 'white', '-density', '150', temporary,
    '-resize', '1520x784', path.join(root, 'static/abstract/graphical-abstract-preview.png')]);
  execFileSync('magick', [path.join(root, 'static/abstract/graphical-abstract-preview.png'),
    '-resize', '1200x619', '-background', 'white', '-gravity', 'center', '-extent', '1200x630',
    path.join(root, 'static/abstract/social-preview.png')]);
  await copyFile(path.join(root, 'static/abstract/social-preview.png'), path.join(root, 'static/og.png'));
  console.log('Rendered graphical-abstract-preview.png, social-preview.png and static/og.png.');
} finally {
  // Only remove the known temporary file and now-empty unique directory.
  await unlink(path.join(folder, 'abstract.svg')).catch(() => {});
  await rmdir(folder);
}
