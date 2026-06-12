import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
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
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
    const tick = () =>
      setHeure(
        new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const t = setInterval(tick, 1000 * 30);
    return () => clearInterval(t);
  }, []);

  // Cycle highlight through each card, one by one
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
          const pid = (payload.new as { participant_id: string | null })
            .participant_id;
          if (pid)
            setResponded((prev) => {
              const next = new Set(prev);
              next.add(pid);
              return next;
            });
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

  const formUrl = origin ? `${origin}/sondage` : "";

  // Split 17 into two columns: 9 left, 8 right
  const leftCol = PARTICIPANTS.slice(0, 9);
  const rightCol = PARTICIPANTS.slice(9);

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden bg-[oklch(0.985_0.006_220)] text-foreground">
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

      {/* Compact hero */}
      <header className="shrink-0 px-6 pt-2 text-center">
        <h1 className="mx-auto max-w-4xl text-lg leading-tight tracking-tight md:text-xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">Summit Flow ·</span>{" "}
          Bienvenue. <span className="text-primary">IA &amp; no-code</span>
          <span className="text-foreground/75"> pour entreprendre plus simplement.</span>
        </h1>
      </header>

      {/* Main stage: cards floating around centered QR */}
      <main className="relative flex flex-1 items-stretch justify-center gap-2 px-3 py-2 md:px-4">
        {/* Left column */}
        <div className="flex flex-1 flex-col justify-between gap-1">
          {leftCol.map((p, idx) => (
            <ParticipantCard
              key={p.id}
              p={p}
              idx={idx}
              isHighlight={highlight === idx}
              hasResponded={responded.has(p.id)}
              floatVariant={idx % 3}
            />
          ))}
        </div>

        {/* Center: QR */}
        <div className="flex w-[300px] shrink-0 flex-col items-center justify-center md:w-[340px]">
          <div className="w-full rounded-2xl border border-[oklch(0.92_0.01_220)] bg-white/95 p-4 text-center shadow-[0_30px_80px_-40px_rgba(30,60,90,0.4)] backdrop-blur-md">
            <div className="text-[10px] uppercase tracking-[0.28em] text-primary">
              Scannez pour participer
            </div>
            <div className="mt-3 inline-flex items-center justify-center rounded-xl bg-white p-2.5 ring-1 ring-[oklch(0.92_0.01_220)]">
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
            <p className="mt-3 text-xs text-foreground/80">
              Scanne le QR et choisis ton personnage pour démarrer.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-go animate-pulse" />
              <span className="font-mono text-[10px] text-foreground/80">
                {totalResponded}/{PARTICIPANTS.length} ont répondu
              </span>
            </div>
          </div>
          <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.28em] text-primary">
            {heure ? `${heure} · ` : ""}Début 9h
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-1 flex-col justify-between gap-1">
          {rightCol.map((p, idx) => (
            <ParticipantCard
              key={p.id}
              p={p}
              idx={idx + leftCol.length}
              isHighlight={highlight === idx + leftCol.length}
              hasResponded={responded.has(p.id)}
              floatVariant={(idx + 1) % 3}
            />
          ))}
        </div>
      </main>

      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(6px, -5px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-5px, 6px); }
        }
        @keyframes floatC {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(4px, 4px); }
        }
        @keyframes cardIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 oklch(0.55 0.18 220 / 0.0), 0 8px 22px -14px rgba(30,60,90,0.5); }
          50% { box-shadow: 0 0 0 4px oklch(0.55 0.18 220 / 0.18), 0 14px 30px -14px rgba(30,60,90,0.55); }
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
  floatVariant,
}: {
  p: Participant;
  idx: number;
  isHighlight: boolean;
  hasResponded: boolean;
  floatVariant: number;
}) {
  const floatName = floatVariant === 0 ? "floatA" : floatVariant === 1 ? "floatB" : "floatC";
  const dur = 6 + (idx % 4) * 0.8;
  const delay = (idx % 5) * 0.4;

  return (
    <div
      className="relative"
      style={{
        animation: `${floatName} ${dur}s ease-in-out ${delay}s infinite, cardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.03}s both`,
      }}
    >
      <div
        className={[
          "relative flex items-center gap-2 rounded-lg border bg-white/90 px-2 py-1 backdrop-blur-md transition-all duration-500",
          hasResponded
            ? "border-go/50 bg-[oklch(0.97_0.04_150)]/80"
            : isHighlight
              ? "border-primary/60 bg-white"
              : "border-[oklch(0.92_0.01_220)]",
        ].join(" ")}
        style={
          isHighlight && !hasResponded
            ? { animation: "glowPulse 1.6s ease-in-out" }
            : undefined
        }
      >
        <div className="relative h-9 w-9 shrink-0">
          <div
            className={[
              "absolute inset-0 rounded-full bg-gradient-to-b from-[oklch(0.96_0.015_220)] to-[oklch(0.93_0.02_200)] transition",
              hasResponded ? "ring-2 ring-go/50" : isHighlight ? "ring-2 ring-primary/60" : "",
            ].join(" ")}
          />
          <img
            src={p.image}
            alt={`Portrait — ${p.prenom} ${p.nom}`}
            width={72}
            height={72}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain p-0.5"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate font-serif text-[12px] leading-tight text-foreground">
            {p.prenom} <span className="font-semibold">{p.nom}</span>
          </div>
          <div className="truncate text-[10px] leading-snug text-muted-foreground">
            {p.activite}
          </div>
        </div>

        {hasResponded && (
          <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-go text-white shadow-sm">
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M2 6.5L5 9.5L10 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
}
