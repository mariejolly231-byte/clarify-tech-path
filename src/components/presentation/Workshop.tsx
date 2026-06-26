import { Section } from "./Section";
import { DurationBadge } from "./Badge";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";

type Group = {
 title: string;
 theme: string;
 members: string[];
 cas: string;
};

const GROUPS: Group[] = [
 {
  title: "Groupe 1 — Produire des livrables visuels ou texte pour des clients",
  theme: "Créer des livrables personnalisés (texte, visuel, maquette) rapidement et sans erreur",
  members: [
   "Mickaël Chadelle — contenus comm pour plusieurs clients",
   "Stéphany Maffre — documents juridiques reformulés/designés",
   "Katéry Duplouy — livrables illustrés, droits, devis créatifs",
   "Michèle Razès-Lafont — maquettes de flocage, BAT, bons de commande visuels",
  ],
  cas: "Comment produire plus vite des livrables personnalisés pour chaque client sans tout refaire à zéro à chaque fois ?",
 },
 {
  title: "Groupe 2 — Gérer des plannings, des stocks et des commandes physiques",
  theme: "Coordonner des flux physiques (matières, livraisons, interventions terrain)",
  members: [
   "Patricia Diaz — stocks tissu, commandes, mesures",
   "Fleur Martin — devis tissu + pose, sourcing, chantiers",
   "Soo-Jin Hwang — commandes traiteur, stocks, planning livraisons",
   "Tahidys Garcia — planning intervenants, suivi bénéficiaires",
  ],
  cas: "Comment suivre commandes, stocks et plannings sans jongler entre WhatsApp, Excel et sa tête ?",
 },
 {
  title: "Groupe 3 — Accompagner des personnes dans la durée",
  theme: "Suivi individualisé d'un portefeuille de clients/patients/apprenants",
  members: [
   "Cyndia Davidoff — suivi patients sur durée, protocoles",
   "Fabienne Raymond — suivi coachés, bilans, objectifs",
   "Jordi Portes — suivi apprenants FLE, progression, contenus",
   "Gaëlle Zamore — fiches clients, protocoles soins, fidélisation",
  ],
  cas: "Comment garder une vision précise de là où en est chaque personne accompagnée, sans passer 2h par semaine à retrouver ses notes ?",
 },
 {
  title: "Groupe 4 — Qualifier, sourcer et gérer des relations professionnelles multiples",
  theme: "Gérer un flux entrant de personnes (candidats, clients pro, stagiaires) avec des infos à structurer",
  members: [
   "Anthony Bador — CVs, fiches de poste, relances candidats",
   "Emeline Bouchard — inscriptions formation, comptes-rendus, suivi dirigeants",
   "Emilie Garcia — coordination multi-clients, reporting, plannings",
   "Cristiano De Sousa Valente — gestion projets clients, specs, devis",
   "Florine-Anne Dumestier — devis, suivi prospects, newsletter entreprises",
  ],
  cas: "Comment ne plus perdre d'information sur un contact, un projet ou une demande quand tout arrive de partout en même temps ?",
 },
];

const QUESTIONS = [
 "Quel problème du quotidien prend trop de temps ou génère des erreurs ?",
 "C'est une tâche répétitive ou un cas unique ?",
 "Quelles données sont impliquées — sont-elles sensibles ?",
 "Quel outil no-code ou IA pourrait aider, et à quel coût ?",
 "Faut-il une validation humaine avant que ça parte ?",
];

type Idea = {
 name: string;
 meta: string;
 probleme: string;
 solution: string;
 outils: string;
 rgpd: string;
 warn?: boolean;
};

