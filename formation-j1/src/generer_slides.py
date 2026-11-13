# Générateur des slides du jour 1 : écrit src/index.html à partir des contenus ci-dessous.
# Lancer depuis formation-j1/ : python3 src/generer_slides.py, puis python3 build.py
import pathlib
import re
S = []
# Chapitre 2 : en haut à droite, un repère dit de quoi parle la slide (mêmes couleurs que la légende de l'atelier)
TOPIC = {"three-lines": "asm", "Tout part d'un": "asm", "L\'automatisation <span": "a", "Le modèle, l'inférence": "sg", "Ce qu'on paramètre": "sg",
         "Pourquoi l'assistant": "s", "Un assistant <span": "s", "Assistant ou agent :": "sg", "tu gardes la main": "s", "poursuit un objectif</span>, dans": "g",
         "Assistant, automatisation ou agent ?": "asm", "Le harnais complet": "sg"}
def topic_mark(body):
    code = next((v for k, v in TOPIC.items() if k in body), None)
    if not code:
        return ""
    items = [("a", "Automatisation", "lav"), ("s", "Assistant", "mint"), ("g", "Agent", "blush")]
    on = set(code.replace("m", "g") if code == "am" else code)
    if code == "am": on = {"a", "s"}
    if code == "asm": on = {"a", "s", "g"}
    return '<div class="topic" aria-label="Sur cette slide">' + "".join(f'<span class="t-{c}{" is-on" if k in on else ""}">{n}</span>' for k, n, c in items) + "</div>"

# Couleurs : une seule par défaut (le vert menthe de la charte). Une slide qui parle d'une seule logique prend sa couleur
# (assistant menthe, automatisation lavande, agent rose). Les slides qui comparent les logiques gardent leurs couleurs.
TONE_FILL = {None: "mint", "assist": "mint", "auto": "lav", "agent": "blush"}
TONE_HEX = {None: "#D6F1E6", "assist": "#D6F1E6", "auto": "#E6E0F4", "agent": "#FCE4E8"}
TONE_BY_MARK = [("three-lines", "keep"), ("Tout part d'un", "keep"), ("Assistant ou agent :", "keep"), ("Quelle brique", "keep"),
                ("l'arbre en direct", "keep"), ("Assistant, automatisation ou agent ?", "keep"), ("Vos situations, classées", "keep"),
                ("Sur vos cas", "keep"), ("jusqu'où brancher", "keep"), ("L'automatisation <span", "auto"), ("tu gardes la main", "assist"),
                ("Pourquoi l'assistant", "assist"), ("Un assistant <span", "assist"), ("poursuit un objectif</span>, dans", "agent")]
def tone_colors(body):
    tone = next((t for k, t in TONE_BY_MARK if k in body), None)
    if tone == "keep":
        return body
    f = TONE_FILL[tone]
    body = re.sub(r'\bfill-(sky|lav|blush|teal|lemon|mint)\b', "fill-" + f, body)
    body = re.sub(r'\bmark--(sky|lav|blush|teal|lemon|mint)\b', "mark--" + f, body)
    body = re.sub(r'#(D5EAEC|DCEEFA|E6E0F4|FCE4E8|FFF3C4|D6F1E6)\b', TONE_HEX[tone], body, flags=re.I)
    return body

def slide(body, seq=None, section="", cls="", notes="", preview=False):
    # Les illustrations se placent par rapport à la slide : on les sort des blocs où elles ont été écrites
    import re
    arts = re.findall(r'\n?\s*<figure class="art[^"]*"[^>]*>.*?</figure>', body, re.S)
    for x in arts: body = body.replace(x, "")
    body += "".join("\n    " + x.strip() for x in arts)
    # Règle de la maison : rien au-dessus du titre. Ni surtitre, ni étiquette en pastille.
    # Les consignes d'animation (en sous-groupes, selon les licences) passent en une ligne sous le titre,
    # et le repère de chapitre vit dans le pied de page.
    body = re.sub(r'\s*<p class="eyebrow">.*?</p>', '', body, flags=re.S)
    tags = re.findall(r'<span class="tag[^"]*">(.*?)</span>', body, re.S)
    if tags:
        body = re.sub(r'\s*<div class="meta">.*?</div>', '', body, flags=re.S)
        body = re.sub(r'\s*<span class="tag[^"]*">.*?</span>', '', body, flags=re.S)
        line = " · ".join(re.sub(r"<svg.*?</svg>", "", t, flags=re.S).strip() for t in tags)
        body = body.replace("</h2>", f'</h2>\n    <p class="howto">{line}</p>', 1)
    if seq and "slide--full" not in cls:
        section = f"Chapitre {seq} · {CHAPTERS[seq - 1][1]}"
    body = tone_colors(body)
    if seq == 2:
        body += "\n    " + topic_mark(body)
    a = f' data-seq="{seq}"' if seq else ""
    a += f' data-section="{section}"'
    S.append(f'''  <section class="slide {cls}"{a} aria-roledescription="slide">
{body}
    <aside class="notes">{notes}</aside>
  </section>
''')
def icon(n): return f'<svg aria-hidden="true"><use href="#i-{n}"/></svg>'
def shot(need, kind="Capture à fournir", src=None, style=""):
    inner = f'<img src="{src}" alt="{need}">' if src else f'<p class="need"><b>{kind}</b>{need}</p>'
    return f'<figure class="shot sk" style="{style}">{inner}</figure>'
# Illustrations du samoyède : vidéo en boucle si elle existe, sinon image fixe, sinon le dessin
# de secours, sinon un cadre « à générer » qui indique le nom de fichier attendu (voir PROMPTS-IMAGES.md)
IMG = pathlib.Path("src/images")
def art(name, alt, box, fallback=""):
    r, b, w, h = box
    pos = f"right:{r}px;bottom:{b}px;width:{w}px;height:{h}px"
    band = " art--band" if w / h >= 2.4 else ""
    still = next((f"images/{name}.{e}" for e in ("png", "jpg", "webp") if (IMG / f"{name}.{e}").exists()), None)
    clip = next((f"images/{name}.{e}" for e in ("webm", "mp4") if (IMG / f"{name}.{e}").exists()), None)
    if clip:
        poster = f' poster="{still}"' if still else ""
        return f'<figure class="art{band}" style="{pos}"><video class="art-media" autoplay muted loop playsinline{poster} aria-label="{alt}"><source src="{clip}"></video></figure>'
    if still:
        return f'<figure class="art{band}" style="{pos}"><img class="art-media" src="{still}" alt="{alt}"></figure>'
    if fallback:
        return fallback
    return f'<figure class="art art--todo" style="{pos}" aria-hidden="true"><p><b>Illustration à générer</b>{name}.png</p></figure>'
# Illustrations en pleine scène (décor et texte inclus) : posées comme une carte, assez grandes pour être lues
def pic(name, alt, w, h, style=""):
    src = next((f"images/{name}.{e}" for e in ("png", "jpg", "webp") if (IMG / f"{name}.{e}").exists()), None)
    box = f"width:{w}px;height:{h}px;{style}"
    if not src:
        return f'<figure class="pic pic--todo" style="{box}" aria-hidden="true"><p><b>Illustration à générer</b>{name}.png</p></figure>'
    return f'<figure class="pic" style="{box}"><img src="{src}" alt="{alt}"></figure>'
def infog(file, need):
    return shot(need, "Infographie à insérer", f"images/{file}" if (IMG / file).exists() else None)
def logo(name, file=None):
    inner = f'<img src="images/{file}" alt="{name}">' if file else f'{name}<span class="ph">logo</span>'
    return f'<span class="logo sk">{inner}</span>'
def timer(default=10, presets=(5, 10, 15, 20)):
    bs = "".join(f'<button class="sk sk--thin" value="{p}" aria-pressed="false"{" data-default" if p == default else ""}>{p} min</button>' for p in presets)
    return f'''<div class="timer sk" role="group" aria-label="Minuteur">
        <svg class="timer-ring" viewBox="0 0 64 64" aria-hidden="true"><circle class="bg" cx="32" cy="32" r="26"/><circle class="fg" cx="32" cy="32" r="26"/></svg>
        <span class="clock" aria-live="off">0:00</span>
        <div class="presets">{bs}</div>
        <button class="go sk sk--thin">Lancer</button>
      </div>'''

# Sources : chaque nom de source renvoie vers sa page (lien discret, même apparence)
SRC_URLS = [("Banque de France", "https://www.banque-france.fr/fr/publications-et-statistiques/publications/lia-sinstalle-dans-les-entreprises-francaises-une-diffusion-rapide-mais-des-gains-de-productivite"),
            ("Baromètre France Num", "https://www.entreprises.gouv.fr/espace-presse/barometre-france-num-2026-quatre-tpe-pme-sur-dix-utilisent-desormais-lintelligence"),
            ("Malt Tech Trends", "https://www.malt.com/resources/trends/malt-tech-trends/ai"),
            ("Work Trend Index", "https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization"),
            ("OpenAI, février 2026", "https://www.roic.ai/news/openais-chatgpt-surpasses-900-million-weekly-users-50-million-paying-subscribers-02-27-2026"),
            ("Workday", "https://investor.workday.com/files/doc_news/New-Workday-Research-Companies-Are-Leaving-AI-Gains-on-the-Table-2026.pdf"),
            ("Liu et al.", "https://arxiv.org/abs/2307.03172")]
def srclink(text, url=None):
    url = url or next((u for k, u in SRC_URLS if k in text), None)
    return f'<a class="src-link" href="{url}" target="_blank" rel="noopener">{text}</a>' if url else text
def tip(text, source, cls=""):
    return f'''<aside class="tip sk sk--thin {cls}"><svg class="bulb" viewBox="0 0 40 52" aria-hidden="true"><path d="M20 4c-9 0-15 7-15 15 0 6 3 9 6 13 1.5 2 2 4 2 6h14c0-2 .5-4 2-6 3-4 6-7 6-13 0-8-6-15-15-15z" fill="#FFF3C4" stroke="#1F2A2E" stroke-width="2.5" stroke-linejoin="round"/><path d="M14 42h12M15 47h10" stroke="#1F2A2E" stroke-width="2.5" stroke-linecap="round"/><path d="M20 20v12M16 24l4 4 4-4" stroke="#0B4F5C" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg><div><p class="tip-txt">{text}</p><p class="tip-src">Source : {srclink(source)}</p></div></aside>'''

BRAIN = '''<svg class="illu brain" viewBox="0 0 300 240" aria-hidden="true">
      <path data-d="0.5" d="M70 200 C 20 190, 10 130, 40 105 C 25 70, 60 35, 100 45 C 120 15, 175 15, 190 45 C 235 35, 275 70, 260 110 C 290 140, 270 195, 225 200 C 200 225, 150 225, 130 205 C 110 222, 80 218, 70 200 Z" fill="#FCE4E8" filter="url(#rough)"/>
      <path data-d="0.1" class="ink" d="M70 200 C 20 190, 10 130, 40 105 C 25 70, 60 35, 100 45 C 120 15, 175 15, 190 45 C 235 35, 275 70, 260 110 C 290 140, 270 195, 225 200 C 200 225, 150 225, 130 205 C 110 222, 80 218, 70 200 Z" filter="url(#rough)"/>
      <path data-d="0.8" class="ink" style="stroke-width:3" d="M150 40 C 140 80, 165 110, 150 150 S 150 200, 140 210"/>
      <path data-d="0.9" class="ink" style="stroke-width:3" d="M60 120 C 85 105, 100 130, 120 115"/>
      <path data-d="1.0" class="ink" style="stroke-width:3" d="M185 90 C 205 75, 225 95, 245 85"/>
      <path data-d="1.1" class="ink" style="stroke-width:3" d="M180 160 C 200 145, 220 170, 240 155"/>
      <path data-d="1.2" class="ink" style="stroke-width:3" d="M75 165 C 95 150, 110 175, 128 160"/>
    </svg>'''

CLOCK = '''<svg class="illu ico-xl" viewBox="0 0 120 120" aria-hidden="true"><circle data-d="0.6" cx="60" cy="60" r="46" fill="#DCEEFA"/><circle data-d="0.1" cx="60" cy="60" r="46" class="ink" filter="url(#rough)"/><path data-d="0.5" class="inkt" d="M60 30 V60 L82 74"/></svg>'''
BOLT = '''<svg class="illu ico-xl" viewBox="0 0 120 120" aria-hidden="true"><path data-d="0.6" d="M68 10 L30 66 H58 L48 110 L92 48 H64 Z" fill="#FFFFFF"/><path data-d="0.1" class="ink" d="M68 10 L30 66 H58 L48 110 L92 48 H64 Z" filter="url(#rough)"/></svg>'''
CHAT = '''<svg class="illu ico-xl" viewBox="0 0 120 120" aria-hidden="true"><path data-d="0.6" d="M18 26 H102 A10 10 0 0 1 112 36 V78 A10 10 0 0 1 102 88 H52 L30 106 V88 H18 A10 10 0 0 1 8 78 V36 A10 10 0 0 1 18 26 Z" fill="#D6F1E6"/><path data-d="0.1" class="ink" d="M18 26 H102 A10 10 0 0 1 112 36 V78 A10 10 0 0 1 102 88 H52 L30 106 V88 H18 A10 10 0 0 1 8 78 V36 A10 10 0 0 1 18 26 Z" filter="url(#rough)"/><path data-d="0.4" class="inkt" d="M30 50 H90 M30 66 H72"/></svg>'''
PLUG = '''<svg class="illu ico-xl" viewBox="0 0 120 120" aria-hidden="true"><rect data-d="0.6" x="28" y="40" width="64" height="50" rx="14" fill="#DCEEFA"/><rect data-d="0.1" x="28" y="40" width="64" height="50" rx="14" class="ink" filter="url(#rough)"/><path data-d="0.4" class="ink" d="M46 40 V18 M74 40 V18 M60 90 V112"/></svg>'''
BADGE = '''<svg class="illu ico-xl" viewBox="0 0 120 120" aria-hidden="true"><rect data-d="0.6" x="22" y="28" width="76" height="66" rx="10" fill="#FCE4E8"/><rect data-d="0.1" x="22" y="28" width="76" height="66" rx="10" class="ink" filter="url(#rough)"/><circle data-d="0.4" cx="48" cy="56" r="10" class="ink"/><path data-d="0.5" class="ink" d="M36 80 C 40 70, 56 70, 60 80 M70 52 H88 M70 64 H84"/><path data-d="0.3" class="ink" d="M52 28 V16 H68 V28"/></svg>'''
MULTI = '''<svg class="illu ico-xl" viewBox="0 0 140 120" aria-hidden="true"><rect data-d="0.6" x="12" y="50" width="116" height="40" rx="14" fill="#D6F1E6"/><rect data-d="0.1" x="12" y="50" width="116" height="40" rx="14" class="ink" filter="url(#rough)"/><circle data-d="0.4" cx="38" cy="70" r="7" class="ink"/><circle data-d="0.45" cx="70" cy="70" r="7" class="ink"/><circle data-d="0.5" cx="102" cy="70" r="7" class="ink"/><path data-d="0.3" class="ink" d="M128 70 C 140 70, 138 30, 120 26"/></svg>'''

# Liens des démos : colle ici tes adresses, le bouton apparaît tout seul (vide = « lien à ajouter »)
LINKS = {
    "make": "https://eu2.make.com/2181941/scenarios/7450024/edit",
    "appscript": "https://script.google.com/home/projects/1tEwgSuW4dc5zW4eYeiTIzYTHfS4g_x4oo6yhg7ionEsAhL4DRSpes8ET/edit?hl=fr",
    "claude_projet": "", # ton projet Claude
}
def golink(key, label):
    url = LINKS.get(key, "")
    if url:
        return f'<a class="golink" href="{url}" target="_blank" rel="noopener">{label}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg></a>'
    return f'<span class="golink golink--todo">{label} · lien à ajouter</span>'
# Pastille « À vous » : ce que les participants peuvent refaire tout de suite dans leur Copilot
def avous(txt="À vous, dans votre Copilot", target=None):
    if target:
        return f'<button class="avous avous--go" data-act="minideck" data-target="{target}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3v10.5l-2.2-2.2a1.6 1.6 0 0 0-2.3 2.3L9.8 19a6 6 0 0 0 4.2 1.8h.5a5.5 5.5 0 0 0 5.5-5.5V11a1.5 1.5 0 0 0-3 0v-1a1.5 1.5 0 0 0-3 0v-.5a1.5 1.5 0 0 0-3 0V3a1.5 1.5 0 0 0-3 0z"/></svg>{txt}<span aria-hidden="true"> ›</span></button>'
    return f'<span class="avous"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3v10.5l-2.2-2.2a1.6 1.6 0 0 0-2.3 2.3L9.8 19a6 6 0 0 0 4.2 1.8h.5a5.5 5.5 0 0 0 5.5-5.5V11a1.5 1.5 0 0 0-3 0v-1a1.5 1.5 0 0 0-3 0v-.5a1.5 1.5 0 0 0-3 0V3a1.5 1.5 0 0 0-3 0z"/></svg>{txt}</span>'

def logic(eyebrow, title, mk, definition, ex, color, notes, extra=""):
    cards = "".join(f'''<div class="ex sk {color} frag"><p class="who">{w}</p><p>{d}</p>{s}</div>''' for w, d, s in ex)
    slide(f'''    <p class="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    <p class="lead rise" style="margin-top:18px">{definition}</p>
    <div class="cols--3{'' if extra else ' grow'}" style="display:grid;margin-top:{'22' if extra else '30'}px">{cards}</div>{extra}''', seq=2, section="9h45 · Assistant, automatisation, agent", notes=notes)



