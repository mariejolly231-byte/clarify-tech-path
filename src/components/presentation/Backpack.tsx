import { useState } from "react";
import { Section } from "./Section";
import logoAsset from "@/assets/summit-flow-logo.png.asset.json";
import { PARTICIPANTS } from "@/lib/participants";

const PROMPT = `Tu es mon assistant d'organisation.
Je suis [métier].
Je veux gagner du temps sur cette tâche : [tâche].
Contexte : [client / canal / fréquence].
Mon objectif : [résultat attendu].
Contraintes : [ton, délai, confidentialité, outils].

À partir de cela, donne-moi :
1. la version simplifiée du processus actuel,
2. ce qui peut être fait manuellement, assisté par IA, ou automatisé,
3. un modèle prêt à l'emploi pour aujourd'hui,
4. les risques RGPD ou qualité à vérifier avant usage.`;

const CHECKLIST = [
  "J'ai compris la différence entre no-code, IA, automatisation, agent, API et MCP",
  "J'ai vu comment une IA fonctionne vraiment (et ce qu'elle ne fait pas)",
  "J'ai une méthode pour décider si j'automatise ou pas (les 6 questions)",
  "J'ai construit ma première automatisation (le raccourci vocal)",
  "J'ai vu une IA connectée à Gmail en direct",
  "J'ai réfléchi à un vrai problème de mon activité avec une piste de solution concrète",
  "Je sais classer mes données (C0 → C3) et choisir mes outils en conséquence",
];

const MEMOS = [
  {
    icon: "📝",
    title: "Faire un bon prompt",
    bg: "bg-accent/40 border-accent",
    body: `1. Donne un rôle à l'IA
2. Décris le contexte précis
3. Donne des exemples si possible
4. Précise le format de sortie attendu
5. Itère — un bon prompt se travaille

→ Commence par : "Tu es [rôle]. Dans ce contexte : [contexte]. Fais [action] sous forme de [format]."`,
  },
  {
    icon: "🔐",
    title: "Se poser la question RGPD",
    bg: "bg-caution/10 border-caution/40",
    body: `Avant chaque outil, demande-toi :
• C'est quelle donnée ? (C0/C1/C2/C3)
• Où est-ce que ça transite ?
• Qui y a accès ?
• Il y a une validation humaine ?

Si tu hésites → C'est C2 minimum.
Cadre d'abord, outil ensuite.`,
  },
  {
    icon: "🧪",
    title: "Tester avant d'acheter",
    bg: "bg-sky/10 border-sky/30",
    body: `Tous les outils cités aujourd'hui ont une version gratuite ou d'essai.

La règle :
→ 30 jours de test sur un vrai cas
→ Un seul outil à la fois
→ Si tu ne l'utilises pas en semaine 2, tu n'en auras pas besoin

Freelance Stack → deals négociés sur 800+ outils 💡`,
  },
  {
    icon: "🗺️",
    title: "Auditer avant d'automatiser",
    bg: "bg-accent/40 border-accent",
    body: `Les 6 questions avant tout outil :
1. Quel irritant précis ?
2. Quelle fréquence ?
3. Quelles données entrent ?
4. Quel résultat attendu ?
5. Données sensibles ?
6. Validation humaine nécessaire ?

Si tu ne peux pas répondre à toutes → clarifie le process d'abord.`,
  },
];

type Level = {
  badge: string;
  color: string;
  title: string;
  cards: { title: string; body: string; tools: string; link?: { label: string; href: string } }[];
};

