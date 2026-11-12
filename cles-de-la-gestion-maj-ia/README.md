# Mise à jour sur l'IA : nouveaux modèles, outils et usages

Formation d'une journée pour Les Clés de la Gestion, animée par Marie Jolly (Summit Flow). Première session le lundi 7 décembre 2026, six stagiaires au maximum, public ayant suivi « Apprendre à utiliser l'Intelligence Artificielle ».

Le fichier à projeter est **`deck-mise-a-jour-ia.html`** : il s'ouvre dans un navigateur, sans connexion (polices, images et logos sont embarqués). Même moteur et même système de design que le deck Maison Lagarrigue (branche `formation-j1-deck`, dossier `formation-j1/`), qui n'a pas été modifié.

## Les fichiers

| Fichier | Rôle |
| :-- | :-- |
| `deck-mise-a-jour-ia.html` | Le deck construit, 50 slides, à projeter |
| `recueil-besoins.md` | Le questionnaire à envoyer aux stagiaires avant la session, avec le message d'envoi |
| `adaptations-apres-recueil.md` | La liste de ce qu'il faut ajuster, slide par slide, une fois les réponses reçues |
| `a-verifier.md` | Ce qui n'a pas pu être confirmé sur une page officielle, et ce qui est dépassé dans le catalogue |
| `quiz.md` | Les questions des cinq quiz, prêtes à importer dans un outil de quiz en ligne |
| `src/index.html` | La coquille du deck, avec le bloc `window.SESSION` en tête |
| `src/generer_slides.py` | Le contenu des slides et les notes de l'animatrice |
| `src/deck.css`, `src/deck.js` | Le système de design et le moteur, repris du deck Lagarrigue et complétés |

## Modifier la date, les horaires, le lieu ou les liens

Tout est dans le bloc `window.SESSION`, en haut de `src/index.html`, **et** en haut de `deck-mise-a-jour-ia.html`. On peut modifier directement le fichier construit avec un éditeur de texte : pas besoin de reconstruire. Le programme de la slide 5 et le sommaire latéral se mettent à jour tout seuls.

Les liens des quiz (`quiz.m1` à `quiz.m5`), du questionnaire de recueil (`recueil`) et du questionnaire de satisfaction (`satisfaction`) se collent au même endroit : le bouton apparaît tout seul sur la slide correspondante.

## Modifier le contenu

```bash
python3 src/generer_slides.py && python3 build.py
```

À lancer depuis ce dossier. Le premier script réécrit les slides dans `src/index.html`, le second assemble le fichier autonome. Python 3 et Pillow suffisent.

## Pendant la présentation

Mêmes commandes que le deck Lagarrigue : flèches ou télécommande pour avancer (les éléments apparaissent un par un avant de changer de slide), `N` pour les notes de l'animatrice (timing, pièges à éviter, sources), `F` plein écran, `D` stylo, `M` surligneur, `L` pointeur, `P` export PDF, `?` aide. Les cases à remplir en direct (vos réponses, mises en commun, plan d'action) sont gardées dans le navigateur.

## Le système de design

Le système Summit Flow ne change pas : fond papier, encre teal, titres manuscrits, aplats pastel, trait à main levée, samoyède. La palette de Les Clés de la Gestion vient du logo (le bandeau du site est une photo de formation assombrie, sans couleur exploitable en dehors des chaises rouges, et la maison n'utilise jamais de rouge) :

| Couleur | Code | Rôle dans le deck |
| :-- | :-- | :-- |
| Bleu marine | `#123C5C` | Fond des ouvertures de module, pastilles des consignes, titres des encadrés de l'organisme |
| Orange | `#EE7203` | Bordure des encadrés « À adapter selon l'outil du stagiaire », filets « À retenir » |
| Ambre | `#F7A600` | Anneau et progression sur les slides sombres |
| Abricot | `#FDEBD7` | Pastel tiré de l'orange : tout ce qui se manipule (objectif d'atelier, surlignage des ateliers) |
| Brume | `#DFE7EF` | Pastel tiré du marine : les quiz |

Les logos : le logo couleur de l'organisme sur les slides claires, la version blanche sur les ouvertures de module en marine. Le logo Summit Flow est à gauche du pied de page, celui de l'organisme à droite, sur chaque slide. Les deux sont côte à côte sur la couverture et sur la slide finale.

## La part de pratique

Sur 7 heures (9h00 à 12h30, 13h30 à 17h00), environ 4 h 40 de manipulation, soit les deux tiers : échauffement (5 min), cinq ateliers (40, 85, 40, 45 et 30 min), cinq quiz (25 min) et plan d'action (12 min). Le reste : accueil, cadrages de 3 à 5 slides par module et mises en commun. Si l'organisme raccourcit la journée, couper dans les cadrages, pas dans les ateliers.

## Les sources

Recherche faite le 12 novembre 2026, sur les pages officielles des éditeurs : Anthropic, Google (notes de version de Gemini, Google DeepMind, aide Google Meet), Mistral (blog, documentation, tarifs), DeepSeek (documentation de l'API), Black Forest Labs, ElevenLabs, Suno, Microsoft Learn, Fireflies. Chaque slide de contenu cite ses sources dans ses notes (touche `N`). Les pages d'OpenAI n'ont pas pu être lues depuis l'environnement de préparation : tout ce qui concerne ChatGPT est à contrôler la veille (voir `a-verifier.md`).

## Les logos

- `src/images/logos/` : les outils cités. OpenAI, Claude, Anthropic, Gemini, Google, Google Meet, Mistral, DeepSeek, ElevenLabs et Suno viennent de Simple Icons (licence CC0, dessins officiels des marques) ; Black Forest Labs et Fireflies de leurs sites ; Midjourney de Wikimedia Commons ; Microsoft et Teams du deck Lagarrigue. Copilot est représenté par le logo Microsoft.
- `src/images/carriere/` : Airbus et Diehl (Wikimedia Commons), Aubert & Duval et Mecachrome (leurs sites). Utilisés uniquement pour illustrer le parcours de la formatrice.
- Les marques restent la propriété de leurs titulaires : les logos servent à identifier les outils et les entreprises, pas à suggérer un partenariat.
