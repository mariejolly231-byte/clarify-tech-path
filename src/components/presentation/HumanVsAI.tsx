import { useState } from "react";

type Round = {
  question: string;
  human: string[];
  ai: string[];
  compare: string[];
  morale: string;
};

const ROUNDS: Round[] = [
  {
    question: "Un client t'écrit seulement : « Pouvez-vous me rappeler ? »\nQue fais-tu en premier, et pourquoi ?",
    human: [
      "Cherche qui est ce client (historique, dernier échange).",
      "Évalue l'urgence et le ton du message.",
      "Choisit le bon canal et le bon moment.",
      "Mobilise son intuition relationnelle.",
    ],
    ai: [
      "Propose une procédure générique en plusieurs étapes.",
      "Suggère un script de rappel « universel ».",
      "Peut signaler le manque de contexte… ou pas.",
      "Réponse fluide, plausible, mais hors-sol.",
    ],
    compare: [
      "L'humain part de la relation. L'IA part du texte.",
      "Sans historique, l'IA invente un cadre crédible.",
    ],
    morale: "Une réponse fluide n'est pas une réponse juste : le contexte fait tout.",
  },
  {
    question: "Tu reçois le même besoin de trois personnes différentes,\nmais formulé de trois façons différentes.\nEst-ce forcément le même problème ?",
    human: [
      "Lit entre les lignes, perçoit l'intention.",
      "Pose des questions pour vérifier.",
      "Distingue symptôme et cause réelle.",
      "Sait que trois mots ≠ trois problèmes.",
    ],
    ai: [
      "Tend à regrouper par similarité de mots.",
      "Peut conclure « même problème » trop vite.",
      "Génère une réponse unique pour les trois.",
      "Manque la nuance derrière la formulation.",
    ],
    compare: [
      "L'humain interroge. L'IA classe.",
      "La langue cache souvent des besoins très différents.",
    ],
    morale: "Même mots ne veut pas dire même besoin. La nuance se gagne en posant des questions.",
  },
  {
    question: "Tu dois répondre à un prospect qui hésite entre deux offres.\nAvant de répondre, que prends-tu en compte ?",
    human: [
      "Le profil, le budget, le moment de vie.",
      "Les signaux faibles dans l'échange.",
      "Ce qui est dit… et ce qui ne l'est pas.",
      "Sa propre éthique commerciale.",
    ],
    ai: [
      "Compare les offres point par point.",
      "Produit un tableau « pour / contre » net.",
      "Recommande souvent la « plus complète ».",
      "Aucune lecture du non-dit.",
    ],
    compare: [
      "L'humain décide avec du tact. L'IA décide avec des critères.",
      "Le « bon choix » dépend d'un contexte que l'IA n'a pas.",
    ],
    morale: "Une recommandation n'est pas un conseil. Le conseil prend en compte la personne.",
  },
  {
    question: "Un outil d'IA te propose un plan d'action très convaincant,\nalors que tu ne lui as donné que deux informations.\nÀ quel niveau lui fais-tu confiance, et pourquoi ?",
    human: [
      "Se méfie d'une réponse trop sûre d'elle.",
      "Vérifie ce sur quoi elle s'appuie.",
      "Croise avec sa propre expérience.",
      "Garde la décision finale.",
    ],
    ai: [
      "Présente un plan structuré et fluide.",
      "Comble les trous avec du plausible.",
      "Donne rarement son niveau d'incertitude.",
      "Confiance apparente ≠ fiabilité réelle.",
    ],
    compare: [
      "Plus c'est fluide, plus il faut être vigilant.",
      "La confiance d'une IA n'est pas une preuve.",
    ],
    morale: "Une IA convaincante n'est pas une IA fiable. La validation reste humaine.",
  },
];

type Step = 0 | 1 | 2 | 3;

