# Summit Flow Altitude, version carnet de terrain

Thème de projection Summit Flow pour les formations en salle. L'idée : un carnet de terrain plutôt qu'une interface. Papier chaud, encre teal, trait dessiné à la main, schémas Excalidraw. Rien qui rappelle une interface d'IA générique : pas de dégradé, pas de lueur, pas de bleu-violet, pas de cartes en verre.

## Palette

| Token | Hex | Rôle |
|---|---|---|
| `--sf-paper` | `#F3EDE1` | Fond papier des slides |
| `--sf-card` | `#FBF8F2` | Cartes et cases posées sur le papier |
| `--sf-teal` | `#0B4F5C` | Encre principale : titres, contours, fond de couverture |
| `--sf-mint-ink` | `#1D6F5C` | Annotations manuscrites, horaires, progression |
| `--sf-mint` | `#7DD8BE` | Accent sur fond teal uniquement |
| `--sf-sage` | `#CFE6DA` | Fond doux, halo du repère « vous êtes ici » |
| `--sf-anth` | `#2A2F33` | Texte courant |
| `--sf-muted` | `#5E5A52` | Texte secondaire, étapes passées du sommaire |
| `--sf-line` | `#CFC6B4` | Traits, pointillés, étapes à venir |
| `--sf-alert` | `#B3261E` | Rouge réservé aux encarts de vigilance |
| `--sf-alert-bg` | `#F8E6E2` | Fond d'encart de vigilance |

## Contrastes vérifiés (WCAG 2.x)

| Texte / fond | Ratio |
|---|---|
| Anthracite sur papier | 11,6:1 |
| Teal sur papier | 7,9:1 |
| Gris secondaire sur papier | 5,9:1 |
| Teal annotation sur papier | 5,2:1 (grands textes) |
| Rouge sur papier | 5,6:1 |
| Papier sur teal | 7,9:1 |
| Menthe sur teal | 5,4:1 (titres et accents) |

## Typographie

- **Titres** : Fraunces 700, axe « SOFT » au maximum. Un serif chaleureux aux formes arrondies, loin des sans-serif d'interface.
- **Texte** : Bricolage Grotesque 500. Un grotesque avec du caractère, très lisible en projection.
- **Annotations, horaires, numéros, schémas** : Excalifont, la police manuscrite d'Excalidraw.
- **Accent** : Dancing Script 700, un ou deux mots dans un grand titre seulement.

Toutes les polices sont embarquées dans le fichier. Échelle sur scène 1920 x 1080 : couverture 96 px, titre 68 px, idée clé 88 px, texte 38 px, minimum 28 px pour le contenu, 24 px pour le sommaire latéral et le pied de page.

## Le trait dessiné

Les contours des cartes, étiquettes, encarts et du numéro de slide passent par un filtre SVG qui les fait légèrement trembler, comme tracés à la main. Le texte, lui, reste net. Les schémas sont de vrais rendus Excalidraw : trait à main levée, remplissage hachuré, police manuscrite. Leurs sources éditables sont dans `schemas/*.excalidraw`.

## Structure de chaque slide

Sommaire du jour à gauche (étape en cours en teal, étapes passées grisées), numéro de slide entouré en haut à droite, itinéraire de progression en bas. La couverture et le programme du jour sont en pleine largeur.

## Règles de contenu

Une idée par slide. Les situations citées sont celles de la proposition, signalées comme pistes à confirmer par la grille d'audit. Pas de chiffre sans source, pas de nom de personne, pas d'emoji.
