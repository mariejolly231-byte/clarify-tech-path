import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import s01 from "@/assets/samoyedes/01-bador.png.asset.json";
import s02 from "@/assets/samoyedes/02-bouchard.png.asset.json";
import s03 from "@/assets/samoyedes/03-chadelle.png.asset.json";
import s04 from "@/assets/samoyedes/04-davidoff.png.asset.json";
import s05 from "@/assets/samoyedes/05-desousa.png.asset.json";
import s06 from "@/assets/samoyedes/06-diaz.png.asset.json";
import s07 from "@/assets/samoyedes/07-dumestier.png.asset.json";
import s08 from "@/assets/samoyedes/08-duplouy.png.asset.json";
import s09 from "@/assets/samoyedes/09-garciae.png.asset.json";
import s10 from "@/assets/samoyedes/10-garciat.png.asset.json";
import s11 from "@/assets/samoyedes/11-hwang.png.asset.json";
import s12 from "@/assets/samoyedes/12-maffre.png.asset.json";
import s13 from "@/assets/samoyedes/13-martin.png.asset.json";
import s14 from "@/assets/samoyedes/14-portes.png.asset.json";
import s15 from "@/assets/samoyedes/15-raymond.png.asset.json";
import s16 from "@/assets/samoyedes/16-razes.png.asset.json";
import s17 from "@/assets/samoyedes/17-zamore.png.asset.json";

export const Route = createFileRoute("/accueil")({
  head: () => ({
    meta: [
      { title: "Bienvenue — Atelier IA & no-code · Summit Flow" },
      {
        name: "description",
        content:
          "Écran d'accueil de l'atelier IA & no-code pour entrepreneurs. Les participants arrivent, leurs samoyèdes aussi.",
      },
    ],
  }),
  component: AccueilPage,
});

type Participant = {
  prenom: string;
  nom: string;
  activite: string;
  detail: string;
  image: string;
};

const PARTICIPANTS: Participant[] = [
  { prenom: "Anthony", nom: "Bador", activite: "Consultant recrutement", detail: "À l'écoute des bons profils.", image: s01.url },
  { prenom: "Emeline", nom: "Bouchard", activite: "Formation CSE, dirigeants & RH", detail: "Le savoir bien transmis.", image: s02.url },
  { prenom: "Mickaël", nom: "Chadelle", activite: "Community manager & sites vitrine", detail: "Du web qui parle vrai.", image: s03.url },
  { prenom: "Cyndia", nom: "Davidoff", activite: "Sophrologue — maladies inflammatoires", detail: "Respirer pour apaiser.", image: s04.url },
  { prenom: "Cristiano", nom: "De Sousa Valente", activite: "Sites, apps & automatisation", detail: "Connecter les outils, libérer du temps.", image: s05.url },
  { prenom: "Patricia", nom: "Diaz", activite: "Couturière — produits lavables", detail: "Cousu main, pensé durable.", image: s06.url },
  { prenom: "Florine Anne", nom: "Dumestier", activite: "Communication bien-être", detail: "Des mots qui font du bien.", image: s07.url },
  { prenom: "Katéry Myriam", nom: "Duplouy", activite: "Illustratrice & coloriste", detail: "La couleur juste, au bon endroit.", image: s08.url },
  { prenom: "Emilie", nom: "Garcia", activite: "Gestion & coordination de projets", detail: "Tout reste en ordre.", image: s09.url },
  { prenom: "Tahidys", nom: "Garcia", activite: "Services à la personne", detail: "Au plus près des besoins.", image: s10.url },
  { prenom: "Soo Jin", nom: "Hwang", activite: "Traiteur asiatique en distributeur", detail: "L'Asie à portée de pause.", image: s11.url },
  { prenom: "Stéphany", nom: "Maffre", activite: "Legal design & copywriting", detail: "Le droit, enfin clair.", image: s12.url },
  { prenom: "Fleur", nom: "Martin", activite: "Tapisserie d'ameublement", detail: "Redonner vie à la matière.", image: s13.url },
  { prenom: "Jordi", nom: "Portes", activite: "Plateforme FLE — enseignement du français", detail: "Apprendre, où que l'on soit.", image: s14.url },
  { prenom: "Fabienne", nom: "Raymond", activite: "Coach professionnelle & formatrice", detail: "Faire un pas de plus.", image: s15.url },
  { prenom: "Michèle", nom: "Razes Lafont", activite: "Sublim'objets ML — flocage tout support", detail: "Un objet, une signature.", image: s16.url },
  { prenom: "Gaëlle", nom: "Zamore", activite: "Soins minceur & bien-être à domicile", detail: "Prendre soin chez soi.", image: s17.url },
];

