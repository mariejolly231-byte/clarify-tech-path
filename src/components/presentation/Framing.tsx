import { Section } from "./Section";
import outilOrga from "@/assets/outil-organisation.png.asset.json";

const QUESTIONS = [
  {
    n: "01",
    k: "Quel irritant ?",
    body: "Quelle tâche vous coûte concrètement du temps, de l'énergie ou des erreurs aujourd'hui ?",
    ex: "« Je perds 30 min par jour à trier les mails de demande de devis. »",
  },
  {
    n: "02",
    k: "Quelle fréquence ?",
    body: "Combien de fois par semaine cette tâche revient ? Cadre stable ou cas par cas ?",
    ex: "5 à 10 fois par semaine, toujours sur le même format.",
  },
  {
    n: "03",
    k: "Quelles entrées ?",
    body: "Qu'est-ce qui déclenche la tâche ? Quelles données arrivent, sous quel format ?",
    ex: "Un mail entrant avec un nom, un besoin, un budget approximatif.",
  },
  {
    n: "04",
    k: "Quelle sortie attendue ?",
    body: "Quel résultat précis on veut produire ? Pour qui ? Avec quel niveau de qualité ?",
    ex: "Une fiche client en base + un brouillon de réponse à valider.",
  },
  {
    n: "05",
    k: "Quelles données, quels risques ?",
    body: "Sensibilité, RGPD, confidentialité. Qui peut voir quoi, et où ça transite ?",
    ex: "Données client, donc pas d'outil tiers sans cadre. Hébergement UE.",
  },
  {
    n: "06",
    k: "Quelle validation humaine ?",
    body: "Qui relit avant envoi ? À quel moment l'humain reprend la main ? Que se passe-t-il si c'est faux ?",
    ex: "Marie valide chaque brouillon avant qu'il parte au client.",
  },
];

const DECISIONS = [
  { k: "Manuel", desc: "On garde la main. Trop rare, trop artisanal, trop sensible.", tone: "sand" },
  { k: "Assisté par l'IA", desc: "L'IA accélère un brouillon. L'humain valide.", tone: "sage" },
  { k: "Automatisé", desc: "Règles stables, gain net, données encadrées. On industrialise.", tone: "primary" },
  { k: "Pas maintenant", desc: "Le processus est flou ou les données pas cadrées. On clarifie d'abord.", tone: "warn" },
];

const ANALOGIES = [
  {
    icon: "🎒",
    title: "On allège avant d'ajouter",
    body: "On n'ajoute pas du matériel dans le sac avant d'avoir trié ce qu'on transporte déjà.",
  },
  {
    icon: "🛤️",
    title: "On trace avant de bétonner",
    body: "On ne goudronne pas un chemin qu'on n'a jamais parcouru. D'abord le tracé, puis la route.",
  },
  {
    icon: "🌫️",
    title: "Aller vite dans le brouillard",
    body: "Automatiser le chaos, c'est juste aller plus vite — dans la même direction floue.",
  },
];

const toneClass: Record<string, string> = {
  sand: "border-sand bg-sand/40",
  sage: "border-accent bg-accent/40",
  primary: "border-primary/30 bg-primary/[0.04] text-foreground",
  warn: "border-warn/30 bg-warn/5",
};

export function Framing() {
  return (
    <Section
      id="cadrage"
      num="06"
      eyebrow="Le cadrage vient avant tout"
      title={<>La première question n'est pas <span className="text-primary">« quel outil ? »</span></>}
    >
      <div className="mb-12 rounded-2xl border-l-4 border-primary bg-card px-7 py-7 shadow-sm">
        <p className="font-serif text-2xl leading-snug text-foreground md:text-3xl">
          Avant de choisir un outil, on pose le problème.
          <br />
          <span className="text-primary">Avant de poser le problème, on regarde le terrain.</span>
        </p>
        <p className="mt-4 text-base text-muted-foreground">
          IA, no-code, agent : ce sont des moyens. Sans cadrage, ils amplifient
          surtout ce qui ne va déjà pas — en plus rapide, et en plus cher.
        </p>
      </div>

      {/* Infographie : l'outil ne remplace pas l'organisation */}
      <figure className="mb-14 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <img
          src={outilOrga.url}
          alt="L'outil ne remplace pas l'organisation : diagnostic, fondation, levier"
          className="w-full"
        />
        <figcaption className="border-t border-border bg-stone-soft px-6 py-3 text-center text-xs italic text-muted-foreground">
          Bazar + technologie = bazar plus rapide &nbsp;·&nbsp; Processus clair + technologie = temps libéré.
        </figcaption>
      </figure>

      {/* Analogies */}
      <div className="mb-14 grid gap-4 md:grid-cols-3">
        {ANALOGIES.map((a) => (
          <div key={a.title} className="rounded-2xl border border-border bg-stone-soft p-6">
            <div className="text-3xl" aria-hidden>{a.icon}</div>
            <h3 className="mt-3 font-serif text-lg text-foreground">{a.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">{a.body}</p>
          </div>
        ))}
      </div>

      {/* Grille des 6 questions */}
      <div className="mb-12">
        <div className="mb-6 flex items-baseline gap-4">
          <span className="text-[11px] uppercase tracking-[0.2em] text-primary">La grille de cadrage</span>
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">6 questions, dans l'ordre</span>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {QUESTIONS.map((q) => (
            <div key={q.n} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-primary">{q.n}</span>
                <h3 className="font-serif text-xl text-foreground">{q.k}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">{q.body}</p>
              <div className="mt-3 rounded-md bg-stone-soft px-3 py-2 text-xs italic text-foreground/70">
                Ex : {q.ex}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* La décision finale */}
      <div className="rounded-2xl border border-border bg-card p-7">
        <div className="mb-1 text-[11px] uppercase tracking-[0.2em] text-primary">
          La décision finale
        </div>
        <h3 className="font-serif text-2xl text-foreground">
          Et seulement après, on choisit la voie.
        </h3>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {DECISIONS.map((d) => (
            <div key={d.k} className={`rounded-xl border p-5 ${toneClass[d.tone]}`}>
              <div className="font-serif text-lg">{d.k}</div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <blockquote className="mt-12 border-l-4 border-warn bg-card px-7 py-5 font-serif text-xl leading-snug text-foreground md:text-2xl">
        « L'IA ne sauvera pas un processus désorganisé.
        <br />
        <span className="text-warn">Elle en fera juste un désordre plus rapide.</span> »
      </blockquote>
    </Section>
  );
}
