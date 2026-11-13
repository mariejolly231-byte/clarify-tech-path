// Export PDF du deck : une image par slide, tous les éléments révélés, compressée pour rester légère.
// Usage : node outils/pdf-deck.js  (depuis formation-j1/, après python3 build.py)
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path'), os = require('os');
(async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'deck-pdf-'));
  const b = await chromium.launch();
  // On retire d'abord le PDF intégré lors d'une génération précédente, pour ne pas l'embarquer deux fois
  const HTML = path.resolve('dist/jour1-deck.html');
  fs.writeFileSync(HTML, fs.readFileSync(HTML, 'utf8').replace(/<script type="text\/plain" id="pdf-deck">[^<]*<\/script>\n?/, ''));
  const p = await (await b.newContext({ viewport: { width: 1920, height: 1080 }, offline: true })).newPage();
  await p.goto('file://' + path.resolve('dist/jour1-deck.html') + '#1');
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  await p.addStyleTag({ content: '.toolbar,.toast,.cover-actions,.notes,.help{display:none!important}' });
  const n = await p.evaluate(() => document.querySelectorAll('.slide').length);
  for (let i = 1; i <= n; i++) {
    await p.evaluate((i) => { location.hash = '#' + i; }, i); await p.waitForTimeout(250);
    await p.evaluate(() => document.querySelectorAll('.slide.is-active .frag').forEach((f) => f.classList.add('is-shown')));
    await p.waitForTimeout(150);
    await p.screenshot({ path: path.join(tmp, String(i).padStart(3, '0') + '.png') });
  }
  await b.close();
  execFileSync('python3', ['-c', `
import sys, glob
from PIL import Image
fs = sorted(glob.glob(sys.argv[1] + '/*.png'))
ims = [Image.open(f).convert('RGB').resize((1600, 900), Image.LANCZOS) for f in fs]
ims[0].save(sys.argv[2], save_all=True, append_images=ims[1:], resolution=96, quality=72)
print(len(ims), 'pages')
`, tmp, 'dist/jour1-deck.pdf'], { stdio: 'inherit' });
  // Le PDF complet voyage dans le fichier HTML : le bouton d'export le télécharge même hors de claude.ai, sans passer par l'impression
  const b64 = fs.readFileSync('dist/jour1-deck.pdf').toString('base64');
  const html = fs.readFileSync(HTML, 'utf8');
  const at = html.lastIndexOf('</body>');
  fs.writeFileSync(HTML, html.slice(0, at) + '<script type="text/plain" id="pdf-deck">' + b64 + '</script>\n' + html.slice(at));
  console.log('PDF intégré au HTML (' + Math.round(b64.length / 1e6 * 10) / 10 + ' Mo en base64)');
})();
