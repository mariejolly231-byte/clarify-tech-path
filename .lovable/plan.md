Beaucoup de changements demandés. Je propose de les regrouper en lots cohérents, puis d'attaquer dans l'ordre. Confirme ou ajuste avant que je lance.

## Lot 1 — Page /accueil (cartes participants)
- Refondre le format des cartes : plus grandes, portrait Samoyède bien visible (env. 80–96 px), nom + activité plus lisibles.
- Garder la structure 2 colonnes + QR central, animations flottantes, badge "a répondu".
- Aucun autre changement sur cette page.

## Lot 2 — Mode présentation (homepage /)
- Ajouter navigation clavier + clic : clic n'importe où (hors liens/boutons) ou flèches ←/→ / Espace → section suivante (scroll smooth vers prochaine `<section id>`).
- Échap / clic sur SideNav restent normaux.
- Indicateur discret en bas "← → pour naviguer".

## Lot 3 — Bug de scroll Partie 1 (slides 2 & 3)
- Diagnostiquer pourquoi le scroll renvoie en haut sur `AlreadyNoCode` et `History`. Probable : re-render `setRevealed` ou animation. Corriger.

## Lot 4 — Logo Summit Flow plus gros
- Augmenter la taille du logo dans SideNav (et partout où il apparaît).

## Lot 5 — Section 03 "Vous avez déjà chaussé les crampons"
- Retirer la phrase "Animatrice : laissez les mains se lever."
- Renommer le badge final "Certifié no-codeur sans le savoir" → "No-codeur sans le savoir".

## Lot 6 — Section 04 "Histoire"
- Renommer "30 ans de sentiers tracés" → "40 ans de sentiers tracés" (et toute occurrence "30 ans" ailleurs dans la présentation).
- Supprimer la frise montagnes VisiCalc/Access/etc. (déjà sur l'infographie).
- Déplacer l'encart "Vibe Coding" vers la section Vocabulaire/Lexique.

## Lot 7 — Supprimer toutes les mentions "Animatrice :" / notes animatrice
- Scanner toutes les sections, retirer les italiques "Animatrice : …" et équivalents.

## Lot 8 — Pause avant Lexique (Partie 2)
- Rendre le bloc Pause beaucoup plus visible (icône, fond contrasté, encart "PAUSE 15 min").
- NB : actuellement la Pause est entre Partie 2 et Partie 3 — tu veux la déplacer AVANT le Lexique (donc avant Vocabulary, début Partie 2) ? À confirmer.

## Lot 9 — Section Lexique (Vocabulary)
- Réorganiser et enrichir avec termes no-code + IA : CRM, base de données, API, MCP, agent IA, assistant IA, automatisation, workflow, webhook, intégration, SaaS, LLM, prompt, RAG, fine-tuning, token, hallucination, etc.
- Garder structure existante, ajouter l'encart Vibe Coding venu du Lot 6.

## Lot 10 — Section "Trois façons d'être aidé" + infographie No-code/Low-code/Code
- Retrouver l'infographie no-code/low-code/code manquante (asset `trois-facons-aide.png` et/ou `ikea-analogy.png` existent — vérifier où elles sont rendues).
- Repositionner "Trois façons d'être aidé" APRÈS l'infographie no-code/low-code/code.

## Lot 11 — Slide 7 "Jeu collectif"
- Rendre visuellement évident que c'est un jeu (badge "🎮 Jeu collectif", couleur, encart).

## Lot 12 — Slide 8 "Sous le capot" — ajouter ressource RAG
- Ajouter le lien Notebook LM (https://notebooklm.google.com/notebook/70814c9c-9f66-45ff-b80c-bb220df20bc6) comme ressource dans la section RAG / hallucinations.

## Lot 13 — Présentation plus courte / plus pertinente (transverse)
- Passe d'élagage : raccourcir paragraphes verbeux, retirer redondances. **Ce lot demande des décisions éditoriales** — je propose de te montrer un diff section par section avant d'appliquer, OU tu me donnes carte blanche pour couper agressivement (—30 % de texte cible).

---

**Questions avant que je lance :**
1. Lot 8 : la pause va AVANT le Lexique (début Partie 2) ou reste où elle est ?
2. Lot 13 : carte blanche pour couper, ou tu valides chaque section ?
3. Je fais tout d'un coup, ou je commence par les lots 1–7 (bugs + petits fixes) et on voit le reste ensuite ?