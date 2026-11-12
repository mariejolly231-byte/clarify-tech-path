# Fiche PAF de positionnement

La fiche à transmettre aux stagiaires avant la session du 7 décembre 2026, aux couleurs Summit Flow. Elle reprend la structure du modèle de Les Clés de la Gestion (identité, questions de personnalisation, question sur le handicap, référence `FOR\R1004\V1\Fiche PAF`) et le contenu du questionnaire `recueil-besoins.md`.

`sortie/fiche-paf-vierge.pdf` se remplit à l'écran (champs à saisir, cases et boutons à cocher, dans Acrobat Reader, l'aperçu de macOS ou un navigateur) ou s'imprime tel quel.

## Pré-remplissage automatique

```bash
python3 fiche-paf/generer_fiche_paf.py fiche-paf/stagiaires.csv
```

- Date, horaires et lieu sont lus dans le bloc `window.SESSION` du deck (`src/index.html`) : on les modifie là, une seule fois, et la fiche suit.
- `stagiaires.csv` (séparateur `;` ou `,`, colonnes `nom;societe;telephone;email;fonction`) produit une fiche pré-remplie par stagiaire dans `sortie/`. Voir `stagiaires-exemple.csv`. Ne pas versionner le vrai fichier : il contient des données personnelles.
- Sans fichier, seule la fiche vierge est produite.

Le nom de la formation, la formatrice, la ligne de retour (« À renvoyer à… ») et la référence qualité se règlent en haut du script.
