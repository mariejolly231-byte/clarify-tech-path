# Préparer les démos du 17 novembre dans Copilot Business, avec le corpus fictif Lagarrigue

Objectif : montrer un assistant et un agent qui travaillent sur des documents qui ressemblent à ceux de Lagarrigue, sans construire leurs solutions à leur place. Le corpus est fictif : aucune donnée réelle de client ou de salarié.

## 1. Avant tout : ranger le corpus

1. Dans OneDrive (le compte Microsoft 365 avec lequel tu feras les démos), crée un dossier « Formation Lagarrigue · corpus fictif ».
2. Dépose-y les fichiers du corpus (grille tarifaire, études de prix exemples, conditions de reprise, etc.). Garde des noms de fichiers clairs : Copilot les retrouve plus facilement.
3. Vérifie que ce compte a bien une licence Microsoft 365 Copilot (dans Copilot, l'onglet « Travail » doit apparaître).

## 2. Démo assistant : une demande structurée avec des documents

1. Ouvre Copilot (application Microsoft 365 Copilot, ou m365copilot.com), onglet Travail, nouvelle conversation.
2. Écris la demande en quatre ingrédients : objectif, contexte, sources, attentes.
3. Pour les sources, tape « / » puis le nom du fichier du corpus (par exemple la grille tarifaire). Copilot l'ajoute à la demande.
4. Montre la réponse, puis relance avec une précision (« ajoute la reprise », « présente-le en tableau »).
5. Ce qu'on commente : ce que ça fait (une étude en une minute), ce que ça demande (une bonne consigne, les bons fichiers), ce que ça ne fait pas (vérifier qu'un tarif existe vraiment, décider de l'envoi).

Variante bloc-notes : Copilot, Blocs-notes, nouveau bloc-notes, ajoute les fichiers du dossier comme références. Utile pour montrer plusieurs documents croisés.

## 3. Démo agent : l'agent des études de prix (Agent Builder)

1. Copilot, menu Assistants, Nouvel agent.
2. Choisis de le configurer toi-même (onglet Configurer).
3. Nom : « Études de prix (démo) ». Description : une phrase.
4. Instructions : colle le prompt très structuré du pas-à-pas (page 5 « Ses instructions : très structurées »), en remplaçant les crochets par les éléments du corpus.
5. Connaissances : ajoute les fichiers du dossier OneDrive du corpus (grille, conditions de reprise, études exemples). Si possible, désactive la recherche web pour qu'il ne s'appuie que sur le corpus.
6. Requêtes suggérées : « Prépare l'étude de prix de cette demande », « Vérifie le total de cette étude ».
7. Crée l'agent, puis teste dans le volet de droite : une demande normale, puis une demande interdite (« Envoie l'étude au client ») : il doit refuser.
8. Ce qu'on commente : les mêmes trois questions que pour l'assistant, et la différence avec la démo 2 (les consignes et les documents sont rangés une fois pour toutes, réutilisables par l'équipe).

## 4. L'automatisation simple déclenchée par un courriel (2 minutes, sans Workflows)

Le programme CFD annonce cette démo. Pour la tenir sans Workflows, une règle Outlook suffit :
Outlook, Paramètres, Courrier, Règles, Ajouter une règle. Condition : l'objet contient « Facture ». Action : déplacer vers le dossier « Factures fournisseurs ».
On envoie un e-mail de test : il se range seul. C'est l'occasion de dire ce qu'elle ne fait pas : elle ne lit pas la facture, elle suit une règle fixe.

## 5. La veille de la séance

- Refaire chaque démo de bout en bout, sur le compte et le poste de la salle si possible.
- Faire une capture de chaque étape : plan B si le réseau ou la licence coince.
- Vérifier que les menus portent les mêmes noms : Microsoft les renomme régulièrement.
- Fermer les conversations et agents personnels avant de projeter.
