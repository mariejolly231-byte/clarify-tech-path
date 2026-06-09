import { Section } from "./Section";
import { DecisionMatrix } from "./Infographics";

const QUADRANTS = [
  {
    k: "Garder manuel",
    color: "border-sand bg-sand/30",
    when: "Faible fréquence, geste artisanal, jugement humain fort, données sensibles, peu de gain.",
    ex: "Un cahier de commandes pour quelques pièces très artisanales par mois.",
  },
  {
    k: "Assister avec l'IA",
    color: "border-accent bg-accent/40",
    when: "Tâche récurrente mais non standardisée. Vous gardez la main, l'IA accélère un brouillon.",
    ex: "Reformuler un mail, résumer un appel, préparer un post LinkedIn.",
  },
  {
    k: "Automatiser",
    color: "border-primary/40 bg-primary/[0.05]",
    when: "Fréquent, répétitif, règles stables, faible enjeu de jugement, données encadrées.",
    ex: "Recevoir un formulaire → créer une ligne → envoyer un mail de confirmation.",
  },
  {
    k: "Ne pas traiter maintenant",
    color: "border-warn/30 bg-warn/5",
    when: "Processus flou, données sensibles non cadrées, gain incertain, peu de volume. On clarifie d'abord.",
    ex: "Faire trier des candidatures par une IA sans politique RGPD ni validation humaine.",
  },
];

const CRIT = [
  "Fréquence",
  "Répétitivité",
  "Règles stables ?",
  "Sensibilité des données",
  "Besoin de validation humaine",
  "Gain réel attendu",
];

export function Decide() {
  return (
    <Section
      id="avant"
      num="07"
      eyebrow="Avant d'automatiser"
      title={<>Décider, <span className="text-primary">avant</span> d'outiller.</>}
    >
      <p className="mb-10 max-w-3xl text-base text-muted-foreground md:text-lg">
        Pour chaque tâche du quotidien, posez-vous quelques questions simples avant
        d'ajouter un outil. La bonne réponse n'est pas toujours « automatiser ».
      </p>

      <div className="mb-10 flex flex-wrap gap-2">
        {CRIT.map((c) => (
          <span
            key={c}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"
          >
            {c}
          </span>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {QUADRANTS.map((q) => (
          <div key={q.k} className={`rounded-2xl border p-6 ${q.color}`}>
            <h3 className="font-serif text-2xl text-foreground">{q.k}</h3>
            <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-primary">Quand</div>
            <p className="mt-1 text-sm leading-relaxed text-foreground/85">{q.when}</p>
            <div className="mt-4 text-[11px] uppercase tracking-[0.2em] text-primary">Exemple</div>
            <p className="mt-1 text-sm italic text-foreground/75">{q.ex}</p>
          </div>
        ))}
      </div>

      <DecisionMatrix />



      <blockquote className="mt-12 border-l-4 border-warn bg-card px-7 py-5 font-serif text-xl leading-snug text-foreground md:text-2xl">
        « Automatiser un mauvais processus le rend surtout plus rapide…
        <span className="text-warn"> à dysfonctionner.</span> »
      </blockquote>
    </Section>
  );
}
