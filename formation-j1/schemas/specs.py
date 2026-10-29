"""Sources des schémas didactiques du jour 1 (format simplifié, converti en .excalidraw et en SVG)."""

# Style Excalidraw : fonds hachurés (la couleur de fond devient la couleur des hachures), cases neutres transparentes
TEAL, INK, MUTED, MINT_BG, OFF, ALERT, ALERT_BG = "#0B4F5C", "#2A2F33", "#5E5A52", "#8FCDB6", "transparent", "#B3261E", "#EBA79C"
NONE = "transparent"

# Mise à l'échelle pour la projection : géométrie x1,2 et texte x1,3 (le texte rendu reste au-dessus de 28 px)
G, F = 1.2, 1.3

def box(id, x, y, w, h, text, fill=NONE, stroke=TEAL, size=20, color=INK):
    return dict(kind="box", id=id, x=x * G, y=y * G, w=w * G, h=h * G, text=text, fill=fill, stroke=stroke, size=round(size * F), color=color)

def arrow(id, x1, y1, x2, y2, label=None, color=TEAL, dashed=False, via=None):
    return dict(kind="arrow", id=id, x1=x1 * G, y1=y1 * G, x2=x2 * G, y2=y2 * G, label=label, color=color, dashed=dashed,
                via=(via[0] * G, via[1] * G) if via else None)

def text(id, x, y, t, size=20, color=INK):
    return dict(kind="text", id=id, x=x * G, y=y * G, text=t, size=round(size * F), color=color)

def trois_logiques():
    els = []
    cols = [
        ("as", 40, "Assistant", ["Tu poses une\nquestion", "L'IA propose\nune réponse", "Tu décides"], "Toi, à chaque fois"),
        ("au", 300, "Automatisation", ["Un déclencheur :\nun courriel arrive", "Toujours les\nmêmes actions", "Un résultat,\nsans réflexion"], "La règle, fixée\nà l'avance"),
        ("ag", 560, "Agent", ["Un objectif\nà atteindre", "L'IA choisit\nses étapes", "Elle agit dans\nun cadre défini"], "Le cadre\nque tu as posé"),
    ]
    for p, x, title, steps, hand in cols:
        els.append(box(p + "h", x, 60, 220, 56, title, fill=MINT_BG, stroke=TEAL, size=24, color=TEAL))
        for i, s in enumerate(steps):
            y = 150 + i * 110
            els.append(box(f"{p}{i}", x + 10, y, 200, 76, s, fill=NONE if i < 2 else MINT_BG))
            if i:
                els.append(arrow(f"{p}a{i}", x + 110, y - 34, x + 110, y - 2))
        if p == "ag":
            els.append(arrow("agloop", x + 210, 408, x + 210, 298, color=TEAL, dashed=True, via=(x + 250, 353)))
        els.append(text(p + "q", x + 20, 470, hand, size=20, color=TEAL))
    return els

def grille():
    els = []
    qs = [
        ("q1", "1. La tâche revient-elle\nsouvent ?", "Non", "On garde le geste\nmanuel, ou un assistant\nau cas par cas"),
        ("q2", "2. Les règles sont-elles\nstables ?", "Non", "On clarifie la règle\navant d'outiller"),
        ("q3", "3. Faut-il interpréter\nun texte ou décider ?", "Non", "Automatisation"),
    ]
    for i, (id, q, no, out) in enumerate(qs):
        y = 40 + i * 140
        els.append(box(id, 40, y, 340, 90, q, size=20))
        els.append(arrow(id + "n", 380, y + 45, 470, y + 45, label=no))
        last = i == 2
        els.append(box(id + "o", 470, y + 5, 290, 80, out, fill=MINT_BG if last else OFF, stroke=TEAL if last else MUTED, size=20, color=TEAL if last else INK))
        els.append(arrow(id + "y", 210, y + 90, 210, y + 140, label="Oui"))
    els.append(box("ag", 40, 460, 340, 80, "Agent, ou assistant\n+ automatisation", fill=MINT_BG, size=20, color=TEAL))
    els.append(box("q4", 470, 445, 290, 110, "4. Une erreur coûte cher ?\nUn humain valide\navant que ça parte", fill=ALERT_BG, stroke=ALERT, size=20, color=ALERT))
    return els

SCHEMAS = {"trois-logiques": (trois_logiques, "Trois logiques : qui garde la main"),
           "grille-decision": (grille, "Grille de décision en quatre questions")}