# Analogies : un pictogramme dessiné et une phrase « C'est comme… »
ICONS = {
 "arrosage": '<path data-d="0.1" class="ink" d="M30 80 V44 M18 80 H42"/><path data-d="0.3" class="inkt" d="M30 44 C 40 30, 58 28, 70 30 M30 44 C 22 30, 8 28, 0 32"/><path data-d="0.5" class="inkt" d="M66 40 l6 8 M58 44 l4 10 M6 42 l-4 8"/>',
 "gps": '<path data-d="0.1" d="M40 82 C 20 56, 14 46, 14 34 a26 26 0 0 1 52 0 c0 12 -6 22 -26 48 z" fill="#D5EAEC" stroke="#2A2F33" stroke-width="3"/><circle data-d="0.4" cx="40" cy="34" r="9" class="ink" style="stroke-width:3"/>',
 "volant": '<circle data-d="0.1" cx="40" cy="44" r="30" class="ink" style="stroke-width:4"/><circle data-d="0.3" cx="40" cy="44" r="8" fill="#D6F1E6" stroke="#2A2F33" stroke-width="3"/><path data-d="0.4" class="ink" d="M40 52 V74 M33 40 L13 32 M47 40 L67 32"/><path data-d="0.6" class="inkt" d="M60 8 a14 14 0 0 1 14 14 M62 0 a24 24 0 0 1 20 20"/>',
 "carte": '<path data-d="0.1" d="M8 20 L30 12 L52 20 L74 12 V70 L52 78 L30 70 L8 78 Z" fill="#FCE4E8" stroke="#2A2F33" stroke-width="3" stroke-linejoin="round"/><path data-d="0.4" class="ink" d="M30 12 V70 M52 20 V78" style="stroke-width:2.5"/><path data-d="0.6" class="inkt" d="M14 60 L68 26" stroke-dasharray="4 6"/>',
 "attelage": '<rect data-d="0.1" x="6" y="30" width="30" height="26" rx="6" fill="#D5EAEC" stroke="#2A2F33" stroke-width="3"/><path data-d="0.3" class="ink" d="M36 44 H52"/><path data-d="0.5" d="M52 30 H78 L70 56 H52 Z" fill="#E6E0F4" stroke="#2A2F33" stroke-width="3" stroke-linejoin="round"/><circle data-d="0.6" cx="14" cy="62" r="8" class="ink" style="stroke-width:3"/>',
 "controle": '<rect data-d="0.1" x="14" y="8" width="52" height="68" rx="8" fill="#FFFFFF" stroke="#2A2F33" stroke-width="3"/><path data-d="0.4" class="inkt" d="M24 30 l6 6 l12 -12 M24 52 l6 6 l12 -12" style="stroke-width:3.5"/><path data-d="0.5" class="ink" d="M48 32 h10 M48 54 h10" style="stroke-width:2.5"/>',
 "virement": '<rect data-d="0.1" x="10" y="16" width="64" height="60" rx="8" fill="#D5EAEC" stroke="#2A2F33" stroke-width="3"/><path data-d="0.3" class="ink" d="M10 32 H74 M26 8 V22 M58 8 V22" style="stroke-width:3"/><path data-d="0.5" class="inkt" d="M28 54 l8 8 l16 -18" style="stroke-width:3.5"/>',
 "carnet": '<rect data-d="0.1" x="12" y="8" width="56" height="70" rx="6" fill="#D6F1E6" stroke="#2A2F33" stroke-width="3"/><path data-d="0.4" class="ink" d="M24 8 V78" style="stroke-width:2.5"/><path data-d="0.6" class="ink" d="M32 26 h26 M32 40 h26 M32 54 h18" style="stroke-width:2.5"/>',
}
def analogy(icon, text, cls="frag"):
    return f'<aside class="analogy {cls}"><svg class="illu ana-ico" viewBox="0 0 84 86" aria-hidden="true">{ICONS[icon]}</svg><p><b class="hand">C\'est comme</b> {text}</p></aside>'

COVER_RIDGE = '''<svg class="cover-ridge illu" viewBox="0 0 900 360" aria-hidden="true">
      <path data-d="0.9" d="M20 340 L250 150 L360 240 L560 40 L700 190 L780 130 L890 260 L890 340 Z" fill="#DCEEFA" filter="url(#rough)"/>
      <path data-d="0.1" class="ink" d="M20 340 L250 150 L360 240 L560 40 L700 190 L780 130 L890 260" filter="url(#rough)"/>
      <path data-d="0.6" class="ink" d="M520 80 L560 40 L600 84 L578 76 L560 92 L540 74 Z" style="fill:#fff;stroke-width:3"/>
      <path data-d="1.1" class="inkt" d="M90 330 C 250 300, 330 250, 420 190 S 520 90, 556 52" stroke-dasharray="3 14" style="stroke-width:3"/>
      <circle data-d="1.6" cx="560" cy="44" r="10" fill="#D6F1E6" stroke="#1F2A2E" stroke-width="3"/>
    </svg>'''

CUP = '''<svg class="pause-illu illu" viewBox="0 0 520 420" aria-hidden="true">
      <path data-d="0.6" d="M110 170 h240 v110 a90 90 0 0 1 -90 90 h-60 a90 90 0 0 1 -90 -90 z" fill="#FFF3C4" filter="url(#rough)"/>
      <path data-d="0.1" class="ink" d="M110 170 h240 v110 a90 90 0 0 1 -90 90 h-60 a90 90 0 0 1 -90 -90 z" filter="url(#rough)"/>
      <path data-d="0.4" class="ink" d="M350 200 c60 0 70 80 0 80" filter="url(#rough)"/>
      <path data-d="0.5" class="ink" d="M60 390 h360" filter="url(#rough)"/>
      <path data-d="0.9" class="inkt" d="M170 140 c-20 -30 20 -40 0 -70"/>
      <path data-d="1.0" class="inkt" d="M230 140 c-20 -30 20 -40 0 -70"/>
      <path data-d="1.1" class="inkt" d="M290 140 c-20 -30 20 -40 0 -70"/>
    </svg>'''


# Ouvertures de chapitre : numéro dessiné, titre lettre à lettre, et le samoyède qui avance d'une balise sur le sentier
CHAPTERS = [("9h00", "Point de départ", "On fait connaissance, on repart de mars, on se met d'accord sur les mots."),
            ("9h45", "Trois logiques", "Assistant, automatisation, agent : ce que chacun fait vraiment, et ce qui les distingue."),
            ("11h00", "Quand utiliser quoi", "L'arbre des briques, testé ensemble, puis vos situations de mars passées dedans."),
            ("13h30", "Voir, puis faire", "Démonstrations commentées sur vos cas, puis atelier : vous construisez votre premier assistant."),
            ("15h15", "Limites et choix", "Ce que l'IA ne fait pas, ce que ça coûte vraiment, comment choisir un outil."),
            ("16h00", "À quoi faire attention", "Les règles simples qui protègent l'entreprise, dès demain."),
            ("16h30", "Intersession", "La grille d'audit, les référents et le calendrier jusqu'au 22 janvier.")]
TX = [80 + k * 253 for k in range(7)]
TY = [176, 150, 166, 136, 158, 128, 146]
def chapter(n):
    h, title, promise = CHAPTERS[n - 1]
    ridge = "M0 196 " + " ".join(f"C {TX[k] - 110} {TY[k] + 24}, {TX[k] - 60} {TY[k]}, {TX[k]} {TY[k]}" for k in range(7)) + " C 1720 150, 1760 190, 1800 180"
    flags = []
    for k in range(7):
        state = "is-done" if k + 1 < n else "is-here" if k + 1 == n else "is-next"
        fill = "#0B4F5C" if k + 1 < n else "#D6F1E6" if k + 1 == n else "#FFFFFF"
        x, y = TX[k], TY[k]
        flags.append(f'<g class="balise {state}" style="--k:{k}"><path class="pole" d="M{x} {y} V{y - 62}"/><path class="flag" d="M{x} {y - 62} L{x + 40} {y - 52} L{x} {y - 40} Z" fill="{fill}"/><circle cx="{x}" cy="{y}" r="7" fill="{fill}"/>'
                     f'<text x="{x}" y="{y + 44}" text-anchor="middle">{CHAPTERS[k][0]}</text></g>')
    x0 = TX[n - 2] if n > 1 else -160
    return f'''    <div class="chap-hero">
      <div class="chap-num" aria-hidden="true"><svg viewBox="0 0 260 260"><circle class="ring" cx="130" cy="130" r="112"/><circle class="ring2" cx="130" cy="130" r="112"/></svg><span>{n}</span></div>
      <div class="chap-text">
        <p class="eyebrow">Chapitre {n} · {h}</p>
        <h1 class="chap-title">{title}</h1>
        <p class="lead chap-lead">{promise}</p>
      </div>
    </div>
    <div class="chap-trail" style="--from:{x0};--to:{TX[n - 1]};--ty:{TY[n - 1]}" aria-hidden="true">
      <svg viewBox="0 0 1800 260" preserveAspectRatio="none"><path class="ridge" d="{ridge}"/>{"".join(flags)}</svg>
      <img class="chap-dog" src="images/samoyede-profil.png" alt="">
    </div>'''
def chapter_slide(n):
    slide(chapter(n), cls="slide--full slide--chapter", section=f"Chapitre {n} · {CHAPTERS[n - 1][1]}",
          notes=f"Ouverture du chapitre {n}. Une phrase pour dire ce qu'on va faire, puis on avance.")

# ---------- 9h00 Point de départ ----------
slide(f'''    <div class="lockup lockup--duo rise">
      <img class="partner-logo" src="images/logo-cfd-formation.png" alt="Logo CFD Formation">
      <img class="brand-logo" src="images/logo-summit-flow.png" alt="Logo Summit Flow">
      <div><p class="lockup-name">CFD × Summit Flow</p><p class="lockup-sub">Formation Automatisation et IA agentique</p></div>
    </div>
    <div class="cover-body">
      <h1 class="rise"><span class="l">Assistant, automatisation, agent :</span> <span class="l">savoir quoi utiliser, <span class="mark">et quand</span></span></h1>
      <p class="cover-meta rise">Maison Lagarrigue · Jour 1 · 17 novembre 2026 · 9h00 à 17h00</p>
    </div>
    <div class="cover-actions"><button class="btn-act btn-act--ghost" data-act="full">Plein écran</button><button class="btn-act btn-act--ghost" data-act="pdf">Exporter en PDF</button></div>
    {art("couverture-samoyede", "Le samoyède de Summit Flow monte un sentier vers un sommet.", (0, 0, 1180, 664), COVER_RIDGE)}''', cls="slide--cover slide--full", section="9h00 · Point de départ",
 notes="Accueil. Le sentier en bas à droite : on monte par étapes, on ne grimpe pas tout d'un coup.")

slide(f'''    <figure class="hero-photo sk"><img src="images/lagarrigue-ouverture.jpg" alt="Vue aérienne d'une ensileuse et d'un tracteur Claas au travail dans un champ, sous le logo Lagarrigue Agricole et espaces verts."></figure>
    <div class="hero-card">
      <p class="eyebrow rise">Aujourd'hui, on part de chez vous</p>
      <h2 class="rise">Maison Lagarrigue</h2>
      <ul class="dash">
        <li class="frag">Agricole et espaces verts</li>
        <li class="frag">Vente et réparation de matériel, concession Claas, irrigation</li>
        <li class="frag">Cinq points de vente entre l'Aveyron, le Lot et le Tarn-et-Garonne</li>
        <li class="frag">Une entreprise familiale</li>
      </ul>
    </div>''', cls="slide--full slide--hero", section="9h00 · Point de départ",
 notes="Ouvrir sur eux, pas sur l'IA. Faire compléter par la salle : les métiers, les saisons fortes, ce qui occupe le bureau. Activité reprise d'une offre d'emploi de l'entreprise (France Travail) : à valider avec Julie.")

chapter_slide(1)

slide(f'''    <p class="eyebrow">Qui je suis</p>
    <h2 class="me-title">Marie Jolly, <span class="mark">Summit Flow</span><img class="me-title-logo" src="images/logo-summit-flow.png" alt="Logo Summit Flow"></h2>
    <div class="me">
      <div class="me-photo"><figure class="me-pic sk"><img src="images/marie-samoyede.jpg" alt="Marie Jolly en montagne, accroupie à côté de son samoyède blanc en harnais."></figure></div>
      <div class="me-right"><ul class="dash me-list">
        <li class="frag">Ingénieure, formée à IMT Mines Albi, pas très loin d'ici</li>
        <li class="frag">Dix ans dans l'aéronautique : production, gestion de projet, industrialisation</li>
        <li class="frag">L'IA, l'automatisation et les agents : d'abord pour mes propres besoins, bien avant ChatGPT</li>
        <li class="frag">Passionnée de montagne, en parcours de certification pour devenir accompagnatrice en montagne</li>
      </ul>
      <div class="me-do frag"><p class="me-do-t">Avec Summit Flow, j'aide les PME industrielles à retrouver de la valeur ajoutée : des usages de l'IA et des applications qui s'adaptent à elles, et pas l'inverse.</p>
        <div class="me-do-row"><p><b>Former</b>les équipes, en entreprise, sur leurs vrais outils</p><p><b>Auditer</b>les processus, pour voir ce qui gagne à être automatisé</p><p><b>Construire</b>les solutions : automatisations, assistants, agents</p></div></div></div>
    </div>''', seq=1, section="9h00 · Point de départ",
 notes="Court : deux minutes. La montagne fait le lien avec le fil de la journée : on monte par étapes, et on allège le sac.")

slide(f'''    <p class="eyebrow">Le parcours complet</p>
    <h2>Cinq jours, une <span class="mark mark--sky">montée par étapes</span></h2>
    <div class="journey">
      <svg class="journey-path illu" viewBox="0 0 1370 150" preserveAspectRatio="none" aria-hidden="true">
        <path data-d="0.2" class="ink" d="M44 120 C 200 118, 260 100, 392 95 S 600 72, 740 70 S 960 44, 1088 40 L 1340 20" stroke-dasharray="4 14" style="stroke-width:3"/>
      </svg>
      <div class="stop is-here rise" data-i="1" style="--pin-y:100px"><span class="here">vous êtes ici</span><span class="pin"></span>
        <p class="when">Jour 1 · 17 nov. 2026</p><h3>Comprendre et choisir</h3>
        <p>Toute l'équipe. Les trois logiques, quand utiliser quoi, et le lancement de la grille d'audit.</p></div>
      <div class="stop rise" data-i="2" style="--pin-y:75px"><span class="pin"></span>
        <p class="when">Intersession · 9 semaines</p><h3>Observer son travail</h3>
        <p>Jusqu'au 22 janvier. Chaque pôle décrit trois à cinq tâches dans la grille. Point d'étape mi-décembre.</p></div>
      <div class="stop rise" data-i="3" style="--pin-y:50px"><span class="pin"></span>
        <p class="when">Jours 2 à 4 · janv. à mars</p><h3>Ateliers par pôle</h3>
        <p>22 janvier, 26 février, 15 mars. Commerce, RH et compta, communication : on construit et on teste.</p></div>
      <div class="stop rise" data-i="4" style="--pin-y:20px"><span class="pin"></span>
        <p class="when">Jour 5 · 26 mars 2027</p><h3>Conformité et charte</h3>
        <p>Responsables de pôle. RGPD, éthique, charte d'usage de l'entreprise, feuille de route.</p></div>
    </div>''', seq=1, section="Le parcours",
 notes="L'ordre des ateliers et la composition des groupes restent à valider avec l'entreprise. Avant le jour 2, Summit Flow consolide les grilles et propose une priorisation, validée avec vous.")

slide(f'''    <p class="eyebrow">Aujourd'hui</p>
    <h2>Le programme du <span class="mark mark--teal">jour 1</span></h2>
    {art("programme-samoyede", "Le samoyède sur un sentier balisé de six étapes.", (110, 128, 1560, 208))}
    <ol class="agenda mt">
      <li class="rise"><span class="h">9h00</span><span class="cn">1</span>Point de départ et repères pour tous</li>
      <li class="rise"><span class="h">9h45</span><span class="cn">2</span>Assistant, automatisation, agent</li>
      <li class="pause rise"><span class="h">10h45</span><span class="cn cn--none"></span>Pause</li>
      <li class="rise"><span class="h">11h00</span><span class="cn">3</span>Quand utiliser quoi</li>
      <li class="pause rise"><span class="h">12h30</span><span class="cn cn--none"></span>Déjeuner</li>
      <li class="rise"><span class="h">13h30</span><span class="cn">4</span>Voir, puis faire : démonstrations commentées et atelier</li>
      <li class="pause rise"><span class="h">15h00</span><span class="cn cn--none"></span>Pause</li>
      <li class="rise"><span class="h">15h15</span><span class="cn">5</span>Limites, investissement, choix d'un outil</li>
      <li class="rise"><span class="h">16h00</span><span class="cn">6</span>À quoi faire attention</li>
      <li class="rise"><span class="h">16h30</span><span class="cn">7</span>Lancement de l'intersession</li>
    </ol>''', cls="slide--full", section="Le programme",
 notes="Le sommaire reste affiché à gauche de chaque slide : on sait toujours où on en est.")

slide(f'''    <p class="eyebrow">Tour de table</p>
    <h2>D'où part <span class="mark">chacun</span> ?</h2>
    <div class="cols mt" style="align-items:start">
      <ol class="steps">
        <li class="frag">Avez-vous suivi la journée de mars ?</li>
        <li class="frag">Qu'est-ce que vous <strong>utilisez déjà</strong> aujourd'hui ?</li>
        <li class="frag">Qu'est-ce qui a <strong>coincé</strong> ?</li>
        <li class="frag">Qu'attendez-vous de ce <strong>parcours</strong> ?</li>
      </ol>
      <div class="qr-ask card sk fill-mint"><figure class="qr"><img src="images/qr-besoins.png" alt="QR code vers le questionnaire de départ"></figure><div><h3>Scanne et réponds</h3><p>Deux minutes, anonyme. Vos réponses s'affichent ensemble sur la slide suivante.</p></div></div>
    </div>''', seq=1, section="9h00 · Point de départ",
 notes="Faire scanner le QR code dès l'arrivée : deux minutes, anonyme. Pendant qu'ils répondent, poser les questions à voix haute. Puis passer à la slide suivante : les réponses s'y affichent en direct. Noter ce qui a coincé : on s'en sert au moment des limites et des doutes. Chiffre utile à l'oral : 65 % des utilisateurs de l'IA au travail craignent de prendre du retard s'ils ne s'adaptent pas vite (Microsoft, Work Trend Index 2026).")

