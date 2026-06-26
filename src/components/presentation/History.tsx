import { Section } from "./Section";
import { IkeaAnalogy } from "./Infographics";
import histoireAsset from "@/assets/histoire-no-code-40ans.png.asset.json";
import commentIA from "@/assets/comment-fonctionne-ia.png.asset.json";

export function History() {
 return (
 <Section
 id="histoire"
 num="04"
 eyebrow="Partie 1 · D'où ça vient — où on en est"
 title="40 ans de sentiers tracés"
 >
  <p className="mb-10 text-base italic text-muted-foreground">
 De l'Excel au Vibe Coding : la montée en altitude a pris 40 ans.
 </p>

 <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
 <img
 src={histoireAsset.url}
 alt="Infographie : Du tableur à l'agent IA — 40 ans de no-code, des fondations Excel/Web à l'humain orchestrateur d'agents IA"
 className="block h-auto w-full"
 loading="lazy"
 />
 <figcaption className="border-t border-border bg-stone-soft px-6 py-3 text-center text-xs italic text-muted-foreground">
 40 ans de no-code en six camps — du tableur à l'humain orchestrateur d'agents.
 </figcaption>
 </figure>

 {/* Infographie : Comment fonctionne une IA */}
 <figure className="mt-10 overflow-hidden rounded-xl border border-border bg-background">
 <img
 src={commentIA.url}
 alt="Comment fonctionne une IA : du carburant (données) au modèle, puis au prompt et à la réponse, avec les limites face au cerveau humain"
 className="w-full"
 />
 <figcaption className="border-t border-border bg-stone-soft px-6 py-3 text-center text-xs italic text-muted-foreground">
 Données → Modèle → Prompt &amp; Réponse &nbsp;·&nbsp; L'IA calcule, l'humain pense.
 </figcaption>
  </figure>

  <IkeaAnalogy />

 {/* Cas exemple : évolution de la gestion d'une facture */}
 <div className="mt-14">
  <div className="text-[11px] uppercase tracking-[0.2em] text-primary">
   Cas exemple
  </div>
  <h3 className="mt-2 font-serif text-2xl text-foreground md:text-3xl">
   Générer une facture — 40 ans d'outils, une même tâche
  </h3>
  <p className="mt-2 max-w-2xl text-sm italic text-muted-foreground">
   La tâche n'a pas changé. Ce qui a changé, c'est l'effort, le temps et qui fait quoi.
  </p>

  <div className="mt-6 grid gap-4 md:grid-cols-4">
   {INVOICE_STEPS.map((step, i) => (
    <div
     key={step.label}
     className="relative flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm"
    >
     <div className="flex items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
       Étape {String(i + 1).padStart(2, "0")}
      </span>
      <span className="text-lg" aria-hidden>{step.icon}</span>
     </div>
     <h4 className="mt-2 font-serif text-base text-primary">{step.label}</h4>
     <p className="mt-2 text-sm leading-relaxed text-foreground/85">
      {step.what}
     </p>
     <div className="mt-4 space-y-2 border-t border-border pt-3 text-xs">
      <div>
       <span className="font-medium text-foreground">Temps · </span>
       <span className="text-foreground/80">{step.time}</span>
       <span className="block text-muted-foreground">{step.timeNote}</span>
      </div>
      <div>
       <span className="font-medium text-foreground">Facilité · </span>
       <span className="text-foreground/80">{step.ease}</span>
       <span className="block text-muted-foreground">{step.easeNote}</span>
      </div>
     </div>
    </div>
   ))}
  </div>

  <p className="mt-5 text-sm text-muted-foreground">
   Chaque palier déplace l'humain : d'exécutant → assembleur → superviseur.
  </p>
 </div>
 </Section>
 );
}

const INVOICE_STEPS = [
 {
  label: "Code pur",
  icon: "</>",
  what: "Script C++ pour générer un PDF.",
  time: "Très long",
  timeNote: "Semaines",
  ease: "Difficile",
  easeNote: "Expertise technique, coûteux",
 },
 {
  label: "Excel",
  icon: "▦",
  what: "Template manuel + Enregistrer sous PDF.",
  time: "Chronophage",
  timeNote: "Manuel, répétitif",
  ease: "Facile en apparence",
  easeNote: "Risque d'erreur élevé",
 },
 {
  label: "No-code",
  icon: "⇄",
  what: "Typeform → Airtable → Make → PDF.",
  time: "Instantané",
  timeNote: "Automatisé",
  ease: "Moyenne",
  easeNote: "Compréhension logique",
 },
 {
  label: "IA agentique",
  icon: "🤖",
  what: "Scan mail + OCR + classement autonome.",
  time: "Zéro intervention",
  timeNote: "Autonome",
  ease: "Très facile",
  easeNote: "Supervision seulement",
 },
];
