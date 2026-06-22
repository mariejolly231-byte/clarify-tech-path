import { Section } from "./Section";

type Tool = { name: string; usage: string; multi?: boolean };
type Cat = { icon: string; title: string; metaphor: string; tools: Tool[] };

const CATEGORIES: Cat[] = [
  {
    icon: "🗂️",
    title: "Bases de données & espaces de travail",
    metaphor: "Le camp de base — là où tout se pose et s'organise",
    tools: [
      { name: "Notion", usage: "Docs + base de données + wiki + tâches", multi: true },
      { name: "Airtable", usage: "Base de données avec vues multiples", multi: true },
      { name: "Google Sheets", usage: "Tableur collaboratif simple", multi: true },
    ],
  },
  {
    icon: "🔌",
    title: "Automatisation & connecteurs (« Glue »)",
    metaphor: "Les mousquetons — ils relient les équipements entre eux",
    tools: [
      { name: "Make (ex-Integromat)", usage: "Automatisation visuelle multi-étapes, puissant" },
      { name: "n8n", usage: "Alternative open-source à Make, plus technique" },
      { name: "Zapier", usage: "Le plus simple, le plus connu" },
      { name: "Notion / Airtable Automations", usage: "Intégrées aux outils" },
    ],
  },
  {
    icon: "🏗️",
    title: "Construction d'applications & sites",
    metaphor: "Le matériel de bivouac — on construit selon le terrain",
    tools: [
      { name: "Bubble", usage: "App web complexe sans coder" },
      { name: "Lovable", usage: "App web via Vibe Coding (IA + code)", multi: true },
      { name: "Softr", usage: "Transformer Airtable/Notion en app ou portail" },
      { name: "Webflow", usage: "Sites vitrines professionnels" },
      { name: "Carrd / Systeme.io", usage: "Landing page simple" },
    ],
  },
  {
    icon: "🤝",
    title: "CRM & gestion client",
    metaphor: "Le carnet de route — aucun contact perdu en chemin",
    tools: [
      { name: "Notion CRM", usage: "Simple, intégré à l'espace de travail", multi: true },
      { name: "Airtable CRM", usage: "Sur-mesure avec automatisations", multi: true },
      { name: "HubSpot Free", usage: "CRM complet, gratuit en version de base" },
      { name: "Brevo", usage: "CRM + email marketing" },
    ],
  },
  {
    icon: "🧠",
    title: "IA intégrée dans les outils",
    metaphor: "La boussole intelligente — elle lit le terrain pour toi",
    tools: [
      { name: "ChatGPT / Claude / Gemini", usage: "Assistants IA conversationnels" },
      { name: "Perplexity", usage: "Recherche augmentée par IA" },
      { name: "Make + IA", usage: "Automatisation connectée à une IA" },
      { name: "Notion AI", usage: "IA dans l'espace de travail", multi: true },
    ],
  },
];

export function ToolsMap() {
  return (
    <Section
      id="outils"
      num="03·C"
      eyebrow="Carte du territoire"
      title={
        <>
          Les outils no-code : ta <span className="text-primary">carte du territoire</span>
        </>
      }
      tint="sage"
    >
      <p className="mb-10 text-base italic text-muted-foreground">
        Pas besoin de tous les connaître. Juste savoir où chaque outil vit dans le paysage.
      </p>

      <div className="space-y-10">
        {CATEGORIES.map((c) => (
          <div key={c.title}>
            <div className="mb-4 flex flex-wrap items-baseline gap-3 border-b border-border pb-3">
              <span className="text-2xl" aria-hidden>{c.icon}</span>
              <h3 className="font-serif text-xl text-foreground md:text-2xl">{c.title}</h3>
              <span className="text-sm italic text-muted-foreground">— {c.metaphor}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {c.tools.map((t) => (
                <div
                  key={t.name}
                  className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-serif text-base font-medium text-foreground">{t.name}</div>
                    {t.multi && (
                      <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                        multi-usage 🔀
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-foreground/80">{t.usage}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-12 rounded-md bg-stone-soft px-5 py-4 text-sm italic text-foreground/80">
        Tendance 2024-2025 : les outils convergent. Notion intègre de l'IA.
        Airtable intègre de l'automatisation. Make intègre de l'IA.
        La frontière entre catégories s'efface — c'est votre usage qui compte.
      </p>
    </Section>
  );
}
