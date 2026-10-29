// Deck interactif : navigation, révélations pas à pas, schémas tracés à l'écran,
// cartes à classer, outil de décision, minuteur, zones à remplir en direct.
(function () {
  const stage = document.querySelector(".stage");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const helpEl = document.getElementById("help");
  const notesEl = document.getElementById("notes-panel");
  const liveEl = document.getElementById("live");
  const total = slides.length;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;
  let typed = "";
  let typedTimer = null;

  const SEQ = [
    ["9h00", "Point de départ"],
    ["9h45", "Trois logiques"],
    ["11h00", "Quand utiliser quoi"],
    ["13h30", "Démonstrations"],
    ["15h15", "Limites et choix"],
    ["16h00", "Garde-fous"],
    ["16h30", "Intersession"],
  ];
  const LOGO = '<svg><use href="#i-logo"/></svg>SUMMIT FLOW';

  function store(key, value) {
    try { if (value === undefined) return localStorage.getItem("sf-j1-" + key); localStorage.setItem("sf-j1-" + key, value); } catch (e) { return null; }
  }

  // Habillage commun construit dans chaque slide (reste visible dans l'export PDF)
  slides.forEach((el, i) => {
    const num = document.createElement("span");
    num.className = "num";
    num.setAttribute("aria-hidden", "true");
    num.textContent = i + 1;
    el.appendChild(num);

    if (el.dataset.section !== undefined) {
      const ch = document.createElement("div");
      ch.className = "chrome";
      ch.innerHTML = (el.classList.contains("slide--cover") ? "" : '<span class="wordmark wordmark--sm">' + LOGO + "</span>") + '<span class="section">' + el.dataset.section + "</span>";
      el.appendChild(ch);
    }

    const seq = parseInt(el.dataset.seq, 10);
    if (seq && !el.classList.contains("slide--full")) {
      const nav = document.createElement("nav");
      nav.className = "toc";
      nav.setAttribute("aria-label", "Sommaire du jour 1");
      nav.innerHTML = '<p class="toc-title">Jour 1</p><ol>' + SEQ.map(([h, t], k) => {
        const state = k + 1 < seq ? "is-done" : k + 1 === seq ? "is-current" : "";
        return '<li class="' + state + '"' + (state === "is-current" ? ' aria-current="step"' : "") + '><span class="t">' + h + "</span>" + t + "</li>";
      }).join("") + "</ol>";
      el.prepend(nav);
    }
    el.querySelectorAll(".rise").forEach((r, k) => r.style.setProperty("--i", r.dataset.i || k));
  });

  // Tracé animé des schémas et illustrations : les traits se dessinent, les aplats apparaissent ensuite
  function draw(slide) {
    if (reduced) return;
    slide.querySelectorAll(".schema svg, svg.illu").forEach((svg) => {
      if (svg.closest(".scene.frag:not(.is-shown)")) return;
      const groups = svg.matches(".illu") ? Array.from(svg.querySelectorAll("[data-d]")) : Array.from(svg.children).filter((c) => c.tagName === "g");
      groups.forEach((g, k) => {
        const delay = (g.dataset.d !== undefined ? parseFloat(g.dataset.d) : k * 0.07) + 0.15;
        const shapes = g.matches("path, line, polyline, circle, ellipse, rect") ? [g] : Array.from(g.querySelectorAll("path, line, polyline, circle, ellipse, rect"));
        shapes.forEach((p) => {
          const stroked = (p.getAttribute("stroke") || getComputedStyle(p).stroke) !== "none" && p.getAttribute("stroke-width") !== "0";
          const filled = (p.getAttribute("fill") || "none") !== "none";
          const dashed = p.getAttribute("stroke-dasharray") || (p.getAttribute("style") || "").includes("dasharray");
          if (stroked && !filled && !dashed && p.getTotalLength) {
            const len = p.getTotalLength();
            p.style.transition = "none";
            p.style.strokeDasharray = len;
            p.style.strokeDashoffset = len;
            p.getBoundingClientRect();
            p.style.transition = "stroke-dashoffset 700ms cubic-bezier(.4,.1,.2,1) " + delay + "s";
            p.style.strokeDashoffset = 0;
          } else {
            p.style.transition = "none";
            p.style.opacity = 0;
            p.getBoundingClientRect();
            p.style.transition = "opacity 500ms ease " + (delay + 0.25) + "s";
            p.style.opacity = 1;
          }
        });
        g.querySelectorAll("text").forEach((t) => {
          t.style.transition = "none"; t.style.opacity = 0; t.getBoundingClientRect();
          t.style.transition = "opacity 400ms ease " + (delay + 0.3) + "s"; t.style.opacity = 1;
        });
      });
    });
  }
  function settle(slide) {
    slide.querySelectorAll(".schema svg *, svg.illu *").forEach((p) => { p.style.transition = ""; p.style.strokeDasharray = ""; p.style.strokeDashoffset = ""; p.style.opacity = ""; });
  }

  // Éléments à révéler, dans l'ordre : data-step regroupe ceux qui apparaissent ensemble (une carte et son dessin)
  function frags(slide) {
    return Array.from(slide.querySelectorAll(".frag"))
      .map((el, i) => ({ el, k: el.dataset.step !== undefined ? parseFloat(el.dataset.step) : 1000 + i }))
      .sort((a, b) => a.k - b.k).map((x) => x.el);
  }
  function stepOf(el) { return el.dataset.step !== undefined ? "s" + el.dataset.step : el; }

  function fit() { stage.style.setProperty("--scale", Math.min(window.innerWidth / 1920, window.innerHeight / 1080)); }

  function render(direction) {
    slides.forEach((el, i) => {
      const active = i === current;
      if (active !== el.classList.contains("is-active")) {
        el.classList.toggle("is-active", active);
        if (active) {
          const f = frags(el);
          f.forEach((x) => x.classList.toggle("is-shown", direction < 0));
          draw(el);
        } else settle(el);
      }
      el.setAttribute("aria-hidden", active ? "false" : "true");
      el.inert = !active;
    });
    const slide = slides[current];
    stage.classList.toggle("on-cover", slide.classList.contains("slide--cover"));
    stage.classList.toggle("on-full", slide.classList.contains("slide--full"));
    stage.classList.toggle("on-hero", slide.classList.contains("slide--hero"));
    stage.classList.toggle("at-summit", current === total - 1);
    stage.style.setProperty("--progress", (total > 1 ? (current / (total - 1)) * 100 : 100) + "%");
    const notes = slide.querySelector(".notes");
    notesEl.innerHTML = '<span class="label">Notes ' + (current + 1) + "</span>" + (notes ? notes.innerHTML : "Pas de note.");
    const title = slide.querySelector("h1, h2, .idea");
    liveEl.textContent = "Slide " + (current + 1) + " sur " + total + (title ? " : " + title.textContent.trim() : "");
    if (location.hash !== "#" + (current + 1)) history.replaceState(null, "", "#" + (current + 1));
  }

  function go(i, direction) { current = Math.max(0, Math.min(total - 1, i)); render(direction || 1); }
  function next() {
    const hidden = frags(slides[current]).filter((x) => !x.classList.contains("is-shown"));
    if (hidden.length) { const s = stepOf(hidden[0]); hidden.filter((x) => stepOf(x) === s).forEach((x) => { x.classList.add("is-shown"); if (x.matches(".scene")) draw(x); }); return; }
    if (current < total - 1) go(current + 1, 1);
  }
  function prev() {
    const shown = frags(slides[current]).filter((x) => x.classList.contains("is-shown"));
    if (shown.length) { const s = stepOf(shown[shown.length - 1]); shown.filter((x) => stepOf(x) === s).forEach((x) => x.classList.remove("is-shown")); return; }
    if (current > 0) go(current - 1, -1);
  }
  function fromHash() { const n = parseInt(location.hash.slice(1), 10); if (!isNaN(n) && n - 1 !== current) go(n - 1, -1); }
  function toggle(el) { el.classList.toggle("is-open"); }

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    const editing = t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName);
    if (editing) { if (e.key === "Escape") t.blur(); return; }
    if (t.tagName === "BUTTON" && (e.key === " " || e.key === "Enter")) return;
    const k = e.key;
    if (helpEl.classList.contains("is-open") && (k === "Escape" || k === "?" || k === "h")) { toggle(helpEl); e.preventDefault(); return; }
    if (/^[0-9]$/.test(k)) { typed += k; clearTimeout(typedTimer); typedTimer = setTimeout(() => { typed = ""; }, 1500); return; }
    if (k === "Enter" && typed) { go(parseInt(typed, 10) - 1, -1); typed = ""; e.preventDefault(); return; }
    switch (k) {
      case "ArrowRight": case "ArrowDown": case "PageDown": case " ": case "Enter": next(); break;
      case "ArrowLeft": case "ArrowUp": case "PageUp": case "Backspace": prev(); break;
      case "Home": go(0, 1); break;
      case "End": go(total - 1, -1); break;
      case "f": case "F": if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen().catch(() => {}); break;
      case "n": case "N": toggle(notesEl); break;
      case "?": case "h": case "H": toggle(helpEl); break;
      case "p": case "P": window.print(); break;
      case "Escape": notesEl.classList.remove("is-open"); if (document.activeElement) document.activeElement.blur(); break;
      default: return;
    }
    e.preventDefault();
  });

  let x0 = null;
  document.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  document.addEventListener("touchend", (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 60) (dx < 0 ? next : prev)(); x0 = null; });

  // Cartes à classer : chaque clic passe à la logique suivante
  const CYCLE = [["", "à classer"], ["assistant", "assistant"], ["automatisation", "automatisation"], ["agent", "agent"], ["outil", "pas d'outil"]];
  document.querySelectorAll(".chip").forEach((c) => {
    const key = "chip-" + c.dataset.k;
    const label = c.querySelector(".verdict");
    function set(v) { const idx = CYCLE.findIndex((x) => x[0] === v); const [val, txt] = CYCLE[idx < 0 ? 0 : idx]; if (val) c.dataset.v = val; else delete c.dataset.v; label.textContent = txt; c.setAttribute("aria-label", c.firstElementChild.textContent + " : " + txt); }
    set(store(key) || "");
    c.addEventListener("click", () => { const idx = CYCLE.findIndex((x) => x[0] === (c.dataset.v || "")); const v = CYCLE[(idx + 1) % CYCLE.length][0]; set(v); store(key, v); });
  });

  // Outil de décision : la grille des quatre questions, réponse en direct
  document.querySelectorAll(".decider").forEach((d) => {
    const qs = Array.from(d.querySelectorAll(".q"));
    const box = d.querySelector(".verdict-box");
    const out = box.querySelector(".out"), why = box.querySelector(".why");
    const ans = {};
    function compute() {
      let res = ["Réponds aux questions", "Une question après l'autre, avec le groupe."], stop = 99;
      if (ans[0] === "non") { res = ["Stop : on vérifie d'abord", "Données personnelles, clients ou confidentielles : on demande à la référente IA avant d'aller plus loin."]; stop = 0; }
      else if (ans[1] === "non") { res = ["Geste manuel, ou assistant au cas par cas", "Une tâche rare ne justifie pas d'outiller."]; stop = 1; }
      else if (ans[1] === "oui" && ans[2] === "non") { res = ["Clarifier la règle d'abord", "On n'automatise pas une règle qui change à chaque fois."]; stop = 2; }
      else if (ans[1] === "oui" && ans[2] === "oui" && ans[3] === "non") { res = ["Automatisation", "Répétitif, stable, sans interprétation : une suite d'actions fixe suffit."]; stop = 3; }
      else if (ans[1] === "oui" && ans[2] === "oui" && ans[3] === "oui") { res = ["Agent, ou assistant + automatisation", "Il faut lire, interpréter ou décider à une étape."]; stop = 3; }
      qs.forEach((q) => { const n = +q.dataset.q; q.classList.toggle("is-off", stop === 0 ? n > 0 : n >= 1 && n <= 3 && n > stop); });
      out.textContent = res[0]; why.textContent = res[1];
      box.className = "verdict-box sk" + (res[0].startsWith("Automatisation") ? " fill-lav" : res[0].startsWith("Agent") ? " fill-mint" : res[0].startsWith("Geste") ? " fill-sky" : res[0].startsWith("Clarifier") || res[0].startsWith("Stop") ? " fill-blush" : "") + (ans[4] === "oui" ? " has-guard" : "");
    }
    qs.forEach((q) => {
      const n = q.dataset.q;
      q.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
        ans[n] = ans[n] === b.value ? undefined : b.value;
        q.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(ans[n] === x.value)));
        compute();
      }));
    });
    const reset = d.querySelector(".reset");
    if (reset) reset.addEventListener("click", () => { Object.keys(ans).forEach((k) => delete ans[k]); d.querySelectorAll(".yn button").forEach((x) => x.setAttribute("aria-pressed", "false")); compute(); });
    compute();
  });

  // Minuteur d'atelier
  document.querySelectorAll(".timer").forEach((tm) => {
    const clock = tm.querySelector(".clock"), fg = tm.querySelector(".fg"), toggleBtn = tm.querySelector(".go");
    const C = 2 * Math.PI * 26;
    let totalS = 0, left = 0, timer = null;
    fg.style.strokeDasharray = C;
    function show() { const m = Math.floor(left / 60), s = left % 60; clock.textContent = m + ":" + String(s).padStart(2, "0"); fg.style.strokeDashoffset = totalS ? C * (1 - left / totalS) : 0; }
    function stop() { clearInterval(timer); timer = null; toggleBtn.textContent = "Lancer"; }
    tm.querySelectorAll(".presets button").forEach((b) => b.addEventListener("click", () => {
      stop(); totalS = left = parseInt(b.value, 10) * 60; tm.classList.remove("is-done");
      tm.querySelectorAll(".presets button").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); show();
    }));
    toggleBtn.addEventListener("click", () => {
      if (timer) { stop(); return; }
      if (!left) return;
      toggleBtn.textContent = "Pause";
      timer = setInterval(() => { left = Math.max(0, left - 1); show(); if (!left) { stop(); tm.classList.add("is-done"); } }, 1000);
    });
    const def = tm.querySelector(".presets button[data-default]") || tm.querySelector(".presets button");
    def.click();
  });

  // Cases à cocher
  document.querySelectorAll(".checks button").forEach((b, i) => {
    const key = "chk-" + (b.dataset.k || i);
    b.setAttribute("aria-pressed", store(key) === "1" ? "true" : "false");
    b.addEventListener("click", () => { const on = b.getAttribute("aria-pressed") !== "true"; b.setAttribute("aria-pressed", String(on)); store(key, on ? "1" : "0"); });
  });

  // Zones à remplir en direct, gardées dans ce navigateur
  document.querySelectorAll("[contenteditable][data-k]").forEach((z) => {
    const v = store("txt-" + z.dataset.k); if (v) z.textContent = v;
    z.addEventListener("input", () => store("txt-" + z.dataset.k, z.textContent));
  });

  window.addEventListener("resize", fit);
  window.addEventListener("hashchange", fromHash);
  window.addEventListener("beforeprint", () => slides.forEach((s) => frags(s).forEach((f) => f.classList.add("is-shown"))));
  fit();
  const start = parseInt(location.hash.slice(1), 10);
  current = isNaN(start) ? 0 : Math.max(0, Math.min(total - 1, start - 1));
  render(-1);
  slides[current].querySelectorAll(".frag").forEach((x) => x.classList.remove("is-shown"));
})();
