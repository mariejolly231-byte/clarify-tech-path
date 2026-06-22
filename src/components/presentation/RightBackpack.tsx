import { Section } from "./Section";

const TRAPS = [
  { icon: "🎒", title: "Le sac trop lourd", text: "Trop d'outils = fatigue et abandon" },
  { icon: "📦", title: "Le matériel jamais sorti du carton", text: "Acheté, jamais utilisé" },
  { icon: "🔄", title: "Changer de sac à chaque sortie", text: "Aucune maîtrise, tout recommencer" },
];

export function RightBackpack() {
  return (
    <Section
      id="bon-sac"
      num="12"
      eyebrow="Acte 3 · Choisir son chemin"
      title={
        <>
          Le bon sac, pas le sac le <span className="text-primary">plus lourd</span>
        </>
      }
    >
      <p className="mb-10 text-base italic text-muted-foreground">
        Un sac de rando de 15 ans — usé, réparé, fidèle — vaut mieux que cinq sacs neufs
        qu'on ne sait pas charger.
      </p>

      <div className="grid items-center gap-10 lg:grid-cols-[1fr,1.2fr]">
        {/* Visuel sac à dos stylisé */}
        <div className="relative mx-auto w-full max-w-xs">
          <div className="relative aspect-[3/4] rounded-[40%_40%_30%_30%/30%_30%_25%_25%] border-2 border-primary bg-accent/40 p-6">
            {/* Bretelles */}
            <div className="absolute -top-3 left-8 h-10 w-3 rounded-full bg-primary/70" />
            <div className="absolute -top-3 right-8 h-10 w-3 rounded-full bg-primary/70" />
            {/* Poches étiquetées */}
            <div className="flex h-full flex-col justify-around gap-2">
              {["🗂️ Données", "🔌 Automatisations", "🏗️ Apps & sites", "🧠 IA"].map((p) => (
                <div
                  key={p}
                  className="rounded-md border border-primary/40 bg-background/90 px-3 py-2 text-center text-xs font-medium text-foreground"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-center text-xs italic text-muted-foreground">
            Une poche par catégorie. Le sac reste léger.
          </p>
        </div>

        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-foreground/90">
            Vos outils, c'est pareil. <span className="font-medium text-foreground">Deux ou trois bien maîtrisés</span>{" "}
            valent mieux que dix testés une fois et abandonnés.
          </p>

          <div className="grid gap-3">
            {TRAPS.map((t) => (
              <div
                key={t.title}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-4"
              >
                <span className="text-2xl" aria-hidden>{t.icon}</span>
                <div>
                  <div className="font-serif text-base text-foreground">{t.title}</div>
                  <p className="text-sm text-foreground/80">{t.text}</p>
                </div>
              </div>
            ))}
          </div>

          <blockquote className="border-l-4 border-primary bg-stone-soft/60 px-6 py-5 font-serif text-xl leading-snug text-foreground md:text-2xl">
            Choisissez votre <span className="text-primary">trio de base</span>. Maîtrisez-le.
            Puis ajoutez.
          </blockquote>
        </div>
      </div>
    </Section>
  );
}
