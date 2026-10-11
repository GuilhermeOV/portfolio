/* Idioma da página: português (padrão) ou inglês americano.
   Ordem de escolha: ?lang= na URL > escolha salva > idioma do navegador. */
(function () {
  "use strict";

  var KEY = "gv-lang";
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var param = (location.search.match(/[?&]lang=(pt|en)\b/) || [])[1];
  var nav = (navigator.languages && navigator.languages[0]) || navigator.language || "pt";
  var lang = param || store.get(KEY) || (/^pt/i.test(nav) ? "pt" : "en");
  if (param) store.set(KEY, param);
  var EN = lang === "en";

  window.I18N = {
    lang: lang,
    locale: EN ? "en-US" : "pt-BR",
    /* tr("texto em português", "English text") devolve o texto do idioma atual */
    tr: function (pt, en) { return EN ? en : pt; }
  };

  /* Textos fixos do index.html em inglês, pelas chaves data-i18n */
  var PAGE_EN = {
    "skip": "Skip to content",
    "brand": "Guilherme Vital, back to top",
    "nav": "Sections",
    "nav.projetos": "Projects",
    "nav.impacto": "Impact",
    "nav.trajetoria": "Experience",
    "nav.ferramentas": "Tools",
    "nav.contato": "Contact",
    "nav.cv": "Download resume",
    "hero.eyebrow": "Data &amp; BI Analyst · Demand Planning and Supply Chain",
    "hero.pitch": "I turn scattered spreadsheets into <strong>live dashboards, automations and decision tools</strong>, from order to truck, from raw material to the Friday email.",
    "hero.ver": "See projects",
    "hero.falar": "Get in touch",
    "hero.sub": "Uberaba, MG, Brazil · open to on-site, hybrid and remote roles.",
    "hero.art": "Supply Hub demo with fictional data",
    "sobre.t": "About",
    "sobre.p1": "I work where sales, logistics and production meet, at <strong>an agricultural inputs manufacturer in Minas Gerais, Brazil</strong>. With AI as my copilot, I built an S&amp;OE ecosystem that runs every hour: it reads the ERP, feeds the team's spreadsheets, generates the daily dashboards, calculates raw material consumption, schedules loads around the rain forecast, drafts the weekly emails for each region and turns a customer's backlog into a meeting-ready presentation.",
    "sobre.p2": "Before data, I spent more than 4 years in operations: tracking high-risk cargo and clearing trucks at the shipping dock. That's why my dashboards speak the language of both the loading yard and the meeting room.",
    "impacto.t": "Impact in numbers",
    "impacto.note": "Process metrics, not business figures.",
    "proj.eyebrow": "What I've built",
    "proj.t": "Projects in production",
    "proj.lead": "Tools used every day. Click a card to open the demo with fictional data.",
    "proj.filtro": "Filter projects by type",
    "f.todos": "All",
    "f.paineis": "Dashboards",
    "f.automacao": "Automation",
    "f.dados": "Data",
    "apres.eyebrow": "Highlight · Customer Dashboard",
    "apres.t": "Presentation mode",
    "apres.lead": "One button turns the filtered view into slides ready for the customer meeting. Use the arrows, the dots or the ← → keys.",
    "apres.car": "Presentation mode slides",
    "apres.prev": "Previous slide",
    "apres.next": "Next slide",
    "apres.dots": "Choose a slide",
    "mapa.eyebrow": "Highlight · CIF Shipment Scheduling",
    "mapa.t": "Rain risk map",
    "mapa.lead": "This week's scheduled volume by state and rain risk at the destination. Rain is the median of 3 weather models, benchmarked against observed data; loads are only canceled the day before (D-1).",
    "mapa.prog": "Scheduled this week",
    "mapa.seco": "Dry",
    "mapa.atencao": "Watch · light rain",
    "mapa.forte": "Heavy rain",
    "mapa.dica": "Bubble size = volume. Hover over or focus a bubble to see state, volume and risk.",
    "como.eyebrow": "How I think",
    "como.t": "How I work",
    "eco.t": "The ecosystem",
    "eco.aria": "Flow: ERP, then Python every hour, feeding team spreadsheets, HTML dashboards, weekly emails and presentations",
    "eco.erp": "orders, contracts, inventory, invoices",
    "eco.py": "every hour · scheduled",
    "eco.o1": "Team spreadsheets",
    "eco.o2": "HTML dashboards",
    "eco.o3": "Weekly emails",
    "eco.o4": "Presentations",
    "traj.eyebrow": "Where I come from",
    "traj.t": "Experience",
    "ferr.eyebrow": "What I build with",
    "ferr.t": "Tools",
    "form.eyebrow": "Background",
    "form.t": "Education",
    "form.grad": "Degree",
    "form.curso": "Bachelor's in Information Systems",
    "form.uniube": "Uniube – University of Uberaba · expected Dec 2026",
    "form.idiomas": "Languages",
    "form.ingles": "Portuguese (native) · English (intermediate)",
    "form.certs": "Courses and certifications",
    "contato.t": "Let's talk",
    "contato.p": "I'm looking for roles in data, BI, systems and planning.",
    "contato.cv": "Download resume (PDF)",
    "contato.email": "Email",
    "contato.fone": "+55 34 99983-1256",
    "rodape.c": "© 2026 Guilherme Oliveira Vital · Uberaba, MG, Brazil",
    "rodape.aviso": "<strong>All demo data is fictional.</strong>",
    "fechar": "Close",
    "cv": "resume-guilherme-vital.pdf"
  };

  if (EN) {
    document.documentElement.lang = "en";
    document.title = "Guilherme Vital · Data & BI Analyst | Planning and Supply Chain";
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Dashboards, Python automations and decision tools for planning, logistics and sales. Portfolio with demos built on fictional data.");
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (el) {
      var v = PAGE_EN[el.getAttribute("data-i18n")];
      if (v != null) el.innerHTML = v;
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-aria]"), function (el) {
      var v = PAGE_EN[el.getAttribute("data-i18n-aria")];
      if (v != null) el.setAttribute("aria-label", v);
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-href]"), function (el) {
      var v = PAGE_EN[el.getAttribute("data-i18n-href")];
      if (v != null) el.setAttribute("href", v);
    });
  }

  /* Botão PT | EN: salva a escolha e recarrega no mesmo ponto da página */
  Array.prototype.forEach.call(document.querySelectorAll("[data-lang]"), function (b) {
    var on = b.getAttribute("data-lang") === lang;
    b.setAttribute("aria-pressed", on ? "true" : "false");
    b.addEventListener("click", function () {
      var to = b.getAttribute("data-lang");
      if (to === lang) return;
      store.set(KEY, to);
      try { sessionStorage.setItem("gv-scroll", String(window.scrollY)); } catch (e) {}
      var q = location.search.replace(/([?&])lang=(pt|en)&?/, "$1").replace(/[?&]$/, "");
      location.replace(location.pathname + (q ? q + "&" : "?") + "lang=" + to + location.hash);
    });
  });
  try {
    var y = sessionStorage.getItem("gv-scroll");
    if (y != null) {
      sessionStorage.removeItem("gv-scroll");
      window.addEventListener("load", function () { window.scrollTo({ top: +y, behavior: "instant" }); });
    }
  } catch (e) {}
})();
