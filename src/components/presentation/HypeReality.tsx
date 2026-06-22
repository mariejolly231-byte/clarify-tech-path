import { Section } from "./Section";
import { AdoptionCurve } from "./Infographics";

const COLS = [
 {
 title: "Ce qu'on voit passer",
 tag: "Hype",
 body: "Démos parfaites, agents « autonomes », promesses de gains spectaculaires, fil LinkedIn saturé. Sentiment d'être en retard.",
 tone: "warn",
 },
 {
 title: "Ce que les outils savent faire",
 tag: "Capacités",
 body: "Rédiger, résumer, classer, extraire, déclencher des actions. De vrais gains, dans des cas précis et bien cadrés.",
 tone: "primary",
 },
 {
 title: "Ce que les entreprises utilisent vraiment",
 tag: "Adoption",
 body: "Quelques cas d'usage isolés. Beaucoup d'expérimentations qui n'arrivent pas en production. Adoption inégale.",
 tone: "sand",
 },
 {
 title: "Ce qu'il faut mettre en place avant",
 tag: "Pré-requis",
 body: "Processus clair, données propres, validation humaine, RGPD. Sans ça, l'outil n'a rien de solide sur quoi se poser.",
 tone: "sage",
 },
];

const toneClass: Record<string, string> = {
 warn: "border-warn/30 bg-warn/5",
 primary: "border-primary/30 bg-primary/[0.04]",
 sand: "border-sand bg-sand/40",
 sage: "border-accent bg-accent/40",
};

export function HypeReality() {
 return (
 <Section
 id="hype"
 num="05"
 eyebrow="Partie 1 · D'où ça vient — où on en est"
 tint="sand"
 title="La météo vs la réalité"
 >
 <div className="grid gap-4 md:grid-cols-4">
 {COLS.map((c) => (
 <div key={c.title} className={`flex flex-col rounded-2xl border p-6 ${toneClass[c.tone]}`}>
 <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-primary">{c.tag}</div>
 <h3 className="mb-3 font-serif text-xl text-foreground">{c.title}</h3>
 <p className="text-sm leading-relaxed text-foreground/80">{c.body}</p>
 </div>
 ))}
 </div>

 <AdoptionCurve />

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




 <blockquote className="mx-auto mt-14 max-w-3xl border-l-4 border-primary bg-card px-7 py-6 text-center font-serif text-2xl leading-snug text-foreground md:text-3xl">
 « Le problème n'est pas seulement l'outil.
 <br />
 Le problème, c'est souvent le <span className="text-primary">flou du processus</span>. »
 </blockquote>
 </Section>
 );
}
