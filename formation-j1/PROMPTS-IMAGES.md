# Prompts ChatGPT : toutes les illustrations du jour 1

Ce document couvre chaque image qui manque au deck. Chaque emplacement est visible dans le deck sous la forme d'un cadre en pointillés « Illustration à générer » qui donne le nom du fichier attendu. Sur la couverture, les pauses, le déjeuner et la fin, c'est le dessin actuel qui s'affiche tant que l'image n'est pas déposée.

## Comment s'y prendre

Ouvre une seule conversation ChatGPT pour toute la série, pour que le samoyède reste le même d'une image à l'autre. Colle d'abord le bloc « Style commun », puis la fiche personnage, et valide-la. Ensuite, demande les images une par une dans la même conversation, en commençant chaque demande par « Même personnage, même style ». Pour l'animation, ouvre chaque image validée dans l'outil vidéo de ChatGPT et colle son prompt d'animation.

Dépose chaque fichier dans `formation-j1/src/images/` avec le nom exact indiqué : l'image fixe en PNG, et la vidéo en MP4 avec le même nom. Lance ensuite `bash outils/compresser-videos.sh`, qui transforme les MP4 en WebM légers, puis `python3 src/generer_slides.py && python3 build.py`. Le deck montre la vidéo en boucle muette quand elle existe, l'image fixe sinon.

Formats : image en 16:9 (1536 x 864 ou plus) sauf mention contraire, fond blanc cassé uni #FAF8F3 partout, pour que l'image se fonde dans la slide. Vidéo en 16:9, 6 secondes, boucle parfaite, sans son.

## Style commun (à coller en premier)

Tu vas créer une série d'illustrations pour une formation professionnelle de Summit Flow, un cabinet qui accompagne des PME industrielles et agricoles sur l'IA et l'automatisation. Style unique pour toute la série : dessin à main levée façon tableau blanc Excalidraw, trait d'encre anthracite #2A2F33 légèrement irrégulier, aplats de couleur pastel posés comme un surligneur qui déborde un peu du trait. Palette stricte : teal #0B4F5C pour les accents, menthe #D6F1E6, teal pâle #D5EAEC, lavande #E6E0F4, rose pâle #FCE4E8, fond blanc cassé uni #FAF8F3. Pas de dégradé, pas d'ombre réaliste, pas de 3D, pas de texte ni de lettres dans l'image, pas de logo. Beaucoup d'espace vide, composition aérée, un seul sujet principal. Ton chaleureux, simple, professionnel, jamais enfantin. Le personnage principal est un samoyède : c'est un chien qui se comporte comme un chien, jamais debout sur deux pattes, jamais habillé, jamais devant un ordinateur.

## Prompt d'animation générique

Pour chaque image, le prompt d'animation commence par ce bloc, suivi du mouvement propre à l'image :

Anime cette image en boucle parfaite de 6 secondes, caméra fixe, sans zoom. Le trait garde son aspect dessiné à la main, avec un léger frémissement. Aucun nouvel élément, aucun texte, le fond reste blanc cassé uni. La dernière image est identique à la première.

## 0. Fiche personnage (à valider avant tout)

Fichier : `samoyede-fiche.png`. Ne va pas dans le deck : elle sert de référence à ChatGPT.

Crée la fiche de référence du personnage de la série : un samoyède adulte, fourrure blanc crème très dense et duveteuse, oreilles triangulaires dressées, yeux noirs en amande, le fameux sourire du samoyède, queue touffue enroulée sur le dos. Il porte un harnais de randonnée teal #0B4F5C. Montre-le sous quatre angles sur fond blanc cassé uni : de face assis, de profil debout, de trois quarts en marche, couché. Mêmes proportions, même harnais sur les quatre vues. Les ombres de la fourrure sont faites avec des touches teal pâle #D5EAEC, jamais en gris.

## 1. Couverture, slide 1

Fichier : `couverture-samoyede.png` puis `couverture-samoyede.mp4`.

Image : le samoyède, de trois quarts, avance sur un sentier en lacets dessiné en pointillés qui monte vers un sommet aux aplats teal pâle et menthe. Il est dans le tiers inférieur droit. Toute la moitié gauche et le haut de l'image restent vides pour le titre. Deux petits nuages au trait.

Animation : le samoyède marche sur place sur le sentier, sa queue remue, ses oreilles bougent à chaque pas. Les nuages glissent lentement vers la droite.

## 2. Programme du jour, slide 5

Fichier : `programme-samoyede.png` puis `programme-samoyede.mp4`.

Image : une longue ligne de crête dessinée au trait, de gauche à droite, avec six petites balises de sentier plantées à intervalles réguliers, chacune avec un fanion de couleur pastel différente. Le samoyède trotte entre la deuxième et la troisième balise. Tout le dessin tient dans une bande horizontale au centre de l'image : le tiers du haut et le tiers du bas restent vides, car l'image sera recadrée en bandeau.

