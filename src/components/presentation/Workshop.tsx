import { Section } from "./Section";
import { DurationBadge } from "./Badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PROFILES = [
  "Anthony Bador — Consultant recrutement",
  "Emeline Bouchard — Formation CSE, dirigeants et RH",
  "Mickaël Chadelle — Community manager, sites vitrine",
  "Cyndia Davidoff — Sophrologue (maladies inflammatoires)",
  "Cristiano De Sousa Valente — Sites, apps, automatisation",
  "Patricia Diaz — Couturière, produits lavables",
  "Florine-Anne Dumestier — Comm entreprises bien-être",
  "Katéry Duplouy — Illustratrice, coloriste",
  "Emilie Garcia — Gestion admin, commerciale, coordination",
  "Tahidys Garcia — Services à la personne",
  "Soo-Jin Hwang — Traiteur asiatique, distributeur automatique",
  "Stéphany Maffre — Legal design, écriture juridique, copywriting",
  "Fleur Martin — Tapisserie d'ameublement",
  "Jordi Portes — Plateforme FLE en ligne",
  "Fabienne Raymond — Coach professionnelle et formatrice",
  "Michèle Razès-Lafont — Sublim'objets ML, flocage tout support",
  "Gaëlle Zamore — Soins minceur et bien-être à domicile",
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
  { name: "Cyndia Davidoff", meta: "Sophrologue", probleme: "Prise de notes pré-consultation manuelle", solution: "Formulaire de pré-consultation → fiche dans Notion ou Airtable", outils: "Tally ou Typeform + Notion", rgpd: "⚠️ Données santé = C3, hébergement EU obligatoire, consentement explicite", warn: true },
  { name: "Cristiano De Sousa Valente", meta: "Sites + auto", probleme: "Onboarding client long et répétitif", solution: "Devis signé → espace Notion projet créé auto → email de bienvenue (Make)", outils: "Make + Notion + HelloSign", rgpd: "C2" },
  { name: "Patricia Diaz", meta: "Couturière, produits lavables", probleme: "Pas de vitrine ni de prise de commande en ligne", solution: "Mini catalogue + formulaire de commande sur Carrd ou Systeme.io", outils: "Carrd ou Systeme.io", rgpd: "C1 si pas de paiement en ligne" },
  { name: "Florine Dumestier", meta: "Comm bien-être", probleme: "Planification de contenu désorganisée", solution: "Calendrier éditorial Notion + brouillons IA + publication semi-auto", outils: "Notion + ChatGPT + Buffer", rgpd: "C0 (contenu public)" },
  { name: "Katéry Duplouy", meta: "Illustratrice", probleme: "Demandes de commande reçues par messages épars", solution: "Portfolio Webflow ou Lovable + formulaire de commande → notification Make", outils: "Webflow ou Lovable + Make", rgpd: "C1" },
  { name: "Emilie Garcia", meta: "Gestion admin / coordination", probleme: "Suivi multi-clients difficile à centraliser", solution: "Tableau de bord projets dans Airtable ou Notion, partagé en lecture avec les clients", outils: "Airtable ou Notion", rgpd: "C2" },
  { name: "Tahidys Garcia", meta: "Services à la personne", probleme: "Prise de RDV par téléphone, oublis", solution: "Formulaire de demande → Google Calendar → rappel email ou SMS auto (Brevo)", outils: "Tally + Google Calendar + Brevo", rgpd: "C2, données bénéficiaires sensibles" },
  { name: "Soo-Jin Hwang", meta: "Distributeur asiatique", probleme: "Pas de visibilité sur les niveaux de stock", solution: "Suivi des stocks dans Airtable + alerte automatique en dessous d'un seuil", outils: "Airtable + Make ou Airtable Automations", rgpd: "C1" },
  { name: "Stéphany Maffre", meta: "Legal design", probleme: "Personnalisation de documents juridiques longue", solution: "Formulaire client → document généré par IA + relecture humaine obligatoire avant envoi", outils: "Tally + Make + ChatGPT + DocuSeal", rgpd: "⚠️ C3 selon contenu, validation humaine impérative", warn: true },
  { name: "Fleur Martin", meta: "Tapisserie", probleme: "Pas de trace organisée des commandes et réalisations", solution: "Carnet de commandes Notion ou Airtable + galerie photos sur Carrd ou Webflow", outils: "Notion + Carrd", rgpd: "C1" },
  { name: "Jordi Portes", meta: "FLE en ligne", probleme: "Suivi des apprenants dispersé", solution: "Plateforme légère sur Softr + suivi dans Airtable + exercices générés par IA", outils: "Softr + Airtable + ChatGPT", rgpd: "C2, données apprenants" },
  { name: "Fabienne Raymond", meta: "Coach", probleme: "Réservation de séances et suivi post-séance manuels", solution: "Calendly pour les RDV + espace client Notion + bilan de séance brouillon IA (validation humaine)", outils: "Calendly + Notion + Claude ou ChatGPT", rgpd: "⚠️ C2-C3 selon les échanges, accès strictement limité", warn: true },
  { name: "Michèle Razès-Lafont", meta: "Flocage", probleme: "Devis manuels longs, pas de suivi", solution: "Formulaire de demande avec visuels → Airtable → devis PDF auto (Make + DocuSeal)", outils: "Tally + Airtable + Make + DocuSeal", rgpd: "C2" },
  { name: "Gaëlle Zamore", meta: "Soins à domicile", probleme: "RDV pris par téléphone, aucun rappel automatique", solution: "Formulaire de RDV + rappel SMS/email auto (Brevo) + fiche client Airtable", outils: "Tally + Brevo + Airtable", rgpd: "⚠️ C2, données de santé indirectes → accès limité", warn: true },
];

