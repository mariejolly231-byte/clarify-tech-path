import { Section } from "./Section";
import { RgpdCompass } from "./Infographics";
import rgpdOutilsAsset from "@/assets/outils-no-code-rgpd-v2.png.asset.json";
import llmDonneesAsset from "@/assets/llm-traitement-donnees.png.asset.json";

export function DataClass() {
  return (
  <Section
  id="classer-donnee"
  num="15b"
  eyebrow="Partie 3 · Passer à l'action avec méthode"
  title="Classer sa donnée avant de choisir"
  >
  <RgpdCompass />

  <figure className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
  <img
  src={rgpdOutilsAsset.url}
  alt="Infographie : Outils No-Code et RGPD — trois niveaux de conformité (Conformité Solide, Vigilance Requise, À Auditer) avec hébergement EU, DPA et certifications"
  className="block h-auto w-full"
  loading="lazy"
  />
  <figcaption className="border-t border-border bg-stone-soft px-6 py-3 text-center text-xs italic text-muted-foreground">
  Outils no-code classés par niveau de conformité RGPD : hébergement, DPA et certifications.
  </figcaption>
  </figure>

  <figure className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
  <img
  src={llmDonneesAsset.url}
  alt="Infographie : IA & LLM — où traitent-ils vos données ? Classification C0 à C3 avec souveraineté européenne, usage conditionnel, usage personnel et open source local"
  className="block h-auto w-full"
  loading="lazy"
  />
  <figcaption className="border-t border-border bg-stone-soft px-6 py-3 text-center text-xs italic text-muted-foreground">
  IA & LLM : où atterrissent vos données selon le niveau C0 → C3, et les règles DPA / API à respecter.
  </figcaption>
  </figure>
  </Section>
  );
}