FREINS = [("Je ne vois pas à quoi ça me servirait", "71 %", "des entreprises qui n'utilisent pas l'IA n'y voient pas d'utilité.", "Chapitre 3 : l'arbre et vos situations."),
          ("Je ne sais pas m'en servir", "54 %", "citent le manque d'expertise.", "C'est l'objet de ces cinq jours."),
          ("Et nos données ?", "38 %", "s'inquiètent pour la protection des données.", "Chapitre 6 : ce qu'on saisit, ou pas."),
          ("Ça va me remplacer", "45 %", "des salariés craignent que leur métier soit, au moins en partie, repris par l'IA.", "On voit ce qui reste à l'humain : juger, valider, la relation."),
          ("Elle se trompe", "", "Une réponse fausse peut être présentée comme sûre.", "On apprend à vérifier ; un humain valide."),
          ("Je vais perdre en compétence", "", "Si elle fait tout, on ne sait plus faire.", "À débattre : qu'est-ce qui crée la valeur ajoutée chez nous ? C'est là qu'on garde la main."),
          ("Et l'écologie ?", "", "Chaque demande consomme de l'énergie dans des centres de données.", "On s'en sert quand ça vaut le coup, pas par réflexe."),
          ("Je n'ai pas le temps", "", "Se former et essayer demande du temps au départ.", "On part de tâches qui en font gagner.")]
fr = "".join(f'''<div class="frein frein--v2 sk fill-mint frag"><p class="frein-t">«&nbsp;{t}&nbsp;»</p>{f'<p class="frein-n"><b>{n}</b><span>{d}</span></p>' if n else f'<p class="frein-n frein-n--txt">{d}</p>'}<p class="frein-r"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg><span>{r}</span></p></div>''' for t, n, d, r in FREINS)
slide(f'''    <h2>Vos réponses, <span class="mark">en direct</span></h2>
    <div class="besoins-live" data-state="wait">
      <div class="bl-top">
        <div class="bl-kpi"><b class="bl-n">0</b><span>réponses</span></div>
        <div class="bl-kpi"><b class="bl-mars">–</b><span>ont suivi mars</span></div>
        <div class="bl-kpi"><b class="bl-aise">–</b><span>aisance moyenne sur 5</span></div>
        <div class="bl-tools"><p class="bl-h">Ce que vous utilisez déjà</p><div class="bl-bars"></div></div>
      </div>
      <div class="bl-cols">
        <div class="bl-col"><p class="bl-h">Ce qui a coincé</p><ul class="bl-coince"></ul></div>
        <div class="bl-col"><p class="bl-h">Ce que vous attendez</p><ul class="bl-attentes"></ul></div>
      </div>
      <p class="bl-status"><button class="bl-refresh sk sk--thin" type="button">Actualiser</button><span class="bl-msg">Les réponses s'affichent quand le deck est ouvert sur claude.ai.</span></p>
    </div>''', seq=1, section="9h00 · Point de départ",
 notes="Les réponses du questionnaire de départ, lues en direct dans Airtable (base Grille d'audit, table « Besoins J1 »). Elles se mettent à jour toutes les 30 secondes, ou avec le bouton Actualiser. Ça ne fonctionne que depuis claude.ai, avec ton connecteur Airtable : la première fois, claude.ai te demande d'autoriser la page. Lire deux ou trois attentes à voix haute, et dire ce que la journée va y répondre.")

slide(f'''    <h2>Ce qui freine, <span class="mark mark--blush">le plus souvent</span></h2>
    <p class="howto">Ce qu'on entend, ce que disent les chiffres, et où on y répond aujourd'hui.</p>
    <div class="freins freins--v2">{fr}</div>
    <p class="three-src">Sources : {srclink("Insee Première n° 2120, juillet 2026", "https://www.insee.fr/fr/statistiques/9025878")} (71, 54 et 38 %, entreprises de 10 personnes ou plus n'utilisant pas l'IA) ; {srclink("sondage Odoxa, avril 2026", "https://www.cbnews.fr/node/101258")} (45 %).</p>''', seq=1, section="9h00 · Point de départ",
 notes="Juste après le tour de table : relier ce qu'ils viennent de dire à ces cinq freins. Les trois premiers sont chiffrés par l'Insee (entreprises qui n'utilisent pas l'IA, plusieurs réponses possibles). Les deux derniers n'ont pas de chiffre fiable pour 2026 : les présenter comme ce qu'on entend sur le terrain. Les entendre sans les balayer : chacun a sa réponse dans la journée. Sur la perte de compétence, ouvrir le débat : qu'est-ce qui crée vraiment la valeur ajoutée dans l'entreprise ? Le conseil au client, la connaissance du matériel, la relation avec les agriculteurs, le jugement sur une reprise. Ce qu'on confie à l'IA, c'est ce qui n'en crée pas : recopier, mettre en forme, chercher. Elle prépare, tu comprends, tu valides : tu gardes la main.")

slide(f'''    <p class="eyebrow">Retour sur mars</p>
    <h2>La journée de mars, <span class="mark mark--sky">ce qui reste</span></h2>
    {art("retour-samoyede", "Le samoyède regarde le chemin déjà parcouru.", (100, 136, 760, 270))}
    <div class="cols mt" style="align-items:start">
      <div class="card sk fill-sky rise"><h3>Ce qui a été posé</h3><ul>
        <li>Ce qu'est un assistant conversationnel</li>
        <li>Une quinzaine de situations repérées ensemble, pôle par pôle</li>
        <li>Des premiers temps estimés : jusqu'à 4 jours par mois pour certaines tâches</li></ul></div>
      <div class="card sk fill-blush rise"><h3>Ce que vous avez demandé</h3><ul>
        <li>Moins de vocabulaire technique</li>
        <li>Plus de pratique sur vos outils : Outlook, Excel</li>
        <li class="frag">Alors aujourd'hui, chaque notion part d'une de vos situations</li></ul></div>
    </div>
    <div class="go-row mt"><button class="btn-act md-open" data-act="minideck" data-target="md-mars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10"/></svg>Les situations de mars</button><button class="btn-act md-open" data-act="minideck"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H4z M9 20h6 M12 16v4"/></svg>Rappel : Copilot, comment ça marche</button></div>''', seq=1, section="9h00 · Point de départ",
 notes="Faire raconter par ceux qui étaient là, pour ceux qui n'y étaient pas. Le bouton « Les situations de mars » ouvre la liste par pôle, avec les temps estimés : c'est le fil rouge de la journée, chaque exemple viendra de là. La colonne de droite reprend les retours d'évaluation de mars : le dire, c'est montrer qu'on les a écoutés. Le bouton ouvre un rappel en trois écrans sur Copilot (comment il fonctionne, ce que change la licence, ce que Microsoft garantit sur les données) : à ouvrir si le groupe en a besoin, Échap pour revenir.")

pi = "".join(f'<div class="postit fill-{c}" contenteditable="true" data-k="mars-{i}" data-ph="{ph}"></div>' for i, (c, ph) in enumerate([("sky", "j'ai retenu…"), ("lemon", "j'utilise…"), ("mint", "j'ai retenu…"), ("blush", "ça a coincé…"), ("lemon", "j'utilise…"), ("sky", "ça a coincé…"), ("mint", "j'ai retenu…"), ("blush", "j'aimerais…")]))
tf = [("L'IA générative va chercher la bonne réponse dans une base de données.", "Faux", "Elle prédit la suite de texte la plus probable."),
      ("Elle peut inventer une source qui n'existe pas.", "Vrai", "C'est ce qu'on appelle une hallucination."),
      ("Plus la consigne est précise, plus la réponse est utile.", "Vrai", "Le contexte fait souvent la différence."),
      ("Ce que je tape peut servir à améliorer le modèle.", "Selon l'outil", "Ça dépend de l'outil, de la licence et des réglages.")]
rows = "".join(f'''<div class="tf sk sk--thin"><p>{q}</p><div class="frag tf-a"><span class="mark mark--{'teal' if a=='Vrai' else 'blush' if a=='Faux' else 'lav'} hand">{a}</span><span class="small">{w}</span></div></div>''' for q, a, w in tf)

# D'où vient l'IA : sept dates, puis où on en est en 2026 (sources dans SOURCES.md)
TIMELINE = [("1950", "Alan Turing pose la question : une machine peut-elle penser ?"),
            ("1956", "Le mot « intelligence artificielle » naît à Dartmouth."),
            ("1997", "Deep Blue, d'IBM, bat Kasparov aux échecs."),
            ("2017", "Google invente le Transformer, le « T » de ChatGPT : Generative Pre-trained Transformer."),
            ("2022", "ChatGPT sort le 30 novembre : 100 millions d'utilisateurs en deux mois."),
            ("2023", "Copilot arrive dans Word, Excel, Outlook et Teams."),
            ("2026", "Les agents : Copilot enchaîne des tâches, Workflows, Cowork.")]
tl = "".join(f'<li class="{"is-now" if y == "2026" else ""}"><b class="hand">{y}</b><p>{t}</p></li>' for y, t in TIMELINE)
slide(f'''    <h2>D'où vient l'IA, <span class="mark">et où on en est</span></h2>
    <ol class="timeline">{tl}</ol>
    <div class="cols mt" style="align-items:stretch">
      {tip("Plus de 900 millions de personnes utilisent ChatGPT chaque semaine, deux fois plus qu'un an plus tôt.", "OpenAI, février 2026")}
      {tip("Deux entreprises françaises sur trois de 20 salariés et plus utilisent l'IA générative, 64 % entre 20 et 49 salariés.", "Banque de France, bulletin n° 266, septembre 2026")}
    </div>''', seq=1, section="9h00 · Point de départ",
 notes="Le rappel historique du programme, en deux minutes, tout s'affiche d'un coup : l'IA n'est pas née avec ChatGPT, mais tout s'est accéléré depuis 2017. Ce qui change pour eux : depuis 2023 elle est dans les outils qu'ils ont déjà, et depuis 2025-2026 elle ne fait plus seulement répondre, elle enchaîne des tâches. Les deux chiffres disent où on en est : ce n'est plus une mode, et les entreprises de leur taille s'y mettent. Nuance utile : la même enquête de la Banque de France montre que seules 31 % des entreprises utilisatrices voient déjà un gain de productivité, on y revient à 15h15.")

# Infographie fournie d'un seul tenant (infographie-ia.png) : la build la coupe en deux,
# le haut pour « comment ça marche », le bas pour « les principales IA »
_full = IMG / "infographie-ia.png"
if _full.exists() and not (IMG / "principales-ia.png").exists():
    from PIL import Image as _Im
    _im = _Im.open(_full); _w, _h = _im.size; _cut = int(_h * 0.425)
    _im.crop((0, 0, _w, _cut)).save(IMG / "comment-fonctionne-ia.png")
    _im.crop((0, _cut, _w, _h)).save(IMG / "principales-ia.png")
slide(f'''    <p class="eyebrow">Rappel commun</p>
    <h2>Une IA générative, <span class="mark mark--sky">comment ça marche</span></h2>
    <div class="infog-split mt">
      <div class="infog-one">{infog("comment-fonctionne-ia.png", "Infographie « Comment fonctionne l'IA » : tokens, modèle, prédiction du token suivant (comment-fonctionne-ia.png)")}</div>
      <aside class="why-struct frag">
        <p class="why-h hand">Pourquoi structurer ses demandes ?</p>
        <svg class="why-svg" viewBox="0 0 330 270" aria-hidden="true">
          <text x="6" y="8" class="wl">début</text><text x="292" y="8" class="wl" text-anchor="end">fin</text><text x="150" y="8" class="wl wl--mute" text-anchor="middle">milieu</text>
          <rect x="6" y="14" width="30" height="30" rx="7" class="tk tk--hi"/><rect x="42" y="14" width="30" height="30" rx="7" class="tk tk--hi"/><rect x="78" y="14" width="30" height="30" rx="7" class="tk tk--md"/><rect x="114" y="14" width="30" height="30" rx="7" class="tk tk--lo"/><rect x="150" y="14" width="30" height="30" rx="7" class="tk tk--lo"/><rect x="186" y="14" width="30" height="30" rx="7" class="tk tk--lo"/><rect x="222" y="14" width="30" height="30" rx="7" class="tk tk--md"/><rect x="258" y="14" width="30" height="30" rx="7" class="tk tk--hi"/><rect x="294" y="14" width="30" height="30" rx="7" class="tk tk--hi"/>
          <path class="wa" d="M165 52 V82"/><path class="wa" d="M157 74 L165 84 L173 74"/>
          <g class="wn"><path d="M70 100 L150 110"/><path d="M70 100 L150 150"/><path d="M70 100 L150 190"/><path d="M70 100 L150 230"/><path d="M70 140 L150 110"/><path d="M70 140 L150 150"/><path d="M70 140 L150 190"/><path d="M70 140 L150 230"/><path d="M70 180 L150 110"/><path d="M70 180 L150 150"/><path d="M70 180 L150 190"/><path d="M70 180 L150 230"/><path d="M70 220 L150 110"/><path d="M70 220 L150 150"/><path d="M70 220 L150 190"/><path d="M70 220 L150 230"/><path d="M150 110 L230 120"/><path d="M150 110 L230 160"/><path d="M150 110 L230 200"/><path d="M150 150 L230 120"/><path d="M150 150 L230 160"/><path d="M150 150 L230 200"/><path d="M150 190 L230 120"/><path d="M150 190 L230 160"/><path d="M150 190 L230 200"/><path d="M150 230 L230 120"/><path d="M150 230 L230 160"/><path d="M150 230 L230 200"/></g><circle cx="70" cy="100" r="11" class="nd nd--0"/><circle cx="70" cy="140" r="11" class="nd nd--0"/><circle cx="70" cy="180" r="11" class="nd nd--0"/><circle cx="70" cy="220" r="11" class="nd nd--0"/><circle cx="150" cy="110" r="11" class="nd nd--1"/><circle cx="150" cy="150" r="11" class="nd nd--1"/><circle cx="150" cy="190" r="11" class="nd nd--1"/><circle cx="150" cy="230" r="11" class="nd nd--1"/><circle cx="230" cy="120" r="11" class="nd nd--2"/><circle cx="230" cy="160" r="11" class="nd nd--2"/><circle cx="230" cy="200" r="11" class="nd nd--2"/>
          <path class="wa" d="M244 160 H284"/><path class="wa" d="M276 152 L286 160 L276 168"/>
          <rect x="290" y="146" width="30" height="30" rx="8" class="tk tk--out"/>
        </svg>
        <p class="why-l"><b>Le début et la fin pèsent le plus</b>l'objectif en premier, le format à la fin.</p>
        <p class="why-l"><b>Les mots précis orientent la prédiction</b>un rôle, un verbe, un format.</p>
        <button class="btn-act why-go" data-act="minideck" data-target="minideck" data-find="quatre ingrédients"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>Structurer sa demande</button>
        <p class="tip-src">Source : {srclink("Liu et al., « Lost in the Middle », 2023")}</p>
      </aside>
    </div>''', seq=1, section="9h00 · Point de départ",
 notes="Sur la partie 2, faire le lien avec l'encadré de droite. Le modèle lit tout, mais il ne donne pas le même poids à chaque passage : les études montrent qu'il exploite mieux ce qui est au début et à la fin d'un long texte que ce qui est au milieu (Liu et al., 2023, « Lost in the Middle »). D'où : l'objectif en premier, le format attendu à la fin. Le bouton ouvre la page « Structurer sa demande » du rappel Copilot. Le modèle a appris des régularités, il ne connaît ni l'entreprise ni la situation. Tout ce qu'il sait de la tâche, c'est ce qu'on lui écrit. D'où l'intérêt de structurer la demande : objectif, contexte, sources, attentes, la structure recommandée par Microsoft pour Copilot. Le détail est dans le rappel Copilot. Rester sur l'essentiel : elle découpe le texte en tokens, elle a appris des régularités, elle prédit le token suivant. Elle ne cherche pas la vérité. Les pourcentages de la bulle sont un exemple pour illustrer, pas une mesure.")

savoir = [("Elle prédit, elle ne sait pas", "Elle écrit la suite la plus probable, pas forcément la plus juste.", "Vérifier les faits, les chiffres et les sources."),
          ("Elle est figée à une date", "Elle n'apprend pas toute seule : ses connaissances s'arrêtent au moment de son entraînement.", "Pour l'actualité, activer la recherche web ou lui donner vos documents."),
          ("Elle n'a pas de mémoire", "Sans la fonction mémoire, elle ne garde rien de vos conversations précédentes.", "Redonner le contexte à chaque nouvelle conversation."),
          ("Ses réponses varient", "La même question peut donner deux réponses différentes.", "Reformuler, relancer, comparer.")]
rows_s = "".join(f'''<div class="sv frag"><div class="sv-k"><p class="sv-t">{t}</p><p>{d}</p></div><svg class="sv-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg><p class="sv-r">{r}</p></div>''' for t, d, r in savoir)
slide(f'''    <h2>Quatre choses à savoir, <span class="mark mark--sky">et le bon réflexe</span></h2>
    <div class="sv-head"><span>Ce qu'il faut savoir</span><span>Ton réflexe</span></div>
    <div class="svs">{rows_s}</div>
    <p class="sv-retenir frag"><b class="hand">À retenir :</b> plus tu lui donnes de contexte, meilleure est la réponse.</p>''', seq=1, section="9h00 · Point de départ",
 notes="Suite directe de « comment ça marche ». Une ligne par clic, et avant chaque ligne un vrai ou faux à main levée, pour faire la remise à niveau sans en avoir l'air : « L'IA va chercher la bonne réponse dans une base de données » (faux, elle prédit), « Elle peut inventer une source qui n'existe pas » (vrai, c'est une hallucination), « Elle se souvient de nos échanges d'hier » (faux sans la mémoire), « La même question donne toujours la même réponse » (faux). La question des données saisies est traitée au chapitre 6. Pour chaque ligne, demander un exemple vécu : une réponse fausse, une info périmée, un contexte à réexpliquer. La dernière phrase prépare le harnais du chapitre 2.")

slide(f'''    <p class="eyebrow">Rappel commun</p>
    <h2>Les principales IA <span class="mark">aujourd'hui</span></h2>
    <p class="howto">Quatre familles de modèles, chacune avec son style. Ce sont des tendances d'usage à ce jour, pas un classement.</p>
    <div class="ia-cols">{"".join(f'<figure class="ia-col frag"><img src="images/ia-{k}.png" alt="{a}"></figure>' for k, a in [("chatgpt", "ChatGPT, d'OpenAI : polyvalent, points forts et points faibles"), ("claude", "Claude, d'Anthropic : analyse et rédaction, points forts et points faibles"), ("gemini", "Gemini, de Google : multimodal et recherche, points forts et points faibles"), ("mistral", "Mistral AI : modèle européen, points forts et points faibles")])}</div>''', seq=1, section="9h00 · Point de départ",
 notes="Un clic par famille. Les points forts et faibles sont des tendances d'usage, pas des mesures : tous ces modèles peuvent se tromper, et leur avance change tous les trois mois. Le message à faire passer : on ne choisit pas un modèle une fois pour toutes, on choisit un outil adapté à la tâche. Lien avec Copilot : Microsoft 365 Copilot n'est pas un cinquième modèle, il s'appuie sur des modèles d'OpenAI et, selon les réglages de l'entreprise, aussi sur ceux d'Anthropic (Claude). En Europe, les modèles Claude sont désactivés par défaut et c'est l'administrateur qui les active : à vérifier chez Maison Lagarrigue.")