Animation : le samoyède trotte vers la droite le long de la crête, les fanions ondulent un à un au vent.

## 3. Tour de table, slide 6

Fichier : `depart-samoyede.png` puis `depart-samoyede.mp4`.

Image : le samoyède est assis au pied d'un panneau de départ de randonnée en bois, sans texte, qui indique plusieurs directions par des flèches vides. Un sac de randonnée est posé à côté de lui. Il regarde vers le spectateur, curieux, prêt à partir.

Animation : le samoyède tourne la tête d'une flèche à l'autre du panneau, puis revient vers le spectateur, la queue remue.

## 4. Retour sur mars, slide 7

Fichier : `retour-samoyede.png` puis `retour-samoyede.mp4`.

Image : le samoyède est arrêté sur un replat et regarde en arrière, vers le chemin déjà parcouru qui descend en pointillés jusqu'à une petite vallée. Quelques traces de pattes marquent le chemin derrière lui.

Animation : le samoyède regarde le chemin derrière lui, puis se retourne vers l'avant. Les traces de pattes apparaissent une à une le long du chemin.

## 5 et 6. Infographies, slide 10

Fichiers : `comment-fonctionne-ia.png` et `comment-ia-apprend.png`, en format portrait 2:3, sans animation.

Si tu as déjà tes infographies Clarity, garde-les : elles sont relues et justes. ChatGPT fait encore des fautes dans le texte des images, donc relis chaque mot avant de l'utiliser.

Comment fonctionne l'IA : crée une infographie verticale dans le style de la série, avec le samoyède en petit dans un coin. Trois étapes reliées par des flèches dessinées. Étape 1, « Tu écris une demande ». Étape 2, « L'IA prédit la suite la plus probable, mot après mot ». Étape 3, « Elle te propose une réponse, à relire ». En bas, un encadré rose pâle : « Elle ne cherche pas la vérité : elle prédit. » Texte en français, sans faute, lettres dessinées à la main mais lisibles. Aucun autre texte.

Comment l'IA apprend : crée une infographie verticale dans le même style, avec le samoyède en petit dans un coin. Trois étapes reliées par des flèches dessinées. Étape 1, « Elle lit d'énormes quantités de textes ». Étape 2, « Elle repère les régularités du langage ». Étape 3, « Elle est ajustée pour suivre des consignes ». En bas, un encadré rose pâle : « Ce qu'elle n'a pas lu, elle ne le sait pas. » Texte en français, sans faute, lettres dessinées à la main mais lisibles. Aucun autre texte.

## 7. Trois logiques, slide 12

Fichier : `trois-logiques-samoyede.png` puis `trois-logiques-samoyede.mp4`.

Image : trois petites vignettes côte à côte, chacune dans un cadre arrondi au trait. Vignette menthe pâle : une main lance une balle et le samoyède la rapporte, il répond à la demande. Vignette lavande : une gamelle sous un distributeur de croquettes qui se remplit tout seul, avec une petite horloge au trait, la même dose à la même heure. Vignette menthe : le samoyède en harnais tire une pulka sur une piste qui mène à un refuge au loin, il poursuit un objectif.

Animation : dans la première vignette, la balle part et le chien la rapporte. Dans la deuxième, les croquettes tombent dans la gamelle et l'aiguille avance. Dans la troisième, le chien avance vers le refuge. Les trois bougent en même temps.

## 8. Pause, slides 23 et 34

Fichier : `pause-samoyede.png` puis `pause-samoyede.mp4`.

Image : le samoyède est couché sur un rocher plat, la tête posée sur ses pattes avant, détendu. À côté de lui, une tasse fumante au trait avec une vapeur en volutes teal. Sujet dans la moitié droite, le reste vide.

Animation : le samoyède respire lentement, son flanc se soulève, il cligne des yeux une fois. La vapeur monte en volutes et se dissipe.

## 9. Atelier de classement, slide 26

Fichier : `atelier-samoyede.png` puis `atelier-samoyede.mp4`.

Image : quatre paniers alignés, teal pâle, lavande, menthe et rose pâle. Le samoyède tient une balle dans la gueule et s'apprête à la déposer dans l'un des paniers, quelques balles sont déjà rangées. Tout le dessin tient dans une bande horizontale au centre : le haut et le bas restent vides, car l'image sera recadrée en bandeau.

Animation : le samoyède dépose la balle dans un panier, se retourne, en prend une autre au sol.

## 10. Déjeuner, slide 28

Fichier : `dejeuner-samoyede.png` puis `dejeuner-samoyede.mp4`.

