import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Section } from "./Section";
import { supabase } from "@/integrations/supabase/client";

type Response = {
  id: string;
  nocode_def: string[] | null;
  ai_def: string[] | null;
  nocode_level: number | null;
  ai_level: number | null;
  ai_usage: string[];
  tools_automation: string | null;
  tools_tested: string[];
  tools_other: string | null;
  goals: string[];
  repetitive_task: string | null;
  created_at: string;
};

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

export function LivePoll() {
  const [responses, setResponses] = useState<Response[]>([]);
  const [pulse, setPulse] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);

    supabase
      .from("workshop_responses")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setResponses(data as Response[]);
      });

    const channel = supabase
      .channel("workshop_responses_live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "workshop_responses" },
        (payload) => {
          setResponses((prev) => [payload.new as Response, ...prev]);
          setPulse(true);
          setTimeout(() => setPulse(false), 1000);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formUrl = origin ? `${origin}/sondage` : "";
  const total = responses.length;

  const nocodeDefs = countItems(responses.flatMap((r) => r.nocode_def ?? []));
  const aiDefs = countItems(responses.flatMap((r) => r.ai_def ?? []));

  const toolsCount = countItems(responses.flatMap((r) => r.tools_tested ?? []));
  const goalsCount = countItems(responses.flatMap((r) => r.goals ?? []));

  const tasks = responses
    .map((r) => r.repetitive_task)
    .filter((t): t is string => !!t)
    .slice(0, 8);

  const otherTools = responses
    .map((r) => r.tools_other)
    .filter((t): t is string => !!t)
    .slice(0, 10);

  return (
    <Section
      id="sondage"
      num="00"
      eyebrow="Tour de table live"
      tint="sage"
      title={
        <>
          On commence par <span className="text-primary">vous</span>.
        </>
      }
    >
      <p className="mb-10 max-w-2xl text-base text-muted-foreground md:text-lg">
        Scanne le QR code, réponds en 2 minutes. Les résultats apparaissent ici,
        en direct, pour qu'on cale l'atelier sur votre réalité.
      </p>

      <div className="grid gap-6 md:grid-cols-[320px_1fr]">
        {/* QR card */}
        <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary">
            Scannez pour répondre
          </div>
          <div className="mt-5 inline-flex items-center justify-center rounded-xl bg-white p-4 ring-1 ring-border">
            {formUrl ? (
              <QRCodeSVG
                value={formUrl}
                size={200}
                level="M"
                bgColor="#ffffff"
                fgColor="#1a3a3f"
              />
            ) : (
              <div className="h-[200px] w-[200px]" />
            )}
          </div>
          <div className="mt-4 font-mono text-xs break-all text-muted-foreground">
            {formUrl ? formUrl.replace(/^https?:\/\//, "") : ""}
          </div>
          <div
            className={`mt-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1.5 text-sm transition ${
              pulse ? "scale-105 bg-primary/15" : ""
            }`}
          >
            <span className={`h-2 w-2 rounded-full bg-go ${pulse ? "animate-ping" : ""}`} />
            <span className="font-mono text-xs text-foreground/80">
              {total} réponse{total > 1 ? "s" : ""} reçue{total > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Live results */}
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <RankBlock
              title="Définitions du no-code"
              data={nocodeDefs}
              total={total}
            />
            <RankBlock
              title="Définitions de l'IA générative"
              data={aiDefs}
              total={total}
            />
          </div>

          <RankBlock
            title="Outils déjà testés"
            data={toolsCount}
            total={total}
            knownKeys={TOOLS}
          />

          {otherTools.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-primary">
                Autres outils précisés
              </div>
              <div className="flex flex-wrap gap-2">
                {otherTools.map((t, i) => (
                  <span
                    key={i}
                    className="rounded-md border border-border bg-stone-soft px-3 py-1.5 text-xs text-foreground/85"
                  >
                    « {t} »
                  </span>
                ))}
              </div>
            </div>
          )}

          <RankBlock
            title="Ce qu'on aimerait gagner"
            data={goalsCount}
            total={total}
            knownKeys={GOALS}
          />

          {tasks.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-primary">
                Tâches répétitives à simplifier
              </div>
              <div className="flex flex-wrap gap-2">
                {tasks.map((t, i) => (
                  <span
                    key={i}
                    className="rounded-md border border-border bg-stone-soft px-3 py-1.5 text-xs text-foreground/85"
                  >
                    « {t} »
                  </span>
                ))}
              </div>
            </div>
          )}

          {total === 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 p-6 text-center text-sm text-muted-foreground">
              En attente des premières réponses…
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

function countItems(items: string[]) {
  const m = new Map<string, number>();
  for (const it of items) m.set(it, (m.get(it) ?? 0) + 1);
  return m;
}

function RankBlock({
  title,
  data,
  total,
  knownKeys,
}: {
  title: string;
  data: Map<string, number>;
  total: number;
  knownKeys?: string[];
}) {
  let entries = knownKeys
    ? knownKeys.map((k) => [k, data.get(k) ?? 0] as const)
    : Array.from(data.entries());

  entries = entries
    .sort((a, b) => b[1] - a[1])
    .filter(([, v]) => v > 0)
    .slice(0, 8);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-primary">{title}</div>
      {entries.length === 0 ? (
        <div className="text-xs text-muted-foreground">—</div>
      ) : (
        <ul className="space-y-2">
          {entries.map(([k, v]) => {
            const pct = total ? (v / total) * 100 : 0;
            return (
              <li key={k} className="flex items-center gap-3">
                <div className="w-32 shrink-0 text-xs text-foreground/80 leading-tight">{k}</div>
                <div className="relative h-5 flex-1 overflow-hidden rounded-md bg-stone-soft">
                  <div
                    className="h-full rounded-md bg-primary/70 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="w-10 shrink-0 text-right font-mono text-[11px] text-muted-foreground">
                  {v}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
