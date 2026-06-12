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
        content:
          "Écran d'accueil de l'atelier IA & no-code pour entrepreneurs.",
      },
    ],
  }),
  component: AccueilPage,
});

function AccueilPage() {
  const [heure, setHeure] = useState<string>("");
  const [highlight, setHighlight] = useState<number | null>(null);
  const [responded, setResponded] = useState<Set<string>>(new Set());

  useEffect(() => {
    const tick = () =>
      setHeure(
        new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
      );
    tick();
    const t = setInterval(tick, 1000 * 30);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setHighlight(Math.floor(Math.random() * PARTICIPANTS.length));
    }, 4200);
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-[oklch(0.985_0.006_220)] text-foreground">
      {/* Soft atmospheric background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-[oklch(0.93_0.03_220)] opacity-50 blur-3xl" />
        <div className="absolute -right-48 top-48 h-[44rem] w-[44rem] rounded-full bg-[oklch(0.94_0.025_180)] opacity-40 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.22 0.02 220) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Hero */}
      <header className="px-8 pb-6 pt-10 text-center md:px-20 md:pt-12">
        <div className="mx-auto inline-flex items-center gap-2.5 rounded-full border border-[oklch(0.88_0.015_220)] bg-white/80 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-primary shadow-sm backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Atelier · Summit Flow
        </div>

        <h1 className="mx-auto mt-5 max-w-5xl text-4xl leading-[1.05] tracking-tight text-foreground md:text-5xl">
          Bienvenue.{" "}
          <span className="text-primary">IA &amp; no-code</span>
          <span className="text-foreground/75"> pour entreprendre plus simplement.</span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          Installez-vous et lancez le tour de table — scannez, répondez, les résultats s'affichent en direct.
        </p>
      </header>

      {/* Sondage live (centré, large) */}
      <section className="px-4 md:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="rounded-3xl border border-[oklch(0.92_0.01_220)] bg-white/85 p-2 shadow-[0_30px_80px_-40px_rgba(30,60,90,0.35)] backdrop-blur-md">
            <div className="overflow-hidden rounded-[20px]">
              <LivePoll />
            </div>
          </div>
        </div>
      </section>

      {/* Tour de table — grille de samoyèdes */}
      <section className="px-4 pb-16 pt-10 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
                Tour de table
              </div>
              <h2 className="mt-1 font-serif text-2xl text-foreground md:text-3xl">
                17 entrepreneurs autour de la table
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[oklch(0.92_0.01_220)] bg-white/80 px-3 py-1.5 text-xs text-foreground/75 shadow-sm backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-go" />
              <span className="font-mono">
                {totalResponded}/{PARTICIPANTS.length} ont répondu
              </span>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {PARTICIPANTS.map((p, idx) => (
              <ParticipantCard
                key={p.id}
                p={p}
                idx={idx}
                isHighlight={highlight === idx}
                hasResponded={responded.has(p.id)}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[oklch(0.92_0.01_220)] bg-white/50 px-8 py-6 backdrop-blur-md md:px-16">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Début à 9h</span> · Merci de votre présence.
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
            Summit Flow{heure ? ` · ${heure}` : ""}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes cardIn {
          0% { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function ParticipantCard({
  p,
  idx,
  isHighlight,
  hasResponded,
}: {
  p: Participant;
  idx: number;
  isHighlight: boolean;
  hasResponded: boolean;
}) {
  return (
    <li
      className={[
        "group relative flex flex-col items-center gap-2 rounded-2xl border bg-white/90 p-4 text-center backdrop-blur-md transition-all duration-500",
        hasResponded
          ? "border-go/45 bg-[oklch(0.97_0.04_150)]/70 shadow-[0_8px_24px_-14px_rgba(40,140,90,0.45)]"
          : isHighlight
            ? "-translate-y-0.5 border-primary/45 shadow-[0_18px_40px_-22px_rgba(30,60,90,0.45)]"
            : "border-[oklch(0.92_0.01_220)] shadow-[0_4px_18px_-12px_rgba(30,60,90,0.18)]",
      ].join(" ")}
      style={{
        animation: `cardIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.035}s both`,
      }}
    >
      {hasResponded && (
        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-go/15 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-go">
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M2 6.5L5 9.5L10 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          OK
        </span>
      )}

      <div className="relative h-20 w-20 shrink-0">
        <div
          className={[
            "absolute inset-0 rounded-full bg-gradient-to-b from-[oklch(0.96_0.015_220)] to-[oklch(0.93_0.02_200)] shadow-inner transition",
            hasResponded ? "ring-2 ring-go/40" : "",
          ].join(" ")}
        />
        <img
          src={p.image}
          alt={`Portrait — ${p.prenom} ${p.nom}`}
          width={160}
          height={160}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain p-1"
        />
      </div>

      <div className="mt-1 min-w-0">
        <div className="truncate font-serif text-[15px] leading-tight text-foreground">
          {p.prenom} <span className="font-semibold">{p.nom}</span>
        </div>
        <div className="mx-auto mt-1.5 h-px w-6 bg-primary/30" />
        <div className="mt-1.5 line-clamp-2 text-[12px] leading-snug text-muted-foreground">
          {p.activite}
        </div>
      </div>
    </li>
  );
}
