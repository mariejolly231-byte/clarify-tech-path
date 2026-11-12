# -*- coding: utf-8 -*-
# Générateur du deck « Mise à jour sur l'IA : nouveaux modèles, outils et usages » (Les Clés de la Gestion).
# Même moteur et même système de design que le deck Maison Lagarrigue (formation-j1) : ce script écrit
# les slides dans src/index.html, puis build.py assemble un fichier HTML autonome.
#
# Lancer depuis cles-de-la-gestion-maj-ia/ :
#   python3 src/generer_slides.py && python3 build.py
#
# Date, horaires, lieu, programme et liens des quiz : ils ne sont PAS ici, mais tout en haut de
# src/index.html (bloc window.SESSION), pour se modifier sans rien reconstruire.
#
# Règles de rédaction : tutoiement dans les consignes, aucune promesse chiffrée de gain de temps,
# pas de tiret cadratin, aucun nom de modèle, fonctionnalité ou tarif non vérifié (voir a-verifier.md).
# Chaque slide a ses notes d'animatrice (touche N) : timing, pièges à éviter, sources.
import pathlib
import re

S = []
IMG = pathlib.Path("src/images")

# Sommaire latéral : l'ordre doit suivre window.SESSION.programme (lignes qui ont un nom court)
SEQ_NAMES = ["Accueil", "Nouveaux modèles", "ChatGPT", "Mistral", "Comparatif", "Workflows", "Clôture"]


def slide(body, seq=None, section="", cls="", notes=""):
    # Les illustrations se placent par rapport à la slide : on les sort des blocs où elles ont été écrites
    arts = re.findall(r'\n?\s*<figure class="art[^"]*"[^>]*>.*?</figure>', body, re.S)
    for x in arts:
        body = body.replace(x, "")
    body += "".join("\n    " + x.strip() for x in arts)
    a = f' data-seq="{seq}"' if seq else ""
    a += f' data-section="{section}"'
    S.append(f'''  <section class="slide {cls}"{a} aria-roledescription="slide">
{body}
    <aside class="notes">{notes}</aside>
  </section>
''')


def note(timing, pieges, sources=None, extra=""):
    """Notes de l'animatrice : timing, pièges à éviter, sources (affichées avec la touche N)."""
    out = f"<b>Timing.</b> {timing}<br><b>Pièges à éviter.</b> {pieges}"
    if extra:
        out += f"<br>{extra}"
    if sources:
        out += "<br><b>Sources.</b> " + " · ".join(f'<a class="src-link" href="{u}" target="_blank" rel="noopener">{t}</a>' for t, u in sources)
    return out


def icon(n):
    return f'<svg aria-hidden="true"><use href="#i-{n}"/></svg>'


def art(name, alt, box):
    r, b, w, h = box
    pos = f"right:{r}px;bottom:{b}px;width:{w}px;height:{h}px"
    band = " art--band" if w / h >= 2.4 else ""
    still = next((f"images/{name}.{e}" for e in ("png", "jpg", "webp") if (IMG / f"{name}.{e}").exists()), None)
    if not still:
        return ""
    return f'<figure class="art{band}" style="{pos}"><img class="art-media" src="{still}" alt="{alt}"></figure>'


def pic(name, alt, w, h, style=""):
    src = next((f"images/{name}.{e}" for e in ("png", "jpg", "webp") if (IMG / f"{name}.{e}").exists()), None)
    if not src:
        return ""
    return f'<figure class="pic" style="width:{w}px;height:{h}px;{style}"><img src="{src}" alt="{alt}"></figure>'


def timer(default=10, presets=(5, 10, 15, 20)):
    bs = "".join(f'<button class="sk sk--thin" value="{p}" aria-pressed="false"{" data-default" if p == default else ""}>{p} min</button>' for p in presets)
    return f'''<div class="timer sk" role="group" aria-label="Minuteur">
        <svg class="timer-ring" viewBox="0 0 64 64" aria-hidden="true"><circle class="bg" cx="32" cy="32" r="26"/><circle class="fg" cx="32" cy="32" r="26"/></svg>
        <span class="clock" aria-live="off">0:00</span>
        <div class="presets">{bs}</div>
        <button class="go sk sk--thin">Lancer</button>
      </div>'''


def var(key, fallback):
    """Texte remplacé à l'ouverture par la valeur de window.SESSION (date, horaires, lieu…)."""
    return f'<span data-var="{key}">{fallback}</span>'


COVER_RIDGE = '''<svg class="cover-ridge illu" viewBox="0 0 900 360" aria-hidden="true">
      <path data-d="0.9" d="M20 340 L250 150 L360 240 L560 40 L700 190 L780 130 L890 260 L890 340 Z" fill="#DCEEFA" filter="url(#rough)"/>
      <path data-d="0.1" class="ink" d="M20 340 L250 150 L360 240 L560 40 L700 190 L780 130 L890 260" filter="url(#rough)"/>
    </svg>'''

LOGO_SF = '<img class="brand-logo" src="images/logo-summit-flow.png" alt="Logo Summit Flow">'
LOGO_CG = '<img class="partner-logo" src="images/logo-cles-de-la-gestion.svg" alt="Logo Les Clés de la Gestion">'
# Version blanche : chargée une fois (invisible), réutilisée par le pied de page des slides sombres
LOGO_CG_W = '<img class="partner-logo partner-logo--white partner-logo--hidden" src="images/logo-cles-de-la-gestion-blanc.svg" alt="">'

# Sources vérifiées (consultées le 12 novembre 2026), réutilisées dans les notes
SRC = {
    "anthropic": ("Anthropic, vue d'ensemble des modèles", "https://platform.claude.com/docs/en/about-claude/models/overview"),
    "anthropic_news": ("Anthropic, actualités", "https://www.anthropic.com/news"),
    "gemini": ("Gemini, notes de version de l'application", "https://gemini.google/release-notes/"),
    "dm_models": ("Google DeepMind, modèles", "https://deepmind.google/models/"),
    "veo": ("Google DeepMind, Veo", "https://deepmind.google/models/veo/"),
    "mistral_news": ("Mistral, blog", "https://mistral.ai/news"),
    "vibe": ("Mistral, « Vibe gets to work », 28 mai 2026", "https://mistral.ai/news/vibe-agent/"),
    "ml4": ("Mistral, « Introducing Mistral Large 4 », 6 octobre 2026", "https://mistral.ai/news/mistral-large-4/"),
    "voxtral3": ("Mistral, « Voxtral 3 », 20 octobre 2026", "https://mistral.ai/news/voxtral-3/"),
    "mistral_pricing": ("Mistral, offres et tarifs", "https://mistral.ai/pricing"),
    "mistral_models": ("Mistral, documentation des modèles", "https://docs.mistral.ai/getting-started/models/models_overview/"),
    "deepseek": ("DeepSeek, modèles et tarifs de l'API", "https://api-docs.deepseek.com/quick_start/pricing"),
    "openai_rn": ("OpenAI, notes de version de ChatGPT (à relire le jour J)", "https://help.openai.com/en/articles/6825453-chatgpt-release-notes"),
    "openai_projects": ("OpenAI Academy, utiliser les projets", "https://openai.com/academy/projects/"),
    "openai_gpt6": ("Forum développeurs OpenAI, annonce de GPT-6 Astra", "https://community.openai.com/t/introducing-gpt-6-astra-the-most-intelligent-and-aligned-model-in-the-world/1394703"),
    "ws_agents": ("9to5Mac, agents d'espace de travail, 22 avril 2026", "https://9to5mac.com/2026/04/22/openai-updates-chatgpt-with-codex-powered-workspace-agents-for-teams/"),
    "bfl": ("Black Forest Labs, FLUX 3", "https://bfl.ai/"),
    "eleven": ("ElevenLabs", "https://elevenlabs.io/"),
    "suno": ("Suno, blog (v6, 9 septembre 2026)", "https://suno.com/blog"),
    "meet": ("Aide Google Meet, Prendre des notes pour moi", "https://support.google.com/meet/answer/14754931?hl=fr"),
    "teams": ("Microsoft Learn, Copilot dans les réunions Teams", "https://learn.microsoft.com/en-us/microsoftteams/copilot-teams-transcription"),
    "fireflies": ("Fireflies, tarifs", "https://fireflies.ai/pricing"),
}


def src(*keys):
    return [SRC[k] for k in keys]


# ---------- Ouvertures de module : fond marine de l'organisme, numéro dessiné, sentier balisé ----------
TX = [80 + k * 273 for k in range(7)]
TY = [176, 150, 166, 136, 158, 128, 146]
MODULES = {
    1: ("Nouveaux modèles et modèles de raisonnement", "Ce qui a changé depuis ta formation, et quand le mode réflexion vaut l'attente.",
        [("Tu sauras", "situer les modèles actuels et ce que le catalogue appelait O1, O3 ou R1"), ("Tu feras", "le même cas, en mode rapide puis en mode réflexion, dans ton outil"), ("Tu repartiras avec", "ta règle perso : quand activer la réflexion")]),
    2: ("ChatGPT : projets, assistants, tâches", "Passer de la conversation jetable à un espace de travail qui se souvient du contexte.",
        [("Tu sauras", "à quoi servent les projets, les assistants spécialisés et les tâches planifiées"), ("Tu feras", "un projet pour un dossier récurrent de ton travail, puis une tâche ou un assistant"), ("Tu repartiras avec", "un projet qui marche et que tu rouvriras lundi")]),
    3: ("L'écosystème Mistral", "L'alternative française : ce que fait Vibe (l'ancien Le Chat), et quand la choisir.",
        [("Tu sauras", "ce qui a changé chez Mistral en 2026 et ce que ça change pour une PME"), ("Tu feras", "ton cas du matin dans Vibe, une image, et le compte rendu d'un mémo vocal"), ("Tu repartiras avec", "ton avis argumenté : Vibe, pour quoi faire chez toi")]),
    4: ("Comparatif des outils du marché", "Texte, image, vidéo, audio, comptes rendus : on teste au lieu de croire.",
        [("Tu sauras", "qui fait quoi aujourd'hui, catégorie par catégorie"), ("Tu feras", "un banc d'essai en binôme : le même brief dans deux ou trois outils"), ("Tu repartiras avec", "une recommandation justifiée par un test, pas par une réputation")]),
    5: ("Optimiser ses workflows", "Intégrer les nouveaux outils dans le travail, sans se faire déborder par le prochain.",
        [("Tu sauras", "les trois niveaux : la demande réutilisable, l'assistant, la tâche automatique"), ("Tu feras", "la fiche d'un workflow réel, avec son point de contrôle humain"), ("Tu repartiras avec", "un workflow testé une fois, prêt à tourner")]),
}


