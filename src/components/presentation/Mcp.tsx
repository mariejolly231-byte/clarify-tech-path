import { Section } from "./Section";
import { DurationBadge } from "./Badge";

const USAGES = [
  "Résume mes mails non lus de la semaine",
  "Qu'est-ce que j'ai comme rendez-vous demain ?",
  "Trouve le document où j'ai noté les tarifs clients",
  "Rédige une réponse à ce mail et mets-la en brouillon",
];

const DEMOS = [
  {
    name: "Claude",
    steps: [
      "Va sur claude.ai",
      "Clique sur Intégrations (menu gauche)",
      "Connecte ton compte Google",
      "Active Gmail et Google Drive",
      "Tape : « Résume mes 5 derniers mails non lus »",
    ],
    cost: "Gratuit ou Pro 20 $/mois",
    note: "Connexion native, pas d'outil tiers.",
  },
  {
    name: "ChatGPT",
    steps: [
      "Va sur chatgpt.com",
      "Clique sur Explorer les GPTs",
      "Installe le connecteur Gmail officiel",
      "Autorise l'accès à ton compte Google",
      "Tape : « Quels mails importants ai-je reçus aujourd'hui ? »",
    ],
    cost: "Nécessite ChatGPT Plus (20 $/mois)",
  },
  {
    name: "Gemini",
    steps: [
      "Va sur gemini.google.com",
      "Accès natif à Gmail si tu es connecté avec ton compte Google — aucune config",
      "Tape : « Résume mes mails non lus de cette semaine »",
    ],
    cost: "Gratuit avec un compte Google",
    note: "Le plus simple pour démarrer.",
  },
];

export function Mcp() {
  return (
    <Section
      id="mcp"
      num="13"
      eyebrow="Partie 2 · Comprendre les outils"
      title="Un premier pas vers l'assistance augmentée"
    >
      <DurationBadge>⏱ 15 min · Démo live</DurationBadge>
      <p className="mb-10 text-base italic text-muted-foreground">
        Jusqu'ici ton IA répondait à tes questions. Maintenant elle peut lire
        tes mails, tes fichiers, ton agenda.
      </p>

      <div className="mb-10 rounded-2xl border border-border bg-card p-7 shadow-sm">
        <div className="text-[11px] uppercase tracking-[0.2em] text-primary">
          C'est quoi MCP ?
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">
          <span className="font-medium">MCP = Model Context Protocol.</span>{" "}
          Un standard qui permet à une IA de se connecter à tes outils et
          d'agir dessus à ta demande.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">
          <span className="text-muted-foreground">Sans MCP :</span> tu
          copies-colles un mail dans ChatGPT pour qu'il réponde.
          <br />
          <span className="text-primary">Avec MCP :</span> tu demandes
          « résume mes 10 derniers mails non lus » — elle le fait directement.
        </p>
      </div>

      <blockquote className="mb-12 border-l-4 border-primary bg-stone-soft/60 px-6 py-5 font-serif text-xl leading-snug text-foreground md:text-2xl">
        Avant, ton IA était au refuge. Elle répondait, mais ne voyait pas le terrain.
        <br />
        <span className="text-primary">Avec MCP, elle sort avec toi</span> —
        elle lit la carte en temps réel.
      </blockquote>

      <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-primary">
        Quatre usages très concrets
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {USAGES.map((u) => (
          <div
            key={u}
            className="rounded-xl border border-border bg-card px-5 py-4 font-serif text-base text-foreground"
          >
            « {u} »
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm italic text-muted-foreground">
        L'IA ne fait rien sans que tu le demandes. Elle lit, propose, rédige
        — toi tu valides.
      </p>

      <div className="mt-14 mb-4 text-[11px] uppercase tracking-[0.2em] text-primary">
        Trois chemins pour démarrer
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {DEMOS.map((d) => (
          <div
            key={d.name}
            className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <h3 className="font-serif text-2xl text-foreground">{d.name}</h3>
            <ol className="mt-4 space-y-2 text-sm text-foreground/85">
              {d.steps.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-background font-mono text-[10px] text-primary">
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-5 border-t border-border pt-3 text-xs text-foreground/75">
              <span className="font-medium text-foreground">Coût :</span>{" "}
              {d.cost}
            </div>
            {d.note && (
              <p className="mt-2 text-xs italic text-muted-foreground">{d.note}</p>
            )}
          </div>
        ))}
      </div>


    </Section>
  );
}
