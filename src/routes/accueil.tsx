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
      setHeure(
        new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      );
    update();
    const t = setInterval(update, 1000 * 30);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[oklch(0.985_0.006_220)] text-foreground">
      {/* Soft atmospheric background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-32 h-[40rem] w-[40rem] rounded-full bg-[oklch(0.93_0.035_220)] opacity-55 blur-3xl" />
        <div className="absolute -right-40 top-40 h-[44rem] w-[44rem] rounded-full bg-[oklch(0.95_0.028_180)] opacity-45 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-[oklch(0.96_0.022_80)] opacity-45 blur-3xl" />
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
      <header className="px-6 pb-12 pt-16 text-center md:px-16 md:pt-24">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[oklch(0.86_0.02_220)] bg-white/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.24em] text-primary backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Atelier en cours d'installation
        </div>

        <h1 className="mx-auto mt-8 max-w-5xl text-5xl leading-[1.02] tracking-tight text-foreground md:text-7xl lg:text-[5.75rem]">
          Bienvenue.
          <br />
          <span className="text-primary">IA &amp; no-code</span>
          <span className="text-foreground/80"> pour entreprendre plus simplement.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl font-serif text-xl italic text-muted-foreground md:text-2xl">
          Les esprits s'échauffent, les samoyèdes aussi.
        </p>
      </header>

      {/* Section label */}
      <div className="mx-auto mb-6 flex max-w-[1500px] items-center gap-4 px-6 md:px-16">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          La famille du jour · 17 participants
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Grid */}
      <section className="px-6 pb-20 md:px-16">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-6 sm:grid-cols-3 md:gap-7 lg:grid-cols-4 xl:grid-cols-5">
          {PARTICIPANTS.map((p, i) => {
            const isHighlight = highlight === i;
            return (
              <article
                key={`${p.prenom}-${p.nom}`}
                className={[
                  "group relative flex flex-col items-center overflow-hidden rounded-[28px] border border-white/90 bg-white/75 p-5 pb-6 text-center backdrop-blur-md transition-all duration-500",
                  "shadow-[0_10px_36px_-16px_rgba(30,60,90,0.22)] hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-22px_rgba(30,60,90,0.32)]",
                  isHighlight
                    ? "-translate-y-1.5 ring-2 ring-primary/35 shadow-[0_28px_60px_-22px_rgba(30,60,90,0.35)]"
                    : "",
                ].join(" ")}
                style={{ animation: `cardIn 0.8s ease-out ${i * 0.06}s both` }}
              >
                <div className="relative mb-4 aspect-square w-full max-w-[180px]">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[oklch(0.96_0.018_220)] to-[oklch(0.97_0.014_180)]" />
                  <div className="absolute inset-2 rounded-full ring-1 ring-inset ring-white/80" />
                  <img
                    src={p.image}
                    alt={`Samoyède — ${p.activite}`}
                    width={360}
                    height={360}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain p-1 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105"
                    style={{ animation: `bobble ${5 + (i % 4)}s ease-in-out ${i * 0.2}s infinite` }}
                  />
                </div>

                <h3 className="font-serif text-[19px] leading-tight tracking-tight text-foreground md:text-[21px]">
                  {p.prenom}{" "}
                  <span className="font-medium text-foreground">{p.nom}</span>
                </h3>
                <p className="mt-1.5 line-clamp-2 min-h-[2.6em] px-1 text-[13px] leading-snug text-muted-foreground md:text-[14px]">
                  {p.activite}
                </p>

                <div
                  className={[
                    "pointer-events-none absolute inset-x-4 bottom-3 translate-y-3 rounded-xl bg-primary/95 px-3 py-2 text-[12px] font-medium text-primary-foreground opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300",
                    "group-hover:translate-y-0 group-hover:opacity-100",
                    isHighlight ? "translate-y-0 opacity-100" : "",
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
      <footer className="border-t border-white/60 bg-white/50 px-6 py-6 backdrop-blur-md md:px-16">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
          <div className="text-sm text-muted-foreground">
            <span className="text-foreground">Début de l'atelier à 9h</span> · Installez-vous, on démarre bientôt.
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.24em] text-primary">
            Summit Flow{heure ? ` · ${heure}` : ""}
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