def module_open(n):
    title, promise, cards = MODULES[n]
    ridge = "M0 196 " + " ".join(f"C {TX[k] - 110} {TY[k] + 24}, {TX[k] - 60} {TY[k]}, {TX[k]} {TY[k]}" for k in range(7)) + " C 1880 150, 1890 190, 1900 180"
    flags = []
    for k in range(7):
        state = "is-done" if k < n else "is-here" if k == n else "is-next"
        fill = "#F7A600" if k < n else "#FDEBD7" if k == n else "#123C5C"
        x, y = TX[k], TY[k]
        flags.append(f'<g class="balise {state}" style="--k:{k}"><path class="pole" d="M{x} {y} V{y - 62}" style="stroke:#fff"/><path class="flag" d="M{x} {y - 62} L{x + 40} {y - 52} L{x} {y - 40} Z" fill="{fill}" style="stroke:#fff"/><circle cx="{x}" cy="{y}" r="7" fill="{fill}" style="stroke:#fff"/>'
                     f'<text x="{x}" y="{y + 44}" text-anchor="middle" style="fill:#C9D6E2">{SEQ_NAMES[k]}</text></g>')
    promise_cards = "".join(f'<p class="rise"><b>{k}</b>{v}</p>' for k, v in cards)
    slide(f'''    <div class="chap-hero">
      <div class="chap-num" aria-hidden="true"><svg viewBox="0 0 260 260"><circle class="ring" cx="130" cy="130" r="112"/><circle class="ring2" cx="130" cy="130" r="112"/></svg><span>{n}</span></div>
      <div class="chap-text">
        <p class="eyebrow">Module {n}</p>
        <h1 class="chap-title" style="font-size:104px">{title}</h1>
        <p class="lead chap-lead">{promise}</p>
      </div>
    </div>
    <div class="mod-promise">{promise_cards}</div>
    <div class="chap-trail" style="--from:{TX[n - 1]};--to:{TX[n]};--ty:{TY[n]};bottom:150px;height:200px" aria-hidden="true">
      <svg viewBox="0 0 1900 260" preserveAspectRatio="none"><path class="ridge" d="{ridge}" style="stroke:#fff"/>{"".join(flags)}</svg>
    </div>''', cls="slide--full slide--chapter slide--dark", section=f"Module {n} · {title}",
          notes=note("30 secondes. On lit les trois cartes, on avance.",
                     "Ne pas commencer à expliquer ici : le cadrage tient en quelques slides juste après, l'atelier arrive vite.",
                     extra="Rappel de la règle du jour : au moins deux tiers du temps, c'est vous qui manipulez."))


# ---------- Consigne, débrief et quiz : le même gabarit pour les cinq ateliers ----------
def consigne(n, seq, titre, objectif, duree, livrable, critere, etapes, adapt, humour, notes, timer_default=20, presets=(10, 20, 30, 40)):
    how = "".join(f"<li>{e}</li>" for e in etapes)
    ad = "".join(f"<li><b>{k} :</b> {v}</li>" for k, v in adapt)
    slide(f'''    <h2>Atelier {n} : <span class="mark mark--apricot">{titre}</span></h2>
    <div class="brief">
      <div class="brief-c brief-c--obj"><p class="k">Objectif</p><p>{objectif}</p></div>
      <div class="brief-c brief-c--time"><p class="k">Durée</p><p class="big">{duree}</p><p class="small">en solo, sur ton poste</p></div>
      <div class="brief-c"><p class="k">Livrable attendu</p><p>{livrable}</p></div>
      <div class="brief-c"><p class="k">Critère de réussite</p><p>{critere}</p></div>
    </div>
    <div class="brief-row">
      <ol class="how">{how}</ol>
      <div class="side-stack">
        <div class="adapt"><p class="adapt-t">À adapter selon l'outil du stagiaire</p><ul>{ad}</ul></div>
        {timer(timer_default, presets)}
        <p class="humour">{humour}</p>
      </div>
    </div>''', seq=seq, section=f"Module {n} · Atelier", notes=notes)


def debrief(n, seq, questions, takeaway, notes):
    cards = "".join(f'''<div class="card sk sk--thin fill-{c}"><h3>{t}</h3><p>{q}</p><span class="f" contenteditable="true" data-k="deb{n}-{i}" data-ph="à noter en direct"></span></div>''' for i, (t, q, c) in enumerate(questions))
    slide(f'''    <h2>Mise en commun : <span class="mark">ce que vous avez vu</span></h2>
    <p class="howto">Chacun montre son écran deux minutes. On note ici ce qui revient.</p>
    <div class="debrief">{cards}</div>
    <p class="takeaway"><b>À retenir.</b> {takeaway}</p>''', seq=seq, section=f"Module {n} · Mise en commun", notes=notes)


def quiz(n, seq, items, notes):
    rows = []
    for i, (q, a, why) in enumerate(items):
        tone = "teal" if a == "Vrai" else "blush" if a == "Faux" else "lav"
        rows.append(f'''<div class="tf sk sk--thin"><p><span class="qn">{i + 1}</span>{q}</p><div class="frag tf-a"><span class="mark mark--{tone} hand">{a}</span><span class="small">{why}</span></div></div>''')
    slide(f'''    <div class="quiz-head"><h2>Quiz du module {n} : <span class="mark mark--mist">deux minutes</span></h2>
      <div><a class="golink quiz-link" data-var-href="quiz.m{n}" data-label="Ouvrir le quiz en ligne" href="#" target="_blank" rel="noopener"><span class="golink-txt">Quiz en ligne</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg></a><span class="quiz-off">Quiz en ligne : lien à coller dans SESSION.quiz.m{n}</span></div></div>
    <p class="howto">Chacun répond sur son téléphone, puis on révèle les réponses une par une (flèche droite).</p>
    <div class="quiz">{"".join(rows)}</div>''', seq=seq, section=f"Module {n} · Quiz", notes=notes)


def pause(label, seq_section, notes):
    slide(f'''    <h2 class="idea" style="margin-top:80px">{label}</h2>
    <p class="lead" style="margin-top:24px;max-width:760px">On reprend à l'heure du programme. Les dessins et les cases remplies restent en place.</p>
    {pic("pause-samoyede", "Le samoyède fait une pause au soleil, une tasse fumante à côté de lui, face aux montagnes.", 880, 495, "position:absolute;right:110px;bottom:190px")}''',
          cls="slide--full", section=seq_section, notes=notes)


# =====================================================================================
# ACCUEIL
# =====================================================================================
slide(f'''    <div class="lockup lockup--cg rise">
      {LOGO_SF}<span class="lockup-sep" aria-hidden="true"></span>{LOGO_CG}{LOGO_CG_W}
    </div>
    <div class="cover-body">
      <h1 class="rise"><span class="l">Mise à jour sur l'IA :</span> <span class="l">nouveaux modèles, <span class="mark">outils et usages</span></span></h1>
      <p class="lead rise">Une journée pour remettre tes outils à jour, en pratiquant sur tes propres cas.</p>
      <p class="cover-meta rise">{var("date", "Lundi 7 décembre 2026")}<span class="var-sep">·</span>{var("horaires", "9h00 à 17h00")}<span class="var-sep">·</span>{var("lieu", "Lieu à confirmer")}</p>
      <p class="cover-meta rise" style="font-weight:500;color:var(--muted)">Marie Jolly, Summit Flow · pour Les Clés de la Gestion</p>
    </div>
    <div class="cover-actions"><button class="btn-act btn-act--ghost" data-act="full">Plein écran</button><button class="btn-act btn-act--ghost" data-act="pdf">Exporter en PDF</button></div>
    {art("couverture-samoyede", "Le samoyède de Summit Flow monte un sentier vers un sommet.", (0, 0, 1060, 596))}''',
      cls="slide--cover slide--full", section="Accueil",
      notes=note("Projetée pendant l'arrivée des stagiaires. On démarre à l'heure, même à cinq.",
                 "Vérifier la veille que date, horaires et lieu sont à jour dans le bloc SESSION, tout en haut du fichier. Ne pas lancer le plein écran avant d'avoir testé le Wi-Fi des stagiaires : toute la journée en dépend.",
                 extra="Les deux logos sont aussi dans le pied de page de chaque slide, et sur la slide finale."))

slide(f'''    <h2>Recueil de besoins : <span class="mark mark--apricot">six questions avant la session</span></h2>
    <p class="howto">Envoyé deux semaines avant, à rendre une semaine avant. Les réponses règlent les ateliers sur vos outils.</p>
    <ol class="recueil">
      <li class="rise"><i>1</i><span>Quels outils d'IA utilises-tu au travail ?<small>ChatGPT, Copilot, Mistral (Vibe, ex Le Chat), Gemini, Claude, autre</small></span></li>
      <li class="rise"><i>2</i><span>En version gratuite ou payante ?<small>Et si payante : personnelle ou fournie par l'entreprise</small></span></li>
      <li class="rise"><i>3</i><span>À quelle fréquence ?<small>Jamais, de temps en temps, chaque semaine, chaque jour</small></span></li>
      <li class="rise"><i>4</i><span>Trois tâches où tu aimerais gagner du temps<small>Elles deviennent la matière des ateliers</small></span></li>
      <li class="rise"><i>5</i><span>Les règles de confidentialité de ton entreprise<small>Outils autorisés, interdits, ou pas de règle connue</small></span></li>
      <li class="rise"><i>6</i><span>Ton aisance avec l'IA, sur 5<small>Pour régler le rythme et former les binômes</small></span></li>
    </ol>
    <p class="small" style="margin-top:22px">Le questionnaire complet est dans recueil-besoins.md. <a class="golink golink--todo" data-var="recueil" href="#" target="_blank" rel="noopener">Lien du questionnaire en ligne</a></p>''',
      seq=1, section="Accueil · Recueil de besoins",
      notes=note("Avant la session : cette slide sert surtout de mémo. Le jour J, 1 minute pour rappeler ce qu'on a demandé et pourquoi.",
                 "Si quelqu'un n'a pas répondu, ne pas le pointer du doigt : lui poser les questions 1, 2 et 5 à l'oral pendant l'échauffement. Sans réponse à la question 5, on applique la règle la plus prudente : aucune donnée réelle dans un outil grand public.",
                 extra="Après réception des réponses : suivre adaptations-apres-recueil.md, slide par slide."))

