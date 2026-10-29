// Exporte chaque .excalidraw en SVG avec le moteur officiel d'Excalidraw (Chromium headless, hors ligne).
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const lib = process.argv[2] || require.resolve('@excalidraw/utils/dist/excalidraw-utils.min.js');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.setContent('<html><body></body></html>');
  await p.addScriptTag({ path: lib });
  for (const f of fs.readdirSync('.').filter(f => f.endsWith('.excalidraw'))) {
    const doc = JSON.parse(fs.readFileSync(f, 'utf8'));
    const svg = await p.evaluate(async (doc) => {
      const el = await ExcalidrawUtils.exportToSvg({ elements: doc.elements, appState: { exportBackground: false, viewBackgroundColor: 'transparent', exportWithDarkMode: false }, files: {} });
      el.querySelectorAll('style').forEach(s => s.remove());
      return el.outerHTML;
    }, doc);
    const out = svg.replace(/font-family="[^"]*"/g, 'font-family="SF Hand, cursive"');
    fs.writeFileSync(f.replace('.excalidraw', '.svg'), out); console.log('svg', f, out.length);
  }
  await b.close();
})();
