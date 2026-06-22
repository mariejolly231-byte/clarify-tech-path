import { useState } from "react";
import { Section } from "./Section";
import logoAsset from "@/assets/summit-flow-logo.png.asset.json";

const PROMPT = `Tu es mon assistant d'organisation.
Je suis [métier].
Je veux gagner du temps sur cette tâche : [tâche].
Contexte : [client / canal / fréquence].
Mon objectif : [résultat attendu].
Contraintes : [ton, délai, confidentialité, outils].

À partir de cela, donne-moi :
1. la version simplifiée du processus actuel,
2. ce qui peut être fait manuellement, assisté par IA, ou automatisé,
3. un modèle prêt à l'emploi pour aujourd'hui,
4. les risques RGPD ou qualité à vérifier avant usage.`;

export function Takeaway() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <Section
      id="emporter"
      num="10"
      eyebrow="Ce que vous emportez"
      tint="sand"
      title={<>Un regard plus clair, et <span className="text-primary">un premier usage utile</span>.</>}
    >
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary">Mini outil</div>
          <h3 className="mt-1 font-serif text-2xl text-foreground md:text-3xl">
            Mon copilote de tâche répétitive
          </h3>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Un prompt à copier-coller dans votre assistant IA préféré. Remplissez les
            crochets avec votre contexte, et lancez la conversation.
          </p>
        </div>
        <button
          onClick={copy}
          className="shrink-0 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
        >
          {copied ? "Copié ✓" : "Copier le prompt"}
        </button>
      </div>

      <pre className="overflow-x-auto rounded-2xl border border-border bg-card p-6 font-mono text-[13px] leading-relaxed text-foreground/90 shadow-sm">
        {PROMPT}
      </pre>

      <div className="mt-10 rounded-2xl border border-primary/20 bg-accent/40 p-7 text-center">
        <p className="mx-auto max-w-2xl font-serif text-xl leading-snug text-foreground md:text-2xl">
          L'objectif de l'atelier n'est pas de tout automatiser aujourd'hui.
          <br />
          <span className="text-primary">
            C'est de repartir avec un regard plus clair, une meilleure méthode, et un premier
            usage utile.
          </span>
        </p>
      </div>

      {/* Encart avis Google */}
      <div className="mt-12 mx-auto max-w-xl rounded-2xl border border-border bg-card p-7 text-center shadow-sm">
        <h3 className="font-serif text-xl text-foreground md:text-2xl">
          Cet atelier vous a été utile ?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Laissez un avis Google — ça prend 30 secondes
          et ça aide Summit Flow à continuer.
        </p>
        <div className="mt-5 flex justify-center">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Fg.page%2Fr%2FCd3n9A6xcSVuEAE%2Freview"
            alt="QR code — Laisser un avis Google Summit Flow"
            className="h-44 w-44 rounded-md border border-border bg-background p-2"
          />
        </div>
        <a
          href="https://g.page/r/Cd3n9A6xcSVuEAE/review"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Laisser un avis <span aria-hidden>→</span>
        </a>
      </div>

      {/* Contact final */}
      <div className="mt-10 mx-auto max-w-xl rounded-2xl border border-primary/20 bg-accent/40 p-7 text-center">
        <img
          src={logoAsset.url}
          alt="Summit Flow"
          className="mx-auto h-14 w-14 rounded-full ring-1 ring-border"
        />
        <div className="mt-3 font-serif text-lg text-foreground">
          Marie Jolly
        </div>
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Fondatrice Summit Flow
        </div>
        <ul className="mx-auto mt-5 grid max-w-sm gap-2 text-sm">
          <li>
            <span className="text-muted-foreground">Email · </span>
            <a href="[LIEN_EMAIL_PLACEHOLDER]" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              [LIEN_EMAIL_PLACEHOLDER]
            </a>
          </li>
          <li>
            <span className="text-muted-foreground">Site · </span>
            <a href="[LIEN_SITE_PLACEHOLDER]" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              [LIEN_SITE_PLACEHOLDER]
            </a>
          </li>
          <li>
            <span className="text-muted-foreground">LinkedIn · </span>
            <a href="[LIEN_LINKEDIN_PLACEHOLDER]" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              [LIEN_LINKEDIN_PLACEHOLDER]
            </a>
          </li>
          <li>
            <span className="text-muted-foreground">Téléphone · </span>
            <a href="[LIEN_TEL_PLACEHOLDER]" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              [LIEN_TEL_PLACEHOLDER]
            </a>
          </li>
        </ul>
      </div>

      <footer className="mt-16 flex flex-col items-center gap-3 border-t border-border pt-10 text-center">
        <img src={logoAsset.url} alt="Summit Flow" className="h-12 w-12 rounded-full ring-1 ring-border" />
        <div className="font-serif text-base text-primary">Summit Flow</div>
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Atelier d'acculturation · Marie Jolly
        </div>
      </footer>
    </Section>
  );
}
