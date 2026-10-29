# Générateur des slides du jour 1 : écrit src/index.html à partir des contenus ci-dessous.
# Lancer depuis formation-j1/ : python3 src/generer_slides.py, puis python3 build.py
import pathlib
S = []
def slide(body, seq=None, section="", cls="", notes="", preview=False):
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

def tip(text, source, cls=""):
    return f'''<aside class="tip sk sk--thin {cls}"><svg class="bulb" viewBox="0 0 40 52" aria-hidden="true"><path d="M20 4c-9 0-15 7-15 15 0 6 3 9 6 13 1.5 2 2 4 2 6h14c0-2 .5-4 2-6 3-4 6-7 6-13 0-8-6-15-15-15z" fill="#FFF3C4" stroke="#1F2A2E" stroke-width="2.5" stroke-linejoin="round"/><path d="M14 42h12M15 47h10" stroke="#1F2A2E" stroke-width="2.5" stroke-linecap="round"/><path d="M20 20v12M16 24l4 4 4-4" stroke="#0B4F5C" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg><div><p class="tip-txt">{text}</p><p class="tip-src">Source : {source}</p></div></aside>'''

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
BOLT = '''<svg class="illu ico-xl" viewBox="0 0 120 120" aria-hidden="true"><path data-d="0.6" d="M68 10 L30 66 H58 L48 110 L92 48 H64 Z" fill="#FFF3C4"/><path data-d="0.1" class="ink" d="M68 10 L30 66 H58 L48 110 L92 48 H64 Z" filter="url(#rough)"/></svg>'''
PLUG = '''<svg class="illu ico-xl" viewBox="0 0 120 120" aria-hidden="true"><rect data-d="0.6" x="28" y="40" width="64" height="50" rx="14" fill="#DCEEFA"/><rect data-d="0.1" x="28" y="40" width="64" height="50" rx="14" class="ink" filter="url(#rough)"/><path data-d="0.4" class="ink" d="M46 40 V18 M74 40 V18 M60 90 V112"/></svg>'''
BADGE = '''<svg class="illu ico-xl" viewBox="0 0 120 120" aria-hidden="true"><rect data-d="0.6" x="22" y="28" width="76" height="66" rx="10" fill="#FCE4E8"/><rect data-d="0.1" x="22" y="28" width="76" height="66" rx="10" class="ink" filter="url(#rough)"/><circle data-d="0.4" cx="48" cy="56" r="10" class="ink"/><path data-d="0.5" class="ink" d="M36 80 C 40 70, 56 70, 60 80 M70 52 H88 M70 64 H84"/><path data-d="0.3" class="ink" d="M52 28 V16 H68 V28"/></svg>'''
MULTI = '''<svg class="illu ico-xl" viewBox="0 0 140 120" aria-hidden="true"><rect data-d="0.6" x="12" y="50" width="116" height="40" rx="14" fill="#D6F1E6"/><rect data-d="0.1" x="12" y="50" width="116" height="40" rx="14" class="ink" filter="url(#rough)"/><circle data-d="0.4" cx="38" cy="70" r="7" class="ink"/><circle data-d="0.45" cx="70" cy="70" r="7" class="ink"/><circle data-d="0.5" cx="102" cy="70" r="7" class="ink"/><path data-d="0.3" class="ink" d="M128 70 C 140 70, 138 30, 120 26"/></svg>'''

def logic(eyebrow, title, mk, definition, ex, color, notes):
    cards = "".join(f'''<div class="ex sk {color} frag"><p class="who">{w}</p><p>{d}</p>{s}</div>''' for w, d, s in ex)
    slide(f'''    <p class="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    <p class="lead rise" style="margin-top:18px">{definition}</p>
    <div class="cols--3 grow" style="display:grid;margin-top:30px">{cards}</div>''', seq=2, section="9h45 · Assistant, automatisation, agent", notes=notes)


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

# ---------- 9h00 Point de départ ----------
slide(f'''    <span class="wordmark wordmark--lg rise">{icon("logo")}SUMMIT FLOW</span>
    <div class="grow stack center-y">
      <p class="eyebrow rise">Automatisation et IA agentique · Maison Lagarrigue · Jour 1</p>
      <h1 class="rise">Assistant, automatisation, agent : savoir quoi utiliser, <span class="mark">et quand</span></h1>
      <p class="lead rise">Comprendre, mesurer et choisir.</p>
      <p class="cover-meta small rise">17 novembre 2026 · 9h00 à 17h00 · Marie Jolly, Summit Flow</p>
    </div>
    {COVER_RIDGE}''', cls="slide--cover slide--full", section="9h00 · Point de départ",
 notes="Accueil. Le sentier en bas à droite : on monte par étapes, on ne grimpe pas tout d'un coup.")

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

slide('''    <p class="eyebrow">Aujourd'hui</p>
    <h2>Le programme du <span class="mark mark--lemon">jour 1</span></h2>
    <ol class="agenda mt">
      <li class="rise"><span class="h">9h00</span>Point de départ et repères pour tous</li>
      <li class="rise"><span class="h">9h45</span>Assistant, automatisation, agent</li>
      <li class="pause rise"><span class="h">10h45</span>Pause</li>
      <li class="rise"><span class="h">11h00</span>Quand utiliser quoi</li>
      <li class="pause rise"><span class="h">12h30</span>Déjeuner</li>
      <li class="rise"><span class="h">13h30</span>Démonstrations, puis à vous</li>
      <li class="pause rise"><span class="h">15h00</span>Pause</li>
      <li class="rise"><span class="h">15h15</span>Limites, investissement, choix d'un outil</li>
      <li class="rise"><span class="h">16h00</span>Garde-fous essentiels</li>
      <li class="rise"><span class="h">16h30</span>Lancement de l'intersession</li>
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
      <div class="stack">
        <div class="frag frag--pop">{timer(15, (10, 15, 20))}</div>
        {tip("Seuls 39 % des utilisateurs de l'IA au travail disent avoir été formés par leur entreprise.", "Microsoft et LinkedIn, Work Trend Index, mai 2024", "frag")}
      </div>
    </div>''', seq=1, section="9h00 · Point de départ",
 notes="Flèche droite pour faire apparaître les questions une par une. Noter au tableau ce qui a coincé : on s'en sert au moment des limites et des doutes.")

