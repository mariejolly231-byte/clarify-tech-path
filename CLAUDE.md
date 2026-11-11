# Refonte du site Summit Flow (summitflow.fr)

## Contexte
Summit Flow est le cabinet de Marie Jolly : audit IA, automatisation et formation no-code & IA pour PME industrielles et techniques. Marie est ingénieure industrielle (10 ans dans l'aéronautique : APQP, AS9100, sous-traitance Airbus). Zone principale : Occitanie. Disponible partout en France à distance.

Le site actuel (React, une seule page) sert de base : on garde son contenu, sa métaphore montagne, ses témoignages et ses logos partenaires. On le reconstruit pour le SEO, la vitesse et un rendu "ultra pro".

## Objectifs
1. Se positionner sur les requêtes "PME industrielles + automatisation / audit IA / formation no-code et IA" en Occitanie, puis en France.
2. Faire de l'aéronautique et des sous-traitants un pilier différenciant.
3. Convertir en rendez-vous (Calendly existant : https://calendly.com/summitflowfr/30min) et en formulaire.
4. Être lisible par Google ET par les IA (ChatGPT, Perplexity) : HTML statique, pas de contenu dépendant du JavaScript.

## Stack
Astro (sortie statique) + Tailwind. Animations en CSS, JS léger seulement si nécessaire. Hébergement Cloudflare Pages ou Netlify. Pas de bibliothèque lourde.

## Règles de marque (skill summit-flow-brand-identity, à charger avant toute rédaction)
- Promesse : "Moins de bordel organisé. Plus de flux simples pour que l'industrie respire."
- Dialecte : bordel organisé, sac à dos, alléger, vérité de la donnée. Métaphore montagne = fil rouge (itinéraire, sac, guide).
- Ton : direct, terrain d'abord, bienveillant mais honnête, frugal. Pas de tirets quadratins, pas de style IA.
- Interdits : promesses chiffrées magiques, "l'IA fait tout", "transformation digitale", stock photos de bureau.
- Pages de service : hook terrain, audience, douleur, promesse, preuve, process, CTA simple.
- Vouvoiement sur le site (décision de Marie, pour les dirigeants). Le tutoiement reste réservé à LinkedIn, aux ateliers et aux échanges directs.

## Ce qu'on garde du site actuel
Hero montagne pyrénéenne, palette teal, les 3 offres (audit, automatisation, formation), la section "désordre organisé", la méthode en 4 étapes (observer, clarifier, simplifier, former), la FAQ, les témoignages, les logos partenaires, Calendly, le bloc Qualiopi/CPF (sous réserve, voir plus bas).

## Direction visuelle (skill ui-ux-pro-max)
- Générer puis persister un design system : `--design-system --persist -p "Summit Flow" --output-dir <racine>` avec les mots-clés "consulting industrie PME montagne technique sobre". Dials suggérés : variance 4, motion 4, density 3.
- Couleurs : vert sarcelle profond, menthe en accent, blanc cassé, gris anthracite. Contraste texte 4.5:1 minimum.
- Typo : base 16px, interligne 1.5, deux familles maximum, auto-hébergées (pas de Google Fonts distant).
- Icônes SVG, jamais d'emoji.

## Motion (sobre et utile)
- Durées courtes : 150 à 300 ms pour l'UI, jusqu'à 600 ms pour les révélations de sections. Easing ease-out personnalisé, jamais linear.
- Animer uniquement transform et opacity. Jamais width, height, top, left.
- Aucune animation sur le H1 ni sur l'image hero (élément LCP). On anime le décor et les sections suivantes.
- Respecter prefers-reduced-motion : tout se désactive proprement.
- Chaque animation doit aider à comprendre (hiérarchie, continuité). Sinon on la supprime.

## Architecture SEO
Pages (les requêtes cibles sont des hypothèses à valider, aucun volume de recherche n'est établi) :
- `/` : accueil, positionnement PME industrielles Occitanie.
- `/audit-ia-process-pme-industrielles` : audit IA et process terrain.
- `/automatisation-no-code-pme` : Make, n8n, agents IA, suppression des ressaisies.
- `/formation-no-code-ia` : formation sur mesure, Qualiopi/CPF selon situation.
- `/sous-traitants-aeronautiques` : APQP, AS9100, PPAP, conformité des livrables. Page différenciante.
- `/occitanie-toulouse` : UNE seule page locale. Pas une page par ville (doorway pages sanctionnées).
- `/a-propos`, `/ressources` (articles), `/contact`.
- `/mentions-legales`, `/politique-confidentialite` : conserver ces URL, elles existent déjà.

Pour chaque page : un seul H1 avec le mot-clé principal (le H1 poétique actuel devient un sur-titre), title de 60 caractères maximum, meta description de 155 caractères maximum, canonical, Open Graph, maillage interne depuis le menu ET le corps de texte, breadcrumbs.
Redirections 301 si des URL changent. Sitemap généré automatiquement, robots.txt conservé.

## Données structurées (JSON-LD)
Organization / ProfessionalService, Service par offre, FAQPage, BreadcrumbList, Person pour Marie.
VIE PRIVEE : ne PAS publier d'adresse postale, ni de téléphone, ni de coordonnées GPS précises. Utiliser `areaServed` (Occitanie, Toulouse, France) uniquement. Contact via formulaire et Calendly.
Les mentions légales exigent une adresse professionnelle : prévoir une domiciliation, à confirmer avec Marie.

## Performance et accessibilité
- LCP < 2,5 s, CLS < 0,1. Images WebP/AVIF avec width et height, lazy loading sauf l'image hero (preload).
- Navigation clavier complète, focus visible, labels de formulaire visibles, alt descriptifs.
- Bandeau cookies conforme : aucune mesure d'audience sans accord (ou solution sans cookie).

## Points à challenger avec Marie avant de construire
1. Calculateur de rentabilité : Marie le GARDE (décision prise). Il doit rester sur la page d'accueil ou sur la page automatisation. Réserve de cohérence avec la charte : mettre une mention "estimation indicative, à valider ensemble lors de l'audit" et des valeurs par défaut modestes, pour éviter l'effet "chiffre magique".
2. Qualiopi : la mention actuelle repose sur la certification d'ALTITUDE. Décision reportée par Marie. Garder le bloc tel quel pour l'instant, dans un composant isolé facile à modifier.
3. Agrément CII : décision reportée par Marie. Même consigne : composant isolé, facile à modifier ou à retirer.

## Ordre de travail
1. Charger summit-flow-brand-identity, rédiger les textes page par page.
2. Charger ui-ux-pro-max, générer et persister le design system.
3. Construire (Astro), page par page, en commençant par l'accueil.
4. Lancer audit-vibe-app sur le site construit.
5. Appliquer durcir-vibe-app sur les corrections, puis mise en production.
