/*
 * Textos em inglês (EUA) dos dados de data.js. Só os campos de texto são sobrescritos,
 * na mesma posição de cada lista; números e chaves internas continuam vindo de data.js.
 * null = mantém o valor de data.js.
 */
window.PORTFOLIO_EN = {
  contadores: [
    { legenda: "dashboards and tools in production" },
    { legenda: "between automatic refreshes" },
    { legenda: "freed up per week: the consolidation that took every morning now runs on its own" },
    { legenda: "less time on the first refresh of the day, from 18 to ~8 min" },
    { legenda: "faster spreadsheet reads, from 175 s to 19 s" },
    { legenda: "weather models combined in the rain forecast" },
    { legenda: "external dependencies in the dashboards: a single HTML file that works offline" }
  ],

  principios: [
    { titulo: "Measure, don't assume.", texto: "Every number is checked two different ways before it goes on screen. The rain forecast, for example, was benchmarked against observed data before I picked the models." },
    { titulo: "Explain it as you ship it.", texto: "Every dashboard shows where each number comes from and how fresh the data is." },
    { titulo: "Quiet alerts.", texto: "Alerts only show up when something is wrong; everything else lives in the hover." }
  ],

  trajetoria: [
    { quando: "Dec 2026", marco: "Expected graduation: Bachelor's in Information Systems (Uniube)" },
    { quando: "Oct 2026", marco: "Direct ERP reads, price list app and presentation mode" },
    { quando: "Sep 2026", marco: "Daily dashboards and rain risk map" },
    { quando: "Jun 2026", marco: "First Python automation scripts" },
    { quando: "Dec 2025", marco: "Planning Analyst: promoted within 7 months" },
    { quando: "Jun 2025", marco: "Shipping Assistant: driver screening, clearing trucks for loading and issuing invoices (NF-e)" },
    { quando: "Jun 2021 – Jan 2025", marco: "Tracking Operator (Bravo Serviços Logísticos): monitored agrochemical shipments via Autotrac, from trip setup to delivery, contacting the police in risk situations" }
  ],

  ferramentas: [
    { grupo: "Data & automation", itens: [null, "SQL Server (read-only)", null, "Windows Task Scheduler", "Automatic backups before every write"] },
    { grupo: "BI & visualization", itens: [null, null, "Advanced Excel", "Vanilla HTML/CSS/JavaScript", null] },
    { grupo: "Apps" },
    { grupo: "APIs & public data", itens: [null, "IBGE geographic boundaries"] },
    { grupo: "Systems", itens: ["Protheus/TOTVS ERP", null] },
    { grupo: "AI", itens: ["Claude Code as a development copilot", "Claude Design for visual prototypes"] }
  ],

  projetos: [
    {
      titulo: "Supply Hub + automated hourly run",
      problema: "Every team looked at a different spreadsheet, updated by hand.",
      solucao: "A single entry point with the month's KPIs and links to every dashboard, rebuilt every hour by a scheduled job.",
      bullets: [
        "Auto-generated headline of the day: “Billing is at N% of pro-rata, X t behind where it should be today.”",
        "The first run pulls from the ERP once and writes 3 team spreadsheets in parallel; each dashboard starts as soon as its data lands.",
        "First run cut from ~18 to ~8 min."
      ],
      tags: [null, "Windows Task Scheduler", null, "Dependency-free HTML/CSS/JS"]
    },
    {
      titulo: "Customer Dashboard + presentation mode",
      problema: "Customer meetings were put together by hand in PowerPoint, with outdated numbers.",
      solucao: "A dashboard of sales, billing, backlog and delivery schedule by customer, group and product (2023 to date), with a “Present” button that turns the current filter into full-screen slides.",
      bullets: [
        "9 auto-generated slides, from “where we stand” to “next steps.”",
        "Transitions, count-up numbers and PDF export with one slide per page.",
        "Same data as the dashboard, so the slides are never out of date."
      ]
    },
    {
      titulo: "CIF Shipment Scheduling",
      problema: "Planning the month's loads without knowing what had shipped, what was left and whether it would rain at the destination.",
      solucao: "A daily dashboard by customer × city with potential, scheduled and shipped volume, plus rain risk.",
      bullets: [
        "Rain = median of 3 weather models, chosen after benchmarking against observed data; the tooltip shows the hit rate for that lead time (loads are only canceled at D-1).",
        "Custom SVG map of Brazil (IBGE boundaries embedded) with state → micro-region → city zoom, bubbles sized by volume and colored by risk.",
        "Reconciles the official source with the analysts' spreadsheets day by day, without double-counting an invoice."
      ]
    },
    {
      titulo: "Raw Material Consumption Explosion",
      problema: "Knowing how much of each raw material the backlog and delivery schedule will consume, compared to today's inventory.",
      solucao: "Explodes sales, backlog and schedule through each product's formula and compares the result with inventory read straight from the ERP.",
      bullets: [
        "Coverage by raw material (inventory ÷ remaining schedule) flagged SHORT / WATCH / OK.",
        "Hypothetical order simulator, in purple, to see the impact before closing a sale.",
        "Uses the same product master data as the price list app."
      ]
    },
    {
      titulo: "Price List App",
      problema: "Price lists were built in a spreadsheet with no approval history.",
      solucao: "A Power Apps app on SharePoint lists, with per-product price build-up (by branch and packaging), state taxes, approval workflow and versioning.",
      bullets: [
        "Monthly scenarios (past = history, future = simulation), version comparison and guardrails against impossible values.",
        "The HTML dashboard and the consumption explosion use the same master data as the app.",
        "In this demo, every value shows as “R$ --”."
      ]
    },
    {
      titulo: "Weekly Sales Routine",
      problema: "Every Friday, building each region's email and the at-risk contract list by hand.",
      solucao: "Scripts generate the action files for each manager, a ready-to-paste HTML email for Outlook and a high-risk backlog report, one file per region, refreshed daily.",
      bullets: [
        "Contract risk score with 9 criteria (expiring soon with no activity, expired with balance, never loaded, stalled, high balance with no schedule, above historical balance, low execution, blocked with no activity, credit limit used up) → high / medium / low.",
        "Compares year-to-date billing with the average for the same period in prior years.",
        "Flags customers who still have a balance and need to pick it up."
      ],
      tags: [null, null, null, "HTML for Outlook"]
    },
    {
      titulo: "Direct ERP Reads",
      problema: "Data came through intermediate spreadsheets, with delays and room for error.",
      solucao: "Inventory, orders, contracts and billing read from the ERP database through Excel's own Power Query, automated with Python.",
      bullets: [
        "Falls back to a local snapshot if the database doesn't respond, and the dashboard says so.",
        "Rebuilds the sales dataset that used to come from Power BI, reconciled invoice by invoice.",
        "One read feeds every dashboard in the run."
      ],
      tags: ["SQL Server (read-only)", null, null]
    }
  ],

  supply: {
    faixa: "Supply Hub · October 2026 · Business day 8 of 27",
    manchete: "Billing is at 94% of pro-rata: 180 t behind where it should be today",
    pilula: "current pace projects 97% of forecast",
    mini: [
      ["Total forecast", "10,000 t"], ["Pro-rata to date", "2,960 t"], ["Actual", "2,780 t"],
      ["Billed yesterday", "360 t"], ["Run rate", "9,700 t"], ["Run rate / forecast", "97%"]
    ],
    atalhos: [["CIF Scheduling", "loads, rain and map"], ["Customer Dashboard", "backlog and presentation"], ["Raw Materials", "consumption × inventory"]],
    semana: [{ dia: "Mon 05" }, { dia: "Tue 06" }, { dia: "Wed 07" }, { dia: "Thu 08", nota: "heavy rain" }, { dia: "Fri 09" }, { dia: "Sat 10" }]
  },

  cliente: {
    meses: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    maiores: [{ ult: "10/09" }, { ult: "10/08" }, { ult: "10/09" }, { ult: "10/07" }, { ult: "09/30" }]
  },

  cif: {
    kpis: [["CIF forecast (month)"], ["CIF actual"], ["Scheduled this week"]],
    dias: [{ dia: "Mon 05" }, { dia: "Tue 06" }, { dia: "Wed 07" }, { dia: "Thu 08" }, { dia: "Fri 09" }, { dia: "Sat 10" }]
  },

  mp: {
    kpis: [["Sold (raw material)", "120,000 t"], ["Backlog (raw material)", "37,200 t"], ["Scheduled M0+", "7,700 t"], ["Raw material inventory", "41,000 t", null, "covers 1.1×"]],
    itens: [{ nome: "Phosphate 140" }, { nome: "Magnesium oxide" }, { nome: "Silicate MG+" }, { nome: "Gypsum" }, { nome: "Silicate Plus" }, { nome: "Phosphate 100" }]
  },

  slides: {
    periodo: "October 2026",
    vencimentos: [["due within 30 days"], ["31–90 days"], ["over 90 days"]],
    historico: [null, null, null, ["2026 to date"], ["2026 projection"]]
  },

  precos: {
    versoes: [
      { nome: "Nov 2026 list · v3", data: "10/10" },
      { nome: "Oct 2026 list · v2", data: "10/01" },
      { nome: "Sep 2026 list · v4", data: "09/02" },
      { nome: "Aug 2026 list · v1", data: "08/01" }
    ],
    composicao: ["Product base", "Branch adjustment", "Packaging adjustment", "Taxes (destination state)", "Final price"]
  },

  rotina: {
    regional: "Southeast Region (fictional)",
    contratos: [{ motivo: "expired with balance" }, { motivo: "high balance, no schedule" }, { motivo: "stalled for 30 days" }, { motivo: "low execution" }]
  }
};