slide(f'''    <p class="eyebrow">Retour sur mars</p>
    <h2>La journée de mars, <span class="mark mark--sky">ce qui reste</span></h2>
    <div class="cols mt" style="align-items:start">
      <div class="card sk fill-sky rise"><h3>Ce qui a été posé</h3><ul>
        <li>Ce qu'est un assistant conversationnel</li>
        <li>Une quinzaine de situations repérées ensemble, pôle par pôle</li>
        <li>Des premiers temps estimés : jusqu'à 4 jours par mois pour certaines tâches</li></ul></div>
      <div class="card sk fill-lemon rise"><h3>Ce que vous avez demandé</h3><ul>
        <li>Moins de vocabulaire technique</li>
        <li>Plus de pratique sur vos outils : Outlook, Excel</li>
        <li class="frag">Alors aujourd'hui, chaque notion part d'une de vos situations</li></ul></div>
    </div>''', seq=1, section="9h00 · Point de départ",
 notes="Faire raconter par ceux qui étaient là, pour ceux qui n'y étaient pas. La colonne de droite reprend les retours d'évaluation de mars : le dire, c'est montrer qu'on les a écoutés.")

slide(f'''    <p class="eyebrow">Retour sur mars</p>
    <h2>Vos situations, <span class="mark">celles de mars</span></h2>
    <div class="cols--4" style="display:grid;margin-top:30px;align-items:start">
      <div class="card sk fill-sky rise"><h3>{icon("cart")}Commerce</h3><ul><li>Commissions des vendeurs itinérants <span class="hand t-est">4 h</span></li><li>Contrôle des études de prix, vente et reprise</li><li>Estimation des reprises</li><li>Ciblage de clients pour les démonstrations</li><li>Trouver un produit chez un fournisseur</li></ul></div>
      <div class="card sk fill-lemon rise"><h3>{icon("ledger")}RH et compta</h3><ul><li>Variables de salaire <span class="hand t-est">1,5 à 2 j</span></li><li>Vérification des paiements clients pour les commissions</li><li>Trésorerie quotidienne, factures reçues par e-mail</li><li>Saisie des pointages, du papier au logiciel</li></ul></div>
      <div class="card sk fill-mint rise"><h3>{icon("mega")}Communication</h3><ul><li>Planning de communication <span class="hand t-est">4 j par mois</span></li><li>Optimisation des bases de données pour la communication</li></ul></div>
      <div class="card sk fill-teal rise"><h3>{icon("file")}Direction</h3><ul><li>Création de tableaux de bord</li><li>Analyse des tableaux de bord</li><li>Présentations PowerPoint</li></ul></div>
    </div>
    <p class="small" style="margin-top:20px">Temps estimés par l'équipe en mars, à préciser dans la grille d'audit.</p>''', seq=1, section="9h00 · Point de départ",
 notes="C'est le fil rouge de la journée : chaque exemple viendra de cette liste. Demander ce qui a bougé depuis mars.")

pi = "".join(f'<div class="postit fill-{c}" contenteditable="true" data-k="mars-{i}" data-ph="{ph}"></div>' for i, (c, ph) in enumerate([("sky", "j'ai retenu…"), ("lemon", "j'utilise…"), ("mint", "j'ai retenu…"), ("blush", "ça a coincé…"), ("lemon", "j'utilise…"), ("sky", "ça a coincé…"), ("mint", "j'ai retenu…"), ("blush", "j'aimerais…")]))
slide(f'''    <p class="eyebrow">Retour sur mars</p>
    <h2>Ce que vous en avez <span class="mark mark--lemon">retenu</span></h2>
    <div class="board">{pi}</div>
    <p class="small" style="margin-top:22px">On écrit en direct ce que dit la salle. On y revient en fin de journée.</p>''',
 seq=1, section="9h00 · Point de départ",
 notes="Clique sur un post-it pour écrire. Les post-it gardent leur texte dans ce navigateur.")

tf = [("L'IA générative va chercher la bonne réponse dans une base de données.", "Faux", "Elle prédit la suite de texte la plus probable."),
      ("Elle peut inventer une source qui n'existe pas.", "Vrai", "C'est ce qu'on appelle une hallucination."),
      ("Plus la consigne est précise, plus la réponse est utile.", "Vrai", "Le contexte fait souvent la différence."),
      ("Ce que je tape peut servir à améliorer le modèle.", "Selon l'outil", "Ça dépend de l'outil, de la licence et des réglages.")]
rows = "".join(f'''<div class="tf sk sk--thin"><p>{q}</p><div class="frag tf-a"><span class="mark mark--{'teal' if a=='Vrai' else 'blush' if a=='Faux' else 'lemon'} hand">{a}</span><span class="small">{w}</span></div></div>''' for q, a, w in tf)
slide(f'''    <p class="eyebrow">Rappel express</p>
    <h2>Vrai ou faux ?</h2>
    <div class="stack mt">{rows}</div>''', seq=1, section="9h00 · Point de départ",
 notes="Vote à main levée, puis flèche droite pour révéler. Sert de remise à niveau sans en avoir l'air.")

slide(f'''    <p class="eyebrow">Rappel commun</p>
    <h2>Une IA générative, <span class="mark mark--sky">comment ça marche</span></h2>
    <div class="cols grow mt">
      {shot("Infographie Clarity « Comment fonctionne l'IA » (comment-fonctionne-ia.png)", "Infographie à insérer")}
      {shot("Infographie Clarity « Comment l'IA apprend » (comment-ia-apprend.png)", "Infographie à insérer")}
    </div>''', seq=1, section="9h00 · Point de départ",
 notes="Rester sur l'essentiel : elle prédit la suite la plus probable, elle ne cherche pas la vérité.")

slide(f'''    <p class="eyebrow">Rappel commun</p>
    <h2>L'IA est déjà dans <span class="mark">vos outils</span></h2>
    <p class="lead rise" style="margin-top:24px">Ce n'est plus un site à part : elle arrive dans ce que vous ouvrez chaque matin.</p>
    <div class="logo-row mt rise">
      {logo("Microsoft 365 Copilot")}{logo("Outlook")}{logo("Excel")}{logo("Word")}{logo("Teams")}
    </div>
    <div class="cols mt" style="align-items:start">
      {tip("40 % des TPE et PME déclarent utiliser au moins une solution d'IA en 2026, contre 13 % en 2024. Chez les PME, c'est 53 %.", "Baromètre France Num 2026, DGE et Crédoc", "frag")}
      {tip("L'usage le plus répandu : générer du texte, de la voix ou des images (34 % des TPE et PME), devant les chatbots et assistants (24 %).", "Baromètre France Num 2026, DGE et Crédoc", "frag")}
    </div>''', seq=1, section="9h00 · Point de départ",
 notes="Ce qui est accessible chez vous dépend du niveau de licence : on le vérifie cet après-midi.")


# ---------- 9h45 Trois logiques ----------
S945 = "9h45 · Assistant, automatisation, agent"
slide('''    <p class="eyebrow">Trois logiques différentes</p>
    <div class="grow stack-lg center-y">
      <p class="idea">L'assistant <span class="mark mark--sky frag">répond</span>. L'automatisation <span class="mark mark--lemon frag">exécute</span>. L'agent <span class="mark frag">poursuit un objectif</span>.</p>
      <p class="lead frag">Le bon choix dépend de la tâche, pas de l'outil à la mode.</p>
    </div>''', seq=2, section=S945, notes="Faire apparaître les trois verbes un par un. Demander au groupe de deviner le suivant.")