const IDEAS: Idea[] = [
 { name: "Anthony Bador", meta: "Recrutement", probleme: "Suivi des candidats éparpillé", solution: "Formulaire de contact → Airtable → email auto de confirmation + relance J+3 (Make)", outils: "Airtable + Make", rgpd: "Données candidats = C2, accès limité" },
 { name: "Emeline Bouchard", meta: "CSE / RH / Formation", probleme: "Ressources de formation dispersées", solution: "Espace client Notion partagé avec programme, ressources et suivi de progression", outils: "Notion", rgpd: "C1 interne, partage limité aux clients" },
 { name: "Mickaël Chadelle", meta: "Community manager", probleme: "Reporting client chronophage", solution: "Rapport mensuel généré par IA depuis Google Sheets + envoi auto (Make)", outils: "Google Sheets + Make + ChatGPT", rgpd: "Données client = C2" },
 { name: "Cyndia Davidoff", meta: "Sophrologue", probleme: "Prise de notes pré-consultation manuelle", solution: "Formulaire de pré-consultation → fiche dans Notion ou Airtable", outils: "Tally ou Typeform + Notion", rgpd: " Données santé = C3, hébergement EU obligatoire, consentement explicite", warn: true },
 { name: "Cristiano De Sousa Valente", meta: "Sites + auto", probleme: "Onboarding client long et répétitif", solution: "Devis signé → espace Notion projet créé auto → email de bienvenue (Make)", outils: "Make + Notion + HelloSign", rgpd: "C2" },
 { name: "Patricia Diaz", meta: "Couturière, produits lavables", probleme: "Pas de vitrine ni de prise de commande en ligne", solution: "Mini catalogue + formulaire de commande sur Carrd ou Systeme.io", outils: "Carrd ou Systeme.io", rgpd: "C1 si pas de paiement en ligne" },
 { name: "Florine Dumestier", meta: "Comm bien-être", probleme: "Planification de contenu désorganisée", solution: "Calendrier éditorial Notion + brouillons IA + publication semi-auto", outils: "Notion + ChatGPT + Buffer", rgpd: "C0 (contenu public)" },
 { name: "Katéry Duplouy", meta: "Illustratrice", probleme: "Demandes de commande reçues par messages épars", solution: "Portfolio Webflow ou Lovable + formulaire de commande → notification Make", outils: "Webflow ou Lovable + Make", rgpd: "C1" },
 { name: "Emilie Garcia", meta: "Gestion admin / coordination", probleme: "Suivi multi-clients difficile à centraliser", solution: "Tableau de bord projets dans Airtable ou Notion, partagé en lecture avec les clients", outils: "Airtable ou Notion", rgpd: "C2" },
 { name: "Tahidys Garcia", meta: "Services à la personne", probleme: "Prise de RDV par téléphone, oublis", solution: "Formulaire de demande → Google Calendar → rappel email ou SMS auto (Brevo)", outils: "Tally + Google Calendar + Brevo", rgpd: "C2, données bénéficiaires sensibles" },
 { name: "Soo-Jin Hwang", meta: "Distributeur asiatique", probleme: "Pas de visibilité sur les niveaux de stock", solution: "Suivi des stocks dans Airtable + alerte automatique en dessous d'un seuil", outils: "Airtable + Make ou Airtable Automations", rgpd: "C1" },
 { name: "Stéphany Maffre", meta: "Legal design", probleme: "Personnalisation de documents juridiques longue", solution: "Formulaire client → document généré par IA + relecture humaine obligatoire avant envoi", outils: "Tally + Make + ChatGPT + DocuSeal", rgpd: " C3 selon contenu, validation humaine impérative", warn: true },
 { name: "Fleur Martin", meta: "Tapisserie", probleme: "Pas de trace organisée des commandes et réalisations", solution: "Carnet de commandes Notion ou Airtable + galerie photos sur Carrd ou Webflow", outils: "Notion + Carrd", rgpd: "C1" },
 { name: "Jordi Portes", meta: "FLE en ligne", probleme: "Suivi des apprenants dispersé", solution: "Plateforme légère sur Softr + suivi dans Airtable + exercices générés par IA", outils: "Softr + Airtable + ChatGPT", rgpd: "C2, données apprenants" },
 { name: "Fabienne Raymond", meta: "Coach", probleme: "Réservation de séances et suivi post-séance manuels", solution: "Calendly pour les RDV + espace client Notion + bilan de séance brouillon IA (validation humaine)", outils: "Calendly + Notion + Claude ou ChatGPT", rgpd: " C2-C3 selon les échanges, accès strictement limité", warn: true },
 { name: "Michèle Razès-Lafont", meta: "Flocage", probleme: "Devis manuels longs, pas de suivi", solution: "Formulaire de demande avec visuels → Airtable → devis PDF auto (Make + DocuSeal)", outils: "Tally + Airtable + Make + DocuSeal", rgpd: "C2" },
 { name: "Gaëlle Zamore", meta: "Soins à domicile", probleme: "RDV pris par téléphone, aucun rappel automatique", solution: "Formulaire de RDV + rappel SMS/email auto (Brevo) + fiche client Airtable", outils: "Tally + Brevo + Airtable", rgpd: " C2, données de santé indirectes → accès limité", warn: true },
];

