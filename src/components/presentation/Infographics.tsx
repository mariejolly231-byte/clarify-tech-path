// SVG infographics — style aligned with Summit Flow tokens.
// All colors use CSS variables (var(--color-*)) so they follow the theme.
import ikeaAsset from "@/assets/ikea-analogy.png.asset.json";

/* ---------- 1. Analogie IKEA : No-code / Low-code / Code ---------- */
export function IkeaAnalogy() {
  return (
    <figure className="mt-12 overflow-hidden rounded-2xl border border-border bg-card p-5 md:p-7">
      <figcaption className="mb-5">
        <div className="text-[11px] uppercase tracking-[0.2em] text-primary">
          Une analogie utile
        </div>
        <h3 className="mt-1 font-serif text-2xl text-foreground">
          No-code, low-code, code —{" "}
          <span className="text-primary">trois façons de construire la même solution.</span>
        </h3>
      </figcaption>
      <div className="overflow-hidden rounded-xl bg-stone-soft">
        <img
          src={ikeaAsset.url}
          alt="Infographie : No-code (assembler un kit), Low-code (IKEA hack), Code (artisan), avec un tableau comparatif rapidité, flexibilité, technicité."
          className="block h-auto w-full"
          loading="lazy"
        />
      </div>
      <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
        Même résultat possible — mais l'effort, la flexibilité et le niveau technique
        changent du tout au tout. On choisit selon le besoin, pas selon la mode.
      </p>
    </figure>
  );
}