export function HumanVsAI() {
  const [round, setRound] = useState(0);
  const [step, setStep] = useState<Step>(0);
  const r = ROUNDS[round];

  const next = () => setStep((s) => Math.min(3, (s + 1) as Step) as Step);
  const goRound = (i: number) => {
    setRound(i);
    setStep(0);
  };

  return (
    <div className="mt-10 rounded-2xl border border-border bg-card p-7 shadow-sm animate-fade-in">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-[0.2em] text-primary">
          Jeu d'atelier
        </div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Manche {round + 1} / {ROUNDS.length}
        </div>
      </div>

      <h3 className="font-serif text-3xl text-foreground md:text-4xl">
        Humain vs IA : <span className="text-primary">même réponse, même raisonnement ?</span>
      </h3>
      <p className="mt-2 text-base italic text-muted-foreground">
        4 questions. On réfléchit, on interroge l'IA, on compare.
      </p>

      {/* Round selector */}
      <div className="mt-5 flex flex-wrap gap-2">
        {ROUNDS.map((_, i) => (
          <button
            key={i}
            onClick={() => goRound(i)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              i === round
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-stone-soft hover:border-primary/40"
            }`}
          >
            Manche {i + 1}
          </button>
        ))}
      </div>

      {/* Question */}
      <div className="mt-8 rounded-xl border border-border bg-stone-soft/60 p-8 text-center">
        <div className="mb-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Question
        </div>
        <p className="whitespace-pre-line font-serif text-2xl leading-snug text-foreground md:text-3xl">
          {r.question}
        </p>
      </div>

      {/* Steps */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {/* Step 1: Humain */}
        <div
          className={`rounded-xl border p-5 transition ${
            step >= 1
              ? "border-accent bg-accent/40 opacity-100"
              : "border-dashed border-border bg-background opacity-40"
          }`}
        >
          <div className="flex items-baseline gap-2">
            <span className="text-xl" aria-hidden>🧠</span>
            <h4 className="font-serif text-lg text-foreground">Ce qu'un humain mobilise</h4>
          </div>
          {step >= 1 ? (
            <ul className="mt-3 space-y-2 text-sm text-foreground/85">
              {r.human.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-xs italic text-muted-foreground">
              Prenez 30 secondes pour y répondre mentalement.
            </p>
          )}
        </div>

        {/* Step 2: IA */}
        <div
          className={`rounded-xl border p-5 transition ${
            step >= 2
              ? "border-primary/30 bg-primary/[0.04] opacity-100"
              : "border-dashed border-border bg-background opacity-40"
          }`}
        >
          <div className="flex items-baseline gap-2">
            <span className="text-xl" aria-hidden>🤖</span>
            <h4 className="font-serif text-lg text-foreground">Ce que l'IA peut répondre</h4>
          </div>
          {step >= 2 ? (
            <ul className="mt-3 space-y-2 text-sm text-foreground/85">
              {r.ai.map((a) => (
                <li key={a} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-xs italic text-muted-foreground">
              On posera la question à l'IA, sans contexte personnel.
            </p>
          )}
        </div>

        {/* Step 3: Compare */}
        <div
          className={`rounded-xl border p-5 transition ${
            step >= 3
              ? "border-sand bg-sand/40 opacity-100"
              : "border-dashed border-border bg-background opacity-40"
          }`}
        >
          <div className="flex items-baseline gap-2">
            <span className="text-xl" aria-hidden>⚖️</span>
            <h4 className="font-serif text-lg text-foreground">Ce qu'on compare</h4>
          </div>
          {step >= 3 ? (
            <ul className="mt-3 space-y-2 text-sm text-foreground/85">
              {r.compare.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-xs italic text-muted-foreground">
              On mettra les deux raisonnements côte à côte.
            </p>
          )}
        </div>
      </div>

      {/* Action button */}
      <div className="mt-8 flex flex-col items-center gap-3">
        {step < 3 ? (
          <button
            onClick={next}
            className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow transition hover:bg-primary/90"
          >
            {step === 0 && "→ Je réfléchis"}
            {step === 1 && "→ On interroge l'IA"}
            {step === 2 && "→ On compare"}
          </button>
        ) : (
          <div className="w-full max-w-2xl animate-fade-in rounded-xl border-l-4 border-primary bg-stone-soft px-5 py-4 text-center">
            <div className="text-[10px] uppercase tracking-[0.2em] text-primary">Mini morale</div>
            <p className="mt-1 font-serif text-lg text-foreground md:text-xl">{r.morale}</p>
          </div>
        )}

        {step === 3 && round < ROUNDS.length - 1 && (
          <button
            onClick={() => goRound(round + 1)}
            className="mt-2 rounded-full border border-primary/40 bg-background px-6 py-2 text-sm text-primary transition hover:bg-primary/5"
          >
            Manche suivante →
          </button>
        )}
        {step === 3 && round === ROUNDS.length - 1 && (
          <button
            onClick={() => goRound(0)}
            className="mt-2 rounded-full border border-border bg-background px-6 py-2 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
          >
            ↺ Recommencer le jeu
          </button>
        )}
      </div>
    </div>
  );
}
