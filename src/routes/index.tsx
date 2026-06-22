import { createFileRoute } from "@tanstack/react-router";
import { SideNav } from "@/components/presentation/SideNav";
import { LivePoll } from "@/components/presentation/LivePoll";
import { Opening } from "@/components/presentation/Opening";
import { About } from "@/components/presentation/About";
import { AlreadyNoCode } from "@/components/presentation/AlreadyNoCode";
import { History } from "@/components/presentation/History";
import { StateOfArt } from "@/components/presentation/StateOfArt";
import { Vocabulary } from "@/components/presentation/Vocabulary";
import { HumanVsAI } from "@/components/presentation/HumanVsAI";
import { Settings } from "@/components/presentation/Settings";
import { Limits } from "@/components/presentation/Limits";
import { HypeReality } from "@/components/presentation/HypeReality";
import { ToolsMap } from "@/components/presentation/ToolsMap";
import { RightBackpack } from "@/components/presentation/RightBackpack";
import { Framing } from "@/components/presentation/Framing";
import { Decide } from "@/components/presentation/Decide";
import { Quiz } from "@/components/presentation/Quiz";
import { Guardrails } from "@/components/presentation/Guardrails";
import { DataClass } from "@/components/presentation/DataClass";
import { Checklist } from "@/components/presentation/Checklist";
import { SelfCheck } from "@/components/presentation/SelfCheck";
import { FirstAutomation } from "@/components/presentation/FirstAutomation";
import { Mcp } from "@/components/presentation/Mcp";
import { FirstPath } from "@/components/presentation/FirstPath";
import { Workshop } from "@/components/presentation/Workshop";
import { Backpack } from "@/components/presentation/Backpack";
import { Pause } from "@/components/presentation/Pause";
import { NavPager } from "@/components/presentation/NavPager";

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
      <NavPager />
      <main className="md:pl-72">
        <div className="pt-14 md:pt-0">
          {/* Avant le départ */}
          <LivePoll />
          <Opening />
          <About />
          {/* Partie 1 — D'où ça vient, où on en est */}
          <AlreadyNoCode />
          <History />
          <StateOfArt />
          <HypeReality />
          {/* Pause avant le lexique */}
          <Pause minutes={15} />
          {/* Partie 2 — Comprendre les outils */}
          <Vocabulary />
          <HumanVsAI />
          <Settings />
          <Limits />
          <ToolsMap />
          <RightBackpack />

          {/* Partie 3 — Passer à l'action avec méthode */}
          <Framing />
          <Decide />
          <Quiz />
          <Guardrails />
          <DataClass />
          <Checklist />
          <SelfCheck />
          {/* Partie 4 — On fait */}
          <FirstAutomation />
          <Mcp />
          <FirstPath />
          <Workshop />
          {/* Le refuge */}
          <Backpack />
        </div>
      </main>
    </div>
  );
}