slide(f'''    <p class="eyebrow">Rappel commun</p>
    <h2>L'IA est déjà dans <span class="mark">vos outils</span></h2>
    <div class="logo-row logo-row--tight rise">
      {"".join(f'<span class="app"><img src="images/logo-{f}.png" alt=""><span>{n}</span></span>' for f, n in [("microsoft", "Microsoft 365 Copilot"), ("outlook", "Outlook"), ("excel", "Excel"), ("word", "Word"), ("powerpoint", "PowerPoint"), ("teams", "Teams")])}
    </div>
    <div class="biz mt">
      <div class="card sk fill-mint frag biz-card"><h3>Chez vous : la licence Copilot Business</h3>
        <ul class="biz-list">
          <li><b>Dans Word, Excel, PowerPoint, Outlook et Teams</b>rédiger, résumer, analyser un tableau, préparer une présentation, retrouver ce qui s'est dit en réunion.</li>
          <li><b>Copilot Chat sur vos données de travail</b>e-mails, fichiers, réunions et conversations, en respectant les droits d'accès de chacun.</li>
          <li><b>Des agents</b>en créer avec Agent Builder, ou utiliser ceux proposés par Microsoft.</li>
          <li><b>La protection des données de l'entreprise</b>vos données ne servent pas à entraîner les modèles.</li>
        </ul>
        <p class="tip-src">Source : {srclink("Microsoft, Introducing Microsoft 365 Copilot Business", "https://techcommunity.microsoft.com/t5/microsoft-365-copilot-blog/introducing-microsoft-365-copilot-business-empowering-small-and/ba-p/4469700")}</p>
      </div>
      {tip("40 % des TPE et PME déclarent utiliser au moins une solution d'IA en 2026, contre 13 % en 2024. Chez les PME, c'est 53 %.", "Baromètre France Num 2026, DGE et Crédoc", "frag")}
    </div>''', seq=1, section="9h00 · Point de départ",
 notes="Ce n'est plus un site à part : elle arrive dans ce que vous ouvrez chaque matin. Confirmé par Julie : Maison Lagarrigue dispose de licences Microsoft 365 Copilot Business. C'est la version PME (jusqu'à 300 utilisateurs) de Microsoft 365 Copilot, avec les mêmes fonctions. Ce qu'elle permet : Copilot dans Word, Excel, PowerPoint, Outlook et Teams ; Copilot Chat qui s'appuie sur les e-mails, fichiers, réunions et conversations de chacun, sans dépasser ses droits ; créer des agents avec Agent Builder ; la protection des données de l'entreprise. À vérifier la veille : qui a une licence (tout le monde ou une partie des postes), et ce que l'administrateur a activé (Workflows, Cowork, modèles Claude). Autre chiffre France Num 2026 : l'usage le plus répandu est la génération de texte, de voix ou d'images (34 % des TPE et PME), devant les chatbots et assistants (24 %).")


chapter_slide(2)

# ---------- 9h45 Trois logiques ----------
S945 = "9h45 · Assistant, automatisation, agent"
slide(f'''    <h2>Trois logiques, <span class="mark">trois verbes</span></h2>
    <div class="three">
      <div class="three-lines">
        <p class="three-l frag"><span class="dot dot--mint"></span>L'assistant <span class="mark">répond</span></p>
        <p class="three-l frag"><span class="dot dot--lav"></span>L'automatisation <span class="mark mark--lav">exécute</span></p>
        <p class="three-l frag"><span class="dot dot--blush"></span>L'agent <span class="mark mark--blush">poursuit un objectif</span></p>
        <p class="sv-retenir three-c frag"><b class="hand">À retenir :</b> le bon choix dépend de la tâche, pas de l'outil à la mode.</p>
      </div>
      {pic("trois-logiques-samoyede", "Trois samoyèdes : l'assistant qui répond, l'automatisation qui exécute, l'agent qui poursuit un objectif.", 640, 360)}
    </div>
    {tip("Sur Malt, la demande de compétences liées aux agents IA a été multipliée par 60 par rapport à 2024.", "Malt Tech Trends 2026", "frag")}''', seq=2, section=S945, notes="Faire apparaître les trois verbes un par un. Demander au groupe de deviner le suivant.")

slide(f'''    <p class="eyebrow">L'automatisation</p>
    <h2>Tout part d'un <span class="mark mark--lav">déclencheur</span></h2>
    <p class="lead rise" style="margin-top:18px">Un déclencheur (le « trigger »), puis une suite d'actions. Trois déclencheurs possibles :</p>
    <div class="cols--3 mt" style="display:grid;align-items:stretch">
      <div class="card sk fill-lav frag trig-card">{CLOCK}<div><h3>Le temps</h3><p>Chaque matin, la trésorerie se met à jour.</p><p class="trig-who">Automatisation</p></div></div>
      <div class="card sk fill-lav frag trig-card">{BOLT}<div><h3>Un événement</h3><p>Une facture arrive par e-mail, un pointage est saisi.</p><p class="trig-who">Automatisation, agent</p></div></div>
      <div class="card sk fill-mint frag trig-card">{CHAT}<div><h3>Ton message</h3><p>Tu poses une question, il répond. Sans message, il ne fait rien.</p><p class="trig-who">Assistant</p></div></div>
    </div>
    {analogy("virement", "le virement de paie programmé : il part à date fixe, ou dès que les pointages sont validés. Et il fait toujours la même chose.", "frag mt")}''',
 seq=2, section=S945, notes="Faire trouver un exemple de chaque famille dans leur quotidien. Le troisième déclencheur prépare la suite : l'assistant ne démarre que quand on lui écrit, c'est la différence avec l'automatisation et avec l'agent.")

logic("L'automatisation", 'L\'automatisation <span class="mark mark--lav">exécute</span>, toujours pareil', "", "Aucune réflexion, et c'est sa force : même entrée, même résultat.",
 [("Un scénario Make", "Un événement déclenche une série d'actions, montée visuellement, bloc par bloc.", f'<span class="live">démo en direct</span>{golink("make", "Ouvrir le scénario Make")}'),
  ("Apps Script : la réservation des salles", "Une demande de réservation arrive, le script vérifie le planning et répond. Personne ne recopie rien.", f'<span class="live">démo en direct</span>{golink("appscript", "Ouvrir le script")}'),
  ("Chez vous, dans Microsoft 365", '<span class="tools"><b>Workflows dans Copilot</b> : décrire l\'automatisation en une phrase.<br><b>Règles Outlook</b> : trier, classer, transférer un e-mail tout seul.<br><b>Excel, onglet Automatiser</b> : enregistrer une suite d\'actions.</span>', avous("À vous de jouer"))],
 "fill-lav", "Make et Apps Script servent d'illustration ; on revient ensuite à Microsoft 365. Les Workflows de Microsoft 365 Copilot transforment une description en automatisation sur Outlook, Teams, SharePoint et Planner : à ce jour en accès anticipé (programme Frontier) et en anglais, à vérifier dans leur environnement la veille. Manipulation possible : une règle Outlook qui range les factures reçues dans un dossier. Les plateformes d'automatisation avancées ne sont pas au programme de ce parcours.")

HUMAN = """<svg class="illu human" viewBox="0 0 440 640" aria-hidden="true">
      <g class="frag" data-step="7"><path class="inkt" d="M70 470 A 190 290 0 1 1 120 560" stroke-dasharray="6 12" style="stroke-width:4"/><path class="inkt" d="M104 548 L120 562 L128 540" style="stroke-width:4"/></g>
      <g class="frag" data-step="4"><path d="M178 228 C 135 262, 112 300, 96 342" fill="none" stroke="#D6F1E6" stroke-width="22" stroke-linecap="round"/><path d="M262 228 C 305 262, 328 300, 344 342" fill="none" stroke="#D6F1E6" stroke-width="22" stroke-linecap="round"/><path d="M198 400 C 193 465, 188 520, 176 590" fill="none" stroke="#D6F1E6" stroke-width="22" stroke-linecap="round"/><path d="M242 400 C 247 465, 252 520, 264 590" fill="none" stroke="#D6F1E6" stroke-width="22" stroke-linecap="round"/></g>
      <path class="ink" d="M178 228 C 135 262, 112 300, 96 342" filter="url(#rough)"/>
      <path class="ink" d="M262 228 C 305 262, 328 300, 344 342" filter="url(#rough)"/>
      <path class="ink" d="M198 400 C 193 465, 188 520, 176 590 L 150 596" filter="url(#rough)"/>
      <path class="ink" d="M242 400 C 247 465, 252 520, 264 590 L 290 596" filter="url(#rough)"/>
      <rect x="176" y="198" width="88" height="210" rx="22" fill="#FFFFFF" stroke="#2A2F33" stroke-width="4" filter="url(#rough)"/>
      <path class="ink" d="M220 40 V 22" style="stroke-width:3.5"/><circle cx="220" cy="18" r="7" fill="#D6F1E6" stroke="#2A2F33" stroke-width="3"/>
      <rect x="138" y="40" width="164" height="140" rx="26" fill="#FFFFFF" stroke="#2A2F33" stroke-width="4" filter="url(#rough)"/>
      <rect x="152" y="54" width="136" height="112" rx="16" fill="#FAF8F3" stroke="#2A2F33" stroke-width="2.5"/>
      <path class="ink" d="M206 180 V 198 M234 180 V 198" style="stroke-width:3.5"/>
      <g class="frag" data-step="1"><path d="M168 108 C 160 80, 190 64, 210 74 C 228 62, 262 78, 258 106 C 268 130, 242 150, 220 142 C 196 152, 160 134, 168 108 Z" fill="#FCE4E8" stroke="#2A2F33" stroke-width="3" filter="url(#rough)"/><path class="ink" style="stroke-width:2.5" d="M214 76 C 206 98, 222 116, 214 142 M182 104 C 194 96, 202 112, 212 104 M226 94 C 238 86, 248 100, 256 94"/></g>
      <g class="frag" data-step="6"><ellipse cx="244" cy="142" rx="20" ry="11" fill="#D5EAEC" stroke="#2A2F33" stroke-width="3" filter="url(#rough)"/></g>
      <g class="frag" data-step="5"><circle cx="220" cy="262" r="24" fill="#E6E0F4" stroke="#2A2F33" stroke-width="3" filter="url(#rough)"/><path class="inkt" style="stroke-width:3.5" d="M208 262 L217 271 L233 253"/></g>
      <g class="frag" data-step="3"><path d="M48 334 L104 326 L110 380 L54 390 Z" fill="#D5EAEC" stroke="#2A2F33" stroke-width="3.5" stroke-linejoin="round" filter="url(#rough)"/><path class="ink" style="stroke-width:2.5" d="M78 330 L82 386"/></g>
      <g class="frag" data-step="2"><rect x="322" y="316" width="70" height="92" rx="8" fill="#FFFFFF" stroke="#2A2F33" stroke-width="3.5" transform="rotate(6 357 362)" filter="url(#rough)"/><path class="inkt" style="stroke-width:2.5" d="M338 342 h40 M337 358 h40 M336 374 h30" transform="rotate(6 357 362)"/></g>
    </svg>"""


# Modèle, inférence, harnais : le schéma du bocal, redessiné et animé
T = 'font-family="SF Hand" fill="#2A2F33"'
TT = 'font-family="SF Hand" fill="#0B4F5C"'
BRAIN = lambda cx, cy, k=1, d=0.4: f'<g data-d="{d}" transform="translate({cx} {cy}) scale({k})"><path d="M-46 4 C -54 -26, -20 -44, 0 -34 C 18 -46, 52 -30, 46 0 C 56 24, 30 44, 8 36 C -14 46, -52 30, -46 4 Z" fill="#FCE4E8" stroke="#2A2F33" stroke-width="3.5"/><path d="M2 -32 C -6 -10, 10 8, 2 34 M-30 -2 C -18 -10, -10 6, 0 -2 M14 -14 C 26 -22, 36 -8, 44 -14" fill="none" stroke="#2A2F33" stroke-width="2.5" stroke-linecap="round"/></g>'
JAR = lambda x, y, w, h, d=0.1: f'<g data-d="{d}"><rect x="{x+w*0.15}" y="{y}" width="{w*0.7}" height="22" rx="6" fill="#FFFFFF" stroke="#2A2F33" stroke-width="4"/><rect x="{x}" y="{y+22}" width="{w}" height="{h}" rx="30" fill="#D5EAEC" stroke="#2A2F33" stroke-width="4"/></g>'
M_SEUL = f"""<svg class="illu scene-svg" viewBox="0 0 420 200" aria-hidden="true">
  {JAR(140, 4, 140, 148)}
  {BRAIN(210, 96, 0.95)}
  <text data-d="0.7" x="210" y="196" text-anchor="middle" font-size="21" {T}>ex. : GPT-6.1 Sol, Claude Sonnet 5.5</text>
</svg>"""
TOK = "".join(f'<rect x="{262 + i*20}" y="{84 + (i%2)*10}" width="13" height="13" rx="3" fill="#E6E0F4" stroke="#2A2F33" stroke-width="2"/>' for i in range(4))
M_INF = f"""<svg class="illu scene-svg" viewBox="0 0 420 200" aria-hidden="true">
  <g data-d="0.1"><rect x="0" y="64" width="128" height="64" rx="12" fill="#FFFFFF" stroke="#2A2F33" stroke-width="4"/></g>
  <text data-d="0.2" x="64" y="103" text-anchor="middle" font-size="21" {T}>ta demande</text>
  <path data-d="0.35" class="inkt" d="M132 96 H154 M144 86 L154 96 L144 106"/>
  {BRAIN(210, 96, 0.72, 0.45)}
  <path data-d="0.6" class="ink" d="M168 50 l-10 -14 M210 42 V24 M252 50 l10 -14" style="stroke-width:3"/>
  <g data-d="0.8">{TOK}</g>
  <text data-d="0.9" x="292" y="140" text-anchor="middle" font-size="20" {TT}>des tokens</text>
  <g data-d="1.0"><rect x="346" y="64" width="70" height="64" rx="12" fill="#FFFFFF" stroke="#2A2F33" stroke-width="4"/><path d="M358 84 h46 M358 96 h46 M358 108 h30" fill="none" stroke="#2A2F33" stroke-width="2.5" stroke-linecap="round"/></g>
  <text data-d="1.1" x="381" y="52" text-anchor="middle" font-size="20" {T}>la réponse</text>
  <text data-d="0.7" x="210" y="192" text-anchor="middle" font-size="21" {T}>il ne travaille que quand on l'appelle</text>
</svg>"""
PIECES = [("outils", 22, 6, "#D6F1E6"), ("mémoire", 284, 6, "#D6F1E6"), ("consignes", 6, 146, "#D6F1E6"), ("connaissances", 240, 146, "#D6F1E6")]
PC = "".join(f'<g data-d="{0.5 + i*0.15}"><rect x="{x}" y="{y}" width="{len(t)*12 + 34}" height="44" rx="14" fill="{c}" stroke="#2A2F33" stroke-width="3.5"/><text x="{x + (len(t)*12 + 34)/2}" y="{y+29}" text-anchor="middle" font-size="22" {T}>{t}</text></g>' for i, (t, x, y, c) in enumerate(PIECES))
M_HAR = f"""<svg class="illu scene-svg" viewBox="0 0 420 200" aria-hidden="true">
  <path data-d="0.35" class="inkt" d="M86 50 L172 82 M330 50 L248 82 M90 146 L172 114 M300 146 L248 114" style="stroke-width:3"/>
  {BRAIN(210, 98, 0.7, 0.1)}
  {PC}
  <path data-d="1.2" class="inkt" d="M150 98 C 112 84, 112 124, 150 110 M146 104 l6 6" style="stroke-width:3"/>
  <text data-d="1.25" x="104" y="106" text-anchor="end" font-size="20" {TT}>la boucle</text>
</svg>"""
ICONS["moteur"] = '<rect data-d="0.1" x="8" y="34" width="50" height="38" rx="6" fill="#E6E0F4" stroke="#2A2F33" stroke-width="3"/><path data-d="0.3" class="ink" d="M16 34 V22 H28 V34 M36 34 V22 H48 V34" style="stroke-width:3"/><circle data-d="0.4" cx="68" cy="56" r="10" class="ink" style="stroke-width:3"/><path data-d="0.6" class="inkt" d="M64 22 c6 -6 -4 -10 2 -16 M74 26 c6 -6 -4 -10 2 -16" style="stroke-width:2.5"/><path data-d="0.5" class="ink" d="M4 80 H80" style="stroke-width:3"/>'
slide(f'''    <p class="eyebrow">L'assistant et l'agent : sous le capot</p>
    <h2>Le modèle, l'inférence, <span class="mark">le harnais</span></h2>
    <p class="howto">Trois notions à poser avant de parler de l'assistant et de l'agent : elles valent pour les deux.</p>
    <div class="scene-row">
      <figure class="scene frag" data-step="1">{M_SEUL}<figcaption><b class="hand">1. Le modèle</b>Un cerveau dans un bocal : il sait beaucoup, mais seul il ne fait rien.</figcaption></figure>
      <figure class="scene frag" data-step="2">{M_INF}<figcaption><b class="hand">2. L'inférence</b>Le moment où il travaille. Chaque morceau de mot, le token, se paie.</figcaption></figure>
      <figure class="scene frag" data-step="3">{M_HAR}<figcaption><b class="hand">3. Le harnais</b>Tout ce qu'on branche autour pour qu'il agisse dans ton cadre.</figcaption></figure>
    </div>
    <div class="cols bocal-row">
      {analogy("moteur", "un moteur de tracteur sur un établi : il tourne et consomme, c'est l'inférence. Il ne laboure rien tant qu'on ne l'a pas monté et équipé : c'est le harnais.", "frag")}
      <div class="duo frag"><p class="duo-q"><b class="hand">Même demande :</b> « Prépare l'étude de prix de ce client. »</p>
        <p class="duo-a duo-a--ko"><b class="hand">Sans harnais</b>« Je n'ai pas accès à vos tarifs. Voici un modèle à compléter. »</p>
        <p class="duo-a duo-a--ok"><b class="hand">Avec harnais</b>Il lit la demande dans Outlook, applique la grille tarifaire en HT, vérifie le total, te le soumet.</p></div>
    </div>''',
 seq=2, section=S945,
 notes="Pont avec le rappel du matin : on a vu comment une IA générative fonctionne. Un clic par dessin. Le modèle seul : il a lu énormément, mais il n'a ni bras, ni consignes, ni mémoire. L'inférence : c'est le moment où il travaille, quand on l'appelle ; il lit la demande et écrit la réponse morceau par morceau, et ces morceaux, les tokens, sont l'unité sur laquelle on paie. Le harnais : tout ce qu'on branche autour. Puis l'analogie du moteur, et la même demande avec et sans harnais : c'est là qu'on comprend pourquoi un assistant ou un agent bien équipé fait mieux qu'une IA toute nue. La slide suivante détaille les pièces une par une. Microsoft emploie aussi le mot « harness » pour les agents Copilot Studio (Microsoft Learn, Agents overview).")