res = [("Outils utilisés", "rs-outils", "ex. 4 ChatGPT, 2 Copilot"), ("Gratuit ou payant", "rs-offre", "ex. 3 gratuits, 3 payants"), ("Fréquence", "rs-freq", "ex. surtout chaque semaine"),
       ("Tâches qui reviennent", "rs-taches", "les trois ou quatre plus citées"), ("Confidentialité", "rs-conf", "ce qui est autorisé, ce qui ne l'est pas"), ("Aisance moyenne", "rs-aise", "ex. 2,8 sur 5, de 1 à 4")]
cells = "".join(f'<div class="card sk sk--thin fill-{"apricot" if i == 3 else "card"}"><h3>{t}</h3><span class="f" contenteditable="true" data-k="{k}" data-ph="{ph}"></span></div>' for i, (t, k, ph) in enumerate(res))
slide(f'''    <h2>Ce que vos réponses <span class="mark">nous disent</span></h2>
    <p class="howto">Rempli avant la session à partir du questionnaire. Les cases s'écrivent directement dans le deck.</p>
    <div class="res-grid">{cells}</div>
    <p class="takeaway"><b>Règle du jour.</b> Dans un outil grand public, on travaille avec des données fictives ou anonymisées. Les vraies données restent dans les outils validés par ton entreprise.</p>''',
      seq=1, section="Accueil · Vos réponses",
      notes=note("3 minutes. On lit les chiffres, on nomme les tâches qui reviennent : ce sont elles qu'on travaillera.",
                 "Ne jamais citer qui a répondu quoi sur la confidentialité ou l'aisance. Si les outils sont très hétérogènes, le dire tout de suite : chacun travaillera dans son outil, les consignes ont des variantes.",
                 extra="À remplir la veille dans le navigateur qui servira à projeter (les cases sont gardées dans ce navigateur)."))

slide(f'''    <h2 class="me-title">Marie Jolly, <span class="mark">Summit Flow</span><img class="me-title-logo" src="images/logo-summit-flow.png" alt="Logo Summit Flow"></h2>
    <div class="me">
      <div class="me-photo"><figure class="me-pic sk"><img src="images/marie-samoyede.jpg" alt="Marie Jolly en montagne, accroupie à côté de son samoyède blanc en harnais."></figure></div>
      <div class="me-right"><ul class="dash me-list">
        <li class="frag">Ingénieure, dix ans dans l'industrie : production, gestion de projet, industrialisation</li>
        <li class="frag">J'accompagne des PME sur l'IA, l'automatisation et les agents IA, du cadrage à la mise en production</li>
        <li class="frag">Je teste les outils avant de les montrer : ce que vous verrez aujourd'hui a été vérifié pour cette session</li>
      </ul>
      <div class="me-do frag"><div class="me-do-row"><p><b>Former</b>les équipes, sur leurs vrais outils</p><p><b>Auditer</b>les processus, pour voir ce qui gagne à être automatisé</p><p><b>Construire</b>automatisations, assistants, agents</p></div></div></div>
    </div>''', seq=1, section="Accueil · Votre formatrice",
      notes=note("1 minute 30. Court : la journée est à eux.",
                 "Ne pas dérouler un CV. Le message utile : tout ce qui est montré aujourd'hui a été vérifié à la date de la session, et ce qui bouge trop vite est signalé comme tel."))

slide(f'''    <h2>La journée, <span class="mark mark--teal">module par module</span></h2>
    <p class="howto">Chaque module : un cadrage court, un atelier sur tes cas, une mise en commun, un quiz de deux minutes.</p>
    <ol class="agenda agenda--session mt" data-programme></ol>''', cls="slide--full", section="Accueil · Programme",
      notes=note("1 minute.",
                 "Les horaires viennent du bloc SESSION en haut du fichier : si l'organisme change les horaires, on les change là, pas dans les slides.",
                 extra="Répartition prévue sur 7 heures : environ 4 h 40 de manipulation (échauffement, cinq ateliers, quiz, plan d'action), soit les deux tiers de la journée. Le reste : cadrages courts et mises en commun."))

slide(f'''    <h2>Échauffement : <span class="mark mark--apricot">ton dernier usage, en 30 secondes</span></h2>
    <div class="cols mt" style="align-items:start">
      <ol class="steps">
        <li class="frag">Ouvre l'outil d'IA que tu utilises <strong>vraiment</strong></li>
        <li class="frag">Retrouve ta dernière conversation utile</li>
        <li class="frag">Montre-la : ce que tu demandais, ce qui a marché, ce qui a coincé</li>
      </ol>
      <div class="side-stack">
        {timer(5, (3, 5, 10))}
        <p class="humour">Personne ne juge l'historique. Même la recette de crêpes compte.</p>
      </div>
    </div>''', seq=1, section="Accueil · Échauffement",
      notes=note("5 minutes pour six personnes : 30 secondes chacun, plus l'installation.",
                 "C'est de la manipulation, pas un tour de table : tout le monde a l'outil ouvert, ce qui règle aussi les soucis de connexion avant le module 1. Noter au tableau les outils réellement ouverts : ils peuvent différer des réponses au questionnaire."))

# =====================================================================================
# MODULE 1 · NOUVEAUX MODÈLES ET RAISONNEMENT
# =====================================================================================
module_open(1)

slide(f'''    <h2>Rappel express : <span class="mark">ce que tu sais déjà</span></h2>
    <p class="howto">Cinq minutes, pas une de plus. Le reste de la journée est nouveau.</p>
    <div class="cards-3">
      <div class="card sk fill-mint frag"><h3>{icon("search")}Un modèle prédit</h3><p>Il produit le texte le plus probable à partir de ta demande et de son contexte. Il ne « sait » pas : il calcule.</p></div>
      <div class="card sk fill-lav frag"><h3>{icon("file")}Le contexte fait tout</h3><p>Rôle, contexte, tâche, format : plus ta demande est précise, moins il devine. Ça n'a pas changé.</p></div>
      <div class="card sk fill-blush frag"><h3>{icon("alert")}Il peut se tromper</h3><p>Avec aplomb. Les modèles récents se trompent moins souvent, pas jamais : tu restes la dernière relecture.</p></div>
    </div>''', seq=2, section="Module 1 · Rappel",
      notes=note("5 minutes maximum, chronomètre en main.",
                 "Ils ont suivi « Apprendre à utiliser l'Intelligence Artificielle » sur deux jours : ne pas refaire le cours. Poser une question à la salle par carte, valider, passer. Si quelqu'un décroche sur les bases, le noter et le reprendre en binôme pendant l'atelier."))

slide(f'''    <h2>Le catalogue parlait d'O1, O3 et R1. <span class="mark mark--lemon">Voici où on en est.</span></h2>
    <table class="cmp cmp--market mt">
      <thead><tr><th>Dans le catalogue</th><th>Ce que c'était</th><th>Ce qui l'a remplacé, au 12 novembre 2026</th></tr></thead>
      <tbody>
        <tr class="frag"><td class="row">O1, O3 <span class="obso">dépassé</span></td><td>Les premiers modèles « qui réfléchissent » d'OpenAI, à choisir à part dans ChatGPT</td><td>La réflexion est intégrée aux modèles GPT récents : on règle un niveau de réflexion au lieu de changer de modèle</td></tr>
        <tr class="frag"><td class="row">R1 <span class="obso">dépassé</span></td><td>Le modèle de raisonnement de DeepSeek, début 2025</td><td><b>DeepSeek V4 Pro</b> et <b>V4.1 Flash</b> : le mode réflexion est activé par défaut, et se désactive</td></tr>
        <tr class="frag"><td class="row">DeepSeek <span class="obso">à nuancer</span></td><td>L'outsider chinois, gratuit et performant</td><td>Toujours là, modèles ouverts. Même questions de confidentialité qu'avant : on n'y met pas de données de l'entreprise</td></tr>
      </tbody>
    </table>
    <p class="takeaway frag"><b>Le vrai changement.</b> Le « modèle de raisonnement » n'est plus un produit à part : c'est un réglage, chez presque tous les éditeurs.</p>''',
      seq=2, section="Module 1 · Ce qui a changé",
      notes=note("4 minutes.",
                 "Ne pas affirmer qu'O1 ou O3 ont disparu de l'offre : on n'a pas pu le vérifier sur une page officielle d'OpenAI (voir a-verifier.md). Dire « dépassés », pas « supprimés ». DeepSeek : rester factuel, pas de procès d'intention ; la règle de confidentialité vaut pour tout outil grand public.",
                 src("deepseek", "anthropic"),
                 extra="Ce qui est vérifié : chez DeepSeek, deepseek-v4-pro (DeepSeek-V4-Pro-0813) et deepseek-flash (DeepSeek-V4.1-Flash-1017), « thinking (default) ». Chez Anthropic, la réflexion manuelle est remplacée par une réflexion adaptative sur les modèles récents."))

