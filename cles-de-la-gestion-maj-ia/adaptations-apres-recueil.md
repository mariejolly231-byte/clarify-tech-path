# Ce qu'il faut ajuster une fois les réponses reçues

Toutes les modifications de contenu se font dans `src/generer_slides.py`, puis on reconstruit :

```bash
python3 src/generer_slides.py && python3 build.py
```

Les dates, horaires, lieu et liens se modifient sans reconstruire, dans le bloc `window.SESSION` tout en haut de `src/index.html` (et du fichier construit `deck-mise-a-jour-ia.html`).

Les numéros de slide ci-dessous sont ceux du deck actuel (50 slides). Chaque encadré orange « À adapter selon l'outil du stagiaire » du deck correspond à une section de ce fichier.

---

## Avant tout : lire les réponses avec trois questions

1. **Quels outils sont réellement ouverts ?** Compter les outils par stagiaire et noter qui est en gratuit, qui est en payant personnel, qui est en payant entreprise.
2. **Qu'est-ce qui est interdit ?** La question 5 décide ce qu'on a le droit de faire en atelier. Un stagiaire dont l'entreprise interdit tout outil non validé ne crée pas de compte Vibe le jour J : il travaille en binôme ou en démonstration.
3. **Quelles tâches reviennent ?** Les tâches de la question 4 sont la matière des ateliers. Repérer les trois ou quatre qui reviennent le plus souvent.

---

## Slide 2 · Recueil de besoins

- [ ] Coller le lien du questionnaire en ligne dans `SESSION.recueil`.

## Slide 3 · Ce que vos réponses nous disent

- [ ] Remplir les six cases directement dans le deck, la veille, **dans le navigateur qui servira à projeter** (les cases sont gardées dans ce navigateur). Ou les écrire en dur dans `generer_slides.py`, variable `res`, si le deck doit être projeté depuis un autre poste.
- [ ] Ne rien écrire qui permette de reconnaître un stagiaire (confidentialité, aisance).

## Slide 6 · Échauffement

- [ ] Rien à changer, sauf si un stagiaire n'a aucun outil : prévoir de le mettre à côté d'un voisin dès l'échauffement.

## Slide 10 · Les modèles phares

- [ ] Si personne n'utilise Claude ou Gemini, garder les lignes mais ne pas s'y attarder à l'oral.
- [ ] Si plusieurs stagiaires utilisent Copilot, prévoir de montrer en direct le sélecteur Réponse rapide / approfondie / Automatique.

## Slide 12 · Atelier 1, « le même cas, deux réglages »

Encadré « À adapter » à réécrire avec seulement les outils présents :

- [ ] **ChatGPT gratuit** : vérifier la veille sur un compte gratuit ce que propose le sélecteur de modèle et si la réflexion est accessible (voir a-verifier.md). Si elle ne l'est pas, faire travailler ces stagiaires en binôme avec un compte payant.
- [ ] **Copilot** : garder « Réponse rapide, puis Réponse approfondie ».
- [ ] **Mistral Vibe** : vérifier sur un compte gratuit le nom exact de l'option de réflexion.
- [ ] **Gemini** : garder « 3.6 Flash, puis Thinking », à vérifier dans le sélecteur.
- [ ] **Claude** : garder la comparaison Sonnet et Opus, accessible selon l'offre.
- [ ] Supprimer les lignes des outils que personne n'utilise.
- [ ] Préparer, pour chaque tâche citée au moins deux fois, une demande d'exemple fictive prête à coller (pour les stagiaires bloqués au démarrage).

## Slide 20 · Atelier 2, « ton premier vrai projet »