export function Workshop() {
 return (
 <Section
 id="atelier"
 num="18"
 eyebrow="Partie 4 · On fait"
 title="À vous de tracer le sentier"
 tint="sand"
 >
 <DurationBadge>⏱ 30 min · Atelier groupes</DurationBadge>
 <p className="mb-12 text-base italic text-muted-foreground">
 4 groupes · 30 minutes · un vrai problème business · une vraie piste de solution.
 </p>

  {/* Temps 1 */}
  <div className="mb-10 rounded-2xl border border-border bg-card p-7 shadow-sm">
   <div className="text-[11px] uppercase tracking-[0.2em] text-primary">
    Temps 1 — Constitution des groupes
   </div>
   <p className="mt-3 text-lg leading-relaxed text-foreground/90">
    4 groupes recommandés, constitués par problématique commune.
    <br />
    <span className="font-medium text-foreground">Vous résolvez ensemble un cas concret, pas le vôtre.</span>
   </p>

   <div className="mt-6 grid gap-4 md:grid-cols-2">
    {GROUPS.map((g) => (
     <div key={g.title} className="rounded-xl border border-border bg-stone-soft/40 p-5">
      <h4 className="font-serif text-base text-foreground md:text-lg">{g.title}</h4>
      <p className="mt-1 text-xs italic text-muted-foreground">{g.theme}</p>
      <ul className="mt-4 space-y-1.5">
       {g.members.map((m) => (
        <li key={m} className="flex items-start gap-2 text-sm text-foreground/85">
         <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
         {m}
        </li>
       ))}
      </ul>
      <div className="mt-4 rounded-md border border-primary/20 bg-primary/[0.06] px-3 py-2 text-[13px] leading-relaxed text-foreground/90">
       <span className="font-medium text-primary">Cas à résoudre · </span>
       {g.cas}
      </div>
     </div>
    ))}
   </div>
  </div>

 {/* Temps 2 */}
 <div className="mb-10 rounded-2xl border border-accent bg-accent/40 p-7">
 <div className="text-[11px] uppercase tracking-[0.2em] text-primary">
 Temps 2 — Questions à se poser en groupe
 </div>
 <ol className="mt-5 space-y-3">
 {QUESTIONS.map((q, i) => (
 <li key={q} className="flex gap-4 text-[15px] leading-relaxed text-foreground/90">
 <span className="font-mono text-lg font-medium text-primary">{i + 1}.</span>
 <span>{q}</span>
 </li>
 ))}
 </ol>
 <p className="mt-6 rounded-md bg-background/70 px-4 py-3 text-sm italic text-foreground/80">
 Pas besoin d'une solution parfaite. Une piste solide suffit.
 </p>
 </div>



 {/* Temps 4 — Pistes de solutions par groupe */}
 <div className="mt-14">
  <div className="text-[11px] uppercase tracking-[0.2em] text-primary">
   Temps 4 — Pistes de solutions no-code & IA
  </div>
  <h3 className="mt-2 font-serif text-2xl text-foreground md:text-3xl">
   Une stack possible par groupe
  </h3>
  <p className="mt-2 max-w-2xl text-sm italic text-muted-foreground">
   Pas une vérité — un point de départ concret. À adapter selon le terrain.
  </p>

  <div className="mt-6 space-y-6">
   {SOLUTIONS.map((s) => (
    <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
     <div className="flex flex-wrap items-baseline justify-between gap-3">
      <h4 className="font-serif text-lg text-foreground md:text-xl">{s.title}</h4>
      <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
       {s.members}
      </span>
     </div>

     <div className="mt-3 rounded-md border-l-2 border-warn/60 bg-warn/[0.06] px-4 py-3 text-sm text-foreground/85">
      <span className="font-medium text-warn">Problème racine · </span>
      {s.problem}
     </div>

     <div className="mt-4 rounded-md bg-stone-soft/50 px-4 py-3 text-sm text-foreground/90">
      <span className="font-medium text-primary">Solution · </span>
      {s.solution}
     </div>

     {/* Stack d'outils — chips logos */}
     <div className="mt-4 flex flex-wrap gap-2">
      {s.stack.map((t) => (
       <span
        key={t.name}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/85"
       >
        {t.slug ? (
         <img
          src={`https://cdn.simpleicons.org/${t.slug}`}
          alt=""
          className="h-3.5 w-3.5"
          loading="lazy"
         />
        ) : (
         <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
        )}
        {t.name}
       </span>
      ))}
     </div>

     {/* Étapes */}
     <div className="mt-5 overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
       <thead className="bg-stone-soft/60 text-left text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        <tr>
         <th className="px-4 py-2 font-medium">Étape</th>
         <th className="px-4 py-2 font-medium">Outil</th>
         <th className="px-4 py-2 font-medium">Ce que ça fait</th>
        </tr>
       </thead>
       <tbody>
        {s.steps.map((step, i) => (
         <tr key={step.step} className={i % 2 === 0 ? "bg-background" : "bg-stone-soft/30"}>
          <td className="px-4 py-3 align-top text-foreground/90">{step.step}</td>
          <td className="px-4 py-3 align-top">
           <div className="flex items-center gap-2">
            {step.slug && (
             <img
              src={`https://cdn.simpleicons.org/${step.slug}`}
              alt=""
              className="h-4 w-4 shrink-0"
              loading="lazy"
             />
            )}
            <span className="font-medium text-primary">{step.tool}</span>
           </div>
          </td>
          <td className="px-4 py-3 align-top text-foreground/80">{step.what}</td>
         </tr>
        ))}
       </tbody>
      </table>
     </div>

     <div className="mt-4 rounded-md border border-primary/20 bg-primary/[0.06] px-4 py-3 text-sm text-foreground/90">
      <span className="font-medium text-primary">Résultat concret · </span>
      {s.result}
     </div>
    </div>
   ))}
  </div>
 </div>

  {/* Clôture atelier */}
  <div className="mt-10 rounded-2xl border border-primary/20 bg-accent/40 p-7 text-center">
  <h3 className="font-serif text-2xl text-foreground md:text-3xl">
  On étudie <span className="text-primary">une idée ensemble</span>
  </h3>
  <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-foreground/85">
  Vous avez une piste ? On la creuse en direct.
  </p>
  </div>
 </Section>
 );
}

