import { useEffect, useRef, useState } from "react";

/**
 * Mode présentation :
 * - Clavier : ← / → / Espace / PageUp / PageDown / Home / End
 * - Boutons flottants ← / →
 * - Mode "clic = slide suivante" activable (touche P ou bouton ▶)
 *   Tout clic sur une zone non-interactive avance d'une slide.
 */
export function NavPager() {
  const [hint, setHint] = useState(true);
  const [clickMode, setClickMode] = useState(false);
  const lastNavAt = useRef(0);

  const getSections = (): HTMLElement[] =>
    Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));

  const currentIndex = (sections: HTMLElement[]) => {
    // Section dont le haut est le plus proche de la zone visible (tolérance 120px)
    const y = window.scrollY;
    const probe = y + 120;
    let idx = 0;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= probe) idx = i;
      else break;
    }
    return idx;
  };

  const goTo = (i: number) => {
    const sections = getSections();
    if (!sections.length) return;
    const clamped = Math.max(0, Math.min(sections.length - 1, i));
    const target = sections[clamped];
    if (!target) return;
    lastNavAt.current = Date.now();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const move = (dir: -1 | 1) => {
    const sections = getSections();
    if (!sections.length) return;
    const cur = currentIndex(sections);
    // Si on défile vers l'avant mais qu'on n'est pas tout à fait au sommet,
    // un "next" doit aller à la section suivante, pas recaler la courante.
    if (dir === 1) {
      const next = sections[cur + 1] ?? sections[cur];
      goTo(sections.indexOf(next));
    } else {
      const curEl = sections[cur];
      const atTop = Math.abs(window.scrollY - curEl.offsetTop) < 8;
      goTo(atTop ? cur - 1 : cur);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const tag = el?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || el?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        move(1);
        setHint(false);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        move(-1);
        setHint(false);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(getSections().length - 1);
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        setClickMode((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => setHint(false), 6000);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, []);

  // Mode "clic = slide suivante"
  useEffect(() => {
    if (!clickMode) return;
    const isInteractive = (el: HTMLElement | null): boolean => {
      let n: HTMLElement | null = el;
      while (n && n !== document.body) {
        const tag = n.tagName;
        if (
          tag === "A" ||
          tag === "BUTTON" ||
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          tag === "LABEL" ||
          tag === "SUMMARY" ||
          tag === "VIDEO" ||
          tag === "AUDIO" ||
          tag === "IFRAME"
        )
          return true;
        if (n.isContentEditable) return true;
        const role = n.getAttribute("role");
        if (
          role &&
          [
            "button",
            "link",
            "checkbox",
            "radio",
            "switch",
            "tab",
            "menuitem",
            "option",
            "slider",
            "textbox",
          ].includes(role)
        )
          return true;
        if (n.dataset && n.dataset.noAdvance === "true") return true;
        n = n.parentElement;
      }
      return false;
    };

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      // Anti-rebond : ignorer si une navigation vient juste d'arriver
      if (Date.now() - lastNavAt.current < 350) return;
      const target = e.target as HTMLElement | null;
      // Ignorer si on a sélectionné du texte
      const sel = window.getSelection();
      if (sel && sel.toString().length > 0) return;
      if (isInteractive(target)) return;
      e.preventDefault();
      move(1);
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [clickMode]);

  return (
    <>
      {hint && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 rounded-full border border-border bg-background/90 px-4 py-1.5 text-[11px] text-muted-foreground shadow-sm backdrop-blur md:block">
          Mode présentation · <kbd className="rounded border border-border px-1">←</kbd>{" "}
          <kbd className="rounded border border-border px-1">→</kbd> ·{" "}
          <kbd className="rounded border border-border px-1">P</kbd> = clic pour avancer
        </div>
      )}
      <div className="fixed bottom-5 right-5 z-40 hidden items-center gap-2 md:flex" data-no-advance="true">
        <button
          aria-label={clickMode ? "Désactiver le clic-pour-avancer" : "Activer le clic-pour-avancer"}
          onClick={() => setClickMode((v) => !v)}
          className={`flex h-10 items-center gap-1.5 rounded-full border px-3 text-[11px] shadow-sm backdrop-blur transition ${
            clickMode
              ? "border-primary/60 bg-primary text-primary-foreground"
              : "border-border bg-background/90 text-foreground hover:border-primary/50 hover:text-primary"
          }`}
        >
          {clickMode ? "● Clic actif" : "▶ Clic"}
        </button>
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
      {clickMode && (
        <div className="pointer-events-none fixed top-4 left-1/2 z-40 hidden -translate-x-1/2 rounded-full border border-primary/60 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary backdrop-blur md:block">
          Clic pour avancer · P pour quitter
        </div>
      )}
    </>
  );
}