parts = [(1, "Le cerveau", "le modèle", "Ex. : GPT-6.1 Sol ou Claude Sonnet 5.5, utilisé seul", "blush"),
         (2, "La fiche de poste", "le prompt, les instructions", "Ex. : « Tu prépares les études de prix, en HT, sans inventer de tarif. »", "card"),
         (3, "La bibliothèque", "les connaissances", "Ex. : la grille tarifaire, les fiches produits, les procédures SAV", "teal"),
         (4, "Les bras et les jambes", "outils, connecteurs, plugins", "Ex. : lire les demandes dans Outlook, écrire la ligne dans Excel", "mint"),
         (5, "Le savoir-faire", "les compétences", "Ex. : rédiger un compte rendu au format maison, pour tous les pôles", "lav"),
         (6, "La mémoire", "", "Ex. : il se souvient que tu veux les montants HT", "teal"),
         (7, "La boucle", "gérée par l'outil", "Ex. : il vérifie que le total tombe juste, sinon il recommence", "mint")]
def part(n, t, sub, ex, c):
    s = f' <span class="comp-sub">{sub}</span>' if sub else ""
    return f'<div class="comp sk fill-{c} frag" data-step="{n}"><p class="hand comp-t">{t}{s}</p><p class="comp-ex">{ex}</p></div>'
cards = [part(*x) for x in parts]
slide(f'''    <p class="eyebrow">Le harnais pièce par pièce : un collègue numérique</p>
    <h2>Ce qu'on paramètre : <span class="mark">le harnais</span>, pièce par pièce</h2>
    <p class="howto">Les mêmes pièces pour un assistant et pour un agent. <span class="live">démo en direct : Marie l'assistant, ou Marie l'agent</span></p>
    <div class="anat">
      <div class="anat-col">{"".join(cards[:3])}</div>
      <div class="anat-mid">{HUMAN}<p class="harness frag" data-step="8"><b class="hand">Tout le reste, c'est le harnais :</b>le réglage qui le rend bon, ou pas.</p></div>
      <div class="anat-col">{"".join(cards[3:])}</div>
    </div>''', seq=2, section=S945,
 notes="Démo en direct : faire apparaître chaque pièce au moment où tu la montres dans l'outil. Insister à la fin : c'est un outil. Le même modèle, mal harnaché, donne de mauvais résultats. Le bocal de la slide précédente, vu de près. Vérifier le nom exact des modèles la veille de la séance.")

slide(f'''    <p class="eyebrow">Sur le terrain : l'usage n°1</p>
    <h2>Pourquoi l'assistant <span class="mark mark--sky">déçoit</span>, en pratique</h2>
    <p class="lead rise" style="margin-top:18px">On s'en sert comme d'un super moteur de recherche : une question, une réponse, sans l'équiper. Alors il faut tout réexpliquer, recopier, corriger.</p>
    <div class="cols--3" style="display:grid;margin-top:34px;align-items:start">
      <div class="card sk fill-lav frag"><h3>On oublie le contexte</h3><p>Qui je suis, pour qui, avec quelles règles. Sans ça, la réponse reste générique.</p></div>
      <div class="card sk fill-sky frag"><h3>On oublie la connexion</h3><p>Elle ne voit ni Outlook, ni Excel, ni vos documents. On recopie tout à la main.</p></div>
      <div class="card sk fill-mint frag"><h3>On oublie la mémoire</h3><p>Chaque fois, on repart de zéro et on réexplique.</p></div>
    </div>
    <div class="cols mt" style="align-items:center">
      <p class="idea frag" style="font-size:46px">Résultat : on passe parfois <span class="mark mark--blush">plus de temps</span> qu'à faire la tâche soi-même.</p>
      {tip("Près de 40 % du temps gagné grâce à l'IA est reperdu à corriger, réécrire ou vérifier ce qu'elle produit, surtout avec des outils génériques.", "Workday, enquête auprès de 3 200 salariés, janvier 2026", "frag")}
    </div>''', seq=2, section=S945,
 notes="Transition : on vient de voir les pièces du harnais ; voilà ce qui se passe quand on les oublie. Faire réagir : qui s'est déjà dit que ça aurait été plus rapide de le faire soi-même ? La slide suivante montre pourquoi : il manque des pièces. Pour appuyer : 24 % des TPE et PME utilisent l'IA pour des chatbots, assistants ou outils de recherche d'informations (Baromètre France Num 2026).")

def yes(t): return f'<td class="ok">{t}</td>'
def no(t): return f'<td class="ko">{t}</td>'
slide(f'''    <p class="eyebrow">L'assistant et l'agent</p>
    <h2>Un assistant <span class="mark mark--lav">complet ou dégradé</span></h2>
    <table class="cmp mt">
      <thead><tr><th></th><th>IA « toute nue », mémoire désactivée</th><th>Chatbot de site, sans mémoire</th><th>Projet Claude, assistant Copilot</th></tr></thead>
      <tbody>
        <tr class="frag"><td class="row">Instructions</td>{no("seulement ta question")}{yes("configurées")}{yes("configurées")}</tr>
        <tr class="frag"><td class="row">Connaissances</td>{no("aucune de chez vous")}{yes("le contenu du site")}{yes("tes documents")}</tr>
        <tr class="frag"><td class="row">Mémoire</td>{no("repart de zéro")}{no("repart de zéro")}{yes("selon les réglages")}</tr>
        <tr class="frag"><td class="row">Outils</td><td class="mid">selon l'outil</td><td class="mid">selon la configuration</td><td class="mid">selon la licence</td></tr>
      </tbody>
    </table>
    {analogy("carte", "un GPS sans carte à jour ni adresse enregistrée : il marche, mais il te fait perdre du temps.", "frag mt")}''', seq=2, section=S945,
 notes="C'est toujours un assistant, mais avec moins de pièces. D'où des réponses plus génériques : ce n'est pas l'IA qui est moins bonne, c'est l'équipement.")

logic("L'assistant en vrai", 'Il <span class="mark">répond</span>, tu gardes la main', "", "C'est comme le GPS du téléphone : il propose l'itinéraire, c'est toi qui conduis.",
 [("Chatbot du site Summit Flow", "Assistant de type chatbot : il répond aux visiteurs à partir du contenu du site.", '<span class="live">démo en direct</span>'),
  ("Un projet Claude", "Des consignes et des documents de référence, pour des réponses dans ton cadre.", f'<span class="live">démo en direct</span>{golink("claude_projet", "Ouvrir le projet Claude : Correction TP Sudformadia")}'),
  ("L'équivalent dans Copilot", "Un agent créé avec « Créer un agent » (Agent Builder) : des consignes et des documents de référence, comme un projet Claude.", avous())],
 "fill-mint", "Le chatbot du site et le projet Claude se montrent en direct. Côté Copilot, chacun peut créer un agent avec Agent Builder (« Créer un agent ») : un nom, des consignes, des documents de référence. Les Notebooks Copilot rendent un service proche : réunir des notes et des documents pour travailler dessus.")


same = "".join(f'<span class="pill sk sk--thin">{t}</span>' for t in ["Modèle", "Instructions", "Connaissances", "Outils", "Compétences", "Mémoire", "Boucle"])
slide(f'''    <p class="eyebrow">L'assistant et l'agent</p>
    <h2>Assistant ou agent : <span class="mark mark--blush">le déclencheur</span> fait la différence</h2>
    <div class="cols mt" style="align-items:stretch">
      <div class="card sk fill-mint rise"><h3>L'assistant</h3><div class="pills">{same}</div><p class="trig frag"><b class="hand">Déclencheur</b>Ton message, à chaque question.</p></div>
      <div class="card sk fill-blush rise"><h3>L'agent</h3><div class="pills">{same}</div><p class="trig frag"><b class="hand">Déclencheur</b>Un objectif, un événement ou un horaire. Il enchaîne seul.</p></div>
    </div>
    {analogy("volant", "le même tracteur : soit tu conduis et il t'assiste, soit tu lances l'autoguidage sur la parcelle et tu surveilles depuis la cabine.", "frag mt")}''', seq=2, section=S945, notes="Les pièces sont les mêmes. Ce qui change, c'est qui appuie sur le bouton, et combien d'étapes il enchaîne sans toi.")

GARDE = f'''
    <div class="guards frag"><p class="hand guards-t">{icon("alert")}Deux garde-fous, toujours</p>
      <p><b>Un humain valide</b> avant que quoi que ce soit parte chez un client, un fournisseur ou un collègue.</p>
      <p><b>Aucune action irréversible</b> sans toi : payer, commander, supprimer, envoyer.</p></div>'''
logic("L'agent en vrai", 'Il <span class="mark mark--blush">poursuit un objectif</span>, dans ton cadre', "", "C'est comme l'autoguidage du tracteur : tu fixes la parcelle et le cadre, il trace les lignes, tu restes en cabine.",
 [("Super agent Lindy", "Un mélange des deux : tu lui parles comme à un assistant, puis il part faire le travail seul, comme un agent.", '<span class="live">démo en direct sur mon téléphone</span>'),
  ("Une tâche planifiée Claude", "Elle se lance seule à l'heure prévue, fait le travail, et me livre le résultat.", '<span class="live">démo en direct</span>'),
  ("Côté Copilot", "<b>Agent Builder</b> (« Créer un agent ») : un agent avec ses consignes et ses sources. Avec une demande planifiée, il se lance seul à l'heure prévue.", '<span class="avous">On le crée ensemble cet après-midi</span>')],
 "fill-blush", "Relier à l'anatomie : mêmes pièces que l'assistant, mais c'est l'objectif qui le lance. Puis les deux garde-fous : ils font partie du cadre qu'on lui donne, c'est le harnais qui les impose. Exemple Lindy : il prépare la commande, il ne la passe pas. Les super agents (Lindy, Hermes…) mélangent les deux logiques : on leur parle comme à un assistant, par message, et ils enchaînent ensuite plusieurs tâches seuls, avec leurs outils, comme un agent. Côté Copilot, nuance à donner : un agent créé avec Agent Builder répond surtout quand on lui écrit, il se comporte d'abord comme un assistant bien équipé ; il devient vraiment un agent quand une demande planifiée le lance seul. La création se fait cet après-midi. Côté Copilot, les invites planifiées dans Agent Builder arrivent entre mi-novembre et mi-décembre 2026 selon Microsoft (MC1302906) : vérifier la veille qu'elles sont ouvertes chez eux, sinon le montrer avec Claude seulement.", GARDE)

# Le harnais complet : le collègue numérique, avec ses garde-fous, et la façon de les tester
import re as _re
HUMAN_ALL = _re.sub(r'<g class="frag" data-step="\d+">', '<g>', HUMAN)
SHIELD = '<path d="M0 -60 L46 -44 V-6 C46 26, 22 46, 0 56 C-22 46, -46 26, -46 -6 V-44 Z" fill="#FCE4E8" stroke="#2A2F33" stroke-width="4" stroke-linejoin="round"/><path d="M-18 0 L-4 14 L22 -14" fill="none" stroke="#0B4F5C" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'
# Les garde-fous s'enfilent comme un équipement de chantier : casque et chaussures de sécurité.
# Les tests, c'est le caillou qui tombe : on vérifie que le casque tient.
GEAR = """<g class="frag" data-step="1">
        <path d="M128 74 C 126 14, 314 14, 312 74 Z" fill="#FCE4E8" stroke="#2A2F33" stroke-width="4" stroke-linejoin="round" filter="url(#rough)"/>
        <path d="M220 20 V 74 M176 30 C 170 46, 168 60, 170 74 M264 30 C 270 46, 272 60, 270 74" fill="none" stroke="#2A2F33" stroke-width="3" stroke-linecap="round"/>
        <rect x="112" y="68" width="216" height="16" rx="8" fill="#FCE4E8" stroke="#2A2F33" stroke-width="4"/>
        <path d="M104 584 H158 C 170 584, 178 592, 178 602 V 612 H 100 C 96 612, 96 600, 104 584 Z" fill="#FCE4E8" stroke="#2A2F33" stroke-width="4" stroke-linejoin="round"/>
        <path d="M282 584 H336 C 344 600, 344 612, 340 612 H 262 V 602 C 262 592, 270 584, 282 584 Z" fill="#FCE4E8" stroke="#2A2F33" stroke-width="4" stroke-linejoin="round"/>
        <path d="M150 586 V 610 M290 586 V 610" stroke="#2A2F33" stroke-width="3"/>
      </g>
      <g class="frag rock" data-step="2">
        <path d="M356 -70 L 392 -82 L 414 -58 L 404 -28 L 366 -24 L 346 -46 Z" fill="#D5EAEC" stroke="#2A2F33" stroke-width="4" stroke-linejoin="round" filter="url(#rough)"/>
        <path d="M330 -96 L 322 -118 M 360 -104 L 360 -128 M 392 -104 L 400 -126" fill="none" stroke="#0B4F5C" stroke-width="3" stroke-linecap="round"/>
        <path d="M300 4 L 318 -10 M 314 26 L 338 18 M 288 -14 L 296 -34" fill="none" stroke="#0B4F5C" stroke-width="3.5" stroke-linecap="round"/>
      </g>"""
HUMAN_GEAR = HUMAN_ALL.replace("</svg>", GEAR + "\n    </svg>").replace('viewBox="0 0 440 640"', 'viewBox="0 -140 440 780"')
def gcard(title, text, cls="blush", step=1):
    return f'<div class="comp sk fill-{cls} frag" data-step="{step}"><p class="hand comp-t">{title}</p><p class="comp-ex">{text}</p></div>'
slide(f'''    <h2>Le harnais complet, <span class="mark mark--blush">avec ses garde-fous</span></h2>
    <p class="howto">Les garde-fous font partie du réglage : on les écrit dans les consignes, et on vérifie qu'ils tiennent.</p>
    <div class="anat anat--guard">
      <div class="anat-col"><p class="col-h">Les garde-fous</p>
        {gcard("Un humain valide", "Rien ne part chez un client, un fournisseur ou un collègue sans relecture.")}
        {gcard("Rien d'irréversible", "Il ne paie pas, ne commande pas, ne supprime pas, n'envoie pas sans toi.")}
        {gcard("Ai-je le droit ?", "Données personnelles, clients ou confidentielles : seulement dans un outil validé.")}
      </div>
      <div class="anat-mid guard-mid">{HUMAN_GEAR}<p class="harness"><b class="hand">Casque et chaussures de sécurité.</b>On les règle, puis on vérifie qu'ils tiennent quand ça tombe.</p></div>
      <div class="anat-col"><p class="col-h">On les teste</p>
        {gcard("On essaie de le faire déraper", "Une demande ambiguë, une donnée sensible, une action interdite : il doit s'arrêter ou poser la question.", "teal", 2)}
        {gcard("On regarde ce qu'il fait", "Avant d'élargir, on relit ses réponses et ses actions sur quelques cas réels.", "teal", 2)}
        {gcard("On reteste à chaque changement", "Nouvelle consigne, nouvel outil, nouveau modèle : les garde-fous se revérifient.", "teal", 2)}
      </div>
    </div>''', seq=2, section=S945,
 notes="Reprendre le collègue numérique de tout à l'heure : mêmes pièces, et les garde-fous autour. Les trois de gauche se règlent dans les consignes et les droits d'accès. Les trois de droite disent comment on vérifie qu'ils tiennent : c'est ce qui permet de confier un travail à un assistant ou à un agent. Exemple à faire vivre : demander à l'agent de passer la commande lui-même ; il doit refuser et proposer de la préparer. Image du chantier : les garde-fous sont l'équipement de sécurité (premier clic), les tests sont le caillou qui tombe (deuxième clic) : on vérifie que le casque tient avant d'envoyer quelqu'un sur le chantier.")

slide(f'''    <div class="grow center-y">
      <p class="eyebrow">10h45</p>
      <h2 style="font-size:120px">Pause</h2>
      <p class="lead">On reprend à 11h00 avec la grille de décision.</p>
    </div>
    {pic("pause-samoyede", "Le samoyède fait une pause au soleil, une tasse fumante à côté de lui, face aux montagnes.", 880, 495, "position:absolute;right:110px;bottom:190px") if (IMG / "pause-samoyede.png").exists() else CUP}''', cls="slide--full", section="Pause",
 notes="")

chapter_slide(3)

