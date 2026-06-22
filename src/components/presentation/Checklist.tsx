import { Section } from "./Section";

const REFLEXES = [
 "Toutes les données ne doivent pas partir dans des outils tiers.",
 "Anonymiser quand c'est possible.",
 "Limiter les accès au strict nécessaire.",
 "Séparer le brouillon et l'envoi.",
 "Garder une validation humaine sur les actions sensibles.",
 "Penser RGPD dès le départ — pas après.",
];

export function Checklist() {
 return (
 <Section
 id="checklist"
 num="15c"
 eyebrow="Acte 4 · Sécuriser la cordée"
 title="La check-list du randonneur prudent"
 >
 <div className="rounded-2xl border border-border bg-stone-soft p-7">
 <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-primary">
 Checklist de vigilance
 </div>
 <ul className="grid gap-3 md:grid-cols-2">
 {REFLEXES.map((r, i) => (
 <li key={r} className="flex items-start gap-3 text-sm text-foreground/85">
 <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-card font-mono text-[10px] text-primary">
 {i + 1}
 </span>
 {r}
 </li>
 ))}
 </ul>
 </div>
 </Section>
 );
}