slide(f'''    <h2>Les modèles phares, <span class="mark">éditeur par éditeur</span></h2>
    <table class="cmp cmp--market">
      <thead><tr><th>Éditeur</th><th>Le plus capable</th><th>Le rapide, pour le quotidien</th><th>La réflexion, chez lui</th></tr></thead>
      <tbody>
        <tr class="frag"><td class="row">OpenAI · ChatGPT</td><td><b>GPT-6</b>, présenté début septembre 2026</td><td>Les déclinaisons rapides de GPT-6</td><td>Des niveaux de réflexion à choisir dans ChatGPT. L'accès dépend de l'offre</td></tr>
        <tr class="frag"><td class="row">Anthropic · Claude</td><td><b>Claude Opus 5.5</b> (22 sept.) et <b>Claude Fable 5.2</b> (9 nov.)</td><td><b>Claude Sonnet 5.5</b>, <b>Claude Haiku 5.5</b></td><td>Réflexion adaptative : le modèle décide combien réfléchir</td></tr>
        <tr class="frag"><td class="row">Google · Gemini</td><td><b>Gemini 4 Argon</b> (13 oct., offres Google AI Pro et Ultra)</td><td><b>Gemini 3.6 Flash</b>, pour tous les utilisateurs</td><td>Le mode Thinking, et Deep Think pour l'offre Ultra</td></tr>
        <tr class="frag"><td class="row">Mistral · Vibe</td><td><b>Mistral Large 4</b> (6 oct., poids ouverts)</td><td><b>Mistral Small 4</b></td><td>Small 4 réunit réponse directe, raisonnement et code dans un seul modèle</td></tr>
        <tr class="frag"><td class="row">Microsoft · Copilot</td><td colspan="2">S'appuie sur des modèles d'OpenAI, et d'Anthropic si l'administrateur les active</td><td>Réponse rapide, Réponse approfondie, ou Automatique</td></tr>
      </tbody>
    </table>
    <p class="src-line">Sources officielles consultées le 12 novembre 2026, détail dans les notes. Les noms changent vite : on vérifie dans ton outil, pas sur cette slide.</p>''',
      seq=2, section="Module 1 · Les modèles phares",
      notes=note("5 minutes. Révéler ligne par ligne, demander à chaque ligne : « qui l'utilise ? ».",
                 "Ne pas faire un concours de benchmarks. Ne pas donner de prix ici. OpenAI : ses pages officielles n'ont pas pu être lues depuis l'environnement de préparation (blocage automatique). GPT-6 est confirmé par l'annonce sur le forum développeurs d'OpenAI et cité par Mistral dans son annonce du 6 octobre ; les noms des déclinaisons (Astra, Sol) et l'accès par offre sont dans a-verifier.md. À contrôler sur ChatGPT la veille.",
                 src("openai_gpt6", "anthropic", "anthropic_news", "gemini", "ml4", "mistral_models"),
                 extra="Copilot : modes vus sur Copilot Business en novembre 2026 lors de la préparation du deck Lagarrigue. Gemini 4 Argon : « rolling out globally for Google AI Pro &amp; Ultra subscribers ». Gemini 3.6 Flash : « to all Gemini app users globally »."))

slide(f'''    <h2>Le mode réflexion : <span class="mark mark--lav">quand il vaut l'attente</span></h2>
    <div class="cols mt" style="align-items:start">
      <div class="card sk fill-mint frag"><h3>Réponse rapide</h3><ul class="dash"><li>Reformuler, traduire, résumer</li><li>Un e-mail, un post, une idée de titre</li><li>Une question dont tu connais déjà la réponse</li></ul></div>
      <div class="card sk fill-lav frag"><h3>Réflexion activée</h3><ul class="dash"><li>Des chiffres, un calcul, un tableau à analyser</li><li>Comparer des options avec des critères</li><li>Un raisonnement en plusieurs étapes, un cas ambigu</li></ul></div>
    </div>
    <p class="takeaway frag"><b>Le réflexe.</b> Commencer en automatique ou en rapide. Passer en réflexion si la réponse reste superficielle, ou dès qu'il y a des chiffres.</p>''',
      seq=2, section="Module 1 · Quand réfléchir",
      notes=note("3 minutes, puis on enchaîne sur l'atelier : c'est lui qui va confirmer ou non cette règle.",
                 "Ne pas promettre que la réflexion « ne se trompe pas » : elle se trompe moins sur certains types de tâches, et elle est plus lente. L'atelier sert justement à le constater sur leurs cas."))

consigne(1, 2, "le même cas, deux réglages",
         "Tester une de tes trois tâches en mode rapide, puis en mode réflexion, et décider lequel garder.",
         "40 min",
         "Ta grille remplie : deux réponses comparées sur quatre critères, et ta règle en une phrase.",
         "Tu sais dire, pour cette tâche, quel réglage tu choisis et pourquoi.",
         ["Prends une des trois tâches de ton questionnaire. Pas de donnée réelle : <b>invente ou anonymise</b>.",
          "Écris ta demande une fois, propre : rôle, contexte, tâche, format.",
          "Lance-la en <b>mode rapide</b>. Copie la réponse.",
          "Lance exactement la même demande en <b>mode réflexion</b>. Note le temps d'attente.",
          "Compare sur quatre critères : juste, utile, ce qu'il a fallu corriger, temps d'attente.",
          "Écris ta règle : « pour ce type de tâche, j'utilise… »"],
         [("ChatGPT", "choisis le niveau de réflexion dans le sélecteur de modèle. En gratuit, l'accès à la réflexion peut être limité"),
          ("Copilot", "Réponse rapide, puis Réponse approfondie"),
          ("Mistral Vibe", "même demande, réflexion activée si ton offre la propose"),
          ("Gemini", "3.6 Flash, puis le mode Thinking"),
          ("Claude", "réflexion adaptative : compare plutôt Sonnet et Opus"),
          ("Pas d'outil autorisé", "binôme avec un voisin, ou démonstration projetée")],
         "Le mode réflexion, c'est le collègue qui dit « laisse-moi y réfléchir ». Parfois génial. Parfois juste plus long.",
         note("40 minutes. Lancer le minuteur. À mi-parcours (20 min), faire un point : tout le monde a-t-il lancé les deux versions ?",
              "Le piège classique : changer la demande entre les deux essais, ce qui fausse la comparaison. Deuxième piège : prendre une tâche trop simple (un e-mail de deux lignes), où la réflexion n'apporte rien de visible. Pousser vers une tâche avec des chiffres ou une décision. Ne pas laisser coller des données clients réelles dans un outil gratuit.",
              extra="Variantes par outil : voir l'encadré, à ajuster après le recueil (adaptations-apres-recueil.md, atelier 1)."),
         timer_default=40, presets=(10, 20, 40))

debrief(1, 2, [("Où ça a aidé", "Sur quelle tâche la réflexion a-t-elle vraiment changé la réponse ?", "lav"),
               ("Où ça n'a rien changé", "Où la version rapide suffisait-elle ?", "mint"),
               ("Vos règles", "Une règle par personne, en une phrase.", "apricot")],
        "La réflexion se choisit tâche par tâche. Le bon réflexe ne dépend pas du modèle à la mode, mais de ta tâche.",
        note("10 minutes. Deux minutes d'écran par personne au maximum, on note au fil de l'eau dans les cases.",
             "Ne pas laisser le débrief tourner en débat « quel est le meilleur modèle ». Ramener à la question : pour TA tâche, quel réglage ?"))

quiz(1, 2, [
    ("O1, O3 et R1 sont les modèles de raisonnement les plus récents.", "Faux", "Ils ont été dépassés : la réflexion est désormais un réglage intégré aux modèles récents."),
    ("Le mode réflexion est plus utile pour analyser des chiffres que pour reformuler un e-mail.", "Vrai", "Il apporte surtout sur les calculs, les comparaisons et les raisonnements en étapes."),
    ("Un modèle plus récent ne fait plus d'erreurs.", "Faux", "Il en fait moins sur certaines tâches, pas zéro. La relecture humaine reste la règle."),
    ("Pour comparer deux réglages, il faut garder exactement la même demande.", "Vrai", "Sinon on compare deux demandes, pas deux réglages."),
], note("5 minutes avec le quiz en ligne, 2 minutes à main levée sinon.",
        "Coller le lien du quiz dans SESSION.quiz.m1 avant la session (questions prêtes dans quiz.md). Révéler la réponse après le vote, pas avant."))

pause("Pause, dix minutes", "Pause", note("10 minutes.", "Relancer à l'heure : le module 2 a le plus long atelier de la journée."))

# =====================================================================================
# MODULE 2 · CHATGPT
# =====================================================================================
module_open(2)

slide(f'''    <h2>ChatGPT ne se résume plus <span class="mark">à une conversation</span></h2>
    <div class="cards-4">
      <div class="card sk fill-apricot frag"><h3>Projets</h3><p>Un espace par dossier : tes conversations, tes fichiers et tes instructions au même endroit. Il garde le contexte d'une conversation à l'autre.</p></div>
      <div class="card sk fill-mint frag"><h3>Assistants spécialisés</h3><p>Une consigne métier écrite une fois, réutilisable par toi ou ton équipe. Les GPT personnalisés, et côté entreprise les agents d'espace de travail.</p></div>
      <div class="card sk fill-lav frag"><h3>Tâches planifiées</h3><p>Une demande qui se relance seule, une fois ou à intervalle régulier, et dont le résultat t'est notifié.</p></div>
      <div class="card sk fill-mist frag"><h3>Le mode agent</h3><p>Il enchaîne plusieurs étapes, sur le web et dans tes applications connectées, et te demande avant les actions sensibles.</p></div>
    </div>
    <p class="takeaway frag"><b>L'idée.</b> On passe de la question posée une fois à un espace de travail qui se souvient, se répète et agit.</p>''',
      seq=3, section="Module 2 · Ce qui a changé",
      notes=note("4 minutes.",
                 "Ne pas citer de limites chiffrées par offre (nombre de fichiers, de tâches actives) : elles n'ont pas pu être vérifiées sur les pages officielles et elles bougent. Les noms exacts du mode agent et des agents d'espace de travail sont à vérifier la veille sur un compte (a-verifier.md). Montrer plutôt que décrire : ouvrir ChatGPT en direct et pointer chaque entrée du menu.",
                 src("openai_rn", "openai_projects", "ws_agents")))

