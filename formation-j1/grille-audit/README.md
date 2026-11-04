# Grille d'audit de l'intersession

Deux façons de la remplir, avec les mêmes 9 colonnes que les slides 51 et 52.

## En ligne, par QR code (Google Forms)

1. Ouvre script.google.com, crée un nouveau projet et colle `creer-formulaire.gs`.
2. Exécute `creerGrille()` une fois et accepte les autorisations (Forms, Gmail, déclencheurs).
3. Le journal d'exécution affiche le lien du formulaire. Chaque réponse t'arrive ensuite par e-mail à mariejolly231@gmail.com.
4. Pour le QR code du deck : `python3 grille-audit/qr.py "<lien du formulaire>"`, puis reconstruire le deck.

## En PDF à remplir

`dist/grille-audit-lagarrigue.pdf` : cinq pages, une par tâche, champs saisissables (listes déroulantes pour le cas de mars et la solution pressentie). Régénérer avec `python3 grille-audit/generer_pdf.py`.