const LEVELS: Level[] = [
  {
    badge: "🟢 Niveau « Premiers pas »",
    color: "border-l-4 border-l-emerald-500",
    title: "Je structure mon quotidien",
    cards: [
      {
        title: "Faire son assistant IA personnel",
        body: `Ouvre Claude, ChatGPT ou Gemini. Crée un projet ou un GPT personnalisé.
Donne-lui :
• Ton activité et tes clients types
• Ton ton de communication
• Tes tâches récurrentes
→ Il devient ton copilote quotidien.
Temps : 30 min. Coût : 0€ à 20€/mois.`,
        tools: "Claude / ChatGPT / Gemini",
      },
      {
        title: "Faire son carnet de marque IA",
        body: `Décris à ton IA :
• Ton activité en 3 phrases
• Ton client idéal
• Ton ton (chaleureux, expert, direct...)
• 3 exemples de phrases que tu aimes
→ Colle ça dans chaque conversation ou dans les instructions système.
Temps : 45 min. Coût : 0€.`,
        tools: "Claude / ChatGPT / Notion AI",
      },
      {
        title: "Connecter son IA à ses outils (MCP)",
        body: `Suis le guide selon ton IA :
→ Claude : onglet Intégrations → Gmail + Drive
→ Gemini : natif avec Google
→ ChatGPT : connecteur Gmail (Plus)
Résultat : ton IA lit tes mails, ton agenda, tes fichiers.
Temps : 15 min. Coût : 0€ à 20€/mois.`,
        tools: "Claude / ChatGPT / Gemini",
      },
      {
        title: "NotebookLM — ton IA sur tes docs",
        body: `Charge tes documents (PDF, sites, notes). NotebookLM les lit et répond à tes questions.
Cas d'usage :
• Résumer un contrat
• Préparer un devis depuis tes notes
• Créer un FAQ depuis ta doc
Temps : 20 min. Coût : 0€ (Google).`,
        tools: "NotebookLM (Google)",
        link: { label: "Démo NotebookLM", href: "[LIEN_NOTEBOOKLM_PLACEHOLDER]" },
      },
    ],
  },
  {
    badge: "🟡 Niveau « Je structure mon activité »",
    color: "border-l-4 border-l-amber-500",
    title: "J'organise et j'automatise",
    cards: [
      {
        title: "Créer sa base client no-code",
        body: `Notion ou Airtable selon ton besoin.
Commence simple : Nom / Contact / Statut / Dernière action / Notes.
→ Tu y accèdes depuis ton téléphone.
→ Tu n'oublies plus personne.
Temps : 1h. Coût : 0€ à 10€/mois.`,
        tools: "Notion / Airtable",
      },
      {
        title: "Première automatisation Make",
        body: `Cas starter recommandé :
Formulaire de contact (Tally) → Ligne dans Airtable → Email de confirmation auto

Toutes les pièces sont gratuites.
Temps : 2h (avec tuto). Coût : 0€.`,
        tools: "Tally + Airtable + Make",
        link: { label: "Démo notes de frais", href: "[LIEN_NOTES_FRAIS_PLACEHOLDER]" },
      },
      {
        title: "Ses skills et instructions IA",
        body: `Dans Claude ou ChatGPT : crée des instructions personnalisées pour chaque type de tâche récurrente.
Exemples :
• "Quand je dis DEVIS → génère ce format"
• "Quand je dis POST → ton LinkedIn"
→ Tu gagnes 10 min par tâche.
Temps : 1h. Coût : 0€.`,
        tools: "Claude / ChatGPT",
      },
      {
        title: "Espace Notion couplé à une autom",
        body: `Exemple concret : la tréso numérique.
Un espace Notion qui se met à jour automatiquement depuis tes factures.
→ Voir la démo en live.`,
        tools: "Notion + Make",
        link: { label: "Démo tréso Notion", href: "[LIEN_TRESO_NOTION_PLACEHOLDER]" },
      },
    ],
  },
  {
    badge: "🔴 Niveau « Je construis mon outil »",
    color: "border-l-4 border-l-rose-500",
    title: "Je construis quelque chose",
    cards: [
      {
        title: "Faire son outil métier sur-mesure",
        body: `Softr → portail client depuis Airtable
Bubble → app web complexe
Lovable → Vibe Coding avec IA
→ Commence par décrire ton outil à une IA et demande-lui un plan.
Temps : variable. Coût : 29 à 50€/mois.`,
        tools: "Softr / Bubble / Lovable",
      },
      {
        title: "Automatiser sa gestion de factures",
        body: `Photo de facture → OCR IA → Extraction des données → Airtable → Export Excel mensuel.
Gain : 80% de temps de traitement.
ROI : 3 à 7 mois.
→ Voir la démo Evolbee.`,
        tools: "Airtable + Make + Mistral AI",
        link: { label: "Démo Evolbee", href: "[LIEN_EVOLBEE_PLACEHOLDER]" },
      },
      {
        title: "Agents IA pour son activité",
        body: `Un agent IA peut :
• Lire tes mails et trier les urgences
• Préparer des réponses à valider
• Rechercher des infos et résumer
→ Nécessite un cadrage solide d'abord.
Temps : variable. Coût : 20 à 50€/mois.`,
        tools: "Claude / Make / n8n",
      },
    ],
  },
];

