# Grille d'audit en PDF à remplir (champs saisissables), une page par tâche.
# Lancer depuis formation-j1/ : python3 grille-audit/generer_pdf.py
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.utils import ImageReader

TEAL, INK, MINT, MUTED, PAPER = HexColor("#0B4F5C"), HexColor("#2A2F33"), HexColor("#D6F1E6"), HexColor("#5C6366"), HexColor("#FAF8F3")
W, H = landscape(A4)
# Registre des traitements de Summit Flow : adresse exacte à confirmer
REGISTRE_URL = "https://summitflow.fr"
REGISTRE_LABEL = "summitflow.fr"
CAS = ["Choisir un cas de mars, ou écrire le tien",
       "Commerce · Commissions des vendeurs itinérants", "Commerce · Contrôle des études de prix", "Commerce · Estimation des reprises",
       "Commerce · Ciblage de clients pour les démonstrations", "Commerce · Trouver un produit chez un fournisseur",
       "RH et compta · Variables de salaire", "RH et compta · Vérification des paiements clients", "RH et compta · Trésorerie quotidienne",
       "RH et compta · Saisie des pointages", "Communication · Planning de communication", "Communication · Bases de données",
       "Direction · Création de tableaux de bord", "Direction · Analyse des tableaux de bord", "Direction · Présentations PowerPoint", "Une autre tâche"]
SOLUTIONS = ["Choisir, voir l'arbre du jour 1", "Une demande", "Un bloc-notes", "Cowork", "Un flux Power Automate", "Une demande planifiée",
             "Une requête enregistrée", "Un agent Copilot", "Je ne sais pas encore"]
FIELDS = [("1. Le déroulé actuel", "Chaque étape dans l'ordre : qui la fait, avec quel outil, en combien de temps.", 2),
          ("2. Fréquence et temps passé", "Chaque jour, semaine, mois ? Combien de temps à chaque fois ?", 1),
          ("3. Les personnes impliquées", "Les fonctions, pas les noms.", 1),
          ("4. Les outils et documents", "Outlook, Excel, logiciel métier, papier…", 1),
          ("5. Le déclencheur et le résultat", "Qu'est-ce qui lance la tâche ? Qu'obtient-on à la fin ?", 1),
          ("6. La part de jugement humain", "Faut-il lire, interpréter ou décider à une étape ?", 1),
          ("7. La sensibilité des données", "Aucune, internes, ou personnelles et clients ?", 1),
          ("8. Le bénéfice attendu", "Temps gagné, erreurs évitées, délais, confort de l'équipe.", 1)]

def page(c, n, logo):
    c.setFillColor(PAPER); c.rect(0, 0, W, H, stroke=0, fill=1)
    c.drawImage(logo, 28, H - 70, 48, 48, mask="auto")
    c.setFillColor(TEAL); c.setFont("Helvetica-Bold", 18); c.drawString(86, H - 44, f"Grille d'audit · tâche {n}")
    c.setFillColor(MUTED); c.setFont("Helvetica", 9.5)
    c.drawString(86, H - 60, "Maison Lagarrigue · formation Automatisation et IA agentique · à renvoyer à contact@summitflow.fr, au plus tard début janvier")
    form = c.acroForm
    y = H - 98
    c.setFillColor(INK); c.setFont("Helvetica-Bold", 10); c.drawString(28, y + 6, "Ton pôle")
    form.textfield(name=f"t{n}_pole", x=28, y=y - 22, width=150, height=22, borderColor=TEAL, fillColor=white, textColor=INK, fontSize=10, borderWidth=1)
    c.drawString(196, y + 6, "Ton prénom")
    form.textfield(name=f"t{n}_prenom", x=196, y=y - 22, width=150, height=22, borderColor=TEAL, fillColor=white, textColor=INK, fontSize=10, borderWidth=1)
    c.drawString(364, y + 6, "La tâche")
    form.choice(name=f"t{n}_cas", value=CAS[0], options=CAS, x=364, y=y - 22, width=260, height=22, borderColor=TEAL, fillColor=MINT, textColor=INK, fontSize=9, fieldFlags="combo edit")
    c.drawString(642, y + 6, "9. Solution pressentie")
    form.choice(name=f"t{n}_solution", value=SOLUTIONS[0], options=SOLUTIONS, x=642, y=y - 22, width=172, height=22, borderColor=TEAL, fillColor=MINT, textColor=INK, fontSize=9, fieldFlags="combo")
    top, colw, gap = y - 44, (W - 56 - 16) / 2, 16
    hs = {1: 46, 2: 120}
    cols = [[], []]
    cols[0] = FIELDS[:4]; cols[1] = FIELDS[4:]
    for ci, col in enumerate(cols):
        x, yy = 28 + ci * (colw + gap), top
        for title, help_, size in col:
            h = hs[size] if ci == 0 else 64
            c.setFillColor(TEAL); c.setFont("Helvetica-Bold", 10.5); c.drawString(x, yy - 4, title)
            c.setFillColor(MUTED); c.setFont("Helvetica-Oblique", 8.5); c.drawString(x, yy - 16, help_)
            form.textfield(name=f"t{n}_{title[:2].strip('. ')}", x=x, y=yy - 22 - h, width=colw, height=h, borderColor=TEAL, fillColor=white,
                           textColor=INK, fontSize=9.5, borderWidth=1, fieldFlags="multiline")
            yy -= h + 34
    form.checkbox(name=f"t{n}_consentement", x=28, y=30, size=13, borderColor=TEAL, fillColor=white, buttonStyle="check", borderWidth=1)
    c.setFillColor(INK); c.setFont("Helvetica", 9)
    txt = "J'accepte que Summit Flow traite ces réponses pour préparer la suite de la formation. Détail et droits : registre des traitements sur "
    c.drawString(48, 33, txt)
    lx = 48 + c.stringWidth(txt, "Helvetica", 9)
    c.setFillColor(TEAL); c.setFont("Helvetica-Bold", 9); c.drawString(lx, 33, REGISTRE_LABEL)
    c.linkURL(REGISTRE_URL, (lx, 30, lx + c.stringWidth(REGISTRE_LABEL, "Helvetica-Bold", 9), 43), relative=0)
    c.setFillColor(MUTED); c.setFont("Helvetica", 8.5)
    c.drawString(28, 12, "On décrit la tâche, pas son contenu : aucune donnée réelle de client ou de salarié. Summit Flow · contact@summitflow.fr")
    c.showPage()

c = canvas.Canvas("dist/grille-audit-lagarrigue.pdf", pagesize=landscape(A4))
c.setTitle("Grille d'audit · Maison Lagarrigue"); c.setAuthor("Marie Jolly, Summit Flow")
logo = ImageReader("src/images/logo-summit-flow.png")
for n in range(1, 6):
    page(c, n, logo)
c.save()
print("ok")
