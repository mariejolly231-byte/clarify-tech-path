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

function Pause() {
  return (
    <div
      aria-hidden
      className="border-b border-border/60 bg-stone-soft/40 px-6 py-10 md:px-16"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-4 text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        <span className="font-mono text-[11px] uppercase tracking-[0.24em]">
          Pause · 15 minutes
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}

function Presentation() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SideNav />
      <main className="md:pl-72">
        <div className="pt-14 md:pt-0">
          {/* Avant le départ */}
          <LivePoll />
          <Opening />
          <About />
          {/* Acte 1 — Vous êtes déjà équipés */}
          <AlreadyNoCode />
          <History />
          <StateOfArt />
          <Vocabulary />
          {/* Jeu 1 (hors sommaire) */}
          <HumanVsAI />
          {/* Acte 2 — Comprendre le terrain */}
          <Settings />
          <Limits />
          <HypeReality />
          {/* Pause (hors sommaire) */}
          <Pause />
          {/* Acte 3 — Choisir son chemin */}
          <ToolsMap />
          <RightBackpack />
          <Framing />
          <Decide />
          {/* Jeu 2 (hors sommaire) */}
          <Quiz />
          {/* Acte 4 — Sécuriser la cordée */}
          <Guardrails />
          <DataClass />
          <Checklist />
          <SelfCheck />
          {/* Acte 5 — On marche */}
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
