import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/summit-flow-logo.png.asset.json";
const logo = logoAsset.url;

export const Route = createFileRoute("/registre")({
  head: () => ({
    meta: [
      { title: "Traitement de vos données — Summit Flow" },
      {
        name: "description",
        content:
          "Registre de traitement des données pour l'atelier Summit Flow × BGE Sud-Ouest.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RegistrePage,
});

function RegistrePage() {
  return (
    <div className="min-h-screen bg-sand/40 px-4 py-10 md:py-16">
      <div className="mx-auto max-w-2xl">
        <header className="mb-10 flex items-center gap-3">
          <img
            src={logo}
            alt="Summit Flow"
            className="h-12 w-12 rounded-md"
          />
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              Summit Flow
            </div>
            <div className="text-sm text-muted-foreground">
              Atelier BGE Sud-Ouest
            </div>
          </div>
        </header>

        <h1 className="font-serif text-3xl text-foreground md:text-4xl">
          Traitement de vos données personnelles
        </h1>
        <p className="mt-2 text-muted-foreground">
          Atelier Summit Flow — BGE Sud-Ouest
        </p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-foreground/85">
          <Block title="Responsable du traitement">
            <p>Marie Jolly — Summit Flow</p>
            <p>
              Email :{" "}
              <span className="font-mono text-sm text-primary">
                [EMAIL_PLACEHOLDER]
              </span>
            </p>
            <p>
              Site :{" "}
              <a
                href="https://www.summitflow.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-2 hover:underline"
              >
                https://www.summitflow.fr
              </a>
            </p>
          </Block>

          <Block title="Données collectées">
            <ul className="list-disc space-y-1 pl-5">
              <li>Prénom et nom</li>
              <li>Activité professionnelle</li>
              <li>Réponses au sondage (niveau, outils, objectifs)</li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Catégorie : C2 — données restreintes, non sensibles.
            </p>
          </Block>

          <Block title="Pourquoi ces données ?">
            <p>
              Adapter le contenu de l'atelier à votre réalité. Aucun usage
              commercial. Aucune transmission à des tiers.
            </p>
          </Block>

          <Block title="Qui y accède ?">
            <p>Uniquement Marie Jolly — Summit Flow.</p>
            <p>Hébergement : Lovable (infrastructure européenne).</p>
          </Block>

          <Block title="Combien de temps ?">
            <p>Durée de l'atelier + suppression sous 30 jours.</p>
          </Block>

          <Block title="Vos droits">
            <p>Accès · Rectification · Suppression · Opposition</p>
            <p className="mt-2">
              Contact :{" "}
              <span className="font-mono text-sm text-primary">
                [EMAIL_PLACEHOLDER]
              </span>
            </p>
            <p>Objet du mail : « Droits RGPD — Atelier BGE juin 2025 »</p>
            <p>Réponse sous 30 jours.</p>
            <p className="mt-3">
              Réclamation possible auprès de la CNIL :{" "}
              <a
                href="https://www.cnil.fr/fr/plaintes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-2 hover:underline"
              >
                https://www.cnil.fr/fr/plaintes
              </a>
            </p>
          </Block>

          <Block title="Base légale">
            <p>Consentement explicite (article 6.1.a du RGPD)</p>
          </Block>

          <p className="text-sm text-muted-foreground">
            Dernière mise à jour :{" "}
            <span className="font-mono">[DATE_PLACEHOLDER]</span>
          </p>
        </div>

        <footer className="mt-12 border-t border-border pt-6">
          <a
            href="/sondage"
            className="text-sm text-primary underline-offset-2 hover:underline"
          >
            ← Retour au sondage
          </a>
        </footer>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-xl text-foreground">{title}</h2>
      <div className="mt-3 space-y-1">{children}</div>
    </section>
  );
}
