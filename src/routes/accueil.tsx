import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LivePoll } from "@/components/presentation/LivePoll";
import { PARTICIPANTS, type Participant } from "@/lib/participants";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/accueil")({
  head: () => ({
    meta: [
      { title: "Bienvenue — Atelier IA & no-code · Summit Flow" },
      {
        name: "description",
        content: "Écran d'accueil de l'atelier IA & no-code pour entrepreneurs.",
      },
    ],
  }),
  component: AccueilPage,
});

function AccueilPage() {
  const [heure, setHeure] = useState<string>("");
  const [highlight, setHighlight] = useState<number>(0);
  const [responded, setResponded] = useState<Set<string>>(new Set());

  useEffect(() => {
    const tick = () =>
      setHeure(
        new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      );
    tick();
    const t = setInterval(tick, 1000 * 30);
    return () => clearInterval(t);
  }, []);

  // Highlight séquentiel sur chaque carte tour à tour
  useEffect(() => {
    const t = setInterval(() => {
      setHighlight((h) => (h + 1) % PARTICIPANTS.length);
    }, 1600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    supabase
      .from("workshop_responses")
      .select("participant_id")
      .then(({ data }) => {
        if (data) {
          setResponded(
            new Set(
              data
                .map((r: { participant_id: string | null }) => r.participant_id)
                .filter((x): x is string => !!x),
            ),
          );
        }
      });

    const channel = supabase
      .channel("accueil_responses_live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "workshop_responses" },
        (payload) => {
          const pid = (payload.new as { participant_id: string | null }).participant_id;
          if (pid) {
            setResponded((prev) => {
              const next = new Set(prev);
              next.add(pid);
              return next;
            });
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const totalResponded = Array.from(responded).filter((id) =>
    PARTICIPANTS.some((p) => p.id === id),
  ).length;

  // Répartition : 5 à gauche, 5 à droite, 7 en bas → 17
  const left = PARTICIPANTS.slice(0, 5);
  const right = PARTICIPANTS.slice(5, 10);
  const bottom = PARTICIPANTS.slice(10);

  const indexOf = (p: Participant) => PARTICIPANTS.findIndex((x) => x.id === p.id);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[oklch(0.985_0.006_220)] text-foreground">
      {/* Background atmosphérique */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-[oklch(0.93_0.03_220)] opacity-50 blur-3xl" />
        <div className="absolute -right-48 top-48 h-[44rem] w-[44rem] rounded-full bg-[oklch(0.94_0.025_180)] opacity-40 blur-3xl" />
      </div>

      {/* Hero compact */}
      <header className="shrink-0 px-6 pt-4 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[oklch(0.88_0.015_220)] bg-white/80 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-primary shadow-sm backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Atelier · Summit Flow
        </div>
        <h1 className="mx-auto mt-2 max-w-4xl text-xl leading-tight tracking-tight md:text-2xl">
          Bienvenue. <span className="text-primary">IA &amp; no-code</span>
          <span className="text-foreground/75"> pour entreprendre plus simplement.</span>
        </h1>
      </header>

      {/* Main : 3 colonnes (gauche · QR centre · droite) */}
      <main className="flex min-h-0 flex-1 gap-3 px-4 py-3">
        {/* Colonne gauche */}
        <aside className="flex w-[180px] shrink-0 flex-col gap-2">
          {left.map((p) => (
            <MiniCard
              key={p.id}
              p={p}
              isHighlight={highlight === indexOf(p)}
              hasResponded={responded.has(p.id)}
            />
          ))}
        </aside>

        {/* Centre : LivePoll */}
        <section className="flex min-w-0 flex-1 items-stretch">
          <div className="flex h-full w-full overflow-hidden rounded-2xl border border-[oklch(0.92_0.01_220)] bg-white/85 shadow-[0_20px_60px_-30px_rgba(30,60,90,0.35)] backdrop-blur-md">
            <div className="h-full w-full overflow-auto">
              <LivePoll />
            </div>
          </div>
        </section>

        {/* Colonne droite */}
        <aside className="flex w-[180px] shrink-0 flex-col gap-2">
          {right.map((p) => (
            <MiniCard
              key={p.id}
              p={p}
              isHighlight={highlight === indexOf(p)}
              hasResponded={responded.has(p.id)}
            />
          ))}
        </aside>
      </main>

      {/* Rangée du bas : 7 cartes */}
      <section className="shrink-0 px-4 pb-2">
        <div className="grid grid-cols-7 gap-2">
          {bottom.map((p) => (
            <MiniCard
              key={p.id}
              p={p}
              isHighlight={highlight === indexOf(p)}
              hasResponded={responded.has(p.id)}
              compact
            />
          ))}
        </div>
      </section>

      {/* Footer ultra-compact */}
      <footer className="shrink-0 border-t border-[oklch(0.92_0.01_220)] bg-white/60 px-6 py-1.5 backdrop-blur-md">
        <div className="flex items-center justify-between text-[11px]">
          <div className="text-muted-foreground">
            <span className="font-medium text-foreground">Début à 9h</span> · Merci de votre présence.
          </div>
          <div className="flex items-center gap-2 font-mono uppercase tracking-[0.24em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-go" />
            {totalResponded}/{PARTICIPANTS.length} ont répondu
            {heure ? ` · ${heure}` : ""}
          </div>
        </div>
      </footer>
    </div>
  );
}

function MiniCard({
  p,
  isHighlight,
  hasResponded,
  compact = false,
}: {
  p: Participant;
  isHighlight: boolean;
  hasResponded: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={[
        "relative flex min-w-0 items-center gap-2 rounded-xl border bg-white/90 p-1.5 backdrop-blur-md transition-all duration-300",
        hasResponded
          ? "border-go/50 bg-[oklch(0.97_0.04_150)]/80 shadow-[0_6px_18px_-12px_rgba(40,140,90,0.5)]"
          : isHighlight
            ? "-translate-y-0.5 scale-[1.02] border-primary/55 shadow-[0_14px_30px_-16px_rgba(30,60,90,0.5)] ring-2 ring-primary/35"
            : "border-[oklch(0.92_0.01_220)] shadow-[0_3px_12px_-10px_rgba(30,60,90,0.2)]",
      ].join(" ")}
    >
      <div
        className={[
          "relative shrink-0 rounded-full bg-gradient-to-b from-[oklch(0.96_0.015_220)] to-[oklch(0.93_0.02_200)]",
          compact ? "h-9 w-9" : "h-10 w-10",
          hasResponded ? "ring-2 ring-go/45" : "",
        ].join(" ")}
      >
        <img
          src={p.image}
          alt={`Portrait — ${p.prenom} ${p.nom}`}
          width={80}
          height={80}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain p-0.5"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className={["truncate font-serif leading-tight text-foreground", compact ? "text-[11px]" : "text-[12px]"].join(" ")}>
          {p.prenom} <span className="font-semibold">{p.nom}</span>
        </div>
        <div className={["truncate leading-snug text-muted-foreground", compact ? "text-[9px]" : "text-[10px]"].join(" ")}>
          {p.activite}
        </div>
      </div>
      {hasResponded && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-go text-white shadow">
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M2 6.5L5 9.5L10 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </div>
  );
}