slide(f'''    <p class="eyebrow">1. L'automatisation</p>
    <h2>Tout part d'un <span class="mark mark--lemon">déclencheur</span></h2>
    <p class="lead rise" style="margin-top:18px">Un déclencheur (le « trigger »), puis toujours la même suite d'actions. Deux familles :</p>
    <div class="cols mt" style="align-items:start">
      <div class="card sk fill-sky frag" style="display:grid;grid-template-columns:130px 1fr;gap:24px;align-items:center">{CLOCK}<div><h3>Le temps</h3><p>Chaque matin, le tableau de trésorerie se met à jour. Chaque fin de mois, les variables de salaire sont préparées.</p></div></div>
      <div class="card sk fill-lemon frag" style="display:grid;grid-template-columns:130px 1fr;gap:24px;align-items:center">{BOLT}<div><h3>Un événement</h3><p>Une facture arrive par e-mail, un pointage est saisi, une demande de démonstration tombe.</p></div></div>
    </div>
    {tip("Anthropic appelle « workflow » un système où le modèle et les outils suivent des chemins définis à l'avance. C'est l'esprit de l'automatisation.", "Anthropic, Building effective agents, 19 décembre 2024", "frag mt")}''',
 seq=2, section=S945, notes="Faire trouver un exemple de chaque famille dans leur quotidien.")

slide('''    <p class="eyebrow">Pour les curieux · 1. L'automatisation</p>
    <h2>Le webhook, <span class="mark mark--lemon">c'est la sonnette</span></h2>
    <figure class="schema" role="img" aria-label="Schéma : un événement se produit dans un logiciel, par exemple un courriel arrive. Le logiciel sonne à une adresse web, le webhook, en envoyant un appel HTTP. Le scénario démarre et enchaîne ses actions."><!-- schema:webhook --></figure>''',
 seq=2, cls="slide--schema", section=S945,
 notes="Le webhook : une adresse web qui attend qu'on sonne. Quand l'événement arrive, le logiciel envoie un message à cette adresse, et le scénario se réveille. Pas besoin de vérifier toutes les cinq minutes.")

logic("1. L'automatisation", 'Elle <span class="mark mark--lemon">exécute</span>, toujours pareil', "", "Aucune réflexion, et c'est sa force : même entrée, même résultat.",
 [("Un scénario Make", "Un événement déclenche une série d'actions, montée visuellement.", shot("Capture d'un scénario Make")),
  ("Un script Apps Script", "Une petite routine qui tourne seule dans un tableur.", shot("Capture du script Apps Script et de son résultat")),
  ("Chez vous", "L'équivalent dans Microsoft 365 se monte avec les outils de l'environnement, selon les licences.", "")],
 "fill-lemon", "Make et Apps Script servent d'illustration : la formation reste sur l'environnement Microsoft de l'entreprise.")

comp = [("Instructions", "le super prompt : rôle, règles, ton", "lemon"), ("Base de connaissances", "la bibliothèque : documents, procédures", "sky"), ("Outils et connecteurs", "les bras et les jambes : lire, écrire, envoyer", "mint"),
        ("Compétences", "les skills : des savoir-faire prêts à l'emploi", "lemon"), ("Mémoire", "ce qu'il retient d'une fois sur l'autre", "sky"), ("Boucle", "il essaie, vérifie, recommence : gérée par l'outil", "mint")]
cells = [f'<div class="comp sk fill-{c} frag"><p class="hand comp-t">{t}</p><p>{d}</p></div>' for t, d, c in comp]
slide(f'''    <p class="eyebrow">2. L'assistant et l'agent</p>
    <h2>Mêmes pièces, <span class="mark mark--blush">même anatomie</span></h2>
    <div class="anat">
      <div class="anat-col">{"".join(cells[:3])}</div>
      <div class="anat-mid">{BRAIN}<p class="hand" style="font-size:36px;color:var(--teal)">Le modèle</p><p class="small">le cerveau</p><span class="live" style="margin-top:14px">démo en direct</span></div>
      <div class="anat-col">{"".join(cells[3:])}</div>
    </div>''', seq=2, section=S945,
 notes="Démontrer en direct dans un assistant puis dans un agent : faire apparaître chaque pièce au moment où tu la montres à l'écran.")

slide(f'''    <p class="eyebrow">2. L'assistant et l'agent</p>
    <h2>Les bras et les jambes : <span class="mark">outils, connecteurs, plugins</span></h2>
    <div class="cols--3 grow" style="display:grid;margin-top:36px;align-items:start">
      <div class="card sk fill-mint frag"><h3>Le connecteur</h3><p>L'accès à une application : Outlook, SharePoint, Teams. Sans lui, l'IA ne voit rien de vos outils.</p></div>
      <div class="card sk fill-sky frag"><h3>L'outil</h3><p>Une action précise qu'elle peut faire : lire un courriel, créer un fichier, chercher une information.</p></div>
      <div class="card sk fill-lemon frag"><h3>Le plugin</h3><p>Un paquet prêt à installer, qui regroupe un ou plusieurs outils pour un usage donné.</p></div>
    </div>
    <p class="small frag">Les mots changent d'un éditeur à l'autre. Ce qui compte : à quoi l'IA a accès, et ce qu'elle a le droit de faire.</p>''',
 seq=2, section=S945, notes="Montrer où se trouvent les connecteurs dans Copilot. Insister sur les droits : un connecteur ouvre une porte.")

slide(f'''    <p class="eyebrow">2. L'assistant et l'agent</p>
    <h2>Les compétences, <span class="mark mark--lemon">des fiches recettes</span></h2>
    <div class="cols mt" style="align-items:start">
      <div class="stack">
        <p class="lead rise">Une compétence (« skill ») regroupe une façon de faire, des consignes et parfois des fichiers modèles.</p>
        <p class="rise">L'IA ne la charge que quand la tâche le demande : elle reste légère le reste du temps.</p>
      </div>
      <div class="card sk fill-lemon frag"><h3>Exemple</h3><ul><li>Rédiger un compte rendu au format de l'entreprise</li><li>Avec le modèle de document</li><li>Et les règles de nommage du fichier</li></ul></div>
    </div>''', seq=2, section=S945,
 notes="Le parallèle : un nouvel arrivant à qui on donne la fiche de poste (instructions), la documentation (connaissances), les accès (connecteurs) et des fiches recettes (compétences).")

