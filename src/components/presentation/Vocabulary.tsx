import { Section } from "./Section";
import troisFacons from "@/assets/trois-facons-aide.png.asset.json";
import troisFaconsConstruire from "@/assets/ikea-analogy.png.asset.json";

import commentIAApprend from "@/assets/comment-ia-apprend.png.asset.json";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";



const BRAIN = [
 "Apprend par expérience vécue",
 "Mobilise intuition, émotions, contexte, mémoire personnelle",
 "Sait improviser dans l'ambiguïté",
 "Fonctionne avec fatigue, attention, biais, perception",
];

const AI = [
 "Apprend à partir de données et d'entraînement",
 "Calcule des probabilités de réponse",
 "Repère des motifs à grande vitesse",
 "Ne comprend pas le monde comme un humain, n'a ni vécu ni intention propre",
];

const CARDS = [
 {
 k: "No-code",
  def: "J'assemble des briques déjà prêtes avec une interface visuelle.",
 ex: "Créer un formulaire, une base simple, une mini app ou une page sans développer from scratch.",
 tone: "primary",
 },
 {
 k: "Low-code",
  def: "Je pars d'une base visuelle, mais je peux ajouter du code si besoin.",
 ex: "Personnaliser un outil ou aller plus loin qu'un usage standard.",
 tone: "sage",
 },
 {
 k: "Vibe Coding",
  def: "Je décris ce que je veux en langage naturel, l'IA génère le code à ma place.",
 ex: "Lovable, Cursor, Bolt, v0 : je pilote, je valide, je n'écris pas une ligne.",
 tone: "primary",
 },
 {
 k: "SaaS",
  def: "Un logiciel hébergé dans le cloud, que je paie à l'abonnement et que j'utilise via navigateur.",
 ex: "Notion, Airtable, HubSpot, Make. Pas d'installation, pas de serveur à gérer.",
 tone: "sage",
 },
 {
 k: "Base de données",
  def: "Un endroit structuré où je range mes informations en lignes et colonnes, avec des liens entre elles.",
 ex: "Mes clients dans une table, mes commandes dans une autre, reliées entre elles.",
 tone: "sand",
 demo: { label: "Exemple Notion — Association la Trésorerie Numérique", href: "https://silver-papyrus-4c0.notion.site/Association-la-tr-so-Num-rique-30a44f68064780b4b947ee1f5f037c14" },
 },

 {
 k: "CRM",
  def: "Un outil qui centralise tous mes contacts, prospects, clients et l'historique des échanges.",
 ex: "HubSpot, Brevo, Notion CRM. Je sais où en est chaque relation commerciale.",
 tone: "sand",
 },
 {
 k: "Automatisation",
  def: "Je fais en sorte qu'une suite d'actions se déclenche selon des règles définies.",
 ex: "Quand un formulaire est rempli, créer une tâche et envoyer un email.",
 tone: "sage",
 },
 {
 k: "Workflow",
  def: "L'enchaînement précis d'étapes qui transforme un déclencheur en résultat.",
 ex: "Nouveau lead → vérifier → ajouter au CRM → envoyer email de bienvenue → notifier l'équipe.",
 tone: "sage",
 },
 {
 k: "Webhook",
  def: "Un signal envoyé automatiquement d'un outil à un autre quand un événement se produit.",
 ex: "Stripe envoie un webhook à mon outil dès qu'un paiement réussit.",
 tone: "sand",
 },
 {
 k: "API",
  def: "Je permets à deux outils de se parler directement, sans interface visuelle.",
 ex: "Ton formulaire envoie automatiquement les données vers ta base sans copier-coller.",
 tone: "sand",
 },
 {
 k: "MCP (Model Context Protocol)",
  def: "Je connecte une IA à tes outils réels — elle peut lire tes mails, ton agenda, tes fichiers et agir dessus à ta demande.",
 ex: "Tu demandes à Claude \"résume mes mails non lus\" — il le fait directement, sans copier-coller.",
 tone: "primary",
 duration: "⏱ 15 min · Démo live",
 },
 {
 k: "LLM (Large Language Model)",
  def: "Un modèle d'IA entraîné sur d'énormes quantités de texte qui prédit le mot suivant le plus probable.",
 ex: "GPT-4, Claude, Mistral, Gemini. Le moteur derrière ChatGPT & co.",
 tone: "primary",
 },
 {
 k: "Prompt",
  def: "L'instruction que j'écris à l'IA pour lui dire ce que je veux. Le résultat dépend directement de sa qualité.",
 ex: "« Rédige un email de relance, ton chaleureux, 5 lignes max, pour un client qui n'a pas répondu depuis 10 jours. »",
 tone: "sage",
 },
 {
 k: "Assistant IA",
  def: "Une IA qui répond à mes demandes une par une. Je garde la main, je valide chaque étape.",
 ex: "ChatGPT, Claude. Je demande, il propose, je décide.",
 tone: "primary",
 },
 {
 k: "Agent IA",
  def: "Je donne un objectif, des outils et un cadre. Le système enchaîne plusieurs étapes avec une certaine autonomie.",
 ex: "Analyser une demande, chercher des infos, proposer une action, puis attendre validation.",
 tone: "primary",
 },
 {
 k: "RAG (Retrieval-Augmented Generation)",
  def: "L'IA va chercher dans tes propres documents les bons extraits avant de répondre — plutôt que d'improviser depuis sa mémoire.",
 ex: "Tu lui donnes ta base de connaissances ; elle répond en citant tes vrais contenus, pas des généralités.",
 tone: "primary",
 demo: { label: "Démo RAG — NotebookLM Summit Flow", href: "https://notebooklm.google.com/notebook/70814c9c-9f66-45ff-b80c-bb220df20bc6" },
 },
 {
 k: "Hallucination",
  def: "Quand l'IA invente une réponse avec aplomb — fausse, mais formulée comme si c'était vrai.",
 ex: "Une fausse citation, une référence inventée, un chiffre plausible mais inexact. À toujours vérifier.",
 tone: "warn",
 },
];


