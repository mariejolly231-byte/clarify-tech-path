import { Section } from "./Section";

type Tool = { name: string; usage: string; price: string; multi?: boolean; deal?: string };
type Cat = { icon: string; title: string; metaphor: string; tools: Tool[] };

const CATEGORIES: Cat[] = [
  {
    icon: "🗂️",
    title: "Bases de données & espaces de travail",
    metaphor: "Le camp de base — là où tout se pose et s'organise",
    tools: [
      { name: "Notion", usage: "Docs + base de données + wiki + tâches", price: "Gratuit · Plus 10 $/mois · Notion AI +10 $/mois", multi: true },
      { name: "Airtable", usage: "Base de données structurée avec vues multiples", price: "Gratuit (1 000 lignes) · Team 20 $/mois/utilisateur", multi: true },
      { name: "Google Sheets", usage: "Tableur collaboratif, point d'entrée universel", price: "Gratuit (inclus Google Workspace)", multi: true },
    ],
  },
  {
    icon: "🔌",
    title: "Automatisation & connecteurs",
    metaphor: "Les mousquetons — ils relient les équipements entre eux",
    tools: [
      { name: "Make (ex-Integromat)", usage: "Automatisation visuelle multi-étapes, très puissant — 2 à 4× moins cher que Zapier", price: "Gratuit (1 000 opérations/mois) · Core 9 $/mois" },
      { name: "n8n", usage: "Alternative open-source, plus technique, contrôle total", price: "Gratuit en auto-hébergé · Cloud dès 20 $/mois" },
      { name: "Zapier", usage: "Le plus simple, le plus connu", price: "Gratuit (100 tâches/mois) · Starter 19,99 $/mois" },
      { name: "Airtable / Notion Automations", usage: "Automatisations intégrées, sans sortir de l'outil", price: "Inclus dans les plans payants" },
    ],
  },
  {
    icon: "🏗️",
    title: "Construction d'applications & sites",
    metaphor: "Le matériel de bivouac — on construit selon le terrain",
    tools: [
      { name: "Bubble", usage: "App web complexe sans coder", price: "Gratuit limité · Starter 29 $/mois" },
      { name: "Lovable", usage: "App web via Vibe Coding (IA + code), aller vite sur un MVP", price: "Gratuit limité · Pro 25 $/mois", multi: true },
      { name: "Softr", usage: "Transformer Airtable ou Notion en portail client ou app", price: "Gratuit · Basic 49 $/mois" },
      { name: "Webflow", usage: "Sites vitrines professionnels", price: "Gratuit · Basic 14 $/mois" },
      { name: "Carrd / Systeme.io", usage: "Landing page simple, tunnel de vente", price: "Carrd gratuit · Systeme.io gratuit jusqu'à 2 000 contacts" },
    ],
  },
  {
    icon: "🤝",
    title: "CRM & gestion client",
    metaphor: "Le carnet de route — aucun contact perdu en chemin",
    tools: [
      { name: "Notion CRM", usage: "CRM simple intégré à l'espace de travail", price: "Inclus dans Notion (dès 10 $/mois)", multi: true },
      { name: "Airtable CRM", usage: "CRM sur-mesure avec automatisations", price: "Inclus dans Airtable Team (20 $/mois/utilisateur)", multi: true },
      { name: "HubSpot Free", usage: "CRM complet avec pipeline commercial", price: "Gratuit (fonctions de base très solides)" },
      { name: "Brevo", usage: "CRM + email marketing + SMS", price: "Gratuit jusqu'à 300 emails/jour · Starter 7 €/mois" },
    ],
  },
  {
    icon: "🧠",
    title: "IA dans les outils",
    metaphor: "La boussole intelligente — elle lit le terrain pour toi",
    tools: [
      { name: "ChatGPT (OpenAI)", usage: "Assistant IA, rédaction, analyse", price: "Gratuit · Plus 20 $/mois · Business 30 $/mois/siège", deal: "Freelance Stack : 1 siège Business offert 2 ans" },
      { name: "Claude (Anthropic)", usage: "Rédaction longue, analyse de documents, rigueur", price: "Gratuit · Pro 20 $/mois" },
      { name: "Perplexity", usage: "Recherche augmentée par IA avec sources citées", price: "Gratuit · Pro 20 $/mois" },
      { name: "Make + IA", usage: "Automatisation avec intelligence dans la boucle", price: "Inclus dans Make + coût API IA à l'usage", multi: true },
      { name: "Notion AI", usage: "Résumer, rédiger, traduire depuis ses propres docs", price: "+10 $/mois/utilisateur en supplément de Notion", multi: true },
    ],
  },
];

export function ToolsMap() {
  return (
    <Section
      id="outils"
      num="11"
      eyebrow="Acte 3 · Choisir son chemin"
      title={
        <>
          La <span className="text-primary">carte du territoire</span> no-code
        </>
      }
      tint="sage"
    >
      <p className="mb-10 text-base italic text-muted-foreground">
        Pas besoin de tout connaître. Juste savoir où chaque outil vit dans le paysage.
      </p>

      {/* Encart Freelance Stack */}
      <div className="mb-12 rounded-2xl border-2 border-primary/40 bg-primary/[0.06] p-7 shadow-sm">
        <div className="flex items-baseline gap-3">
          <span className="text-2xl" aria-hidden>💡</span>
          <h3 className="font-serif text-xl text-foreground md:text-2xl">
            Un bon plan <span className="text-primary">avant de payer plein tarif</span>
          </h3>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">
          <span className="font-medium">Freelance Stack</span> : plateforme française de réductions
          négociées sur 800+ logiciels pour indépendants et entrepreneurs.{" "}
          <span className="font-medium">55 €/an</span>, souvent rentabilisé avec un seul deal.
        </p>
        <p className="mt-3 text-sm text-foreground/80">
          Exemples de deals actifs : ChatGPT Business (1 siège offert 2 ans), Airtable
          (1 000 $ de crédits), Notion, Brevo, et bien d'autres.
        </p>
        <p className="mt-3 text-sm italic text-muted-foreground">→ Lien partagé en fin d'atelier.</p>
      </div>

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
                  <p className="mt-1 text-xs font-medium text-muted-foreground">{t.price}</p>
                  {t.deal && (
                    <p className="mt-1 rounded-md bg-primary/10 px-2 py-1 text-[11px] text-primary">
                      💡 {t.deal}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-12 rounded-md bg-stone-soft px-5 py-4 text-sm italic text-foreground/80">
        Tendance 2025 : les outils convergent. Notion intègre de l'IA. Airtable intègre de
        l'automatisation. Make intègre de l'IA. La frontière entre catégories s'efface —
        c'est votre usage qui compte.
      </p>
    </Section>
  );
}
