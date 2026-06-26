import { Section } from "./Section";
import makeScreenshot from "@/assets/make-asso-onboarding.png.asset.json";

const STACK = [
  { name: "Tally", role: "Formulaires (adhésion, paiement)" },
  { name: "Stripe", role: "Paiement & abonnement" },
  { name: "Make", role: "Chef d'orchestre — relie tout" },
  { name: "Notion", role: "Base de données membres & ressources" },
];

const AUTOMATIONS = [
  {
    title: "Confirmation paiement + onboarding",
    body: "Le paiement Stripe déclenche : création de la fiche membre dans Notion, envoi de l'email de bienvenue personnalisé selon le niveau d'adhésion, accès aux ressources.",
  },
  {
    title: "Inscription au registre",
    body: "Chaque nouveau membre est ajouté automatiquement au registre légal de l'association (Notion), avec date d'adhésion, montant, statut.",
  },
  {
    title: "Renouvellement après 1 an",
    body: "Make surveille la date d'adhésion. À J-15 du renouvellement : email automatique avec lien de paiement Stripe pré-rempli. Si pas de renouvellement à J+30 : passage en statut « inactif ».",
  },
];

export function AssoExample() {
  return (
    <Section
      id="exemple-asso"
      num="12b"
      eyebrow="Étude de cas"
      title="Une asso, 4 outils, 3 automatisations"
    >
      <p className="mb-8 max-w-3xl text-base italic text-muted-foreground">
        Un exemple concret avant de passer à la méthode : comment une petite association
        gère ses adhésions sans une ligne de code — juste avec quatre briques no-code bien assemblées.
      </p>

      {/* Stack */}
      <div className="mb-8 rounded-2xl border border-primary/20 bg-card p-6">
        <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-primary">
          La pile no-code
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STACK.map((s) => (
            <div
              key={s.name}
              className="rounded-xl border border-border bg-background p-4"
            >
              <div className="font-serif text-lg text-foreground">{s.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.role}</div>
            </div>
          ))}
        </div>
      </div>


      {/* Les 3 automatisations */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {AUTOMATIONS.map((a, i) => (
          <div
            key={a.title}
            className="rounded-2xl border border-primary/20 bg-card p-5"
          >
            <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-primary">
              Automatisation {String(i + 1).padStart(2, "0")}
            </div>
            <h4 className="font-serif text-lg text-foreground">{a.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
          </div>
        ))}
      </div>

    </Section>
  );
}
