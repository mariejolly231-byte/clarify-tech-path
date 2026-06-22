import { Section } from "./Section";

const DEALS = [
  "ChatGPT Business — 1 siège offert 2 ans pour 1 siège acheté",
  "Airtable — 1 000 $ de crédits offerts",
  "Notion, Brevo, et des centaines d'autres outils",
];

export function FreelanceStack() {
  return (
    <Section
      id="refuge"
      num="09·C"
      eyebrow="Avant de rentrer au refuge"
      title={
        <>
          Un <span className="text-primary">bon plan</span> à emporter
        </>
      }
      tint="sand"
    >
      <p className="mb-10 text-base italic text-muted-foreground">
        Pour aller plus loin sans payer plein tarif.
      </p>

      <div className="mx-auto max-w-3xl rounded-2xl border-2 border-primary/40 bg-primary/[0.06] p-8 shadow-sm md:p-10">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl" aria-hidden>💡</span>
          <h3 className="font-serif text-2xl text-foreground md:text-3xl">
            <span className="text-primary">Freelance Stack</span>
          </h3>
        </div>
        <p className="mt-5 text-[15px] leading-relaxed text-foreground/90">
          Plateforme française qui négocie des réductions exclusives sur{" "}
          <span className="font-medium">800+ logiciels</span> pour indépendants et
          entrepreneurs.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">
          Abonnement : <span className="font-medium">55 €/an</span> — souvent rentabilisé
          avec un seul deal.
        </p>

        <div className="mt-6 rounded-xl border border-border bg-background/70 p-5">
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary">
            Deals actifs en ce moment
          </div>
          <ul className="mt-3 space-y-2">
            {DEALS.map((d) => (
              <li key={d} className="flex gap-3 text-sm text-foreground/90">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-[15px] leading-relaxed text-foreground/90">
          → Je vous partage <span className="font-medium">mon lien</span> en fin d'atelier.
        </p>
        <p className="mt-2 text-sm italic text-muted-foreground">
          Si vous vous inscrivez via ce lien, même tarif pour vous,
          et un petit merci pour moi sans surcoût.
        </p>
      </div>
    </Section>
  );
}
