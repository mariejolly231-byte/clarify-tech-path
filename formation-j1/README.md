# Deck jour 1 : Automatisation et IA agentique

Le fichier à projeter est `dist/jour1-deck.html`. Il fonctionne sans connexion : polices, schémas et images sont embarqués dedans. Le PDF de secours est `dist/jour1-deck.pdf`.

## Ajouter une infographie

1. Dépose le fichier dans `src/images/` (PNG ou JPG, peu importe la taille : il est compressé au moment de la construction).
2. Dans `src/index.html`, ajoute une slide sur ce modèle :

```html
<section class="slide" aria-roledescription="slide">
  <p class="eyebrow">Rappel commun</p>
  <h2>Comment fonctionne une IA générative</h2>
  <figure class="infographic">
    <img src="images/comment-fonctionne-ia.png" alt="Décris ici ce que montre l'image, pour les personnes qui ne la voient pas.">
  </figure>
  <div class="chrome"><span class="wordmark wordmark--sm"><svg><use href="#i-logo"/></svg>SUMMIT FLOW</span><span class="section">9h00 · Point de départ</span><span class="count"></span></div>
  <aside class="notes">Tes notes d'animation.</aside>
</section>
```

3. Reconstruis le deck : `python3 build.py`.

## Modifier un schéma

Les sources sont dans `schemas/specs.py`. Après modification : `cd schemas && python3 to_excalidraw.py && node export.cjs`, puis `python3 build.py`. Les fichiers `schemas/*.excalidraw` s'ouvrent aussi sur excalidraw.com pour une retouche à la main ; dans ce cas, réexporte en SVG au même nom.

## Pendant la présentation

La barre d'outils apparaît à droite dès que la souris bouge : plein écran, stylo, surligneur, pointeur, projecteur, gomme, effacer, export PDF et aide. Raccourcis : `F` plein écran, `D` stylo, `M` surligneur, `L` pointeur, `O` projecteur, `G` gomme, `C` effacer la slide, `Ctrl+Z` annuler le dernier trait, `Échap` quitter l'outil, `P` export PDF. Les dessins sont gardés par slide, dans ce navigateur uniquement. Le plein écran peut être bloqué quand le deck est affiché dans une autre page (par exemple l'aperçu claude.ai) : ouvre alors `dist/jour1-deck.html` directement dans le navigateur.

## Illustrations et vidéos

Les prompts sont dans `PROMPTS-IMAGES.md`. Dépose les fichiers dans `src/images/`, lance `bash outils/compresser-videos.sh` pour alléger les vidéos, puis reconstruis.

