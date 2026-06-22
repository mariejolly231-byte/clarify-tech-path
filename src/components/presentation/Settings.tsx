import { Section } from "./Section";

const SETTINGS = [
 {
 k: "Modèle",
  short: "Le « cerveau » que vous choisissez : GPT-4, Claude, Mistral, Gemini… Chacun a sa personnalité, son prix, ses points forts.",
 analogy: "Le moteur d'une voiture. Citadine, berline ou 4×4 — on choisit selon le terrain et le budget.",
 tone: "primary",
 },
 {
 k: "Température",
  short: "Un curseur entre 0 et 1 (ou 2) qui règle la créativité. Bas = sage et prévisible. Haut = surprenant, parfois trop.",
 analogy: "Un curseur entre « réponse de notaire » et « réponse de copywriter ». À régler selon le contexte.",
 tone: "sage",
 },
 {
 k: "Top P",
  short: "Un autre filtre de créativité : l'IA ne pioche que dans les mots les plus probables (par exemple les 90 %).",
 analogy: "Un menu réduit : au lieu de proposer tout le restaurant, on garde les plats les plus vraisemblables.",
 tone: "sage",
 },
 {
 k: "Tokens",
  short: "L'unité de mesure du texte (~ 3 caractères = 1 token). On compte les tokens en entrée et en sortie.",
 analogy: "Le carburant. Chaque réponse consomme du carburant — c'est ce qui détermine la facture.",
 tone: "sand",
 },
 {
 k: "Fenêtre de contexte",
  short: "La quantité de texte que le modèle peut « tenir dans sa tête » en une seule fois (la demande + les pièces jointes + l'historique).",
 analogy: "La taille du bureau. Petit bureau = peu de dossiers ouverts. Grand bureau = un projet entier sous les yeux.",
 tone: "sand",
 },
 {
 k: "Contexte",
  short: "Ce qu'on dépose dans la fenêtre : consignes, exemples, documents, ton de marque, données de référence.",
 analogy: "Le dossier qu'on pose sur le bureau avant de demander un avis. Sans dossier, la réponse est générique.",
 tone: "sand",
 },
 {
 k: "Mémoire",
  short: "Ce que l'outil retient entre les sessions : préférences, faits sur vous, projets en cours.",
 analogy: "Le carnet de bord : à chaque visite, on rouvre la page et on retrouve l'historique.",
 tone: "sage",
 },
 {
 k: "RAG",
  short: "Retrieval-Augmented Generation. L'IA va chercher dans vos documents les bons extraits avant de répondre.",
 analogy: "Un assistant qui va consulter les bons classeurs dans l'armoire avant de vous donner sa réponse.",
 tone: "primary",
 },
 {
 k: "Fine-tuning",
  short: "Ré-entraîner un modèle sur vos propres exemples pour qu'il colle à votre style ou à votre métier.",
 analogy: "Former un nouveau collaborateur à vos méthodes maison — long, coûteux, mais sur-mesure.",
 tone: "primary",
 },
 {
 k: "Coût à l'usage",
  short: "On paie au volume de tokens consommés (entrée + sortie). Un modèle puissant coûte plus cher par requête.",
 analogy: "Comme l'essence : un gros moteur consomme plus. À choisir selon la distance à parcourir.",
 tone: "warn",
 },
];

const toneClass: Record<string, string> = {
 primary: "border-primary/30 bg-primary/[0.04]",
 sage: "border-accent bg-accent/40",
 sand: "border-sand bg-sand/40",
 warn: "border-warn/30 bg-warn/5",
};

export function Settings() {
 return (
 <Section
 id="reglages"
 num="08"
 eyebrow="Partie 2 · Comprendre les outils"
 tint="sage"
 title="Sous le capot de la boussole"
 >
 <p className="mb-10 max-w-3xl text-base text-muted-foreground md:text-lg">
 Pas besoin d'être ingénieur. Juste savoir quels curseurs existent
 pour comprendre ce qu'on règle — et ce qu'on paie.
 </p>

 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
 {SETTINGS.map((s) => (
 <div key={s.k} className={`flex flex-col rounded-2xl border p-6 ${toneClass[s.tone]}`}>
 <div className="flex items-baseline justify-between"> <span className="text-[10px] uppercase tracking-[0.2em] text-primary">Réglage</span>
 </div>
 <h3 className="mt-3 font-serif text-xl text-foreground">{s.k}</h3>
 <p className="mt-2 text-sm leading-relaxed text-foreground/80">{s.short}</p>
 <div className="mt-4 border-t border-foreground/10 pt-3">
 <div className="text-[10px] uppercase tracking-[0.18em] text-primary">Analogie</div>
 <p className="mt-1 text-sm italic leading-relaxed text-foreground/75">{s.analogy}</p>
 </div>
 </div>
 ))}
 </div>

 <div className="mt-12 rounded-2xl border border-border bg-card p-7">
 <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-primary">
 Le curseur Température en une image
 </div>
 <div className="relative h-3 w-full overflow-hidden rounded-full bg-stone-soft">
 <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-accent to-warn/70" />
 </div>
 <div className="mt-2 flex justify-between text-xs text-foreground/70">
 <span><strong className="text-foreground">0</strong> — Sage, factuel, prévisible</span>
 <span>Équilibré</span>
 <span><strong className="text-foreground">1+</strong> — Créatif, surprenant</span>
 </div>
 <p className="mt-4 text-sm text-muted-foreground">
 Pour un mail client : 0.2 à 0.4. Pour un brainstorming de slogans : 0.8 à 1.
 La règle : <span className="text-foreground">on baisse pour les tâches à risque, on monte pour la créativité</span>.
 </p>
 </div>
 </Section>
 );
}
