import { useState } from "react";
import { Section } from "./Section";
import { Button } from "@/components/ui/button";

export function AlreadyNoCode() {
 const [revealed, setRevealed] = useState(false);
 return (
 <Section
 id="deja-no-code"
 num="03"
 eyebrow="Acte 1 · Vous êtes déjà équipés"
 title="Vous avez déjà chaussé les crampons"
 tint="sand"
 >
 <p className="mb-10 text-base italic text-muted-foreground">
 Spoiler : vous en utilisez déjà tous les jours.
 </p>

 <div className="rounded-2xl border border-border bg-card p-8 shadow-sm md:p-10">
 <div className="text-[11px] uppercase tracking-[0.2em] text-primary">Temps 1 — Question</div>
 <h3 className="mt-3 font-serif text-2xl text-foreground md:text-3xl">
 « Qui ici a déjà utilisé un logiciel pour structurer des données —
 un tableau, une liste, un fichier ? »
 </h3>
 <p className="mt-3 text-sm italic text-muted-foreground">
 Animatrice : laissez les mains se lever.
 </p>

 {!revealed && (
 <div className="mt-8 flex justify-center">
 <Button size="lg" onClick={() => setRevealed(true)} className="gap-2">
 <span aria-hidden></span> Révéler la réponse
 </Button>
 </div>
 )}

 {revealed && (
 <div className="mt-8 animate-fade-in space-y-6 border-t border-border pt-8">
 <div className="text-[11px] uppercase tracking-[0.2em] text-primary">Temps 2 — Révélation</div>
 <p className="font-serif text-2xl leading-snug text-foreground md:text-3xl">
 <span className="text-primary">Excel, c'est du no-code.</span> Google Sheets aussi.
 <br />
 Trello, Notion, Airtable — même famille.
 </p>

 <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
 {["Excel", "Google Sheets", "Trello", "Notion", "Airtable", "Canva"].map((t) => (
 <div
 key={t}
 className="rounded-xl border border-accent bg-accent/40 px-4 py-3 text-center font-medium text-foreground"
 >
 {t}
 </div>
 ))}
 </div>

 <blockquote className="border-l-4 border-primary bg-stone-soft/60 px-6 py-5 font-serif text-xl leading-snug text-foreground md:text-2xl">
 Vous n'êtes pas des débutants.
 <br />
 Vous êtes déjà des utilisateurs no-code qui ne le savaient pas encore.
 </blockquote>

 <div className="flex justify-center">
 <div className="inline-flex items-center gap-3 rounded-full border-2 border-primary bg-primary/[0.05] px-6 py-3">
 <span className="text-2xl" aria-hidden></span>
 <span className="font-serif text-lg text-primary">
 Certifié no-codeur sans le savoir
 </span>
 </div>
 </div>
 </div>
 )}
 </div>
 </Section>
 );
}
