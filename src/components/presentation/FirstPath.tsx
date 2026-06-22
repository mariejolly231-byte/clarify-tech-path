import { Section } from "./Section";

const STEPS = [
 {
 n: "1",
 title: "Je parle",
 text: "Le raccourci vocal capte l'idée. Aucune saisie manuelle.",
 tool: "App Raccourcis / Automate",
 },
 {
 n: "2",
 title: "L'IA reçoit",
 text: "Via MCP, l'IA accède directement à l'information.",
 tool: "Claude / ChatGPT / Gemini",
 },
 {
 n: "3",
 title: "Elle traite",
 text: "Elle résume, classe, rédige un brouillon.",
 tool: "LLM au choix",
 },
 {
 n: "4",
 title: "Make connecte",
 text: "L'action est déclenchée vers l'outil cible.",
 tool: "Make / n8n / Zapier",
 },
 {
 n: "5",
 title: "Je valide",
 text: "L'humain reste dans la boucle. Toujours.",
 tool: "Toi",
 },
];

export function FirstPath() {
 return (
 <Section
 id="assembler-sentier"
 num="17b"
 eyebrow="Partie 4 · On fait"
 title="Assembler son premier sentier"
 >
 <p className="mb-10 text-base italic text-muted-foreground">
 Ce qu'on vient de faire — en un seul chemin.
 </p>

 {/* Frise horizontale */}
 <div className="relative grid gap-6 md:grid-cols-5 md:gap-3">
 {STEPS.map((s, i) => (
 <div key={s.n} className="relative flex flex-col">
 <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
 <div className="flex items-center gap-2">
 <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 font-mono text-xs text-primary">
 {s.n}
 </span>
 <h3 className="font-serif text-lg text-foreground">{s.title}</h3>
 </div>
 <p className="mt-3 text-sm leading-relaxed text-foreground/80">{s.text}</p>
 <div className="mt-4 border-t border-border pt-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
 {s.tool}
 </div>
 </div>
 {i < STEPS.length - 1 && (
 <div
 aria-hidden
 className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 items-center justify-center text-primary/60"
 >
 →
 </div>
 )}
 </div>
 ))}
 </div>

 <div className="mt-12 rounded-2xl border border-border bg-stone-soft p-7 text-center">
 <p className="font-serif text-lg leading-relaxed text-foreground md:text-xl">
 Ce n'est pas un workflow complexe.
 <br />
 C'est votre premier sentier balisé.
 </p>
 <p className="mt-3 text-sm text-foreground/75">
 Maintenant vous allez en tracer un pour votre propre activité.
 </p>
 </div>

 </Section>
 );
}
