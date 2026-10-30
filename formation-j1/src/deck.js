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

  // Entrée en cascade : les blocs de la slide arrivent l'un après l'autre (les éléments .frag et .rise gardent leur propre rythme)
  const SKIP = ".toc, .chrome, .num, .notes, .eyebrow, h1, h2, .frag, .rise, .art, .brand-logo, script";
  function stagger(slide) {
    if (reduced) return;
    const items = [];
    Array.from(slide.children).forEach((c) => {
      if (c.matches(SKIP)) return;
      const kids = Array.from(c.children).filter((k) => !k.matches(SKIP));
      if (kids.length > 1 && /grid|flex/.test(getComputedStyle(c).display)) items.push(...kids); else items.push(c);
    });
    items.forEach((x, k) => { x.classList.remove("auto-in"); void x.offsetWidth; x.style.setProperty("--i", k); x.classList.add("auto-in"); });
  }
  // Chiffres des encadrés sourcés : ils défilent jusqu'à leur valeur quand ils apparaissent
  document.querySelectorAll(".tip p:first-of-type").forEach((p) => {
    const w = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      const m = n.nodeValue.match(/\d+/);
      if (!m) continue;
      const span = document.createElement("span");
      span.className = "count"; span.dataset.to = m[0]; span.textContent = m[0];
      const rest = n.splitText(m.index); rest.nodeValue = rest.nodeValue.slice(m[0].length);
      n.parentNode.insertBefore(span, rest);
      break;
    }
  });
  function counters(root) {
    if (reduced) return;
    root.querySelectorAll(".count").forEach((c) => {
      const f = c.closest(".frag");
      if ((f && !f.classList.contains("is-shown")) || c.dataset.run === "1") return;
      c.dataset.run = "1";
      const to = parseInt(c.dataset.to, 10), t0 = performance.now(), dur = 1100;
      (function tick(t) { const k = Math.min(1, (t - t0) / dur); c.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); })(t0);
    });
  }

  function render(direction) {
    slides.forEach((el, i) => el.style.setProperty("--off", (i < current ? -1 : 1) * 70 + "px"));
    slides.forEach((el, i) => {
      const active = i === current;
      if (active !== el.classList.contains("is-active")) {
        el.classList.toggle("is-active", active);
        if (active) {
          const f = frags(el);
          f.forEach((x) => x.classList.toggle("is-shown", direction < 0));
          draw(el);
          stagger(el);
          el.querySelectorAll(".count").forEach((c) => { c.dataset.run = ""; });
          counters(el);
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
    document.dispatchEvent(new CustomEvent("deck:slide", { detail: current }));
  }

  function go(i, direction) { current = Math.max(0, Math.min(total - 1, i)); render(direction || 1); }
  function next() {
    const hidden = frags(slides[current]).filter((x) => !x.classList.contains("is-shown"));
    if (hidden.length) { const s = stepOf(hidden[0]); hidden.filter((x) => stepOf(x) === s).forEach((x) => { x.classList.add("is-shown"); if (x.matches(".scene")) draw(x); }); counters(slides[current]); return; }
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
      case "f": case "F": document.dispatchEvent(new Event("deck:full")); break;
      case "n": case "N": toggle(notesEl); break;
      case "?": case "h": case "H": toggle(helpEl); break;
      case "p": case "P": document.dispatchEvent(new Event("deck:pdf")); break;
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

// Outils de l'animatrice : plein écran, export PDF, stylo, surligneur, gomme, pointeur, projecteur.
// Les dessins sont gardés par slide, dans ce navigateur uniquement.
(function () {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const tb = document.getElementById("toolbar");
  const cv = document.getElementById("ink");
  const ctx = cv.getContext("2d");
  const laser = document.getElementById("laser");
  const spot = document.getElementById("spot");
  const toastEl = document.getElementById("toast");
  const PEN = { teal: "#0B4F5C", ink: "#2A2F33", violet: "#6E5BA8", rose: "#C25A7C" };
  const MARK = { teal: "#8FD3BC", ink: "#C3CBCD", violet: "#CDBFEB", rose: "#F5B7C6" };
  let tool = null, color = "teal", cur = 0, stroke = null, idleTimer = null, toastTimer = null;
  let ink = {};
  try { ink = JSON.parse(localStorage.getItem("sf-j1-ink") || "{}") || {}; } catch (e) { ink = {}; }
  function save() { try { localStorage.setItem("sf-j1-ink", JSON.stringify(ink)); } catch (e) { /* stockage indisponible : les dessins restent le temps de la séance */ } }

  function toast(msg, ms) {
    toastEl.textContent = msg; toastEl.classList.add("is-open");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove("is-open"), ms || 3200);
  }

  // Plein écran : bloqué quand le deck est affiché dans une page qui ne l'autorise pas
  function full() {
    const d = document, el = d.documentElement;
    if (d.fullscreenElement) { d.exitFullscreen(); return; }
    if (!el.requestFullscreen) { toast("Plein écran indisponible ici : utilise F11 ou ouvre le fichier dans ton navigateur."); return; }
    el.requestFullscreen().catch(() => toast("Plein écran bloqué ici : ouvre le fichier dans ton navigateur, ou utilise F11."));
  }
  function pdf() {
    setTool(null);
    toast("Dans la fenêtre qui s'ouvre : « Enregistrer au format PDF », marges aucune, arrière-plans cochés.", 5000);
    setTimeout(() => window.print(), 700);
  }
  document.addEventListener("deck:full", full);
  document.addEventListener("deck:pdf", pdf);

  // Dessin, en coordonnées de la scène 1920 x 1080 : le trait suit la mise à l'échelle
  function pt(e) { const r = cv.getBoundingClientRect(); return [Math.round((e.clientX - r.left) * 1920 / r.width), Math.round((e.clientY - r.top) * 1080 / r.height)]; }
  function paint(st) {
    const p = st.p;
    ctx.save();
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    if (st.t === "marker") { ctx.globalCompositeOperation = "multiply"; ctx.globalAlpha = 0.7; ctx.lineWidth = 34; ctx.strokeStyle = MARK[st.c]; }
    else { ctx.lineWidth = 5.5; ctx.strokeStyle = PEN[st.c]; }
    ctx.beginPath(); ctx.moveTo(p[0][0], p[0][1]);
    if (p.length < 3) ctx.lineTo(p[p.length - 1][0] + 0.1, p[p.length - 1][1]);
    for (let i = 1; i < p.length - 1; i++) ctx.quadraticCurveTo(p[i][0], p[i][1], (p[i][0] + p[i + 1][0]) / 2, (p[i][1] + p[i + 1][1]) / 2);
    ctx.stroke(); ctx.restore();
  }
  function redraw() { ctx.clearRect(0, 0, 1920, 1080); (ink[cur] || []).forEach(paint); }
  function erase(x, y) {
    const list = ink[cur] || [], keep = list.filter((st) => !st.p.some(([a, b]) => Math.hypot(a - x, b - y) < 26));
    if (keep.length !== list.length) { ink[cur] = keep; redraw(); save(); }
  }
  cv.addEventListener("pointerdown", (e) => {
    if (!tool) return;
    cv.setPointerCapture(e.pointerId);
    const [x, y] = pt(e);
    if (tool === "eraser") { erase(x, y); stroke = { erasing: true }; return; }
    stroke = { t: tool, c: color, p: [[x, y]] };
  });
  cv.addEventListener("pointermove", (e) => {
    if (!stroke) return;
    const [x, y] = pt(e);
    if (stroke.erasing) { erase(x, y); return; }
    const last = stroke.p[stroke.p.length - 1];
    if (Math.hypot(last[0] - x, last[1] - y) < 2) return;
    stroke.p.push([x, y]); redraw(); paint(stroke);
  });
  function endStroke() {
    if (stroke && !stroke.erasing) { (ink[cur] = ink[cur] || []).push(stroke); save(); }
    stroke = null;
  }
  cv.addEventListener("pointerup", endStroke);
  cv.addEventListener("pointercancel", endStroke);

  // Pointeur avec traînée, et projecteur qui suit la souris
  const trail = Array.from({ length: 9 }, () => { const d = document.createElement("i"); laser.appendChild(d); return { el: d, x: 0, y: 0 }; });
  let target = [0, 0], raf = null;
  function follow() {
    let px = target[0], py = target[1];
    trail.forEach((t, k) => { t.x += (px - t.x) * (k ? 0.45 : 1); t.y += (py - t.y) * (k ? 0.45 : 1); t.el.style.transform = "translate(" + t.x + "px," + t.y + "px) scale(" + (1 - k * 0.09) + ")"; px = t.x; py = t.y; });
    raf = tool === "laser" ? requestAnimationFrame(follow) : null;
  }
  document.addEventListener("pointermove", (e) => {
    document.body.classList.remove("idle");
    tb.classList.add("is-awake");
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { if (!tb.matches(":hover")) tb.classList.remove("is-awake"); if (!tool) document.body.classList.add("idle"); }, 2600);
    if (tool !== "laser" && tool !== "spot") return;
    const xy = pt(e);
    if (tool === "laser") { target = xy; if (!raf) raf = requestAnimationFrame(follow); }
    else { spot.style.setProperty("--x", xy[0] + "px"); spot.style.setProperty("--y", xy[1] + "px"); }
  });

  function setTool(t) {
    tool = tool === t ? null : t;
    document.body.classList.remove("tool-pen", "tool-marker", "tool-eraser", "tool-laser", "tool-spot");
    if (tool) document.body.classList.add("tool-" + tool);
    cv.style.pointerEvents = tool === "pen" || tool === "marker" || tool === "eraser" ? "auto" : "none";
    tb.querySelectorAll("[data-tool]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.tool === tool)));
    if (tool === "laser" && !raf) raf = requestAnimationFrame(follow);
  }
  function setColor(c) { color = c; tb.querySelectorAll(".sw").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.color === c))); if (tool !== "pen" && tool !== "marker") setTool("pen"); }
  function clear() { if ((ink[cur] || []).length) { delete ink[cur]; redraw(); save(); toast("Dessins de la slide effacés."); } }

  tb.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.tool) setTool(b.dataset.tool);
    else if (b.dataset.color) setColor(b.dataset.color);
    b.blur();
  });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const a = b.dataset.act;
    if (a === "full") full(); else if (a === "pdf") pdf(); else if (a === "clear") clear();
    else if (a === "help") document.getElementById("help").classList.toggle("is-open");
    b.blur();
  });
  document.addEventListener("keydown", (e) => {
    const t = e.target;
    if (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") { const l = ink[cur]; if (l && l.length) { l.pop(); redraw(); save(); } e.preventDefault(); return; }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const map = { d: "pen", m: "marker", l: "laser", o: "spot", g: "eraser" };
    const k = e.key.toLowerCase();
    if (map[k]) { setTool(map[k]); e.preventDefault(); }
    else if (k === "c") { clear(); e.preventDefault(); }
    else if (e.key === "Escape" && tool) setTool(null);
  });
  document.addEventListener("deck:slide", (e) => { cur = e.detail; stroke = null; redraw(); });
  cur = Math.max(0, slides.findIndex((s) => s.classList.contains("is-active")));
  redraw();
})();
