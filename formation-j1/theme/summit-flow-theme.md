# Summit Flow Altitude

Thème de projection Summit Flow pour les supports de formation en salle. Grand air, terrain technique, clarté. Le teal profond porte les moments forts (ouverture, idée clé de séquence), le blanc cassé laisse respirer le contenu, la menthe guide l'œil, le rouge ne sert qu'aux alertes.

## Palette

| Token | Hex | Rôle |
|---|---|---|
| `--sf-teal` | `#0B4F5C` | Couleur principale : fonds de couverture et de séquence, titres sur fond clair |
| `--sf-teal-2` | `#0E6170` | Variante pour surfaces sur fond teal (cartes, filets) |
| `--sf-mint` | `#7DD8BE` | Accent sur fond sombre : surlignage, repères, icônes |
| `--sf-mint-bg` | `#E3F4EE` | Fond doux d'encart sur fond clair |
| `--sf-mint-ink` | `#1D7A66` | Menthe lisible sur fond clair, réservée aux grands textes et pictos |
| `--sf-off` | `#F7F5F0` | Blanc cassé : fond des slides de contenu, texte sur fond sombre |
| `--sf-anth` | `#2A2F33` | Gris anthracite : texte courant |
| `--sf-muted` | `#5A6268` | Texte secondaire (sources, légendes) |
| `--sf-line` | `#D9DDD8` | Filets et bordures |
| `--sf-alert` | `#B3261E` | Rouge alerte, uniquement pour les encarts de vigilance |
| `--sf-alert-bg` | `#FBEDEC` | Fond d'encart d'alerte |

Aucun dégradé. Aplats uniquement.

## Contrastes vérifiés (WCAG 2.x)

| Texte / fond | Ratio | Usage autorisé |
|---|---|---|
| Blanc cassé sur teal | 8,4:1 | Tout texte |
| Anthracite sur blanc cassé | 12,4:1 | Tout texte |
| Teal sur blanc cassé | 8,4:1 | Tout texte |
| Gris secondaire sur blanc cassé | 5,7:1 | Légendes, sources |
| Menthe sur teal | 5,4:1 | Titres et accents, pas de texte courant |
| Rouge alerte sur fond d'alerte | 5,7:1 | Titre d'alerte |
| Anthracite sur fond d'alerte | 11,9:1 | Corps d'alerte |
| Menthe foncée sur blanc cassé | 4,8:1 | Grands textes et pictos seulement |

Un vidéoprojecteur en salle éclairée perd beaucoup de contraste : le texte courant reste donc au-dessus de 7:1.

## Typographie

- **Titres et texte** : Figtree (500 pour le texte, 700 pour les titres), embarquée dans le fichier. Elle remplace Proxima Nova, la police de marque, qui est sous licence commerciale et ne peut pas être embarquée : le rendu est ainsi identique sur tous les postes, sans réseau.
- **Accent manuscrit** : Dancing Script 700, embarquée. Réservée à un ou deux mots dans un grand titre (couverture, idée clé). Jamais pour du texte courant, une consigne ou une donnée : une écriture manuscrite projetée se lit mal au fond de la salle.

Échelle sur scène 1920 x 1080 : titre de couverture 92 px, titre de slide 72 px, idée clé 96 px, texte 40 px, minimum absolu 28 px (légendes, sources, pied de page).

## Schémas didactiques

Dessinés dans le style Excalidraw (trait à main levée), aux couleurs du thème : cadres teal, fonds blanc ou menthe, rouge pour la seule case de vigilance. Texte en Figtree, jamais en dessous de 28 px une fois projeté. Les sources éditables sont dans `schemas/*.excalidraw`.

## Règles de mise en page

Une idée par slide. Marges de 120 px. Six lignes de texte maximum. Pas d'emoji, pictogrammes en SVG trait. Toute donnée chiffrée porte sa source en pied de slide, sinon elle ne figure pas. Les exemples portent l'étiquette « Données fictives ».

## Métaphore montagne

L'itinéraire = le métier. Le sac = les outils, fichiers et process. Le guide allège. La barre de progression du deck est un itinéraire : le repère avance vers le sommet.

## Idéal pour

Formations en présentiel, ateliers, restitutions d'audit projetées.
