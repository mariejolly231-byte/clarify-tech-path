# Maison Lagarrigue, ateliers par pôle (jours 2 à 4)

Ce dossier contient le deck des trois journées d'ateliers : commerce le 22 janvier, RH et comptabilité le 26 février, communication le 15 mars 2027. Il reprend à l'identique la DA, les illustrations et le moteur du deck du jour 1 (navigation, notes, stylo, arbre de décision interactif, minuteur, zones à remplir en direct).

`ateliers-jours-2-4.html` est un fichier autonome : il s'ouvre dans un navigateur, sans connexion. Le pôle se choisit sur la couverture, ou dans l'adresse avec `?pole=commerce`, `?pole=rh` ou `?pole=com`. Sans choix, le deck montre les trois pôles à la suite (55 slides) : c'est la vue de préparation. Avec un pôle choisi, il en garde 43. Ce qui est écrit en séance dans les cases est gardé dans le navigateur, séparément pour chaque pôle.

## Ce qui est prêt, et ce qui attend les grilles

Toute la trame commune est prête : ouverture, critères de choix, arbre des briques, fiche de cadrage, harnais Copilot, sources, instructions en sept rubriques, atelier de construction avec minuteur, protocole et grille de test, crash-test des garde-fous, fiche d'utilisation, propriétaire, indicateurs, règles pour la charte, cas suivants, clôture.

Les slides marquées d'un badge jaune « Hypothèse de mars, à confirmer par la grille d'audit » sont construites à partir des situations repérées en mars et des hypothèses de la proposition du 14 octobre. Elles sont à revoir dès réception des grilles, entre le 15 et le 18 janvier.

| Slide (vue « trois pôles ») | Quoi mettre à jour |
| :-- | :-- |
| 9 · Ce que vos grilles nous disent | Les quatre chiffres de la consolidation, ce qui revient le plus, ce qui a été écarté. Remplissable directement dans le deck, ou dans le fichier. |
| 13 à 15 · Vos tâches, sur la table | Remplacer les situations de mars par la priorisation validée avec la direction, avec les temps estimés dans les grilles. |
| 16 à 18 · Vos tâches, passées dans l'arbre | Renommer les deux cartes « Tâche des grilles » avec les nouvelles tâches. |
| 28 à 30 · Trois cas possibles | Garder le cas retenu, remplacer les deux autres par des cas des grilles. |
| 31 à 33 · Instructions | Adapter le modèle au cas retenu, avec le vocabulaire des grilles. |
| 40 à 42 · Trouvez les erreurs | Facultatif : rapprocher l'exemple fictif du cas retenu. Les calculs actuels sont vérifiés. |
| Couverture de fin | Ajouter le QR code du questionnaire de satisfaction de CFD Formation. |

## Régénérer le deck

`outils/build_ateliers.py` reconstruit le deck à partir du HTML du jour 1 (le deck publié « Deck jour 1 Lagarrigue »), qui n'est pas versionné ici à cause de son poids. Le contenu des slides se modifie dans ce script, puis :

```bash
python3 lagarrigue/outils/build_ateliers.py chemin/vers/jour1.html lagarrigue/ateliers-jours-2-4.html
```

## À vérifier la veille de chaque atelier

Les menus de Copilot Business sur un poste de l'entreprise (Nouvel agent, requêtes enregistrées et planifiées, Notebooks, Cowork), l'accès aux sources préparées par le pôle, et la présence d'exemples anonymisés pour les essais.
