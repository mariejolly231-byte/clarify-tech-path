/**
 * Grille d'audit Maison Lagarrigue : crée le formulaire Google en un clic,
 * et envoie chaque réponse par e-mail à Marie Jolly.
 *
 * Mode d'emploi :
 * 1. script.google.com > Nouveau projet > coller ce fichier.
 * 2. Exécuter creerGrille() une seule fois et accepter les autorisations.
 * 3. Le lien du formulaire s'affiche dans le journal d'exécution : l'envoyer à Claude
 *    pour générer le QR code du deck, ou le coller dans un générateur de QR code.
 * Chaque envoi déclenche ensuite envoyerReponse(), qui t'écrit un e-mail récapitulatif.
 */
const DESTINATAIRE = 'contact@summitflow.fr';

const CAS_DE_MARS = [
  'Commerce · Commissions des vendeurs itinérants',
  'Commerce · Contrôle des études de prix, vente et reprise',
  'Commerce · Estimation des reprises',
  'Commerce · Ciblage de clients pour les démonstrations',
  'Commerce · Trouver un produit chez un fournisseur',
  'RH et compta · Variables de salaire',
  'RH et compta · Vérification des paiements clients pour les commissions',
  'RH et compta · Trésorerie quotidienne, factures reçues par e-mail',
  'RH et compta · Saisie des pointages, du papier au logiciel',
  'Communication · Planning de communication',
  'Communication · Optimisation des bases de données pour la communication',
  'Direction · Création de tableaux de bord',
  'Direction · Analyse des tableaux de bord',
  'Direction · Présentations PowerPoint',
  'Une autre tâche',
];

function creerGrille() {
  const form = FormApp.create("Grille d'audit · Maison Lagarrigue");
  form.setDescription(
    "Une réponse par tâche : renvoie le formulaire autant de fois que tu as de tâches (trois à cinq par pôle).\n" +
    "On décrit la tâche, pas son contenu : aucune donnée réelle de client ou de salarié.\n" +
    "À envoyer au plus tard début janvier, avant le jour 2 du 22 janvier."
  );
  form.setCollectEmail(false);
  form.setProgressBar(true);
  form.setConfirmationMessage("Merci, ta tâche est bien envoyée. Tu peux en ajouter une autre avec le lien ci-dessous.");
  form.setShowLinkToRespondAgain(true);

  form.addSectionHeaderItem().setTitle('Qui et quoi');
  form.addMultipleChoiceItem().setTitle('Ton pôle').setChoiceValues(['Commerce', 'RH et compta', 'Communication', 'Direction', 'Autre']).setRequired(true);
  form.addTextItem().setTitle('Ton prénom');
  form.addListItem().setTitle('La tâche').setHelpText('Les cas repérés en mars, ou une autre tâche.').setChoiceValues(CAS_DE_MARS).setRequired(true);
  form.addTextItem().setTitle('Si c\'est une autre tâche, laquelle ?');

  form.addSectionHeaderItem().setTitle('Comment ça se passe aujourd\'hui');
  form.addParagraphTextItem().setTitle('1. Le déroulé actuel')
    .setHelpText("Chaque étape dans l'ordre : qui la fait, avec quel outil, en combien de temps. Comme tu l'expliquerais à un remplaçant.")
    .setRequired(true);
  form.addMultipleChoiceItem().setTitle('2. À quelle fréquence ?')
    .setChoiceValues(['Plusieurs fois par jour', 'Chaque jour', 'Chaque semaine', 'Chaque mois', 'Ponctuellement']).setRequired(true);
  form.addTextItem().setTitle('2. Combien de temps à chaque fois ?').setHelpText('Une estimation suffit : 20 minutes, 2 heures, une demi-journée…');
  form.addTextItem().setTitle('3. Les personnes impliquées').setHelpText('Les fonctions, pas les noms.');
  form.addTextItem().setTitle('4. Les outils et documents').setHelpText('Outlook, Excel, logiciel métier, papier…');
  form.addParagraphTextItem().setTitle('5. Le déclencheur et le résultat').setHelpText("Qu'est-ce qui lance la tâche ? Qu'obtient-on à la fin ?");
  form.addMultipleChoiceItem().setTitle('6. La part de jugement humain')
    .setHelpText('Faut-il lire, interpréter ou décider à une étape ?')
    .setChoiceValues(['Aucune : des règles fixes', 'Un peu', 'Beaucoup']).setRequired(true);
  form.addMultipleChoiceItem().setTitle('7. La sensibilité des données')
    .setChoiceValues(['Aucune donnée sensible', 'Des données internes', 'Des données personnelles ou clients']).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Le déroulé est-il clair et stable aujourd\'hui ?')
    .setHelpText("On n'outille pas une tâche qui change à chaque fois : on la clarifie d'abord.")
    .setChoiceValues(['Oui', 'Pas vraiment', 'Non']);

  form.addSectionHeaderItem().setTitle('Ce que ça coûte, ce qu\'on en attend');
  form.addCheckboxItem().setTitle('Ce que la tâche fait perdre aujourd\'hui')
    .setChoiceValues(['Du temps', 'Des erreurs à corriger', 'Des délais pour le client ou l\'équipe', 'De la frustration']);
  form.addParagraphTextItem().setTitle('8. Le bénéfice attendu');
  form.addListItem().setTitle('9. Le type de solution pressenti')
    .setHelpText("Voir l'arbre « Quelle brique pour quelle tâche ? » du jour 1.")
    .setChoiceValues(['Une demande', 'Un bloc-notes', 'Cowork', 'Un flux Power Automate', 'Une demande planifiée', 'Une requête enregistrée', 'Un agent Copilot', 'Je ne sais pas encore']);
  form.addParagraphTextItem().setTitle('Une remarque, une question ?');

  ScriptApp.newTrigger('envoyerReponse').forForm(form).onFormSubmit().create();
  Logger.log('Lien à partager (QR code) : ' + form.getPublishedUrl());
  Logger.log('Lien de modification : ' + form.getEditUrl());
}

function envoyerReponse(e) {
  const reponses = e.response.getItemResponses();
  const get = (debut) => {
    const r = reponses.find((x) => x.getItem().getTitle().indexOf(debut) === 0);
    return r ? String(r.getResponse()) : '';
  };
  const corps = reponses.map((r) => {
    const v = r.getResponse();
    return r.getItem().getTitle() + ' :\n' + (Array.isArray(v) ? v.join(', ') : v) + '\n';
  }).join('\n');
  MailApp.sendEmail({
    to: DESTINATAIRE,
    subject: "Grille d'audit Lagarrigue · " + get('La tâche') + ' (' + get('Ton pôle') + ')',
    body: corps + '\nEnvoyé le ' + Utilities.formatDate(new Date(), 'Europe/Paris', 'dd/MM/yyyy HH:mm'),
  });
}