slide(f'''    <h2>Un projet, <span class="mark mark--apricot">trois ingrédients</span></h2>
    <div class="cols mt" style="grid-template-columns:1fr 1fr 1fr;gap:26px">
      <div class="card sk fill-card frag"><h3>{icon("file")}Les instructions</h3><p>Qui tu es, pour quoi ce projet existe, comment répondre. Elles s'appliquent à toutes les conversations du projet.</p></div>
      <div class="card sk fill-card frag"><h3>{icon("ledger")}Les fichiers</h3><p>Tes documents de référence : trame, procédure, exemples réussis. Il les consulte, il ne les apprend pas par cœur.</p></div>
      <div class="card sk fill-card frag"><h3>{icon("users")}Les conversations</h3><p>Rangées ensemble, elles nourrissent le contexte du projet. Un projet partagé garde une mémoire propre au projet.</p></div>
    </div>
    <div class="alert alert--compact frag" style="margin-top:30px">{icon("alert")}<div><p class="alert-title">Avant de partager un projet</p><p>Les personnes invitées voient les fichiers et les conversations du projet. Rien de confidentiel dedans si l'outil n'est pas validé par ton entreprise.</p></div></div>''',
      seq=3, section="Module 2 · Les projets",
      notes=note("3 minutes.",
                 "Le piège n°1 des projets : y déposer tout le dossier client « pour qu'il sache ». Rappeler qu'un fichier est consulté au moment de la demande, pas mémorisé : les faits clés vont dans les instructions. Le partage et ses règles de mémoire sont à vérifier sur la page d'aide OpenAI la veille (a-verifier.md).",
                 src("openai_projects", "openai_rn")))

slide(f'''    <h2>Assistant ou tâche planifiée : <span class="mark mark--lav">lequel pour toi ?</span></h2>
    <table class="cmp mt">
      <thead><tr><th></th><th>Assistant spécialisé</th><th>Tâche planifiée</th></tr></thead>
      <tbody>
        <tr class="frag"><td class="row">Qui déclenche</td><td class="ok">Toi, quand tu en as besoin</td><td class="mid">L'horloge : chaque lundi, chaque matin, une fois</td></tr>
        <tr class="frag"><td class="row">Pour quoi faire</td><td class="ok">Un geste métier toujours fait de la même façon : une fiche, une réponse type, une relecture</td><td class="mid">Une veille, un rappel, une synthèse qui doit arriver sans que tu y penses</td></tr>
        <tr class="frag"><td class="row">Ce qu'il te faut</td><td class="ok">Des instructions très claires et un ou deux exemples réussis</td><td class="mid">Une demande qui se suffit à elle-même, sans ton aide au moment de l'exécution</td></tr>
        <tr class="frag"><td class="row">La limite</td><td class="ok">Il ne fait que ce qu'on lui a décrit</td><td class="mid">Personne ne relit au moment où elle tourne : on vérifie le résultat</td></tr>
      </tbody>
    </table>''', seq=3, section="Module 2 · Assistants et tâches",
      notes=note("3 minutes, puis consigne.",
                 "Ne pas présenter la tâche planifiée comme une automatisation complète : elle relance une demande, elle n'écrit pas dans tes logiciels sans connecteur. Les accès par offre (gratuit, Go, Plus, Business) sont à vérifier : ne pas promettre à un stagiaire en gratuit qu'il pourra tout faire.",
                 src("openai_rn")))

consigne(2, 3, "ton premier vrai projet",
         "Construire un projet pour un dossier récurrent de ton travail, puis lui ajouter une tâche ou un assistant.",
         "85 min",
         "A : un projet testé sur trois demandes. B : une tâche planifiée ou un assistant qui tourne.",
         "Un collègue pourrait ouvrir ton projet lundi et s'en servir sans toi.",
         ["<b>A, 45 min.</b> Choisis un dossier récurrent : relances, appels d'offres, comptes rendus…",
          "Crée le projet et ses instructions : qui tu es, à quoi il sert, le format attendu.",
          "Dépose deux documents <b>non confidentiels</b> : une trame, un exemple réussi.",
          "Teste trois demandes. Corrige les instructions après chaque essai.",
          "<b>B, 40 min.</b> Ajoute une tâche planifiée <b>ou</b> un assistant, et vérifie son premier résultat."],
         [("ChatGPT gratuit", "limites possibles : en B, l'assistant plutôt que la tâche"),
          ("ChatGPT payant", "projet, tâche planifiée et assistant"),
          ("Copilot", "Notebooks en A, requête planifiée ou nouvel agent en B"),
          ("Mistral Vibe", "dossier de projet et bibliothèque, puis tâche planifiée"),
          ("Gemini ou Claude", "compétence enregistrée (Gemini), projet (Claude)")],
         "Un projet où toi seul retrouves les choses, ce n'est pas un projet, c'est un tiroir.",
         note("85 minutes : 45 pour la partie A, 40 pour la partie B. Point d'étape obligatoire à la fin de la partie A : chacun montre ses instructions en 30 secondes.",
              "Piège 1 : des instructions trop vagues (« sois professionnel »). Exiger le format attendu et un exemple. Piège 2 : déposer des documents réels clients ou salariés : rappeler la règle du jour. Piège 3 : la tâche planifiée qui dépend d'un fichier qu'elle ne voit pas : la demande doit se suffire à elle-même. Les stagiaires en gratuit qui butent sur une limite passent en binôme ou basculent sur l'assistant.",
              extra="Prévoir deux documents fictifs de secours (une trame de compte rendu, un exemple de relance) pour ceux qui n'ont rien à déposer. Variantes : adaptations-apres-recueil.md, atelier 2."),
         timer_default=40, presets=(20, 40, 45))

debrief(2, 3, [("Le plus utile", "Quel projet servira dès lundi ? Pourquoi celui-là ?", "apricot"),
               ("Ce qui a coincé", "Limite d'offre, instructions floues, document mal compris ?", "blush"),
               ("Instructions qui marchent", "Une phrase d'instructions que les autres devraient copier.", "mint")],
        "Un projet vaut ce que valent ses instructions. On les réécrit après chaque mauvaise réponse, pas une fois pour toutes.",
        note("15 minutes. Faire lire à voix haute les meilleures phrases d'instructions : c'est ce qui se transmet le mieux.",
             "Ne pas laisser les stagiaires en gratuit repartir avec l'idée que « ça ne marche pas pour eux » : montrer ce qu'ils ont pu faire, et ce que débloquerait une offre payante validée par leur entreprise."))

quiz(2, 3, [
    ("Les fichiers d'un projet sont appris par cœur par le modèle.", "Faux", "Ils sont consultés au moment de la demande. Les faits clés vont dans les instructions."),
    ("Une tâche planifiée peut tourner pendant que tu ne regardes pas ChatGPT.", "Vrai", "C'est son intérêt, et c'est pour ça qu'on vérifie son résultat."),
    ("Partager un projet, c'est partager aussi ses fichiers.", "Vrai", "Les personnes invitées accèdent au contenu du projet : rien de confidentiel dedans."),
    ("Pour une réponse toujours faite de la même façon, l'assistant spécialisé est le bon choix.", "Vrai", "Il porte la consigne métier, toi tu le déclenches quand tu en as besoin."),
], note("5 minutes.", "Coller le lien dans SESSION.quiz.m2 avant la session (questions prêtes dans quiz.md)."))

pause("Déjeuner", "Déjeuner", note("1 heure.", "Laisser le deck sur cette slide. Proposer à ceux qui ont buté sur la partie B de revenir dix minutes avant la reprise."))

# =====================================================================================
# MODULE 3 · MISTRAL
# =====================================================================================
module_open(3)

slide(f'''    <h2>Le Chat s'appelle <span class="mark">désormais Vibe</span></h2>
    <div class="cols mt" style="align-items:start">
      <div class="stack">
        <p class="frag" style="font-size:30px">Le 28 mai 2026, Mistral a renommé son application : <b>Le Chat devient Vibe</b>. Conversations, réglages et abonnements ont été conservés.</p>
        <ul class="dash frag" style="font-size:26px"><li style="font-size:26px">Même adresse : chat.mistral.ai, et les applis mobiles</li><li style="font-size:26px">Trois modes : Conversation, Work pour les tâches longues, Code</li><li style="font-size:26px">Des modèles de Mistral, entraînés et servis en Europe</li></ul>
      </div>
      <table class="cmp cmp--market frag">
        <thead><tr><th>Offre</th><th>Pour qui</th></tr></thead>
        <tbody>
          <tr><td class="row">Free</td><td>Découvrir : messages, recherches web et images en quantité limitée</td></tr>
          <tr><td class="row">Pro</td><td>Usage quotidien : 14,99 $ HT par mois, tarif étudiant réduit</td></tr>
          <tr><td class="row">Team</td><td>Équipe : 24,99 $ HT par utilisateur et par mois, espace partagé, administration</td></tr>
          <tr><td class="row">Enterprise</td><td>Déploiement privé, sur devis</td></tr>
        </tbody>
      </table>
    </div>
    <p class="src-line">Prix affichés en dollars sur mistral.ai le 12 novembre 2026, hors taxes. Le prix en euros est à lire sur la page tarifs, en choisissant l'euro.</p>''',
      seq=4, section="Module 3 · Le Chat devient Vibe",
      notes=note("4 minutes.",
                 "Beaucoup de stagiaires connaissent encore « Le Chat » : le dire tout de suite pour éviter la confusion. Ne pas annoncer de prix en euros : la page affiche les dollars par défaut et la conversion se fait sur le site (a-verifier.md). Ne pas confondre l'application Vibe avec Mistral Vibe CLI, l'outil de code en ligne de commande.",
                 src("vibe", "mistral_pricing"),
                 extra="Citation : « Le Chat is now Vibe (…) with every conversation, setting, and plan carried over. »"))

slide(f'''    <h2>Ce qu'on fait dans Vibe, <span class="mark mark--apricot">pour le travail</span></h2>
    <div class="cards-4">
      <div class="card sk fill-card frag"><h3>Mode Work</h3><p>Il prépare un plan, te le fait valider, puis travaille avec tes connecteurs : recherche, synthèse, livrable dans le Canvas.</p></div>
      <div class="card sk fill-card frag"><h3>Projets et bibliothèques</h3><p>Des dossiers de projet et des bibliothèques de documents pour garder le contexte.</p></div>
      <div class="card sk fill-card frag"><h3>Images</h3><p>Génération et retouche d'images à partir d'une description, en quantité limitée en gratuit.</p></div>
      <div class="card sk fill-card frag"><h3>Voix</h3><p>Enregistrer ou déposer un audio, obtenir la transcription, poser des questions, en tirer un résumé.</p></div>
    </div>
    <div class="cols frag" style="margin-top:22px;gap:20px"><p class="small"><b>Aussi :</b> tâches planifiées (une fois, chaque jour, chaque semaine, chaque mois), compétences réutilisables, plus de cent connecteurs, tableurs et présentations.</p><p class="small"><b>Réglage à connaître :</b> l'utilisation de tes conversations pour l'entraînement se désactive dans les paramètres, sur toutes les offres.</p></div>''',
      seq=4, section="Module 3 · Vibe au travail",
      notes=note("4 minutes, en démonstration rapide si le réseau le permet.",
                 "Le partenaire technique de la génération d'images n'a pas été confirmé sur une page officielle de Mistral en 2026 : ne pas le citer (a-verifier.md). Le mode Work demande une validation du plan : c'est un bon argument de maîtrise, à montrer. Ne pas promettre les connecteurs entreprise (Outlook, SharePoint) à un stagiaire en gratuit.",
                 src("vibe", "mistral_pricing"),
                 extra="Sur la page tarifs, la ligne « Model training » indique « Opt-out » pour chaque offre."))