const toneClass: Record<string, string> = {
 primary: "border-primary/30 bg-primary/[0.04]",
 sage: "border-accent bg-accent/40",
 sand: "border-sand bg-sand/40",
};

export function Vocabulary() {
 return (
 <Section
 id="tri"
 num="06"
 eyebrow="Partie 2 · Comprendre les outils"
 title="Le lexique du randonneur"
 >
 {/* BLOC 1 — Pause cerveau / IA */}
 <div className="mb-14 rounded-2xl border border-border bg-card p-7 shadow-sm animate-fade-in">
 <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-primary">
 Petite pause
 </div>
 <h3 className="font-serif text-3xl text-foreground md:text-4xl">
 Cerveau humain et IA, <span className="text-primary">même combat ?</span>
 </h3>
 <p className="mt-2 text-base italic text-muted-foreground">
 On peut les comparer… mais ils ne fonctionnent pas de la même manière.
 </p>

 <div className="mt-6 space-y-3 text-[15px] leading-relaxed text-foreground/85">
 <p>
 Quand on parle d'intelligence artificielle, on fait souvent comme si elle pensait « comme nous ».
 </p>
 <p>
 En réalité, le cerveau humain et l'IA peuvent parfois produire des résultats proches,
 mais ils n'utilisent pas les mêmes mécanismes.
 </p>
 <p>
 <span className="text-foreground">Le cerveau humain</span> est vivant, incarné, contextuel, émotionnel, plastique.
 <br />
 <span className="text-foreground">Une IA générative</span>, elle, calcule des probabilités à partir
 de très grandes quantités de données et produit une réponse plausible selon le contexte.
 </p>
 </div>

 <div className="my-8 flex items-center gap-4">
 <span className="h-px flex-1 bg-border" />
 <span className="font-serif text-2xl text-primary md:text-3xl">
 Comparer n'est pas confondre.
 </span>
 <span className="h-px flex-1 bg-border" />
 </div>

 <div className="grid gap-4 md:grid-cols-2">
 <div className="rounded-xl border border-accent bg-accent/40 p-6">
 <div className="flex items-baseline gap-3">
 <span className="text-2xl" aria-hidden></span>
 <h4 className="font-serif text-xl text-foreground">Cerveau humain</h4>
 </div>
 <ul className="mt-4 space-y-2 text-sm text-foreground/85">
 {BRAIN.map((b) => (
 <li key={b} className="flex gap-2">
 <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
 <span>{b}</span>
 </li>
 ))}
 </ul>
 </div>
 <div className="rounded-xl border border-primary/30 bg-primary/[0.04] p-6">
 <div className="flex items-baseline gap-3">
 <span className="text-2xl" aria-hidden></span>
 <h4 className="font-serif text-xl text-foreground">IA générative</h4>
 </div>
 <ul className="mt-4 space-y-2 text-sm text-foreground/85">
 {AI.map((a) => (
 <li key={a} className="flex gap-2">
 <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
 <span>{a}</span>
 </li>
 ))}
 </ul>
 </div>
 </div>

 <p className="mt-6 rounded-md bg-stone-soft px-4 py-3 text-xs italic text-foreground/75">
 Un LLM ne pense pas comme un cerveau humain : il prédit la suite la plus probable dans un contexte donné.
 </p>


 <div className="mt-5 flex justify-center">
 <Dialog>
 <DialogTrigger asChild>
 <Button variant="outline" size="lg" className="gap-2">
 <span aria-hidden></span>
 Et techniquement, comment elle apprend ?
 </Button>
 </DialogTrigger>
 <DialogContent className="max-w-6xl p-0 overflow-hidden">
 <DialogTitle className="sr-only">Comment une IA apprend techniquement</DialogTitle>
 <img
 src={commentIAApprend.url}
 alt="Infographie technique : anatomie du réseau de neurones, propagation avant, ajustement des poids, prédiction et sortie"
 className="w-full h-auto"
 />
 </DialogContent>
 </Dialog>
 </div>
 </div>


 {/* BLOC 2 — Vocabulaire */}

 <div className="mb-10">
 <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-primary">
 On remet de l'ordre
 </div>
 <h3 className="font-serif text-3xl text-foreground md:text-4xl">
 No code, IA, gloubi-boulga : <span className="text-primary">on distingue les rôles.</span>
 </h3>
 <p className="mt-2 text-base italic text-muted-foreground">
 Quand tout se mélange, on clarifie les rôles.
 </p>
 </div>

 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
 {CARDS.map((c) => (
 <div
 key={c.k}
 className={`flex flex-col rounded-2xl border p-6 transition hover:-translate-y-0.5 hover:shadow-sm ${toneClass[c.tone]}`}
 >
 <div className="flex items-baseline justify-between"> <span className="text-[10px] uppercase tracking-[0.2em] text-primary">Rôle</span>
 </div>
 <h4 className="mt-3 font-serif text-2xl text-foreground">{c.k}</h4>
 {"duration" in c && c.duration && (
 <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
 {c.duration}
 </span>
 )}
 <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">
 « {c.def} »
 </p>
 <div className="mt-4 border-t border-foreground/10 pt-3">
 <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
 Exemple
 </div>
 <p className="mt-1 text-sm text-foreground/80">{c.ex}</p>
 </div>
              {c.demo && (
                <a
                  href={c.demo.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 self-start rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-medium text-primary transition hover:bg-primary/20"
                >
                  <span aria-hidden>🔗</span>
                  <span>{c.demo.label}</span>
                </a>
              )}
 </div>
 ))}
 </div>

 {/* Infographie : No-code / Low-code / Code (3 façons de construire) */}
 <figure className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
 <img
 src={troisFaconsConstruire.url}
 alt="Trois façons de construire : No-code, Low-code, Code — du prêt-à-monter au sur-mesure"
 className="w-full"
 />
 <figcaption className="border-t border-border bg-stone-soft px-6 py-3 text-center text-xs italic text-muted-foreground">
 Trois façons de construire — No-code, Low-code, Code.
 </figcaption>
 </figure>

 {/* Infographie : 3 façons d'être aidé (après N/L/C) */}
 <figure className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
 <img
 src={troisFacons.url}
 alt="Trois façons d'être aidé dans son activité : Assistant IA, Automatisation, Agent IA"
 className="w-full"
 />
 <figcaption className="border-t border-border bg-stone-soft px-6 py-3 text-center text-xs italic text-muted-foreground">
 Assistant IA = répond &nbsp;·&nbsp; Automatisation = exécute &nbsp;·&nbsp; Agent IA = organise et agit davantage.
 </figcaption>
 </figure>


 {/* Chute */}
 <blockquote className="mx-auto mt-14 max-w-3xl border-l-4 border-primary bg-card px-7 py-6 text-center font-serif text-2xl leading-snug text-foreground md:text-3xl">
 Le <span className="text-warn">gloubi-boulga</span> commence quand on mélange tous les mots.
 <br />
 La <span className="text-primary">clarté</span> commence quand on distingue les rôles.
 </blockquote>
 </Section>
 );
}