- [ ] Si **personne** n'a ChatGPT : renommer le module en « Projets, assistants et tâches planifiées » et faire l'atelier dans l'outil majoritaire (Copilot Notebooks, projets Vibe ou Claude). Prévenir l'organisme : l'objectif du catalogue cite ChatGPT.
- [ ] Si **la majorité est en ChatGPT gratuit** : vérifier la veille ce que le compte gratuit permet pour les projets et les tâches planifiées (a-verifier.md). Si la tâche planifiée n'est pas disponible, la partie B devient « créer un assistant » pour tout le monde.
- [ ] **Copilot** : vérifier que les stagiaires ont accès aux Notebooks et à la planification de requêtes sur leur licence.
- [ ] Préparer deux documents fictifs de secours adaptés aux tâches citées (par exemple une trame de compte rendu et un modèle de relance).
- [ ] Choisir, à partir des tâches de la question 4, trois exemples de « dossier récurrent » à proposer dans la consigne (étape 1) à la place des exemples actuels.

## Slide 25 · Le Chat devient Vibe

- [ ] Si un stagiaire utilise déjà Mistral, lui demander s'il accepte de montrer son usage pendant la slide 26.
- [ ] Relire les prix en euros sur mistral.ai/pricing (voir a-verifier.md) avant d'en parler à l'oral.

## Slide 28 · Atelier 3, « ton cas, version française »

- [ ] Lister les stagiaires dont l'entreprise **interdit les outils non validés** : ils ne créent pas de compte, ils travaillent en binôme ou suivent la démonstration projetée.
- [ ] Pour les autres : leur demander dans le message de convocation de créer leur compte Vibe gratuit **avant** la session, avec l'adresse que leur entreprise autorise.
- [ ] Préparer le fichier audio de secours d'une minute (réunion fictive, aucun nom réel) et le mettre sur une clé USB.
- [ ] Si plusieurs stagiaires utilisent Copilot avec Teams : orienter la comparaison sur la partie compte rendu.

## Slide 36 · Atelier 4, « banc d'essai en binôme »

- [ ] Former les trois binômes à partir des réponses : un stagiaire en payant avec un stagiaire en gratuit, et une aisance élevée avec une aisance faible.
- [ ] Attribuer les catégories (texte, image, compte rendu) selon les tâches citées : si les comptes rendus reviennent souvent, donner cette catégorie au binôme le plus à l'aise.
- [ ] Vérifier que chaque binôme a accès à au moins deux outils dans sa catégorie. Sinon, prévoir l'outil manquant en démonstration.
- [ ] Préparer la grille de comparaison sur papier (cinq critères, trois outils) : une par binôme.

## Slide 44 · Atelier 5, « ton workflow sur une page »

- [ ] Remplacer l'exemple « ton projet du module 2 » si l'atelier 2 a été fait dans un autre outil.
- [ ] Si un stagiaire a coché « je construis déjà des assistants ou des automatisations » (aisance 5), lui proposer le niveau 3 avec son outil d'automatisation, sans en faire le sujet du groupe.
- [ ] Imprimer six fiches workflow vierges (déclencheur, entrées, étapes IA, contrôle humain, sortie, outil).

## Slides 14, 22, 30, 38, 46 · Quiz

- [ ] Créer les cinq quiz en ligne à partir de `quiz.md` (Google Forms, Wooclap ou Kahoot).
- [ ] Coller les liens dans `SESSION.quiz.m1` à `SESSION.quiz.m5` : le bouton apparaît tout seul sur la slide.
- [ ] Si un stagiaire n'a pas de téléphone utilisable, prévoir la version à main levée (les réponses se révèlent dans le deck avec la flèche droite).

## Slide 47 · Plan d'action

- [ ] Préparer une ligne d'exemple tirée d'une tâche citée dans le questionnaire, pour la remplir ensemble à l'écran.

## Slide 49 · Attestation

- [ ] Coller le lien du questionnaire de satisfaction de l'organisme dans `SESSION.satisfaction`.
- [ ] Confirmer avec Les Clés de la Gestion la forme de l'attestation et qui la remet.

## Bloc SESSION, en haut du deck

- [ ] `lieu` : remplacer « Lieu à confirmer ».
- [ ] `horaires` et `programme` : confirmer avec l'organisme. Si les horaires changent, garder au moins deux tiers de manipulation (voir README).
