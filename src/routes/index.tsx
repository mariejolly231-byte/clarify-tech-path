import { createFileRoute } from "@tanstack/react-router";
import { SideNav } from "@/components/presentation/SideNav";
import { LivePoll } from "@/components/presentation/LivePoll";
import { Opening } from "@/components/presentation/Opening";
import { About } from "@/components/presentation/About";
import { Vocabulary } from "@/components/presentation/Vocabulary";
import { HypeReality } from "@/components/presentation/HypeReality";
import { Decide } from "@/components/presentation/Decide";
import { Quiz } from "@/components/presentation/Quiz";
import { Guardrails } from "@/components/presentation/Guardrails";
import { Takeaway } from "@/components/presentation/Takeaway";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IA, no-code, automatisation — Atelier d'acculturation · Summit Flow" },
      {
        name: "description",
        content:
          "Atelier d'acculturation pour entrepreneurs : comprendre, trier et prioriser les usages de l'IA, du no-code et de l'automatisation avant d'ajouter des outils.",
      },
      {
        property: "og:title",
        content: "IA, no-code, automatisation — Atelier Summit Flow",
      },
      {
        property: "og:description",
        content:
          "Comprendre, trier, prioriser — avant d'ajouter des outils. Une présentation pédagogique pour entrepreneurs.",
      },
    ],
  }),
  component: Presentation,
});

function Presentation() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SideNav />
      <main className="md:pl-72">
        <div className="pt-14 md:pt-0">
          <Opening />
          <About />
          <Vocabulary />
          <HypeReality />
          <Decide />
          <Quiz />
          <Guardrails />
          <Takeaway />
        </div>
      </main>
    </div>
  );
}