function Field({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
 return (
 <div
 className={`rounded-md border p-3 ${
 warn ? "border-warn/30 bg-warn/[0.06]" : "border-border bg-stone-soft/50"
 }`}
 >
 <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
 <div className="mt-1 text-sm text-foreground/90">{value}</div>
 </div>
 );
}

type Tool = { name: string; slug?: string };
type SolutionStep = { step: string; tool: string; slug?: string; what: string };
type Solution = {
 title: string;
 members: string;
 problem: string;
 solution: string;
 stack: Tool[];
 steps: SolutionStep[];
 result: string;
};

const SOLUTIONS: Solution[] = [
 {
  title: "Groupe 1 — Produire des livrables personnalisés rapidement",
  members: "Mickaël · Stéphany · Katéry · Michèle",
  problem:
   "Chaque livrable repart de zéro alors que 70% du contenu est identique d'un client à l'autre.",
  solution: "Système de génération de livrables sur gabarit.",
  stack: [
   { name: "Airtable", slug: "airtable" },
   { name: "Claude", slug: "anthropic" },
   { name: "ChatGPT", slug: "openai" },
   { name: "Make", slug: "make" },
   { name: "Google Docs", slug: "googledocs" },
   { name: "Canva", slug: "canva" },
   { name: "Adobe Express", slug: "adobe" },
  ],
  steps: [
   { step: "Stocker les infos clients", tool: "Airtable", slug: "airtable",
    what: "Une fiche par client avec tous les paramètres (nom, couleurs, ton, format)." },
   { step: "Générer le contenu", tool: "Claude / ChatGPT (API)", slug: "anthropic",
    what: "Prompt avec les variables Airtable injectées automatiquement." },
   { step: "Automatiser la chaîne", tool: "Make", slug: "make",
    what: "Airtable → Claude → Google Docs → email client." },
   { step: "Créer les visuels", tool: "Canva API / Adobe Express", slug: "canva",
    what: "Templates avec variables dynamiques (Michèle, Katéry)." },
  ],
  result:
   "Un nouveau brief client → le livrable V1 est généré en 3 minutes au lieu de 45. Le client reçoit un PDF à valider, automatiquement.",
 },
 {
  title: "Groupe 2 — Gérer plannings, stocks et commandes physiques",
  members: "Patricia · Fleur · Soo-Jin · Tahidys",
  problem:
   "Les infos sont éparpillées entre WhatsApp, un carnet, un fichier Excel et la mémoire — une commande peut tomber dans les cracks.",
  solution:
   "Base de données centralisée + formulaires terrain + alertes automatiques.",
  stack: [
   { name: "Airtable", slug: "airtable" },
   { name: "Tally" },
   { name: "Fillout" },
   { name: "Make", slug: "make" },
   { name: "Notion", slug: "notion" },
   { name: "Google Calendar", slug: "googlecalendar" },
  ],
  steps: [
   { step: "Centraliser commandes et stocks", tool: "Airtable", slug: "airtable",
    what: "Vues « commandes en cours », « stock matières », « planning semaine »." },
   { step: "Saisie rapide client ou terrain", tool: "Tally / Fillout",
    what: "Formulaire sur téléphone → directement dans Airtable." },
   { step: "Alertes automatiques", tool: "Make", slug: "make",
    what: "Stock < seuil → SMS/email. Commande J-2 → rappel client auto." },
   { step: "Planning intervenants (Tahidys)", tool: "Notion + Google Calendar", slug: "notion",
    what: "Chaque intervenant voit son planning, les absences remontent." },
  ],
  result:
   "Plus aucune commande oubliée. Stock visible en temps réel. Les rappels clients partent seuls.",
 },
 {
  title: "Groupe 3 — Accompagner des personnes dans la durée",
  members: "Cyndia · Fabienne · Jordi · Gaëlle",
  problem:
   "Les notes de suivi sont éparpillées (cahier, email, tête) — retrouver « où en est Marie » prend 10 minutes avant chaque séance.",
  solution: "CRM de suivi personnalisé + assistant IA de synthèse.",
  stack: [
   { name: "Notion", slug: "notion" },
   { name: "Fireflies" },
   { name: "Claude", slug: "anthropic" },
   { name: "Make", slug: "make" },
   { name: "Softr" },
   { name: "Airtable", slug: "airtable" },
   { name: "Brevo", slug: "brevo" },
  ],
  steps: [
   { step: "Fiche de suivi par personne", tool: "Notion", slug: "notion",
    what: "Une page par client/patient/apprenant : historique, objectifs, notes." },
   { step: "Prise de notes rapide", tool: "Fireflies / Notion AI",
    what: "Enregistrement de la séance → résumé auto → ajout dans la fiche." },
   { step: "Synthèse avant séance", tool: "Claude + Notion API (Make)", slug: "anthropic",
    what: "« Résume-moi les 3 dernières séances de Marie en 5 points » → 10 sec." },
   { step: "Suivi progression (Jordi)", tool: "Softr sur Airtable", slug: "airtable",
    what: "Portail apprenant : chaque élève voit sa progression, ses exercices." },
   { step: "Relance fidélisation (Gaëlle)", tool: "Brevo", slug: "brevo",
    what: "Séquence email auto à J+30, J+60 après le dernier soin." },
  ],
  result:
   "Préparation d'une séance : 15 min → 2 min. Chaque personne accompagnée se sent réellement suivie.",
 },
 {
  title: "Groupe 4 — Qualifier et gérer des relations professionnelles multiples",
  members: "Anthony · Emeline · Emilie · Cristiano · Florine-Anne",
  problem:
   "Les demandes arrivent de partout (email, LinkedIn, WhatsApp, téléphone) — rien n'est dans le même endroit et des relances tombent à l'eau.",
  solution: "Pipeline de qualification automatisé + CRM léger.",
  stack: [
   { name: "Tally" },
   { name: "Airtable", slug: "airtable" },
   { name: "Make", slug: "make" },
   { name: "Claude", slug: "anthropic" },
   { name: "Fireflies" },
   { name: "Notion", slug: "notion" },
   { name: "Brevo", slug: "brevo" },
   { name: "Google Docs", slug: "googledocs" },
  ],
  steps: [
   { step: "Capturer toutes les demandes", tool: "Tally",
    what: "Un formulaire de contact unique → tout arrive au même endroit." },
   { step: "Centraliser et prioriser", tool: "Airtable", slug: "airtable",
    what: "Pipeline visuel (Kanban) : Nouveau → Qualifié → En cours → Terminé." },
   { step: "Qualifier automatiquement (Anthony)", tool: "Make + Claude", slug: "anthropic",
    what: "CV reçu → Claude extrait les compétences → fiche candidate créée." },
   { step: "Comptes-rendus (Emeline/Emilie)", tool: "Fireflies + Make + Notion", slug: "notion",
    what: "Réunion enregistrée → résumé + actions → envoyés aux participants." },
   { step: "Relances automatiques", tool: "Brevo", slug: "brevo",
    what: "Prospect sans réponse à J+5 → email de relance personnalisé." },
   { step: "Propositions commerciales", tool: "Make + Google Docs", slug: "googledocs",
    what: "Variables Airtable → proposition pré-remplie → envoyée pour signature." },
  ],
  result:
   "Aucun prospect ne tombe dans l'oubli. Les comptes-rendus s'écrivent seuls. Le pipeline est visible en 30 secondes.",
 },
];