Image : le samoyède est assis, attentif et souriant, devant un sac de randonnée ouvert d'où dépassent une gourde et un sandwich, avec une gamelle à côté de lui. Sujet dans la moitié droite, le reste vide.

Animation : le samoyède penche la tête d'un côté puis de l'autre, ses oreilles se dressent, sa queue balaie le sol.

## 11. Choisir un outil, slide 37

Fichier : `choisir-samoyede.png` puis `choisir-samoyede.mp4`.

Image : deux sacs de randonnée posés côte à côte, l'un énorme et chargé d'objets inutiles qui dépassent, l'autre plus petit et bien rangé. Le samoyède est assis entre les deux et regarde le petit sac. Tout le dessin tient dans une bande horizontale au centre, le haut et le bas restent vides.

Animation : le samoyède regarde le gros sac, penche la tête, puis pose la patte sur le petit sac.

## 12. Un référent par pôle, slide 43

Fichier : `referents-samoyede.png` puis `referents-samoyede.mp4`.

Image : trois samoyèdes encordés montent en file sur une pente douce enneigée. Le premier porte un harnais teal et ouvre la trace, les deux autres suivent dans ses pas. Les harnais des deux suivants sont menthe et lavande.

Animation : les trois chiens avancent ensemble d'un même pas, la corde se tend et se détend légèrement, de nouvelles traces apparaissent derrière eux.

## 13. Ce que vous savez faire maintenant, slide 45

Fichier : `sommet-samoyede.png` puis `sommet-samoyede.mp4`, en format carré 1:1.

Image : le samoyède est assis au sommet d'une montagne aux aplats teal pâle, à côté d'un petit cairn de pierres et d'un fanion menthe. Il regarde au loin, satisfait. Sous lui, le sentier parcouru serpente en pointillés.

Animation : le fanion flotte au vent, la fourrure du samoyède bouge légèrement, il ferme les yeux un instant, comme au soleil.

## 14. Fin de journée et intersession, slide 46

Fichier : `observation-samoyede.png` puis `observation-samoyede.mp4`.

Image : le samoyède renifle des traces de pas dans la neige, la truffe au sol, concentré. À côté de lui, un carnet ouvert avec un crayon, quelques lignes griffonnées sans texte lisible. Sujet dans le tiers inférieur droit, le reste vide pour le texte.

Animation : le samoyède avance de quelques centimètres en reniflant, une nouvelle trace apparaît devant lui. La page du carnet frémit au vent.

## En réserve, si tu valides leur place

Ces trois images n'ont pas encore d'emplacement dans le deck. Dis-moi si tu les veux, et où.

Le harnais, fichier `harnais-samoyede.png` : une image en deux moitiés séparées par un trait vertical en pointillés. À gauche, le samoyède sans harnais court dans tous les sens dans la neige, ses traces dessinent des zigzags. À droite, le même chien en harnais teal, attelé à une pulka, tire droit sur une piste vers un fanion menthe. Animation : à gauche il tourne en rond, à droite il avance régulièrement.

L'erreur sûre d'elle, fichier `limites-samoyede.png` : le samoyède rapporte fièrement une chaussure à une main tendue qui attendait une balle, la balle est restée dans l'herbe derrière lui. Animation : il trotte vers la main, la queue haute, la chaussure dans la gueule.

Le feu vert, fichier `gardefous-samoyede.png` : le samoyède en harnais s'est arrêté net au bord d'un ruisseau, assis, et regarde une main humaine au trait, paume ouverte, qui lui fait signe d'attendre. On ne voit que la main. Animation : l'eau coule, il attend, la main fait un léger geste.

## Ce que ChatGPT ne doit pas fabriquer

Les captures des slides 14, 20, 21, 32 et 33 (Make, Apps Script, projet Claude, Copilot, Lindy) doivent être de vraies captures d'écran de tes outils. Une fausse capture générée par une IA se repère vite, et elle te ferait perdre ta crédibilité devant le groupe, surtout pour des démos de secours.

Les logos de la slide 11 (Microsoft 365 Copilot, Outlook, Excel, Word, Teams) se prennent sur les pages officielles de Microsoft. Un logo régénéré est faux, et il peut poser un problème de droit de marque.

## Si le résultat dérive

Si le chien change d'une image à l'autre : « Reprends exactement le samoyède de la fiche personnage, mêmes proportions, même harnais teal, même trait. » Si des couleurs vives ou des dégradés apparaissent : « Uniquement les six couleurs de la palette, aplats plats, aucun dégradé. » Si du texte apparaît : « Supprime tout texte et toute lettre. » Si le chien devient trop humain : « C'est un chien qui se comporte comme un chien : à quatre pattes, sans vêtement, sans objet tenu comme un humain. »
