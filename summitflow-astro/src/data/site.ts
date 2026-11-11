export const SITE = {
  name: 'Summit Flow',
  url: 'https://www.summitflow.fr',
  calendly: 'https://calendly.com/summitflowfr/30min',
  email: 'contact@summitflow.fr',
  linkedin: 'https://www.linkedin.com/in/mariejolly',
  promesse: 'Moins de bordel organisé. Plus de flux simples pour que l’industrie respire.',
};

/** L'offre tient en deux axes. La spécialité aéronautique s'appuie sur l'axe 2. */
export const AXES = [
  {
    num: '1',
    href: '/formation-no-code-ia',
    titre: 'Formation no-code et IA',
    court: 'Des équipes qui savent utiliser l’IA et les outils no-code sur leurs vrais cas, et qui restent autonomes.',
    pour: 'Dirigeants, équipes terrain, organismes de formation',
    contenu: [
      'Ateliers de découverte de l’IA générative et du no-code',
      'Formations sur mesure à partir de vos situations réelles',
      'Interventions en sous-traitance pour les organismes de formation',
      'Cadre RGPD et AI Act intégré à chaque parcours',
    ],
    note: 'Financement OPCO ou CPF possible selon les sessions.',
  },
  {
    num: '2',
    href: '/audit-automatisation-pme-industrielles',
    titre: 'Audit et mise en place d’outils',
    court: 'On regarde votre terrain, on décide ensemble quoi simplifier, puis je construis les outils et je les mets en service.',
    pour: 'PME industrielles et techniques',
    contenu: [
      'Audit IA et process : cartographie des flux, des outils et des ressaisies',
      'Plan d’action priorisé, sans achat de logiciel imposé',
      'Mise en place : automatisations, applications no-code, agents IA',
      'Passation et prise en main par vos équipes',
    ],
    note: 'L’audit peut se faire seul. La mise en place démarre toujours par lui.',
  },
] as const;

export const SPECIALITE = {
  href: '/sous-traitants-aeronautiques',
  titre: 'Sous-traitants aéronautiques',
  court: 'APQP, AS9100, PPAP : des livrables qualité qui ne reposent plus sur Excel et sur le mail.',
};

export const NAV = [
  { href: '/occitanie-toulouse', label: 'Occitanie' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/ressources', label: 'Ressources' },
  { href: '/contact', label: 'Contact' },
] as const;