# ---------- 11h00 Quand utiliser quoi ----------
# Arbre de décision : une question après l'autre, de la brique la plus simple à la plus avancée.
# Coordonnées en pixels de scène ; les traits sont dessinés en SVG sous les cases.
NODES = {
    "root": (0, 200, 150, 100, "Une tâche à réaliser", "", 1),
    "q1": (175, 185, 205, 130, "Vais-je la refaire souvent, de la même façon ?", "", 1),
    "qc": (410, 61, 190, 80, "De quel contexte a-t-elle besoin ?", "", 2),
    "qj": (410, 219, 190, 96, "Règles stables, rien à interpréter ?", "", 3),
    "qa": (630, 296, 190, 84, "Doit-elle se lancer seule, à heure fixe ?", "", 4),
    "qt": (848, 366, 156, 84, "Consignes et documents partagés ?", "", 5),
}
LEAVES = [
    ("prompt", 0, "Une demande", "Tout tient dans l'échange ou un fichier", "mint", 2),
    ("notes", 70, "Un bloc-notes", "Plusieurs documents à croiser", "mint", 2),
    ("cowork", 140, "Cowork, à vérifier", "Plusieurs étapes, plusieurs applications", "blush", 2),
    ("flux", 236, "Une automatisation simple", "Une règle Outlook, des règles fixes", "lav", 3),
    ("plan", 306, "Une demande planifiée", "Elle se relance seule, chaque jour ou semaine", "blush", 4),
    ("req", 376, "Une requête enregistrée", "Ta méthode, rappelée quand tu veux", "mint", 5),
    ("agent", 446, "Un agent Copilot", "Agent Builder : un assistant dédié, partagé", "mint", 5),
]
LX, LW, LH = 1050, 340, 62
def _mid(k):
    x, y, w, h = NODES[k][:4]
    return x + w, y + h / 2
def _leaf_y(name):
    return next(y for n, y, *_ in LEAVES if n == name) + LH / 2
EDGES = [("root", None, "q1", "", 1), ("q1", None, "qc", "non", 2), ("q1", None, "qj", "oui", 3),
         ("qc", "prompt", None, "", 2), ("qc", "notes", None, "", 2), ("qc", "cowork", None, "", 2),
         ("qj", "flux", None, "oui", 3), ("qj", None, "qa", "non", 4),
         ("qa", "plan", None, "oui", 4), ("qa", None, "qt", "non", 5),
         ("qt", "req", None, "non", 5), ("qt", "agent", None, "oui", 5)]
def _edge(src, leaf, node, label):
    x1, y1 = _mid(src)
    if leaf:
        x2, y2 = LX, _leaf_y(leaf)
    else:
        nx, ny, nw, nh = NODES[node][:4]
        x2, y2 = nx, ny + nh / 2
    xm = x1 + 14
    if not label:
        lab = ""
    elif leaf:
        lab = f'<text x="{x2 - 6}" y="{y2 - 8}" text-anchor="end" class="tl">{label}</text>'
    else:
        lab = f'<text x="{x2 + 8}" y="{y2 - nh / 2 - 7}" class="tl">{label}</text>'
    return f'<path d="M{x1} {y1} H{xm} V{y2} H{x2}"/>{lab}'
def tree_html(anim=True):
    fr = " frag" if anim else ""
    steps = sorted({e[4] for e in EDGES})
    svg = "".join(f'<g class="{fr.strip()}" data-step="{st}">' + "".join(_edge(a, l, n, lab) for a, l, n, lab, s2 in EDGES if s2 == st) + "</g>" for st in steps)
    nodes = "".join(f'<div class="tnode{" tnode--root" if k == "root" else ""}{fr}" data-node="{k}" data-step="{st}" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px"><span>{t}</span></div>'
                    for k, (x, y, w, h, t, _, st) in NODES.items())
    leaves = "".join(f'<div class="tleaf fill-{c}{fr}{" tleaf--check" if n == "cowork" else ""}" data-leaf="{n}" data-step="{st}" style="left:{LX}px;top:{y}px;width:{LW}px;height:{LH}px"><b class="hand">{t}</b><span>{d}</span></div>'
                     for n, y, t, d, c, st in LEAVES)
    return f'<div class="tree"><svg class="tree-lines" viewBox="0 0 1390 508" aria-hidden="true">{svg}</svg>{nodes}{leaves}</div>'

slide(f'''    <h2>Quelle brique <span class="mark">pour quelle tâche ?</span></h2>
    <p class="tree-gate frag" data-step="0"><b class="hand">Avant tout : ai-je le droit ?</b>Données personnelles, clients ou confidentielles : seulement dans un outil validé. Dans le doute, on demande à Romane, la référente IA.</p>
    {tree_html()}
    <div class="tree-foot">
      <p class="tree-legend"><span><i class="lg-mint"></i>assistant</span><span><i class="lg-lav"></i>automatisation</span><span><i class="lg-blush"></i>agent</span></p>
      <p class="tree-gate tree-gate--end frag" data-step="6"><b class="hand">Et si elle se trompe ?</b>Erreur coûteuse (client, paie, argent) : un humain valide chaque résultat, et on commence simple.</p>
    </div>''', seq=3, section="11h00 · Quand utiliser quoi",
 notes="Un clic par branche, tout dans l'environnement Copilot. D'abord la question zéro. Puis : vais-je refaire cette tâche souvent, de la même façon ? Non : c'est un besoin ponctuel, on choisit selon le contexte (une demande, un bloc-notes, ou Cowork pour plusieurs étapes, selon la licence). Oui : les règles sont-elles stables, sans rien à interpréter ? Oui : une automatisation simple, par exemple une règle Outlook. Non, il faut lire, interpréter ou décider : doit-elle se lancer seule à heure fixe ? Oui : une demande planifiée, c'est l'horaire qui la déclenche, on est déjà vers l'agent. Non : faut-il des consignes et des documents partagés avec l'équipe ? Oui : un agent Copilot, au sens de la journée un assistant dédié. Non : une requête enregistrée suffit. Les couleurs rappellent les trois logiques. Dernière question, pour toutes les branches : et si elle se trompe ? Si l'erreur coûte cher, un humain valide chaque résultat, et on commence en mode assistant avant d'automatiser. Ce sont les quatre questions du programme : répétitive, règles stables, interpréter ou décider, en cas d'erreur. C'est comme choisir l'outil à atteler : on regarde d'abord le travail à faire, pas l'outil le plus récent.")

slide(f'''    <h2>Une situation, <span class="mark mark--lav">l'arbre en direct</span></h2>
    <div class="decider decider--tree">
      <div><div class="tq-list"></div><button class="reset sk sk--thin" style="--radius:12px;margin-top:20px;padding:6px 16px;font-family:var(--font-hand);font-size:24px">Recommencer</button></div>
      <div class="verdict-box sk" aria-live="polite"><p class="lbl">L'arbre propose</p><p class="out"></p><p class="kind"></p><p class="mod"></p><p class="why"></p><p class="risk"></p><p class="guard">Et quelle que soit la brique : un humain valide avant que ça parte.</p></div>
    </div>''', seq=3, section="11h00 · Quand utiliser quoi",
 notes="Prendre une situation proposée par la salle et répondre avec le groupe, une question à la fois : les questions suivantes apparaissent selon les réponses. Cliquer sur une réponse précédente pour changer de branche. Recommencer pour une deuxième situation.")

quiz = [("Préparer une présentation PowerPoint à partir de mes notes", "assistant", "mint"),
        ("Chaque facture reçue par e-mail s'ajoute au tableau de trésorerie", "automatisation", "lav"),
        ("Chercher un produit chez plusieurs fournisseurs, comparer et me proposer le meilleur", "agent", "blush"),
        ("Analyser le tableau de bord du mois et en tirer trois points clés", "assistant", "mint")]
items = "".join(f'''<div class="ex sk" style="flex-direction:row;align-items:center;justify-content:space-between;gap:24px"><p style="font-size:30px">{q}</p><span class="mark mark--{c} frag hand" style="font-size:34px;white-space:nowrap">{a}</span></div>''' for q, a, c in quiz)
slide(f'''    <p class="eyebrow">À vous de jouer</p>
    <h2>Assistant, automatisation ou agent ?</h2>
    <p class="howto">On passe chaque situation dans l'arbre, à main levée.</p>
    <div class="stack mt">{items}</div>''', seq=3, section="11h00 · Quand utiliser quoi",
 notes="Slide tampon : à faire en cinq minutes, ou à sauter si on a pris du retard, l'atelier qui suit couvre la même chose. Les quatre situations viennent de la liste de mars. Vote à main levée, puis flèche droite. Les réponses sont des propositions : un débat est bienvenu, l'arbre sert d'arbitre.")

slide(f'''    <div class="stack">
      <div class="meta">
        <span class="tag sk">{icon("users")}En sous-groupes</span>
        <span class="tag sk">{icon("file")}L'arbre des briques</span>
      </div>
      <h2>Atelier : classer <span class="mark">vos situations</span></h2>
    </div>
    <div class="cols cols--1-2 grow" style="margin-top:40px;align-items:start;">
      <div>
      <ol class="steps steps--tight">
        <li class="frag"><strong>Reprends</strong> une situation de mars de ton pôle.</li>
        <li class="frag"><strong>Passe-la</strong> dans l'arbre, question par question.</li>
        <li class="frag"><strong>Note</strong> où elle tombe : assistant, notebook, automatisation, agent, ou on s'arrête.</li>
        <li class="frag"><strong>Mise en commun</strong> juste après, l'arbre à l'écran.</li>
      </ol>
      </div>
      <div class="stack">
        {pic("atelier-samoyede", "Le samoyède range des balles dans cinq paniers : assistant, notebook, automatisation, agent, on s'arrête.", 600, 338)}
        <div class="alert alert--compact sk" role="note">{icon("alert")}<div><p class="alert-title">Vigilance données</p><p>On décrit la tâche, pas son contenu : aucune donnée réelle.</p></div></div>
      </div>
    </div>''', seq=3, section="11h00 · Quand utiliser quoi",
 notes="Atelier avant le déjeuner, en sous-groupes par pôle. Chaque groupe reprend les situations de mars (slide 9) et les passe dans l'arbre de la slide 29, sur papier ou à l'oral. On ne cherche pas encore l'outil exact : on note juste où la situation tombe. La mise en commun suit directement, sur la slide suivante : on passe les situations dans l'arbre, à l'écran, avant le déjeuner.")

def chips(pole, items):
    return "".join(f'<button class="chip chip--tree sk sk--thin" data-k="{pole}-{i}"><span>{t}</span><span class="verdict">à passer dans l&#39;arbre</span></button>' for i, t in enumerate(items))
TMODAL = f'''<div class="tmodal" role="dialog" aria-modal="true" aria-label="La situation passée dans l'arbre" hidden>
      <div class="tmodal-card sk">
        <button class="tmodal-x sk sk--thin" aria-label="Fermer">Fermer</button>
        <p class="tmodal-sit"><span>La situation</span><b class="hand"></b></p>
        <div class="decider decider--tree decider--modal">
          <div><div class="tq-list"></div><button class="reset sk sk--thin">Recommencer</button></div>
          <div class="tmodal-right">
            <div class="tree-mini">{tree_html(anim=False)}</div>
            <div class="verdict-box sk" aria-live="polite"><p class="lbl">L'arbre propose</p><p class="out"></p><p class="kind"></p><p class="mod"></p><p class="why"></p><p class="risk"></p></div>
          </div>
        </div>
      </div>
    </div>'''
slide(f'''    <div class="stack">
      <span class="tag tag--soft sk">{icon("search")}Repérées en mars, à confirmer par la grille d'audit</span>
      <h2>Vos situations, <span class="mark">passées dans l'arbre</span></h2>
      <p class="howto">Un clic sur une situation : l'arbre s'ouvre, on répond ensemble, et on voit avec quel module de Copilot la faire.</p>
    </div>
    <div class="situations">
      <div class="pole"><h3>{icon("cart")}Commerce</h3>{chips("com", ["Commissions des vendeurs itinérants", "Contrôle des études de prix", "Estimation des reprises", "Ciblage pour les démonstrations", "Produit chez un fournisseur"])}</div>
      <div class="pole"><h3>{icon("ledger")}RH et compta</h3>{chips("rh", ["Variables de salaire", "Vérification des paiements clients", "Trésorerie quotidienne", "Saisie des pointages"])}</div>
      <div class="pole"><h3>{icon("mega")}Communication et direction</h3>{chips("cm", ["Planning de communication", "Bases de données pour la communication", "Création de tableaux de bord", "Analyse des tableaux de bord", "Présentations PowerPoint"])}</div>
    </div>
    <div class="legend"><span><i style="background:var(--mint)"></i>assistant ou notebook</span><span><i style="background:var(--lav)"></i>automatisation</span><span><i style="background:var(--blush)"></i>agent</span><span><i style="background:#E7EBEB"></i>on s'arrête</span><span>· un clic pour rouvrir l'arbre</span></div>
    {TMODAL}''',
 seq=3, section="11h00 · Quand utiliser quoi",
 notes="Atelier pratique, juste avant le déjeuner : mise en commun des sous-groupes, 25 minutes. Viser cinq situations, une par pôle plus celle qui fait débat ; les autres partent dans la grille d'audit. Un sous-groupe choisit une de ses situations : je clique, l'arbre s'ouvre. On lit chaque question à voix haute, le groupe répond, les autres peuvent contester. À la fin, l'arbre donne la brique (assistant, notebook, automatisation ou agent) et le module Copilot à utiliser. On ferme, la carte prend sa couleur. Cliquer sur une réponse précédente pour tester l'autre branche. Les désaccords sont les meilleurs moments : les noter pour la grille d'audit.")

slide(f'''    <div class="grow center-y">
      <p class="eyebrow">12h30</p>
      <h2 style="font-size:120px">Déjeuner</h2>
      <p class="lead">Reprise à 13h30 : on passe aux démonstrations.</p>
    </div>
    {art("dejeuner-samoyede", "Le samoyède attend devant son sac de randonnée ouvert.", (120, 150, 640, 460), CUP)}''', cls="slide--full", section="Déjeuner")

chapter_slide(4)

# ---------- 13h30 Démonstrations ----------
S1330 = "13h30 · Voir, puis faire"
slide('''    <p class="eyebrow">Pour les curieux · avant les démos</p>
    <h2>Comment deux logiciels <span class="mark mark--sky">se parlent</span></h2>
    <p class="howto">C'est ce qui donne à l'assistant et à l'agent leurs bras et leurs jambes : la connexion à vos outils et à vos sources.</p>
    <figure class="schema" role="img" aria-label="Schéma. Ton outil envoie une demande, un appel HTTP, au guichet d'Outlook, son API. Outlook renvoie une réponse. Quatre types d'appel : GET pour lire, POST pour créer, PATCH pour modifier, DELETE pour supprimer. Dans l'autre sens, le webhook : c'est Outlook qui sonne quand un courriel arrive, et ton scénario démarre."><!-- schema:logiciels-parlent --></figure>''',
 seq=4, cls="slide--schema", section=S1330,
 notes="Fil rouge : l'électricité. HTTP, c'est le courant qui circule dans les fils, la langue commune des logiciels. L'API, c'est la prise du logiciel. Un appel API, c'est brancher l'appareil et appuyer sur le bouton. Dans l'ordre du dessin : 1. HTTP, c'est la langue commune des logiciels sur internet. Un appel, c'est une demande. 2. L'API, c'est le guichet du logiciel : ce qu'il accepte qu'on lui demande. 3. Quatre verbes suffisent : lire, créer, modifier, supprimer. 4. Le webhook, c'est l'inverse : on ne demande plus, on est prévenu. Même dans Copilot, un assistant ou un agent qui utilise un outil fait exactement ça.")

# Prises de formes différentes : chaque logiciel a la sienne (API). MCP : la même prise partout.
def SOCK(x, y, kind, d, fill="#D5EAEC"):
    holes = {
        "rond": f'<circle cx="{x+28}" cy="{y+28}" r="4.5" fill="#2A2F33"/><circle cx="{x+44}" cy="{y+28}" r="4.5" fill="#2A2F33"/>',
        "fente": f'<rect x="{x+22}" y="{y+18}" width="6" height="20" rx="2" fill="#2A2F33"/><rect x="{x+44}" y="{y+18}" width="6" height="20" rx="2" fill="#2A2F33"/><rect x="{x+33}" y="{y+40}" width="6" height="10" rx="2" fill="#2A2F33"/>',
        "tri": f'<circle cx="{x+36}" cy="{y+18}" r="4.5" fill="#2A2F33"/><circle cx="{x+24}" cy="{y+38}" r="4.5" fill="#2A2F33"/><circle cx="{x+48}" cy="{y+38}" r="4.5" fill="#2A2F33"/>',
        "mcp": f'<rect x="{x+20}" y="{y+29}" width="32" height="14" rx="7" fill="#2A2F33"/>',
    }[kind]
    return f'<g data-d="{d}"><rect x="{x}" y="{y}" width="72" height="72" rx="14" fill="{fill}" stroke="#2A2F33" stroke-width="3.5"/>{holes}</g>'
def HEAD(x, y, kind, d, fill):
    shape = {"rond": f'<circle cx="{x+12}" cy="{y}" r="12"', "fente": f'<rect x="{x}" y="{y-12}" width="24" height="24" rx="3"', "tri": f'<path d="M{x} {y-13} L{x+24} {y} L{x} {y+13} Z"', "mcp": f'<rect x="{x}" y="{y-9}" width="26" height="18" rx="9"'}[kind]
    return f'<g data-d="{d}">{shape} fill="{fill}" stroke="#2A2F33" stroke-width="3"/></g>'
LOGS = [("Outlook", 4), ("Excel", 92), ("logiciel métier", 180)]
AGENT = f'<g data-d="0.1"><rect x="6" y="96" width="92" height="66" rx="12" fill="#FFFFFF" stroke="#2A2F33" stroke-width="4"/><path d="M28 120 h48 M28 136 h32" fill="none" stroke="#2A2F33" stroke-width="3" stroke-linecap="round"/></g><text data-d="0.2" x="52" y="188" text-anchor="middle" font-size="22" font-family="SF Hand" fill="#2A2F33">l\'agent</text>'
def cords(kinds, fills, base):
    out = []
    for i, ((name, y), k, f) in enumerate(zip(LOGS, kinds, fills)):
        cy = y + 36
        out.append(SOCK(340, y, k, base + i * 0.12))
        out.append(f'<path data-d="{base + 0.3 + i*0.12}" class="ink" d="M98 129 C 180 129, 210 {cy}, 300 {cy}" style="stroke-width:3"/>')
        out.append(HEAD(304, cy, k, base + 0.5 + i * 0.12, f))
        out.append(f'<text data-d="{base + 0.6 + i*0.12}" x="296" y="{cy - 16 if i < 2 else cy + 28}" text-anchor="end" font-size="20" font-family="SF Hand" fill="#0B4F5C">{name}</text>')
    return "".join(out)
