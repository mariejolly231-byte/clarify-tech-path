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

      <Separator className="my-12" />

    </Section>
  );
}