type PlanItem = {
  id: string;
  semaine: string[];
  stack: string;
  idee: string;
};

const PLANS: PlanItem[] = [
  {
    id: "bador",
    semaine: [
      "Installe le raccourci vocal « Pense pas bête »",
      "Crée ton assistant IA recrutement (prompt : « Tu es assistant recruteur spécialisé… »)",
      "Ouvre un Airtable pour suivre tes candidats",
    ],
    stack: "Tally (gratuit) · Airtable (gratuit) · Make (gratuit) · Claude (20$/mois)",
    idee: "Formulaire candidat → Airtable → Email de confirmation + relance J+3 auto",
  },
  {
    id: "bouchard",
    semaine: [
      "Crée ton carnet de marque IA (ton pédagogique)",
      "Ouvre un espace Notion pour un client test",
      "Configure NotebookLM avec tes supports de formation",
    ],
    stack: "Notion (10$/mois) · NotebookLM (gratuit) · Claude (20$/mois) · Tally (gratuit)",
    idee: "Espace client Notion partagé avec programme, ressources et suivi de progression",
  },
  {
    id: "chadelle",
    semaine: [
      "Crée ton assistant IA « tone of voice client » pour chaque compte que tu gères",
      "Installe le raccourci vocal pour capturer des idées de contenu",
      "Monte un Google Sheets de suivi de performance",
    ],
    stack: "ChatGPT ou Claude (20$/mois) · Google Sheets (gratuit) · Make (gratuit) · Buffer (gratuit)",
    idee: "Rapport mensuel client généré par IA depuis Google Sheets + envoi auto",
  },
  {
    id: "davidoff",
    semaine: [
      "Crée un assistant IA pour rédiger tes bilans de séance (brouillon uniquement)",
      "Configure NotebookLM avec tes protocoles",
      "⚠️ Toute donnée patient = C3 → aucun outil SaaS sans cadre RGPD",
    ],
    stack: "Claude en local (20$/mois) · NotebookLM (gratuit, données non sensibles) · Tally (gratuit, formulaires non médicaux)",
    idee: "⚠️ Formulaire pré-consultation uniquement avec consentement explicite et hébergement EU obligatoire",
  },
  {
    id: "desousa",
    semaine: [
      "Tu as déjà les bases — priorité : automatiser ton propre onboarding client",
      "Teste Lovable pour un projet client rapide",
      "Explore n8n comme alternative à Make",
    ],
    stack: "Make ou n8n · Notion · Lovable · Airtable · Claude (20$/mois)",
    idee: "Devis signé → espace Notion créé → email de bienvenue → tâches générées auto",
  },
  {
    id: "diaz",
    semaine: [
      "Crée une page Carrd avec tes produits et un formulaire de commande",
      "Installe le raccourci vocal pour noter tes idées créatives",
      "Teste Systeme.io pour une landing simple",
    ],
    stack: "Carrd (gratuit) · Systeme.io (gratuit) · Tally (gratuit) · ChatGPT (gratuit)",
    idee: "Formulaire commande → email de confirmation auto + liste de commandes",
  },
  {
    id: "dumestier",
    semaine: [
      "Crée ton carnet de marque IA pour chacun de tes clients",
      "Monte un calendrier éditorial Notion",
      "Génère 10 idées de posts avec ton IA",
    ],
    stack: "Notion (10$/mois) · Claude (20$/mois) · Buffer (gratuit) · Tally (gratuit)",
    idee: "Calendrier Notion + brouillons IA + publication semi-auto sur réseaux",
  },
  {
    id: "duplouy",
    semaine: [
      "Crée une page portfolio simple sur Carrd",
      "Ajoute un formulaire de demande de commande",
      "Utilise ChatGPT pour rédiger tes descriptions de créations",
    ],
    stack: "Carrd (gratuit) · Tally (gratuit) · Make (gratuit) · ChatGPT (20$/mois)",
    idee: "Formulaire de commande → notification Make → ligne Airtable",
  },
  {
    id: "garciae",
    semaine: [
      "Monte un tableau de bord projets Airtable pour tes clients actuels",
      "Crée ton assistant IA « coordination » pour les comptes-rendus de réunion",
      "Explore Notion comme espace client partagé",
    ],
    stack: "Airtable (gratuit) · Notion (10$/mois) · Claude (20$/mois) · Tally (gratuit)",
    idee: "Tableau de bord multi-clients Airtable partagé en lecture avec les clients",
  },
  {
    id: "garciat",
    semaine: [
      "Crée un formulaire de prise de RDV simple",
      "Connecte-le à Google Calendar",
      "Configure un rappel email ou SMS auto",
    ],
    stack: "Tally (gratuit) · Google Calendar (gratuit) · Brevo (gratuit) · ChatGPT (gratuit)",
    idee: "Formulaire RDV → Google Calendar → rappel email/SMS auto + fiche client Airtable",
  },
  {
    id: "hwang",
    semaine: [
      "Crée un suivi de stock dans Airtable (produit / quantité / seuil d'alerte)",
      "Configure une alerte automatique quand un seuil est atteint",
      "Prends une photo de ta config actuelle et demande à une IA de l'optimiser",
    ],
    stack: "Airtable (gratuit) · Airtable Automations (inclus) · ChatGPT (gratuit) · Make (gratuit)",
    idee: "Alerte automatique sous un seuil de stock + notification par email",
  },
  {
    id: "maffre",
    semaine: [
      "Crée ton assistant IA « legal writer » avec tes exemples de documents",
      "Monte un modèle de document dans Notion",
      "⚠️ Toujours validation humaine avant envoi de tout document juridique",
    ],
    stack: "Claude (20$/mois) · Notion (10$/mois) · Tally (gratuit) · DocuSeal (gratuit)",
    idee: "Formulaire client → document généré par IA → relecture humaine → envoi",
  },
  {
    id: "martin",
    semaine: [
      "Crée une page Carrd avec ta galerie photos",
      "Ajoute un formulaire de devis",
      "Utilise ChatGPT pour rédiger tes descriptions et réponses clients",
    ],
    stack: "Carrd (gratuit) · Tally (gratuit) · Notion (gratuit) · ChatGPT (gratuit)",
    idee: "Carnet de commandes Notion + galerie photos sur Carrd",
  },
  {
    id: "portes",
    semaine: [
      "Configure NotebookLM avec tes contenus pédagogiques",
      "Explore Softr pour créer un portail apprenant depuis ton Airtable existant",
      "Génère des exercices de grammaire avec Claude",
    ],
    stack: "Softr (49$/mois) · Airtable (20$/mois) · NotebookLM (gratuit) · Claude (20$/mois)",
    idee: "Portail apprenant Softr + suivi Airtable + exercices IA",
  },
  {
    id: "raymond",
    semaine: [
      "Crée ton assistant IA « coaching » pour tes bilans de séance (brouillon)",
      "Configure Calendly pour tes prises de RDV",
      "Monte un espace client Notion test",
    ],
    stack: "Calendly (gratuit limité) · Notion (10$/mois) · Claude (20$/mois) · Tally (gratuit)",
    idee: "Calendly + espace client Notion + bilan brouillon IA → validation humaine",
  },
  {
    id: "razes",
    semaine: [
      "Crée un formulaire de demande de devis avec champ pour visuels (Tally)",
      "Monte un suivi de commandes dans Airtable",
      "Utilise ChatGPT pour rédiger tes emails clients type",
    ],
    stack: "Tally (gratuit) · Airtable (gratuit) · Make (9$/mois) · DocuSeal (gratuit)",
    idee: "Formulaire + visuels → Airtable → devis PDF auto (Make + DocuSeal)",
  },
  {
    id: "zamore",
    semaine: [
      "Crée un formulaire de RDV en ligne",
      "Configure un rappel SMS ou email auto",
      "⚠️ Données de santé indirectes : accès strictement limité, hébergement EU",
    ],
    stack: "Tally (gratuit) · Brevo (gratuit) · Airtable (gratuit) · Google Calendar (gratuit)",
    idee: "Formulaire RDV + rappel auto + fiche client Airtable (accès limité)",
  },
];