same = "".join(f'<span class="pill sk sk--thin">{t}</span>' for t in ["Modèle", "Instructions", "Connaissances", "Outils", "Compétences", "Mémoire", "Boucle"])
slide(f'''    <p class="eyebrow">2. L'assistant et l'agent</p>
    <h2>Une seule vraie différence : <span class="mark mark--blush">le déclencheur</span></h2>
    <div class="cols mt" style="align-items:stretch">
      <div class="card sk fill-sky rise"><h3>L'assistant</h3><div class="pills">{same}</div><p class="trig frag"><b class="hand">Déclencheur</b>Toi, à chaque question.</p></div>
      <div class="card sk fill-mint rise"><h3>L'agent</h3><div class="pills">{same}</div><p class="trig frag"><b class="hand">Déclencheur</b>Un objectif, un événement ou un horaire. Il enchaîne seul.</p></div>
    </div>''', seq=2, section=S945, notes="Les pièces sont les mêmes. Ce qui change, c'est qui appuie sur le bouton, et combien d'étapes il enchaîne sans toi.")

slide(f'''    <p class="eyebrow">Ce que je constate sur le terrain : l'usage n°1</p>
    <h2>Un <span class="mark mark--sky">super moteur de recherche</span></h2>
    <p class="lead rise" style="margin-top:18px">On pose une question, on attend une réponse. On s'en sert en mode assistant, mais on oublie de l'équiper.</p>
    <div class="cols--3" style="display:grid;margin-top:34px;align-items:start">
      <div class="card sk fill-lemon frag"><h3>On oublie le contexte</h3><p>Qui je suis, pour qui, avec quelles règles. Sans ça, la réponse reste générique.</p></div>
      <div class="card sk fill-sky frag"><h3>On oublie la connexion</h3><p>Elle ne voit ni Outlook, ni Excel, ni vos documents. On recopie tout à la main.</p></div>
      <div class="card sk fill-mint frag"><h3>On oublie la mémoire</h3><p>Chaque fois, on repart de zéro et on réexplique.</p></div>
    </div>
    <p class="idea frag" style="font-size:50px;margin-top:36px">Résultat : on passe parfois <span class="mark mark--blush">plus de temps</span> qu'à faire la tâche soi-même.</p>''', seq=2, section=S945,
 notes="Faire réagir : qui s'est déjà dit que ça aurait été plus rapide de le faire soi-même ? La slide suivante montre pourquoi : il manque des pièces. Pour appuyer : 24 % des TPE et PME utilisent l'IA pour des chatbots, assistants ou outils de recherche d'informations (Baromètre France Num 2026).")

def yes(t): return f'<td class="ok">{t}</td>'
def no(t): return f'<td class="ko">{t}</td>'
slide(f'''    <p class="eyebrow">2. L'assistant et l'agent</p>
    <h2>Un assistant <span class="mark mark--lemon">complet ou dégradé</span></h2>
    <table class="cmp mt">
      <thead><tr><th></th><th>IA « toute nue », mémoire désactivée</th><th>Chatbot de site, sans mémoire</th><th>Projet Claude, assistant Copilot</th></tr></thead>
      <tbody>
        <tr class="frag"><td class="row">Instructions</td>{no("seulement ta question")}{yes("configurées")}{yes("configurées")}</tr>
        <tr class="frag"><td class="row">Connaissances</td>{no("aucune de chez vous")}{yes("le contenu du site")}{yes("tes documents")}</tr>
        <tr class="frag"><td class="row">Mémoire</td>{no("repart de zéro")}{no("repart de zéro")}{yes("selon les réglages")}</tr>
        <tr class="frag"><td class="row">Outils</td><td class="mid">selon l'outil</td><td class="mid">selon la configuration</td><td class="mid">selon la licence</td></tr>
      </tbody>
    </table>''', seq=2, section=S945,
 notes="C'est toujours un assistant, mais avec moins de pièces. D'où des réponses plus génériques : ce n'est pas l'IA qui est moins bonne, c'est l'équipement.")

slide(f'''    <figure class="infographic grow">
      <img src="images/harnais-bocal.png" alt="Schéma Modèle, inférence, harnais. 1. Le modèle : un cerveau dans un bocal, il sait plein de choses mais ne peut rien faire seul, sans outils ni consignes. 2. L'inférence : ton prompt va au modèle qui produit une réponse, c'est le moment où il travaille, facturé au token. 3. Le harnais : autour du modèle, des outils, une mémoire, des règles et instructions, une boucle et une base de connaissances. Agent IA égale modèle plus harnais ; le harnais fait souvent la différence en production.">
    </figure>''',
 seq=2, cls="slide--figure", section=S945,
 notes="Synthèse après la démo : le bocal, c'est le modèle seul. Tout ce qu'on vient de montrer, c'est le harnais.")

slide(f'''    <p class="eyebrow">Ce qu'en disent les éditeurs</p>
    <h2>Trois définitions, <span class="mark mark--sky">trois sources</span></h2>
    <div class="cols--3 grow" style="display:grid;margin-top:36px;align-items:start">
      <blockquote class="quote sk fill-lemon frag"><p>« Des systèmes où le modèle et les outils sont orchestrés selon des chemins définis à l'avance. »</p><cite>Anthropic, à propos des workflows, déc. 2024</cite></blockquote>
      <blockquote class="quote sk fill-mint frag"><p>« Des systèmes où le modèle dirige lui-même ses étapes et l'usage de ses outils. »</p><cite>Anthropic, à propos des agents, déc. 2024</cite></blockquote>
      <blockquote class="quote sk fill-sky frag"><p>« Un assistant IA qui suit vos instructions, s'appuie sur les sources de connaissances connectées et utilise des outils pour agir. »</p><cite>Microsoft, à propos des agents Copilot Studio</cite></blockquote>
    </div>
    {tip("Microsoft parle lui aussi de « harness », comme dans le schéma du bocal : chaque agent Copilot Studio tourne sur l'un de trois harnais.", "Microsoft Learn, Copilot Studio, Agents overview", "frag")}
    <p class="small">Traductions libres. Sources : Anthropic, Building effective agents, 19 décembre 2024 ; Microsoft Learn, Overview, Microsoft Copilot Studio.</p>''',
 seq=2, section=S945, notes="La définition de Microsoft reprend mot pour mot les pièces de l'anatomie : instructions, connaissances, outils.")

slide('''    <p class="eyebrow">Trois logiques différentes</p>
    <h2>Qui garde la main ?</h2>
    <figure class="schema" role="img" aria-label="Schéma en trois colonnes. Assistant : tu poses une question, l'IA propose une réponse, tu décides. Automatisation : un courriel arrive, toujours les mêmes actions, un résultat sans réflexion. Agent : un objectif, l'IA choisit ses étapes en boucle, elle agit dans ton cadre."><!-- schema:trois-logiques --></figure>''',
 seq=2, cls="slide--schema", section=S945, notes="Récapitulatif des trois logiques avant les exemples.")

