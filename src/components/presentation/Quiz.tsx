import { useState } from "react";
import { Section } from "./Section";
import { DurationBadge } from "./Badge";

type Cat = "assistant" | "workflow" | "agent" | "aucun";

const CATS: { id: Cat; label: string }[] = [
  { id: "assistant", label: "Assistant IA" },
  { id: "workflow", label: "Workflow / automatisation" },
  { id: "agent", label: "Agent IA" },
  { id: "aucun", label: "Pas pertinent d'automatiser" },
];

const SCEN: { q: string; a: Cat; why: string }[] = [
  {
    q: "Je demande à une IA de reformuler un email client.",
    a: "assistant",
    why: "Vous gardez la main. L'IA vous propose une version ; vous validez et envoyez.",
  },
  {
    q: "Quand un formulaire est rempli, la demande est ajoutée à un tableau et un email de confirmation est envoyé.",
    a: "workflow",
    why: "Règles stables, étapes connues, déclencheur clair. Pas besoin d'IA pour ça.",
  },
  {
    q: "Chaque matin, un système lit de nouveaux emails, repère les urgences, propose une réponse et crée une tâche.",
    a: "agent",
    why: "Une IA décide quoi faire (urgence ? réponse ? tâche ?) avec des outils. À superviser.",
  },
  {
    q: "Je demande des idées de contenus LinkedIn.",
    a: "assistant",
    why: "Brainstorming ponctuel. L'IA aide à dégrossir ; vous choisissez.",
  },
  {
    q: "Une IA lit un document long, extrait les points clés et me dit ce qu'il faut vérifier.",
    a: "agent",
    why: "Analyse + recommandation d'action à valider. C'est typiquement un usage agent.",
  },
];

export function Quiz() {
  const [answers, setAnswers] = useState<Record<number, Cat | null>>({});

  return (
    <Section
      id="jeu"
      num="08"
      eyebrow="Jeu interactif"
      tint="sage"
      title={<>Assistant, workflow, agent — <span className="text-primary">ou aucun des trois ?</span></>}
    >
      <DurationBadge>⏱️ 10 min · Quiz interactif</DurationBadge>
      <p className="mb-10 max-w-3xl text-base text-muted-foreground md:text-lg">
        Cinq scénarios. Pour chacun, tentez votre réponse — puis révélez la bonne catégorie.
        L'objectif n'est pas d'avoir tout juste, mais d'aiguiser le réflexe de tri.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {SCEN.map((s, i) => {
          const picked = answers[i];
          const correct = picked === s.a;
          return (
            <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-3 flex items-baseline gap-3">
                <span className="font-mono text-xs text-primary">#{i + 1}</span>
                <p className="text-[15px] leading-snug text-foreground">{s.q}</p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {CATS.map((c) => {
                  const isPicked = picked === c.id;
                  const reveal = picked != null;
                  const isAnswer = c.id === s.a;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setAnswers((a) => ({ ...a, [i]: c.id }))}
                      className={`rounded-lg border px-3 py-2 text-left text-xs transition ${
                        reveal && isAnswer
                          ? "border-go/60 bg-go/10 text-foreground"
                          : reveal && isPicked && !isAnswer
                          ? "border-warn/40 bg-warn/10 text-foreground"
                          : isPicked
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-stone-soft hover:border-primary/30"
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>

              {picked != null && (
                <div className="mt-4 rounded-lg bg-stone-soft px-4 py-3 text-xs leading-relaxed">
                  <span
                    className={`mr-2 font-medium ${
                      correct ? "text-go" : "text-warn"
                    }`}
                  >
                    {correct ? "Bien vu." : "Pas tout à fait."}
                  </span>
                  <span className="text-foreground/80">{s.why}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
