import { Section } from "./Section";
import { RgpdCompass } from "./Infographics";
import rgpdOutilsAsset from "@/assets/outils-no-code-rgpd.png.asset.json";

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
  </Section>
  );
}