logic("L'assistant en vrai", 'Il <span class="mark mark--sky">répond</span>, tu gardes la main', "", "Tu lui poses une question ou tu lui confies un texte. Il propose, tu décides.",
 [("Chatbot du site Summit Flow", "Assistant de type chatbot : il répond aux visiteurs à partir du contenu du site.", '<span class="live">démo en direct</span>'),
  ("Un projet Claude", "Des consignes et des documents de référence, pour des réponses dans ton cadre.", shot("Capture d'un projet Claude (consignes et documents)")),
  ("Copilot dans Microsoft 365", "Le même principe dans Outlook, Word ou Teams.", shot("Capture de Copilot ou d'un agent Copilot avec consignes"))],
 "fill-sky", "Le chatbot du site se montre en direct, pas de capture.")

logic("L'agent en vrai", 'Il <span class="mark">poursuit un objectif</span>, dans ton cadre', "", "Tu lui donnes un objectif. Il choisit ses étapes, utilise des outils, et s'arrête là où tu l'as décidé.",
 [("Super agent Lindy", "Un agent qui enchaîne plusieurs tâches depuis le téléphone.", shot("Captures d'écran du téléphone (Lindy)")),
  ("Un agent Claude", "Le modèle avec ses outils, sa mémoire et ses règles.", shot("Capture d'un agent Claude")),
  ("Un agent Copilot", "Un agent construit dans l'environnement Microsoft.", shot("Capture d'un agent Copilot"))],
 "fill-mint", "Relier à l'anatomie : mêmes pièces que l'assistant, mais c'est l'objectif qui le lance.")

slide(f'''    <p class="eyebrow">Le marché bouge vite</p>
    <div class="grow stack-lg center-y">
      <p class="idea">Les agents, <span class="mark">la compétence la plus demandée</span> de l'année.</p>
      {tip("Sur Malt, la demande de compétences liées aux agents IA a été multipliée par 60 par rapport à 2024. Les projets n8n, outil d'automatisation, ont été multipliés par 14 en un an.", "Malt Tech Trends 2026", "frag")}
    </div>''', seq=2, section=S945, notes="Ancrer dans le réel : les entreprises passent de l'essai à la mise en production.")

quiz = [("Préparer une présentation PowerPoint à partir de mes notes", "assistant", "sky"),
        ("Chaque facture reçue par e-mail s'ajoute au tableau de trésorerie", "automatisation", "lemon"),
        ("Chercher un produit chez plusieurs fournisseurs, comparer et me proposer le meilleur", "agent", "mint"),
        ("Analyser le tableau de bord du mois et en tirer trois points clés", "assistant", "sky")]
items = "".join(f'''<div class="ex sk" style="flex-direction:row;align-items:center;justify-content:space-between;gap:24px"><p style="font-size:30px">{q}</p><span class="mark mark--{c if c!='mint' else 'teal'} frag hand" style="font-size:34px;white-space:nowrap">{a}</span></div>''' for q, a, c in quiz)
slide(f'''    <p class="eyebrow">À vous de jouer</p>
    <h2>Assistant, automatisation ou agent ?</h2>
    <div class="stack mt">{items}</div>''', seq=2, section="9h45 · Assistant, automatisation, agent",
 notes="Les quatre situations viennent de la liste de mars. Vote à main levée, puis flèche droite. Les réponses sont des propositions : un débat est bienvenu, il prépare la grille de 11h.")

slide(f'''    <div class="grow center-y">
      <p class="eyebrow">10h45</p>
      <h2 style="font-size:120px">Pause</h2>
      <p class="lead">On reprend à 11h00 avec la grille de décision.</p>
      <div class="mt">{timer(15, (10, 15))}</div>
    </div>
    {CUP}''', cls="slide--full", section="Pause",
 notes="")

# ---------- 11h00 Quand utiliser quoi ----------
slide(f'''    <p class="eyebrow">Quand utiliser quoi</p>
    <h2>La grille en quatre questions</h2>
    <figure class="schema" role="img" aria-label="Arbre de décision. 1. La tâche revient-elle souvent ? Non : geste manuel ou assistant au cas par cas. 2. Les règles sont-elles stables ? Non : clarifier la règle avant d'outiller. 3. Faut-il interpréter un texte ou décider ? Non : automatisation. Oui : agent, ou assistant et automatisation. 4. Une erreur coûte cher ? Un humain valide avant que ça parte."><!-- schema:grille-decision --></figure>''',
 seq=3, cls="slide--schema", section="11h00 · Quand utiliser quoi",
 notes="La question 4 s'applique à toutes les branches : elle ne choisit pas l'outil, elle fixe le niveau de contrôle humain.")

qs = [("1", "La tâche revient-elle souvent ?"), ("2", "Les règles sont-elles stables ?"), ("3", "Faut-il interpréter un texte ou décider ?"), ("4", "Une erreur coûte-t-elle cher ?")]
qhtml = "".join(f'''<div class="q" data-q="{n}"><span>{n}. {t}</span><div class="yn"><button class="sk sk--thin" value="oui" aria-pressed="false">oui</button><button class="sk sk--thin no" value="non" aria-pressed="false">non</button></div></div>''' for n, t in qs)
slide(f'''    <p class="eyebrow">On la teste ensemble</p>
    <h2>Une situation, <span class="mark mark--lemon">quatre réponses</span></h2>
    <div class="decider">
      <div>{qhtml}<button class="reset sk sk--thin" style="--radius:12px;margin-top:20px;padding:6px 16px;font-family:var(--font-hand);font-size:24px">Recommencer</button>
      {tip("71 % des entreprises qui n'utilisent pas l'IA disent ne pas y voir d'usage. La grille aide à le vérifier.", "Insee Première n° 2120, juillet 2026", "frag mt")}</div>
      <div class="verdict-box sk" aria-live="polite"><p class="lbl">La grille propose</p><p class="out"></p><p class="why"></p><p class="guard">Et quelle que soit la réponse : un humain valide avant que ça parte.</p></div>
    </div>''', seq=3, section="11h00 · Quand utiliser quoi",
 notes="Prendre une situation proposée par la salle, cliquer oui ou non avec le groupe. La réponse s'affiche à droite. Recommencer pour une deuxième situation.")

