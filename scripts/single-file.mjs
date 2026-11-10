// Inlines the built JS + CSS into one self-contained file: dist/standalone.html
// That file opens straight from disk (file://) and still talks to Supabase.
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const indexPath = path.join(dist, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const readAsset = (href) => fs.readFileSync(path.join(dist, href.replace(/^\.?\//, '')), 'utf8');

let script = '';
html = html.replace(/<script[^>]*src="([^"]+)"[^>]*><\/script>/g, (_m, src) => {
  script = readAsset(src).replace(/<\/script>/gi, '<\\/script>');
  return '';
});

html = html.replace(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g, (_m, href) => {
  return `<style>${readAsset(href)}</style>`;
});

// Drop modulepreload hints — the bundle is already inline.
html = html.replace(/<link[^>]*rel="modulepreload"[^>]*>/g, '');

if (!script) throw new Error('No bundle script found in dist/index.html');

// Classic (non-module) inline script, placed after #root so it runs against a real DOM.
html = html.replace('</body>', `    <script>\n${script}\n    </script>\n  </body>`);

fs.writeFileSync(path.join(dist, 'standalone.html'), html);
console.log(
  `standalone.html written — ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB, no external assets except the font.`
);
