import { useEffect, useState } from "react";

/**
 * Mode présentation : navigation entre sections avec le clavier
 * (← / → / Espace / PageUp / PageDown / Home / End) et un bouton flottant.
 * Les sections sont détectées via `main section[id]`.
 */
export function NavPager() {
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const getSections = (): HTMLElement[] =>
      Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));

    const currentIndex = (sections: HTMLElement[]) => {
      const y = window.scrollY + 120;
      let idx = 0;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= y) idx = i;
      }
      return idx;
    };

    const goTo = (i: number) => {
      const sections = getSections();
      if (!sections.length) return;
      const target = sections[Math.max(0, Math.min(sections.length - 1, i))];
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const onKey = (e: KeyboardEvent) => {
      // Ignorer si l'utilisateur tape dans un input/textarea
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;
      // Ignorer si modifier
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const sections = getSections();
      const cur = currentIndex(sections);

      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        goTo(cur + 1);
        setHint(false);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goTo(cur - 1);
        setHint(false);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(sections.length - 1);
      }
    };

    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => setHint(false), 6000);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, []);

  const move = (dir: -1 | 1) => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]"),
    );
    if (!sections.length) return;
    const y = window.scrollY + 120;
    let cur = 0;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= y) cur = i;
    }
    const target = sections[Math.max(0, Math.min(sections.length - 1, cur + dir))];
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {hint && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 rounded-full border border-border bg-background/90 px-4 py-1.5 text-[11px] text-muted-foreground shadow-sm backdrop-blur md:block">
          Mode présentation · <kbd className="rounded border border-border px-1">←</kbd>{" "}
          <kbd className="rounded border border-border px-1">→</kbd> pour naviguer
        </div>
      )}
      <div className="fixed bottom-5 right-5 z-40 hidden gap-2 md:flex">
        <button
          aria-label="Slide précédente"
          onClick={() => move(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm backdrop-blur transition hover:border-primary/50 hover:text-primary"
        >
          ←
        </button>
        <button
          aria-label="Slide suivante"
          onClick={() => move(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm backdrop-blur transition hover:border-primary/50 hover:text-primary"
        >
          →
        </button>
      </div>
    </>
  );
}
