import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LivePoll } from "@/components/presentation/LivePoll";
import { PARTICIPANTS, type Participant } from "@/lib/participants";

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
      <header className="px-8 pb-8 pt-12 text-center md:px-20 md:pt-16">
        <div className="mx-auto inline-flex items-center gap-2.5 rounded-full border border-[oklch(0.88_0.015_220)] bg-white/80 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-primary shadow-sm backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Atelier · Summit Flow
        </div>

        <h1 className="mx-auto mt-6 max-w-5xl text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl">
          Bienvenue.
          <br />
          <span className="text-primary">IA &amp; no-code</span>
          <span className="text-foreground/75"> pour entreprendre plus simplement.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
          Installez-vous et lancez le tour de table — scannez, répondez, les résultats s'affichent en direct.
        </p>
      </header>

      {/* Constellation: poll au centre, samoyèdes autour */}
      <section className="px-4 pb-16 md:px-10">
        <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-6">
          {/* Colonne gauche : 1ère moitié des participants */}
          <aside className="col-span-12 lg:col-span-3">
            <ParticipantsColumn
              participants={PARTICIPANTS.slice(0, 9)}
              highlight={highlight}
              offset={0}
            />
          </aside>

          {/* Centre : sondage live */}
          <div className="col-span-12 lg:col-span-6">
            <div className="rounded-3xl border border-[oklch(0.92_0.01_220)] bg-white/85 p-2 shadow-[0_30px_80px_-40px_rgba(30,60,90,0.35)] backdrop-blur-md">
              <div className="overflow-hidden rounded-[20px]">
                <LivePoll />
              </div>
            </div>
          </div>

          {/* Colonne droite : 2nde moitié des participants */}
          <aside className="col-span-12 lg:col-span-3">
            <ParticipantsColumn
              participants={PARTICIPANTS.slice(9)}
              highlight={highlight}
              offset={9}
            />
          </aside>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[oklch(0.92_0.01_220)] bg-white/50 px-8 py-6 backdrop-blur-md md:px-16">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
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

function ParticipantsColumn({
  participants,
  highlight,
  offset,
}: {
  participants: Participant[];
  highlight: number | null;
  offset: number;
}) {
  return (
    <ul className="flex flex-col gap-3">
      {participants.map((p, i) => {
        const idx = i + offset;
        const isHighlight = highlight === idx;
        return (
          <li
            key={`${p.prenom}-${p.nom}`}
            className={[
              "flex items-center gap-3 rounded-2xl border bg-white/85 p-3 backdrop-blur-md transition-all duration-700",
              "shadow-[0_4px_18px_-12px_rgba(30,60,90,0.2)]",
              isHighlight
                ? "-translate-y-0.5 border-primary/35 shadow-[0_18px_40px_-22px_rgba(30,60,90,0.4)]"
                : "border-[oklch(0.92_0.01_220)]",
            ].join(" ")}
            style={{
              animation: `cardIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.04}s both`,
            }}
          >
            <div className="relative h-14 w-14 shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[oklch(0.96_0.015_220)] to-[oklch(0.93_0.02_200)] shadow-inner" />
              <img
                src={p.image}
                alt={`Portrait — ${p.prenom} ${p.nom}`}
                width={112}
                height={112}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain p-1"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-serif text-[14px] leading-tight text-foreground">
                {p.prenom} <span className="font-semibold">{p.nom}</span>
              </div>
              <div className="mt-1 h-px w-6 bg-primary/30" />
              <div className="mt-1 truncate text-[12px] leading-snug text-muted-foreground">
                {p.activite}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
