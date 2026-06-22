import { Section } from "./Section";

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
      num="14"
      eyebrow="Acte 3 · Choisir son chemin"
      title="Choisir sa voie"
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
    </Section>
  );
}
