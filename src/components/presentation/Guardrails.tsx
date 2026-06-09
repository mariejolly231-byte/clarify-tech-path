import { Section } from "./Section";
import { RgpdCompass } from "./Infographics";

const LIGHTS = [
  {
    color: "go",
    label: "Feu vert",
    title: "Vous pouvez y aller",
    items: [
      "Données publiques ou non sensibles",
      "Brouillon généré, validation humaine avant envoi",
      "Accès limité aux personnes qui en ont besoin",
    ],
  },
  {
    color: "caution",
    label: "Feu orange",
    title: "Cadrer d'abord",
    items: [
      "Données client identifiables",
      "Action qui engage l'entreprise (devis, contrat)",
      "Outil tiers dont vous ne maîtrisez pas le traitement",
    ],
  },
  {
    color: "warn",
    label: "Feu rouge",
    title: "Stop, on revoit",
    items: [
      "Données sensibles (santé, juridique, RH) sans cadre RGPD",
      "Envoi automatique sans relecture humaine",
      "Action irréversible sans garde-fou",
    ],
  },
];

const REFLEXES = [
  "Toutes les données ne doivent pas partir dans des outils tiers.",
  "Anonymiser quand c'est possible.",
  "Limiter les accès au strict nécessaire.",
  "Séparer le brouillon et l'envoi.",
  "Garder une validation humaine sur les actions sensibles.",
  "Penser RGPD dès le départ — pas après.",
];

const dot: Record<string, string> = {
  go: "bg-go",
  caution: "bg-caution",
  warn: "bg-warn",
};

export function Guardrails() {
  return (
    <Section
      id="gardefous"
      num="07"
      eyebrow="Garde-fous"
      title={<>Aller vite, oui. <span className="text-primary">Aller au mur, non.</span></>}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {LIGHTS.map((l) => (
          <div key={l.label} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className={`h-3.5 w-3.5 rounded-full ${dot[l.color]} ring-4 ring-stone-soft`} />
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {l.label}
              </span>
            </div>
            <h3 className="mt-3 font-serif text-xl text-foreground">{l.title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground/80">
              {l.items.map((it) => (
                <li key={it} className="flex gap-2">
                  <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-stone-soft p-7">
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

      <RgpdCompass />
    </Section>

  );
}
