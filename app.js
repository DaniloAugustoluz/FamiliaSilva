(function () {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const reais = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const normal = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };

  /* ---------- Pizzas desenhadas a partir dos ingredientes ---------- */
  const g = (x, y, a, s) => `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a})">${s}</g>`;
  const T = {
    queijo: [12, (s) => `<ellipse rx="${9 + s * 6}" ry="${6 + s * 4}" fill="#fff0bf" opacity=".75"/>`],
    parmesao: [26, () => `<rect x="-2.500" y="-.8" width="5" height="1.600" rx=".8" fill="#fff8dc"/>`],
    provolone: [7, () => `<circle r="8" fill="#f3d58b"/><circle r="8" fill="none" stroke="#d9a94a" stroke-width="1"/>`],
    catupiry: [9, () => `<path d="M-9 2c3-7 6 5 9-1s6 4 9-1" fill="none" stroke="#fffaf0" stroke-width="6" stroke-linecap="round"/>`],
    cheddar: [7, () => `<path d="M-11 0c4-6 7 6 11 0s7 6 11 0" fill="none" stroke="#f08a1c" stroke-width="4.500" stroke-linecap="round"/>`],
    presunto: [11, () => `<rect x="-7" y="-6" width="14" height="12" rx="2.500" fill="#ee9c97"/><rect x="-7" y="-6" width="14" height="12" rx="2.500" fill="none" stroke="#d9736f" stroke-width="1"/>`],
    peru: [10, () => `<circle r="9.500" fill="#f4cdb6"/><circle r="9.500" fill="none" stroke="#d99a7a" stroke-width="1.200"/>`],
    lombo: [9, () => `<ellipse rx="11" ry="8.500" fill="#dda183"/><ellipse rx="11" ry="8.500" fill="none" stroke="#a9623f" stroke-width="1.600"/>`],
    calabresa: [13, () => `<circle r="10.500" fill="#8e2414"/><circle r="9" fill="#c74327"/><circle cx="-3" cy="-2" r="1.300" fill="#f2b08a"/><circle cx="3" cy="2.500" r="1.100" fill="#f2b08a"/><circle cx="2" cy="-4" r=".9" fill="#f2b08a"/>`],
    pepperoni: [13, () => `<circle r="10.500" fill="#a3180f"/><circle r="9" fill="#d8321f"/><circle cx="-2" cy="3" r="1.200" fill="#f49a7c"/><circle cx="4" cy="-2" r="1.200" fill="#f49a7c"/>`],
    frango: [26, () => `<path d="M-6 1c4-3 8 1 12-1" fill="none" stroke="#f8e6c4" stroke-width="3.600" stroke-linecap="round"/><path d="M-5 2c4-2 7 1 10 0" fill="none" stroke="#dcb987" stroke-width="1" stroke-linecap="round"/>`],
    carneseca: [26, () => `<path d="M-6 1c4-4 8 2 12-1" fill="none" stroke="#6e2d1a" stroke-width="3.400" stroke-linecap="round"/><path d="M-5 0c4-3 6 2 9 0" fill="none" stroke="#a75a3a" stroke-width="1" stroke-linecap="round"/>`],
    atum: [24, () => `<path d="m-5-2 6-1 4 3-5 2Z" fill="#d7b08a"/><path d="m-5-2 6-1" stroke="#a67b52" stroke-width="1"/>`],
    bacon: [18, () => `<rect x="-6" y="-3" width="12" height="6" rx="1.800" fill="#9b2f20"/><rect x="-6" y="-.9" width="12" height="1.900" fill="#f3c4a6"/>`],
    ovo: [5, () => `<ellipse rx="10.500" ry="9.500" fill="#fffdf6"/><circle r="5" fill="#f5b21e"/>`],
    tomate: [8, () => `<circle r="12" fill="#c9241a"/><circle r="10" fill="#e8503c"/><path d="M0-7V7M-6-3.500 6 3.500M-6 3.500 6-3.500" stroke="#f7a48f" stroke-width="2" stroke-linecap="round"/>`],
    cebola: [9, () => `<ellipse rx="10" ry="7" fill="none" stroke="#f7ecf3" stroke-width="2.200"/><ellipse rx="6" ry="4" fill="none" stroke="#d9b3cf" stroke-width="1.500"/>`],
    milho: [34, () => `<ellipse rx="2.800" ry="2.200" fill="#ffd02e"/>`],
    ervilha: [26, () => `<circle r="2.900" fill="#4f9b3a"/><circle cx="-.8" cy="-.8" r=".9" fill="#a8d98c"/>`],
    palmito: [10, () => `<circle r="7" fill="#fbf3da"/><circle r="7" fill="none" stroke="#d9c592" stroke-width="1.300"/><circle r="3" fill="none" stroke="#d9c592" stroke-width="1.100"/>`],
    champignon: [11, () => `<path d="M-8 0a8 6.500 0 0 1 16 0Z" fill="#e8d3b0"/><rect x="-2.500" y="0" width="5" height="6" rx="1.800" fill="#f5e8d0"/><path d="M-8 0a8 6.500 0 0 1 16 0Z" fill="none" stroke="#b5946a" stroke-width="1"/>`],
    brocolis: [10, () => `<rect x="-1.800" y="2" width="3.600" height="6" rx="1.500" fill="#8dbb5e"/><circle cx="-4" r="4.800" fill="#2f7d32"/><circle cx="4" r="4.800" fill="#2f7d32"/><circle cy="-3.500" r="5.200" fill="#3f9540"/>`],
    escarola: [18, () => `<path d="M-9 1c4-6 13-6 18-1-5 5-13 5-18 1Z" fill="#2f6b2c"/><path d="M-8 1c5-2 11-2 16-1" stroke="#8bbf66" stroke-width="1" fill="none"/>`],
    manjericao: [8, () => `<path d="M-9 0C-5-7 5-7 9 0 5 7-5 7-9 0Z" fill="#1f7a39"/><path d="M-8 0h16" stroke="#7fc98a" stroke-width="1"/>`],
    batata: [44, () => `<path d="M-7 0h14" stroke="#e8b84a" stroke-width="1.700" stroke-linecap="round"/>`],
    vinagrete: [16, (s) => `<rect x="-2.500" y="-2.500" width="5" height="5" rx="1" fill="${["#d9301f", "#3f9540", "#fff3ee"][Math.floor(s * 3)]}"/>`],
    pimenta: [16, () => `<path d="M-4 0c2-2 6-2 8 0" stroke="#c41508" stroke-width="2.400" stroke-linecap="round" fill="none"/>`],
    alho: [18, () => `<ellipse rx="3.400" ry="2.200" fill="#d9a24a"/>`],
    chocolate: [0, () => ""], docedeleite: [0, () => ""],
    granulado: [46, () => `<rect x="-3" y="-.9" width="6" height="1.800" rx=".9" fill="#1f0d06"/>`],
    mms: [14, (s) => `<circle r="4.600" fill="${["#e23b2e", "#f4c21f", "#2e9e4f", "#2a78d6", "#f07f1d"][Math.floor(s * 5)]}"/><circle cx="-1.300" cy="-1.500" r="1.200" fill="#fff" opacity=".55"/>`],
    coco: [54, () => `<rect x="-2.800" y="-.8" width="5.600" height="1.600" rx=".8" fill="#fffaf2"/>`],
    morango: [12, () => `<path d="M0 8C-8 3-8-6 0-7c8 1 8 10 0 15Z" fill="#d81f33"/><circle cx="-2.500" cy="-1" r=".8" fill="#ffd9a0"/><circle cx="2.500" cy="1" r=".8" fill="#ffd9a0"/><path d="M-4-6 0-9l4 3-4 1Z" fill="#3f9540"/>`],
    goiabada: [13, () => `<rect x="-6" y="-5" width="12" height="10" rx="2" fill="#9c1526"/><rect x="-6" y="-5" width="12" height="3.500" rx="1.700" fill="#c53344"/>`]
  };
  const REGRAS = [
    [/mussarela/, "queijo"], [/provolone/, "provolone"], [/cheddar/, "cheddar"], [/parmesao/, "parmesao"],
    [/presunto/, "presunto"], [/peito de peru/, "peru"], [/lombo/, "lombo"], [/escarola/, "escarola"],
    [/frango/, "frango"], [/carne seca/, "carneseca"], [/atum/, "atum"], [/calabresa/, "calabresa"], [/pepperoni/, "pepperoni"],
    [/catupiry/, "catupiry"], [/tomate/, "tomate"], [/palmito/, "palmito"], [/champignon/, "champignon"], [/brocolis/, "brocolis"],
    [/ovo/, "ovo"], [/cebola/, "cebola"], [/bacon/, "bacon"], [/milho/, "milho"], [/ervilha/, "ervilha"], [/batata palha/, "batata"],
    [/vinagrete/, "vinagrete"], [/pimenta/, "pimenta"], [/alho/, "alho"], [/manjericao/, "manjericao"],
    [/chocolate/, "chocolate"], [/doce de leite/, "docedeleite"], [/goiabada/, "goiabada"], [/morango/, "morango"], [/granulado/, "granulado"], [/coco/, "coco"], [/m&m/, "mms"]
  ];
  function sorteio(txt) { let h = 2166136261; for (const c of txt) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; }; }
  function miolo(item) {
    const d = normal(item.desc), rnd = sorteio(item.nome + item.desc);
    let ings = REGRAS.filter(([r]) => r.test(d)).map(([, k]) => k);
    if (/escolha ate/.test(d)) ings = ["queijo", "tomate", "milho", "manjericao"];
    const base = ings.includes("chocolate") ? "url(#g-choco)" : ings.includes("docedeleite") ? "url(#g-doce)" : "url(#g-queijo)";
    const muitos = ings.length > 5 ? 0.85 : ings.length > 3 ? 1 : 1.25;
    let s = `<circle r="96" fill="url(#g-massa)"/>`;
    for (let i = 0; i < 16; i++) { const a = rnd() * 6.283, r = 88 + rnd() * 6; s += `<circle cx="${(Math.cos(a) * r).toFixed(1)}" cy="${(Math.sin(a) * r).toFixed(1)}" r="${(1.500 + rnd() * 2.500).toFixed(1)}" fill="#7d4315" opacity=".35"/>`; }
    s += `<circle r="83" fill="#b8331d"/><circle r="80" fill="${base}"/>`;
    ings.forEach((k) => {
      const [n0, fn] = T[k]; const n = Math.max(n0 ? 4 : 0, Math.round(n0 * muitos)); const giro = rnd() * 6.283;
      for (let i = 0; i < n; i++) {
        const r = 70 * Math.sqrt((i + 0.45) / n) + (rnd() - 0.5) * 7, a = i * 2.39996 + giro + (rnd() - 0.5) * 0.35;
        s += g(Math.cos(a) * r, Math.sin(a) * r, Math.round(rnd() * 360), fn(rnd()));
      }
    });
    s += `<g stroke="#5a2a0c" stroke-width="1.300" opacity=".28"><path d="M-95 0H95M0-95V95M-67-67 67 67M-67 67 67-67"/></g>`;
    return s;
  }
  const cache = new Map();
  function pizza(item) { if (!cache.has(item.nome)) cache.set(item.nome, miolo(item)); return `<svg viewBox="-100 -100 200 200">${cache.get(item.nome)}</svg>`; }
  let seqClip = 0;
  function meia(a, b) {
    const id = "c" + (++seqClip);
    return `<svg viewBox="-104 -104 208 208" role="img" aria-label="Pizza meio ${a.nome}, meio ${b.nome}"><defs><clipPath id="${id}a"><rect x="-104" y="-104" width="104" height="208"/></clipPath><clipPath id="${id}b"><rect x="0" y="-104" width="104" height="208"/></clipPath></defs><g clip-path="url(#${id}a)">${miolo(a)}</g><g clip-path="url(#${id}b)">${miolo(b)}</g><path d="M0-96V96" stroke="#5a2a0c" stroke-width="2" opacity=".55"/></svg>`;
  }
  const FIG = {
    lanche: (it) => {
      const d = normal(it.desc); let y = 56, s = "";
      const add = (h, fill, w) => { s += `<rect x="${50 - w / 2}" y="${y - h}" width="${w}" height="${h}" rx="${Math.min(h / 2, 5)}" fill="${fill}"/>`; y -= h; };
      s += `<path d="M14 72h72v5a10 10 0 0 1-10 10H24a10 10 0 0 1-10-10Z" fill="#d9943f"/>`; y = 72;
      add(11, "#5b2b16", 74);
      if (/mussarela/.test(d)) { s += `<path d="M13 ${y}h74l-9 9-9-9-12 8-11-8Z" fill="#f8c95f"/>`; add(3, "#f8c95f", 76); }
      if (/presunto/.test(d)) add(4, "#ee9c97", 76);
      if (/calabresa/.test(d)) add(5, "#c74327", 70);
      if (/bacon/.test(d)) add(4, "#9b2f20", 76);
      if (/ovo/.test(d)) { add(5, "#fffdf6", 72); s += `<ellipse cx="50" cy="${y + 1}" rx="12" ry="4" fill="#f5b21e"/>`; }
      if (/tomate/.test(d)) add(5, "#e8503c", 70);
      if (/alface/.test(d)) { s += `<path d="M11 ${y}q6 7 13 0t13 0 13 0 13 0 13 0 13 0v-5H11Z" fill="#4f9b3a"/>`; y -= 5; }
      s += `<path d="M14 ${y}c0-19 16-26 36-26s36 7 36 26Z" fill="#e0a04a"/><g fill="#fff0cf"><ellipse cx="38" cy="${y - 15}" rx="2.600" ry="1.600"/><ellipse cx="52" cy="${y - 19}" rx="2.600" ry="1.600"/><ellipse cx="64" cy="${y - 13}" rx="2.600" ry="1.600"/></g>`;
      return `<svg viewBox="6 2 88 92">${s}</svg>`;
    },
    pastel: () => `<svg viewBox="0 0 100 100"><path d="m14 34 60-14 14 48-60 14Z" fill="#e9b45a"/><path d="m14 34 60-14 14 48-60 14Z" fill="none" stroke="#b97a26" stroke-width="4" stroke-dasharray="3 4"/><g fill="#f8d790"><ellipse cx="42" cy="46" rx="9" ry="5"/><ellipse cx="62" cy="40" rx="6" ry="4"/><ellipse cx="60" cy="60" rx="10" ry="5"/><ellipse cx="38" cy="63" rx="5" ry="3"/></g></svg>`,
    bebida: (it) => {
      const n = normal(it.nome), cor = /coca/.test(n) ? ["#3a130c", "#d62e24"] : /guarana/.test(n) ? ["#b9691b", "#137a43"] : /uva/.test(n) ? ["#57207a", "#7b3aa8"] : /limao/.test(n) ? ["#d8efb0", "#4f9b3a"] : /itubaina/.test(n) ? ["#8a3b12", "#f6b93b"] : ["#f0861d", "#e2601a"];
      return `<svg viewBox="0 0 100 100"><rect x="43" y="6" width="14" height="8" rx="2" fill="${cor[1]}"/><path d="M44 14h12v10c0 6 12 9 12 22v40a6 6 0 0 1-6 6H38a6 6 0 0 1-6-6V46c0-13 12-16 12-22Z" fill="${cor[0]}"/><rect x="32" y="50" width="36" height="24" fill="${cor[1]}"/><path d="M38 60c8-6 16 6 24 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
    },
    sobremesa: (it) => {
      const n = normal(it.nome), c = /chocolate/.test(n) ? ["#4a2413", "#6b3a1f"] : /prestigio/.test(n) ? ["#4a2413", "#fffaf2"] : /limao/.test(n) ? ["#e6f3b8", "#cfe58a"] : ["#ffd24a", "#f5b21e"];
      return `<svg viewBox="0 0 100 100"><path d="M24 30h52l-7 56a5 5 0 0 1-5 4H36a5 5 0 0 1-5-4Z" fill="${c[0]}"/><path d="M27 52h46l-2 15H29Z" fill="${c[1]}"/><path d="M22 30c0-14 14-12 18-18 6 8 34 4 38 18Z" fill="${c[1]}"/><rect x="20" y="28" width="60" height="6" rx="3" fill="#fff6e6"/></svg>`;
    }
  };
  const figura = (cat, it) => cat.tipo === "pizza" ? pizza(it) : FIG[cat.tipo](it);

  /* ---------- Aberto ou fechado ---------- */
  function agoraSP() {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date()).map((x) => [x.type, x.value]));
    return { d: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday), m: +p.hour * 60 + +p.minute };
  }
  const hm = (m) => { const h = Math.floor(m / 60) % 24, mi = m % 60; return String(h).padStart(2, "0") + "h" + (mi ? String(mi).padStart(2, "0") : ""); };
  function status() {
    const { d, m } = agoraSP(), H = LOJA.horas, hoje = H[d], ontem = H[(d + 6) % 7], s = $("#status");
    let fecha = null, dono = d;
    if (!ontem.fechado && ontem.fecha > 1440 && m < ontem.fecha - 1440) { fecha = ontem.fecha; dono = (d + 6) % 7; }
    else if (!hoje.fechado && m >= hoje.abre && m < hoje.fecha) fecha = hoje.fecha;
    s.classList.toggle("aberto", fecha != null);
    if (fecha != null) s.textContent = "Aberto agora, até " + hm(fecha);
    else {
      let k = 0; while (k < 8) { const h = H[(d + k) % 7]; if (!h.fechado && (k > 0 || m < h.abre)) break; k++; }
      const h = H[(d + k) % 7];
      s.textContent = "Fechado agora, abre " + (k === 0 ? "hoje" : k === 1 ? "amanhã" : h.dia.toLowerCase()) + " às " + hm(h.abre);
    }
    const ul = $("#horas"); ul.textContent = "";
    [1, 2, 3, 4, 5, 6, 0].forEach((i) => { const li = el("li", i === dono ? "hoje" : ""); li.append(el("span", "", H[i].dia), el("span", "", H[i].fechado ? "Fechado" : hm(H[i].abre) + " às " + hm(H[i].fecha))); ul.append(li); });
  }

  /* ---------- Cardápio ---------- */
  let catAtual = CARDAPIO[0].id;
  const obs = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target._desenha(); obs.unobserve(e.target); } }), { rootMargin: "300px" }) : null;
  function linha(cat, it) {
    const li = el("li"), b = el("button", "item" + (cat.tipo === "pizza" ? "" : " sem-giro")); b.type = "button";
    const f = el("span", "i-fig"); f.setAttribute("aria-hidden", "true"); f._desenha = () => { f.innerHTML = figura(cat, it); };
    obs ? obs.observe(f) : f._desenha();
    const t = el("span"); t.append(el("span", "i-nome", it.nome)); if (it.desc) t.append(el("span", "i-desc", it.desc));
    const pr = el("span", "i-preco");
    Object.entries(it.precos).forEach(([k, v]) => { const s = el("span"); if (k !== "un") s.append(el("i", "", k)); s.append(document.createTextNode(reais(v))); pr.append(s); });
    b.append(f, t, pr); b.addEventListener("click", () => abrirItem(cat, it)); li.append(b); return li;
  }
  function listar() {
    const q = normal($("#busca").value.trim()), alvo = $("#lista"); alvo.textContent = "";
    let achou = 0;
    CARDAPIO.forEach((cat) => {
      if (!q && cat.id !== catAtual) return;
      const itens = q ? cat.itens.filter((i) => normal(i.nome + " " + i.desc).includes(q)) : cat.itens;
      if (!itens.length) return; achou += itens.length;
      alvo.append(el("h3", "grupo", cat.nome)); const ul = el("ul", "itens"); itens.forEach((i) => ul.append(linha(cat, i))); alvo.append(ul);
    });
    if (!achou) alvo.append(el("p", "vazio", "Nada encontrado com esse nome. Tente outro ingrediente, como bacon ou frango."));
    document.querySelectorAll(".aba").forEach((a) => a.setAttribute("aria-selected", String(!q && a.dataset.id === catAtual)));
  }
  CARDAPIO.forEach((cat) => {
    const b = el("button", "aba", cat.nome); b.type = "button"; b.dataset.id = cat.id; b.setAttribute("role", "tab");
    b.addEventListener("click", () => { catAtual = cat.id; $("#busca").value = ""; listar(); b.scrollIntoView({ block: "nearest", inline: "center" }); const y = $(".abas-wrap").offsetTop - 66; if (window.scrollY > y) window.scrollTo({ top: y }); });
    $("#abas").append(b);
  });
  $("#busca").addEventListener("input", listar);

  /* ---------- Tamanhos ---------- */
  function tamanhos(alvo, precos, atual, muda) {
    alvo.textContent = ""; const ks = Object.keys(precos); if (ks.length < 2) return;
    ks.forEach((k) => {
      const b = el("button", "tam"); b.type = "button"; b.setAttribute("role", "radio"); b.setAttribute("aria-checked", String(k === atual));
      b.append(el("span", "", k === "G" ? "Grande" : "Pequena"), el("b", "", reais(precos[k])));
      b.addEventListener("click", () => { muda(k); tamanhos(alvo, precos, k, muda); alvo.querySelectorAll(".tam")[ks.indexOf(k)].focus(); }); alvo.append(b);
    });
  }

  /* ---------- Item ---------- */
  let sel = null;
  function abrirItem(cat, it) {
    sel = { cat, it, tam: Object.keys(it.precos)[0], qtd: 1 };
    $("#miFig").innerHTML = figura(cat, it); $("#miNome").textContent = (cat.tipo === "pizza" ? "Pizza " : "") + it.nome; $("#miDesc").textContent = it.desc || "";
    $("#miObs").value = ""; $("#miObs").classList.remove("invalido"); $("#miObsRotulo").textContent = it.obs || "Observação (opcional)";
    tamanhos($("#miTam"), it.precos, sel.tam, (k) => { sel.tam = k; pinta(); }); pinta(); $("#modalItem").showModal();
  }
  function pinta() { $("#miQtd").textContent = sel.qtd; $("#miAdd").textContent = "Adicionar " + reais(sel.it.precos[sel.tam] * sel.qtd); }
  $("#miMenos").addEventListener("click", () => { if (sel.qtd > 1) { sel.qtd--; pinta(); } });
  $("#miMais").addEventListener("click", () => { if (sel.qtd < 30) { sel.qtd++; pinta(); } });
  $("#miAdd").addEventListener("click", () => {
    const o = $("#miObs").value.trim();
    if (sel.it.obsObrig && !o) { $("#miObs").classList.add("invalido"); $("#miObs").focus(); return; }
    por({ nome: (sel.cat.tipo === "pizza" ? "Pizza " : "") + sel.it.nome, tam: sel.tam === "un" ? "" : sel.tam, preco: sel.it.precos[sel.tam], qtd: sel.qtd, obs: o });
    $("#modalItem").close();
  });

  /* ---------- Meio a meio ---------- */
  const pizzas = CARDAPIO.filter((c) => c.tipo === "pizza").flatMap((c) => c.itens.filter((i) => !i.obsObrig));
  const ma = $("#meioA"), mb = $("#meioB"); let mTam = "G";
  [ma, mb].forEach((s) => CARDAPIO.filter((c) => c.tipo === "pizza").forEach((c) => { const og = document.createElement("optgroup"); og.label = c.nome; c.itens.filter((i) => !i.obsObrig).forEach((i) => og.append(new Option(i.nome, i.nome))); s.append(og); }));
  ma.value = "Calabresa"; mb.value = "Portuguesa";
  function meio() {
    const a = pizzas.find((i) => i.nome === ma.value), b = pizzas.find((i) => i.nome === mb.value);
    const precos = { G: Math.max(a.precos.G, b.precos.G), P: Math.max(a.precos.P, b.precos.P) };
    $("#meioPizza").innerHTML = meia(a, b);
    const bt = () => { $("#meioAdd").textContent = "Adicionar " + reais(precos[mTam]); };
    tamanhos($("#meioTam"), precos, mTam, (k) => { mTam = k; bt(); }); bt();
    $("#meioAdd").onclick = () => por({ nome: a.nome === b.nome ? "Pizza " + a.nome : `Pizza meio ${a.nome}, meio ${b.nome}`, tam: mTam, preco: precos[mTam], qtd: 1, obs: "" });
  }
  ma.addEventListener("change", meio); mb.addEventListener("change", meio);

  /* ---------- Sacola ---------- */
  let sacola = [];
  try { sacola = JSON.parse(localStorage.getItem("pfs-sacola") || "[]"); if (!Array.isArray(sacola)) sacola = []; } catch (e) { sacola = []; }
  const total = () => sacola.reduce((s, i) => s + i.preco * i.qtd, 0), conta = () => sacola.reduce((s, i) => s + i.qtd, 0);
  function salva() { try { localStorage.setItem("pfs-sacola", JSON.stringify(sacola)); } catch (e) { /* navegação privada */ } }
  let tAviso; function avisa(t) { const a = $("#aviso"); a.textContent = t; a.classList.add("on"); clearTimeout(tAviso); tAviso = setTimeout(() => a.classList.remove("on"), 1800); }
  function por(n) {
    const igual = sacola.find((i) => i.nome === n.nome && i.tam === n.tam && i.obs === n.obs);
    igual ? igual.qtd += n.qtd : sacola.push(n); salva(); desenha(); avisa(n.nome + " na sacola");
  }
  function desenha() {
    const c = conta(); $("#qtdTopo").hidden = !c; $("#qtdTopo").textContent = c; $("#barra").hidden = !c;
    $("#barraQtd").textContent = "Ver sacola (" + c + ")"; $("#barraTotal").textContent = reais(total()); $("#sTotal").textContent = reais(total());
    const alvo = $("#sItens"); alvo.textContent = ""; $("#sForm").hidden = !c; $("#sEnviar").disabled = !c; $(".s-pe").hidden = !c;
    if (!c) { alvo.append(el("p", "s-vazia", "Sua sacola está vazia. Escolha um sabor no cardápio.")); return; }
    sacola.forEach((i, k) => {
      const d = el("div", "s-item"), t = el("div"); t.append(el("b", "", i.nome + (i.tam ? " (" + i.tam + ")" : ""))); if (i.obs) t.append(el("small", "", i.obs));
      const q = el("div", "qtd"), m = el("button", "", "−"), n = el("output", "", i.qtd), p = el("button", "", "+"); m.type = p.type = "button"; m.setAttribute("aria-label", "Tirar um " + i.nome); p.setAttribute("aria-label", "Mais um " + i.nome);
      m.onclick = () => { i.qtd--; if (i.qtd < 1) sacola.splice(k, 1); salva(); desenha(); }; p.onclick = () => { i.qtd++; salva(); desenha(); };
      q.append(m, n, p); d.append(t, el("div", "valor", reais(i.preco * i.qtd)), el("span"), q); alvo.append(d);
    });
  }
  const f = $("#sForm");
  const modo = () => f.elements.modo.value;
  f.addEventListener("change", () => { const ent = modo() === "Entrega"; $("#sEntrega").hidden = !ent; $("#sTaxa").hidden = !ent; $("#sTroco").hidden = f.elements.pag.value !== "Dinheiro"; });
  f.addEventListener("submit", (e) => { e.preventDefault(); enviar(); });
  const abreSacola = () => { desenha(); $("#sacola").showModal(); };
  $("#abrirSacola").addEventListener("click", abreSacola); $("#barra").addEventListener("click", abreSacola);
  [$("#sacola"), $("#modalItem")].forEach((d) => d.addEventListener("click", (e) => { if (e.target === d) { const r = d.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close(); } }));
  function mensagem() {
    const v = (n) => f.elements[n].value.trim(), L = [];
    if (LOJA.previa) L.push("*PEDIDO DE TESTE (prévia do site)*", "");
    L.push("Olá! Quero fazer um pedido.", "", "*Nome:* " + v("nome"));
    if (modo() === "Entrega") L.push("*Endereço:* " + v("rua") + (v("compl") ? ", " + v("compl") : ""), "*Bairro:* " + v("bairro")); else L.push("*Retirada no balcão*");
    L.push("", "*Pedido:*"); sacola.forEach((i) => { L.push(i.qtd + "x " + i.nome + (i.tam ? " (" + i.tam + ")" : "") + " - " + reais(i.preco * i.qtd)); if (i.obs) L.push("   Obs.: " + i.obs); });
    L.push("", "*Total dos itens:* " + reais(total())); if (modo() === "Entrega") L.push("*Taxa de entrega:* a confirmar");
    L.push("*Pagamento:* " + v("pag") + (v("pag") === "Dinheiro" && v("troco") ? ", troco para R$ " + v("troco") : ""));
    return L.join("\n");
  }
  function enviar() {
    const obrig = modo() === "Entrega" ? ["nome", "rua", "bairro"] : ["nome"]; let falta = null;
    ["nome", "rua", "bairro"].forEach((n) => { const c = f.elements[n], ruim = obrig.includes(n) && !c.value.trim(); c.classList.toggle("invalido", ruim); if (ruim && !falta) falta = c; });
    $("#sErro").textContent = falta ? "Preencha os campos marcados para enviar o pedido." : "";
    if (falta) { falta.focus(); return; }
    window.open("https://wa.me/" + LOJA.whatsapp + "?text=" + encodeURIComponent(mensagem()), "_blank", "noopener");
  }
  $("#sEnviar").addEventListener("click", enviar);
  $("#zapDireto").href = "https://wa.me/" + LOJA.whatsapp;
  window.__mensagemPrevia = mensagem;

  /* ---------- Início ---------- */
  const casa = CARDAPIO[0].itens.find((i) => i.nome === "A Moda da Casa");
  $("#heroPizza").innerHTML = pizza(casa);
  status(); setInterval(status, 60000); listar(); meio(); desenha();
})();
