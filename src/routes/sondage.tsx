import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/sondage")({
  head: () => ({
    meta: [
      { title: "Sondage atelier — Summit Flow" },
      { name: "description", content: "Quelques questions avant qu'on démarre." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SondagePage,
});

const LEVEL_LABELS_NOCODE = [
  "Je découvre totalement",
  "J'en ai entendu parler mais je ne vois pas bien",
  "Je comprends le principe",
  "J'ai déjà testé un ou plusieurs outils",
  "Je l'utilise déjà dans mon activité",
];
const LEVEL_LABELS_AI = [
  "Je découvre totalement",
  "J'ai testé sans vraiment comprendre",
  "Je vois à quoi ça peut servir",
  "Je l'utilise parfois",
  "Je l'utilise régulièrement avec méthode",
];
const AI_USAGE = [
  "Je ne l'utilise pas",
  "Recherche d'idées",
  "Rédaction / reformulation",
  "Synthèse de documents",
  "Création de contenus",
  "Analyse / tri d'informations",
  "Assistant au quotidien",
  "Je ne sais pas vraiment si mon outil utilise de l'IA",
];
const AUTO_LEVELS = [
  "Non",
  "Oui, sans automatisation",
  "Oui, quelques automatisations simples",
  "Oui, régulièrement",
];
const TOOLS = [
  "ChatGPT", "Claude", "Perplexity", "Make", "n8n",
  "Notion", "Airtable", "Zapier", "Lovable", "Autre",
];
const GOALS = [
  "Du temps",
  "De la régularité",
  "Moins d'oublis",
  "Moins de saisie manuelle",
  "Une meilleure organisation",
  "Une meilleure qualité de réponse client",
  "Je ne sais pas encore",
];

function SondagePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [nocode, setNocode] = useState<number | null>(null);
  const [ai, setAi] = useState<number | null>(null);
  const [aiUsage, setAiUsage] = useState<string[]>([]);
  const [autoUse, setAutoUse] = useState<string>("");
  const [toolsTested, setToolsTested] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [task, setTask] = useState("");

  const toggle = (arr: string[], v: string, setter: (a: string[]) => void) => {
    setter(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nocode || !ai) {
      toast.error("Merci de répondre aux deux premières questions.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("workshop_responses").insert({
      nocode_level: nocode,
      ai_level: ai,
      ai_usage: aiUsage,
      tools_automation: autoUse || null,
      tools_tested: toolsTested,
      goals: goals,
      repetitive_task: task.trim() ? task.trim().slice(0, 500) : null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Oups, impossible d'enregistrer la réponse.");
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-sand/40 px-6 py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
            Merci !
          </div>
          <h1 className="mt-3 font-serif text-3xl text-foreground">
            Réponse enregistrée.
          </h1>
          <p className="mt-3 text-muted-foreground">
            Tu peux poser ton téléphone — on regarde tout ça ensemble dans une minute.
          </p>
          <button
            onClick={() => router.navigate({ to: "/" })}
            className="mt-6 rounded-md border border-border bg-stone-soft px-4 py-2 text-sm hover:bg-accent/40"
          >
            Retour à la présentation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand/40 px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
            Avant qu'on démarre
          </div>
          <h1 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
            Tour de table express
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            7 questions, 2 minutes. Anonyme. Les résultats s'affichent en direct.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <ScaleCard
            n={1}
            title="Aujourd'hui, comment évalues-tu ta compréhension du no-code ?"
            labels={LEVEL_LABELS_NOCODE}
            value={nocode}
            onChange={setNocode}
          />

          <ScaleCard
            n={2}
            title="Aujourd'hui, comment évalues-tu ta compréhension de l'IA générative ?"
            labels={LEVEL_LABELS_AI}
            value={ai}
            onChange={setAi}
          />

          <MultiCard
            n={3}
            title="Comment utilises-tu déjà l'IA aujourd'hui ?"
            options={AI_USAGE}
            value={aiUsage}
            onToggle={(v) => toggle(aiUsage, v, setAiUsage)}
          />

          <SingleCard
            n={4}
            title="Utilises-tu déjà des outils no-code ou d'automatisation ?"
            options={AUTO_LEVELS}
            value={autoUse}
            onChange={setAutoUse}
          />

          <MultiCard
            n={5}
            title="Quels outils as-tu déjà testés ?"
            options={TOOLS}
            value={toolsTested}
            onToggle={(v) => toggle(toolsTested, v, setToolsTested)}
            chips
          />

          <MultiCard
            n={6}
            title="Dans ton activité, qu'aimerais-tu surtout gagner ?"
            options={GOALS}
            value={goals}
            onToggle={(v) => toggle(goals, v, setGoals)}
          />

          <div className="rounded-2xl border border-border bg-card p-6">
            <CardHeader n={7} title="Une tâche répétitive que tu aimerais simplifier ?" />
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value.slice(0, 500))}
              rows={3}
              placeholder="Quelques mots suffisent…"
              className="mt-4 w-full resize-none rounded-md border border-border bg-background p-3 text-sm focus:border-primary focus:outline-none"
              maxLength={500}
            />
            <div className="mt-1 text-right text-[11px] text-muted-foreground">
              {task.length}/500
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-primary px-6 py-4 text-base font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:opacity-50"
          >
            {submitting ? "Envoi…" : "Envoyer ma réponse"}
          </button>
        </form>
      </div>
    </div>
  );
}

function CardHeader({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary font-mono text-xs text-primary-foreground">
        {n}
      </span>
      <h2 className="font-serif text-lg leading-snug text-foreground md:text-xl">{title}</h2>
    </div>
  );
}

function ScaleCard({
  n, title, labels, value, onChange,
}: {
  n: number; title: string; labels: string[]; value: number | null; onChange: (v: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <CardHeader n={n} title={title} />
      <div className="mt-5 grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`flex h-12 items-center justify-center rounded-md border font-mono text-lg transition ${
              value === v
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-stone-soft text-foreground hover:border-primary/40"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="mt-3 min-h-[1.5rem] text-center text-sm text-muted-foreground">
        {value ? labels[value - 1] : "Sélectionne une note de 1 à 5"}
      </div>
    </div>
  );
}

function MultiCard({
  n, title, options, value, onToggle, chips,
}: {
  n: number; title: string; options: string[]; value: string[]; onToggle: (v: string) => void; chips?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <CardHeader n={n} title={title} />
      <div className={`mt-4 ${chips ? "flex flex-wrap gap-2" : "grid gap-2"}`}>
        {options.map((opt) => {
          const active = value.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={`rounded-md border px-3 py-2 text-left text-sm transition ${
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-stone-soft hover:border-primary/40"
              } ${chips ? "" : "w-full"}`}
            >
              <span className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded-sm border border-current font-mono text-[10px]">
                {active ? "✓" : ""}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SingleCard({
  n, title, options, value, onChange,
}: {
  n: number; title: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <CardHeader n={n} title={title} />
      <div className="mt-4 grid gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`w-full rounded-md border px-3 py-2 text-left text-sm transition ${
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-stone-soft hover:border-primary/40"
              }`}
            >
              <span className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full border border-current">
                {active ? <span className="h-2 w-2 rounded-full bg-current" /> : null}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
