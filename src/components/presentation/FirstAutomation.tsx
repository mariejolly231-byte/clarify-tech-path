import { Section } from "./Section";
import { DurationBadge } from "./Badge";

const STEPS_IPHONE = [
 'Ouvre l\'app "Raccourcis" (native iOS, déjà installée)',
 "Crée un nouveau raccourci",
 'Ajoute l\'action "Dicter du texte"',
 'Ajoute l\'action "Créer un rappel" (ou "Ajouter une note", ou "Envoyer à Notion")',
 'Nomme-le "Pense pas bête"',
 "Ajoute l'icône à l'écran d'accueil",
];

const PLATFORMS = [
 { name: "iPhone / iPad", tool: "App Raccourcis (native)" },
 { name: "Android", tool: "Automate ou Google Assistant Routines" },
 { name: "Mac", tool: "App Raccourcis (native depuis macOS Monterey)" },
 { name: "Windows", tool: "Power Automate Desktop (gratuit Microsoft)" },
];

export function FirstAutomation() {
 return (
 <Section
 id="raccourci"
 num="16"
 eyebrow="Acte 5 · On marche"
 title="Premier pas — le pense-bête vocal"
 >
 <DurationBadge>⏱ 10 min · Manipulation live</DurationBadge>
 <p className="mb-12 text-base italic text-muted-foreground">
 Avant Make, Zapier ou n8n, il y a un outil que vous avez déjà.
 On le construit ensemble, maintenant.
 </p>

 {/* Stepper */}
 <ol className="grid gap-4 md:grid-cols-4">
 {[
 { num: "01", title: "L'idée", body: null },
 { num: "02", title: "Sur iPhone", body: null },
 { num: "03", title: "Selon ton système", body: null },
 { num: "04", title: "Aller plus loin", body: null },
 ].map((s) => (
 <li
 key={s.num}
 className="rounded-xl border border-primary/30 bg-primary/[0.04] p-4"
 >
 <div className="font-mono text-xs text-primary">Étape {s.num}</div>
 <div className="mt-1 font-serif text-lg text-foreground">{s.title}</div>
 </li>
 ))}
 </ol>

 {/* Étape 1 */}
 <div className="mt-12 rounded-2xl border border-border bg-card p-7 shadow-sm">
 <div className="text-[11px] uppercase tracking-[0.2em] text-primary">Étape 1 — L'idée</div>
 <h3 className="mt-2 font-serif text-2xl text-foreground md:text-3xl">
 Le <span className="text-primary">pense-bête vocal</span>
 </h3>
 <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">
 Je parle → ça s'enregistre automatiquement → je retrouve l'idée dans mes rappels,
 mes notes, ou mon outil préféré. <span className="font-medium">Sans rien taper.</span>
 </p>
 </div>

 {/* Étape 2 */}
 <div className="mt-8 rounded-2xl border border-accent bg-accent/40 p-7">
 <div className="text-[11px] uppercase tracking-[0.2em] text-primary">
 Étape 2 — Sur iPhone : l'app Raccourcis
 </div>
 <ol className="mt-5 space-y-3">
 {STEPS_IPHONE.map((s, i) => (
 <li key={s} className="flex gap-4 text-[15px] leading-relaxed text-foreground/90">
 <span className="font-mono text-lg font-medium text-primary">{i + 1}.</span>
 <span>{s}</span>
 </li>
 ))}
 </ol>
 <p className="mt-6 rounded-md bg-background/70 px-4 py-3 text-sm italic text-foreground/80">
 Résultat : tu appuies → tu parles → c'est enregistré.
 </p>
 </div>

 {/* Étape 3 */}
 <div className="mt-8">
 <div className="text-[11px] uppercase tracking-[0.2em] text-primary">
 Étape 3 — Les équivalents selon ton système
 </div>
 <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
 {PLATFORMS.map((p) => (
 <div key={p.name} className="rounded-xl border border-border bg-card p-4"> <div className="mt-2 font-serif text-base text-foreground">{p.name}</div>
 <p className="mt-1 text-sm text-foreground/80">→ {p.tool}</p>
 </div>
 ))}
 </div>
 </div>

 {/* Étape 4 */}
 <div className="mt-8 rounded-2xl border border-border bg-card p-7 shadow-sm">
 <div className="text-[11px] uppercase tracking-[0.2em] text-primary">
 Étape 4 — Aller plus loin
 </div>
 <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">
 Ce raccourci peut déclencher un <span className="font-medium">webhook Make ou n8n</span>.
 Tu parles sur ton téléphone → l'idée atterrit dans Notion, Airtable, ton CRM
 ou un canal Slack. C'est votre première automatisation multi-outils.
 </p>
 </div>

 <blockquote className="mt-10 border-l-4 border-primary bg-stone-soft/60 px-6 py-5 font-serif text-xl leading-snug text-foreground md:text-2xl">
 <span className="mr-2" aria-hidden></span>
 Ce raccourci, c'est votre premier <span className="text-primary">mousqueton</span>.
 Simple, solide, toujours dans la poche.
 </blockquote>
 </Section>
 );
}
