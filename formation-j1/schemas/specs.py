"""Sources des schémas didactiques du jour 1 (format simplifié, converti en .excalidraw et en SVG).
Style calé sur le schéma « Modèle, inférence, harnais » : encre noire, grands cadres fins,
cases au trait épais, aplats pastel pleins (pas de hachures), annotations grises."""

INK, MUTED, NONE, TEAL = "#1F2A2E", "#5C6366", "transparent", "#0B4F5C"
# Pastels doux de la charte, jamais de rouge
BLUE, GREEN, YELLOW, PINK = "#DCEEFA", "#D6F1E6", "#FFF3C4", "#FCE4E8"

# Mise à l'échelle pour la projection : géométrie x1,2 et texte x1,3 (texte rendu au-dessus de 28 px)
G, F = 1.2, 1.3

def box(id, x, y, w, h, text="", fill=NONE, stroke=INK, size=20, color=INK, sw=2):
    return dict(kind="box", id=id, x=x * G, y=y * G, w=w * G, h=h * G, text=text, fill=fill, stroke=stroke, size=round(size * F), color=color, sw=sw)

def arrow(id, x1, y1, x2, y2, label=None, color=INK, dashed=False, via=None):
    return dict(kind="arrow", id=id, x1=x1 * G, y1=y1 * G, x2=x2 * G, y2=y2 * G, label=label, color=color, dashed=dashed,
                via=(via[0] * G, via[1] * G) if via else None)

def text(id, x, y, t, size=20, color=INK):
    return dict(kind="text", id=id, x=x * G, y=y * G, text=t, size=round(size * F), color=color)

def trois_logiques():
    els = []
    cols = [
        ("as", 10, "1. Assistant", ["Tu poses une\nquestion", "L'IA propose\nune réponse", "Tu décides"], BLUE, "Toi, à chaque fois"),
        ("au", 295, "2. Automatisation", ["Un courriel\narrive", "Toujours les\nmêmes actions", "Un résultat,\nsans réflexion"], YELLOW, "La règle, fixée\nà l'avance"),
        ("ag", 580, "3. Agent", ["Un objectif\nà atteindre", "L'IA choisit\nses étapes", "Elle agit dans\nton cadre"], GREEN, "Le cadre\nque tu as posé"),
    ]
    for p, x, title, steps, color, hand in cols:
        els.append(box(p + "f", x, 20, 270, 500, sw=1))
        els.append(text(p + "t", x + 24, 38, title, size=24, color=TEAL))
        for i, s in enumerate(steps):
            y = 100 + i * 115
            els.append(box(f"{p}{i}", x + 30, y, 210, 80, s, fill=color if i == 2 else NONE, size=20, sw=2))
            if i:
                els.append(arrow(f"{p}a{i}", x + 135, y - 35, x + 135, y - 2))
        if p == "ag":
            els.append(arrow("agloop", x + 240, 370, x + 240, 255, dashed=True, via=(x + 262, 312)))
        els.append(text(p + "q", x + 30, 445, hand, size=20, color=MUTED))
    return els

def grille():
    els = []
    qs = [
        ("q1", "1. La tâche revient-elle\nsouvent ?", "On garde le geste\nmanuel, ou un assistant\nau cas par cas", NONE),
        ("q2", "2. Les règles sont-elles\nstables ?", "On clarifie la règle\navant d'outiller", NONE),
        ("q3", "3. Faut-il interpréter\nun texte ou décider ?", "Automatisation", YELLOW),
    ]
    for i, (id, q, out, fill) in enumerate(qs):
        y = 40 + i * 140
        els.append(box(id, 40, y, 340, 90, q, size=20))
        els.append(arrow(id + "n", 380, y + 45, 470, y + 45, label="Non"))
        els.append(box(id + "o", 470, y + 5, 290, 80, out, fill=fill, stroke=INK if fill != NONE else MUTED, size=20, sw=2 if fill != NONE else 1))
        els.append(arrow(id + "y", 210, y + 90, 210, y + 140, label="Oui"))
    els.append(box("ag", 40, 460, 340, 80, "Agent, ou assistant\n+ automatisation", fill=GREEN, size=20))
    els.append(box("q4", 470, 445, 290, 110, "4. Une erreur coûte cher ?\nUn humain valide\navant que ça parte", fill=PINK, size=20))
    return els

def humain_valide():
    els = []
    steps = [("ia", 20, "L'IA propose", BLUE), ("toi", 300, "Tu relis\net corriges", YELLOW), ("go", 580, "Ça part", GREEN)]
    for id, x, label, fill in steps:
        els.append(box(id, x, 120, 230, 110, label, fill=fill, size=24))
    els.append(arrow("a1", 250, 175, 298, 175))
    els.append(arrow("a2", 530, 175, 578, 175))
    els.append(arrow("back", 415, 232, 135, 232, label=None, dashed=True, via=(275, 330)))
    els.append(text("bk", 170, 330, "pas bon ? on reprend", size=20, color=MUTED))
    els.append(text("t1", 20, 40, "Déléguer, oui. Sans relire, non.", size=24, color=TEAL))
    return els

def webhook():
    els = []
    els.append(box("ev", 20, 120, 220, 120, "Une facture\narrive par e-mail", fill=BLUE, size=22))
    els.append(box("wh", 330, 120, 220, 120, "L'adresse\nwebhook", fill=YELLOW, size=24))
    els.append(box("sc", 640, 120, 220, 120, "La trésorerie\nse met à jour", fill=GREEN, size=22))
    els.append(arrow("a1", 240, 180, 328, 180))
    els.append(arrow("a2", 550, 180, 638, 180))
    els.append(text("t1", 20, 40, "Le logiciel prévient lui-même, par un appel HTTP.", size=24, color=TEAL))
    els.append(text("t2", 20, 290, "Pas besoin de vérifier toutes les cinq minutes :\nc'est l'événement qui sonne à la porte.", size=22, color=MUTED))
    return els

def sous_le_capot():
    els = []
    els.append(box("co", 20, 60, 240, 110, "Copilot,\nton agent", fill=GREEN, size=24))
    els.append(box("api", 620, 60, 240, 110, "API\nd'Outlook", fill=BLUE, size=24))
    els.append(arrow("rq", 262, 95, 618, 95))
    els.append(arrow("rp", 618, 140, 262, 140, dashed=True))
    els.append(text("rqt", 290, 50, "requête HTTP : « les courriels ? »", size=19))
    els.append(text("rpt", 330, 152, "réponse : les courriels", size=19, color=MUTED))
    els.append(box("ev", 20, 270, 240, 110, "Outlook : un\ncourriel arrive", fill=YELLOW, size=24))
    els.append(box("au", 620, 270, 240, 110, "Ton automatisation\nou ton agent", fill=PINK, size=19))
    els.append(arrow("wh", 262, 325, 618, 325))
    els.append(text("wht", 340, 280, "webhook : appel HTTP", size=19))
    els.append(text("t1", 20, 420, "Dans un sens, on demande. Dans l'autre, on est prévenu.", size=22, color=TEAL))
    return els

SCHEMAS = {"webhook": (webhook, "Le webhook"), "sous-le-capot": (sous_le_capot, "Sous le capot"), "humain-valide": (humain_valide, "L'humain valide"),
"trois-logiques": (trois_logiques, "Trois logiques : qui garde la main"),
           "grille-decision": (grille, "Grille de décision en quatre questions")}
