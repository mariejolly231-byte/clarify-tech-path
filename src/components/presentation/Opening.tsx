import { Section } from "./Section";
import logoAsset from "@/assets/summit-flow-logo.png.asset.json";

export function Opening() {
 return (
 <Section
 id="ouverture"
 num="01"
 eyebrow="La carte du jour"
 tint="sand"
 title="La carte du jour"
 >
 <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
 Comprendre, trier, prioriser — avant d'ajouter des outils.
 </p>

 <div className="mt-14 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
 <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
 <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-primary">
 Ce que cet atelier n'est pas
 </div>
 <ul className="space-y-3 text-[15px] text-foreground/85">
 <li className="flex gap-3">
 <span className="mt-1 inline-block h-1.5 w-4 rounded-full bg-warn/70" />
 Pas une démonstration d'outils magiques.
 </li>
 <li className="flex gap-3">
 <span className="mt-1 inline-block h-1.5 w-4 rounded-full bg-warn/70" />
 Pas une promesse que tout doit être automatisé.
 </li>
 <li className="flex gap-3">
 <span className="mt-1 inline-block h-1.5 w-4 rounded-full bg-warn/70" />
 Pas un cours technique pour développeurs.
 </li>
 </ul>
 </div>

 <div className="flex items-center gap-3 text-right md:flex-col md:items-end">
 <img src={logoAsset.url} alt="Summit Flow" className="h-24 w-24 rounded-full ring-1 ring-border" />
 <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
 Atelier animé par
 <br />
 <span className="text-foreground">Summit Flow</span>
 </div>
 </div>
 </div>
 </Section>
 );
}
