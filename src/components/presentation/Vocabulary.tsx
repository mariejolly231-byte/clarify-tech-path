import { useState } from "react";
import { Section } from "./Section";
import { IkeaAnalogy } from "./Infographics";

const TERMS = [
  {
    k: "IA générative",
    short: "Une famille de modèles capables de produire du texte, des images, du code ou du son à partir d'exemples.",
    analogy: "Un cuisinier qui a goûté des milliers de plats et qui sait improviser une nouvelle recette à la demande.",
    ex: "Demander à ChatGPT de rédiger un brouillon de mail à un client.",
  },
  {
    k: "Assistant IA",
    short: "Une IA accessible dans une interface, qui répond à votre demande sur le moment, à votre rythme.",
    analogy: "Un stagiaire toujours dispo à côté de vous : il répond quand on lui pose une question, il n'agit pas tout seul.",
    ex: "Reformuler un mail client pour qu'il soit plus clair et plus pro.",
  },
  {
    k: "Agent IA",
    short: "Une IA à qui on donne un objectif et des outils. Elle choisit elle-même les étapes — sous votre supervision.",
    analogy: "Un junior outillé dans un 4×4 autonome : on lui donne une destination, il choisit l'itinéraire, vous gardez le volant en cas de pépin.",
    ex: "Lire un document long, identifier les points clés, proposer une action à valider.",
  },
  {
    k: "Automatisation",
    short: "Le fait de remplacer une action manuelle répétitive par un mécanisme qui s'exécute seul, à coup sûr.",
    analogy: "Un train sur des rails : trajet fixe, horaires fixes, aucune improvisation — fiable parce qu'encadré.",
    ex: "Chaque facture reçue par mail est renommée et rangée dans le bon dossier.",
  },
  {
    k: "Workflow",
    short: "Une suite d'étapes qui s'enchaînent automatiquement quand un événement se produit. Règles stables, pas d'improvisation.",
    analogy: "Un plan de circulation : feux, sens uniques, priorités — chaque case sait quoi déclencher.",
    ex: "Quand un formulaire est rempli, les données vont dans un tableau et un mail de confirmation part.",
  },
  {
    k: "No-code",
    short: "Des plateformes qui permettent d'assembler ces briques (formulaires, bases, IA, mails) sans coder.",
    analogy: "Un meuble en kit : les pièces sont prêtes, vous montez selon vos besoins, sans atelier de menuiserie.",
    ex: "Construire un mini outil interne en glissant-déposant des blocs (Airtable, Notion, Make).",
  },
  {
    k: "Low-code",
    short: "Comme le no-code, mais on peut ajouter un peu de code pour les cas que l'outil ne couvre pas.",
    analogy: "Un IKEA hack : on part du kit, on coupe deux planches, on adapte. Compromis entre vitesse et sur-mesure.",
    ex: "Un workflow n8n où l'on glisse un petit script JavaScript pour traiter un cas particulier.",
  },
  {
    k: "API",
    short: "Une « prise » standard qui permet à deux logiciels de se parler et d'échanger des données.",
    analogy: "Le guichet d'une administration : un comptoir, des règles claires, une demande, une réponse.",
    ex: "Votre formulaire envoie une commande à votre logiciel de facturation via son API.",
  },
  {
    k: "Base de données",
    short: "Un espace structuré où les informations sont rangées en lignes et colonnes, prêtes à être interrogées.",
    analogy: "Un classeur d'archives : des dossiers, des onglets, une fiche par client — on retrouve, on filtre, on trie.",
    ex: "Airtable qui contient tous vos clients, leurs commandes et leurs statuts.",
  },
  {
    k: "Prompt",
    short: "L'instruction que vous donnez à l'IA. Plus elle est claire et contextualisée, meilleure est la réponse.",
    analogy: "Le brief que vous donnez à un collaborateur : objectif, contexte, format attendu, contraintes.",
    ex: "« Reformule ce mail pour un client mécontent, ton professionnel, 5 lignes max, signe Marie. »",
  },
  {
    k: "Contexte",
    short: "Tout ce que l'IA a sous les yeux pour répondre : votre demande, les documents joints, l'historique de la conversation.",
    analogy: "Le dossier que vous posez sur le bureau avant de demander un avis. Sans dossier, l'avis est générique.",
    ex: "Coller votre CGV avant de demander un mail de relance — la réponse devient adaptée à votre cas.",
  },
  {
    k: "Mémoire",
    short: "La capacité d'un outil à se souvenir d'éléments d'une session à l'autre (préférences, faits, projets).",
    analogy: "Un carnet de bord : à chaque rendez-vous, l'assistant rouvre le carnet et retrouve l'historique.",
    ex: "ChatGPT qui retient que vous écrivez en tutoiement et que votre marque s'appelle Summit Flow.",
  },
  {
    k: "Hallucination",
    short: "Quand l'IA invente une information avec aplomb. Le ton est sûr, le contenu est faux.",
    analogy: "Un commercial qui répond « oui, oui, on le fait » à tout — sans vérifier le catalogue.",
    ex: "Une IA qui cite un article de loi qui n'existe pas, ou un chiffre client inventé.",
  },
  {
    k: "Vibe coding",
    short: "Construire un outil en décrivant en langage naturel ce qu'on veut, et laisser une IA générer le code.",
    analogy: "Briefer un artisan en quelques phrases plutôt que de dessiner les plans : ça va vite, ça demande de relire ce qui sort.",
    ex: "Demander à Lovable « fais-moi une page de prise de rendez-vous » et itérer en discutant.",
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
      <p className="mb-8 max-w-3xl text-base text-muted-foreground md:text-lg">
        14 mots qu'on entend partout. Pour chacun : une définition simple,
        une analogie concrète et un exemple. Cliquez sur un mot pour le déplier.
      </p>

      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <div className="grid grid-cols-2 gap-1.5 md:grid-cols-1">
          {TERMS.map((term, i) => (
            <button
              key={term.k}
              onClick={() => setActive(i)}
              className={`group rounded-lg border px-3 py-2.5 text-left text-sm transition ${
                active === i
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <span className={`font-mono text-[10px] ${active === i ? "opacity-80" : "text-muted-foreground"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="font-serif text-[15px] leading-tight">{term.k}</div>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary">Définition</div>
          <h3 className="mt-2 font-serif text-3xl text-foreground">{t.k}</h3>
          <p className="mt-4 text-base leading-relaxed text-foreground/85">{t.short}</p>

          <div className="mt-6 rounded-xl border border-accent bg-accent/40 p-5">
            <div className="mb-1 text-[11px] uppercase tracking-[0.2em] text-primary">
              L'analogie
            </div>
            <p className="text-[15px] leading-relaxed text-foreground/90">{t.analogy}</p>
          </div>

          <div className="mt-4 rounded-xl bg-stone-soft p-5">
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

      <IkeaAnalogy />
    </Section>
  );
}
