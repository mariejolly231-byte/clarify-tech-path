import { useState } from "react";
import { Section } from "./Section";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  HelpCircle,
  Server,
  Shield,
  FileText,
  CheckSquare,
  Megaphone,
  Globe,
  Building,
  User,
  Lock,
} from "lucide-react";

const REFLEXES = [
  "Toutes les données ne doivent pas partir dans des outils tiers.",
  "Anonymiser quand c'est possible.",
  "Limiter les accès au strict nécessaire.",
  "Séparer le brouillon et l'envoi.",
  "Garder une validation humaine sur les actions sensibles.",
  "Penser RGPD dès le départ — pas après.",
];

const CHECKLIST_ITEMS = [
  "Identifier les données traitées — personnelles ? sensibles ? publiques ?",
  "Choisir le fournisseur adapté au niveau de sensibilité des données",
  "Signer un DPA avec le fournisseur si données personnelles impliquées",
  "Désactiver l'option \"entraînement sur mes données\" dans les interfaces web",
  "Utiliser l'API plutôt que l'interface web pour toutes les données pro",
  "Documenter les traitements dans le registre RGPD du client",
  "Informer les utilisateurs que l'IA est utilisée dans le processus",
  "Prévoir un droit de suppression des données pour les personnes concernées",
  "Ne JAMAIS envoyer de données de santé sans hébergement certifié HDS",
  "Ne JAMAIS envoyer de mots de passe, tokens API ou secrets à un LLM",
];

const SENSITIVITY_CARDS = [
  {
    label: "C0 · Données publiques",
    icon: Globe,
    bg: "bg-go/5",
    border: "border-go/20",
    iconColor: "text-go",
    example: "Infos trouvables sur Google, rapports sectoriels publics",
    reco: "✅ N'importe quel LLM — aucun risque",
  },
  {
    label: "C1 · Données internes non sensibles",
    icon: Building,
    bg: "bg-caution/10",
    border: "border-caution/20",
    iconColor: "text-caution",
    example: "Rapports internes, emails, présentations, procédures",
    reco: "✅ API ChatGPT / Claude avec DPA signé",
  },
  {
    label: "C2 · Données personnelles (RGPD)",
    icon: User,
    bg: "bg-warn/5",
    border: "border-warn/20",
    iconColor: "text-warn",
    example: "Noms, emails, numéros clients, RH",
    reco: "⚠️ API avec DPA + hébergement EU — Google Vertex EU ou Mistral API",
  },
  {
    label: "C3 · Données hautement sensibles",
    icon: Lock,
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    iconColor: "text-destructive",
    example: "Dossiers médicaux, données défense, secrets industriels",
    reco: "🔴 Self-hosting uniquement (Mistral/LLaMA sur serveurs internes) ou API Mistral EU avec accord de confidentialité renforcé",
  },
];

