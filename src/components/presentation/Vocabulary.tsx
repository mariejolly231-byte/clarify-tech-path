import { Section } from "./Section";
import { IkeaAnalogy } from "./Infographics";
import troisFacons from "@/assets/trois-facons-aide.png.asset.json";
import commentIA from "@/assets/comment-fonctionne-ia.png.asset.json";
import commentIAApprend from "@/assets/comment-ia-apprend.png.asset.json";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const BRAIN = [
  "Apprend par expérience vécue",
  "Mobilise intuition, émotions, contexte, mémoire personnelle",
  "Sait improviser dans l'ambiguïté",
  "Fonctionne avec fatigue, attention, biais, perception",
];

const AI = [
  "Apprend à partir de données et d'entraînement",
  "Calcule des probabilités de réponse",
  "Repère des motifs à grande vitesse",
  "Ne comprend pas le monde comme un humain, n'a ni vécu ni intention propre",
];

const CARDS = [
  {
    k: "No-code",
    icon: "🧩",
    def: "J'assemble des briques déjà prêtes avec une interface visuelle.",
    ex: "Créer un formulaire, une base simple, une mini app ou une page sans développer from scratch.",
    tone: "primary",
  },
  {
    k: "Low-code",
    icon: "🔧",
    def: "Je pars d'une base visuelle, mais je peux ajouter du code si besoin.",
    ex: "Personnaliser un outil ou aller plus loin qu'un usage standard.",
    tone: "sage",
  },
  {
    k: "IA",
    icon: "🧠",
    def: "J'utilise un système qui aide à générer, classer, résumer, analyser ou proposer.",
    ex: "Rédiger un brouillon, résumer un document, classer des demandes.",
    tone: "sand",
  },
  {
    k: "Automatisation",
    icon: "⚙️",
    def: "Je fais en sorte qu'une suite d'actions se déclenche selon des règles définies.",
    ex: "Quand un formulaire est rempli, créer une tâche et envoyer un email.",
    tone: "sage",
  },
  {
    k: "Agent IA",
    icon: "🤖",
    def: "Je donne un objectif, des outils et un cadre. Le système peut enchaîner plusieurs étapes avec une certaine autonomie.",
    ex: "Analyser une demande, chercher des infos, proposer une action, puis attendre validation.",
    tone: "primary",
  },
];

const toneClass: Record<string, string> = {
  primary: "border-primary/30 bg-primary/[0.04]",
  sage: "border-accent bg-accent/40",
  sand: "border-sand bg-sand/40",
};

export function Vocabulary() {
  return (
    <Section
      id="tri"
      num="03"
      eyebrow="Section 03"
      title={<>No code, IA, gloubi-boulga, <span className="text-primary">késako ?</span></>}
    >
      {/* BLOC 1 — Pause cerveau / IA */}
      <div className="mb-14 rounded-2xl border border-border bg-card p-7 shadow-sm animate-fade-in">
        <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-primary">
          Petite pause
        </div>
        <h3 className="font-serif text-3xl text-foreground md:text-4xl">
          Cerveau humain et IA, <span className="text-primary">même combat ?</span>
        </h3>
        <p className="mt-2 text-base italic text-muted-foreground">
          On peut les comparer… mais ils ne fonctionnent pas de la même manière.
        </p>

        <div className="mt-6 space-y-3 text-[15px] leading-relaxed text-foreground/85">
          <p>
            Quand on parle d'intelligence artificielle, on fait souvent comme si elle pensait « comme nous ».
          </p>
          <p>
            En réalité, le cerveau humain et l'IA peuvent parfois produire des résultats proches,
            mais ils n'utilisent pas les mêmes mécanismes.
          </p>
          <p>
            <span className="text-foreground">Le cerveau humain</span> est vivant, incarné, contextuel, émotionnel, plastique.
            <br />
            <span className="text-foreground">Une IA générative</span>, elle, calcule des probabilités à partir
            de très grandes quantités de données et produit une réponse plausible selon le contexte.
          </p>
        </div>

        <div className="my-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-border" />
          <span className="font-serif text-2xl text-primary md:text-3xl">
            Comparer n'est pas confondre.
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-accent bg-accent/40 p-6">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl" aria-hidden>🧠</span>
              <h4 className="font-serif text-xl text-foreground">Cerveau humain</h4>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-foreground/85">
              {BRAIN.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-primary/30 bg-primary/[0.04] p-6">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl" aria-hidden>🤖</span>
              <h4 className="font-serif text-xl text-foreground">IA générative</h4>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-foreground/85">
              {AI.map((a) => (
                <li key={a} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 rounded-md bg-stone-soft px-4 py-3 text-xs italic text-foreground/75">
          Un LLM ne pense pas comme un cerveau humain : il prédit la suite la plus probable dans un contexte donné.
        </p>

        {/* Infographie : Comment fonctionne une IA */}
        <figure className="mt-8 overflow-hidden rounded-xl border border-border bg-background">
          <img
            src={commentIA.url}
            alt="Comment fonctionne une IA : du carburant (données) au modèle, puis au prompt et à la réponse, avec les limites face au cerveau humain"
            className="w-full"
          />
          <figcaption className="border-t border-border bg-stone-soft px-6 py-3 text-center text-xs italic text-muted-foreground">
            Données → Modèle → Prompt &amp; Réponse &nbsp;·&nbsp; L'IA calcule, l'humain pense.
          </figcaption>
        </figure>
      </div>

      {/* BLOC 2 — Vocabulaire */}
      <div className="mb-10">
        <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-primary">
          On remet de l'ordre
        </div>
        <h3 className="font-serif text-3xl text-foreground md:text-4xl">
          No code, IA, gloubi-boulga : <span className="text-primary">on distingue les rôles.</span>
        </h3>
        <p className="mt-2 text-base italic text-muted-foreground">
          Quand tout se mélange, on clarifie les rôles.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <div
            key={c.k}
            className={`flex flex-col rounded-2xl border p-6 transition hover:-translate-y-0.5 hover:shadow-sm ${toneClass[c.tone]}`}
          >
            <div className="flex items-baseline justify-between">
              <span className="text-3xl" aria-hidden>{c.icon}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary">Rôle</span>
            </div>
            <h4 className="mt-3 font-serif text-2xl text-foreground">{c.k}</h4>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">
              « {c.def} »
            </p>
            <div className="mt-4 border-t border-foreground/10 pt-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Exemple
              </div>
              <p className="mt-1 text-sm text-foreground/80">{c.ex}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Infographie : 3 façons d'être aidé */}
      <figure className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <img
          src={troisFacons.url}
          alt="Trois façons d'être aidé dans son activité : Assistant IA, Automatisation, Agent IA"
          className="w-full"
        />
        <figcaption className="border-t border-border bg-stone-soft px-6 py-3 text-center text-xs italic text-muted-foreground">
          Assistant IA = répond &nbsp;·&nbsp; Automatisation = exécute &nbsp;·&nbsp; Agent IA = organise et agit davantage.
        </figcaption>
      </figure>

      <IkeaAnalogy />

      {/* Chute */}
      <blockquote className="mx-auto mt-14 max-w-3xl border-l-4 border-primary bg-card px-7 py-6 text-center font-serif text-2xl leading-snug text-foreground md:text-3xl">
        Le <span className="text-warn">gloubi-boulga</span> commence quand on mélange tous les mots.
        <br />
        La <span className="text-primary">clarté</span> commence quand on distingue les rôles.
      </blockquote>
    </Section>
  );
}
