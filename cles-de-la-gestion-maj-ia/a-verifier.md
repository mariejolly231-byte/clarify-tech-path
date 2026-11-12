# À vérifier avant la session du 7 décembre 2026

Recherche faite le 12 novembre 2026. Tout ce qui figure sur les slides vient d'une page officielle de l'éditeur, sauf mention contraire dans les notes. Ce fichier liste ce qui n'a pas pu être confirmé à la source, et ce qui peut bouger d'ici la session.

**À faire la veille (dimanche 6 ou vendredi 4 décembre) :** ouvrir ChatGPT (gratuit et payant), Vibe (gratuit), Gemini et Copilot, et contrôler les points marqués « veille » ci-dessous.

---

## Ce que le catalogue de l'organisme cite et qui est dépassé

| Dans le catalogue | Situation au 12 novembre 2026 | Source |
| :-- | :-- | :-- |
| O1, O3 (OpenAI) | Dépassés : la génération GPT-6 a été présentée début septembre 2026, avec des niveaux de réflexion intégrés. Je n'ai **pas** pu vérifier si O1 et O3 sont encore proposés dans ChatGPT : le deck dit « dépassés », jamais « supprimés ». | Forum développeurs OpenAI, annonce GPT-6 Astra ; page Mistral Large 4 qui cite « GPT-6 Astra » |
| R1 (DeepSeek) | Dépassé : l'API de DeepSeek sert DeepSeek-V4-Pro-0813 et DeepSeek-V4.1-Flash-1017, avec un mode réflexion activé par défaut. | api-docs.deepseek.com |
| « Modèles de raisonnement » comme catégorie à part | La réflexion est devenue un réglage dans les modèles principaux (Claude : réflexion adaptative ; DeepSeek : thinking par défaut ; Gemini : Thinking et Deep Think ; Mistral Small 4 : instruction, raisonnement et code dans un seul modèle). | Pages officielles citées dans les notes de la slide 9 et 10 |
| « Le Chat » (Mistral) | Renommé **Vibe** le 28 mai 2026. | mistral.ai/news/vibe-agent |

Suggestion pour l'organisme : mettre à jour la fiche du catalogue avec des formulations qui vieillissent moins vite, par exemple « les modèles actuels et leurs modes de réflexion » plutôt que des noms de modèles.

---

## OpenAI et ChatGPT (pages officielles non lisibles depuis l'environnement de préparation)

Les pages help.openai.com et openai.com ont renvoyé une erreur 403 au client automatique. Les informations ci-dessous viennent de sources secondaires et ne sont **pas** affirmées sur les slides.

