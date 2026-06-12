import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
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

// Répartition autour du QR : top 5, gauche 3, droite 3, bas 6 = 17
const LAYOUT = {
  top: 5,
  left: 3,
  right: 3,
  bottom: 6,
} as const;

function AccueilPage() {
  const [heure, setHeure] = useState<string>("");
  const [highlight, setHighlight] = useState<number | null>(null);
  const [responded, setResponded] = useState<Set<string>>(new Set());
  const [origin, setOrigin] = useState("");
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
    const tick = () =>
      setHeure(
        new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      );
    tick();
    const t = setInterval(tick, 30_000);
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
            setPulse(true);
            setTimeout(() => setPulse(false), 900);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const totalResponded = useMemo(
    () =>
      Array.from(responded).filter((id) =>
        PARTICIPANTS.some((p) => p.id === id),
      ).length,
    [responded],
  );

  const formUrl = origin ? `${origin}/sondage` : "";

  const top = PARTICIPANTS.slice(0, LAYOUT.top);
  const left = PARTICIPANTS.slice(LAYOUT.top, LAYOUT.top + LAYOUT.left);
  const right = PARTICIPANTS.slice(
    LAYOUT.top + LAYOUT.left,
    LAYOUT.top + LAYOUT.left + LAYOUT.right,
  );
  const bottom = PARTICIPANTS.slice(LAYOUT.top + LAYOUT.left + LAYOUT.right);

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden bg-[oklch(0.985_0.006_220)] text-foreground">
      {/* Soft atmospheric background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[oklch(0.93_0.03_220)] opacity-50 blur-3xl" />
        <div className="absolute -right-48 top-40 h-[38rem] w-[38rem] rounded-full bg-[oklch(0.94_0.025_180)] opacity-40 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.22 0.02 220) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      {/* Header compact */}
      <header className="flex shrink-0 items-center justify-between px-6 pt-4 pb-2 md:px-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.88_0.015_220)] bg-white/80 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-primary shadow-sm backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Atelier · Summit Flow
        </div>
        <h1 className="hidden text-center text-[15px] leading-tight tracking-tight text-foreground/85 md:block">
          Bienvenue · <span className="text-primary">IA &amp; no-code</span> pour entreprendre plus simplement
        </h1>
        <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.92_0.01_220)] bg-white/80 px-3 py-1.5 text-[11px] text-foreground/75 shadow-sm backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-go" />
          <span className="font-mono">
            {totalResponded}/{PARTICIPANTS.length} · {heure}
          </span>
        </div>
      </header>

      {/* Top row */}
      <div className="flex shrink-0 justify-center gap-3 px-6 py-2">
        {top.map((p, i) => (
          <ParticipantCard
            key={p.id}
            p={p}
            globalIdx={i}
            isHighlight={highlight === i}
            hasResponded={responded.has(p.id)}
          />
        ))}
      </div>

      {/* Middle : gauche · QR · droite */}
      <div className="flex min-h-0 flex-1 items-center justify-between gap-3 px-6 md:px-10">
        <div className="flex flex-col justify-center gap-3">
          {left.map((p, i) => {
            const globalIdx = LAYOUT.top + i;
            return (
              <ParticipantCard
                key={p.id}
                p={p}
                globalIdx={globalIdx}
                isHighlight={highlight === globalIdx}
                hasResponded={responded.has(p.id)}
              />
            );
          })}
        </div>

        {/* Centre : QR + compteur */}
        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center gap-5 rounded-3xl border border-[oklch(0.92_0.01_220)] bg-white/90 px-6 py-5 shadow-[0_30px_80px_-40px_rgba(30,60,90,0.45)] backdrop-blur-md">
            <div className="flex flex-col items-center">
              <div className="text-[10px] font-medium uppercase tracking-[0.28em] text-primary">
                Scannez pour répondre
              </div>
              <div className="mt-3 rounded-xl bg-white p-2.5 ring-1 ring-[oklch(0.92_0.01_220)]">
                {formUrl ? (
                  <QRCodeSVG
                    value={formUrl}
                    size={210}
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#1a3a3f"
                  />
                ) : (
                  <div className="h-[210px] w-[210px]" />
                )}
              </div>
              <div className="mt-2.5 font-mono text-[10px] text-muted-foreground">
                {formUrl ? formUrl.replace(/^https?:\/\//, "") : ""}
              </div>
            </div>

            <div className="hidden h-[230px] w-px bg-[oklch(0.92_0.01_220)] md:block" />

            <div className="hidden max-w-[200px] flex-col gap-3 md:flex">
              <div>
                <div className="text-[10px] font-medium uppercase tracking-[0.28em] text-primary">
                  Tour de table live
                </div>
                <div className="mt-1.5 font-serif text-[22px] leading-tight text-foreground">
                  On commence par&nbsp;<span className="text-primary">vous</span>.
                </div>
              </div>
              <p className="text-[12px] leading-snug text-muted-foreground">
                Scannez le QR, choisissez votre samoyède, répondez en 2 min. Les cartes s'éclairent en direct.
              </p>
              <div
                className={`inline-flex items-center gap-2 self-start rounded-full border border-go/25 bg-go/10 px-3 py-1.5 text-[11px] transition ${
                  pulse ? "scale-105 bg-go/20" : ""
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full bg-go ${pulse ? "animate-ping" : ""}`} />
                <span className="font-mono text-foreground/80">
                  {totalResponded} / {PARTICIPANTS.length} réponses
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3">
          {right.map((p, i) => {
            const globalIdx = LAYOUT.top + LAYOUT.left + i;
            return (
              <ParticipantCard
                key={p.id}
                p={p}
                globalIdx={globalIdx}
                isHighlight={highlight === globalIdx}
                hasResponded={responded.has(p.id)}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex shrink-0 justify-center gap-3 px-6 py-2">
        {bottom.map((p, i) => {
          const globalIdx = LAYOUT.top + LAYOUT.left + LAYOUT.right + i;
          return (
            <ParticipantCard
              key={p.id}
              p={p}
              globalIdx={globalIdx}
              isHighlight={highlight === globalIdx}
              hasResponded={responded.has(p.id)}
            />
          );
        })}
      </div>

      {/* Footer minimal */}
      <footer className="shrink-0 border-t border-[oklch(0.92_0.01_220)] bg-white/55 px-6 py-1.5 text-center text-[11px] text-muted-foreground backdrop-blur-md md:px-10">
        <span className="font-medium text-foreground">Début à 9h</span> · Merci de votre présence — Summit Flow
      </footer>

      <style>{`
        @keyframes cardIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}

function ParticipantCard({
  p,
  globalIdx,
  isHighlight,
  hasResponded,
}: {
  p: Participant;
  globalIdx: number;
  isHighlight: boolean;
  hasResponded: boolean;
}) {
  return (
    <div
      className={[
        "relative flex w-[130px] shrink-0 flex-col items-center gap-1 rounded-2xl border bg-white/90 px-2 py-2 text-center backdrop-blur-md transition-all duration-500",
        hasResponded
          ? "border-go/45 bg-[oklch(0.97_0.04_150)]/70 shadow-[0_8px_22px_-14px_rgba(40,140,90,0.5)]"
          : isHighlight
            ? "-translate-y-0.5 border-primary/45 shadow-[0_14px_30px_-18px_rgba(30,60,90,0.5)]"
            : "border-[oklch(0.92_0.01_220)] shadow-[0_4px_14px_-10px_rgba(30,60,90,0.2)]",
      ].join(" ")}
      style={{
        animation: `cardIn 0.6s cubic-bezier(0.22,1,0.36,1) ${globalIdx * 0.035}s both, floatY ${5 + (globalIdx % 4) * 0.6}s ease-in-out ${globalIdx * 0.15}s infinite`,
      }}
    >
      {hasResponded && (
        <span className="absolute right-1.5 top-1.5 inline-flex items-center rounded-full bg-go/15 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-go">
          <svg viewBox="0 0 12 12" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M2 6.5L5 9.5L10 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}

      <div className="relative h-12 w-12 shrink-0">
        <div
          className={[
            "absolute inset-0 rounded-full bg-gradient-to-b from-[oklch(0.96_0.015_220)] to-[oklch(0.93_0.02_200)] shadow-inner transition",
            hasResponded ? "ring-2 ring-go/40" : "",
          ].join(" ")}
        />
        <img
          src={p.image}
          alt={`Portrait — ${p.prenom} ${p.nom}`}
          width={96}
          height={96}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain p-0.5"
        />
      </div>

      <div className="min-w-0">
        <div className="truncate font-serif text-[12px] leading-tight text-foreground">
          {p.prenom}{" "}
          <span className="font-semibold">{p.nom}</span>
        </div>
        <div className="line-clamp-2 text-[10px] leading-tight text-muted-foreground">
          {p.activite}
        </div>
      </div>
    </div>
  );
}