slide(f'''    <h2>Pourquoi Mistral compte <span class="mark mark--teal">pour une PME française</span></h2>
    <div class="cards-3">
      <div class="card sk fill-mint frag"><h3>Hébergé en Europe</h3><p>Mistral Large 4 a été entraîné dans les centres de données de Mistral en Europe, avec un déploiement européen opéré de bout en bout.</p></div>
      <div class="card sk fill-lav frag"><h3>Modèles ouverts</h3><p>Large 4 et Small 4 ont des poids ouverts : une entreprise peut les installer chez elle. Utile quand les données ne doivent pas sortir.</p></div>
      <div class="card sk fill-apricot frag"><h3>La voix, en français</h3><p>Voxtral 3, le 20 octobre 2026 : transcription en plus de 50 langues, qui distingue qui parle, et synthèse vocale.</p></div>
    </div>
    <p class="takeaway frag"><b>À garder en tête.</b> « Français » ne veut pas dire « autorisé chez toi ». La règle de ton entreprise passe avant le drapeau.</p>''',
      seq=4, section="Module 3 · Pourquoi Mistral",
      notes=note("3 minutes.",
                 "Éviter le discours militant. L'argument souveraineté est réel pour certaines données, mais la décision appartient à l'entreprise. Ne pas comparer les scores de benchmark publiés par Mistral avec ceux des autres : ce sont les chiffres de l'éditeur.",
                 src("ml4", "voxtral3", "mistral_models"),
                 extra="Large 4 : « trained from scratch on 3,800 NVIDIA Grace Blackwell GPUs in Mistral's own datacenters in Europe », preview le 6 octobre, poids publiés fin octobre (article « Le Chonk », 29 octobre). Voxtral 3 : « Available today through Mistral's EU-hosted API or for self-deployment »."))

consigne(3, 4, "ton cas, version française",
         "Refaire ton cas du matin dans Vibe, puis tester deux usages que ton outil habituel fait peut-être moins bien.",
         "40 min",
         "Trois lignes de comparaison avec ton outil habituel, une image utile, le compte rendu d'un mémo vocal.",
         "Tu sais dire ce que Vibe fait aussi bien, mieux ou moins bien que ton outil, sur tes cas.",
         ["Ouvre Vibe (chat.mistral.ai). Pas de compte ? Le compte gratuit suffit.",
          "Relance <b>exactement</b> la demande de l'atelier 1 ou de ton projet. Compare en trois lignes.",
          "Génère une image utile à ton travail : visuel de note interne, illustration de post. Trois itérations maximum.",
          "Enregistre un mémo vocal d'une minute (une réunion fictive), puis demande un compte rendu structuré.",
          "Note ton verdict : pour quoi tu utiliserais Vibe chez toi."],
         [("Déjà sur Mistral", "va plus loin : mode Work sur une recherche, ou une tâche planifiée"),
          ("Entreprise qui interdit les outils non validés", "binôme avec un voisin autorisé, ou démonstration projetée"),
          ("Pas de micro", "dépose un court fichier audio fourni par la formatrice"),
          ("Outil habituel Copilot", "compare surtout la partie compte rendu avec Teams")],
         "Trois itérations pour l'image : à la quatrième, ce n'est plus de l'IA, c'est de la procrastination.",
         note("40 minutes. Annoncer les trois temps : 15 minutes de comparaison, 10 d'image, 15 de compte rendu.",
              "Piège 1 : créer un compte avec une adresse professionnelle sans savoir si l'entreprise l'autorise : poser la question avant. Piège 2 : la séance d'image qui dérape : limiter à trois itérations. Piège 3 : enregistrer une vraie réunion avec de vrais noms : mémo fictif uniquement. Prévoir un fichier audio de secours d'une minute, sans donnée personnelle.",
              extra="Variantes : adaptations-apres-recueil.md, atelier 3."),
         timer_default=40, presets=(10, 15, 40))

debrief(3, 4, [("Aussi bien, ou mieux", "Où Vibe a-t-il fait jeu égal avec ton outil, ou mieux ?", "mint"),
               ("Moins bien", "Où a-t-il moins bien fait ?", "blush"),
               ("Pour quoi chez toi", "Un usage précis où tu l'utiliserais.", "apricot")],
        "Avoir deux outils, ce n'est pas du luxe : c'est pouvoir choisir selon la tâche et selon la donnée.",
        note("7 minutes, c'est le débrief le plus court : aller vite sur les deux premières cases, s'arrêter sur la troisième.",
             "Ne pas laisser conclure « c'est moins bien que ChatGPT » sur une seule demande : un essai ne fait pas un comparatif. C'est l'objet du module 4."))

quiz(3, 4, [
    ("Le Chat de Mistral a été renommé Vibe en 2026.", "Vrai", "Le 28 mai 2026. Les conversations et abonnements ont été conservés."),
    ("Un outil français est automatiquement autorisé dans toutes les entreprises françaises.", "Faux", "La règle interne de l'entreprise s'applique, quel que soit l'outil."),
    ("Vibe peut transcrire un audio et en tirer un résumé.", "Vrai", "Le mode vocal transcrit un enregistrement ou un fichier, puis répond à tes questions."),
    ("Mistral Large 4 peut être installé sur les serveurs d'une entreprise.", "Vrai", "Ses poids sont ouverts, sous la licence de Mistral."),
], note("5 minutes.", "Coller le lien dans SESSION.quiz.m3 avant la session (questions prêtes dans quiz.md)."))

# =====================================================================================
# MODULE 4 · COMPARATIF
# =====================================================================================
module_open(4)

slide(f'''    <h2>Image et vidéo : <span class="mark mark--lav">qui fait quoi</span></h2>
    <table class="cmp cmp--market">
      <thead><tr><th></th><th>Outil</th><th>À retenir</th></tr></thead>
      <tbody>
        <tr class="frag"><td class="row">Image</td><td><b>Nano Banana</b> (Google, dans Gemini)</td><td>Créer et retoucher une image en conversation</td></tr>
        <tr class="frag"><td class="row">Image</td><td><b>Génération d'images dans ChatGPT</b></td><td>Directement dans la conversation, utile pour des visuels simples</td></tr>
        <tr class="frag"><td class="row">Image</td><td><b>Vibe</b> (Mistral)</td><td>Génération et retouche, limitées en gratuit</td></tr>
        <tr class="frag"><td class="row">Image, vidéo</td><td><b>FLUX 3</b> (Black Forest Labs, Allemagne)</td><td>Images, et vidéos jusqu'à 20 secondes avec son ; poids ouverts disponibles</td></tr>
        <tr class="frag"><td class="row">Image</td><td><b>Midjourney</b></td><td>La référence pour le rendu artistique, sur abonnement</td></tr>
        <tr class="frag"><td class="row">Vidéo</td><td><b>Veo 3.1</b> et <b>Gemini Omni</b> (Google)</td><td>Vidéo avec son. Omni crée et modifie des vidéos dans l'application Gemini, pour les abonnés Google AI</td></tr>
      </tbody>
    </table>
    <p class="src-line">Versions et accès vérifiés sur les pages des éditeurs le 12 novembre 2026, sauf Midjourney et ChatGPT : voir a-verifier.md.</p>''',
      seq=5, section="Module 4 · Image et vidéo",
      notes=note("4 minutes.",
                 "Ne pas citer de numéro de version pour Midjourney ni pour le modèle d'image de ChatGPT : non vérifiés sur une page officielle. Ne pas présenter Sora : son statut grand public est à confirmer (a-verifier.md). Kling et Runway existent, mais leurs versions actuelles n'ont pas pu être vérifiées : les citer à l'oral seulement si un stagiaire les utilise. Rappeler le droit à l'image et les règles de marque : pas de visage réel, pas de logo d'un tiers.",
                 src("dm_models", "veo", "gemini", "bfl", "mistral_pricing"),
                 extra="FLUX 3 : « native audio and up to 20 second clips in a single generation ». Gemini Omni : « rolling out today in the Gemini app to all Google AI subscribers globally 18 and over, Feature availability varies by region »."))

slide(f'''    <h2>Audio et musique : <span class="mark mark--apricot">voix, podcasts, jingles</span></h2>
    <div class="cards-4">
      <div class="card sk fill-card frag"><h3>ElevenLabs</h3><p>Voix de synthèse très naturelles (modèle Eleven v4), doublage, musique, transcription, agents vocaux.</p></div>
      <div class="card sk fill-card frag"><h3>Voxtral TTS 3</h3><p>La synthèse vocale de Mistral : plus de 35 langues, voix qui s'adaptent au ton de la conversation.</p></div>
      <div class="card sk fill-card frag"><h3>Suno v6</h3><p>Chansons et musiques complètes à partir d'un texte, depuis le 9 septembre 2026.</p></div>
      <div class="card sk fill-card frag"><h3>Lyria</h3><p>Le modèle musical de Google DeepMind, utilisé dans les outils de Google.</p></div>
    </div>
    <div class="alert alert--compact frag" style="margin-top:26px">{icon("alert")}<div><p class="alert-title">Voix et musique : prudence</p><p>Pas de clonage de la voix d'un collègue sans son accord écrit. Pour un usage commercial, lire les conditions de licence de chaque outil.</p></div></div>''',
      seq=5, section="Module 4 · Audio et musique",
      notes=note("3 minutes. Faire écouter un extrait si le son de la salle le permet.",
                 "Ne pas promettre qu'une musique générée est libre de droits : ça dépend de l'offre et des conditions de l'outil. Le clonage de voix est un sujet juridique (droit de la personnalité) : rester sur la règle simple de l'accord écrit.",
                 src("eleven", "voxtral3", "suno", "dm_models"),
                 extra="ElevenLabs : « Meet Eleven v4, our most emotive model yet ». Suno : billet « Introducing v6 », 9 septembre 2026."))

