/* Portfólio Guilherme Vital: menu, contadores, modais, carrossel, filtros e mockups.
   Todos os números vêm de data.js e são fictícios. */
(function () {
  "use strict";

  var D = window.PORTFOLIO;
  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fmt = function (n, dec) { return Number(n).toLocaleString("pt-BR", { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 }); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var t = function (n) { return fmt(n) + " t"; };
  var count = function (n, suf, pre, dec) {
    return '<span data-count="' + n + '"' + (suf ? ' data-suffix="' + esc(suf) + '"' : "") + (pre ? ' data-prefix="' + esc(pre) + '"' : "") +
      (dec ? ' data-dec="' + dec + '"' : "") + ">" + (pre || "") + fmt(n, dec) + (suf || "") + "</span>";
  };

  /* ---------- Ícones ---------- */
  var ICONS = {
    portal: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
    cliente: '<path d="M3 20V10M9 20V4M15 20v-7M21 20V8"/>',
    caminhao: '<path d="M2 6h11v10H2zM13 10h4l4 4v2h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    camadas: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
    app: '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M10 6h4M9 11h6M9 15h6"/>',
    email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    banco: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    grafico: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>'
  };
  var icon = function (k) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[k] + "</svg>"; };

  var CHUVA = { "seco": "ok", "chuva fraca": "warn", "chuva forte": "bad" };
  var RISCO = { seco: ["seco", "ok"], atencao: ["atenção", "warn"], forte: ["chuva forte", "bad"] };

  /* ---------- Gráfico de barras em SVG ---------- */
  function barChart(o) {
    var W = 600, H = o.h || 220, padL = 34, padB = 26, padT = 10;
    var n = o.labels.length, ns = o.series.length;
    var max = o.max || Math.max.apply(null, o.series.concat(o.line ? [{ vals: o.line.vals }] : []).reduce(function (a, s) { return a.concat(s.vals.filter(function (v) { return v != null; })); }, []));
    var raw = (max || 1) / 4, mag = Math.pow(10, Math.floor(Math.log10(raw)));
    var step = [1, 2, 2.5, 5, 10].map(function (m) { return m * mag; }).filter(function (v) { return v >= raw; })[0];
    var ticks = Math.ceil(max / step); max = ticks * step;
    var cw = (W - padL) / n, bw = Math.min(26, (cw * 0.72) / ns);
    var y = function (v) { return padT + (H - padT - padB) * (1 - v / max); };
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(o.aria) + '" class="anim">';
    s += "<defs>" + o.series.map(function (se, i) { return se.grad ? '<linearGradient id="g' + o.id + i + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + se.grad[0] + '"/><stop offset="1" stop-color="' + se.grad[1] + '"/></linearGradient>' : ""; }).join("") + "</defs>";
    for (var g = 0; g <= ticks; g++) {
      var gv = step * g, gy = y(gv);
      s += '<line x1="' + padL + '" x2="' + W + '" y1="' + gy + '" y2="' + gy + '" stroke="#EDF0EC"/>';
      s += '<text x="' + (padL - 6) + '" y="' + (gy + 4) + '" font-size="11" fill="#5E6B63" text-anchor="end">' + fmt(gv) + "</text>";
    }
    o.labels.forEach(function (lb, i) {
      var x0 = padL + cw * i + (cw - bw * ns) / 2;
      o.series.forEach(function (se, j) {
        var v = se.vals[i]; if (v == null) return;
        s += '<rect class="bar-y" x="' + (x0 + j * bw + 1) + '" y="' + y(v) + '" width="' + (bw - 2) + '" height="' + (y(0) - y(v)) + '" rx="3" fill="' + (se.grad ? "url(#g" + o.id + j + ")" : se.color) + '"><title>' + esc(lb + " · " + se.name + ": " + fmt(v) + (o.unit || "")) + "</title></rect>";
      });
      s += '<text x="' + (padL + cw * i + cw / 2) + '" y="' + (H - 8) + '" font-size="11.5" fill="#5E6B63" text-anchor="middle" font-weight="' + (o.hi === i ? 800 : 500) + '">' + esc(lb) + "</text>";
    });
    if (o.line) {
      var pts = o.line.vals.map(function (v, i) { return (padL + cw * i + cw / 2) + "," + y(v); }).join(" ");
      s += '<polyline points="' + pts + '" fill="none" stroke="' + o.line.color + '" stroke-width="2" stroke-dasharray="5 5" stroke-linejoin="round"/>';
    }
    return s + "</svg>";
  }

  function legend(items) {
    return '<div class="legend-inline">' + items.map(function (i) {
      return "<span><i style=\"background:" + i[1] + (i[2] ? ";border:1px dashed " + i[1] + ";background:transparent" : "") + '"></i>' + esc(i[0]) + "</span>";
    }).join("") + "</div>";
  }

  /* ---------- Mapa ---------- */
  function mapSVG(o) {
    var B = window.BRASIL, ufs = D.cif.ufs;
    var focus = {}; ufs.forEach(function (u) { focus[u.uf] = u; });
    var vb = o.crop ? "250 250 330 300" : "0 0 " + B.w + " " + B.h;
    var rmax = o.crop ? 46 : 42;
    var s = '<svg class="map-svg anim' + (o.crop ? " crop" : "") + '" viewBox="' + vb + '" role="group" aria-label="Mapa do Brasil com volume programado na semana por UF e risco de chuva">';
    Object.keys(B.uf).forEach(function (k) {
      s += '<path class="uf' + (focus[k] ? " focus" : "") + '" d="' + B.uf[k] + '"><title>' + k + "</title></path>";
    });
    ["MT", "TO", "PR", "RJ", "ES", "DF"].forEach(function (k) {
      if (o.crop || k !== "DF") { var c = B.centro[k]; s += '<text class="uf-lbl" x="' + c[0] + '" y="' + (c[1] + 3) + '">' + k + "</text>"; }
    });
    ufs.slice().sort(function (a, b) { return b.volume - a.volume; }).forEach(function (u, i) {
      var c = B.centro[u.uf], r = Math.max(9, Math.sqrt(u.volume / ufs[0].volume) * rmax);
      var risk = RISCO[u.risco];
      s += '<g class="bub" tabindex="0" role="img" style="animation-delay:' + (i * 0.12) + 's" data-uf="' + u.uf + '" aria-label="' + esc(u.nome + ": " + t(u.volume) + ", risco " + risk[0]) + '">' +
        '<circle class="r-' + u.risco + '" cx="' + c[0] + '" cy="' + c[1] + '" r="' + r.toFixed(1) + '"/>' +
        (r >= 14 ? '<text x="' + c[0] + '" y="' + (c[1] + 4.5) + '">' + u.uf + "</text>" : "") + "</g>";
    });
    return s + "</svg>";
  }

  function mapList() {
    return D.cif.ufs.slice().sort(function (a, b) { return b.volume - a.volume; }).map(function (u) {
      var r = RISCO[u.risco];
      return "<li><strong>" + u.uf + "</strong><span>" + esc(u.nome) + " · <b>" + t(u.volume) + '</b></span><span class="pill ' + r[1] + '">' + r[0] + "</span></li>";
    }).join("");
  }

  var tip = $("#tip");
  function bindMap(root) {
    $$(".bub", root).forEach(function (g) {
      var u = D.cif.ufs.filter(function (x) { return x.uf === g.getAttribute("data-uf"); })[0];
      var show = function () {
        var r = RISCO[u.risco], b = g.getBoundingClientRect();
        tip.innerHTML = "<b>" + esc(u.nome) + " (" + u.uf + ")</b><br>Programado: " + t(u.volume) + "<br>Risco: " + r[0];
        tip.hidden = false;
        var tw = tip.offsetWidth, x = Math.min(window.innerWidth - tw - 8, Math.max(8, b.left + b.width / 2 - tw / 2));
        tip.style.left = x + "px";
        tip.style.top = Math.max(8, b.top - tip.offsetHeight - 8) + "px";
      };
      var hide = function () { tip.hidden = true; };
      g.addEventListener("mouseenter", show); g.addEventListener("focus", show);
      g.addEventListener("mouseleave", hide); g.addEventListener("blur", hide);
    });
  }

  /* ---------- Mockups ---------- */
  var M = {};

  M.supplyHero = function () {
    var S = D.supply;
    return '<div class="mock">' + supplyBand(S) +
      '<div class="panel"><div class="panel-h"><h5>Semana CIF</h5>' + legend([["Programado", "#2563A8"], ["Realizado", "#1F8A55"]]) + "</div>" +
      semanaChart(S, 150) + "</div></div>";
  };

  function supplyBand(S) {
    return '<div class="band"><p class="label">' + esc(S.faixa) + "</p><h4>" + esc(S.manchete) + '</h4><span class="band-pill">' + esc(S.pilula) + '</span><div class="minis">' +
      S.mini.map(function (m) { return '<div class="mini"><span>' + esc(m[0]) + "</span><b>" + esc(m[1]) + "</b></div>"; }).join("") + "</div></div>";
  }
  function semanaChart(S, h) {
    return barChart({
      id: "sem" + h, h: h, labels: S.semana.map(function (d) { return d.dia; }), unit: " t", hi: 4, aria: "Semana CIF: programado e realizado por dia",
      series: [{ name: "Programado", color: "#2563A8", vals: S.semana.map(function (d) { return d.prog; }) },
               { name: "Realizado", color: "#1F8A55", vals: S.semana.map(function (d) { return d.real; }) }]
    });
  }

  M.supply = function () {
    var S = D.supply;
    var rows = S.semana.map(function (d) {
      return "<tr" + (d.hoje ? ' class="today"' : "") + "><td>" + d.dia + (d.hoje ? " (hoje)" : "") + '</td><td class="n">' + t(d.prog) + '</td><td class="n">' +
        (d.real == null ? "—" : t(d.real)) + "</td><td>" + (d.nota ? '<span class="pill bad">' + d.nota + "</span>" : d.real == null ? "" : d.real >= d.prog ? '<span class="pill ok">ok</span>' : d.hoje ? '<span class="pill info">em curso</span>' : '<span class="pill warn">abaixo</span>') + "</td></tr>";
    }).join("");
    return '<div class="mock">' + supplyBand(S) +
      '<div class="shortcuts">' + S.atalhos.map(function (a) { return '<div class="shortcut"><b>' + esc(a[0]) + " ›</b><span>" + esc(a[1]) + "</span></div>"; }).join("") + "</div>" +
      '<div class="two even"><div class="panel"><div class="panel-h"><h5>Semana CIF</h5>' + legend([["Programado", "#2563A8"], ["Realizado", "#1F8A55"]]) + "</div>" + semanaChart(S, 220) + "</div>" +
      '<div class="panel"><div class="tbl-wrap"><table><thead><tr><th>Dia</th><th class="n">Programado</th><th class="n">Realizado</th><th>Status</th></tr></thead><tbody>' + rows + "</tbody></table></div></div></div>" +
      '<p class="mock-note">Gerado de hora em hora · dado de hoje, 09:00 · fonte: ERP + planilhas do time</p></div>';
  };

  function ring(pct, color) {
    var r = 16, c = 2 * Math.PI * r;
    return '<svg class="ring" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="' + r + '" fill="none" stroke="#EDF0EC" stroke-width="5"/><circle cx="20" cy="20" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="5" stroke-linecap="round" stroke-dasharray="' + (c * pct / 100).toFixed(1) + " " + c.toFixed(1) + '" transform="rotate(-90 20 20)"/></svg>';
  }

  M.cliente = function () {
    var C = D.cliente, K = C.kpis;
    var kp = '<div class="kpis k4">' +
      '<div class="kpi"><p class="label">Vendido</p><p class="kpi-num c-sold">' + count(K.vendido, " t") + '</p><p class="sub"><span class="up">▲ ' + fmt(K.varVendido, 1) + "%</span> vs 2025</p></div>" +
      '<div class="kpi"><p class="label">Faturado</p><p class="kpi-num c-billed">' + count(K.faturado, " t") + '</p><p class="sub">' + ring(K.atendimento, "#1F8A55") + K.atendimento + "% atendimento</p></div>" +
      '<div class="kpi"><p class="label">Saldo em carteira</p><p class="kpi-num c-backlog">' + count(K.saldo, " t") + '</p><div class="split" aria-hidden="true"><i style="width:' + K.convencional + '%"></i><i style="width:' + K.parceria + '%"></i></div><p class="sub">convencional ' + K.convencional + "% · parceria " + K.parceria + "%</p></div>" +
      '<div class="kpi"><p class="label">Cadenciado no mês</p><p class="kpi-num c-cadence">' + count(K.cadenciado, " t") + '</p><p class="sub">outubro 2026</p></div></div>';
    var chart = '<div class="panel"><div class="panel-h"><h5>Mês a mês · índice (jan/2025 = 100)</h5>' + legend([["Vendido", "#C48E2C"], ["Faturado", "#1F8A55"], ["Vendido 2025", "#8A5A0F", true]]) + "</div>" +
      barChart({ id: "cli", h: 230, labels: C.meses, unit: "", hi: 9, aria: "Vendido e faturado mês a mês em índice, com linha tracejada de 2025",
        series: [{ name: "Vendido", grad: ["#D6A23F", "#B37B1C"], vals: C.vendido }, { name: "Faturado", color: "#1F8A55", vals: C.faturado }],
        line: { vals: C.vendido2025, color: "#8A5A0F" } }) + "</div>";
    var max = C.maiores[0].vendido;
    var top = '<div class="panel"><div class="panel-h"><h5>Maiores clientes</h5></div><div class="hbars anim">' + C.maiores.map(function (m) {
      return '<div class="hbar"><span>' + esc(m.nome) + "</span><b>" + t(m.vendido) + '</b><div class="track"><i class="bar-x" style="width:' + (m.vendido / max * 100).toFixed(1) + '%"></i></div></div>';
    }).join("") + "</div></div>";
    var rows = C.maiores.map(function (m) {
      var at = Math.round(m.faturado / m.vendido * 100);
      return "<tr><td>" + esc(m.nome) + '</td><td class="n">' + t(m.vendido) + '</td><td class="n">' + t(m.faturado) + '</td><td><span class="minibar"><i style="width:' + at + '%"></i></span>' + at + '%</td><td class="n">' + t(m.vendido - m.faturado) + "</td><td>" + m.ult + '</td><td><button type="button" class="link-like" data-present style="border:0;background:none;padding:0">Apresentar ›</button></td></tr>';
    }).join("");
    return '<div class="mock">' + kp + '<div class="two">' + chart + top + "</div>" +
      '<div class="panel"><div class="tbl-wrap"><table><thead><tr><th>Cliente</th><th class="n">Vendido</th><th class="n">Faturado</th><th>Atendimento</th><th class="n">Saldo</th><th>Últ. carregamento</th><th></th></tr></thead><tbody>' + rows + "</tbody></table></div></div></div>";
  };

  M.cif = function () {
    var C = D.cif;
    var kp = '<div class="kpis k3">' + C.kpis.map(function (k) { return '<div class="kpi"><p class="label">' + k[0] + '</p><p class="kpi-num ' + k[2] + '">' + count(k[1], " t") + "</p></div>"; }).join("") + "</div>";
    var days = '<div class="days">' + C.dias.map(function (d) {
      return '<div class="day"><b>' + d.dia + '</b><span class="muted">Prog. ' + t(d.prog) + "</span><span>Real. " + (d.real == null ? "—" : t(d.real)) + '</span><span class="pill ' + CHUVA[d.chuva] + '">' + d.chuva + "</span></div>";
    }).join("") + "</div>";
    var rows = C.tabela.map(function (r) {
      return "<tr><td>" + esc(r.cliente) + "</td><td>" + esc(r.mun) + '</td><td class="n">' + t(r.pot) + '</td><td class="n">' + t(r.prog) + '</td><td class="n">' + t(r.real) + '</td><td><span class="pill ' + CHUVA[r.chuva] + '">' + r.chuva + "</span></td></tr>";
    }).join("");
    return '<div class="mock">' + kp + days +
      '<div class="panel"><div class="panel-h"><h5>Risco de chuva por UF</h5>' + legend([["Seco", "#1F8A55"], ["Atenção", "#D9792F"], ["Chuva forte", "#B42318"]]) + '</div><div class="map-big">' + mapSVG({ crop: true }) + '</div><ol class="map-list">' + mapList() + "</ol></div>" +
      '<div class="panel"><div class="tbl-wrap"><table><thead><tr><th>Cliente</th><th>Município</th><th class="n">Potencial</th><th class="n">Programado</th><th class="n">Realizado</th><th>Chuva</th></tr></thead><tbody>' + rows + "</tbody></table></div>" +
      '<p class="mock-note">Mediana de 3 modelos · confiança cai com a antecedência · cancelar carga só no D-1</p></div></div>';
  };

  var MP_SCALE = 160, MP_SIM = 1.25;
  function mpStatus(c) { return c < 50 ? ["FALTA", "bad"] : c < 100 ? ["ATENÇÃO", "warn"] : ["OK", "ok"]; }
  function mpRows(sim) {
    return D.mp.itens.map(function (it) {
      var c = sim ? it.cobertura / MP_SIM : it.cobertura, st = mpStatus(c);
      var w = Math.min(c, MP_SCALE) / MP_SCALE * 100, w0 = Math.min(it.cobertura, MP_SCALE) / MP_SCALE * 100;
      return '<div class="cov-row"><span>' + esc(it.nome) + '</span><span class="meta"><b>' + Math.round(c) + '%</b><span class="pill ' + st[1] + '">' + st[0] + "</span></span>" +
        '<div class="cov-track" aria-hidden="true"><i class="bar-x" style="width:' + w.toFixed(1) + '%"></i>' + (sim ? '<em style="left:' + w.toFixed(1) + "%;width:" + (w0 - w).toFixed(1) + '%"></em>' : "") +
        '<span class="cov-mark" style="left:' + (100 / MP_SCALE * 100).toFixed(1) + '%"></span></div></div>';
    }).join("");
  }
  M.mp = function () {
    var P = D.mp;
    var kp = '<div class="kpis k4">' + P.kpis.map(function (k) { return '<div class="kpi"><p class="label">' + k[0] + '</p><p class="kpi-num ' + k[2] + '">' + k[1] + "</p>" + (k[3] ? '<p class="sub">' + k[3] + "</p>" : "") + "</div>"; }).join("") + "</div>";
    return '<div class="mock">' + kp + '<div class="panel"><div class="panel-h"><h5>Cobertura por matéria-prima · menor primeiro</h5><div style="display:flex;gap:8px;flex-wrap:wrap">' +
      '<button type="button" class="btn btn-ghost btn-sm" data-mp-det aria-expanded="false">Detalhes dos produtos</button>' +
      '<button type="button" class="btn btn-sim btn-sm" data-mp-sim aria-pressed="false">Simular venda</button></div></div>' +
      '<p class="sim-note" data-mp-note hidden>Simulação: pedido hipotético de +25% na cadência. Nada foi vendido.</p>' +
      '<div class="cov anim" data-mp-rows>' + mpRows(false) + "</div>" +
      '<div class="cov-legend"><span>Barra azul = estoque de hoje</span><span>Marca preta = saldo de cadência (100%)</span><span class="c-sim">Hachurado roxo = consumo do pedido hipotético</span></div>' +
      '<div data-mp-detail hidden style="margin-top:12px"><div class="tbl-wrap"><table><thead><tr><th>Produto (fictício)</th><th>Fórmula</th></tr></thead><tbody>' +
      "<tr><td>Produto A</td><td>Fosfato 140 · Gesso</td></tr><tr><td>Produto B</td><td>Silicato MG+ · Óxido de magnésio</td></tr><tr><td>Produto C</td><td>Silicato Plus · Fosfato 100</td></tr>" +
      "</tbody></table></div></div></div></div>";
  };

  M.precos = function () {
    var P = D.precos;
    var pill = function (s) { return '<span class="pill ' + (s === "aprovada" ? "ok" : "warn") + '">' + s + "</span>"; };
    return '<div class="mock"><div class="phone-row">' +
      '<div class="app-screen"><div class="app-bar">Versões da lista <span>filtro: todas</span></div><ul class="app-list">' +
      P.versoes.map(function (v) { return "<li><span>" + esc(v.nome) + "<small>alterada em " + v.data + "</small></span>" + pill(v.status) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="app-screen"><div class="app-bar">Composição · Produto A <span>v3 · em revisão</span></div><ul class="app-list">' +
      P.composicao.map(function (c, i) { return "<li" + (i === P.composicao.length - 1 ? ' class="total"' : "") + "><span>" + esc(c) + '</span><span class="rs">R$ --</span></li>'; }).join("") +
      '<li><span><small>Trava: valores fora da faixa esperada bloqueiam a aprovação</small></span><span class="pill sim">futuro = simulação</span></li></ul></div>' +
      '</div><p class="mock-note">Só a estrutura do app. Nenhum preço, custo ou margem é exibido.</p></div>';
  };

  M.rotina = function () {
    var R = D.rotina, map = { alto: "bad", medio: "warn", baixo: "ok" }, lbl = { alto: "alto", medio: "médio", baixo: "baixo" };
    return '<div class="mock"><div class="email"><div class="email-meta"><span><b>Para:</b> gerentes da regional</span><span><b>Assunto:</b> Ações da semana · sexta-feira</span></div>' +
      '<div class="email-head"><b>Ações da semana · ' + esc(R.regional) + "</b><span>Gerado automaticamente · carteira de alto risco atualizada hoje</span></div>" +
      '<div class="email-body"><p>Bom dia! Abaixo, os contratos que pedem ação nesta semana, ordenados pelo score de risco.</p><div class="tbl-wrap"><table><thead><tr><th>Contrato</th><th>Cliente</th><th class="n">Saldo</th><th>Motivo principal</th><th>Risco</th></tr></thead><tbody>' +
      R.contratos.map(function (c) { return "<tr><td>" + c.contrato + "</td><td>" + esc(c.cliente) + '</td><td class="n">' + t(c.saldo) + "</td><td>" + esc(c.motivo) + '</td><td><span class="pill ' + map[c.risco] + '">' + lbl[c.risco] + "</span></td></tr>"; }).join("") +
      '</tbody></table></div><p class="muted small">Score com 9 critérios · comparação com a média do mesmo período dos anos anteriores.</p></div></div></div>';
  };

  M.erp = function () {
    var n = function (b, s, core) { return '<div class="flow-node' + (core ? " core" : "") + '"><b>' + b + "</b><span>" + s + "</span></div>"; };
    var a = '<div class="flow-arrow" aria-hidden="true">→</div>';
    return '<div class="mock"><div class="panel"><div class="flow">' + n("ERP", "estoque, pedidos, contratos, notas") + a + n("Power Query", "consultas de leitura no Excel") + a +
      n("Python", "de hora em hora", true) + a + n("Planilhas + painéis", "time, painéis HTML, e-mails") + '</div></div>' +
      '<div class="panel" style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between"><span class="seal">dado de hoje, 09:00</span>' +
      '<span class="small muted">Se o banco não responder, os painéis usam o último retrato local e mostram o aviso.</span></div></div>';
  };

  function bindMock(root) {
    bindMap(root);
    var sim = $("[data-mp-sim]", root);
    if (sim) sim.addEventListener("click", function () {
      var on = sim.getAttribute("aria-pressed") !== "true";
      sim.setAttribute("aria-pressed", on);
      $("[data-mp-rows]", root).innerHTML = mpRows(on);
      $("[data-mp-note]", root).hidden = !on;
    });
    var det = $("[data-mp-det]", root);
    if (det) det.addEventListener("click", function () {
      var box = $("[data-mp-detail]", root), on = box.hidden;
      box.hidden = !on; det.setAttribute("aria-expanded", on);
    });
    $$("[data-present]", root).forEach(function (b) {
      b.addEventListener("click", function () { closeModal(); goSlide(0); $("#apresentacao").scrollIntoView({ behavior: REDUCE ? "auto" : "smooth" }); $("#carousel").focus({ preventScroll: true }); });
    });
    observe(root);
  }

  /* ---------- Animações ao entrar na tela ---------- */
  function animateCount(el) {
    var end = parseFloat(el.getAttribute("data-count")), dec = +el.getAttribute("data-dec") || 0;
    var pre = el.getAttribute("data-prefix") || "", suf = el.getAttribute("data-suffix") || "";
    var set = function (v) { el.textContent = pre + fmt(v, dec) + suf; };
    if (REDUCE || end === 0) return set(end);
    var t0 = null, dur = 1200;
    var step = function (ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      set(end * e);
      if (p < 1) requestAnimationFrame(step);
    };
    set(0); requestAnimationFrame(step);
  }
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target; io.unobserve(el);
      if (el.hasAttribute("data-count")) animateCount(el); else el.classList.add("in");
    });
  }, { threshold: 0.25 }) : null;
  function observe(root) {
    $$(".anim, [data-count]", root).forEach(function (el) {
      if (el.closest(".slide")) return;
      if (io && !REDUCE) io.observe(el); else el.classList.add("in");
    });
    if (root.matches && root.matches(".anim") && io && !REDUCE) io.observe(root);
  }

  /* ---------- Contadores ---------- */
  var cs = D.contadores.filter(function (c) { return !c.confirmar || D.mostrarNaoConfirmados; });
  var ul = $("#counters");
  ul.classList.add("n" + cs.length);
  ul.innerHTML = cs.map(function (c) {
    return '<li class="counter"><div class="big">' + count(c.valor, c.sufixo, c.prefixo) + "</div><p>" + esc(c.legenda) + "</p></li>";
  }).join("");

  /* ---------- Projetos ---------- */
  var grid = $("#proj-grid");
  grid.innerHTML = D.projetos.map(function (p) {
    return '<li data-f="' + p.filtros.join(" ") + '"><button type="button" class="proj" data-slug="' + p.slug + '" aria-haspopup="dialog">' +
      '<span class="proj-ico">' + icon(p.icone) + "</span><h3>" + esc(p.titulo) + "</h3>" +
      '<p class="pb"><b>Problema</b>' + esc(p.problema) + '</p><p class="pb"><b>Solução</b>' + esc(p.solucao) + "</p>" +
      "<ul>" + p.bullets.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul>" +
      '<span class="tags">' + p.tags.map(function (x) { return '<span class="tag">' + esc(x) + "</span>"; }).join("") + "</span>" +
      '<span class="open">Abrir demonstração ›</span></button></li>';
  }).join("") + '<li data-f="todos"><div class="proj proj-cta"><h3>Quer ver como isso funciona na prática?</h3>' +
    '<p class="pb">Mostro o fluxo completo numa conversa: do dado bruto ao painel que o time usa todo dia.</p>' +
    '<a class="btn btn-light btn-sm" href="#contato">Falar comigo</a></div></li>';

  $$("#filters .seg-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var f = b.getAttribute("data-f");
      $$("#filters .seg-btn").forEach(function (x) { x.classList.toggle("is-on", x === b); x.setAttribute("aria-pressed", x === b); });
      $$("#proj-grid > li").forEach(function (li) {
        var show = f === "todos" || li.getAttribute("data-f").split(" ").indexOf(f) > -1;
        if (show) { li.hidden = false; requestAnimationFrame(function () { li.classList.remove("fading"); }); }
        else if (!li.hidden) { li.classList.add("fading"); setTimeout(function () { if (li.classList.contains("fading")) li.hidden = true; }, REDUCE ? 0 : 280); }
      });
    });
  });

  /* ---------- Modal ---------- */
  var modal = $("#modal"), box = $(".modal-box", modal), body = $("#modal-body"), lastFocus = null;
  function openModal(slug, opener) {
    var p = D.projetos.filter(function (x) { return x.slug === slug; })[0];
    if (!p) return;
    lastFocus = opener || document.activeElement;
    body.innerHTML = '<div class="case-head"><p class="eyebrow">' + p.tags.slice(0, 3).map(esc).join(" · ") + '</p><h3 id="modal-title">' + esc(p.titulo) + "</h3></div>" +
      M[p.mockup]() +
      '<div class="case-grid"><div class="case-box"><span class="label">Problema</span>' + esc(p.problema) + '</div><div class="case-box"><span class="label">Solução</span>' + esc(p.solucao) + "</div>" +
      '<div class="case-box"><span class="label">Destaques</span><ul>' + p.bullets.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul></div></div>" +
      '<div class="tags">' + p.tags.map(function (x) { return '<span class="tag">' + esc(x) + "</span>"; }).join("") + "</div>" +
      '<p class="mock-note">Demonstração recriada em HTML/CSS. Dados fictícios em escala ilustrativa.</p>';
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    box.scrollTop = 0;
    bindMock(body);
    box.focus();
    if (location.hash !== "#projeto-" + slug) history.replaceState(null, "", "#projeto-" + slug);
  }
  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true; tip.hidden = true;
    document.body.style.overflow = "";
    if (/^#projeto-/.test(location.hash)) history.replaceState(null, "", location.pathname + location.search);
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }
  grid.addEventListener("click", function (e) {
    var b = e.target.closest(".proj"); if (b) openModal(b.getAttribute("data-slug"), b);
  });
  $$("[data-close]", modal).forEach(function (el) { el.addEventListener("click", closeModal); });
  document.addEventListener("keydown", function (e) {
    if (modal.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); closeModal(); return; }
    if (e.key !== "Tab") return;
    var f = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select', box).filter(function (x) { return x.offsetParent !== null || x.closest("svg"); });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === box)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  function fromHash() {
    var m = location.hash.match(/^#projeto-(.+)$/);
    if (m) openModal(m[1], $('.proj[data-slug="' + m[1] + '"]'));
    else closeModal();
  }
  window.addEventListener("hashchange", fromHash);

  /* ---------- Carrossel ---------- */
  var S = D.slides;
  var slides = [
    '<div class="slide slide-cover"><p class="label">Modo apresentação · Painel do cliente</p><h3>Posição de carteira · ' + S.periodo + '</h3><p class="sl-sub">' + esc(S.cliente) + "</p></div>",

    '<div class="slide"><p class="label">1 · Onde estamos</p><h3><em>' + count(S.aRetirar, " t") + "</em> a retirar, de " + t(S.contratado) + ' contratadas</h3>' +
      '<div class="sl-bar-lbl"><span>Retirado ' + fmt(S.retiradoPct, 1) + "%</span><span>a retirar " + fmt(100 - S.retiradoPct, 1) + '%</span></div><div class="sl-bar"><i class="bar-x" style="width:' + S.retiradoPct + '%"></i></div>' +
      '<div class="sl-cards">' + S.vencimentos.map(function (v) { return '<div class="sl-card ' + v[2] + '"><span>' + v[0] + "</span><b>" + count(v[1], " t") + "</b></div>"; }).join("") + "</div></div>",

    '<div class="slide"><p class="label">2 · O mês</p><h3>No ritmo atual, outubro fecha em <em>~' + t(S.mes.projecao) + "</em>: faltam " + t(S.mes.falta) + ' para a cadência</h3>' +
      '<div class="sl-cards" style="--n:4"><div class="sl-card"><span>Cadenciado</span><b>' + count(S.mes.cadenciado, " t") + '</b></div><div class="sl-card ok"><span>Faturado até hoje</span><b>' + count(S.mes.faturado, " t") +
      '</b></div><div class="sl-card"><span>Projeção</span><b>~' + t(S.mes.projecao) + '</b></div><div class="sl-card warn"><span>Saldo de cadência</span><b>' + count(S.mes.saldoCadencia, " t") + "</b></div></div>" +
      '<div class="rail"><s style="width:' + (S.mes.projecao / S.mes.cadenciado * 100).toFixed(1) + '%"></s><i class="bar-x" style="width:' + (S.mes.faturado / S.mes.cadenciado * 100).toFixed(1) + '%"></i>' +
      '<span class="mk" style="left:' + S.mes.proRataPct + '%"><span>pro-rata</span></span><span class="mk cad" style="left:calc(100% - 3px)"><span>cadência</span></span></div>' +
      '<p class="sl-sub">Para cumprir: <strong>' + S.mes.porDia + " t por dia útil</strong> nos " + S.mes.diasRestantes + " dias que faltam.</p></div>",

    (function () {
      var max = Math.max.apply(null, S.historico.map(function (h) { return h[1]; }));
      return '<div class="slide"><p class="label">3 · Histórico na mesma janela</p><h3>Retiradas de jan a out, ano a ano</h3><div class="sl-hist">' +
        S.historico.map(function (h) { return "<div><b>" + (h[2] ? "~" : "") + t(h[1]) + '</b><i class="bar-y' + (h[2] ? " proj" : "") + '" style="height:' + (h[1] / max * 78).toFixed(1) + '%"></i><span>' + h[0] + "</span></div>"; }).join("") + "</div></div>";
    })(),

    (function () {
      var max = S.unidades[0][1], st = { acelerar: ["acelerar", "warn"], ok: ["no ritmo", "ok"], atencao: ["atenção", "bad"] };
      return '<div class="slide"><p class="label">4 · Por unidade</p><h3>Saldo a retirar por unidade</h3><ul class="sl-units">' +
        S.unidades.map(function (u) { return "<li><span>" + u[0] + '</span><span class="track"><i class="bar-x" style="width:' + (u[1] / max * 100).toFixed(1) + '%"></i></span><b>' + t(u[1]) + '</b><span class="pill ' + st[u[2]][1] + '">' + st[u[2]][0] + "</span></li>"; }).join("") + "</ul></div>";
    })()
  ];
  var track = $("#car-track"), dots = $("#car-dots"), cur = 0;
  track.innerHTML = slides.join("");
  var slideEls = $$(".slide", track);
  slideEls.forEach(function (s, i) { s.setAttribute("role", "group"); s.setAttribute("aria-roledescription", "slide"); s.setAttribute("aria-label", (i + 1) + " de " + slides.length); s.classList.add("anim"); });
  dots.innerHTML = slides.map(function (_, i) { return '<button type="button" aria-label="Ir para o slide ' + (i + 1) + '"></button>'; }).join("");
  var dotEls = $$("button", dots);
  function goSlide(i) {
    cur = (i + slides.length) % slides.length;
    track.style.transform = "translateX(-" + cur * 100 + "%)";
    slideEls.forEach(function (s, j) {
      var on = j === cur;
      s.setAttribute("aria-hidden", !on);
      if (on) { s.classList.remove("in"); void s.offsetWidth; s.classList.add("in"); $$("[data-count]", s).forEach(animateCount); }
    });
    dotEls.forEach(function (d, j) { d.setAttribute("aria-current", j === cur ? "true" : "false"); });
    $("#car-live").textContent = "Slide " + (cur + 1) + " de " + slides.length;
  }
  $("#car-prev").addEventListener("click", function () { goSlide(cur - 1); });
  $("#car-next").addEventListener("click", function () { goSlide(cur + 1); });
  dotEls.forEach(function (d, i) { d.addEventListener("click", function () { goSlide(i); }); });
  $("#carousel").addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); goSlide(cur - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); goSlide(cur + 1); }
  });
  var sx = null, sy = null, stage = $(".car-stage");
  stage.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener("touchend", function (e) {
    if (sx == null) return;
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) goSlide(cur + (dx < 0 ? 1 : -1));
    sx = null;
  });
  slideEls.forEach(function (s) { s.classList.remove("anim"); });
  goSlide(0);
  if (io && !REDUCE) {
    slideEls.forEach(function (s) { s.classList.add("anim"); s.classList.remove("in"); });
    var cio = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { cio.disconnect(); goSlide(cur); } }, { threshold: 0.4 });
    cio.observe($("#carousel"));
  }

  /* ---------- Mapa grande ---------- */
  $("#map-big").innerHTML = mapSVG({ crop: false });
  $("#map-list").innerHTML = mapList();
  bindMap($("#mapa"));

  /* ---------- Seções de texto ---------- */
  $("#principles").innerHTML = D.principios.map(function (p, i) {
    return '<li class="principle"><span class="n">' + (i + 1) + "</span><h3>" + esc(p.titulo) + "</h3><p>" + esc(p.texto) + "</p></li>";
  }).join("");
  $("#timeline").innerHTML = D.trajetoria.map(function (x) {
    return '<li class="tl tl-' + x.tipo + '"><time>' + esc(x.quando) + "</time><p>" + esc(x.marco) + "</p></li>";
  }).join("");
  $("#tools").innerHTML = D.ferramentas.map(function (g) {
    return '<div class="tool-grp"><h3>' + esc(g.grupo) + '</h3><div class="chips">' + g.itens.map(function (i) { return '<span class="chip">' + esc(i) + "</span>"; }).join("") + "</div></div>";
  }).join("");
  if (D.certificacoes.length) {
    $("#certs").innerHTML = D.certificacoes.map(function (c) { return "<li><strong>" + esc(c.nome) + "</strong> · " + esc(c.instituicao) + (c.ano ? " · " + esc(c.ano) : "") + "</li>"; }).join("");
    $("#certs-card").hidden = false;
  }

  /* ---------- Herói ---------- */
  $("#hero-mock").innerHTML = M.supplyHero();

  /* ---------- Topo e menu ---------- */
  var top = $("#topo"), burger = $("#burger"), menu = $("#menu");
  var onScroll = function () { top.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  burger.addEventListener("click", function () {
    var open = burger.getAttribute("aria-expanded") !== "true";
    burger.setAttribute("aria-expanded", open); burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("open", open);
  });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { burger.setAttribute("aria-expanded", "false"); menu.classList.remove("open"); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("open")) { burger.click(); burger.focus(); } });

  observe(document);
  fromHash();
})();
