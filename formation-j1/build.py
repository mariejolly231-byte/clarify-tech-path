"""Assemble le deck en un seul fichier HTML autonome (polices, CSS et JS embarqués).
Avec --apercu, ne garde que les slides marquées data-preview, dans leur ordre."""
import base64, pathlib, re, sys
root = pathlib.Path(__file__).parent
src = root / "src"
dist = pathlib.Path(__file__).parent / "dist"
dist.mkdir(exist_ok=True)
css = (src / "deck.css").read_text(encoding="utf-8")
css = re.sub(r"url\(fonts/([\w.-]+)\)",
             lambda m: "url(data:font/woff2;base64," + base64.b64encode((src / "fonts" / m.group(1)).read_bytes()).decode() + ")", css)
html = (src / "index.html").read_text(encoding="utf-8")
preview = "--apercu" in sys.argv
if preview:
    html = re.sub(r'\s*<!-- TYPE[^>]*-->', "", html)
    html = re.sub(r'  <section class="slide(?:(?!</section>).)*?</section>\n\n', lambda m: m.group(0) if "data-preview" in m.group(0)[:200] else "", html, flags=re.S)
# Typographie française : espace insécable avant : ? ! pour ne jamais les rejeter en début de ligne
html = re.sub(r" ([:?!])(?=[\s<])", "\u00a0\\1", html)
html = html.replace('<link rel="stylesheet" href="deck.css">', "<style>\n" + css + "\n</style>")
html = html.replace('<script src="deck.js"></script>', "<script>\n" + (src / "deck.js").read_text(encoding="utf-8") + "\n</script>")
# Schémas Excalidraw : SVG inséré tel quel dans la page
html = re.sub(r"<!-- schema:([\w-]+) -->", lambda m: re.sub(r"<\?xml[^>]*>", "", (root / "schemas" / (m.group(1) + ".svg")).read_text(encoding="utf-8")), html)
# Infographies : <img src="images/nom.png"> compressée puis embarquée
def embed(m):
    from PIL import Image
    import io
    im = Image.open(src / m.group(1)); im.thumbnail((1800, 1800))
    buf = io.BytesIO(); im.convert("RGBA" if "A" in im.mode else "RGB").save(buf, "WEBP", quality=86)
    return 'src="data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode() + '"'
html = re.sub(r'src="(images/[^"]+)"', embed, html)
assert "http" not in re.sub(r'xmlns="[^"]+"', "", html), "dépendance réseau détectée"
(dist / ("apercu-4-slides.html" if preview else "jour1-deck.html")).write_text(html, encoding="utf-8")
print("ok", len(html) // 1024, "Ko")
