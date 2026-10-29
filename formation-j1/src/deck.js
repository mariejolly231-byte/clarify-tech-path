// Navigation du deck : clavier, télécommande, lien direct #n, notes, aide, sommaire latéral du jour.
(function () {
  const stage = document.querySelector(".stage");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const helpEl = document.getElementById("help");
  const notesEl = document.getElementById("notes-panel");
  const liveEl = document.getElementById("live");
  const total = slides.length;
  let current = 0;
  let typed = "";
  let typedTimer = null;

  // Séquences du jour 1, d'après le déroulé de la proposition
  const SEQ = [
    ["9h00", "Point de départ"],
    ["9h45", "Trois logiques"],
    ["11h00", "Quand utiliser quoi"],
    ["13h30", "Démonstrations"],
    ["15h15", "Limites et choix"],
    ["16h00", "Garde-fous"],
    ["16h30", "Intersession"],
  ];

  // Sommaire et numéro construits dans chaque slide : ils restent visibles dans l'export PDF
  slides.forEach((el, i) => {
    const num = document.createElement("span");
    num.className = "num";
    num.setAttribute("aria-hidden", "true");
    num.textContent = i + 1;
    el.appendChild(num);

    const seq = parseInt(el.dataset.seq, 10);
    if (!seq || el.classList.contains("slide--full")) return;
    const nav = document.createElement("nav");
    nav.className = "toc";
    nav.setAttribute("aria-label", "Sommaire du jour 1");
    nav.innerHTML = '<p class="toc-title">Jour 1</p><ol>' + SEQ.map(([h, t], k) => {
      const state = k + 1 < seq ? "is-done" : k + 1 === seq ? "is-current" : "";
      return '<li class="' + state + '"' + (state === "is-current" ? ' aria-current="step"' : "") + '><span class="t">' + h + "</span>" + t + "</li>";
    }).join("") + "</ol>";
    el.prepend(nav);
  });

  function fit() {
    const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.setProperty("--scale", s);
  }

  function render() {
    slides.forEach((el, i) => {
      const active = i === current;
      el.classList.toggle("is-active", active);
      el.setAttribute("aria-hidden", active ? "false" : "true");
      el.inert = !active;
      const count = el.querySelector(".count");
      if (count) count.textContent = (i + 1) + " / " + total;
    });
    const slide = slides[current];
    stage.classList.toggle("on-cover", slide.classList.contains("slide--cover"));
    stage.classList.toggle("on-full", slide.classList.contains("slide--full"));
    stage.classList.toggle("at-summit", current === total - 1);
    const pct = total > 1 ? (current / (total - 1)) * 100 : 100;
    stage.style.setProperty("--progress", pct + "%");

    const notes = slide.querySelector(".notes");
    notesEl.innerHTML = '<span class="label">Notes ' + (current + 1) + "</span>" + (notes ? notes.innerHTML : "Pas de note.");

    const title = slide.querySelector("h1, h2, .idea");
    liveEl.textContent = "Slide " + (current + 1) + " sur " + total + (title ? " : " + title.textContent.trim() : "");
    if (location.hash !== "#" + (current + 1)) history.replaceState(null, "", "#" + (current + 1));
  }

  function go(i) {
    current = Math.max(0, Math.min(total - 1, i));
    render();
  }

  function fromHash() {
    const n = parseInt(location.hash.slice(1), 10);
    if (!isNaN(n)) go(n - 1);
  }

  function toggle(el) { el.classList.toggle("is-open"); }

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key;
    if (helpEl.classList.contains("is-open") && (k === "Escape" || k === "?" || k === "h")) { toggle(helpEl); e.preventDefault(); return; }

    if (/^[0-9]$/.test(k)) {
      typed += k;
      clearTimeout(typedTimer);
      typedTimer = setTimeout(() => { typed = ""; }, 1500);
      return;
    }
    if (k === "Enter" && typed) { go(parseInt(typed, 10) - 1); typed = ""; e.preventDefault(); return; }

    switch (k) {
      case "ArrowRight": case "ArrowDown": case "PageDown": case " ": case "Enter":
        go(current + 1); break;
      case "ArrowLeft": case "ArrowUp": case "PageUp": case "Backspace":
        go(current - 1); break;
      case "Home": go(0); break;
      case "End": go(total - 1); break;
      case "f": case "F":
        if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen();
        break;
      case "n": case "N": toggle(notesEl); break;
      case "?": case "h": case "H": toggle(helpEl); break;
      case "p": case "P": window.print(); break;
      case "Escape": notesEl.classList.remove("is-open"); break;
      default: return;
    }
    e.preventDefault();
  });

  let x0 = null;
  document.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  document.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 60) go(current + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  window.addEventListener("resize", fit);
  window.addEventListener("hashchange", fromHash);
  fit();
  const start = parseInt(location.hash.slice(1), 10);
  go(isNaN(start) ? 0 : start - 1);
})();
