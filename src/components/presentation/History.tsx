import { Section } from "./Section";
import histoireAsset from "@/assets/histoire-no-code-40ans.png.asset.json";
import commentIA from "@/assets/comment-fonctionne-ia.png.asset.json";

export function History() {
 return (
 <Section
 id="histoire"
 num="04"
 eyebrow="Partie 1 · D'où ça vient — où on en est"
 title="40 ans de sentiers tracés"
 >
  <p className="mb-10 text-base italic text-muted-foreground">
 De l'Excel au Vibe Coding : la montée en altitude a pris 40 ans.
 </p>

 <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
 <img
 src={histoireAsset.url}
 alt="Infographie : Du tableur à l'agent IA — 40 ans de no-code, des fondations Excel/Web à l'humain orchestrateur d'agents IA"
 className="block h-auto w-full"
 loading="lazy"
 />
 <figcaption className="border-t border-border bg-stone-soft px-6 py-3 text-center text-xs italic text-muted-foreground">
 40 ans de no-code en six camps — du tableur à l'humain orchestrateur d'agents.
 </figcaption>
 </figure>

 {/* Infographie : Comment fonctionne une IA */}
 <figure className="mt-10 overflow-hidden rounded-xl border border-border bg-background">
 <img
 src={commentIA.url}
 alt="Comment fonctionne une IA : du carburant (données) au modèle, puis au prompt et à la réponse, avec les limites face au cerveau humain"
 className="w-full"
 />
 <figcaption className="border-t border-border bg-stone-soft px-6 py-3 text-center text-xs italic text-muted-foreground">
 Données → Modèle → Prompt &amp; Réponse &nbsp;·&nbsp; L'IA calcule, l'humain pense.
 </figcaption>
 </figure>
 </Section>
 );
}