/* ---------- 2. Courbe d'adoption : temps pour atteindre 100M utilisateurs ---------- */
export function AdoptionCurve() {
  const ITEMS = [
    { name: "Téléphone", years: 75, label: "75 ans" },
    { name: "Mobile", years: 16, label: "16 ans" },
    { name: "Web", years: 7, label: "7 ans" },
    { name: "Facebook", years: 4.5, label: "4 ans 1/2" },
    { name: "Instagram", years: 2.5, label: "2 ans 1/2" },
    { name: "TikTok", years: 0.75, label: "9 mois" },
    { name: "ChatGPT", years: 0.17, label: "2 mois" },
  ];
  const max = 75;

  return (
    <div className="mt-14 rounded-2xl border border-border bg-card p-7">
      <div className="mb-1 text-[11px] uppercase tracking-[0.2em] text-primary">
        Cycle d'adoption
      </div>
      <h3 className="font-serif text-2xl text-foreground">
        Temps pour atteindre <span className="text-primary">100M d'utilisateurs</span>.
      </h3>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Le rythme s'accélère. Ce qui mettait des décennies à se diffuser s'installe désormais en
        quelques semaines — d'où la sensation d'être en retard.
      </p>

      <div className="mt-7 space-y-3">
        {ITEMS.map((it) => {
          const w = Math.max(2, (it.years / max) * 100);
          const isAI = it.name === "ChatGPT";
          return (
            <div key={it.name} className="flex items-center gap-3">
              <div className="w-24 shrink-0 text-xs text-foreground/75 md:w-32 md:text-sm">
                {it.name}
              </div>
              <div className="relative h-6 flex-1 overflow-hidden rounded-md bg-stone-soft">
                <div
                  className={`h-full rounded-md ${
                    isAI ? "bg-warn" : "bg-primary/70"
                  } transition-all`}
                  style={{ width: `${w}%` }}
                />
              </div>
              <div
                className={`w-20 shrink-0 text-right font-mono text-[11px] md:text-xs ${
                  isAI ? "text-warn" : "text-muted-foreground"
                }`}
              >
                {it.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-4 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-4 rounded-sm bg-primary/70" /> Technologies historiques
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-4 rounded-sm bg-warn" /> IA générative
        </span>
      </div>
    </div>
  );
}

/* ---------- 3. Matrice de décision : Fréquence × Sensibilité ---------- */
export function DecisionMatrix() {
  // Cells: row = sensibilité (low->high), col = fréquence (low->high)
  const CELLS = [
    // row 0 = peu sensible
    [
      { label: "Manuel", tone: "sand" },
      { label: "Assister IA", tone: "sage" },
      { label: "Automatiser", tone: "primary" },
      { label: "Automatiser", tone: "primary" },
    ],
    [
      { label: "Manuel", tone: "sand" },
      { label: "Assister IA", tone: "sage" },
      { label: "Automatiser", tone: "primary" },
      { label: "Automatiser", tone: "primary" },
    ],
    [
      { label: "Manuel", tone: "sand" },
      { label: "Assister IA", tone: "sage" },
      { label: "Workflow cadré", tone: "sage" },
      { label: "Workflow cadré", tone: "sage" },
    ],
    // row 3 = très sensible
    [
      { label: "Cadrer d'abord", tone: "warn" },
      { label: "Cadrer d'abord", tone: "warn" },
      { label: "Cadrer d'abord", tone: "warn" },
      { label: "Workflow validé", tone: "sage" },
    ],
  ];

  const toneBg: Record<string, string> = {
    sand: "bg-sand/60",
    sage: "bg-accent/60",
    primary: "bg-primary/15",
    warn: "bg-warn/15",
  };
  const toneText: Record<string, string> = {
    sand: "text-foreground/75",
    sage: "text-foreground",
    primary: "text-primary",
    warn: "text-warn",
  };

  const cols = ["Rare", "Mensuel", "Hebdo", "Quotidien"];
  const rows = ["Public", "Interne", "Client", "Sensible"];

  return (
    <div className="mt-12 rounded-2xl border border-border bg-card p-7">
      <div className="mb-1 text-[11px] uppercase tracking-[0.2em] text-primary">
        Matrice de décision
      </div>
      <h3 className="font-serif text-2xl text-foreground">
        Fréquence × Sensibilité des données.
      </h3>

      <div className="mt-6 grid grid-cols-[auto_1fr] gap-2">
        <div className="flex flex-col justify-between pr-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>↑ Sensible</span>
          <span>Public ↓</span>
        </div>

        <div>
          <div className="grid grid-cols-[80px_1fr]">
            <div />
            <div className="grid grid-cols-4 gap-1.5 pb-2">
              {cols.map((c) => (
                <div
                  key={c}
                  className="text-center text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>

          {CELLS.map((row, ri) => (
            <div key={ri} className="grid grid-cols-[80px_1fr] gap-2 pb-1.5">
              <div className="flex items-center justify-end pr-2 text-[11px] text-foreground/70">
                {rows[ri]}
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {row.map((cell, ci) => (
                  <div
                    key={ci}
                    className={`flex h-14 items-center justify-center rounded-md px-2 text-center text-[11px] font-medium md:text-xs ${
                      toneBg[cell.tone]
                    } ${toneText[cell.tone]}`}
                  >
                    {cell.label}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-2 pl-[80px] text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Fréquence →
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 4. Boussole RGPD : classification des données C0 → C3 ---------- */
export function RgpdCompass() {
  const RINGS = [
    {
      level: "C0",
      label: "Public",
      desc: "Communication, site web, contenus marketing.",
      r: 95,
      fill: "var(--color-accent)",
      text: "var(--color-sage-foreground)",
    },
    {
      level: "C1",
      label: "Interne",
      desc: "Notes, brouillons, données non personnelles.",
      r: 72,
      fill: "var(--color-sand)",
      text: "var(--color-sand-foreground)",
    },
    {
      level: "C2",
      label: "Restreint",
      desc: "Données client, devis, contrats.",
      r: 48,
      fill: "var(--color-caution)",
      text: "var(--color-foreground)",
    },
    {
      level: "C3",
      label: "Sensible",
      desc: "Santé, RH, juridique, identité.",
      r: 26,
      fill: "var(--color-warn)",
      text: "var(--color-warn-foreground)",
    },
  ];

  return (
    <div className="mt-12 grid gap-8 rounded-2xl border border-border bg-card p-7 md:grid-cols-[260px_1fr] md:items-center">
      <div className="mx-auto">
        <svg viewBox="-120 -120 240 240" className="h-56 w-56">
          {RINGS.map((r) => (
            <circle
              key={r.level}
              cx="0"
              cy="0"
              r={r.r}
              fill={r.fill}
              stroke="var(--color-card)"
              strokeWidth="2"
            />
          ))}
          {RINGS.map((r, i) => {
            const prev = i === 0 ? 110 : RINGS[i - 1].r;
            const y = -((prev + r.r) / 2) + 4;
            return (
              <text
                key={r.level}
                x="0"
                y={y}
                textAnchor="middle"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                fill={r.text}
                style={{ letterSpacing: "0.15em" }}
              >
                {r.level}
              </text>
            );
          })}
        </svg>
      </div>

      <div>
        <div className="mb-1 text-[11px] uppercase tracking-[0.2em] text-primary">
          Boussole RGPD
        </div>
        <h3 className="font-serif text-2xl text-foreground">
          Classer la donnée <span className="text-primary">avant</span> de choisir l'outil.
        </h3>
        <ul className="mt-5 space-y-3">
          {RINGS.map((r) => (
            <li key={r.level} className="flex items-start gap-3">
              <span
                className="mt-0.5 inline-flex h-6 w-9 shrink-0 items-center justify-center rounded-md font-mono text-[10px]"
                style={{ background: r.fill, color: r.text }}
              >
                {r.level}
              </span>
              <div className="text-sm">
                <span className="font-medium text-foreground">{r.label}.</span>{" "}
                <span className="text-foreground/75">{r.desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