export function Checklist() {
  const [checked, setChecked] = useState<boolean[]>(new Array(10).fill(false));

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const checkAll = () => setChecked(new Array(10).fill(true));

  const allChecked = checked.every(Boolean);

  return (
    <Section
      id="checklist"
      num="15c"
      eyebrow="Partie 3 · Passer à l'action avec méthode"
      title="La check-list du randonneur prudent"
    >
      <div className="rounded-2xl border border-border bg-stone-soft p-7">
        <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-primary">
          Checklist de vigilance
        </div>
        <ul className="grid gap-3 md:grid-cols-2">
          {REFLEXES.map((r, i) => (
            <li key={r} className="flex items-start gap-3 text-sm text-foreground/85">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-card font-mono text-[10px] text-primary">
                {i + 1}
              </span>
              {r}
            </li>
          ))}
        </ul>
      </div>

      <Separator className="my-12" />

      {/* ——— RGPD FAQ ——— */}
      <div className="space-y-14">
        <h3 className="flex items-center gap-2 font-serif text-2xl text-foreground">
          <span aria-hidden>🛡️</span>
          Les questions RGPD que vos clients poseront — et vos réponses
        </h3>

        {/* A — Entraînement */}
        <div id="rgpd-faq">
          <h3 className="mb-3 flex items-center gap-2 font-serif text-xl text-foreground">
            <HelpCircle className="h-5 w-5 text-primary" aria-hidden />
            Est-ce que mes données servent à entraîner le modèle ?
          </h3>
          <p className="mb-6 text-sm text-muted-foreground">
            La question la plus fréquente en entreprise. La réponse dépend de si vous utilisez l'interface web ou l'API.
          </p>

          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Service</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Via l'interface web</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Via l'API</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-medium text-foreground">ChatGPT</td>
                  <td className="px-4 py-3 text-foreground/80">
                    ⚠️ OUI par défaut — désactivable dans Settings → Data Controls → "Improve the model"
                  </td>
                  <td className="px-4 py-3 text-foreground/80">✅ NON — jamais utilisé pour l'entraînement</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-medium text-foreground">Claude</td>
                  <td className="px-4 py-3 text-foreground/80">✅ NON — Anthropic n'utilise pas les conversations</td>
                  <td className="px-4 py-3 text-foreground/80">✅ NON</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-medium text-foreground">Gemini</td>
                  <td className="px-4 py-3 text-foreground/80">
                    ⚠️ OUI par défaut — désactivable dans les paramètres
                  </td>
                  <td className="px-4 py-3 text-foreground/80">✅ NON</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground">Mistral Le Chat</td>
                  <td className="px-4 py-3 text-foreground/80">✅ NON sur la version payante</td>
                  <td className="px-4 py-3 text-foreground/80">✅ NON</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/15 bg-primary/[0.04] p-5">
            <Megaphone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-primary">À dire en formation</div>
              <p className="text-sm leading-relaxed text-foreground/85">
                Pour un usage professionnel avec des données sensibles, utilisez TOUJOURS l'API (via n8n, Make, ou intégration custom). Les données API ne sont jamais utilisées pour l'entraînement chez aucun fournisseur majeur.
              </p>
            </div>
          </div>
        </div>

        {/* B — Localisation */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-serif text-xl text-foreground">
            <Server className="h-5 w-5 text-primary" aria-hidden />
            Où sont stockées mes données ?
          </h3>

          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Fournisseur</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Localisation des serveurs</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Certifications</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">DPA disponible</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-medium text-foreground">OpenAI</td>
                  <td className="px-4 py-3 text-foreground/80">USA (infrastructure Azure)</td>
                  <td className="px-4 py-3 text-foreground/80">SOC 2 Type II</td>
                  <td className="px-4 py-3 text-foreground/80">
                    ✅{" "}
                    <a
                      href="https://openai.com/enterprise-privacy"
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:text-foreground"
                    >
                      openai.com/enterprise-privacy
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-medium text-foreground">Anthropic</td>
                  <td className="px-4 py-3 text-foreground/80">USA (GCP/AWS)</td>
                  <td className="px-4 py-3 text-foreground/80">SOC 2 Type II</td>
                  <td className="px-4 py-3 text-foreground/80">✅ Via plan Team/Enterprise</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-medium text-foreground">Google</td>
                  <td className="px-4 py-3 text-foreground/80">USA + EU au choix via Vertex AI</td>
                  <td className="px-4 py-3 text-foreground/80">ISO 27001, SOC 2, RGPD natif</td>
                  <td className="px-4 py-3 text-foreground/80">✅ Automatique Google Cloud</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground">Mistral</td>
                  <td className="px-4 py-3 text-foreground/80">Europe (Azure EU)</td>
                  <td className="px-4 py-3 text-foreground/80">Hébergement EU, HDS en cours</td>
                  <td className="px-4 py-3 text-foreground/80">
                    ✅{" "}
                    <a
                      href="https://mistral.ai/contact"
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:text-foreground"
                    >
                      mistral.ai/contact
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* C — Secteur réglementé */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-serif text-xl text-foreground">
            <Shield className="h-5 w-5 text-primary" aria-hidden />
            Mon secteur est réglementé — santé, défense, finance. On peut quand même utiliser l'IA ?
          </h3>
          <p className="mb-6 text-sm text-muted-foreground">
            Oui — mais le choix de l'outil dépend du niveau de sensibilité des données. Voici l'arbre de décision à donner à vos clients.
          </p>

          <div className="grid gap-4">
            {SENSITIVITY_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className={`flex flex-col gap-3 rounded-xl border ${card.border} ${card.bg} p-5 md:flex-row md:items-start md:gap-5`}
                >
                  <div className="flex shrink-0 items-center gap-3 md:w-52 md:flex-col md:items-start">
                    <Icon className={`h-5 w-5 ${card.iconColor}`} aria-hidden />
                    <span className="inline-flex items-center rounded-md border border-foreground/10 bg-card px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-foreground">
                      {card.label}
                    </span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-foreground/80">
                      <span className="text-muted-foreground">Exemple :</span> {card.example}
                    </p>
                    <p className="text-sm font-medium text-foreground">{card.reco}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* D — DPA */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-serif text-xl text-foreground">
            <FileText className="h-5 w-5 text-primary" aria-hidden />
            Comment obtenir un DPA ?
          </h3>
          <p className="mb-6 text-sm text-muted-foreground">
            Le DPA (Data Processing Agreement) est le contrat qui fait de votre fournisseur un sous-traitant RGPD légalement encadré.
          </p>

          <ul className="space-y-3 text-sm text-foreground/85">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>
                <span className="font-medium text-foreground">OpenAI</span> → formulaire DPA sur{" "}
                <a
                  href="https://openai.com/enterprise-privacy"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-foreground"
                >
                  openai.com/enterprise-privacy
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>
                <span className="font-medium text-foreground">Anthropic</span> → contacter{" "}
                <a href="mailto:sales@anthropic.com" className="underline hover:text-foreground">
                  sales@anthropic.com
                </a>{" "}
                ou souscrire au plan Team/Enterprise
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>
                <span className="font-medium text-foreground">Google</span> → automatique avec tout abonnement Google Cloud (RGPD inclus dans les conditions générales)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>
                <span className="font-medium text-foreground">Mistral</span> → contacter l'équipe via{" "}
                <a
                  href="https://mistral.ai/contact"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-foreground"
                >
                  mistral.ai/contact
                </a>
              </span>
            </li>
          </ul>
        </div>

        {/* E — Checklist interactive */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-serif text-xl text-foreground">
            <CheckSquare className="h-5 w-5 text-primary" aria-hidden />
            Checklist conformité projet IA — à remettre à vos clients
          </h3>
          <p className="mb-6 text-sm text-muted-foreground">
            À imprimer et à remettre à chaque client en début de projet IA.
          </p>

          <div className="space-y-3 rounded-2xl border border-border bg-stone-soft p-6">
            {CHECKLIST_ITEMS.map((item, i) => (
              <label
                key={item}
                className="flex cursor-pointer items-start gap-3"
              >
                <Checkbox
                  checked={checked[i]}
                  onCheckedChange={() => toggle(i)}
                  className="mt-0.5"
                />
                <span className={`text-sm leading-relaxed ${checked[i] ? "text-foreground/60 line-through" : "text-foreground/85"}`}>
                  {item}
                </span>
              </label>
            ))}
          </div>

          <button
            onClick={checkAll}
            disabled={allChecked}
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span aria-hidden>📋</span>
            Tout cocher
          </button>
          <p className="mt-2 text-xs italic text-muted-foreground">
            Cette checklist ne constitue pas un conseil juridique. Consultez votre DPO pour les cas complexes.
          </p>
        </div>
      </div>

      <Separator className="my-12" />
    </Section>
  );
}
