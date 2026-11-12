# -*- coding: utf-8 -*-
"""Fiche PAF (Personnalisation de l'Action de Formation) et positionnement des stagiaires,
aux couleurs Summit Flow, pour la session « Mise à jour sur l'IA » des Clés de la Gestion.

Reprend la structure du modèle de l'organisme (FOR\\R1004\\V1\\Fiche PAF) : identité,
questions de personnalisation, question sur le handicap. Produit un PDF à remplir à l'écran
(champs saisissables) ou à imprimer.

Pré-remplissage automatique :
  - date, horaires et lieu sont lus dans le bloc window.SESSION du deck (src/index.html),
    la même source que les slides : on ne les saisit qu'une fois ;
  - avec un fichier stagiaires.csv (colonnes : nom, societe, telephone, email, fonction),
    une fiche pré-remplie est produite par stagiaire.

Lancer depuis cles-de-la-gestion-maj-ia/ :
  python3 fiche-paf/generer_fiche_paf.py                         # fiche vierge
  python3 fiche-paf/generer_fiche_paf.py fiche-paf/stagiaires.csv  # + une fiche par stagiaire
"""
import csv
import pathlib
import re
import sys
import unicodedata

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = pathlib.Path(__file__).resolve().parent.parent
HERE = ROOT / "fiche-paf"
OUT = HERE / "sortie"

# ---------- Ce qui se règle à la main ----------
FORMATION = "Mise à jour sur l'IA : nouveaux modèles, outils et usages"
FORMATRICE = "Marie Jolly, Summit Flow"
RETOUR = "À renvoyer à Les Clés de la Gestion avant le lundi 30 novembre 2026"
REFERENCE = "FOR\\R1004\\V1\\Fiche PAF"

# ---------- Charte Summit Flow ----------
TEAL, INK, MUTED, LINE = HexColor("#0B4F5C"), HexColor("#2A2F33"), HexColor("#5C6366"), HexColor("#CBD3D3")
MINT, LAV, APRICOT = HexColor("#D6F1E6"), HexColor("#E6E0F4"), HexColor("#FDEBD7")
W, H = A4
M = 40  # marge

for name, f in [("Sans", "Overpass-Regular.ttf"), ("Sans-Semi", "Overpass-SemiBold.ttf"), ("Sans-Bold", "Overpass-ExtraBold.ttf"), ("Script", "calligraffitti.ttf")]:
    pdfmetrics.registerFont(TTFont(name, str(HERE / "polices" / f)))


def session_du_deck():
    """Lit date, horaires et lieu dans window.SESSION, en haut de src/index.html."""
    html = (ROOT / "src" / "index.html").read_text(encoding="utf-8")
    out = {}
    for k in ("date", "horaires", "lieu"):
        m = re.search(rf'\b{k}:\s*"([^"]*)"', html)
        out[k] = m.group(1) if m else ""
    return out


# ---------- Petits outils de mise en page ----------
class Page:
    def __init__(self, c, prefill):
        self.c, self.f, self.p = c, c.acroForm, prefill

    def text(self, x, y, s, font="Sans", size=9.5, color=INK):
        self.c.setFillColor(color); self.c.setFont(font, size); self.c.drawString(x, y, s)

    def field(self, name, x, y, w, h, value="", multiline=False, size=9.5, fill=white):
        self.f.textfield(name=name, value=value, x=x, y=y, width=w, height=h, borderColor=TEAL, fillColor=fill, textColor=INK,
                         fontName="Helvetica", fontSize=size, borderWidth=0.8, fieldFlags="multiline" if multiline else "")

    def check(self, name, x, y, size=10.5, tip=""):
        self.f.checkbox(name=name, x=x, y=y, size=size, borderColor=TEAL, fillColor=white, buttonStyle="check", borderWidth=0.8, tooltip=tip or name)

    def radio(self, group, value, x, y, size=10.5, tip=""):
        # Cercle dessiné sous le champ : il reste net à l'impression, quel que soit le lecteur PDF
        self.c.setStrokeColor(TEAL); self.c.setLineWidth(0.8); self.c.circle(x + size / 2, y + size / 2, size / 2, stroke=1, fill=0)
        self.f.radio(name=group, value=value, selected=False, x=x, y=y, size=size, buttonStyle="circle", shape="circle",
                     borderColor=None, fillColor=None, borderWidth=0, textColor=TEAL, tooltip=tip or value)

    def section(self, y, num, title, sub=""):
        c = self.c
        c.setFillColor(MINT); c.roundRect(M, y - 4, 22, 22, 11, stroke=0, fill=1)
        self.text(M + (7.3 if num != "4" else 7), y + 3.5, num, "Sans-Bold", 11, TEAL)
        self.text(M + 32, y + 2.5, title, "Script", 17, TEAL)
        if sub:
            self.text(M + 32 + c.stringWidth(title, "Script", 17) + 10, y + 3.5, sub, "Sans", 8.5, MUTED)
        return y - 14