slide(f'''    <h2>Comptes rendus de réunion : <span class="mark">le match utile</span></h2>
    <table class="cmp cmp--market">
      <thead><tr><th>Outil</th><th>Ce qu'il fait</th><th>Ce qu'il faut</th></tr></thead>
      <tbody>
        <tr class="frag"><td class="row">Teams + Copilot</td><td>Pendant et après la réunion : qui a dit quoi, points d'accord, actions</td><td>Une licence Copilot. Si l'organisateur coupe Copilot, l'enregistrement et la transcription s'arrêtent aussi</td></tr>
        <tr class="frag"><td class="row">Google Meet</td><td>« Prendre des notes pour moi » : notes rangées dans Google Docs, résumé envoyé à l'organisateur</td><td>Une édition Workspace ou une offre Google AI éligible. Français pris en charge, une langue par réunion</td></tr>
        <tr class="frag"><td class="row">Vibe (Mistral)</td><td>Transcription et résumé d'un enregistrement ou d'un fichier audio</td><td>Le compte Vibe. Côté API, Voxtral Transcribe 3 distingue les intervenants</td></tr>
        <tr class="frag"><td class="row">Fireflies</td><td>Un assistant qui rejoint tes visios, transcrit et résume</td><td>Offre gratuite, puis payante par utilisateur. Plus de 100 langues, conformité RGPD annoncée</td></tr>
      </tbody>
    </table>
    <p class="takeaway frag"><b>Avant d'enregistrer.</b> On prévient tous les participants, et on vérifie que l'outil est autorisé par l'entreprise. Toujours.</p>''',
      seq=5, section="Module 4 · Comptes rendus",
      notes=note("4 minutes. C'est souvent la catégorie la plus attendue : y passer le temps nécessaire.",
                 "Enregistrer une réunion engage des données personnelles : information préalable des participants, outil validé. Ne pas citer le mode d'enregistrement de ChatGPT ni Noota avec des détails : non vérifiés sur une page officielle (a-verifier.md). Les prix de Fireflies sont affichés en dollars et en facturation annuelle : ne pas les annoncer sans les relire.",
                 src("teams", "meet", "voxtral3", "mistral_pricing", "fireflies"),
                 extra="Microsoft : « When organizers turn off Copilot for their meeting or event, recording and transcription are also turned off. » Google : « Cette fonctionnalité ne prend en charge qu'une seule langue à la fois »."))

slide(f'''    <h2>Texte et raisonnement, puis <span class="mark mark--teal">cinq critères pour choisir</span></h2>
    <div class="cols mt" style="grid-template-columns:1fr 1.15fr;align-items:start">
      <div class="card sk fill-card"><h3>Pour le texte</h3><p>Les modèles phares se valent sur beaucoup de tâches courantes. Les écarts se voient sur <b>tes</b> tâches : c'est pour ça qu'on teste.</p><p class="small" style="margin-top:12px">Le tableau des modèles du module 1 reste la référence du jour.</p></div>
      <ol class="steps">
        <li class="frag"><strong>Les données</strong> : ce que j'ai le droit d'y mettre</li>
        <li class="frag"><strong>L'intégration</strong> : est-ce dans mes outils de tous les jours ?</li>
        <li class="frag"><strong>La qualité</strong>, testée sur ma tâche, pas sur une démo</li>
        <li class="frag"><strong>Le coût</strong>, gratuit compris : ce que je paie, ce que je donne</li>
        <li class="frag"><strong>L'adoption</strong> : mes collègues s'en serviront-ils ?</li>
      </ol>
    </div>''', seq=5, section="Module 4 · Choisir",
      notes=note("3 minutes, puis consigne.",
                 "Ne pas désigner « le meilleur outil » : la réponse change selon la tâche, la donnée et l'entreprise. Le critère données est toujours le premier, même s'il est le moins drôle."))

consigne(4, 5, "banc d'essai en binôme",
         "Faire passer le même brief dans deux ou trois outils d'une même catégorie, et recommander l'un d'eux sur preuve.",
         "45 min",
         "Une grille de comparaison remplie et une recommandation en une phrase, présentée aux autres.",
         "Ta recommandation s'appuie sur ton test, pas sur la réputation de l'outil.",
         ["Formez trois binômes. Chaque binôme tire une catégorie : <b>texte</b>, <b>image</b> ou <b>compte rendu</b>.",
          "Écrivez un brief unique, tiré d'une vraie tâche d'un des deux (données fictives).",
          "Passez-le dans deux ou trois outils accessibles à l'un de vous.",
          "Remplissez la grille : qualité, temps, facilité, confidentialité, coût connu.",
          "Rédigez la recommandation : « pour ce besoin, on prend… parce que… »"],
         [("Binômes", "à former selon les outils déclarés : un utilisateur payant avec un utilisateur gratuit"),
          ("Catégorie image", "Gemini, ChatGPT et Vibe sont accessibles en gratuit avec des limites"),
          ("Catégorie compte rendu", "même audio de secours d'une minute pour tout le monde"),
          ("Catégorie audio, si un binôme est en avance", "un court texte lu par deux voix de synthèse")],
         "Règle du banc d'essai : on n'a pas le droit de dire « de toute façon je préfère l'autre » avant d'avoir rempli la grille.",
         note("45 minutes : 5 de constitution des binômes, 30 de test, 10 de rédaction.",
              "Piège 1 : des briefs différents d'un outil à l'autre. Piège 2 : juger sur la mise en forme plutôt que sur le fond. Piège 3 : oublier la colonne confidentialité. Circuler pour faire remplir la grille au fil de l'eau, pas à la fin.",
              extra="Grille à projeter ou à recopier : critère, outil A, outil B, outil C, sur cinq lignes. Variantes : adaptations-apres-recueil.md, atelier 4."),
         timer_default=30, presets=(5, 10, 30))

debrief(4, 5, [("Texte", "Recommandation du binôme texte, et sa preuve.", "mint"),
               ("Image", "Recommandation du binôme image, et sa preuve.", "lav"),
               ("Compte rendu", "Recommandation du binôme compte rendu, et sa preuve.", "apricot")],
        "Le bon outil, c'est celui qui passe ton test et que ton entreprise autorise. Pas celui dont tout le monde parle.",
        note("12 minutes : 3 minutes par binôme, 3 minutes de synthèse.",
             "Chaque binôme parle de sa preuve, pas de son impression. Si deux binômes se contredisent, c'est normal : les tâches étaient différentes."))

quiz(4, 5, [
    ("Pour enregistrer une réunion, il suffit que l'outil soit gratuit.", "Faux", "Il faut prévenir les participants, et utiliser un outil autorisé par l'entreprise."),
    ("Dans Teams, les fonctions Copilot en réunion demandent une licence Copilot.", "Vrai", "C'est ce que précise la documentation de Microsoft."),
    ("Une musique générée par IA est toujours libre de droits.", "Faux", "Ça dépend de l'outil, de l'offre et de ses conditions."),
    ("Le premier critère pour choisir un outil, ce sont les données qu'on a le droit d'y mettre.", "Vrai", "Avant la qualité, avant le prix."),
], note("5 minutes.", "Coller le lien dans SESSION.quiz.m4 avant la session (questions prêtes dans quiz.md)."))

pause("Pause, dix minutes", "Pause", note("10 minutes.", "Dernière ligne droite : annoncer que le module 5 relie tout ce qu'on a fait."))

# =====================================================================================
# MODULE 5 · WORKFLOWS
# =====================================================================================
module_open(5)

slide(f'''    <h2>Trois niveaux, <span class="mark">du plus simple au plus automatique</span></h2>
    <div class="cards-3">
      <div class="card sk fill-mint frag"><h3>1. La demande réutilisable</h3><p>Une demande bien écrite, enregistrée et relancée à la main. Le niveau qui sert le plus souvent.</p></div>
      <div class="card sk fill-apricot frag"><h3>2. L'assistant ou le projet</h3><p>Le contexte et les consignes vivent dans l'outil. Ce que tu as construit au module 2.</p></div>
      <div class="card sk fill-lav frag"><h3>3. La tâche automatique</h3><p>Ça tourne sans toi : tâche planifiée, ou un outil d'automatisation qui relie tes logiciels.</p></div>
    </div>
    <p class="takeaway frag"><b>La règle.</b> On monte d'un niveau seulement quand le niveau du dessous marche déjà bien.</p>''',
      seq=6, section="Module 5 · Trois niveaux",
      notes=note("2 minutes 30.",
                 "Ne pas vendre l'automatisation complète comme l'objectif : pour la plupart des tâches, le niveau 1 ou 2 suffit. Le niveau 3 avec des outils comme Make ou n8n relève d'une autre formation : le citer, ne pas le traiter."))

slide(f'''    <h2>Automatiser la production de contenu, <span class="mark mark--apricot">sans perdre la main</span></h2>
    <div class="cols mt" style="grid-template-columns:repeat(5,1fr);gap:16px">
      <div class="card sk fill-card frag"><h3 style="font-size:30px">Brief</h3><p class="small">Le sujet, la cible, le ton, les sources. Toi.</p></div>
      <div class="card sk fill-mint frag"><h3 style="font-size:30px">Brouillon</h3><p class="small">L'IA rédige, à partir d'un assistant ou d'un projet.</p></div>
      <div class="card sk fill-blush frag"><h3 style="font-size:30px">Relecture</h3><p class="small">Toi : faits, chiffres, ton, ce qui engage l'entreprise.</p></div>
      <div class="card sk fill-lav frag"><h3 style="font-size:30px">Déclinaisons</h3><p class="small">L'IA adapte : post, e-mail, résumé, image.</p></div>
      <div class="card sk fill-apricot frag"><h3 style="font-size:30px">Validation</h3><p class="small">Un humain publie. Jamais l'outil seul.</p></div>
    </div>
    <p class="takeaway frag"><b>Le point de contrôle.</b> Il est au milieu de la chaîne, pas à la fin : on relit le brouillon avant de le décliner, sinon on décline les erreurs.</p>''',
      seq=6, section="Module 5 · Contenu",
      notes=note("2 minutes 30.",
                 "Aucune promesse de temps gagné : le gain dépend de la tâche et de la qualité du brief. Insister sur la relecture avant déclinaison, c'est l'erreur la plus fréquente."))

