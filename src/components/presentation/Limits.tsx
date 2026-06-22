import { Section } from "./Section";

const CARDS = [
  {
    icon: "💰",
    title: "Coûts cachés",
    body: "Les abonnements SaaS s'accumulent. Un pricing basé sur l'usage peut exploser sans qu'on s'en rende compte.",
  },
  {
    icon: "🔒",
    title: "Sécurité & RGPD",
    body: "Vos données transitent chez des tiers. Hébergement, accès, consentement : ça se cadre avant, pas après.",
  },
  {
    icon: "📦",
    title: "Dépendance à l'éditeur",
    body: "Si l'outil ferme, change de prix ou disparaît, votre process s'arrête. Vendor lock-in = risque réel.",
  },
  {
    icon: "🌫️",
    title: "Shadow IT",
    body: "Chaque outil non documenté crée un silo. La multiplication des outils fragilise le système.",
  },
  {
    icon: "📈",
    title: "Scalabilité",
    body: "Ce qui fonctionne pour 10 clients peut coincer à 500. Les limites techniques arrivent vite.",
  },
  {
    icon: "🌱",
    title: "Impact environnemental",
    body: "Les data centers et modèles IA sont très énergivores. Un outil bien choisi, c'est aussi moins de gaspillage.",
  },
];

export function Limits() {
  return (
    <Section
      id="limites"
      num="09"
      eyebrow="Acte 2 · Comprendre le terrain"
      tint="sand"
      title="Les crevasses à éviter"
    >
      <p className="mb-12 text-base italic text-muted-foreground">
        Les outils accélèrent. Les pièges aussi. On regarde la météo avant de partir.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <div
            key={c.title}
            className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="text-3xl" aria-hidden>
              {c.icon}
            </div>
            <h3 className="mt-3 font-serif text-xl text-foreground">{c.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85">
              {c.body}
            </p>
          </div>
        ))}
      </div>

      <blockquote className="mx-auto mt-12 max-w-3xl border-l-4 border-primary bg-card px-7 py-6 text-center font-serif text-xl leading-snug text-foreground md:text-2xl">
        « Ces limites ne sont pas des raisons de ne pas y aller.
        <br />
        Ce sont des raisons de <span className="text-primary">bien choisir</span>. »
      </blockquote>
    </Section>
  );
}
