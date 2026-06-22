import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Step = 0 | 1 | 2 | 3;

const PROMPT_PREFIX = `Réponds uniquement à la question ci-dessous.
N'utilise aucune information sur moi, mon activité, mon entreprise, Summit Flow ou mes préférences éventuelles.
Raisonne seulement à partir de l'énoncé fourni.
Si le contexte manque, dis-le explicitement et propose plusieurs hypothèses au lieu d'inventer.`;

type Round = {
 n: number;
 question: string;
 human: string[];
 ai: string[];
 morale: string;
};

const ROUNDS: Round[] = [
 {
 n: 1,
 question: "Un client t'écrit seulement : « Pouvez-vous me rappeler ? » Que fais-tu en premier, et pourquoi ?",
 human: [
 "Identifie qui écrit, l'historique, le ton du message",
 "Devine l'urgence selon le contexte relationnel",
 "Choisit le bon canal et le bon moment pour rappeler",
 ],
 ai: [
 "Propose une procédure générique (vérifier, planifier, rappeler)",
 "Liste des bonnes pratiques sans connaître le client",
 "Peut inventer une urgence ou un scénario plausible",
 ],
 morale: "Une IA répond à la question. Un humain lit entre les lignes.",
 },
 {
 n: 2,
 question: "Tu reçois le même besoin de trois personnes différentes, mais formulé de trois façons différentes. Est-ce forcément le même problème ?",
 human: [
 "Compare les contextes, les rôles, les enjeux de chacun",
 "Détecte les non-dits et les vraies intentions",
 "Sait qu'un même mot peut cacher trois besoins distincts",
 ],
 ai: [
 "Tendance à regrouper sous un même problème générique",
 "Donne une réponse cohérente mais uniforme",
 "Peut écraser la nuance pour produire une synthèse propre",
 ],
 morale: "Même mots ≠ même problème. La nuance reste un geste humain.",
 },
 {
 n: 3,
 question: "Tu dois répondre à un prospect qui hésite entre deux offres. Avant de répondre, que prends-tu en compte ?",
 human: [
 "Le profil, le budget, l'historique d'échange",
 "Ce qui n'a pas été dit mais ressenti",
 "L'objectif commercial et la relation à long terme",
 ],
 ai: [
 "Compare les deux offres sur des critères standards",
 "Propose un argumentaire générique et bien structuré",
 "Ne sait pas ce qui compte vraiment pour CE prospect",
 ],
 morale: "L'IA argumente. L'humain choisit ce qui compte vraiment.",
 },
 {
 n: 4,
 question: "Un outil d'IA te propose un plan d'action très convaincant, alors que tu ne lui as donné que deux informations. À quel niveau lui fais-tu confiance, et pourquoi ?",
 human: [
 "Se méfie d'une réponse trop fluide pour si peu d'inputs",
 "Vérifie ce qui a été supposé, ce qui a été inventé",
 "Garde la décision finale, quitte à ralentir",
 ],
 ai: [
 "Comble les trous avec des hypothèses plausibles",
 "Présente le tout avec assurance et structure",
 "Ne signale pas toujours ce qu'elle a deviné",
 ],
 morale: "Une réponse fluide n'est pas une réponse juste. Toujours rouvrir le capot.",
 },
];

function PromptBlock({ question, n }: { question: string; n: number }) {
 const fullText = `${PROMPT_PREFIX}\n\nQuestion :\n${question}`;
 return (
 <div className="rounded-lg border border-dashed border-border bg-stone-soft/60 p-4">
 <div className="mb-2 flex items-center justify-between">
 <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
 Question {n} — à copier-coller dans Perplexity
 </span>
 <button
 onClick={() => {
 navigator.clipboard.writeText(fullText);
 toast.success("Prompt copié");
 }}
 className="rounded-md border border-border bg-background px-2 py-1 text-[11px] hover:bg-accent"
 >
 Copier
 </button>
 </div>
 <pre className="whitespace-pre-wrap text-[11px] leading-relaxed text-foreground/75 font-mono">{fullText}</pre>
 </div>
 );
}