SANS = f"""<svg class="illu scene-svg" viewBox="0 0 420 260" aria-hidden="true">{AGENT}{cords(["rond", "fente", "tri"], ["#FCE4E8", "#E6E0F4", "#FFFFFF"], 0.2)}</svg>"""
AVEC = f"""<svg class="illu scene-svg" viewBox="0 0 420 260" aria-hidden="true">{AGENT}{cords(["mcp", "mcp", "mcp"], ["#D6F1E6"] * 3, 0.2)}</svg>"""
WALL = lambda x, y, d: f'<g data-d="{d}"><rect x="{x}" y="{y}" width="92" height="112" rx="16" fill="#D5EAEC" stroke="#2A2F33" stroke-width="4"/><circle cx="{x+46}" cy="{y+56}" r="30" fill="#FFFFFF" stroke="#2A2F33" stroke-width="3.5"/><circle cx="{x+34}" cy="{y+56}" r="5" fill="#2A2F33"/><circle cx="{x+58}" cy="{y+56}" r="5" fill="#2A2F33"/></g>'
APPEL = f"""<svg class="illu scene-svg" viewBox="0 0 420 260" aria-hidden="true">
  <g data-d="0.1"><rect x="14" y="88" width="104" height="72" rx="10" fill="#FFFFFF" stroke="#2A2F33" stroke-width="4"/><path d="M4 172 H128" fill="none" stroke="#2A2F33" stroke-width="4" stroke-linecap="round"/></g>
  <text data-d="0.3" x="66" y="200" text-anchor="middle" font-size="22" font-family="SF Hand" fill="#2A2F33">ton outil</text>
  <path data-d="0.35" class="ink" d="M118 124 C 170 124, 170 160, 214 160 H232"/>
  <g data-d="0.5"><rect x="232" y="138" width="46" height="44" rx="10" fill="#E6E0F4" stroke="#2A2F33" stroke-width="4"/><path d="M278 150 H300 M278 170 H300" fill="none" stroke="#2A2F33" stroke-width="4" stroke-linecap="round"/></g>
  {WALL(310, 104, 0.2)}
  <text data-d="0.25" x="356" y="90" text-anchor="middle" font-size="22" font-family="SF Hand" fill="#2A2F33">Outlook</text>
  <path data-d="0.8" class="inkt" d="M150 62 H262 M250 52 L262 62 L250 72"/>
  <text data-d="0.85" x="206" y="44" text-anchor="middle" font-size="22" fill="#0B4F5C" font-family="SF Hand">une demande</text>
  <path data-d="1.1" class="inkt" d="M262 232 H150 M162 222 L150 232 L162 242"/>
  <text data-d="1.15" x="206" y="216" text-anchor="middle" font-size="22" fill="#0B4F5C" font-family="SF Hand">une réponse</text>
</svg>"""
ICONS["badge"] = '<rect data-d="0.1" x="14" y="20" width="56" height="56" rx="8" fill="#FCE4E8" stroke="#2A2F33" stroke-width="3"/><circle data-d="0.3" cx="34" cy="42" r="7" class="ink" style="stroke-width:3"/><path data-d="0.4" class="ink" d="M24 62 C 28 54, 40 54, 44 62 M50 40 H62 M50 50 H60" style="stroke-width:3"/><path data-d="0.2" class="ink" d="M34 20 V10 H50 V20" style="stroke-width:3"/>'
ICONS["usbc"] = '<rect data-d="0.1" x="22" y="6" width="40" height="34" rx="8" fill="#D6F1E6" stroke="#2A2F33" stroke-width="3"/><rect data-d="0.3" x="32" y="40" width="20" height="16" rx="6" fill="#FFFFFF" stroke="#2A2F33" stroke-width="3"/><path data-d="0.5" class="ink" d="M42 6 C 42 -4, 70 -4, 70 14 V 70 C 70 82, 50 82, 46 76" style="stroke-width:3"/><rect data-d="0.6" x="8" y="62" width="30" height="20" rx="5" fill="#FFFFFF" stroke="#2A2F33" stroke-width="3"/>'
slide(f'''    <p class="eyebrow">Pour les curieux · le fil de l'électricité</p>
    <h2>Chacun sa prise, <span class="mark">ou la même partout</span></h2>
    <p class="howto">Les bras et les jambes, branchés : chaque outil connecté est une prise de plus pour l'assistant ou l'agent.</p>
    <div class="scene-row">
      <figure class="scene frag" data-step="1">{APPEL}<figcaption><b class="hand">L'API et l'appel</b>L'API, c'est la prise du logiciel. Un appel : on branche, une demande part, une réponse revient.</figcaption></figure>
      <figure class="scene frag" data-step="2">{SANS}<figcaption><b class="hand">Sans MCP</b>Chaque prise a sa forme : un câble sur mesure par logiciel, à fabriquer et à entretenir.</figcaption></figure>
      <figure class="scene frag" data-step="3">{AVEC}<figcaption><b class="hand">Avec MCP</b>Tous les logiciels offrent la même prise : l'agent se branche partout de la même façon.</figcaption></figure>
    </div>
    <div class="cols bocal-row">
      {analogy("usbc", "le chargeur USB-C : un seul câble pour le téléphone, l'ordinateur et la tablette. MCP fait pareil entre un agent et vos logiciels.", "frag")}
      {analogy("badge", "un badge visiteur. C'est <b>OAuth</b> : tu laisses un outil entrer dans ton compte sans donner ton mot de passe, et tu peux reprendre le badge.", "frag")}
    </div>''',
 seq=4, section=S1330, notes="On reprend le fil de la slide précédente, un dessin par clic. 1. La prise et le branchement : l'API est la prise d'Outlook, l'appel c'est brancher, demande puis réponse, et le courant c'est HTTP. 2. Sans MCP : trois logiciels, trois prises de formes différentes, donc trois câbles sur mesure à fabriquer et à entretenir. 3. Avec MCP : chaque logiciel propose la même prise, l'agent n'a besoin que d'un type de câble. C'est le chargeur USB-C. MCP, le Model Context Protocol, est un standard ouvert publié par Anthropic le 25 novembre 2024. La documentation officielle de MCP fait elle-même la comparaison avec un port USB-C. Puis le badge : OAuth, c'est ce qu'ils verront quand Copilot ou un autre outil demande « autoriser l'accès à votre compte ».")
def edit(k): return f'<td class="edit sk" contenteditable="true" data-k="{k}" data-ph="à compléter"></td>'

# Et dans Copilot : jusqu'où brancher les bras et les jambes
slide(f'''    <h2>Et dans Copilot : <span class="mark">jusqu'où brancher ?</span></h2>
    <p class="howto">Les bras et les jambes de l'agent dépendent de l'outil qui le construit.</p>
    <div class="cols mt" style="align-items:stretch">
      <div class="card sk fill-mint frag"><h3>Avec Agent Builder, vu ce matin</h3><p>On branche les sources et les outils de Microsoft 365 : SharePoint, OneDrive, Teams, Outlook, et le web.</p><p class="mt-s">Les autres logiciels ne sont accessibles que si l'informatique a ouvert un connecteur.</p><p class="trig-who">Inclus avec la licence Copilot</p></div>
      <div class="card sk fill-blush frag"><h3>Pour aller plus loin : Copilot Studio</h3><p>D'autres logiciels, des actions, un agent qui se lance seul.</p><p class="mt-s">Autre mode de facturation : à l'usage, en crédits. Et l'administrateur peut l'avoir désactivé.</p><p class="trig-who">À voir avec l'informatique avant de se lancer</p></div>
    </div>''', seq=4, section=S1330,
 notes="Message à faire passer : avec ce qu'ils ont, Agent Builder, on branche surtout l'univers Microsoft 365. Les connecteurs vers d'autres logiciels (Copilot connectors) sont ouverts par l'informatique. Copilot Studio va plus loin, mais l'usage autonome se paie en crédits Copilot, en plus des licences, et il peut être désactivé dans l'entreprise : à vérifier avec le service informatique. Sources : guides de licence Copilot Studio 2026 et Microsoft Q&A, voir SOURCES.md.")

def demo(n, title, mk, what, shots, notes):
    s = "".join(shot(x) for x in shots)
    slide(f'''    <p class="eyebrow">Démo {n}</p>
    <h2>{title}</h2>
    <div class="cols--1-2 grow" style="display:grid;grid-template-columns:1fr 1.5fr;gap:40px;margin-top:30px">
      <div class="stack"><ul class="dash">{"".join(f'<li class="frag">{w}</li>' for w in what)}</ul><span class="live">en direct</span></div>
      <div class="stack" style="display:grid;gap:20px">{s}</div>
    </div>''', seq=4, section="13h30 · Voir, puis faire", notes=notes)

slide(f'''    <div class="stack">
      <div class="meta"><span class="tag sk">{icon("users")}Ensemble, puis chacun sur son poste</span><span class="tag tag--soft sk">{icon("search")}Selon les licences disponibles</span></div>
      <h2>À vous : <span class="mark">votre premier assistant</span></h2>
    </div>
    <div class="cols grow" style="margin-top:30px;align-items:start;grid-template-columns:1.35fr 1fr">
      <ol class="steps steps--tight">
        <li class="frag"><strong>Ensemble d'abord</strong> : une consigne écrite en direct, sur un cas de la salle.</li>
        <li class="frag"><strong>Choisis</strong> une tâche simple de ton quotidien.</li>
        <li class="frag"><strong>Écris</strong> la consigne : rôle, contexte, ce que tu attends.</li>
        <li class="frag"><strong>Teste</strong> sur un exemple sans donnée réelle.</li>
        <li class="frag"><strong>Note</strong> ce qui marche et ce qui coince.</li>
      </ol>
      <div class="stack"><div class="go-row">{avous("Pas à pas : créer un agent dans Copilot", "md-agents")}<button class="avous avous--go" data-act="minideck" data-target="md-mars">Les cas de mars</button></div><figure class="shot-copilot"><img src="images/copilot-assistants.png" alt="Copilot : menu Assistants, puis Nouvel agent"><figcaption>Dans Copilot : <b>Assistants</b>, puis <b>Nouvel agent</b>.</figcaption></figure></div>
    </div>''', seq=4, section="13h30 · Voir, puis faire",
 notes="Manipulation guidée après les trois démos. On commence par un exemple fait tous ensemble : un cas proposé par la salle, la consigne écrite en direct (rôle, contexte, attendu), testée devant tout le monde. Ensuite seulement, chacun sur son poste. Prévoir un plan B si les licences ne permettent pas de créer un assistant : faire rédiger la consigne et la tester dans le chat Copilot.")

slide(f'''    <div class="grow center-y">
      <p class="eyebrow">15h00</p>
      <h2 style="font-size:120px">Pause</h2>
      <p class="lead">Reprise à 15h15 : limites, investissement et choix d'un outil.</p>
    </div>
    {pic("pause-samoyede", "Le samoyède fait une pause au soleil, une tasse fumante à côté de lui, face aux montagnes.", 880, 495, "position:absolute;right:110px;bottom:190px") if (IMG / "pause-samoyede.png").exists() else CUP}''', cls="slide--full", section="Pause")

chapter_slide(5)

# ---------- 15h15 Limites et choix ----------
slide('''    <p class="eyebrow">Limites</p>
    <h2>Ce que l'IA permet, <span class="mark mark--blush">ce qu'elle ne permet pas</span></h2>
    <div class="cols grow mt" style="align-items:start">
      <div class="card sk fill-mint"><h3>Elle permet</h3><ul>
        <li class="frag">Rédiger un premier jet, reformuler</li><li class="frag">Résumer un long document</li><li class="frag">Classer, extraire, comparer</li><li class="frag">Gagner du temps sur ce qui se répète</li></ul></div>
      <div class="card sk fill-blush"><h3>Elle ne permet pas</h3><ul>
        <li class="frag">Garantir que c'est juste</li><li class="frag">Connaître vos règles si on ne les lui donne pas</li><li class="frag">Décider à votre place</li><li class="frag">Réparer un process mal défini</li></ul></div>
    </div>''', seq=5, section="15h15 · Limites, investissement, choix",
 notes="Faire apparaître ligne par ligne, en alternant les deux colonnes si on veut faire réagir.")

# L'investissement réel, en iceberg : ce qu'on voit (la licence, l'outil) et ce qui fait la valeur (le temps, la méthode)
ICE_ABOVE = [("La licence Copilot", "Votre entreprise la paie, par utilisateur. Copilot Chat seul est inclus avec Microsoft 365."),
             ("L'outil en démo", "La demande, l'agent : ça marche en cinq minutes devant vous.")]
ICE_BELOW = [("Le temps de prise en main", "Quelques semaines d'essais, pas une après-midi"),
             ("La méthode", "Cadrer le besoin, écrire les consignes, choisir les bons documents"),
             ("La relecture", "Jusqu'à 40 % du temps gagné peut repartir en vérifications"),
             ("Un référent par pôle", "Quelqu'un qui fait vivre l'outil et répond aux questions"),
             ("Des règles partagées", "Ce qu'on a le droit de saisir, qui valide, comment on le signale"),
             ("La formation", "Comme ces cinq jours : apprendre en le faisant sur ses propres cas")]
ICE_SVG = """<svg class="iceberg" viewBox="0 0 520 620" aria-hidden="true">
  <rect x="0" y="176" width="520" height="444" fill="#D5EAEC" opacity=".45"/>
  <path d="M0 176 C 80 168, 160 186, 260 176 S 440 166, 520 180" fill="none" stroke="#0B4F5C" stroke-width="3.5"/>
  <path d="M170 176 L222 92 L246 118 L282 46 L330 128 L352 110 L372 176 Z" fill="#FFFFFF" stroke="#2A2F33" stroke-width="4" stroke-linejoin="round" filter="url(#rough)"/>
  <path d="M170 176 L372 176 L452 300 L430 430 L330 580 L196 520 L110 360 Z" fill="#9FCBD1" opacity=".55"/>
  <path d="M170 176 L110 360 L196 520 L330 580 L430 430 L452 300 L372 176" fill="none" stroke="#2A2F33" stroke-width="4" stroke-linejoin="round" filter="url(#rough)"/>
</svg>"""
above = "".join(f'<p class="ice-i rise"><b class="hand">{t}</b>{d}</p>' for t, d in ICE_ABOVE)
below = "".join(f'<p class="ice-i frag"><b class="hand">{t}</b>{d}</p>' for t, d in ICE_BELOW)
slide(f'''    <h2>Ce que ça demande <span class="mark">vraiment</span></h2>
    <div class="ice">
      <div class="ice-art">{ICE_SVG}</div>
      <div class="ice-txt">
        <p class="ice-h">Ce que l'on voit</p>
        <div class="ice-above">{above}</div>
        <p class="ice-h ice-h--below">Ce qui fait la valeur : moins visible, plus long à construire</p>
        <div class="ice-below">{below}</div>
      </div>
    </div>
''', seq=5, section="15h15 · Limites, investissement, choix",
 notes="L'investissement réel, prévu au programme : en temps de prise en main et d'accompagnement, et en budget. Au-dessus de l'eau, ce qu'on voit : la licence, que l'entreprise paie par utilisateur, et l'outil qui marche en démo. En dessous, ce qui fait que ça marche vraiment, et qui prend du temps. Le gain n'est pas automatique : la Banque de France montre que début 2026, seules 31 % des entreprises qui utilisent l'IA générative constatent déjà un gain de productivité (bulletin n° 266, septembre 2026). Le 40 % vient de l'étude Workday de janvier 2026, vue au chapitre 2. Le chiffrage exact des licences se fait avec l'informatique.")

checks = ["Le besoin est-il clair et décrit ?", "L'outil est-il déjà dans notre environnement ?", "Où vont nos données ?", "Qui le fera vivre après la formation ?", "Comment saura-t-on que ça marche ?", "Que se passe-t-il s'il se trompe ?"]
ck = "".join(f'<li class="rise"><button class="sk sk--thin" data-k="choix-{i}" aria-pressed="false" aria-label="Cocher"><svg viewBox="0 0 34 34"><path d="M6 18 L14 26 L29 8"/></svg></button><span>{c}</span></li>' for i, c in enumerate(checks))
slide(f'''    <p class="eyebrow">Choisir un outil</p>
    <h2>Six questions <span class="mark">avant de signer</span></h2>
    <div class="pic-row pic-row--top mt">
      <ul class="checks checks--tight">{ck}</ul>
      {pic("choisir-samoyede", "Choisir un outil : un samoyède écrasé sous un sac trop chargé d'outils, l'autre léger, avec le bon sac.", 760, 428)}
    </div>''', seq=5, section="15h15 · Limites, investissement, choix",
 notes="Pour les décideurs : ces questions valent pour n'importe quel outil. Cocher en direct celles auxquelles l'entreprise sait déjà répondre.")

# Doutes et réserves : on reprend les freins du matin et on les trie, un clic par carte
srt = "".join(f'<button class="chip chip--sort sk sk--thin" data-k="frein-{i}"><span>{t}</span><span class="verdict">à trier</span></button>' for i, (t, *_) in enumerate(FREINS))
srt += "".join(f'<div class="chip chip--sort chip--free sk sk--thin" data-k="frein-libre-{i}"><span class="free-t" contenteditable="true" data-k="frein-libre-{i}" data-ph="une autre réserve…"></span><button class="verdict">à trier</button></div>' for i in range(4))
slide(f'''    <h2>Vos réserves : <span class="mark mark--blush">lesquelles sont fondées ?</span></h2>
    <p class="howto">Les freins de ce matin, et ceux qu'on ajoute à la main. Un clic sur l'étiquette pour classer.</p>
    <div class="sort-grid">{srt}</div>
    <div class="legend"><span><i style="background:var(--blush)"></i>fondé : on en tient compte</span><span><i style="background:var(--lav)"></i>à vérifier avant d'y aller</span><span><i style="background:var(--mint)"></i>réglé au jour 5</span></div>
    <p class="small" style="margin-top:18px">Une réserve fondée ne dit pas non : elle dit ce qu'il faut vérifier avant de décider.</p>''',
 seq=5, section="15h15 · Limites, investissement, choix",
 notes="Le temps réservé aux doutes, prévu au programme. On reprend les huit freins de la slide 8 et on les trie avec le groupe : fondé (on en tient compte dans le choix), à vérifier (une question à poser avant de signer, cf. les six questions), réglé au jour 5 (RGPD, écologie, charte). Ajouter à l'oral une réserve qui ne serait pas dans la liste.")

chapter_slide(6)