slide(f'''    <div class="stack">
      <div class="meta">
        <span class="tag sk">{icon("users")}En sous-groupes</span>
        <span class="tag sk">{icon("file")}Grille en quatre questions</span>
      </div>
      <h2>Atelier : classer <span class="mark">vos situations</span></h2>
    </div>
    <div class="cols cols--1-2 grow" style="margin-top:40px;align-items:start;">
      <ol class="steps">
        <li class="frag"><strong>Prends</strong> une situation de ton pôle.</li>
        <li class="frag"><strong>Passe-la</strong> dans les quatre questions.</li>
        <li class="frag"><strong>Classe-la</strong> : assistant, automatisation, agent, ou pas d'outil.</li>
      </ol>
      <div class="stack">
        {timer(20, (15, 20, 30))}
        <div class="alert sk" role="note">{icon("alert")}<div><p class="alert-title">Vigilance données</p><p>Aucune donnée réelle de l'entreprise dans un outil d'IA grand public. On décrit la tâche, pas son contenu.</p></div></div>
      </div>
    </div>''', seq=3, section="11h00 · Quand utiliser quoi",
 notes="Les quatre questions : la tâche est-elle répétitive, les règles sont-elles stables, faut-il interpréter un texte ou décider, que se passe-t-il en cas d'erreur.")

def chips(pole, items):
    return "".join(f'<button class="chip sk sk--thin" data-k="{pole}-{i}"><span>{t}</span><span class="verdict">à classer</span></button>' for i, t in enumerate(items))
slide(f'''    <div class="stack">
      <span class="tag tag--soft sk">{icon("search")}Repérées en mars, à confirmer par la grille d'audit</span>
      <h2>Vos situations, classées <span class="mark mark--sky">en direct</span></h2>
    </div>
    <div class="situations">
      <div class="pole"><h3>{icon("cart")}Commerce</h3>{chips("com", ["Commissions des vendeurs itinérants", "Contrôle des études de prix", "Estimation des reprises", "Ciblage pour les démonstrations", "Produit chez un fournisseur"])}</div>
      <div class="pole"><h3>{icon("ledger")}RH et compta</h3>{chips("rh", ["Variables de salaire", "Vérification des paiements clients", "Trésorerie quotidienne", "Saisie des pointages"])}</div>
      <div class="pole"><h3>{icon("mega")}Communication et direction</h3>{chips("cm", ["Planning de communication", "Bases de données pour la communication", "Création de tableaux de bord", "Analyse des tableaux de bord", "Présentations PowerPoint"])}</div>
    </div>
    <div class="legend"><span><i style="background:var(--sky)"></i>assistant</span><span><i style="background:var(--lemon)"></i>automatisation</span><span><i style="background:var(--mint)"></i>agent</span><span><i style="background:var(--blush)"></i>pas d'outil</span><span>· un clic pour changer</span></div>''',
 seq=3, section="11h00 · Quand utiliser quoi",
 notes="Mise en commun : chaque sous-groupe annonce son verdict, clique sur la carte pour la colorer. Les désaccords sont les meilleurs moments : les noter pour la grille d'audit.")

slide(f'''    <div class="grow center-y">
      <p class="eyebrow">12h30</p>
      <h2 style="font-size:120px">Déjeuner</h2>
      <p class="lead">Reprise à 13h30 : on passe aux démonstrations.</p>
    </div>
    {CUP}''', cls="slide--full", section="Déjeuner")

# ---------- 13h30 Démonstrations ----------
S1330 = "13h30 · Démonstrations commentées"
slide(f'''    <p class="eyebrow">Pour les curieux · avant les démos</p>
    <h2>Comment les outils <span class="mark mark--sky">se parlent</span></h2>
    <div class="cols--3" style="display:grid;margin-top:26px;align-items:start">
      <div class="card sk fill-sky frag conn">{PLUG}<h3>API</h3><p>La prise. On demande au logiciel une chose précise : lire un courriel, créer une ligne.</p></div>
      <div class="card sk fill-blush frag conn">{BADGE}<h3>OAuth</h3><p>Le badge. Tu autorises l'accès sans donner ton mot de passe, et tu peux le retirer.</p></div>
      <div class="card sk fill-mint frag conn">{MULTI}<h3>MCP</h3><p>La multiprise de l'ère agentique : une connexion qui regroupe plusieurs capacités, prêtes pour l'agent.</p></div>
    </div>
    {tip("MCP a été publié par Anthropic en novembre 2024 comme un standard pour connecter les assistants IA aux systèmes où vivent les données, en remplaçant les intégrations au cas par cas par un seul protocole.", "Anthropic, Introducing the Model Context Protocol, 25 novembre 2024", "frag mt")}''',
 seq=4, section=S1330, notes="Ne pas entrer dans le détail technique. L'image à retenir : avant, une prise par fonction ; avec MCP, une multiprise par logiciel.")

slide('''    <p class="eyebrow">Pour les curieux · sous le capot</p>
    <h2>Au fond, <span class="mark mark--lemon">des requêtes HTTP</span></h2>
    <figure class="schema" role="img" aria-label="Schéma : Copilot envoie une requête HTTP à l'API d'Outlook pour demander les derniers courriels, Outlook renvoie la réponse. Dans l'autre sens, quand un événement se produit, un webhook prévient l'outil par un appel HTTP."><!-- schema:sous-le-capot --></figure>''',
 seq=4, cls="slide--schema", section=S1330,
 notes="Même dans Copilot, un assistant ou un agent qui utilise un outil envoie des requêtes HTTP. Le webhook, c'est le même mécanisme dans l'autre sens.")

def edit(k): return f'<td class="edit sk" contenteditable="true" data-k="{k}" data-ph="à compléter"></td>'
rows = [("fait", "Ce que ça fait"), ("demande", "Ce que ça demande"), ("pas", "Ce que ça ne fait pas")]
trs = "".join(f'<tr><td class="row">{l}</td>{edit("as-"+k)}{edit("au-"+k)}{edit("ag-"+k)}</tr>' for k, l in rows)
slide(f'''    <div class="stack">
      <span class="tag sk">{icon("file")}Outlook, Excel, Copilot selon les licences</span>
      <h2>Trois démos, une même <span class="mark mark--lemon">grille de lecture</span></h2>
    </div>
    <table class="readgrid">
      <thead><tr><th></th><th>Assistant<small>avec consignes et documents de référence</small></th><th>Automatisation<small>déclenchée par un courriel</small></th><th>Agent<small>qui enchaîne plusieurs étapes</small></th></tr></thead>
      <tbody>{trs}</tbody>
    </table>''', seq=4, section="13h30 · Démonstrations commentées",
 notes="Clique dans une case pour écrire ce que dit le groupe pendant chaque démo. Le texte reste enregistré dans ce navigateur.")

def demo(n, title, mk, what, shots, notes):
    s = "".join(shot(x) for x in shots)
    slide(f'''    <p class="eyebrow">Démo {n}</p>
    <h2>{title}</h2>
    <div class="cols--1-2 grow" style="display:grid;grid-template-columns:1fr 1.5fr;gap:40px;margin-top:30px">
      <div class="stack"><ul class="dash">{"".join(f'<li class="frag">{w}</li>' for w in what)}</ul><span class="live">en direct</span></div>
      <div class="stack" style="display:grid;gap:20px">{s}</div>
    </div>''', seq=4, section="13h30 · Démonstrations commentées", notes=notes)

