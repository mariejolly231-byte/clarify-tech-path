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
    ["13h30", "Voir, puis faire"],
    ["15h15", "Limites et choix"],
    ["16h00", "À quoi faire attention"],
    ["16h30", "Intersession"],
  ];
  // Le vrai logo signe chaque slide : chargé une seule fois, réutilisé en fond par le pied de page
  const logoImg = document.querySelector(".brand-logo");
  if (logoImg) document.documentElement.style.setProperty("--logo", 'url("' + logoImg.src + '")');
  const LOGO = '<i class="chrome-logo" aria-hidden="true"></i>Summit Flow';

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
        return '<li class="' + state + '"' + (state === "is-current" ? ' aria-current="step"' : "") + '><button class="toc-go" data-chap="' + (k + 1) + '" aria-label="Aller au chapitre ' + (k + 1) + " : " + t + '"><span class="t"><b class="tn">' + (k + 1) + "</b>" + h + "</span>" + t + "</button></li>";
      }).join("") + "</ol>";
      el.prepend(nav);
    }
    el.querySelectorAll(".rise").forEach((r, k) => r.style.setProperty("--i", r.dataset.i || k));
  });

  // Tracé animé des schémas et illustrations : les traits se dessinent, les aplats apparaissent ensuite
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
        }
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

  // Sommaire latéral : un clic ouvre la slide d'ouverture du chapitre
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".toc-go");
    if (!b) return;
    const n = b.dataset.chap;
    const idx = slides.findIndex((el) => el.classList.contains("slide--chapter") && (el.dataset.section || "").startsWith("Chapitre " + n + " "));
    const fallback = slides.findIndex((el) => el.dataset.seq === n);
    const target = idx >= 0 ? idx : fallback;
    if (target >= 0) go(target, target < current ? -1 : 1);
    b.blur();
  });
  function go(i, direction) { current = Math.max(0, Math.min(total - 1, i)); render(direction || 1); }
  function next() {
    const hidden = frags(slides[current]).filter((x) => !x.classList.contains("is-shown"));
    if (hidden.length) { const s = stepOf(hidden[0]); hidden.filter((x) => stepOf(x) === s).forEach((x) => { x.classList.add("is-shown"); }); return; }
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
    if (document.querySelector(".tmodal:not([hidden])")) return;
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

  // Outil de décision : l'arbre « quelle brique pour quelle tâche », une question après l'autre
  const TREE = {
    q0: ["Ai-je le droit d'utiliser ces données dans Copilot ?", "q1", "stop"],
    q1: ["Vais-je refaire cette tâche souvent, de la même façon ?", "qj", "qc"],
    qc: ["Tout le nécessaire tient-il dans la conversation ou dans un fichier ?", "prompt", "qd"],
    qd: ["Faut-il croiser plusieurs documents d'un même dossier ?", "notes", "cowork"],
    qj: ["Faut-il lire, interpréter ou décider à une étape ?", "qa", "flux"],
    qa: ["Doit-elle se lancer seule, à heure fixe, sans que tu la relances ?", "plan", "qt"],
    qt: ["Faut-il des consignes et des documents à elle, partagés avec l'équipe ?", "agent", "req"],
  };
  // [brique, logique, couleur, pourquoi, module Copilot, catégorie de la carte, libellé court]
  const LEAF = {
    stop: ["On s'arrête et on vérifie", "", "card", "Données personnelles, clients ou confidentielles : on demande à la référente IA avant d'aller plus loin.", "Avant tout outil : la référente IA", "stop", "on s'arrête"],
    prompt: ["Une demande", "Assistant", "mint", "Un besoin ponctuel : tout le contexte tient dans l'échange ou un fichier joint.", "Copilot Chat : une demande, avec un fichier joint si besoin", "assistant", "assistant · Copilot Chat"],
    notes: ["Un bloc-notes", "Notebook", "mint", "Un dossier de documents à croiser pour cette tâche.", "Copilot Notebooks : un bloc-notes avec les documents du dossier", "notebook", "notebook · Notebooks"],
    cowork: ["Cowork", "Agent, selon la licence", "blush", "Plusieurs étapes et plusieurs applications : Copilot enchaîne pour toi.", "Copilot Cowork, s'il est activé chez vous", "agent", "agent · Cowork"],
    flux: ["Une automatisation simple", "Automatisation", "lav", "Répétitif, des règles fixes, sans interprétation : une suite d'actions suffit.", "Workflows dans Copilot, ou une règle Outlook", "automatisation", "automatisation · Workflows"],
    plan: ["Une demande planifiée", "Agent : c'est l'horaire qui la lance", "blush", "Copilot la relance seule chaque jour ou chaque semaine et t'envoie le résultat.", "Copilot Chat : une demande planifiée", "agent", "agent · demande planifiée"],
    req: ["Une requête enregistrée", "Assistant", "mint", "Ta méthode, gardée dans ta galerie et rappelée quand tu en as besoin.", "Copilot Chat : une requête enregistrée dans ta galerie", "assistant", "assistant · requête enregistrée"],
    agent: ["Un agent Copilot", "Assistant dédié", "mint", "Des consignes et des documents, réutilisables par toute l'équipe.", "Agent Builder : créer un agent dans Copilot", "assistant", "assistant · agent Copilot"],
  };
  const RISK_Q = "Et si elle se trompe : l'erreur coûterait-elle cher (client, paie, argent) ?";
  const AUTONOMOUS = ["plan", "cowork"];
  const RISK_YES = "Erreur coûteuse : un humain valide chaque résultat avant qu'il parte.";
  const RISK_YES_AUTO = "Erreur coûteuse : on commence en mode assistant, il prépare et tu valides, avant de le laisser tourner seul.";
  const RISK_NO = "Erreur rattrapable : on vérifie de près au début, puis par sondage.";
  const VIS = { q1: "q1", qc: "qc", qd: "qc", qj: "qj", qa: "qa", qt: "qt" }; // question de l'outil -> case de l'arbre dessiné
  function mountDecider(d, onChange) {
    const list = d.querySelector(".tq-list"), box = d.querySelector(".verdict-box");
    const out = box.querySelector(".out"), kind = box.querySelector(".kind"), why = box.querySelector(".why"), mod = box.querySelector(".mod");
    const mini = d.querySelector(".tree-mini"), riskEl = box.querySelector(".risk");
    let path = []; // [[question, réponse]]
    function render() {
      list.innerHTML = "";
      let node = "q0", risk = null;
      const seen = [];
      for (let k = 0; k <= path.length; k++) {
        if (!TREE[node]) {
          if (!LEAF[node] || node === "stop") break;
          const ans = path[k] ? path[k][1] : null, depth = k;
          const row = document.createElement("div");
          row.className = "q q--risk";
          row.innerHTML = "<span>" + RISK_Q + '</span><div class="yn"><button class="sk sk--thin" value="oui" aria-pressed="' + (ans === "oui") + '">oui</button><button class="sk sk--thin no" value="non" aria-pressed="' + (ans === "non") + '">non</button></div>';
          row.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { path = path.slice(0, depth); path.push(["qe", b.value]); render(); }));
          list.appendChild(row);
          risk = ans;
          break;
        }
        seen.push(node);
        const [label, yes, no] = TREE[node], ans = path[k] ? path[k][1] : null;
        const row = document.createElement("div");
        row.className = "q";
        row.innerHTML = "<span>" + label + '</span><div class="yn"><button class="sk sk--thin" value="oui" aria-pressed="' + (ans === "oui") + '">oui</button><button class="sk sk--thin no" value="non" aria-pressed="' + (ans === "non") + '">non</button></div>';
        const depth = k, here = node;
        row.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { path = path.slice(0, depth); path.push([here, b.value]); render(); }));
        list.appendChild(row);
        if (!ans) break;
        node = ans === "oui" ? yes : no;
      }
      const leaf = LEAF[node] && path.length && (node === "stop" || risk) ? LEAF[node] : null;
      if (riskEl) riskEl.textContent = leaf && risk ? (risk === "oui" ? (AUTONOMOUS.includes(node) ? RISK_YES_AUTO : RISK_YES) : RISK_NO) : "";
      if (riskEl) riskEl.className = "risk" + (risk === "oui" ? " is-high" : "");
      if (leaf) { out.textContent = leaf[0]; kind.textContent = leaf[1]; why.textContent = leaf[3]; if (mod) mod.textContent = leaf[4]; box.className = "verdict-box sk fill-" + leaf[2] + (node !== "stop" ? " has-guard" : ""); }
      else { out.textContent = LEAF[node] && path.length && node !== "stop" ? "Dernière question" : "Réponds aux questions"; kind.textContent = ""; why.textContent = "Une question après l'autre, avec le groupe."; if (mod) mod.textContent = ""; box.className = "verdict-box sk"; }
      if (mini) {
        mini.classList.toggle("has-path", path.length > 0);
        mini.querySelectorAll(".is-on").forEach((x) => x.classList.remove("is-on"));
        if (path.length) {
          mini.querySelector('[data-node="root"]').classList.add("is-on");
          seen.forEach((q) => { const v = VIS[q] && mini.querySelector('[data-node="' + VIS[q] + '"]'); if (v) v.classList.add("is-on"); });
          const lf = leaf && mini.querySelector('[data-leaf="' + node + '"]'); if (lf) lf.classList.add("is-on");
        }
      }
      if (onChange) onChange(path.slice(), leaf ? node : null);
    }
    const reset = d.querySelector(".reset");
    if (reset) reset.addEventListener("click", () => { path = []; render(); });
    render();
    return { set(p) { path = (p || []).slice(); render(); } };
  }
  document.querySelectorAll(".decider--tree:not(.decider--modal)").forEach((d) => mountDecider(d));

  // Freins du matin, triés en direct : un clic passe à la catégorie suivante
  const SORT = [["", "à trier"], ["fonde", "fondé"], ["verif", "à vérifier"], ["j5", "réglé au jour 5"]];
  document.querySelectorAll(".chip--sort").forEach((c) => {
    const key = "sort-" + c.dataset.k, label = c.querySelector(".verdict");
    function set(v) { const [val, txt] = SORT.find((x) => x[0] === v) || SORT[0]; if (val) c.dataset.v = val; else delete c.dataset.v; label.textContent = txt; }
    set(store(key) || "");
    (c.classList.contains("chip--free") ? label : c).addEventListener("click", () => { const i = SORT.findIndex((x) => x[0] === (c.dataset.v || "")); const v = SORT[(i + 1) % SORT.length][0]; set(v); store(key, v); });
  });

  // Situations de mars : un clic ouvre l'arbre, la réponse colore la carte
  document.querySelectorAll(".tmodal").forEach((m) => {
    const slide = m.closest(".slide"), sit = m.querySelector(".tmodal-sit b");
    let chip = null;
    function paint(c, leafKey) {
      const lf = leafKey && LEAF[leafKey];
      if (lf) c.dataset.v = lf[5]; else delete c.dataset.v;
      c.querySelector(".verdict").textContent = lf ? lf[6] : "à passer dans l'arbre";
    }
    const dec = mountDecider(m.querySelector(".decider--modal"), (path, leafKey) => {
      if (!chip) return;
      paint(chip, leafKey);
      store("tchip-" + chip.dataset.k, JSON.stringify({ path, leaf: leafKey }));
    });
    function close() { m.hidden = true; slide.classList.remove("has-modal"); if (chip) chip.focus(); chip = null; }
    slide.querySelectorAll(".chip--tree").forEach((c) => {
      let saved = null; try { saved = JSON.parse(store("tchip-" + c.dataset.k) || "null"); } catch (e) { saved = null; }
      if (saved) paint(c, saved.leaf);
      c.addEventListener("click", () => {
        let st = null; try { st = JSON.parse(store("tchip-" + c.dataset.k) || "null"); } catch (e) { st = null; }
        chip = null; dec.set(st ? st.path : []); chip = c;
        sit.textContent = c.firstElementChild.textContent;
        m.hidden = false; slide.classList.add("has-modal");
        const first = m.querySelector(".yn button"); if (first) first.focus();
      });
    });
    m.querySelector(".tmodal-x").addEventListener("click", close);
    m.addEventListener("click", (e) => { if (e.target === m) close(); });
    document.addEventListener("keydown", (e) => { if (!m.hidden && e.key === "Escape") { close(); e.stopImmediatePropagation(); } }, true);
    document.addEventListener("deck:slide", () => { if (!m.hidden) close(); });
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

  // Télécharger la grille PDF remplissable : via la page claude.ai si elle le permet, sinon directement
  document.querySelectorAll(".dl-pdf").forEach((btn) => btn.addEventListener("click", async () => {
    const src = document.getElementById("pdf-grille");
    if (!src) { toast("La grille PDF n'est pas intégrée à cette version : demande-la à contact@summitflow.fr."); return; }
    const bin = atob(src.textContent.trim()), bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const blob = new Blob([bytes], { type: "application/pdf" }), name = "grille-audit-lagarrigue.pdf";
    let dl = null;
    try { if (window.claude && window.claude.use) dl = await window.claude.use("downloads"); } catch (e) { dl = null; }
    if (dl) {
      try { await dl.save({ filename: name, data: blob }); toast("Grille enregistrée."); }
      catch (e) { if (!e || e.code !== "declined") toast("Téléchargement indisponible ici : demande la grille à contact@summitflow.fr."); }
      return;
    }
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }));

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

// Mini-présentations (rappel Copilot, agents Copilot) : chacune s'ouvre au-dessus du deck depuis son bouton,
// et ses flèches lui appartiennent tant qu'elle est ouverte
(function () {
  const decks = Array.from(document.querySelectorAll(".minideck"));
  if (!decks.length) return;
  let md = null, pages = [], i = 0, opener = null;
  function show(k) {
    i = Math.max(0, Math.min(pages.length - 1, k));
    pages.forEach((p, j) => p.classList.toggle("is-on", j === i));
    md.querySelector(".md-n").textContent = i + 1;
    md.querySelector(".md-tot").textContent = pages.length;
    md.querySelector('[data-md="prev"]').disabled = i === 0;
    md.querySelector('[data-md="next"]').disabled = i === pages.length - 1;
  }
  function open(btn) {
    md = document.getElementById(btn.dataset.target || "minideck");
    if (!md) return;
    opener = btn; pages = Array.from(md.querySelectorAll(".md-slide"));
    md.hidden = false; show(0); md.querySelector(".md-close").focus();
  }
  function close() { if (!md) return; md.hidden = true; md = null; if (opener) opener.focus(); }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act='minideck'], [data-md]");
    if (!b) return;
    e.stopPropagation();
    if (b.dataset.act === "minideck") open(b);
    else if (b.dataset.md === "close") close();
    else show(i + (b.dataset.md === "next" ? 1 : -1));
  }, true);
  window.addEventListener("keydown", (e) => {
    if (!md) return;
    const k = e.key;
    if (k === "Escape") close();
    else if (k === "ArrowRight" || k === "PageDown" || k === " ") show(i + 1);
    else if (k === "ArrowLeft" || k === "PageUp") show(i - 1);
    else if (k !== "Tab") return;
    if (k !== "Tab") { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);
  document.addEventListener("deck:slide", () => { if (md) { md.hidden = true; md = null; } });
})();

// Intersession : le cas de mars choisi pour l'exemple, et le numéro de la slide de l'arbre
(function () {
  const slidesAll = Array.from(document.querySelectorAll(".slide"));
  const treeIdx = slidesAll.findIndex((el) => el.querySelector(".tree"));
  document.querySelectorAll(".ref-tree").forEach((r) => { if (treeIdx >= 0) r.textContent = "voir l'arbre, slide " + (treeIdx + 1); });
  document.querySelectorAll(".case-pick").forEach((sel) => {
    const key = "sf-j1-" + sel.dataset.k;
    try { const v = localStorage.getItem(key); if (v) sel.value = v; } catch (e) { /* stockage indisponible */ }
    sel.addEventListener("change", () => { try { localStorage.setItem(key, sel.value); } catch (e) { /* stockage indisponible */ } });
    sel.addEventListener("keydown", (e) => e.stopPropagation());
  });
})();

