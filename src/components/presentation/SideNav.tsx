import { useEffect, useState } from "react";
import logoAsset from "@/assets/summit-flow-logo.png.asset.json";

export const SECTIONS = [
  { id: "sondage", label: "Tour de table live", num: "00" },
  { id: "ouverture", label: "Ouverture", num: "01" },
  { id: "qui", label: "Qui je suis", num: "02" },
  { id: "tri", label: "No code, IA, gloubi-boulga, késako ?", num: "03" },
  { id: "deja-no-code", label: "Déjà no-codeur sans le savoir", num: "03·A" },
    { id: "histoire", label: "Un peu d'histoire", num: "03·B" },
  { id: "etat-de-l-art", label: "État de l'art 2026", num: "03·B+" },
  { id: "outils", label: "Carte des outils", num: "03·C" },
  { id: "bon-sac", label: "Le bon sac", num: "03·D" },
  { id: "reglages", label: "Les réglages de l'IA", num: "04" },
  { id: "hype", label: "La hype vs la réalité", num: "05" },
  { id: "limites", label: "Les limites à anticiper", num: "05·B" },
  { id: "cadrage", label: "Le cadrage avant tout", num: "06" },
  { id: "avant", label: "Avant d'automatiser", num: "07" },
  { id: "jeu", label: "Jeu interactif", num: "08" },
  { id: "gardefous", label: "Garde-fous", num: "09" },
  { id: "atelier", label: "Atelier — Votre sentier", num: "09·A" },
  { id: "raccourci", label: "Première automatisation", num: "09·B" },
  { id: "refuge", label: "Bon plan à emporter", num: "09·C" },
  { id: "emporter", label: "Ce que vous emportez", num: "10" },
];

export function SideNav() {
  const [active, setActive] = useState("sondage");
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
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
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
        className={`fixed left-0 top-0 z-30 h-screen w-72 flex-col justify-between border-r border-border bg-stone-soft/60 px-7 py-8 backdrop-blur transition-transform md:flex ${
          open ? "flex translate-x-0" : "hidden md:flex"
        }`}
      >
        <div>
          <a href="#ouverture" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src={logoAsset.url} alt="Summit Flow" className="h-11 w-11 rounded-full ring-1 ring-border" />
            <div className="leading-tight">
              <div className="font-serif text-base text-primary">Summit Flow</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Atelier d'acculturation
              </div>
            </div>
          </a>

          <nav className="mt-10 space-y-1">
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={`group flex items-baseline gap-3 rounded-md px-2 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] ${
                      isActive ? "text-primary" : "text-muted-foreground/70"
                    }`}
                  >
                    {s.num}
                  </span>
                  <span className="leading-snug">{s.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        <div className="text-[11px] leading-relaxed text-muted-foreground">
          IA · No-code · Automatisation
          <br />
          <span className="text-foreground/70">Comprendre, trier, prioriser.</span>
        </div>
      </aside>
    </>
  );
}
