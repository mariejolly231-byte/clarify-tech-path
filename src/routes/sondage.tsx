import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PARTICIPANTS, PARTICIPANTS_BY_ID, type Participant } from "@/lib/participants";

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

const STORAGE_KEY = "summitflow.participant_id";

const NOCODE_DEFS = [
  "Créer des sites ou apps sans écrire de code",
  "Automatiser des tâches avec des outils visuels (Zapier, Make…)",
  "Des plateformes qui remplacent parfois un développeur",
  "Faire des pages web simples sans technique",
  "Je ne sais pas trop",
  "Autre",
];

const AI_DEFS = [
  "Des outils qui écrivent du texte (emails, articles…)",
  "Des outils qui créent des images ou vidéos",
  "Des chatbots / assistants conversationnels",
  "Des algorithmes qui apprennent et s’améliorent seuls",
  "Un peu de tout ça à la fois",
  "Je ne sais pas trop",
  "Autre",
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
  "ChatGPT",
  "Claude",
  "Gemini",
  "Copilot",
  "Perplexity",
  "Make",
  "n8n",
  "Zapier",
  "Notion",
  "Airtable",
  "Softr",
  "Lovable",
  "Autre",
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
  const [participantId, setParticipantId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [nocode, setNocode] = useState<string[]>([]);
  const [nocodeOther, setNocodeOther] = useState("");
  const [ai, setAi] = useState<string[]>([]);
  const [aiOther, setAiOther] = useState("");
  const [aiUsage, setAiUsage] = useState<string[]>([]);
  const [autoUse, setAutoUse] = useState<string>("");
  const [toolsTested, setToolsTested] = useState<string[]>([]);
  const [toolsOther, setToolsOther] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [task, setTask] = useState("");
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && PARTICIPANTS_BY_ID.has(saved)) setParticipantId(saved);
    } catch {}
  }, []);

  const me = participantId ? PARTICIPANTS_BY_ID.get(participantId) ?? null : null;

  const toggle = (arr: string[], v: string, setter: (a: string[]) => void) => {
    setter(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  };

  const onSelectParticipant = (p: Participant) => {
    setParticipantId(p.id);
    try {
      localStorage.setItem(STORAGE_KEY, p.id);
    } catch {}
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!participantId) {
      toast.error("Sélectionne d'abord qui tu es.");
      return;
    }
    if (!nocode.length || !ai.length) {
      toast.error("Merci de répondre aux deux premières questions.");
      return;
    }
    setSubmitting(true);

    const nocodePayload = nocode.map((v) =>
      v === "Autre" && nocodeOther.trim()
        ? `Autre : ${nocodeOther.trim().slice(0, 200)}`
        : v,
    );
    const aiPayload = ai.map((v) =>
      v === "Autre" && aiOther.trim()
        ? `Autre : ${aiOther.trim().slice(0, 200)}`
        : v,
    );

    const { error } = await supabase.from("workshop_responses").insert({
      participant_id: participantId,
      nocode_def: nocodePayload,
      ai_def: aiPayload,
      ai_usage: aiUsage,
      tools_automation: autoUse || null,
      tools_tested: toolsTested,
      tools_other: toolsTested.includes("Autre") && toolsOther.trim() ? toolsOther.trim().slice(0, 200) : null,
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

  // ÉCRAN 1 — Sélection du participant
  if (!participantId) {
    return (
      <div className="min-h-screen bg-sand/40 px-4 py-10 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              Avant qu'on démarre
            </div>
            <h1 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
              Qui es-tu ?
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Choisis ton samoyède pour rejoindre le tour de table.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {PARTICIPANTS.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => onSelectParticipant(p)}
                  className="group flex w-full flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gradient-to-b from-stone-soft to-accent/30 ring-1 ring-border">
                    <img
                      src={p.image}
                      alt={`${p.prenom} ${p.nom}`}
                      className="h-full w-full object-contain p-1"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-foreground">
                      {p.prenom} {p.nom}
                    </div>
                    <div className="mt-0.5 truncate text-[11px] text-muted-foreground">
                      {p.activite}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // ÉCRAN 3 — Confirmation (sans retour vers la présentation)
  if (done) {
    return (
      <div className="min-h-screen bg-sand/40 px-6 py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
          {me && (
            <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-gradient-to-b from-stone-soft to-accent/30 ring-1 ring-border">
              <img
                src={me.image}
                alt={`${me.prenom} ${me.nom}`}
                className="h-full w-full object-contain p-1"
              />
            </div>
          )}
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
            Merci{me ? `, ${me.prenom}` : ""} !
          </div>
          <h1 className="mt-3 font-serif text-3xl text-foreground">
            Réponse enregistrée.
          </h1>
          <p className="mt-3 text-muted-foreground">
            Tu peux poser ton téléphone — on regarde tout ça ensemble dans une minute.
          </p>
        </div>
      </div>
    );
  }

  // ÉCRAN 2 — Formulaire
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
            7 questions, 2 minutes. Les résultats s'affichent en direct.
          </p>

          {me && (
            <div className="mx-auto mt-5 inline-flex items-center gap-3 rounded-full border border-border bg-card px-3 py-1.5 shadow-sm">
              <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-b from-stone-soft to-accent/30 ring-1 ring-border">
                <img
                  src={me.image}
                  alt={`${me.prenom} ${me.nom}`}
                  className="h-full w-full object-contain p-0.5"
                />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium leading-tight">
                  {me.prenom} {me.nom}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setParticipantId(null);
                    try {
                      localStorage.removeItem(STORAGE_KEY);
                    } catch {}
                  }}
                  className="text-[11px] text-muted-foreground underline-offset-2 hover:underline"
                >
                  Ce n'est pas moi
                </button>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <MultiCard
            n={1}
            title="Pour toi, qu'est-ce que c'est le no-code ?"
            options={NOCODE_DEFS}
            value={nocode}
            onToggle={(v) => toggle(nocode, v, setNocode)}
          />
          {nocode.includes("Autre") && (
            <div className="-mt-3 rounded-b-2xl border border-t-0 border-border bg-card px-6 pb-6">
              <input
                type="text"
                value={nocodeOther}
                onChange={(e) => setNocodeOther(e.target.value)}
                placeholder="Précise ta réponse…"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                maxLength={200}
              />
            </div>
          )}

          <MultiCard
            n={2}
            title="Pour toi, qu'est-ce que c'est l'IA générative ?"
            options={AI_DEFS}
            value={ai}
            onToggle={(v) => toggle(ai, v, setAi)}
          />
          {ai.includes("Autre") && (
            <div className="-mt-3 rounded-b-2xl border border-t-0 border-border bg-card px-6 pb-6">
              <input
                type="text"
                value={aiOther}
                onChange={(e) => setAiOther(e.target.value)}
                placeholder="Précise ta réponse…"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                maxLength={200}
              />
            </div>
          )}

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
          {toolsTested.includes("Autre") && (
            <div className="-mt-3 rounded-b-2xl border border-t-0 border-border bg-card px-6 pb-6">
              <input
                type="text"
                value={toolsOther}
                onChange={(e) => setToolsOther(e.target.value)}
                placeholder="Quel(s) outil(s) ?"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                maxLength={200}
              />
            </div>
          )}

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

function MultiCard({
  n,
  title,
  options,
  value,
  onToggle,
  chips,
}: {
  n: number;
  title: string;
  options: string[];
  value: string[];
  onToggle: (v: string) => void;
  chips?: boolean;
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
  n,
  title,
  options,
  value,
  onChange,
}: {
  n: number;
  title: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
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
