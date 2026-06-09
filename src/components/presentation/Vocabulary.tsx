import { useState } from "react";
import { Section } from "./Section";
import { IkeaAnalogy } from "./Infographics";

const TERMS = [
  {
    k: "IA",
    short: "Une famille de modèles qui produisent du texte, des images, du code, des décisions à partir d'exemples.",
    ex: "Demander à ChatGPT de résumer un compte-rendu de réunion.",
  },
  {
    k: "Assistant IA",
    short: "Une IA accessible dans une interface, qui répond à votre demande, sur le moment, à votre rythme.",
    ex: "Reformuler un mail client pour qu'il soit plus clair et plus pro.",
  },
  {
    k: "Workflow",
    short: "Une suite d'étapes qui s'enchaînent automatiquement quand un événement se produit. Règles stables, pas d'improvisation.",
    ex: "Quand un formulaire est rempli, les données vont dans un tableau et un mail de confirmation part.",
  },
  {
    k: "Automatisation",
    short: "Le fait de remplacer une action manuelle répétitive par un mécanisme qui s'exécute seul, à coup sûr.",
    ex: "Chaque facture reçue par mail est renommée et rangée dans le bon dossier.",
  },
  {
    k: "Agent IA",
    short: "Une IA à qui on donne un objectif et des outils. Elle choisit elle-même les étapes — sous votre supervision.",
    ex: "Lire un document long, identifier les points clés, proposer une action à valider.",
  },
  {
    k: "No-code",
    short: "Des plateformes qui permettent d'assembler ces briques (formulaires, bases, IA, mails) sans coder.",
    ex: "Construire un mini outil interne en glissant-déposant des blocs.",
  },
];

export function Vocabulary() {
  const [active, setActive] = useState(0);
  const t = TERMS[active];
  return (
    <Section
      id="tri"
      num="03"
      eyebrow="Le grand tri des mots"
      title={<>On range le vocabulaire <span className="text-primary">avant</span> de ranger les outils.</>}
    >
      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        <div className="flex flex-row flex-wrap gap-2 md:flex-col md:gap-1.5">
          {TERMS.map((term, i) => (
            <button
              key={term.k}
              onClick={() => setActive(i)}
              className={`group rounded-lg border px-4 py-3 text-left text-sm transition ${
                active === i
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <span className={`font-mono text-[10px] ${active === i ? "opacity-80" : "text-muted-foreground"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="font-serif text-base">{term.k}</div>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary">Définition</div>
          <h3 className="mt-2 font-serif text-3xl text-foreground">{t.k}</h3>
          <p className="mt-4 text-base leading-relaxed text-foreground/85">{t.short}</p>

          <div className="mt-6 rounded-xl bg-stone-soft p-5">
            <div className="mb-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Exemple concret
            </div>
            <p className="text-[15px] text-foreground/90">{t.ex}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-primary/20 bg-accent/40 px-6 py-5 text-center text-[15px] text-foreground/90 md:text-base">
        <span className="font-medium text-primary">L'assistant répond.</span>{" "}
        <span className="font-medium text-primary">Le workflow exécute.</span>{" "}
        <span className="font-medium text-primary">L'agent choisit davantage comment avancer.</span>{" "}
        Le no-code permet d'assembler ces briques.
      </div>
    </Section>
  );
}
