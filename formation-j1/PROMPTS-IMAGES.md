# Prompts pour recréer les illustrations du deck avec le samoyède

Méthode : une seule conversation ChatGPT pour toute la série. Colle d'abord le bloc « Style commun », puis la fiche personnage, valide-la, et demande ensuite chaque image dans la même conversation en rappelant « même personnage, même style ». Pour l'animation, ouvre chaque image validée dans l'outil vidéo de ChatGPT et colle son prompt d'animation.

Formats à demander : images en 16:9, 1920 x 1080, PNG. Vidéos de 6 secondes, en boucle, 1920 x 1080, MP4, sans son. Dépose les fichiers dans `src/images/` avec le nom indiqué : je les intègre en boucle muette dans les slides, avec l'image fixe en secours.

## Style commun (à coller en premier)

Tu vas créer une série d'illustrations pour une formation professionnelle de Summit Flow, un cabinet qui accompagne des PME sur l'IA et l'automatisation. Style unique pour toute la série : dessin à main levée façon tableau blanc Excalidraw, trait d'encre anthracite #2A2F33 légèrement irrégulier, aplats de couleur pastel posés comme un surligneur qui déborde un peu du trait. Palette stricte : teal #0B4F5C pour les accents, menthe #D6F1E6, teal pâle #D5EAEC, lavande #E6E0F4, rose pâle #FCE4E8, fond blanc cassé uni #FAF8F3. Pas de dégradé, pas d'ombre réaliste, pas de 3D, pas de texte dans l'image, pas de logo. Beaucoup d'espace vide, composition aérée, un seul sujet principal. Ton chaleureux, simple, professionnel, jamais enfantin.

## 0. Fiche personnage (à valider avant tout)

Fichier : `samoyede-fiche.png`

Crée la fiche de référence du personnage de la série : un samoyède adulte, fourrure blanc crème très dense et duveteuse, oreilles triangulaires dressées, yeux noirs en amande, le fameux sourire du samoyède, queue touffue enroulée sur le dos. Il porte un harnais de randonnée teal #0B4F5C. Montre-le sous quatre angles sur fond blanc cassé uni : de face assis, de profil debout, de trois quarts en marche, couché. Même trait, mêmes proportions, même harnais sur les quatre vues. Les ombres de la fourrure sont faites avec des touches teal pâle #D5EAEC, jamais en gris.

## 1. Couverture

Fichier : `couverture-samoyede.png` puis `couverture-samoyede.mp4`

Image : Le samoyède de la fiche, vu de trois quarts, avance sur un sentier en lacets dessiné en pointillés qui monte vers un sommet aux aplats teal pâle et menthe. Il est placé dans le tiers droit et le tiers inférieur de l'image : toute la moitié gauche reste vide, en blanc cassé, pour accueillir le titre. Deux ou trois petits nuages au trait.

Animation : Anime cette image en boucle parfaite de 6 secondes, caméra fixe. Le samoyède marche sur place sur le sentier, sa queue remue doucement, ses oreilles bougent à chaque pas. Les nuages glissent lentement vers la droite. Le trait garde son aspect dessiné à la main, avec un léger frémissement. Aucun nouvel élément, aucun texte, la moitié gauche reste vide. La dernière image est identique à la première.

## 2. Pause

Fichier : `pause-samoyede.png` puis `pause-samoyede.mp4`

Image : Le samoyède est couché sur un rocher plat, la tête posée sur ses pattes avant, détendu. À côté de lui, une tasse fumante au trait, avec une vapeur en volutes teal. Sujet dans le tiers droit, le reste vide en blanc cassé.

Animation : Boucle parfaite de 6 secondes, caméra fixe. Le samoyède respire lentement, son flanc se soulève, il cligne des yeux une fois. La vapeur de la tasse monte en volutes et se dissipe. Rien d'autre ne bouge. Dernière image identique à la première.

## 3. Déjeuner

Fichier : `dejeuner-samoyede.png` puis `dejeuner-samoyede.mp4`

Image : Le samoyède est assis, attentif et souriant, devant un sac de randonnée ouvert d'où dépassent une gourde et un sandwich, et une gamelle à côté de lui. Sujet dans le tiers droit, le reste vide.

Animation : Boucle parfaite de 6 secondes, caméra fixe. Le samoyède penche la tête d'un côté puis de l'autre, ses oreilles se dressent, sa queue balaie le sol. Dernière image identique à la première.

## 4. Le harnais (pour la slide du modèle et du harnais)

Fichier : `harnais-samoyede.png` puis `harnais-samoyede.mp4`

Image : Une image en deux moitiés séparées par un trait vertical en pointillés. À gauche, le samoyède sans harnais court dans tous les sens dans la neige : ses traces de pattes dessinent des zigzags désordonnés, de petits traits de mouvement autour de lui. À droite, le même samoyède porte son harnais teal, attelé à une petite pulka de randonnée sur une piste droite : ses traces sont alignées, il tire dans une seule direction, vers un fanion menthe au loin. Même force, même chien, deux résultats.

Animation : Boucle parfaite de 6 secondes, caméra fixe. À gauche, le samoyède tourne en rond et les traces en zigzag apparaissent puis s'effacent. À droite, il avance régulièrement en tirant la pulka, les traces droites se dessinent derrière lui. Les deux moitiés bougent en même temps. Dernière image identique à la première.

## 5. Garde-fous

Fichier : `gardefous-samoyede.png` puis `gardefous-samoyede.mp4`

Image : Le samoyède, en harnais, s'est arrêté net au bord d'un ruisseau de montagne, assis, et regarde vers une main humaine dessinée au trait à droite de l'image, paume ouverte, qui lui fait signe d'attendre. On ne voit que la main, pas la personne. Il attend le feu vert avant de traverser.

Animation : Boucle parfaite de 6 secondes, caméra fixe. L'eau du ruisseau coule en petites lignes teal, le samoyède reste assis, sa queue remue, il lève les yeux vers la main. La main fait un léger mouvement de « attends ». Dernière image identique à la première.

## 6. Intersession et fin de journée

Fichier : `observation-samoyede.png` puis `observation-samoyede.mp4`

Image : Le samoyède renifle des traces de pas dans la neige, la truffe au sol, concentré. À côté de lui, un carnet ouvert avec un crayon, quelques lignes griffonnées sans texte lisible. Sujet dans le tiers droit, le reste vide pour le texte.

Animation : Boucle parfaite de 6 secondes, caméra fixe. Le samoyède avance de quelques centimètres en reniflant, sa truffe suit les traces, une nouvelle trace apparaît devant lui. La page du carnet frémit au vent. Dernière image identique à la première.

## Si le résultat dérive

Si le chien change d'une image à l'autre, rappelle : « Reprends exactement le samoyède de la fiche personnage, mêmes proportions, même harnais teal, même trait. » Si des couleurs vives ou des dégradés apparaissent : « Uniquement les six couleurs de la palette, aplats plats, aucun dégradé. » Si du texte apparaît dans l'image : « Supprime tout texte et toute lettre. »
