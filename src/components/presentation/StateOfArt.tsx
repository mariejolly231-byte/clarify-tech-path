import { Section } from "./Section";

const STATS = [
 {
 n: "70%",
 text: "des nouvelles applications d'entreprise utilisent du no-code ou du low-code en 2026",
 source: "Gartner",
 },
 {
 n: "80%",
 text: "des utilisateurs de ces plateformes ne viennent pas des services informatiques",
 source: "Gartner 2026",
 },
 {
 n: "10 à 20h",
 text: "économisées par semaine pour 37% des utilisateurs no-code",
 source: "Zapier",
 },
 {
 n: "1 mois",
 text: "suffit à 70% des utilisateurs pour maîtriser un outil no-code sans expérience préalable",
 source: "Mendix",
 },
];

export function StateOfArt() {
 return (
 <Section
 id="etat-de-l-art"
 num="05"
 eyebrow="Partie 1 · D'où ça vient — où on en est"
 title="L'altitude en 2026"
 >
 <p className="mb-12 text-base italic text-muted-foreground">
 Pas une tendance. Un standard de fait — le no-code est désormais sur la carte.
 </p>

 <div className="grid gap-5 md:grid-cols-2">
 {STATS.map((s) => (
 <div
 key={s.n}
 className="flex flex-col items-center rounded-2xl border border-primary/30 bg-primary/[0.04] p-8 text-center shadow-sm"
 >
 <div className="font-serif text-6xl font-medium text-primary md:text-7xl">
 {s.n}
 </div>
 <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-foreground/90">
 {s.text}
 </p>
 <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
 Source · {s.source}
 </div>
 </div>
 ))}
  </div>

  <div className="mt-12 rounded-2xl border border-primary/20 bg-stone-soft/60 p-7 shadow-sm">
    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
      Panorama 2026 — ce qui a changé
    </div>
    <p className="mt-4 text-[15px] leading-relaxed text-foreground/90 md:text-base">
      « ChatGPT a atteint 100 millions d'utilisateurs en 2 mois. Depuis, les IA
      génératives sont entrées dans les outils du quotidien — Notion, Sheets,
      Gmail, Word. En 2026, la question n'est plus "est-ce que ça marche ?" mais
      "comment je l'utilise sans me tromper ?" »
    </p>
    <div className="mt-6 grid gap-3 md:grid-cols-2">
      {[
        "Les LLM lisent désormais images, audio et vidéo — pas seulement du texte",
        "Les agents IA commencent à agir (réserver, envoyer, modifier) — pas seulement répondre",
        "Le no-code et l'IA convergent : Lovable, Bolt, Cursor = décrire pour construire",
        "La réglementation arrive : AI Act européen entré en vigueur progressivement depuis 2025",
      ].map((fact) => (
        <div
          key={fact}
          className="rounded-xl border border-border/60 bg-background/80 p-4 text-[14px] leading-relaxed text-foreground/85"
        >
          {fact}
        </div>
      ))}
    </div>
  </div>



 <div className="mt-12 rounded-2xl border-2 border-warn/40 bg-warn/[0.08] p-7 shadow-sm">
 <div className="flex items-baseline gap-3">
 <span className="text-2xl" aria-hidden>
 
 </span>
 <h3 className="font-serif text-2xl text-foreground md:text-3xl">
 Le vrai risque : <span className="text-warn">le Shadow IT</span>
 </h3>
 </div>
 <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">
 Les apps créées hors du contrôle de l'organisation explosent.
 Sécurité, RGPD, cohérence du SI : la gouvernance du no-code devient
 un enjeu stratégique.
 </p>
 </div>

 </Section>
 );
}
