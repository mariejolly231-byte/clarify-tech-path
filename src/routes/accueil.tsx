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

// 17 positions autour du QR central — top/left en % du container.
// Le QR occupe approximativement la zone centrale : 35-65% width, 25-78% height.
// Les pastilles font ~190×60px : on les place sur le pourtour.
const POSITIONS: { top: string; left: string }[] = [
  // ligne du haut (5)
  { top: "2%", left: "3%" },
  { top: "0%", left: "22%" },
  { top: "1%", left: "41%" },
  { top: "0%", left: "60%" },
  { top: "2%", left: "79%" },
  // colonne droite (3)
  { top: "22%", left: "82%" },
  { top: "44%", left: "84%" },
  { top: "66%", left: "82%" },
  // ligne du bas (5)
  { top: "88%", left: "79%" },
  { top: "90%", left: "60%" },
  { top: "89%", left: "41%" },
  { top: "90%", left: "22%" },
  { top: "88%", left: "3%" },
  // colonne gauche (4)
  { top: "66%", left: "0%" },
  { top: "49%", left: "0%" },
  { top: "32%", left: "0%" },
  { top: "16%", left: "1%" },
];

function AccueilPage() {
  const [heure, setHeure] = useState<string>("");
  const [responded, setResponded] = useState<Set<string>>(new Set());
  const [pulse, setPulse] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

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
            setTimeout(() => setPulse(false), 1200);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formUrl = origin ? `${origin}/sondage` : "";
  const totalResponded = useMemo(
    () => PARTICIPANTS.filter((p) => responded.has(p.id)).length,
    [responded],
  );

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden bg-[oklch(0.985_0.006_220)] text-foreground">
      {/* Background */}
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

      {/* Hero compact */}
      <header className="shrink-0 px-6 pb-3 pt-5 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.88_0.015_220)] bg-white/80 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-primary shadow-sm backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Atelier · Summit Flow
        </div>
        <h1 className="mt-3 text-2xl leading-tight tracking-tight md:text-3xl">
          Bienvenue. <span className="text-primary">IA &amp; no-code</span>
          <span className="text-foreground/75"> pour entreprendre plus simplement.</span>
        </h1>
      </header>

      {/* Stage : QR au centre + samoyèdes autour */}
      <main className="relative flex-1 px-4 py-2 md:px-8">
        <div className="relative mx-auto h-full w-full max-w-[1400px]">
          {/* Pastilles samoyèdes positionnées sur le pourtour */}
          {PARTICIPANTS.map((p, i) => {
            const pos = POSITIONS[i] ?? { top: "0%", left: "0%" };
            return (
              <ParticipantPill
                key={p.id}
                p={p}
                pos={pos}
                idx={i}
                hasResponded={responded.has(p.id)}
              />
            );
          })}

          {/* Carte centrale : QR + compteur */}
          <div className="absolute left-1/2 top-1/2 z-20 w-[340px] -translate-x-1/2 -translate-y-1/2">
            <div className="rounded-3xl border border-[oklch(0.92_0.01_220)] bg-white/95 p-6 text-center shadow-[0_30px_80px_-32px_rgba(30,60,90,0.35)] backdrop-blur-md">
              <div className="text-[10px] font-medium uppercase tracking-[0.28em] text-primary">
                Scannez pour répondre
              </div>
              <div className="mt-4 inline-flex items-center justify-center rounded-xl bg-white p-3 ring-1 ring-border">
                {formUrl ? (
                  <QRCodeSVG
                    value={formUrl}
                    size={180}
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#1a3a3f"
                  />
                ) : (
                  <div className="h-[180px] w-[180px]" />
                )}
              </div>
              <div className="mt-3 font-mono text-[11px] break-all text-muted-foreground">
                {formUrl ? formUrl.replace(/^https?:\/\//, "") + "" : ""}
              </div>
              <div
                className={`mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1.5 transition ${
                  pulse ? "scale-105 border-go/40 bg-go/10" : ""
                }`}
              >
                <span className={`h-2 w-2 rounded-full bg-go ${pulse ? "animate-ping" : ""}`} />
                <span className="font-mono text-xs text-foreground/80">
                  {totalResponded}/{PARTICIPANTS.length} ont répondu
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="shrink-0 border-t border-[oklch(0.92_0.01_220)] bg-white/60 px-6 py-2.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] flex-row items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Début à 9h</span> · Merci de votre présence.
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
            Summit Flow{heure ? ` · ${heure}` : ""}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pillIn {
          0% { opacity: 0; transform: translate3d(0, 8px, 0) scale(0.96); }
          100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes driftA {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(6px, -8px, 0); }
        }
        @keyframes driftB {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-7px, 6px, 0); }
        }
        @keyframes driftC {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(5px, 7px, 0); }
        }
        @keyframes driftD {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-6px, -7px, 0); }
        }
      `}</style>
    </div>
  );
}

function ParticipantPill({
  p,
  pos,
  idx,
  hasResponded,
}: {
  p: Participant;
  pos: { top: string; left: string };
  idx: number;
  hasResponded: boolean;
}) {
  const drifts = ["driftA", "driftB", "driftC", "driftD"];
  const drift = drifts[idx % drifts.length];
  const duration = 7 + (idx % 5);
  const delay = (idx % 7) * 0.4;

  return (
    <div
      className="absolute z-10 w-[190px]"
      style={{
        top: pos.top,
        left: pos.left,
        animation: `pillIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.06}s both`,
      }}
    >
      <div
        style={{
          animation: `${drift} ${duration}s ease-in-out ${delay}s infinite`,
        }}
      >
        <div
          className={[
            "flex items-center gap-2.5 rounded-2xl border bg-white/90 px-2.5 py-2 backdrop-blur-md transition-all duration-500",
            hasResponded
              ? "border-go/50 bg-[oklch(0.97_0.04_150)]/85 shadow-[0_10px_28px_-14px_rgba(40,140,90,0.45)]"
              : "border-[oklch(0.92_0.01_220)] shadow-[0_4px_18px_-12px_rgba(30,60,90,0.2)]",
          ].join(" ")}
        >
          <div
            className={[
              "relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gradient-to-b from-[oklch(0.96_0.015_220)] to-[oklch(0.93_0.02_200)]",
              hasResponded ? "ring-2 ring-go/45" : "ring-1 ring-border",
            ].join(" ")}
          >
            <img
              src={p.image}
              alt={`Portrait — ${p.prenom} ${p.nom}`}
              className="absolute inset-0 h-full w-full object-contain p-0.5"
              loading="lazy"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12.5px] font-medium leading-tight text-foreground">
              {p.prenom}{" "}
              <span className="font-semibold">{p.nom.split(" ")[0]}</span>
            </div>
            <div className="truncate text-[10.5px] leading-snug text-muted-foreground">
              {p.activite}
            </div>
          </div>
          {hasResponded && (
            <svg
              viewBox="0 0 12 12"
              className="h-3.5 w-3.5 shrink-0 text-go"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M2 6.5L5 9.5L10 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
