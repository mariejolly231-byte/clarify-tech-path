import { useEffect, useState } from "react";
import logoAsset from "@/assets/summit-flow-logo.png.asset.json";

type NavEntry = { id?: string; label: string };
type NavGroup = { act?: string; title: string; entries: NavEntry[]; preface?: boolean };

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "Avant le départ",
    preface: true,
    entries: [
      { id: "sondage", label: "Le départ — on se connaît" },
      { id: "ouverture", label: "La carte du jour" },
      { id: "qui", label: "Le guide" },
    ],
  },
  {
    act: "Acte 1",
    title: "Vous êtes déjà équipés",
    entries: [
      { id: "deja-no-code", label: "Vous avez déjà chaussé les crampons" },
      { id: "histoire", label: "30 sentiers tracés" },
      { id: "etat-de-l-art", label: "L'altitude en 2026" },
      { id: "tri", label: "Le lexique du randonneur" },
    ],
  },
  {
    act: "Acte 2",
    title: "Comprendre le terrain",
    entries: [
      { label: "Cerveau et boussole" },
      { id: "reglages", label: "Sous le capot de la boussole" },
      { id: "limites", label: "Les crevasses à éviter" },
      { id: "hype", label: "La météo vs la réalité" },
    ],
  },
  {
    act: "Acte 3",
    title: "Choisir son chemin",
    entries: [
      { id: "outils", label: "La carte des outils" },
      { id: "bon-sac", label: "Le bon sac, pas le plus lourd" },
      { id: "cadrage", label: "Poser la carte avant de partir" },
      { id: "avant", label: "Choisir sa voie" },
    ],
  },
  {
    act: "Acte 4",
    title: "Sécuriser la cordée",
    entries: [
      { id: "gardefous", label: "Les garde-fous du randonneur" },
      { id: "classer-donnee", label: "Classer sa donnée avant de choisir" },
      { id: "checklist", label: "La check-list du randonneur prudent" },
      { id: "suis-je-en-regle", label: "Et moi — suis-je en règle ?" },
    ],
  },
  {
    act: "Acte 5",
    title: "On marche",
    entries: [
      { id: "raccourci", label: "Premier pas — le pense-bête vocal" },
      { id: "refuge", label: "Connecter sa boussole au terrain" },
      { id: "assembler-sentier", label: "Assembler son premier sentier" },
      { id: "atelier", label: "À vous de tracer le sentier" },
    ],
  },
  {
    title: "Le refuge",
    entries: [{ id: "emporter", label: "Ce que vous repartez dans le sac" }],
  },
];

const ALL_IDS = NAV_GROUPS.flatMap((g) =>
  g.entries.map((e) => e.id).filter((id): id is string => Boolean(id)),
);

export function SideNav() {
  const [active, setActive] = useState(ALL_IDS[0]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ALL_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Mobile bar */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between border-b border-border bg-background/85 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center gap-2">
          <img src={logoAsset.url} alt="Summit Flow" className="h-8 w-8 rounded-full" />
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Atelier · Summit Flow
          </span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md border border-border px-3 py-1 text-xs"
        >
          {open ? "Fermer" : "Sommaire"}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-30 h-screen w-72 flex-col justify-between overflow-y-auto border-r border-border bg-stone-soft/60 px-7 py-8 backdrop-blur transition-transform md:flex ${
          open ? "flex translate-x-0" : "hidden md:flex"
        }`}
      >
        <div>
          <a href="#sondage" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img
              src={logoAsset.url}
              alt="Summit Flow"
              className="h-11 w-11 rounded-full ring-1 ring-border"
            />
            <div className="leading-tight">
              <div className="font-serif text-base text-primary">Summit Flow</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Atelier d'acculturation
              </div>
            </div>
          </a>

          <nav className="mt-10 space-y-5">
            {NAV_GROUPS.map((group, gi) => {
              const prev = NAV_GROUPS[gi - 1];
              const showDivider =
                gi > 0 && (group.preface || prev?.preface || group.act || !group.act);
              return (
                <div key={group.title}>
                  {showDivider && (
                    <div className="mb-4 h-px w-full bg-border/70" aria-hidden />
                  )}
                  <div className="mb-2 px-2">
                    {group.act && (
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                        {group.act}
                      </div>
                    )}
                    <div
                      className={
                        group.preface
                          ? "font-serif text-[12px] text-muted-foreground"
                          : "font-serif text-[13px] font-semibold text-foreground"
                      }
                    >
                      {group.title}
                    </div>
                  </div>
                  <ul className="space-y-0.5">
                    {group.entries.map((s) => {
                      const isActive = s.id && active === s.id;
                      if (!s.id) {
                        return (
                          <li key={s.label}>
                            <span
                              className={`block rounded-md px-3 py-1.5 leading-snug ${
                                group.preface ? "text-[12px]" : "text-[13px]"
                              } text-muted-foreground/70`}
                            >
                              {s.label}
                            </span>
                          </li>
                        );
                      }
                      return (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            onClick={() => setOpen(false)}
                            className={`block rounded-md px-3 py-1.5 leading-snug transition-colors ${
                              group.preface ? "text-[12px]" : "text-[13px]"
                            } ${
                              isActive
                                ? "bg-accent text-accent-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {s.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="mt-10 text-[11px] leading-relaxed text-muted-foreground">
          IA · No-code · Automatisation
          <br />
          <span className="text-foreground/70">Comprendre, trier, prioriser.</span>
        </div>
      </aside>
    </>
  );
}