slide(f'''    <h2>Anticiper : <span class="mark mark--lav">ce qui change, ce qui reste</span></h2>
    <div class="cols mt" style="align-items:start">
      <div class="card sk fill-blush frag"><h3>Ce qui change tous les trois mois</h3><ul class="dash"><li>Les noms des modèles et des offres</li><li>Les prix et les limites</li><li>Les menus et les fonctions</li></ul></div>
      <div class="card sk fill-mint frag"><h3>Ce qui reste</h3><ul class="dash"><li>Une demande claire, avec un exemple</li><li>Tes données, et ce que tu as le droit d'en faire</li><li>La relecture humaine de ce qui engage</li></ul></div>
    </div>
    <p class="takeaway frag"><b>Ta routine de veille.</b> Un quart d'heure par mois : les notes de version de ton outil principal, un essai d'une nouveauté sur une vraie tâche, et c'est tout.</p>''',
      seq=6, section="Module 5 · Anticiper",
      notes=note("2 minutes.",
                 "Ne pas faire de prédictions sur les prochains modèles. Le message : la méthode survit aux outils. Montrer où se trouvent les notes de version de ChatGPT, de Gemini et de Mistral."),
      )

consigne(5, 6, "ton workflow sur une page",
         "Décrire un workflow réel de ton travail, intégrer l'outil choisi aujourd'hui, et le faire tourner une fois.",
         "30 min",
         "Une fiche : déclencheur, entrées, étapes faites par l'IA, point de contrôle humain, sortie, outil. Plus un premier essai.",
         "Le point de contrôle humain est écrit, et le workflow a tourné au moins une fois.",
         ["Prends une tâche récurrente (ton projet du module 2 compte).",
          "Écris le <b>déclencheur</b> : quand ça démarre, qui le lance.",
          "Liste les <b>entrées</b> et les <b>étapes</b> que l'IA fait.",
          "Place le <b>point de contrôle humain</b> : qui relit quoi, avant quelle étape.",
          "Choisis le niveau (1, 2 ou 3) et l'outil. Fais-le tourner une fois."],
         [("Niveau 1", "une demande enregistrée dans l'outil du stagiaire"),
          ("Niveau 2", "le projet ou l'assistant construit au module 2"),
          ("Niveau 3", "tâche planifiée dans ChatGPT ou Vibe, requête planifiée dans Copilot"),
          ("Aucun outil autorisé", "fiche sur papier, essai en démonstration")],
         "Si ton workflow tient sur une page, il tiendra lundi. S'il faut un poster A0, il ne tiendra pas jusqu'à mercredi.",
         note("30 minutes : 15 pour la fiche, 15 pour l'essai.",
              "Piège 1 : vouloir automatiser la tâche la plus compliquée. Pousser vers une tâche fréquente et simple. Piège 2 : oublier le point de contrôle humain, ou le placer à la toute fin. Piège 3 : un workflow qui suppose un connecteur que l'offre du stagiaire n'a pas.",
              extra="Variantes : adaptations-apres-recueil.md, atelier 5."),
         timer_default=15, presets=(10, 15, 30))

debrief(5, 6, [("Le déclencheur", "Quand votre workflow démarre-t-il ?", "mint"),
               ("Le point de contrôle", "Qui relit quoi, et à quel moment ?", "blush"),
               ("Le premier essai", "Qu'est-ce qui a marché du premier coup ?", "apricot")],
        "Un workflow qui marche, c'est d'abord une tâche simple, faite souvent, avec un humain au bon endroit.",
        note("8 minutes.", "Chacun lit sa fiche en une minute. Garder du temps pour le plan d'action, qui en découle directement."))

quiz(5, 6, [
    ("Il faut viser tout de suite l'automatisation complète d'une tâche.", "Faux", "On monte d'un niveau quand le précédent marche déjà bien."),
    ("Dans une chaîne de contenu, on relit le brouillon avant de le décliner.", "Vrai", "Sinon on décline aussi les erreurs."),
    ("Les noms des modèles et des offres changent souvent.", "Vrai", "La méthode, elle, reste : demande claire, données maîtrisées, relecture humaine."),
    ("Un workflow sans point de contrôle humain est plus fiable.", "Faux", "Il est plus rapide, pas plus fiable."),
], note("5 minutes.", "Coller le lien dans SESSION.quiz.m5 avant la session (questions prêtes dans quiz.md)."))

# =====================================================================================
# CLÔTURE
# =====================================================================================
plan_rows = "".join(f'<tr><td class="n">{i}</td>' + "".join(f'<td class="edit" contenteditable="true" data-k="plan-{i}-{c}" data-ph="{ph}"></td>' for c, ph in [("u", "l'usage, en une phrase"), ("o", "l'outil"), ("q", "quel jour, sur quelle tâche"), ("s", "comment je saurai que ça marche")]) + "</tr>" for i in (1, 2, 3))
slide(f'''    <h2>Trois usages <span class="mark mark--apricot">pour la semaine prochaine</span></h2>
    <p class="howto">Chacun remplit le sien sur papier ou dans un document. On fait la première ligne ensemble.</p>
    <table class="plan"><thead><tr><th></th><th>L'usage</th><th>L'outil</th><th>Quand, sur quoi</th><th>Comment je saurai que ça marche</th></tr></thead><tbody>{plan_rows}</tbody></table>
    <p class="humour" style="margin-top:14px">Trois, pas dix. Dix usages la semaine prochaine, c'est zéro usage la semaine d'après.</p>''',
      seq=7, section="Clôture · Plan d'action",
      notes=note("12 minutes : 3 pour remplir la première ligne ensemble à l'écran, 9 de travail individuel.",
                 "Exiger un jour précis et une tâche réelle pour chaque usage. Le critère « comment je saurai que ça marche » ne doit pas être un chiffre promis : plutôt « je l'ai refait deux fois sans réécrire la demande ». Le tableau projeté sert d'exemple : chacun garde le sien."))

goals = ["Je situe les modèles actuels et je sais quand activer la réflexion", "J'ai construit un projet utile dans ChatGPT (ou mon outil)", "Je sais ce que Mistral et Vibe proposent, et pour quoi les utiliser",
         "Je compare des outils sur preuve, catégorie par catégorie", "J'ai un workflow décrit et testé, avec son contrôle humain"]
gl = "".join(f'<li class="frag"><button class="sk sk--thin" data-k="but-{i}" aria-pressed="false" aria-label="Cocher"><svg viewBox="0 0 34 34"><path d="M6 18 L14 26 L29 8"/></svg></button><span>{g}</span></li>' for i, g in enumerate(goals))
slide(f'''    <h2>Ce que tu sais <span class="mark mark--teal">faire maintenant</span></h2>
    {art("sommet-samoyede", "Le samoyède assis au sommet, il regarde la vue.", (90, 150, 420, 520))}
    <ul class="checks mt" style="max-width:1000px">{gl}</ul>''', seq=7, section="Clôture · Bilan",
      notes=note("5 minutes. Tour de table : chacun dit en une phrase ce qu'il refera lundi. On coche au fur et à mesure.",
                 "Ce tour de table sert aussi d'évaluation des acquis, avec les cinq quiz. Revenir sur les tâches citées dans le questionnaire : ont-elles toutes été travaillées ?"))

slide(f'''    <h2>Attestation et <span class="mark">ton avis sur la journée</span></h2>
    <div class="attest">
      <div class="card sk fill-apricot frag"><h3>{icon("file")}Ton attestation</h3><p>Remise par Les Clés de la Gestion à la fin de la session, avec la feuille d'émargement à signer.</p></div>
      <div class="card sk fill-mist frag"><h3>{icon("users")}Le questionnaire de satisfaction</h3><p>Deux minutes, avant de partir. Il sert à améliorer les prochaines sessions.</p><a class="golink golink--todo" data-var="satisfaction" href="#" target="_blank" rel="noopener">Questionnaire de satisfaction</a></div>
    </div>
    <p class="takeaway frag"><b>Après la session.</b> Les ressources de la journée (ce deck en PDF, les questions des quiz) te sont envoyées par l'organisme.</p>''',
      seq=7, section="Clôture · Attestation",
      notes=note("3 minutes.",
                 "Vérifier avec l'organisme, avant la session, qui remet l'attestation et sous quelle forme (papier ou PDF), et le lien du questionnaire de satisfaction (SESSION.satisfaction). Faire signer l'émargement de l'après-midi avant que les gens ne rangent leurs affaires."))

slide(f'''    <div class="lockup lockup--cg rise">
      {LOGO_SF}<span class="lockup-sep" aria-hidden="true"></span>{LOGO_CG}
    </div>
    <div class="cover-body">
      <h1 class="rise">Merci, et <span class="mark">bons essais</span></h1>
      <p class="lead rise">Trois usages, une semaine, un quart d'heure de veille par mois.</p>
      <p class="cover-meta rise">Marie Jolly · Summit Flow · contact@summitflow.fr · summitflow.fr</p>
    </div>
    {art("retour-samoyede", "Le samoyède redescend du sommet, content.", (0, 0, 1100, 418))}''', cls="slide--cover slide--full", section="Fin",
      notes=note("Projetée pendant les au revoir.", "Rien à ajouter à l'oral : les questions individuelles se prennent maintenant, pas pendant le bilan."))

# ---------- Assemblage : les slides prennent place dans la coquille src/index.html ----------
src_html = pathlib.Path("src/index.html").read_text(encoding="utf-8")
a = src_html.index('<main class="stage"')
a = src_html.index(">", a) + 1
b = src_html.index('  <div class="trail trail-global"')
out = src_html[:a] + "\n\n" + "\n".join(S) + "\n" + src_html[b:]
pathlib.Path("src/index.html").write_text(out, encoding="utf-8")
print(len(S), "slides")