demo(1, 'Un assistant <span class="mark mark--sky">qui connaît vos règles</span>', "", ["Des consignes écrites une fois", "Des documents de référence", "Exemple : analyser le tableau de bord du mois"],
     ["Capture d'un assistant Copilot configuré (consignes et documents)"], "Cas de mars : analyse des tableaux de bord. Montrer aussi le projet Claude si utile. Remplir la colonne Assistant de la grille de lecture.")
demo(2, 'Une automatisation <span class="mark mark--lemon">déclenchée par un courriel</span>', "", ["Une facture arrive par e-mail", "Les mêmes actions, à chaque fois", "Une ligne s'ajoute au tableau de trésorerie"],
     ["Capture de l'automatisation simple sur Outlook et Excel"], "Cas de mars : trésorerie quotidienne et factures reçues par e-mail. Dire ce que ça demande à mettre en place : accès, règles claires, test.")
demo(3, 'Un agent <span class="mark">qui enchaîne plusieurs étapes</span>', "", ["Objectif : trouver un produit chez les fournisseurs", "Il cherche, compare, propose", "Il s'arrête avant de commander"],
     ["Capture d'un agent Copilot en action"], "Cas de mars : trouver un produit chez un fournisseur. Insister sur ce qu'il ne fait pas : il propose, il ne commande pas.")

slide(f'''    <div class="stack">
      <div class="meta"><span class="tag sk">{icon("users")}Chacun sur son poste</span><span class="tag tag--soft sk">{icon("search")}Selon les licences disponibles</span></div>
      <h2>À vous : <span class="mark">votre premier assistant</span></h2>
    </div>
    <div class="cols cols--1-2 grow" style="margin-top:40px;align-items:start">
      <ol class="steps">
        <li class="frag"><strong>Choisis</strong> une tâche simple de ton quotidien.</li>
        <li class="frag"><strong>Écris</strong> la consigne : rôle, contexte, ce que tu attends.</li>
        <li class="frag"><strong>Teste</strong> sur un exemple sans donnée réelle.</li>
        <li class="frag"><strong>Note</strong> ce qui marche et ce qui coince.</li>
      </ol>
      <div class="stack">{timer(20, (15, 20, 25))}{shot("Capture de l'écran de départ sur Copilot (où cliquer pour créer l'assistant)")}</div>
    </div>''', seq=4, section="13h30 · Démonstrations, puis à vous",
 notes="Manipulation guidée après les trois démos. Prévoir un plan B si les licences ne permettent pas de créer un assistant : faire rédiger la consigne et la tester dans le chat Copilot.")

slide(f'''    <div class="grow center-y">
      <p class="eyebrow">15h00</p>
      <h2 style="font-size:120px">Pause</h2>
      <p class="lead">Reprise à 15h15 : limites, investissement et choix d'un outil.</p>
      <div class="mt">{timer(15, (10, 15))}</div>
    </div>
    {CUP}''', cls="slide--full", section="Pause")

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

ICE = '''<svg class="illu" viewBox="0 0 760 640" style="width:520px;height:auto" aria-hidden="true">
        <path data-d="0.1" class="inkt" d="M20 210 C 140 200, 250 222, 380 210 S 620 200, 740 214" style="stroke-width:3"/>
        <path data-d="0.5" d="M300 210 L350 110 L380 140 L420 70 L470 210 Z" fill="#FFFFFF" stroke="#1F2A2E" stroke-width="4" stroke-linejoin="round" filter="url(#rough)"/>
        <path data-d="0.9" d="M300 210 L470 210 L560 330 L520 470 L400 600 L270 520 L200 360 Z" fill="#DCEEFA" filter="url(#rough)"/>
        <path data-d="0.7" class="ink" d="M300 210 L200 360 L270 520 L400 600 L520 470 L560 330 L470 210" filter="url(#rough)"/>
      </svg>'''
slide(f'''    <p class="eyebrow">Investissement</p>
    <h2>Ce qu'on voit, <span class="mark mark--sky">ce qu'on ne voit pas</span></h2>
    <div style="display:grid;grid-template-columns:520px 1fr;gap:40px;align-items:center" class="grow">
      {ICE}
      <div class="stack">
        <div class="rise"><p class="hand" style="font-size:34px;color:var(--teal)">Au-dessus de l'eau</p><p>L'outil, la licence, la démo qui impressionne.</p></div>
        <div class="frag"><p class="hand" style="font-size:34px;color:var(--teal)">En dessous</p><ul class="dash"><li>Le temps de prise en main</li><li>Écrire les consignes, préparer les documents</li><li>Tester, corriger, tester encore</li><li>Accompagner l'équipe, entretenir dans la durée</li></ul></div>
        {tip("54 % des entreprises qui n'utilisent pas l'IA citent le manque d'expertise. Chez celles qui l'utilisent, plus de la moitié disent aussi qu'il limite leur usage.", "Insee Première n° 2120, juillet 2026", "frag")}
      </div>
    </div>''', seq=5, section="15h15 · Limites, investissement, choix",
 notes="Le coût des licences se chiffre avec le service informatique, au cas par cas. Pas de chiffre : l'investissement dépend de chaque cas. L'idée à faire passer : le gros du travail n'est pas l'outil.")

checks = ["Le besoin est-il clair et décrit ?", "L'outil est-il déjà dans notre environnement ?", "Où vont nos données ?", "Qui le fera vivre après la formation ?", "Comment saura-t-on que ça marche ?", "Que se passe-t-il s'il se trompe ?"]
ck = "".join(f'<li class="rise"><button class="sk sk--thin" data-k="choix-{i}" aria-pressed="false" aria-label="Cocher"><svg viewBox="0 0 34 34"><path d="M6 18 L14 26 L29 8"/></svg></button><span>{c}</span></li>' for i, c in enumerate(checks))
slide(f'''    <p class="eyebrow">Choisir un outil</p>
    <h2>Six questions <span class="mark">avant de signer</span></h2>
    <ul class="checks cols mt" style="display:grid;column-gap:60px">{ck}</ul>''', seq=5, section="15h15 · Limites, investissement, choix",
 notes="Pour les décideurs : ces questions valent pour n'importe quel outil. Cocher en direct celles auxquelles l'entreprise sait déjà répondre.")

pi = "".join(f'<div class="postit fill-{c}" contenteditable="true" data-k="doute-{i}" data-ph="un doute ?"></div>' for i, c in enumerate(["lemon", "blush", "sky", "mint", "lemon", "mint", "blush", "sky"]))
slide(f'''    <p class="eyebrow">Doutes et réserves</p>
    <h2>Qu'est-ce qui <span class="mark mark--blush">vous retient</span> ?</h2>
    <div class="board">{pi}</div>
    <p class="small" style="margin-top:24px">Une réserve fondée aide à décider : elle dit ce qu'il faut vérifier avant d'y aller.</p>''',
 seq=5, section="15h15 · Limites, investissement, choix",
 notes="Clique sur un post-it pour écrire la réserve en direct. Trier ensuite : ce qui est fondé, ce qui se vérifie, ce qui se règle au jour 5.")