- [ ] **Veille.** Noms exacts des modèles dans le sélecteur de ChatGPT (gratuit et payant) : GPT-6 « Astra », « Sol », « Terra » ? Niveaux de réflexion (Instant, Thinking, Pro) ? Sources secondaires : 9to5Mac (4 septembre 2026), annonce sur community.openai.com.
- [ ] **Veille.** Accès à la réflexion sur un compte gratuit (conditionne la variante de l'atelier 1).
- [ ] **Veille.** Projets : disponibles en gratuit ? Nombre de fichiers par projet selon l'offre (les sources secondaires citent 5 en gratuit, 25 en Go et Plus, 40 en Pro et Business, et se contredisent). Règle de mémoire d'un projet partagé (« project-only », irréversible selon une source secondaire).
- [ ] **Veille.** Tâches planifiées : disponibles sur quelle offre ? Une source secondaire cite un lancement le 17 juin 2026 pour Plus, Pro et Teams, des déclencheurs par webhook le 25 août 2026 et une limite de trois tâches actives en gratuit.
- [ ] Nom actuel du mode agent : « ChatGPT Work » (présenté le 9 juillet 2026 selon une source secondaire) a-t-il remplacé « ChatGPT agent » ? Le deck dit seulement « le mode agent ».
- [ ] Agents d'espace de travail (« workspace agents ») : lancés le 22 avril 2026 en aperçu pour Business, Enterprise, Edu et Teachers, présentés comme successeurs des GPT personnalisés (9to5Mac). Les GPT personnalisés sont-ils toujours créables en Plus et en gratuit ?
- [ ] Modèle de génération d'images de ChatGPT : une source secondaire cite « GPT Image 2.6 » (4 novembre 2026). Le deck ne cite pas de version.
- [ ] Mode d'enregistrement (« Record ») pour les comptes rendus : offres concernées et plateformes (macOS seulement ?). Non cité sur les slides.
- [ ] Prix des offres ChatGPT en euros (Go, Plus, Pro, Business) : des sites français citent 8 €, 23 € TTC, environ 103 € et 21 à 26 € par utilisateur. Non cités sur les slides.

## Sora (OpenAI, vidéo)

- [ ] Une source secondaire indique l'arrêt de l'application Sora le 26 avril 2026 et de son API en septembre 2026. **Non vérifié** : Sora n'est pas présenté sur les slides. À confirmer avant d'en parler si un stagiaire pose la question.

## Mistral

- [ ] Prix en euros des offres Vibe : la page mistral.ai/pricing affiche par défaut 14,99 $ HT par mois (Pro) et 24,99 $ HT par utilisateur et par mois (Team), avec un sélecteur d'euros côté navigateur. Relire le prix en euros avant d'en parler.
- [ ] Partenaire technique de la génération d'images dans Vibe : en 2025, c'était Black Forest Labs (FLUX). Non confirmé sur une page Mistral de 2026 : non cité sur les slides.
- [ ] **Veille.** Nom de l'option de réflexion dans Vibe gratuit (la page tarifs parle de « extended thinking » plus généreux en Pro).
- [ ] Mistral Medium 3.5 (annoncé le 22 mai 2026) apparaît dans la documentation avec une date de fin de vie : il ne faut pas le présenter comme le modèle actuel. Le deck cite Large 4 et Small 4.
- [ ] Mistral Large 4 : aperçu le 6 octobre 2026, poids annoncés « fin du mois » ; le billet du 29 octobre (« Le Chonk ») annonce la publication des poids. Vérifier que Large 4 est bien proposé dans Vibe (le deck dit seulement que Vibe utilise les modèles phares de Mistral).

## Google

- [ ] **Veille.** Gemini 4 Argon : accès réservé aux offres Google AI Pro et Ultra (notes de version du 13 octobre 2026). Vérifier qu'il est disponible en France.
- [ ] Version actuelle de Nano Banana (le modèle d'images) : la page Google DeepMind ne donne pas de numéro. Non cité.
- [ ] Gemini Omni (vidéo) : « Feature availability varies by region ». Vérifier la disponibilité en France si on le montre.
- [ ] Les « Gems » sont remplacés par les « skills » (notes du 30 septembre 2026) : vérifier le nom en français dans l'interface (« compétences » ?).

## Outils image, vidéo, audio

- [ ] Midjourney : version actuelle (V8 ou V8.2 selon des sources secondaires). Page officielle bloquée (403). Non cité avec un numéro.
- [ ] Kling et Runway : versions actuelles non vérifiables (sites bloqués depuis l'environnement de préparation). Non cités sur les slides.
- [ ] Veo : la page Google DeepMind présente Veo 3.1. Vérifier qu'aucune version plus récente n'est sortie entre-temps.

## Comptes rendus de réunion

- [ ] Noota (outil français) : site bloqué depuis l'environnement de préparation. Offres, hébergement et prix non vérifiés : à ajouter sur la slide 34 seulement après vérification, s'il est cité dans les réponses au questionnaire.
- [ ] Fireflies : la page tarifs affiche 10 $ et 19 $ par utilisateur et par mois en facturation annuelle (Pro et Business). Non cité en chiffres sur la slide.
- [ ] Teams : quel niveau de licence Copilot est nécessaire pour le récapitulatif intelligent, selon les licences des stagiaires.

## Microsoft Copilot

- [ ] **Veille.** Les modes Réponse rapide, Réponse approfondie et Automatique ont été relevés en novembre 2026 sur Copilot Business lors de la préparation d'une autre formation. Vérifier sur la licence des stagiaires concernés.
