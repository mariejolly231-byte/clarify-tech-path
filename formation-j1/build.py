"""Assemble le deck en un seul fichier HTML autonome (polices, CSS et JS embarqués)."""
import base64, pathlib, re
src = pathlib.Path(__file__).parent / "src"
dist = pathlib.Path(__file__).parent / "dist"
dist.mkdir(exist_ok=True)
css = (src / "deck.css").read_text(encoding="utf-8")
css = re.sub(r"url\(fonts/([\w.-]+)\)",
             lambda m: "url(data:font/woff2;base64," + base64.b64encode((src / "fonts" / m.group(1)).read_bytes()).decode() + ")", css)
html = (src / "index.html").read_text(encoding="utf-8")
html = html.replace('<link rel="stylesheet" href="deck.css">', "<style>\n" + css + "\n</style>")
html = html.replace('<script src="deck.js"></script>', "<script>\n" + (src / "deck.js").read_text(encoding="utf-8") + "\n</script>")
assert "http" not in re.sub(r'xmlns="[^"]+"', "", html), "dépendance réseau détectée"
(dist / "jour1-deck.html").write_text(html, encoding="utf-8")
print("ok", len(html) // 1024, "Ko")
