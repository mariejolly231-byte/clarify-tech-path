import { Section } from "./Section";

const STEPS = [
 { year: "1979", name: "VisiCalc", text: "On structure les données sans coder" },
 { year: "1993", name: "Microsoft Access", text: "Les bases de données arrivent en bureau" },
 { year: "2003", name: "WordPress", text: "N'importe qui peut créer un site" },
 { year: "2009-2014", name: "Zapier · Airtable · Bubble", text: "Automatisation et apps sans code arrivent" },
 { year: "2020", name: "Explosion post-Covid", text: "Le no-code devient grand public" },
 { year: "2023-2024", name: "L'IA entre dans les outils", text: "Les outils deviennent intelligents et multi-usages" },
 { year: "2025", name: "Vibe Coding", text: "Tu décris, l'IA construit" },
];

export function History() {
 return (
 <Section
 id="histoire"
 num="04"
 eyebrow="Acte 1 · Vous êtes déjà équipés"
 title="30 ans de sentiers tracés"
 >
 <p className="mb-12 text-base italic text-muted-foreground">
 De l'Excel au Vibe Coding : la montée en altitude a pris 30 ans.
 </p>

 {/* Frise verticale en mobile, horizontale en desktop */}
 <div className="relative">
 <div className="hidden lg:block">
 <div className="relative grid grid-cols-7 gap-4 pt-8">
 {STEPS.map((s, i) => {
 const altitude = 40 + i * 18; // hauteur croissante
 return (
 <div key={s.year} className="flex flex-col items-center">
 <div
 className="flex w-full flex-col items-center justify-end"
 style={{ height: `${altitude + 40}px` }}
 >
 <div className="text-center">
 <div className="font-mono text-xs text-primary">{s.year}</div>
 <div className="mt-1 font-serif text-sm font-medium text-foreground">{s.name}</div>
 </div>
 </div>
 {/* Sommet */}
 <div
 className="w-full bg-gradient-to-t from-accent to-primary/30"
 style={{
 height: `${altitude}px`,
 clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
 }}
 />
 <p className="mt-3 px-1 text-center text-xs leading-snug text-foreground/80">
 {s.text}
 </p>
 </div>
 );
 })}
 <div className="absolute bottom-[120px] left-0 right-0 h-px bg-border" />
 </div>
 </div>

 {/* Mobile : liste verticale */}
 <ol className="space-y-4 lg:hidden">
 {STEPS.map((s) => (
 <li key={s.year} className="flex gap-4 rounded-xl border border-border bg-card p-4">
 <div className="shrink-0 font-mono text-xs text-primary">{s.year}</div>
 <div>
 <div className="font-serif text-base text-foreground">{s.name}</div>
 <div className="text-sm text-foreground/80">{s.text}</div>
 </div>
 </li>
 ))}
 </ol>
 </div>

 {/* Encart Vibe Coding */}
 <div className="mt-14 rounded-2xl border-2 border-primary/40 bg-primary/[0.06] p-8 shadow-sm">
 <div className="flex items-baseline gap-3">
 <span className="text-3xl" aria-hidden></span>
 <h3 className="font-serif text-2xl text-foreground md:text-3xl">
 Le <span className="text-primary">Vibe Coding</span>, c'est quoi ?
 </h3>
 </div>
 <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">
 Le Vibe Coding, c'est créer un outil ou une application en décrivant
 ce qu'on veut en langage naturel — et laisser l'IA générer le code à ta place.
 Tu donnes la direction, l'IA construit le chemin. Pas besoin de savoir programmer :
 tu pilotes, tu valides, tu ajustes.
 </p>
 <div className="mt-5 flex flex-wrap gap-2">
 {["Lovable", "Cursor", "Bolt", "v0"].map((t) => (
 <span
 key={t}
 className="rounded-full border border-primary/40 bg-background px-4 py-1.5 text-sm font-medium text-primary"
 >
 {t}
 </span>
 ))}
 </div>
 </div>
 </Section>
 );
}
