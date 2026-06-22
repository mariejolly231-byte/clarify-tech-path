import { useEffect, useState, useMemo } from "react";
import logoAsset from "@/assets/summit-flow-logo.png.asset.json";

type NavGroup = {
  label: string;
  firstId: string;
  act?: string;
  subtitle?: string;
  ids: string[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Avant le départ",
    firstId: "sondage",
    ids: ["sondage", "ouverture", "qui"],
  },
  {
    act: "Partie 1",
    label: "D'où ça vient — où on en est",
    subtitle: "Le contexte pour comprendre pourquoi maintenant, pas dans 2 ans.",
    firstId: "deja-no-code",
    ids: ["deja-no-code", "histoire", "etat-de-l-art", "hype"],
  },
  {
    act: "Partie 2",
    label: "Comprendre les outils",
    subtitle: "Ce que c'est, comment ça marche, ce que ça ne fait pas.",
    firstId: "tri",
    ids: ["tri", "humain-vs-ia", "reglages", "limites", "outils", "bon-sac"],
  },
  {
    act: "Partie 3",
    label: "Passer à l'action avec méthode",
    subtitle: "Cadrer avant de choisir. Classer avant de brancher.",
    firstId: "cadrage",
    ids: [
      "cadrage",
      "avant",
      "jeu",
      "gardefous",
      "classer-donnee",
      "checklist",
      "suis-je-en-regle",
    ],
  },
  {
    act: "Partie 4",
    label: "On fait",
    subtitle: "Manipulations, démos et atelier sur un vrai problème business.",
    firstId: "raccourci",
    ids: ["raccourci", "mcp", "assembler-sentier", "atelier"],
  },
  {
    label: "Le refuge",
    firstId: "emporter",
    ids: ["emporter"],
  },
];

const ALL_IDS = NAV_GROUPS.flatMap((g) => g.ids);

function findActiveGroup(activeId: string | null): string | null {
  if (!activeId) return null;
  for (const g of NAV_GROUPS) {
    if (g.ids.includes(activeId)) return g.firstId;
  }
  return null;
}

export function SideNav() {
  const [activeSection, setActiveSection] = useState<string | null>(ALL_IDS[0]);
  const [open, setOpen] = useState(false);

  const activeGroup = useMemo(
    () => findActiveGroup(activeSection),
    [activeSection],
  );

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
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
          <img src={logoAsset.url} alt="Summit Flow" className="h-12 w-12 rounded-full" />
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
              className="h-16 w-16 rounded-full ring-1 ring-border"
            />
            <div className="leading-tight">
              <div className="font-serif text-lg text-primary">Summit Flow</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Atelier d'acculturation
              </div>
            </div>
          </a>

          <nav className="mt-10 space-y-1">
            {NAV_GROUPS.map((group, gi) => {
              const isActive = activeGroup === group.firstId;
              return (
                <div key={group.label}>
                  {gi > 0 && (
                    <div className="my-2 h-px w-full bg-border/40" aria-hidden />
                  )}
                  <a
                    href={`#${group.firstId}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-md px-3 py-2.5 transition-colors ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground/80 hover:bg-accent/30 hover:text-foreground"
                    }`}
                  >
                    {group.act && (
                      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {group.act}
                      </span>
                    )}
                    <span className="block font-serif text-[13px]">{group.label}</span>
                    {group.subtitle && (
                      <span className="mt-1 block text-[11px] leading-snug text-muted-foreground">
                        {group.subtitle}
                      </span>
                    )}
                  </a>
                  {group.firstId === "cadrage" && (
                    <a
                      href="#rgpd-faq"
                      className="ml-6 mt-1 block rounded-md px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Questions RGPD fréquentes
                    </a>
                  )}
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