# ---------- 16h00 Garde-fous ----------
slide('''    <p class="eyebrow">Garde-fous</p>
    <div class="grow stack-lg center-y">
      <p class="idea">L'IA peut se tromper <span class="mark mark--blush">avec aplomb</span>.</p>
      <p class="lead frag">On parle d'« hallucination » : une réponse fausse, présentée comme sûre. Elle n'a pas l'air d'une erreur, c'est là le piège.</p>
    </div>''', seq=6, section="16h00 · Garde-fous essentiels",
 notes="Si possible, montrer un exemple vécu en démo dans la journée.")

slide('''    <p class="eyebrow">Garde-fous</p>
    <h2>L'humain <span class="mark">valide</span>, toujours</h2>
    <figure class="schema" role="img" aria-label="Schéma : l'IA propose, tu relis et corriges, puis ça part. Si ce n'est pas bon, on revient à l'IA."><!-- schema:humain-valide --></figure>''',
 seq=6, cls="slide--schema", section="16h00 · Garde-fous essentiels",
 notes="La boucle de retour est la clé : relire n'est pas une perte de temps, c'est la condition pour déléguer.")

slide(f'''    <p class="eyebrow">Garde-fous</p>
    <h2>Trois règles <span class="mark mark--lemon">dès demain</span></h2>
    <div class="cols--3 grow" style="display:grid;margin-top:40px;align-items:start">
      <div class="card sk fill-lemon frag"><h3>{icon("alert")}Ce qu'on ne saisit pas</h3><p>Données personnelles, données clients, informations confidentielles : jamais dans un outil non validé.</p></div>
      <div class="card sk fill-sky frag"><h3>{icon("search")}On relit tout</h3><p>Chaque réponse se relit avant d'être utilisée ou envoyée.</p></div>
      <div class="card sk fill-mint frag"><h3>{icon("users")}On dit qu'on l'a utilisée</h3><p>Quand un document a été préparé avec l'IA, on le signale.</p></div>
    </div>
    {tip("78 % des utilisateurs de l'IA au travail apportent leurs propres outils, sans passer par l'entreprise. D'où l'intérêt de règles simples, partagées.", "Microsoft et LinkedIn, Work Trend Index, mai 2024")}
    <p class="small">Le cadre RGPD, légal, environnemental et éthique est traité en détail au jour 5.</p>''',
 seq=6, section="16h00 · Garde-fous essentiels",
 notes="La troisième règle est une proposition : la valider avec la référente IA avant la séance.")

# ---------- 16h30 Intersession ----------
cols = [("Le déroulé actuel", True), ("Fréquence et temps passé", False), ("Les personnes impliquées", False), ("Outils et documents", False), ("Déclencheur et résultat", False), ("Part de jugement humain", True), ("Sensibilité des données", True), ("Bénéfice attendu", False), ("Type de solution pressenti", True)]
au = "".join(f'<div class="col sk sk--thin rise{" is-key" if k else ""}"><b>colonne {i+1}</b>{t}</div>' for i, (t, k) in enumerate(cols))
slide(f'''    <p class="eyebrow">L'intersession</p>
    <h2>La grille d'audit, <span class="mark">colonne par colonne</span></h2>
    <div class="audit">{au}</div>
    <p class="small" style="margin-top:22px">Remplissable sans connaissance technique. Trois à cinq tâches par pôle.</p>''',
 seq=7, section="16h30 · Lancement de l'intersession",
 notes="Les colonnes en vert sont celles qui posent le plus de questions : les détailler.")

cells = ["Déroulé actuel", "Fréquence", "Personnes", "Outils", "Jugement humain", "Solution pressentie"]
tr = "".join(f'<td class="edit sk" contenteditable="true" data-k="exemple-{i}" data-ph="…"></td>' for i in range(len(cells)))
slide(f'''    <p class="eyebrow">Ensemble</p>
    <h2>Un exemple <span class="mark mark--lemon">rempli en direct</span></h2>
    <table class="readgrid mt"><thead><tr>{"".join(f"<th>{c}</th>" for c in cells)}</tr></thead><tbody><tr style="height:260px">{tr}</tr></tbody></table>
    <p class="small">On prend une des situations classées ce matin et on remplit la ligne avec le groupe.</p>''',
 seq=7, section="16h30 · Lancement de l'intersession",
 notes="Proposition : partir des commissions des vendeurs itinérants, estimées à 4 h en mars. Clique dans une case pour écrire.")

ref = "".join(f'<div class="fill-line rise"><span>{p}</span><span class="f" contenteditable="true" data-k="ref-{i}" data-ph="nom à écrire en séance"></span></div>' for i, p in enumerate(["Commerce", "RH et comptabilité", "Communication"]))
slide(f'''    <p class="eyebrow">Qui porte quoi</p>
    <h2>Un référent <span class="mark mark--sky">par pôle</span></h2>
    <div class="cols mt" style="align-items:start">
      <div>{ref}</div>
      <div class="card sk fill-teal frag"><h3>{icon("users")}La référente IA</h3><p>Elle garde la vue d'ensemble. Les référents de pôle font avancer la grille dans leur équipe.</p></div>
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
    <h2>Ce que vous savez <span class="mark mark--lemon">faire maintenant</span></h2>
    <ul class="checks mt">{gl}</ul>''', seq=7, section="16h30 · Lancement de l'intersession",
 notes="Faire cocher par le groupe. Revenir sur les attentes notées au tour de table du matin.")

slide(f'''    <span class="wordmark wordmark--lg rise">{icon("logo")}SUMMIT FLOW</span>
    <div class="grow stack center-y">
      <p class="eyebrow rise">Rendez-vous le 22 janvier</p>
      <h1 class="rise">Merci, et <span class="mark">bonne observation</span></h1>
      <p class="lead rise">D'ici là, on observe, on note, on remplit la grille.</p>
      <p class="cover-meta small rise">Marie Jolly · contact@summitflow.fr · summitflow.fr</p>
    </div>
    {COVER_RIDGE}''', cls="slide--cover slide--full", section="Fin du jour 1")

# assemble
src = pathlib.Path("src/index.html").read_text()
a = src.index('<main class="stage"'); a = src.index(">", a) + 1
b = src.index('  <div class="trail trail-global"')
out = src[:a] + "\n\n" + "\n".join(S) + "\n" + src[b:]
pathlib.Path("src/index.html").write_text(out)
print(len(S), "slides")
