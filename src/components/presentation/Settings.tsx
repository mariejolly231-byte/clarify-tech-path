import { Section } from "./Section";
import { BookOpen, SlidersHorizontal, Users, Lightbulb } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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
 link: { label: "Démo RAG — NotebookLM Summit Flow", href: "https://notebooklm.google.com/notebook/70814c9c-9f66-45ff-b80c-bb220df20bc6" },
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
 {"link" in s && s.link && (
 <a
 href={s.link.href}
 target="_blank"
 rel="noreferrer"
 className="mt-4 inline-flex items-center gap-2 self-start rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-medium text-primary transition hover:bg-primary/20"
 >
 <span aria-hidden>🔗</span> {s.link.label}
 </a>
 )}
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

      <Separator className="my-12" />

      <Accordion type="single" collapsible>
        <AccordionItem value="technique" className="border-0">
          <AccordionTrigger className="hover:no-underline rounded-2xl border border-primary/20 bg-card px-6 py-5 text-left text-base font-medium">
            <span className="flex items-center gap-2 font-serif text-xl text-foreground">
              <span aria-hidden>🔬</span>
              Et techniquement — comment le modèle apprend ?
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="mt-6 space-y-12">
              <div>
                <h3 className="mb-3 font-serif text-xl text-foreground">L'entraînement : lire pour apprendre à prédire</h3>
                <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  Un LLM n'est pas programmé avec des règles. Il apprend en lisant des milliards de textes et en s'entraînant à prédire le mot suivant — des milliards de fois. C'est tout. Et c'est suffisant pour faire émerger une compréhension apparente du langage.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex flex-col rounded-xl border border-border bg-background p-5">
                    <BookOpen className="mb-3 h-5 w-5 text-primary" />
                    <h4 className="font-serif text-base text-foreground">1. Pré-entraînement</h4>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                      Le modèle lit des milliards de textes (web, livres, code). Pour chaque phrase, certains mots sont masqués. Le modèle doit les deviner. Il se trompe → il ajuste ses paramètres → il réessaie.
                    </p>
                  </div>
                  <div className="flex flex-col rounded-xl border border-border bg-background p-5">
                    <SlidersHorizontal className="mb-3 h-5 w-5 text-primary" />
                    <h4 className="font-serif text-base text-foreground">2. Fine-tuning supervisé</h4>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                      Des humains notent les réponses (bon/mauvais/mieux). Le modèle ajuste ses milliards de paramètres pour produire des réponses jugées meilleures. C'est l'étape RLHF.
                    </p>
                  </div>
                  <div className="flex flex-col rounded-xl border border-border bg-background p-5">
                    <Users className="mb-3 h-5 w-5 text-primary" />
                    <h4 className="font-serif text-base text-foreground">3. RLHF (Reinforcement Learning from Human Feedback)</h4>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                      Des annotateurs humains comparent des paires de réponses. Le modèle apprend à maximiser le score humain — pas seulement la prédiction statistique. C'est ce qui rend les LLMs 'utiles'.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-serif text-xl text-foreground">Les paramètres : les millions de curseurs</h3>
                <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  Un LLM est un réseau de neurones artificiels avec des milliards de paramètres — des valeurs numériques ajustées pendant l'entraînement. GPT-4 : ~1 800 milliards de paramètres estimés. Claude 3 : non divulgué. Mistral 7B : 7 milliards (tient sur un laptop).
                </p>
                <div className="overflow-hidden rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Modèle</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Paramètres estimés</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Ce que ça implique</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3 font-medium text-foreground">Mistral 7B</td>
                        <td className="px-4 py-3 text-foreground/80">7 milliards</td>
                        <td className="px-4 py-3 text-foreground/80">Tourne en local sur un bon laptop</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3 font-medium text-foreground">LLaMA 3 70B</td>
                        <td className="px-4 py-3 text-foreground/80">70 milliards</td>
                        <td className="px-4 py-3 text-foreground/80">GPU professionnel nécessaire</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3 font-medium text-foreground">GPT-4</td>
                        <td className="px-4 py-3 text-foreground/80">~1 800 Mds (estimé)</td>
                        <td className="px-4 py-3 text-foreground/80">Clusters de serveurs Microsoft</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-foreground">Claude 3 Sonnet</td>
                        <td className="px-4 py-3 text-foreground/80">Non divulgué</td>
                        <td className="px-4 py-3 text-foreground/80">Infrastructure Anthropic dédiée</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs italic text-muted-foreground">
                  Plus de paramètres ≠ toujours meilleur. Mistral 7B sur certaines tâches bat des modèles 10x plus grands. L'architecture et l'entraînement comptent autant que la taille.
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-serif text-xl text-foreground">La rétropropagation : apprendre de ses erreurs</h3>
                <div className="mb-6 rounded-xl border border-warn/20 bg-warn/5 p-5">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-warn" />
                    <p className="text-sm leading-relaxed text-foreground/85">
                      Imaginez un étudiant qui révise avec des flash cards. Il voit une question → donne une réponse → voit si c'est juste → corrige légèrement sa compréhension → passe à la suivante. Répété 300 milliards de fois, c'est la rétropropagation.
                    </p>
                  </div>
                </div>
                <div className="space-y-2 rounded-xl border border-border bg-muted/30 p-5 font-mono text-sm text-foreground/85">
                  <p>Étape 1 — Forward pass : le modèle génère une prédiction</p>
                  <p>Étape 2 — Calcul de l'erreur : on mesure l'écart avec la bonne réponse</p>
                  <p>Étape 3 — Backward pass : l'erreur remonte dans le réseau, chaque paramètre est ajusté d'une fraction infinitésimale</p>
                  <p className="text-primary">→ Répété des milliards de fois = le modèle 'apprend'</p>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Ce processus est terminé avant que vous utilisiez le modèle. Quand vous chattez avec Claude ou ChatGPT, le modèle ne s'entraîne plus en temps réel — il prédit uniquement.
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-serif text-xl text-foreground">L'attention : comprendre le sens en contexte</h3>
                <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  La révolution des LLMs modernes vient de l'architecture Transformer (2017, Google — article 'Attention Is All You Need'). Le mécanisme clé : l'attention.
                </p>
                <div className="mb-6 rounded-xl border border-border bg-background p-6">
                  <p className="mb-4 text-center text-base leading-relaxed text-foreground">
                    <span className="text-foreground/60">La</span>{' '}
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 font-medium text-primary">banque</span>{' '}
                    <span className="text-foreground/60">a refusé le prêt parce qu'</span>{' '}
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 font-medium text-primary">elle</span>{' '}
                    <span className="text-foreground/60">était en faillite.</span>
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-primary">
                    <span>elle</span>
                    <span>→</span>
                    <span>banque</span>
                  </div>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    L'attention permet au modèle de savoir à quoi réfère chaque mot dans son contexte — même à 10 000 tokens de distance.
                  </p>
                </div>
                <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-5">
                  <p className="text-sm leading-relaxed text-foreground/85">
                    En résumé : <span className="font-medium text-foreground">Transformer</span> = architecture | <span className="font-medium text-foreground">Attention</span> = mécanisme clé | <span className="font-medium text-foreground">Paramètres</span> = ce qui est ajusté | <span className="font-medium text-foreground">Rétropropagation</span> = comment ils s'ajustent | <span className="font-medium text-foreground">RLHF</span> = pourquoi les réponses sont utiles, pas juste probables
                  </p>
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground">
                📚 Pour aller plus loin :{' '}
                <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noreferrer" className="underline hover:text-foreground">Attention Is All You Need</a> (Vaswani et al., 2017) ·{' '}
                <a href="https://huggingface.co/learn/llm-course/fr/chapter1/4" target="_blank" rel="noreferrer" className="underline hover:text-foreground">Hugging Face LLM Course (fr)</a> ·{' '}
                <a href="https://developers.google.com/machine-learning/crash-course/llm/transformers?hl=fr" target="_blank" rel="noreferrer" className="underline hover:text-foreground">Google ML Crash Course</a>
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
  </Section>
  );
}
