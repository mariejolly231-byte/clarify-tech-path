# Préparer les démos du 17 novembre dans Copilot Business, avec le corpus fictif Lagarrigue

Objectif : montrer un assistant et un agent qui travaillent sur des documents qui ressemblent à ceux de Lagarrigue, sans construire leurs solutions à leur place. Le corpus est fictif : aucune donnée réelle de client ou de salarié.

Le corpus (5 fichiers) :

| Fichier | Sert à |
|---|---|
| 01_tableau_de_bord_octobre_2026_FICTIF.xlsx | Démo assistant (pôle direction : analyse des tableaux de bord) |
| 02_guide_lecture_indicateurs_FICTIF.docx | Démo assistant : définitions, seuils d'alerte, format de synthèse attendu |
| 03_catalogue_alpha / bravo / charlie_FICTIF.xlsx | Démo agent (pôle commerce : trouver un produit chez un fournisseur) et exercice « Trouvez les erreurs » (slide 48) |

## 1. Avant tout : ranger le corpus au bon endroit

Copilot Business ne lit que le OneDrive du compte Microsoft 365, pas le OneDrive personnel.

1. Ouvre OneDrive avec le compte Microsoft 365 de la démo (celui de summitflow232, ou le compte prêté par Lagarrigue).
2. Crée un dossier « Formation Lagarrigue · corpus fictif » et dépose-y les cinq fichiers.
3. Vérifie que l'onglet « Travail » apparaît dans Copilot : c'est le signe que la licence est active.

## 2. Démo assistant : la synthèse du tableau de bord d'octobre

Ce qu'on montre : un assistant à qui l'on donne des consignes et des documents de référence.

1. Copilot, onglet Travail, nouvelle conversation.
2. Demande structurée (objectif, contexte, sources, attentes) :

   « Tu prépares la synthèse mensuelle du tableau de bord pour la réunion de direction de Maison Lagarrigue.
   Contexte : la synthèse est relue par la direction avant d'être diffusée.
   Sources : /01_tableau_de_bord_octobre_2026_FICTIF et /02_guide_lecture_indicateurs_FICTIF. Applique les seuils d'alerte du guide.
   Attentes : une page maximum, au format décrit dans le guide : trois chiffres clés, ce qui progresse, ce qui se dégrade, les écarts par site, puis les questions à poser aux responsables. Chaque chiffre renvoie à une ligne du tableau. Si une donnée paraît incohérente ou en double, signale-la sans la corriger. »

   Tape « / » puis le nom du fichier pour l'ajouter comme source.
3. Ce que la réponse doit faire ressortir (les pièges du corpus, à vérifier en direct) :
   - Site Est en rouge : rupture magasin 14,2 % (seuil 10 %) et marge pièces 22,4 % (seuil 24 %) ;
   - Site Sud : délai SAV 6,1 jours (rouge) et ordres de réparation en chute, de 83 à 58 ;
   - encours de plus de 60 jours à 96,2 k€ (orange), CA atelier à 158,8 k€ sous l'objectif de 165 ;
   - dans l'onglet des commandes : la ligne du 1er octobre (Client 15, lame de broyeur) apparaît deux fois, et la ligne du 29 octobre affiche 13,95 € pour 3 roulements à 46,50 €, au lieu de 139,50 €.
4. Si Copilot rate un piège, c'est encore mieux pour la séance : on montre que la relecture fait partie du travail.
5. Ce qu'on commente : ce que ça fait (une synthèse en une minute), ce que ça demande (une consigne claire, le bon guide), ce que ça ne fait pas (expliquer les causes : il formule des hypothèses à vérifier).

Variante bloc-notes : Copilot, Blocs-notes, nouveau bloc-notes, ajoute le tableau et le guide comme références, puis la même demande. Utile pour montrer qu'on retrouve ses documents d'un mois sur l'autre.

## 3. Démo agent : l'agent de comparaison fournisseurs (Agent Builder)

Ce qu'on montre : un agent qui enchaîne plusieurs étapes (lire la demande, chercher dans trois catalogues, appliquer les conditions, comparer, recommander) et qui s'arrête avant de commander.

1. Copilot, menu Assistants, Nouvel agent, onglet Configurer.
2. Nom : « Comparateur fournisseurs (démo) ». Description : « Compare les catalogues fournisseurs pour une demande de pièces. »
3. Instructions :

   « Rôle : tu es l'assistant achats du magasin pièces de Maison Lagarrigue, concession de matériel agricole.
   Tâche : pour chaque demande de pièces, 1. retrouve chaque pièce dans les trois catalogues grâce à la référence d'origine équivalente (OEM) ; 2. calcule le total HT par fournisseur ; 3. applique les conditions de l'onglet Conditions : remise quantité, franco de port et frais de port, commande minimum ; 4. vérifie le stock disponible pour chaque ligne et le délai de réapprovisionnement en cas de rupture ; 5. présente la comparaison.
   Format : un tableau par fournisseur (total HT, frais de port, remise appliquée, délai de livraison réel, lignes en rupture), puis une recommandation argumentée en deux phrases, puis les points à vérifier.
   Limites : tu n'inventes aucun prix ni aucune condition : ce qui n'est pas dans les catalogues, tu le signales. Tu ne passes jamais de commande et tu ne contactes aucun fournisseur : la décision revient au magasinier. »
4. Connaissances : ajoute les trois catalogues depuis le dossier OneDrive. Désactive la recherche web si l'option existe, pour qu'il ne s'appuie que sur le corpus.
5. Requêtes suggérées : « Compare les fournisseurs pour cette commande », « Quel fournisseur peut tout livrer en moins de 5 jours ? ».
6. Créer, puis tester dans le volet de droite :
   - demande normale : « 6 filtres hydrauliques, 10 filtres à air primaire, 20 filtres à huile moteur, au meilleur prix et vite ». Réponse attendue : Bravo à 592,80 € HT après remise de 5 % (36 articles), livré en 4 jours ; Charlie à 592,40 € mais seulement 4 filtres hydrauliques en stock, réapprovisionnement en 15 jours ; Alpha à 627 € en 2 jours.
   - demande interdite : « Passe la commande chez Bravo. » L'agent doit refuser.
7. Ce qu'on commente : les mêmes trois questions que pour l'assistant, et la différence : l'agent enchaîne les étapes seul, avec ses consignes et ses catalogues rangés une fois pour toutes.

L'exercice « Trouvez les erreurs » (slide 48) reprend exactement cette demande : la version fautive oublie la remise de Bravo et le stock de Charlie.

## 4. L'automatisation simple déclenchée par un courriel (2 minutes, sans Workflows)

Le programme CFD annonce cette démo. Une règle Outlook suffit :
Outlook, Paramètres, Courrier, Règles, Ajouter une règle. Condition : l'objet contient « Facture ». Action : déplacer vers le dossier « Factures fournisseurs ».
On envoie un e-mail de test : il se range seul. Ce qu'elle ne fait pas : elle ne lit pas la facture, elle suit une règle fixe.

## 5. La veille de la séance

- Refaire chaque démo de bout en bout, sur le compte et le poste de la salle si possible.
- Faire une capture de chaque étape : plan B si le réseau ou la licence coince.
- Vérifier que les menus portent les mêmes noms : Microsoft les renomme régulièrement.
- Fermer les conversations et agents personnels avant de projeter.
