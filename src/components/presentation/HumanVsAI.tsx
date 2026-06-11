import { useState } from "react";
import { Button } from "@/components/ui/button";

type Step = 0 | 1 | 2 | 3;

const ROUNDS: {
  q: string;
  human: string[];
  ai: string[];
  compare: string;
  moral: string;
}[] = [
  {
    q: "Un client important n'a pas répondu à mon devis depuis 10 jours. Que faire ?",
    human: [
      "Se souvient du ton du dernier échange",
      "Sait s'il y a eu un événement récent (vacances, deuil, gros projet…)",
      "Sent s'il faut relancer maintenant ou attendre",
      "Choisit le canal selon la relation (SMS, appel, email)",
    ],
    ai: [
      "Propose un email de relance « poli et professionnel »",
      "Suggère un délai standard (J+7, J+14)",
      "Donne 2-3 formulations types",
      "Ne sait rien de l'historique réel avec ce client",
    ],
    compare: "L'IA produit une réponse fluide et plausible. L'humain mobilise la mémoire de la relation.",
    moral: "Une réponse bien tournée n'est pas une réponse bien cadrée.",
  },
  {
    q: "Mon équipe semble démotivée cette semaine. Comment réagir ?",
    human: [
      "Observe les visages, les silences, les non-dits",
      "Connaît le contexte (charge, conflit, fatigue post-projet)",
      "Sait qui aller voir d'abord, et comment",
      "Ajuste selon sa propre énergie du moment",
    ],
    ai: [
      "Liste 5 « bonnes pratiques managériales »",
      "Propose un one-to-one, un team building, une rétro",
      "Donne des phrases d'ouverture types",
      "Ne perçoit ni l'ambiance ni les personnes",
    ],
    compare: "L'IA déroule un cadre générique. L'humain lit une situation incarnée.",
    moral: "Le contexte humain ne se résume pas à un prompt.",
  },
  {
    q: "Dois-je accepter ce nouveau client qui demande une remise de 30 % ?",
    human: [
      "Connaît sa trésorerie réelle du mois",
      "Sait si ce client peut en amener d'autres",
      "Sent si la demande cache un manque de respect ou un vrai besoin",
      "Pèse la fatigue, le temps, l'envie",
    ],
    ai: [
      "Calcule une marge théorique",
      "Liste les pour / contre génériques",
      "Propose des contre-offres types",
      "Ignore la stratégie et l'intuition business",
    ],
    compare: "L'IA structure. L'humain décide avec ce qu'il sait vraiment de sa vie pro.",
    moral: "Décider, ce n'est pas seulement calculer.",
  },
  {
    q: "Un partenaire me propose une collaboration « urgente ». Je signe ?",
    human: [
      "Se méfie ou se réjouit selon la source",
      "Vérifie la cohérence avec ses valeurs",
      "Demande un avis à une personne de confiance",
      "Sait dire « je prends 48h » sans culpabiliser",
    ],
    ai: [
      "Liste les clauses à vérifier",
      "Propose un cadre de décision rationnel",
      "Rédige une réponse diplomatique",
      "Ne ressent ni urgence ni red flag",
    ],
    compare: "L'IA aide à structurer la réflexion. L'humain garde le pouvoir de dire non.",
    moral: "Une réponse rapide n'est pas une bonne réponse.",
  },
];

const STEP_LABELS = ["Je réfléchis", "On interroge l'IA", "On compare"];

export function HumanVsAI() {
  const [round, setRound] = useState(0);
  const [step, setStep] = useState<Step>(0);

  const r = ROUNDS[round];

  const next = () => {
    if (step < 3) setStep((s) => (s + 1) as Step);
  };

  const goRound = (i: number) => {
    setRound(i);
    setStep(0);
  };

  return (
    <div className="mt-12 rounded-2xl border border-border bg-card p-7 shadow-sm md:p-10 animate-fade-in">
      <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-primary">
        Jeu d'atelier
      </div>
      <h3 className="font-serif text-3xl text-foreground md:text-4xl">
        Humain vs IA : <span className="text-primary">même réponse, même raisonnement ?</span>
      </h3>
      <p className="mt-2 text-base italic text-muted-foreground">
        4 questions. On réfléchit, puis on compare. Aucune « bonne » réponse — juste de la clarté.
      </p>

      {/* Barre de manches */}
      <div className="mt-7 flex flex-wrap gap-2">
        {ROUNDS.map((_, i) => (
          <button
            key={i}
            onClick={() => goRound(i)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
              i === round
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-stone-soft text-muted-foreground hover:border-primary/40"
            }`}
          >
            Manche {i + 1}
          </button>
        ))}
      </div>

      {/* Question */}
      <div className="mt-8 rounded-xl border border-accent bg-accent/30 p-8 md:p-12 text-center">
        <div className="mb-3 text-[10px] uppercase tracking-[0.22em] text-primary">
          Question {round + 1} / {ROUNDS.length}
        </div>
        <p className="font-serif text-2xl leading-snug text-foreground md:text-3xl">
          « {r.q} »
        </p>
      </div>

      {/* Étapes de révélation */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <RevealCard
          show={step >= 1}
          icon="🧠"
          title="Ce qu'un humain mobilise"
          tone="sage"
          items={r.human}
        />
        <RevealCard
          show={step >= 2}
          icon="🤖"
          title="Ce que l'IA peut répondre"
          tone="primary"
          items={r.ai}
        />
        <RevealCard
          show={step >= 3}
          icon="🔎"
          title="Ce qu'on compare"
          tone="sand"
          items={[r.compare]}
        />
      </div>

      {/* Action */}
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1.5 w-10 rounded-full transition ${
                step > i ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>

        {step < 3 ? (
          <Button size="lg" onClick={next} className="gap-2">
            {STEP_LABELS[step]} →
          </Button>
        ) : (
          <div className="flex gap-3">
            {round < ROUNDS.length - 1 ? (
              <Button size="lg" onClick={() => goRound(round + 1)} className="gap-2">
                Manche suivante →
              </Button>
            ) : (
              <Button size="lg" variant="outline" onClick={() => goRound(0)}>
                Recommencer
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Morale */}
      {step >= 3 && (
        <div className="mt-8 rounded-xl border-l-4 border-primary bg-stone-soft px-6 py-5 animate-fade-in">
          <div className="text-[10px] uppercase tracking-[0.2em] text-primary">Mini morale</div>
          <p className="mt-1 font-serif text-xl text-foreground md:text-2xl">{r.moral}</p>
        </div>
      )}
    </div>
  );
}

function RevealCard({
  show,
  icon,
  title,
  items,
  tone,
}: {
  show: boolean;
  icon: string;
  title: string;
  items: string[];
  tone: "sage" | "primary" | "sand";
}) {
  const toneClass =
    tone === "sage"
      ? "border-accent bg-accent/40"
      : tone === "primary"
      ? "border-primary/30 bg-primary/[0.04]"
      : "border-sand bg-sand/40";

  return (
    <div
      className={`rounded-xl border p-5 transition-all duration-500 ${toneClass} ${
        show ? "opacity-100 translate-y-0" : "opacity-30 translate-y-2 blur-[1px]"
      }`}
    >
      <div className="flex items-baseline gap-2">
        <span className="text-xl" aria-hidden>{icon}</span>
        <h4 className="font-serif text-base text-foreground">{title}</h4>
      </div>
      {show ? (
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/85">
          {items.map((it) => (
            <li key={it} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-xs italic text-muted-foreground">
          Caché pour le moment.
        </p>
      )}
    </div>
  );
}