function RoundCard({ round }: { round: Round }) {
 const [step, setStep] = useState<Step>(0);

 const labels: Record<Step, string> = {
 0: "Je réfléchis",
 1: "On interroge l'IA",
 2: "On compare",
 3: "Manche suivante",
 };

 return (
 <div className="rounded-2xl border border-border bg-card p-7 shadow-sm md:p-9 animate-fade-in">
 <div className="mb-5 flex items-baseline gap-3">
 <span className="font-mono text-xs text-primary">Manche {round.n} / 4</span>
 <span className="h-px flex-1 bg-border" />
 </div>

 <p className="font-serif text-2xl leading-snug text-foreground md:text-3xl">
 {round.question}
 </p>

 {step === 0 && (
 <p className="mt-4 text-sm italic text-muted-foreground">
 Prenez 30 secondes. Que feriez-vous ? Pourquoi ?
 </p>
 )}

 {step >= 1 && (
 <div className="mt-8 grid gap-4 md:grid-cols-2">
 <div className="rounded-xl border border-accent bg-accent/40 p-5 animate-fade-in">
 <div className="flex items-baseline gap-2">
 <span className="text-xl" aria-hidden></span>
 <h4 className="font-serif text-lg text-foreground">Ce qu'un humain mobilise</h4>
 </div>
 <ul className="mt-3 space-y-2 text-sm text-foreground/85">
 {round.human.map((h) => (
 <li key={h} className="flex gap-2">
 <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
 <span>{h}</span>
 </li>
 ))}
 </ul>
 </div>

 {step >= 2 && (
 <div className="rounded-xl border border-primary/30 bg-primary/[0.04] p-5 animate-fade-in">
 <div className="flex items-baseline gap-2">
 <span className="text-xl" aria-hidden></span>
 <h4 className="font-serif text-lg text-foreground">Ce que l'IA peut répondre</h4>
 </div>
 <ul className="mt-3 space-y-2 text-sm text-foreground/85">
 {round.ai.map((a) => (
 <li key={a} className="flex gap-2">
 <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
 <span>{a}</span>
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>
 )}

 {step >= 3 && (
 <div className="mt-6 rounded-xl border border-sand bg-sand/40 p-5 animate-fade-in">
 <div className="flex items-baseline gap-2">
 <span className="text-xl" aria-hidden></span>
 <h4 className="font-serif text-lg text-foreground">Ce qu'on compare</h4>
 </div>
 <p className="mt-2 text-sm text-foreground/85">
 Projetez la réponse IA en direct, puis comparez-la à ce qu'un humain aurait mobilisé. Notez ce qui manque, ce qui est inventé, ce qui est juste.
 </p>
 <div className="mt-4">
 <PromptBlock question={round.question} n={round.n} />
 </div>
 </div>
 )}

 <div className="mt-7 flex items-center justify-between gap-4">
 {step < 3 ? (
 <Button
 onClick={() => setStep((s) => (s + 1) as Step)}
 size="lg"
 className="gap-2"
 >
 {step === 0 && " "}
 {step === 1 && " "}
 {step === 2 && " "}
 {labels[step]}
 </Button>
 ) : (
 <blockquote className="flex-1 border-l-4 border-primary pl-4 font-serif text-base italic text-foreground md:text-lg">
 {round.morale}
 </blockquote>
 )}
 </div>
 </div>
 );
}

import { Section } from "./Section";
import { DurationBadge } from "./Badge";

export function HumanVsAI() {
 return (
 <Section
 id="humain-vs-ia"
 num="07"
 eyebrow="Acte 1 · Jeu collectif"
 title="Un pas humain, un pas machine"
 tint="sage"
 >
 <DurationBadge>⏱ 10 min · Jeu collectif</DurationBadge>
 <p className="mx-auto mb-10 max-w-2xl text-center text-sm italic text-muted-foreground md:text-base">
 4 questions, 3 temps : je réfléchis, on interroge l'IA, on compare.
 Le but n'est pas de trouver la bonne réponse, mais de voir ce qui change.
 </p>

 <div className="space-y-8">
 {ROUNDS.map((r) => (
 <RoundCard key={r.n} round={r} />
 ))}
 </div>
 </Section>
 );
}

