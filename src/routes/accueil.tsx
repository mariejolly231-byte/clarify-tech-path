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
  const [heure, setHeure] = useState<string>("");

  useEffect(() => {
    const t = setInterval(() => {
      setHighlight(Math.floor(Math.random() * PARTICIPANTS.length));
    }, 3800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const update = () =>
      setHeure(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
    update();
    const t = setInterval(update, 1000 * 30);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[oklch(0.985_0.006_220)] text-foreground">
      {/* Soft atmospheric background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-32 h-[36rem] w-[36rem] rounded-full bg-[oklch(0.92_0.04_220)] opacity-60 blur-3xl" />
        <div className="absolute -right-40 top-40 h-[40rem] w-[40rem] rounded-full bg-[oklch(0.94_0.03_180)] opacity-50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.95_0.025_80)] opacity-50 blur-3xl" />
        {/* Floating particles */}
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.7)]"
            style={{
              width: `${4 + (i % 4) * 2}px`,
              height: `${4 + (i % 4) * 2}px`,
              left: `${(i * 73) % 100}%`,
              top: `${(i * 41) % 100}%`,
              animation: `floaty ${10 + (i % 5) * 2}s ease-in-out ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Hero */}
      <header className="px-6 pb-10 pt-16 text-center md:px-16 md:pt-24">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[oklch(0.85_0.02_220)] bg-white/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-primary backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Atelier en cours d'installation
        </div>

        <h1 className="mx-auto mt-7 max-w-5xl text-5xl leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-[5.5rem]">
          Bienvenue.
          <br />
          <span className="text-primary">IA &amp; no-code</span>
          <span className="text-foreground/80"> pour entreprendre plus simplement.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Les esprits s'échauffent, les samoyèdes aussi. <br className="hidden md:block" />
          Installez-vous, on démarre tout doucement.
        </p>
      </header>

      {/* Grid */}
      <section className="px-6 pb-24 md:px-16">
        <div className="mx-auto grid max-w-[1700px] grid-cols-2 gap-6 sm:grid-cols-3 md:gap-7 lg:grid-cols-5 xl:grid-cols-6">
          {PARTICIPANTS.map((p, i) => {
            const isHighlight = highlight === i;
            return (
              <article
                key={`${p.prenom}-${p.nom}`}
                className={[
                  "group relative flex flex-col items-center rounded-3xl border border-white/80 bg-white/75 p-5 text-center backdrop-blur-md transition-all duration-500",
                  "shadow-[0_10px_36px_-14px_rgba(30,60,90,0.20)] hover:-translate-y-1.5 hover:shadow-[0_26px_60px_-20px_rgba(30,60,90,0.32)]",
                  isHighlight ? "-translate-y-1.5 ring-2 ring-primary/40 shadow-[0_26px_60px_-20px_rgba(30,60,90,0.38)]" : "",
                ].join(" ")}
                style={{
                  animation: `cardIn 0.8s ease-out ${i * 0.06}s both`,
                }}
              >
                <div className="relative mb-4 h-36 w-36 md:h-40 md:w-40">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[oklch(0.94_0.03_220)] to-[oklch(0.96_0.02_180)]" />
                  <img
                    src={p.image}
                    alt={`Samoyède — ${p.activite}`}
                    width={320}
                    height={320}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105"
                    style={{
                      animation: `bobble ${5 + (i % 4)}s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                </div>

                <h3 className="font-serif text-lg leading-tight tracking-tight text-foreground md:text-xl">
                  {p.prenom} <span className="font-semibold">{p.nom}</span>
                </h3>
                <p className="mt-1.5 text-sm leading-snug text-muted-foreground md:text-[15px]">
                  {p.activite}
                </p>


                <div
                  className={[
                    "pointer-events-none absolute inset-x-3 -bottom-2 translate-y-2 rounded-xl bg-primary px-3 py-1.5 text-[11px] font-medium text-primary-foreground opacity-0 shadow-lg transition-all duration-300",
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
      <footer className="border-t border-white/60 bg-white/40 px-6 py-6 backdrop-blur-md md:px-16">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
          <div className="text-sm text-muted-foreground">
            <span className="text-foreground">Début de l'atelier à 9h</span> · Installez-vous, on démarre bientôt.
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
            Summit Flow · {heure}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes cardIn {
          0% { opacity: 0; transform: translateY(24px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bobble {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes floaty {
          0%, 100% { transform: translate(0, 0); opacity: 0.55; }
          50% { transform: translate(10px, -18px); opacity: 0.95; }
        }
      `}</style>
    </div>
  );
}