function AccueilPage() {
  const [highlight, setHighlight] = useState<number | null>(null);
  const [heure, setHeure] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setHighlight(Math.floor(Math.random() * PARTICIPANTS.length));
    }, 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const update = () =>
      setHeure(
        new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
      );
    update();
    const t = setInterval(update, 30 * 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[oklch(0.98_0.005_95)] text-foreground">
      {/* Editorial atmosphere — subtle, no particles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[44rem] w-[44rem] rounded-full bg-[oklch(0.93_0.025_200)] opacity-50 blur-[120px]" />
        <div className="absolute -right-48 top-1/3 h-[40rem] w-[40rem] rounded-full bg-[oklch(0.94_0.02_80)] opacity-40 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.2 0.02 220) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Hero */}
      <header className="px-8 pb-14 pt-20 text-center md:px-20 md:pt-28">
        <div className="mx-auto inline-flex items-center gap-2.5 rounded-full border border-[oklch(0.85_0.015_220)] bg-white/60 px-4 py-1.5 text-[10px] uppercase tracking-[0.32em] text-primary backdrop-blur-sm">
          <span className="h-1 w-1 animate-pulse rounded-full bg-primary" />
          Atelier · 11 juin 2026
        </div>

        <h1 className="mx-auto mt-8 max-w-5xl font-serif text-5xl font-light leading-[1.02] tracking-[-0.025em] text-foreground md:text-7xl lg:text-[5.25rem]">
          Bienvenue.
          <br />
          <span className="italic text-primary">IA &amp; no-code</span>
          <span className="text-foreground/75">, pour entreprendre plus simplement.</span>
        </h1>

        <div className="mx-auto mt-8 h-px w-24 bg-[oklch(0.7_0.02_220)] opacity-50" />

        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Installez-vous. Faites connaissance.<br className="hidden md:block" />
          Nous démarrons dans quelques instants.
        </p>
      </header>

      {/* Grid */}
      <section className="px-6 pb-20 md:px-16">
        <div className="mx-auto mb-10 flex max-w-[1600px] items-center gap-4">
          <div className="h-px flex-1 bg-[oklch(0.85_0.01_220)]" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Les participantes &amp; participants
          </span>
          <div className="h-px flex-1 bg-[oklch(0.85_0.01_220)]" />
        </div>

        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-5 xl:grid-cols-6">
          {PARTICIPANTS.map((p, i) => {
            const isHighlight = highlight === i;
            return (
              <article
                key={`${p.prenom}-${p.nom}`}
                className={[
                  "group relative flex flex-col items-center rounded-2xl border border-[oklch(0.9_0.008_220)] bg-white/75 px-5 pb-6 pt-7 text-center backdrop-blur-md transition-all duration-700",
                  "shadow-[0_1px_2px_rgba(30,60,90,0.04),0_12px_32px_-18px_rgba(30,60,90,0.18)]",
                  "hover:-translate-y-1 hover:border-[oklch(0.82_0.02_200)] hover:bg-white hover:shadow-[0_1px_2px_rgba(30,60,90,0.05),0_24px_50px_-22px_rgba(30,60,90,0.28)]",
                  isHighlight
                    ? "-translate-y-1 border-[oklch(0.78_0.04_195)] bg-white shadow-[0_1px_2px_rgba(30,60,90,0.05),0_24px_50px_-22px_rgba(30,60,90,0.32)]"
                    : "",
                ].join(" ")}
                style={{
                  animation: `cardIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.05}s both`,
                }}
              >
                <div className="relative mb-4 h-28 w-28 md:h-32 md:w-32">
                  <div className="absolute inset-0 rounded-full bg-[oklch(0.96_0.012_200)] ring-1 ring-inset ring-[oklch(0.9_0.01_220)]" />
                  <img
                    src={p.image}
                    alt={`Portrait — ${p.activite}`}
                    width={256}
                    height={256}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain p-1.5 transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>

                <h3 className="font-serif text-[17px] font-normal leading-tight tracking-tight text-foreground md:text-[19px]">
                  {p.prenom} {p.nom}
                </h3>
                <p className="mt-2 text-[11px] uppercase leading-snug tracking-[0.12em] text-muted-foreground md:text-[12px]">
                  {p.activite}
                </p>

                <div
                  className={[
                    "pointer-events-none absolute inset-x-4 -bottom-3 translate-y-2 rounded-md bg-foreground px-3 py-2 text-[11px] font-medium leading-snug text-background opacity-0 shadow-xl transition-all duration-500",
                    "group-hover:-translate-y-1 group-hover:opacity-100",
                    isHighlight ? "-translate-y-1 opacity-100" : "",
                  ].join(" ")}
                >
                  {p.detail}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[oklch(0.9_0.008_220)] bg-white/50 px-6 py-7 backdrop-blur-md md:px-16">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Ouverture de l'atelier à 9h</span>
            <span className="mx-2 text-[oklch(0.8_0.01_220)]">·</span>
            <span>Un café vous attend.</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            <span>Summit Flow</span>
            <span className="h-3 w-px bg-[oklch(0.8_0.02_200)]" />
            <span suppressHydrationWarning>{heure ?? "—"}</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes cardIn {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

