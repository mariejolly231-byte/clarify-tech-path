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
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => {
      setHighlight(Math.floor(Math.random() * PARTICIPANTS.length));
    }, 3800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);

  const heure = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="relative min-h-screen overflow-hidden bg-[oklch(0.98_0.005_220)] text-foreground">
      {/* Soft atmospheric background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-[oklch(0.93_0.025_220)] opacity-50 blur-3xl" />
        <div className="absolute -right-48 top-48 h-[44rem] w-[44rem] rounded-full bg-[oklch(0.95_0.02_180)] opacity-40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[32rem] w-[32rem] rounded-full bg-[oklch(0.96_0.018_80)] opacity-35 blur-3xl" />
      </div>

      {/* Hero */}
      <header className="px-6 pb-12 pt-16 text-center md:px-16 md:pt-20">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[oklch(0.88_0.015_220)] bg-white/60 px-4 py-1.5 text-[10px] uppercase tracking-[0.32em] text-primary backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Atelier · Accueil
        </div>

        <h1 className="mx-auto mt-8 max-w-5xl font-serif text-[2.75rem] font-light leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-[4.75rem]">
          Bienvenue.
          <br />
          <span className="text-primary">IA &amp; no-code</span>
          <span className="text-foreground/75"> pour entreprendre plus simplement.</span>
        </h1>

        <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          Installez-vous confortablement. <br className="hidden md:block" />
          L'atelier commence dans quelques instants.
        </p>
      </header>

      {/* Grid */}
      <section className="px-6 pb-20 md:px-12 lg:px-16">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-5 xl:grid-cols-6">
          {PARTICIPANTS.map((p, i) => {
            const isHighlight = highlight === i;
            return (
              <article
                key={`${p.prenom}-${p.nom}`}
                className={[
                  "group relative flex flex-col items-center rounded-2xl border border-[oklch(0.92_0.008_220)] bg-white/85 p-5 text-center backdrop-blur-md transition-all duration-500",
                  "shadow-[0_4px_24px_-12px_rgba(20,40,70,0.10)] hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(20,40,70,0.22)] hover:border-primary/30",
                  isHighlight ? "-translate-y-1 border-primary/40 shadow-[0_18px_40px_-18px_rgba(20,40,70,0.26)]" : "",
                ].join(" ")}
                style={{
                  animation: `cardIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.05}s both`,
                }}
              >
                <div className="relative mb-4 h-24 w-24 md:h-28 md:w-28">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[oklch(0.95_0.018_220)] to-[oklch(0.97_0.012_180)] ring-1 ring-inset ring-white/80" />
                  <img
                    src={p.image}
                    alt={`Portrait — ${p.activite}`}
                    width={224}
                    height={224}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{
                      animation: `bobble ${7 + (i % 4)}s ease-in-out ${i * 0.25}s infinite`,
                    }}
                  />
                </div>

                <h3 className="font-serif text-[18px] font-normal leading-tight tracking-tight text-foreground md:text-[20px]">
                  {p.prenom} <span className="font-medium">{p.nom}</span>
                </h3>
                <div className="mx-auto mt-2 h-px w-8 bg-primary/25" />
                <p className="mt-2 text-[13px] leading-snug text-muted-foreground md:text-[14px]">
                  {p.activite}
                </p>

                <div
                  className={[
                    "pointer-events-none absolute inset-x-4 -bottom-2 translate-y-2 rounded-lg bg-foreground px-3 py-1.5 text-[11px] font-medium tracking-wide text-background opacity-0 shadow-lg transition-all duration-300",
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
      <footer className="border-t border-[oklch(0.92_0.008_220)] bg-white/50 px-6 py-6 backdrop-blur-md md:px-16">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
          <div className="text-sm text-muted-foreground">
            <span className="text-foreground">Début de l'atelier à 9h</span> · merci de votre présence.
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            Summit Flow · {heure}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes cardIn {
          0% { opacity: 0; transform: translateY(18px) scale(0.985); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bobble {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
