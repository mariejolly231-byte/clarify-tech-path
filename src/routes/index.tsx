import { createFileRoute } from "@tanstack/react-router";
import { SideNav } from "@/components/presentation/SideNav";
import { LivePoll } from "@/components/presentation/LivePoll";
import { Opening } from "@/components/presentation/Opening";
import { About } from "@/components/presentation/About";
import { Vocabulary } from "@/components/presentation/Vocabulary";
import { Settings } from "@/components/presentation/Settings";
import { HypeReality } from "@/components/presentation/HypeReality";
import { Framing } from "@/components/presentation/Framing";
import { Decide } from "@/components/presentation/Decide";
import { Quiz } from "@/components/presentation/Quiz";
import { Guardrails } from "@/components/presentation/Guardrails";
import { Takeaway } from "@/components/presentation/Takeaway";
import { AlreadyNoCode } from "@/components/presentation/AlreadyNoCode";
import { History } from "@/components/presentation/History";
import { ToolsMap } from "@/components/presentation/ToolsMap";
import { RightBackpack } from "@/components/presentation/RightBackpack";
import { Workshop } from "@/components/presentation/Workshop";
import { FirstAutomation } from "@/components/presentation/FirstAutomation";
import { FreelanceStack } from "@/components/presentation/FreelanceStack";

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
          <LivePoll />
          <Opening />
          <About />
          <Vocabulary />
          <AlreadyNoCode />
          <History />
          <ToolsMap />
          <RightBackpack />
          <Settings />
          <HypeReality />
          <Framing />
          <Decide />
          <Quiz />
          <Guardrails />
          <Workshop />
          <FirstAutomation />
          <FreelanceStack />
          <Takeaway />
        </div>
      </main>
    </div>
  );
}