const PLANS_BY_ID = new Map(PLANS.map((p) => [p.id, p]));

export function Backpack() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <Section
      id="emporter"
      num="19"
      eyebrow="Le refuge"
      tint="sand"
      title="Ce que vous repartez dans le sac"
    >
      <p className="-mt-4 mb-12 text-base text-muted-foreground md:text-lg">
        Pas une liste de plus. Un vrai sac pour demain.
      </p>

      {/* BLOC 1 — Checklist */}
      <div className="mb-10 rounded-2xl border border-border bg-stone-soft/60 p-8 shadow-sm md:p-10">
        <div className="mb-6 flex items-start justify-between gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-primary">Bilan</div>
            <h3 className="mt-1 font-serif text-2xl text-foreground md:text-3xl">
              Ce qu'on a construit ensemble aujourd'hui
            </h3>
          </div>
          
        </div>
        <ul className="space-y-3">
          {CHECKLIST.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-lg bg-background/70 px-4 py-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-500 text-white">
                ✓
              </span>
              <span className="text-sm text-foreground md:text-base">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* BLOC 2 — Mémos */}
      <div className="mb-10 rounded-2xl border border-border bg-card p-8 shadow-sm md:p-10">
        <div className="mb-6">
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary">Mémo</div>
          <h3 className="mt-1 font-serif text-2xl text-foreground md:text-3xl">
            Les réflexes à garder
          </h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {MEMOS.map((m) => (
            <div
              key={m.title}
              className={`rounded-xl border ${m.bg} p-5`}
            >
              <div className="mb-2 flex items-center gap-2 text-2xl" aria-hidden>
                {m.icon}
              </div>
              <h4 className="mb-2 font-serif text-lg text-foreground">{m.title}</h4>
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/85">
                {m.body}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* BLOC 3 — Plan semaine */}
      <div className="mb-10 rounded-2xl border border-border bg-accent/30 p-8 shadow-sm md:p-10">
        <div className="mb-6">
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary">Action</div>
          <h3 className="mt-1 font-serif text-2xl text-foreground md:text-3xl">
            Cette semaine — 3 actions simples
          </h3>
          <p className="mt-1 text-sm text-muted-foreground italic">Pas tout. Juste ça.</p>
        </div>

        <div className="space-y-4">
          {[
            {
              n: "1",
              when: "Aujourd'hui · 5 min",
              title: "Installer le raccourci vocal",
              body: `iPhone → App Raccourcis → « Pense pas bête »
Android → Google Assistant Routines
→ Tu parles, ça s'enregistre. Coût : 0€.`,
            },
            {
              n: "2",
              when: "Cette semaine · 20 min",
              title: "Connecter ton IA préférée à tes mails",
              body: `Claude → Gmail (onglet Intégrations)
Gemini → Natif avec ton compte Google
ChatGPT → Connecteur Gmail (plan Plus)
→ Demande-lui : « Résume mes mails non lus »`,
              qr: "[QR_CODE_MCP_PLACEHOLDER]",
            },
            {
              n: "3",
              when: "Ce mois-ci · 1h",
              title: "Faire ton audit no-code",
              body: `Prends une tâche qui t'énerve.
Passe-la dans les 6 questions du cadrage.
Choisis : manuel / assisté IA / automatisé.
→ Utilise le prompt copilote ci-dessous.`,
            },
          ].map((step) => (
            <div key={step.n} className="rounded-xl border border-border bg-background p-5">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-lg text-primary-foreground">
                  {step.n}
                </span>
                <div className="flex-1">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {step.when}
                  </div>
                  <h4 className="mt-1 font-serif text-lg text-foreground">{step.title}</h4>
                  <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/85">
                    {step.body}
                  </pre>
                  {"qr" in step && step.qr && (
                    <a
                      href={step.qr}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
                    >
                      Guide MCP → {step.qr}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prompt copilote intégré */}
        <div className="mt-8 rounded-xl border border-primary/30 bg-card p-6">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-primary">Mini outil</div>
              <h4 className="mt-1 font-serif text-xl text-foreground">
                Mon copilote de tâche répétitive
              </h4>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                Un prompt à copier-coller dans votre assistant IA préféré. Remplissez les crochets,
                lancez la conversation.
              </p>
            </div>
            <button
              onClick={copy}
              className="shrink-0 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              {copied ? "Copié ✓" : "Copier le prompt"}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-border bg-background p-5 font-mono text-[13px] leading-relaxed text-foreground/90">
            {PROMPT}
          </pre>
        </div>
      </div>

      {/* BLOC 4 — Pour aller plus loin */}
      <div className="mb-10 rounded-2xl border border-border bg-card p-8 shadow-sm md:p-10">
        <div className="mb-6">
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary">Ressources</div>
          <h3 className="mt-1 font-serif text-2xl text-foreground md:text-3xl">
            Pour aller plus loin — à votre rythme
          </h3>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {LEVELS.map((lvl) => (
            <div key={lvl.title} className={`rounded-xl bg-background p-5 ${lvl.color}`}>
              <div className="mb-1 text-sm font-medium text-foreground">{lvl.badge}</div>
              <h4 className="mb-4 font-serif text-lg text-foreground">{lvl.title}</h4>
              <div className="space-y-2">
                {lvl.cards.map((c) => (
                  <details
                    key={c.title}
                    className="group rounded-lg border border-border bg-stone-soft/50 px-4 py-3"
                  >
                    <summary className="cursor-pointer list-none text-sm font-medium text-foreground marker:hidden">
                      <span className="mr-2 text-primary group-open:hidden">＋</span>
                      <span className="mr-2 text-primary hidden group-open:inline">−</span>
                      {c.title}
                    </summary>
                    <div className="mt-3 space-y-2">
                      <pre className="whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-foreground/85">
                        {c.body}
                      </pre>
                      <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                        Outils · {c.tools}
                      </div>
                      {c.link && (
                        <a
                          href={c.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-xs font-medium text-primary hover:underline"
                        >
                          {c.link.label} →
                        </a>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BLOC 5 — Plans personnalisés */}
      <div className="mb-10 rounded-2xl border border-border bg-stone-soft/60 p-8 shadow-sm md:p-10">
        <div className="mb-6">
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary">Personnalisé</div>
          <h3 className="mt-1 font-serif text-2xl text-foreground md:text-3xl">
            Votre plan selon votre activité
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Retrouvez votre Samoyède — voici ce qu'on vous recommande en priorité.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {PARTICIPANTS.map((p) => {
            const plan = PLANS_BY_ID.get(p.id);
            if (!plan) return null;
            return (
              <details
                key={p.id}
                className="group rounded-xl border border-border bg-background p-4 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center gap-3 marker:hidden">
                  <img
                    src={p.image}
                    alt={`${p.prenom} ${p.nom}`}
                    className="h-14 w-14 shrink-0 rounded-full bg-stone-soft object-cover ring-1 ring-border"
                  />
                  <div className="flex-1">
                    <div className="font-serif text-base text-foreground">
                      {p.prenom} {p.nom}
                    </div>
                    <div className="text-xs text-muted-foreground">{p.activite}</div>
                  </div>
                  <span className="text-primary group-open:hidden">＋</span>
                  <span className="text-primary hidden group-open:inline">−</span>
                </summary>

                <div className="mt-5 space-y-5 border-t border-border pt-5">
                  <div>
                    <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-primary">
                      Cette semaine
                    </div>
                    <ul className="space-y-1.5">
                      {plan.semaine.map((s, i) => (
                        <li key={i} className="flex gap-2 text-sm text-foreground/85">
                          <span className="text-primary">→</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-primary">
                      Stack recommandé
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {plan.stack.split("·").map((s, i) => (
                        <span
                          key={i}
                          className="rounded-md border border-border bg-stone-soft px-2.5 py-1 text-xs text-foreground/80"
                        >
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-primary">
                      Idée d'automatisation
                    </div>
                    <p className="rounded-lg bg-accent/40 p-3 text-sm leading-relaxed text-foreground/90">
                      {plan.idee}
                    </p>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </div>

      {/* BLOC 6 — Contact */}
      <div className="rounded-2xl border border-primary/20 bg-accent/40 p-8 md:p-10">
        <div className="mb-8 text-center">
          <h3 className="font-serif text-2xl text-foreground md:text-3xl">
            Pour aller plus loin ensemble
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-base text-foreground/85">
            Ces outils vous intéressent mais vous voulez être accompagné·e pour les mettre en
            place ? C'est exactement ce que fait Summit Flow.
          </p>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: "🔍",
              title: "Audit no-code & IA",
              body: "On analyse vos processus actuels et on identifie ensemble les 2-3 usages qui vont vraiment changer votre quotidien.",
            },
            {
              icon: "⚙️",
              title: "Mise en place & automatisation",
              body: "Je construis avec vous ou pour vous : CRM, espace Notion, automatisation Make, connexion d'outils, agents IA.",
            },
            {
              icon: "🎓",
              title: "Formation sur mesure",
              body: "Ateliers adaptés à votre équipe, votre secteur, vos outils déjà en place. En présentiel ou à distance.",
            },
          ].map((s) => (
            <div key={s.title} className="rounded-xl border border-border bg-card p-5 text-center">
              <div className="text-3xl" aria-hidden>{s.icon}</div>
              <h4 className="mt-3 font-serif text-lg text-foreground">{s.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {/* Contact */}
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <img
              src={logoAsset.url}
              alt="Summit Flow"
              className="mx-auto h-14 w-14 rounded-full ring-1 ring-border"
            />
            <div className="mt-3 font-serif text-lg text-foreground">Marie Jolly — Summit Flow</div>
            <ul className="mx-auto mt-4 space-y-2 text-sm text-foreground/85">
              <li>
                📧{" "}
                <a
                  href="mailto:contact@summitflow.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  contact@summitflow.fr
                </a>
              </li>
              <li>
                🌐{" "}
                <a
                  href="https://www.summitflow.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.summitflow.fr
                </a>
              </li>
              <li>📍 Occitanie — Sud Toulouse</li>
              <li className="text-xs text-muted-foreground">
                Présentiel région · Distance France entière
              </li>
            </ul>
          </div>

          {/* QR code avis */}
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <h4 className="font-serif text-lg text-foreground">Cet atelier vous a aidé ?</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              30 secondes pour le dire 🙏
            </p>
            <div className="mt-4 flex justify-center">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Fg.page%2Fr%2FCd3n9A6xcSVuEAE%2Freview"
                alt="QR code — Laisser un avis Google Summit Flow"
                className="h-40 w-40 rounded-md border border-border bg-background p-2"
              />
            </div>
            <a
              href="https://g.page/r/Cd3n9A6xcSVuEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Laisser un avis <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-center gap-2 border-t border-border pt-8 text-center">
          <img
            src={logoAsset.url}
            alt="Summit Flow"
            className="h-12 w-12 rounded-full ring-1 ring-border"
          />
          <div className="font-serif text-base text-primary">Summit Flow</div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Atelier d'acculturation · Marie Jolly
          </div>
        </footer>
      </div>
    </Section>
  );
}