export function Workshop() {
  return (
    <Section
      id="atelier"
      num="18"
      eyebrow="Acte 5 · On marche"
      title={
        <>
          Et vous, quel est <span className="text-primary">votre sentier</span> ?
        </>
      }
      tint="sand"
    >
      <DurationBadge>⏱️ 30 min · Atelier groupes</DurationBadge>
      <p className="mb-12 text-base italic text-muted-foreground">
        4 groupes · 30 minutes · un vrai problème business · une vraie piste de solution.
      </p>

      {/* Temps 1 */}
      <div className="mb-10 rounded-2xl border border-border bg-card p-7 shadow-sm">
        <div className="text-[11px] uppercase tracking-[0.2em] text-primary">
          Temps 1 — Constitution des groupes
        </div>
        <p className="mt-3 text-lg leading-relaxed text-foreground/90">
          Formez 4 groupes. Chaque groupe choisit un profil parmi la liste.
          <br />
          <span className="font-medium text-foreground">Vous résolvez pour quelqu'un d'autre, pas pour vous.</span>
        </p>

        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {PROFILES.map((p) => (
            <li key={p} className="flex items-start gap-2 rounded-md bg-stone-soft/60 px-3 py-2 text-sm text-foreground/85">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {p}
            </li>
          ))}
        </ul>
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

      {/* Temps 3 */}
      <div id="atelier-idees">
        <div className="text-[11px] uppercase tracking-[0.2em] text-primary">
          Temps 3 — Exemples d'idées par profil
        </div>
        <p className="mt-2 mb-6 text-sm italic text-muted-foreground">
          On déplie au fur et à mesure de la restitution.
        </p>

        <Accordion type="multiple" className="rounded-2xl border border-border bg-card">
          {IDEAS.map((idea) => (
            <AccordionItem key={idea.name} value={idea.name} className="px-5">
              <AccordionTrigger>
                <div className="flex flex-1 flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-serif text-base text-foreground">{idea.name}</span>
                  <span className="text-xs text-muted-foreground">— {idea.meta}</span>
                  {idea.warn && (
                    <span className="ml-auto rounded-full bg-warn/10 px-2 py-0.5 text-[10px] font-medium text-warn">
                      ⚠️ RGPD sensible
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-3 pb-2 sm:grid-cols-2">
                  <Field label="Problème" value={idea.probleme} />
                  <Field label="Solution" value={idea.solution} />
                  <Field label="Outils" value={idea.outils} />
                  <Field label="RGPD" value={idea.rgpd} warn={idea.warn} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Clôture atelier */}
      <div className="mt-10 rounded-2xl border border-primary/20 bg-accent/40 p-7 text-center">
        <h3 className="font-serif text-2xl text-foreground md:text-3xl">
          On étudie <span className="text-primary">une idée ensemble</span>
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-foreground/85">
          Vous avez une piste ? On la creuse en direct.
          <br />
          Retrouvez toutes les idées par profil ci-dessous.
        </p>
        <a
          href="#atelier-idees"
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
        >
          Voir les idées par participant <span aria-hidden>→</span>
        </a>
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
