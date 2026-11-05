# Grille d'audit de l'intersession

Deux façons de la remplir, avec les mêmes 9 colonnes que les slides 52 et 53.

## En ligne, par QR code (Airtable, en service)

Formulaire : https://airtable.com/appnUIHs250UX7TC8/pagUud0FR1Zsgu6gA/form
Base « Grille d'audit · Maison Lagarrigue », table Réponses. L'automatisation « Envoyer chaque réponse à contact@summitflow.fr » part à chaque envoi (à activer une fois dans Airtable). Case de consentement obligatoire, avec renvoi au registre des traitements sur summitflow.fr.
QR code : `python3 grille-audit/qr.py "<lien du formulaire>"`, déjà généré dans `src/images/qr-grille.png`.

## Variante de secours (Google Forms)

1. Ouvre script.google.com, crée un nouveau projet et colle `creer-formulaire.gs`.
2. Exécute `creerGrille()` une fois et accepte les autorisations (Forms, Gmail, déclencheurs).
3. Le journal d'exécution affiche le lien du formulaire. Chaque réponse t'arrive ensuite par e-mail à contact@summitflow.fr.
4. Pour le QR code du deck : `python3 grille-audit/qr.py "<lien du formulaire>"`, puis reconstruire le deck.

## En PDF à remplir

`dist/grille-audit-lagarrigue.pdf` : cinq pages, une par tâche, champs saisissables (listes déroulantes pour le cas de mars et la solution pressentie), case de consentement et lien vers le registre des traitements. Régénérer avec `python3 grille-audit/generer_pdf.py`.