# ---------- 16h00 Garde-fous ----------
# Une seule slide : la boucle de validation en haut, les trois règles en dessous
RULES = [("alert", "Ce qu'on ne saisit pas", "Données personnelles, données clients, informations confidentielles : jamais dans un outil non validé."),
         ("search", "On relit tout", "Chaque réponse se relit avant d'être utilisée ou envoyée. C'est la boucle du haut."),
         ("users", "On dit qu'on l'a utilisée", "Quand un document a été préparé avec l'IA, on le signale.")]
rules = "".join(f'<div class="rule sk fill-mint frag"><span class="rule-n hand">{i}</span><div><h3>{icon(ic)}{t}</h3><p>{d}</p></div></div>' for i, (ic, t, d) in enumerate(RULES, 1))
slide(f'''    <h2>L'humain valide, <span class="mark">trois règles dès demain</span></h2>
    <p class="lead" style="margin-top:10px">L'IA peut se tromper avec aplomb : c'est l'« hallucination » vue ce matin. Alors on garde la main.</p>
    <div class="vloop" role="img" aria-label="L'IA propose, tu relis et corriges, puis ça part. Si ce n'est pas bon, on reprend.">
      <span class="vstep sk fill-card">L'IA propose</span><svg class="varrow" viewBox="0 0 60 24" aria-hidden="true"><path d="M2 12h52M44 4l10 8-10 8"/></svg>
      <span class="vstep sk fill-mint">Tu relis et tu corriges</span><svg class="varrow" viewBox="0 0 60 24" aria-hidden="true"><path d="M2 12h52M44 4l10 8-10 8"/></svg>
      <span class="vstep sk fill-card">Ça part</span>
      <span class="vback hand">pas bon ? on reprend</span>
    </div>
    <div class="rules">{rules}</div>
    <p class="small" style="margin-top:18px">Le cadre RGPD, légal, environnemental et éthique est traité en détail au jour 5.</p>''',
 seq=6, section="16h00 · À quoi faire attention",
 notes="Un seul message pour ce chapitre : l'humain valide, et trois règles simples dès demain. Le bon à tirer avant d'imprimer un flyer : même quand la maquette semble parfaite, quelqu'un relit et signe avant l'envoi à l'imprimeur. La boucle est la clé : relire n'est pas une perte de temps, c'est la condition pour déléguer. Chiffre utile à l'oral : seuls 26 % des utilisateurs de l'IA au travail disent que leur direction est clairement alignée sur l'IA (Microsoft, Work Trend Index 2026), d'où l'intérêt de règles simples et partagées. La troisième règle est une proposition : la valider avec la référente IA avant la séance.")

# Exercice : trouver les erreurs dans une comparaison de fournisseurs préparée par l'IA (corpus fictif Lagarrigue)
ERR_LINES = [("Alpha Pièces", "premium", "627,00 €", "2 jours", "", ""),
             ("Bravo Agri", "standard", "624,00 €", "4 jours", "", "e1"),
             ("Charlie Mécanique", "économique", "592,40 €", "7 jours", "recommandé", "e2")]
rows_e = "".join(f'<tr class="err-row{" err-row--" + k if k else ""}"><td>{a}</td><td>{b}</td><td>{c}</td><td>{d}</td><td>{e}</td></tr>' for a, b, c, d, e, k in ERR_LINES)
slide(f'''    <h2>Exercice : <span class="mark">trouvez les erreurs</span></h2>
    <p class="howto">La demande : 6 filtres hydrauliques, 10 filtres à air, 20 filtres à huile, au meilleur prix et vite. Copilot a comparé les trois catalogues fournisseurs (fictifs). Deux erreurs s'y cachent.</p>
    <div class="err-wrap mt">
      <table class="err-table"><thead><tr><th>Fournisseur</th><th>Gamme</th><th>Total HT</th><th>Livraison</th><th></th></tr></thead><tbody>{rows_e}</tbody></table>
      <div class="err-side">
        <p class="err-claim">« Charlie Mécanique est le moins cher et livre sous 7 jours ouvrés. Je recommande de passer la commande chez lui. »</p>
        <div class="err-ans frag"><p><b>1. Une remise oubliée.</b>Bravo accorde 5 % dès 30 articles : 36 articles, donc 592,80 €, au prix de Charlie.</p><p><b>2. Un stock ignoré.</b>Charlie n'a que 4 filtres hydrauliques : les 2 autres arrivent sous 15 jours ouvrés.</p><p><b>Et la décision :</b>commander revient au magasin, pas à l'IA. Ici, Bravo livre tout en 4 jours.</p></div>
      </div>
    </div>''', seq=6, section="16h00 · À quoi faire attention",
 notes="Exercice de 10 minutes, par deux, sur le corpus fictif : les trois catalogues (Alpha, Bravo, Charlie) et leur onglet Conditions. Projeter la comparaison, laisser chercher avec les catalogues sous les yeux, puis révéler. Erreur 1 : la remise quantité de Bravo (5 % à partir de 30 articles) n'est pas appliquée ; 624 € moins 5 % donne 592,80 € HT, à 40 centimes de Charlie. Erreur 2 : le stock de Charlie ne couvre pas la commande (4 filtres hydrauliques en stock pour 6 demandés, réapprovisionnement en 15 jours ouvrés). Point 3 : l'IA s'arroge la décision de commander. Conclusion : Bravo livre la commande complète en 4 jours pour le même prix. Message : on relit avec les documents sources, pas seulement le résultat.")

chapter_slide(7)

# Les situations repérées en mars : elles servent d'exemples pour la grille d'audit
MARS = [("Commerce", ["Commissions des vendeurs itinérants", "Contrôle des études de prix, vente et reprise", "Estimation des reprises", "Ciblage de clients pour les démonstrations", "Trouver un produit chez un fournisseur"]),
        ("RH et compta", ["Variables de salaire", "Vérification des paiements clients pour les commissions", "Trésorerie quotidienne, factures reçues par e-mail", "Saisie des pointages, du papier au logiciel"]),
        ("Communication", ["Planning de communication", "Optimisation des bases de données pour la communication"]),
        ("Direction", ["Création de tableaux de bord", "Analyse des tableaux de bord", "Présentations PowerPoint"])]
GRILLE_URL = "https://airtable.com/appnUIHs250UX7TC8/pagUud0FR1Zsgu6gA/form"  # formulaire Airtable, réponses envoyées à contact@summitflow.fr

# ---------- 16h30 Intersession ----------
# On fait d'abord une ligne ensemble, colonne par colonne, puis chacun remplit la sienne
cols = [("Le déroulé actuel", True), ("Fréquence et temps passé", False), ("Les personnes impliquées", False), ("Outils et documents", False), ("Déclencheur et résultat", False), ("Part de jugement humain", True), ("Sensibilité des données", True), ("Bénéfice attendu", False), ("Type de solution pressenti <span class=\"ref-tree\">voir l'arbre</span>", True)]
ex_rows = "".join(f'<tr class="{"is-key" if k else ""}"><td class="row"><b class="hand">{i+1}.</b> {t}</td><td class="edit sk" contenteditable="true" data-k="exemple-c{i}" data-ph="à remplir avec le groupe"></td></tr>' for i, (t, k) in enumerate(cols))
slide(f'''    <p class="eyebrow">L'intersession · ensemble d'abord</p>
    <h2>Une ligne <span class="mark mark--lav">remplie en direct</span></h2>
    <div class="ex-head">
      <label class="pick"><span>Notre exemple, parmi les cas de mars :</span><select class="case-pick" data-k="exemple-cas"><option value="">choisir un cas</option>{"".join(f'<optgroup label="{p}">' + "".join(f'<option>{c}</option>' for c in cs) + '</optgroup>' for p, cs in MARS)}</select></label>
      <p class="ex-deroule"><b>Le déroulé attendu :</b> chaque étape dans l'ordre, qui la fait, avec quel outil, en combien de temps. Comme on l'expliquerait à un remplaçant.</p>
    </div>
    <table class="readgrid audit-ex mt"><tbody>{ex_rows}</tbody></table>''',
 seq=7, section="16h30 · Lancement de l'intersession",
 notes="On remplit ensemble avant que chacun s'y mette. Choisir le cas dans la liste déroulante, parmi ceux de mars, par exemple les commissions des vendeurs itinérants, estimées à 4 h. Expliquer chaque colonne au moment où on la remplit. Les colonnes surlignées sont celles qui posent le plus de questions. Clique dans une case pour écrire.")

# La grille d'audit présentée comme une vraie feuille : en-têtes verticaux, des cas de mars ou d'autres
heads = "".join(f'<th class="{"is-key" if k else ""}"><span><i>{i+1}</i>{re.sub(r"<[^>]+>.*", "", t).strip()}</span></th>' for i, (t, k) in enumerate(cols))
AUDIT_ROWS = [("Commissions des vendeurs itinérants", "Commerce", "mars"), ("Variables de salaire", "RH et compta", "mars"),
              ("Planning de communication", "Communication", "mars"), ("", "Votre pôle", "autre")]
def _arow(t, p, tag):
    name = f'<b>{t}</b>' if t else '<b class="ph">Une autre tâche, de votre choix</b>'
    return f'<tr class="{"is-new" if not t else ""}"><td class="task"><span class="tp">{p} · {"vu en mars" if tag == "mars" else "à ajouter"}</span>{name}</td>' + "".join(f'<td class="{"is-key" if k else ""}"></td>' for _, k in cols) + "</tr>"
arows = "".join(_arow(*r) for r in AUDIT_ROWS)
slide(f'''    <h2>La grille d'audit : <span class="mark">trois à cinq tâches par pôle</span></h2>
    <div class="sheet-top"><p class="howto">Des cas de mars ou d'autres : tout ce qui vous prend du temps, crée des erreurs ou de la frustration.</p><button class="avous avous--go" data-act="minideck" data-target="md-mars">Les cas de mars</button></div>
    <table class="sheet"><thead><tr class="grp"><th class="task-h"></th><th colspan="5"><span>Comment ça se passe aujourd'hui</span></th><th colspan="2" class="grp--b"><span>Les points d'attention</span></th><th colspan="2" class="grp--c"><span>Ce qu'on en attend</span></th></tr><tr><th class="task-h">La tâche</th>{heads}</tr></thead><tbody>{arows}</tbody></table>
    <p class="sheet-leg"><span><i class="lg-mint"></i>les colonnes qui demandent le plus de réflexion</span><span class="ref-tree">voir l'arbre</span></p>''',
 seq=7, section="16h30 · Lancement de l'intersession",
 notes="Chacun repart avec la même grille que l'exemple rempli ensemble. Les cas de mars sont un point de départ, pas une liste fermée : toute tâche qui coûte du temps, des erreurs ou de la frustration a sa place. Trois à cinq tâches par pôle. Rappeler la question zéro : la colonne sensibilité des données sert à vérifier qu'on a le droit. La colonne 9 renvoie à l'arbre de la matinée.")


# La grille PDF remplissable, intégrée au deck pour le bouton de téléchargement (aucun réseau nécessaire)
import base64 as _b64
_pdf = pathlib.Path(__file__).resolve().parent.parent / "dist" / "grille-audit-lagarrigue.pdf"
PDF_DATA = f'<script type="text/plain" id="pdf-grille">{_b64.b64encode(_pdf.read_bytes()).decode()}</script>' if _pdf.exists() else ""
def qr_block():
    if (IMG / "qr-grille.png").exists():
        return '<figure class="qr"><img src="images/qr-grille.png" alt="QR code vers la grille d\'audit en ligne"></figure>'
    return '<figure class="qr qr--todo"><p>QR code<br>à générer</p></figure>'
slide(f'''    <h2>Remplir la grille : <span class="mark">en ligne ou en PDF</span></h2>
    <p class="howto">À me renvoyer au plus tard deux semaines avant le jour 2, soit début janvier.</p>
    <div class="cols mt" style="align-items:stretch">
      <div class="card sk fill-mint grille-way">{qr_block()}<div><h3>En ligne, sur ton téléphone</h3><p>Tu scannes, tu remplis, tu envoies : ta réponse m'arrive par e-mail.</p><p class="small">Une réponse par tâche. Une case à cocher pour le traitement des données, détaillé dans la <a class="src-link" href="https://www.summitflow.fr/politique-confidentialite" target="_blank" rel="noopener">politique de confidentialité de Summit Flow</a>.</p></div></div>
      <div class="card sk fill-card grille-way"><div><h3>En PDF</h3><p>La même grille, en PDF à remplir sur l'ordinateur. Tu la remplis, tu coches la case données, puis tu me la renvoies par e-mail.</p>{PDF_DATA}<button class="btn-act dl-pdf" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>Télécharger la grille PDF</button><p class="mail">contact@summitflow.fr</p><p class="small">Aucune donnée réelle de client ou de salarié : on décrit la tâche, pas son contenu. Traitement des réponses : <a class="src-link" href="https://www.summitflow.fr/politique-confidentialite" target="_blank" rel="noopener">politique de confidentialité</a>.</p></div></div>
    </div>''', seq=7, section="16h30 · Lancement de l'intersession",
 notes="Montrer le QR code en direct et faire scanner une fois pour vérifier que la page s'ouvre. Le formulaire en ligne (Airtable) envoie chaque réponse par e-mail à contact@summitflow.fr. Il demande le consentement au traitement des données, comme le PDF. Le PDF à remplir (dist/grille-audit-lagarrigue.pdf) part par e-mail après la séance. Rappeler la question zéro pour la colonne sensibilité des données.")

ref = "".join(f'<div class="fill-line rise"><span>{p}</span><span class="f" contenteditable="true" data-k="ref-{i}" data-ph="nom à écrire en séance"></span></div>' for i, p in enumerate(["Commerce", "RH et comptabilité", "Communication"]))
slide(f'''    <p class="eyebrow">Qui porte quoi</p>
    <h2>Un référent <span class="mark mark--sky">par pôle</span></h2>
    <div class="pic-row pic-row--top mt">
      <div class="stack-lg">
        <div>{ref}</div>
        <div class="card sk fill-teal frag"><h3>{icon("users")}Romane, la référente IA</h3><p>Elle garde la vue d'ensemble. Les référents de pôle font avancer la grille dans leur équipe.</p></div>
      </div>
      {pic("referents-samoyede", "Trois samoyèdes encordés montent vers un drapeau : métier, processus, technologie, un cap commun.", 680, 383)}
    </div>''', seq=7, section="16h30 · Lancement de l'intersession",
 notes="Les noms s'écrivent en séance, ils ne figurent pas dans le support.")

slide('''    <p class="eyebrow">Calendrier</p>
    <h2>Neuf semaines, <span class="mark">trois rendez-vous</span></h2>
    <div class="cal">
      <svg class="cal-line illu" viewBox="0 0 1300 10" preserveAspectRatio="none" aria-hidden="true" style="width:calc(100% - 60px);height:10px;overflow:visible"><path data-d="0.1" class="ink" d="M0 5 L1300 5" style="stroke-width:3"/></svg>
      <div class="pt rise"><span class="dot"></span><p class="d">17 novembre</p><p>Lancement, la grille est remise.</p></div>
      <div class="pt rise"><span class="dot"></span><p class="d">Mi-décembre</p><p>Point d'étape d'une heure en visio avec les référents.</p></div>
      <div class="pt rise"><span class="dot"></span><p class="d">Début janvier</p><p>Retour des grilles, au plus tard deux semaines avant le jour 2.</p></div>
      <div class="pt is-key rise"><span class="dot"></span><p class="d">22 janvier</p><p>Jour 2, premier atelier, avec une priorisation validée ensemble.</p></div>
    </div>''', seq=7, section="16h30 · Lancement de l'intersession",
 notes="Les fêtes de fin d'année sont dans l'intersession : le point de mi-décembre évite de perdre le fil.")

goals = ["Je situe l'IA générative et ses limites actuelles", "Je distingue assistant, automatisation et agent", "Je mesure l'investissement que chacun demande", "J'ai une méthode pour observer mon propre travail"]
gl = "".join(f'<li class="frag"><button class="sk sk--thin" data-k="but-{i}" aria-pressed="false" aria-label="Cocher"><svg viewBox="0 0 34 34"><path d="M6 18 L14 26 L29 8"/></svg></button><span>{g}</span></li>' for i, g in enumerate(goals))
slide(f'''    <p class="eyebrow">Ce soir</p>
    <h2>Ce que vous savez <span class="mark mark--teal">faire maintenant</span></h2>
    {art("sommet-samoyede", "Le samoyède assis au sommet, il regarde la vue.", (90, 150, 470, 520))}
    <ul class="checks mt">{gl}</ul>''', seq=7, section="16h30 · Lancement de l'intersession",
 notes="Tour de table de clôture : chacun dit en une phrase ce qu'il sait faire maintenant et ce qu'il va observer dans son travail d'ici janvier. Cocher au fur et à mesure. Revenir sur les attentes notées au tour de table du matin. Ce tour de table sert aussi d'évaluation des acquis.")

slide(f'''    <div class="lockup lockup--duo rise"><img class="partner-logo" src="images/logo-cfd-formation.png" alt="Logo CFD Formation"><img class="brand-logo" src="images/logo-summit-flow.png" alt="Logo Summit Flow"><div><p class="lockup-name">CFD × Summit Flow</p><p class="lockup-sub">Marie Jolly · contact@summitflow.fr · summitflow.fr</p></div></div>
    <div class="cover-body">
      <h1 class="rise">Merci, et <span class="mark">bonne observation</span></h1>
      <p class="lead rise">D'ici le 22 janvier, on observe, on note, on remplit la grille.</p>
      <div class="sat rise"><figure class="qr sat-qr"><img src="images/qr-satisfaction.png" alt="QR code vers le questionnaire de satisfaction"></figure><p><b>Votre avis sur la journée</b>Deux minutes avant de partir : le questionnaire de satisfaction.</p></div>
    </div>
    {art("observation-samoyede", "Le samoyède renifle des traces dans la neige, un carnet ouvert à côté.", (40, 0, 980, 640), COVER_RIDGE)}''', cls="slide--cover slide--full", section="Fin du jour 1")

# assemble
src = pathlib.Path("src/index.html").read_text()
a = src.index('<main class="stage"'); a = src.index(">", a) + 1
b = src.index('  <div class="trail trail-global"')
out = src[:a] + "\n\n" + "\n".join(S) + "\n" + src[b:]
pathlib.Path("src/index.html").write_text(out)
print(len(S), "slides")