def entete(pg, n, total):
    c = pg.c
    c.drawImage(ImageReader(str(HERE / "images" / "logo-summit-flow.png")), M, H - 78, 46, 46, mask="auto")
    pg.text(M + 54, H - 50, "Summit Flow", "Sans-Bold", 11, TEAL)
    pg.text(M + 54, H - 63, "Marie Jolly · contact@summitflow.fr", "Sans", 8, MUTED)
    lw = 168
    c.drawImage(ImageReader(str(HERE / "images" / "logo-cles-de-la-gestion.png")), W - M - lw, H - 66, lw, lw * 244 / 1700, mask="auto")
    c.setStrokeColor(LINE); c.setLineWidth(0.8); c.line(M, H - 88, W - M, H - 88)
    pg.text(M, 26, f"{REFERENCE} · version Summit Flow pour la session « Mise à jour sur l'IA »", "Sans", 7.5, MUTED)
    c.setFont("Sans", 7.5); c.drawRightString(W - M, 26, f"Page {n}/{total}")


def page1(pg, s):
    c, p = pg.c, pg.p
    entete(pg, 1, 2)
    pg.text(M, H - 120, "Fiche PAF · Personnalisation de l'Action de Formation", "Sans-Semi", 9, MUTED)
    pg.text(M, H - 150, "Ta fiche de positionnement", "Script", 28, TEAL)
    pg.text(M, H - 172, FORMATION, "Sans-Bold", 12.5, INK)

    # Bandeau de session (pré-rempli, modifiable)
    y = H - 232
    c.setFillColor(MINT); c.roundRect(M, y - 8, W - 2 * M, 50, 10, stroke=0, fill=1)
    cols = [("Date", "s_date", s["date"], 150), ("Horaires", "s_horaires", s["horaires"], 170), ("Lieu", "s_lieu", s["lieu"], 175)]
    x = M + 12
    for lab, name, val, w in cols:
        pg.text(x, y + 26, lab, "Sans-Semi", 8, TEAL)
        pg.field(name, x, y - 2, w - 8, 20, val, size=9, fill=white)
        x += w
    pg.text(M, y - 26, f"Formatrice : {FORMATRICE}   ·   Organisme : Les Clés de la Gestion   ·   6 stagiaires au maximum", "Sans", 8.5, MUTED)

    # 1. Toi
    y = pg.section(y - 62, "1", "Toi")
    lab_w, half = 92, (W - 2 * M - 16) / 2
    rows = [("Nom, prénom", "nom", p.get("nom", "")), ("Société", "societe", p.get("societe", "")),
            ("Téléphone", "telephone", p.get("telephone", "")), ("E-mail", "email", p.get("email", ""))]
    for i, (lab, name, val) in enumerate(rows):
        cx = M + (i % 2) * (half + 16)
        cy = y - 24 - (i // 2) * 30
        pg.text(cx, cy + 6, lab, "Sans-Semi", 9, INK)
        pg.field(name, cx + 70, cy, half - 70, 20, val)
    y -= 24 + 2 * 30
    pg.text(M, y + 6, "Fonction et missions", "Sans-Semi", 9, INK)
    pg.field("fonction", M + 110, y - 22, W - 2 * M - 110, 40, p.get("fonction", ""), multiline=True)

    # 2. Tes outils
    y = pg.section(y - 60, "2", "Tes outils d'IA aujourd'hui", "coche tout ce qui s'applique")
    heads = ["Je l'utilise", "Gratuit", "Payant, perso", "Payant, entreprise"]
    xs = [M + 190, M + 270, M + 340, M + 430]
    for hx, h in zip(xs, heads):
        pg.text(hx - 6, y - 14, h, "Sans-Semi", 8, TEAL)
    outils = ["ChatGPT", "Microsoft Copilot", "Mistral (Vibe, ex Le Chat)", "Gemini", "Claude", "Autre :"]
    yy = y - 34
    for i, o in enumerate(outils):
        if i % 2 == 0:
            c.setFillColor(HexColor("#F4F7F7")); c.rect(M, yy - 5, W - 2 * M, 19, stroke=0, fill=1)
        pg.text(M + 6, yy + 1, o, "Sans", 9.5, INK)
        if o == "Autre :":
            pg.field("outil_autre_nom", M + 46, yy - 3, 130, 16, size=8.5)
        key = re.sub(r"\W+", "_", o.split(" (")[0].lower()).strip("_")
        for j, hx in enumerate(xs):
            pg.check(f"outil_{key}_{j}", hx + 12, yy - 2, tip=f"{o} : {heads[j]}")
        yy -= 20
    y = yy - 6
    pg.text(M, y, "À quelle fréquence utilises-tu l'IA au travail ?", "Sans-Semi", 9.5, INK)
    opts = ["Jamais ou presque", "Moins d'une fois par semaine", "Chaque semaine", "Chaque jour"]
    x = M
    for o in opts:
        pg.radio("frequence", o, x, y - 22)
        pg.text(x + 15, y - 20, o, "Sans", 9, INK)
        x += 18 + c.stringWidth(o, "Sans", 9) + 20

    # 5. Ton cadre (en bas de page 1, pour équilibrer)
    y = pg.section(y - 62, "3", "Ton cadre", "ce que ton entreprise autorise")
    regles = ["Il existe une liste d'outils autorisés, et je la connais", "Certains outils sont interdits",
              "Tout outil doit être validé par l'informatique ou la direction", "Pas de règle, à ma connaissance", "Je ne sais pas"]
    yy = y - 20
    for i, r in enumerate(regles):
        cx = M + (i % 2) * (half + 16)
        cy = yy - (i // 2) * 18
        pg.radio("regles", r, cx, cy)
        pg.text(cx + 15, cy + 2, r, "Sans", 8.8, INK)
    yy -= 3 * 18 + 6
    pg.text(M, yy + 2, "Précision (ex. Copilot autorisé, ChatGPT interdit)", "Sans", 8.5, MUTED)
    pg.field("regles_precision", M + 215, yy - 3, W - 2 * M - 215, 18, size=8.5)


def page2(pg):
    c = pg.c
    entete(pg, 2, 2)
    half = (W - 2 * M - 16) / 2

    # 4. Ton niveau, objectif par objectif
    y = pg.section(H - 122, "4", "Ton niveau aujourd'hui", "une case par ligne")
    scale = ["Inconnu", "De nom", "Déjà essayé", "Je l'utilise"]
    xs = [M + 318, M + 370, M + 422, M + 474]
    for hx, h in zip(xs, scale):
        c.setFont("Sans-Semi", 7.8); c.setFillColor(TEAL); c.drawCentredString(hx + 5, y - 14, h)
    items = ["Le mode réflexion des modèles récents", "Les projets dans ChatGPT (ou ton outil)", "Les assistants spécialisés (GPT, agents)",
             "Les tâches planifiées, qui se relancent seules", "Mistral et son application Vibe", "Les outils d'image, de vidéo et d'audio",
             "La transcription automatique des réunions", "Intégrer l'IA dans une tâche récurrente"]
    yy = y - 34
    for i, it in enumerate(items):
        if i % 2 == 0:
            c.setFillColor(HexColor("#F4F7F7")); c.rect(M, yy - 5, W - 2 * M, 19, stroke=0, fill=1)
        pg.text(M + 6, yy + 1, it, "Sans", 9.3, INK)
        for j, hx in enumerate(xs):
            pg.radio(f"niveau_{i + 1}", scale[j], hx, yy - 2, tip=f"{it} : {scale[j]}")
        yy -= 20
    y = yy - 8
    pg.text(M, y, "Ton aisance générale avec l'IA", "Sans-Semi", 9.5, INK)
    aise = [("1", "je découvre"), ("2", "quelques essais"), ("3", "usage régulier"), ("4", "usage intensif"), ("5", "je construis")]
    x = M
    for v, lab in aise:
        pg.radio("aisance", v, x, y - 22)
        pg.text(x + 15, y - 20, v, "Sans-Bold", 9, TEAL)
        pg.text(x + 24, y - 20, lab, "Sans", 8.5, INK)
        x += 34 + c.stringWidth(lab, "Sans", 8.5) + 12

    # 5. Tes attentes
    y = pg.section(y - 62, "5", "Tes attentes")
    pg.text(M, y - 14, "Trois tâches de ton travail où tu aimerais gagner du temps", "Sans-Semi", 9.5, INK)
    pg.text(M, y - 26, "Décris la tâche, pas son contenu : aucun nom de client ou de salarié, aucun chiffre confidentiel.", "Sans", 8.3, MUTED)
    yy = y - 54
    for i in range(3):
        pg.text(M, yy + 5, f"{i + 1}.", "Sans-Bold", 9.5, TEAL)
        pg.field(f"tache_{i + 1}", M + 16, yy, W - 2 * M - 16, 19)
        yy -= 25
    pg.text(M, yy - 4, "Ce que tu veux savoir faire en sortant de cette journée", "Sans-Semi", 9.5, INK)
    pg.field("attentes", M, yy - 52, W - 2 * M, 40, multiline=True)
    y = yy - 52

    # Remarque : handicap (formulation de l'organisme)
    c.setFillColor(APRICOT); c.roundRect(M, y - 104, W - 2 * M, 88, 10, stroke=0, fill=1)
    pg.text(M + 12, y - 34, "Remarque", "Script", 15, TEAL)
    pg.text(M + 12, y - 50, "Si vous avez un handicap, quel aménagement ou aide pouvons-nous vous apporter concernant", "Sans", 9, INK)
    pg.text(M + 12, y - 62, "l'organisation de la formation ?", "Sans", 9, INK)
    pg.field("handicap", M + 12, y - 98, W - 2 * M - 24, 30, multiline=True, size=9)

    # Retour et consentement
    y -= 128
    pg.check("consentement", M, y - 2)
    pg.text(M + 16, y, "J'accepte que ces réponses servent à préparer la formation. Elles sont lues par la formatrice et l'organisme,", "Sans", 8.5, INK)
    pg.text(M + 16, y - 11, "puis supprimées après la session.", "Sans", 8.5, INK)
    pg.text(M, y - 34, "Date", "Sans-Semi", 9, INK)
    pg.field("date_remplissage", M + 30, y - 39, 110, 18)
    c.setFillColor(TEAL); c.roundRect(M + 160, y - 42, W - 2 * M - 160, 24, 8, stroke=0, fill=1)
    pg.text(M + 172, y - 33, RETOUR, "Sans-Semi", 9, white)


def fiche(path, s, prefill):
    c = canvas.Canvas(str(path), pagesize=A4)
    c.setTitle(f"Fiche PAF · {FORMATION}"); c.setAuthor(FORMATRICE); c.setSubject("Positionnement des stagiaires")
    pg = Page(c, prefill)
    page1(pg, s); c.showPage()
    page2(pg); c.showPage()
    c.save()
    centrer_les_points(path)


def centrer_les_points(path):
    """reportlab dessine le point d'un bouton radio coché petit et décalé : on le remplace
    par un point plein, centré dans le cercle, pour l'écran comme pour l'impression."""
    from pypdf import PdfReader, PdfWriter
    from pypdf.generic import NameObject, StreamObject
    r = PdfReader(str(path)); w = PdfWriter(clone_from=r)
    k = 0.5523  # approximation d'un cercle par des courbes de Bézier
    for page in w.pages:
        for ref in page.get("/Annots", []):
            a = ref.get_object()
            par = a.get("/Parent")
            if not par or par.get_object().get("/FT") != "/Btn" or "/AP" not in a:
                continue
            flags = int(par.get_object().get("/Ff", 0))
            if not flags & (1 << 15):  # pas un bouton radio
                continue
            rect = [float(v) for v in a["/Rect"]]
            size = rect[2] - rect[0]
            cx = cy = size / 2
            rr = size * 0.27
            dot = (f"q 0.043 0.310 0.361 rg {cx + rr:.3f} {cy:.3f} m "
                   f"{cx + rr:.3f} {cy + rr * k:.3f} {cx + rr * k:.3f} {cy + rr:.3f} {cx:.3f} {cy + rr:.3f} c "
                   f"{cx - rr * k:.3f} {cy + rr:.3f} {cx - rr:.3f} {cy + rr * k:.3f} {cx - rr:.3f} {cy:.3f} c "
                   f"{cx - rr:.3f} {cy - rr * k:.3f} {cx - rr * k:.3f} {cy - rr:.3f} {cx:.3f} {cy - rr:.3f} c "
                   f"{cx + rr * k:.3f} {cy - rr:.3f} {cx + rr:.3f} {cy - rr * k:.3f} {cx + rr:.3f} {cy:.3f} c f Q").encode()
            for state, st in a["/AP"]["/N"].items():
                if state == "/Off":
                    continue
                st.get_object().set_data(dot)
    w.write(str(path))


def slug(t):
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-") or "stagiaire"


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    s = session_du_deck()
    fiche(OUT / "fiche-paf-vierge.pdf", s, {})
    n = 0
    if len(sys.argv) > 1:
        with open(sys.argv[1], encoding="utf-8-sig", newline="") as f:
            first = f.readline(); f.seek(0)
            for row in csv.DictReader(f, delimiter=";" if ";" in first else ","):
                row = {k.strip().lower(): (v or "").strip() for k, v in row.items() if k}
                if not row.get("nom"):
                    continue
                fiche(OUT / f"fiche-paf-{slug(row['nom'])}.pdf", s, row)
                n += 1
    print(f"ok · fiche vierge + {n} fiche(s) pré-remplie(s) · session : {s['date']} · {s['horaires']} · {s['lieu']}")
