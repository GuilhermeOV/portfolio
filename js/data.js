/*
 * Todos os dados das demonstrações. Valores, clientes e produtos são FICTÍCIOS,
 * em escala ilustrativa (números redondos, sem relação com volumes reais).
 * Nenhum preço, custo, margem ou dado real da empresa entra aqui.
 */
window.PORTFOLIO = {
  /* Contadores marcados com confirmar:true só aparecem quando mostrarNaoConfirmados = true.
     Troque para true depois de conferir os números no log. */
  mostrarNaoConfirmados: false,

  contadores: [
    { valor: 8, legenda: "painéis e ferramentas em produção" },
    { valor: 1, sufixo: " h", legenda: "intervalo da atualização automática" },
    { valor: 20, prefixo: "~", sufixo: " h", legenda: "por semana liberadas: a consolidação que ocupava todas as manhãs agora roda sozinha", confirmar: true },
    { valor: 55, prefixo: "~", sufixo: "%", legenda: "menos tempo na primeira atualização do dia, de 18 para ~8 min", confirmar: true },
    { valor: 9, sufixo: "×", legenda: "mais rápido na leitura das planilhas, de 175 s para 19 s", confirmar: true },
    { valor: 3, legenda: "modelos meteorológicos combinados na previsão de chuva" },
    { valor: 0, legenda: "dependências externas nos painéis: HTML único que abre offline" }
  ],

  principios: [
    { titulo: "Medir, não afirmar.", texto: "Todo número é conferido por duas contas antes de ir para a tela. A previsão de chuva, por exemplo, foi aferida contra dado observado antes de escolher os modelos." },
    { titulo: "Explicação junto com a entrega.", texto: "Cada painel diz de onde vem o número e de quando é o dado." },
    { titulo: "Aviso discreto.", texto: "Alerta só aparece quando há problema; o resto fica no hover." }
  ],

  trajetoria: [
    { quando: "dez/2026", marco: "Conclusão prevista de Sistemas de Informação (Uniube)", tipo: "edu" },
    { quando: "out/2026", marco: "Leitura direta do ERP, app de lista de preços e modo apresentação", tipo: "build" },
    { quando: "set/2026", marco: "Painéis diários e mapa de risco de chuva", tipo: "build" },
    { quando: "jun/2026", marco: "Primeiros scripts de automação em Python", tipo: "build" },
    { quando: "dez/2025", marco: "Analista de Planejamento: promovido em 7 meses", tipo: "cargo" },
    { quando: "jun/2025", marco: "Assistente de Expedição: triagem de motoristas, liberação para carregamento e emissão de NF", tipo: "cargo" },
    { quando: "jun/2021 – jan/2025", marco: "Operador de Rastreamento (Bravo Serviços Logísticos): monitoramento de cargas de agrodefensivos via Autotrac, do preparo da viagem à entrega, com acionamento policial em caso de risco", tipo: "cargo" }
  ],

  ferramentas: [
    { grupo: "Dados e automação", itens: ["Python (pandas, openpyxl, pywin32/COM)", "SQL Server (leitura)", "Power Query (M)", "Agendador do Windows", "Backups automáticos antes de cada gravação"] },
    { grupo: "BI e visualização", itens: ["Power BI", "DAX", "Excel avançado", "HTML/CSS/JavaScript puro", "SVG"] },
    { grupo: "Apps", itens: ["Power Apps (Power Fx, YAML)", "SharePoint Lists"] },
    { grupo: "APIs e dados públicos", itens: ["Open-Meteo", "Malha do IBGE"] },
    { grupo: "Sistemas", itens: ["Protheus/TOTVS", "Autotrac"] },
    { grupo: "IA", itens: ["Claude Code como copiloto de desenvolvimento", "Claude Design para protótipos visuais"] }
  ],

  /* Deixe vazio para ocultar o cartão. Ex.: { nome: "Curso X", instituicao: "Escola Y", ano: "2027" } */
  certificacoes: [],

  projetos: [
    {
      slug: "painel-supply", icone: "portal", filtros: ["paineis", "automacao"], mockup: "supply",
      titulo: "Painel Supply + rodada automática",
      problema: "Cada área olhava uma planilha diferente, atualizada à mão.",
      solucao: "Uma porta de entrada única com os indicadores do mês e acesso a todos os painéis, regenerada de hora em hora por uma rotina agendada.",
      bullets: [
        "Frase do dia gerada automaticamente: “O faturamento está em N% do pro-rata, X t abaixo do que deveria até hoje”.",
        "A primeira rodada baixa o ERP uma vez e grava 3 planilhas do time em paralelo; cada painel começa assim que seus dados chegam.",
        "Primeira rodada otimizada de ~18 para ~8 min."
      ],
      tags: ["Python", "Agendador do Windows", "Excel COM", "HTML/CSS/JS sem dependências"]
    },
    {
      slug: "painel-cliente", icone: "cliente", filtros: ["paineis"], mockup: "cliente",
      titulo: "Painel do cliente + modo apresentação",
      problema: "Reunião com cliente montada à mão em PowerPoint, com número desatualizado.",
      solucao: "Painel de venda, faturamento, carteira e cadência por cliente, grupo e produto (2023 até hoje), com botão “Apresentação” que gera slides em tela cheia do recorte filtrado.",
      bullets: [
        "9 slides automáticos, de “onde estamos” a “próximos passos”.",
        "Transições, números que contam até o valor, exportação em PDF com um slide por página.",
        "Mesmos dados do painel: o slide nunca fica desatualizado."
      ],
      tags: ["JavaScript", "CSS", "Print CSS", "Fullscreen API"]
    },
    {
      slug: "programacao-cif", icone: "caminhao", filtros: ["paineis"], mockup: "cif",
      titulo: "Programação de faturamento CIF",
      problema: "Programar as cargas do mês sem saber o que já saiu, o que falta e se vai chover no destino.",
      solucao: "Painel diário por cliente × município com potencial, programado, realizado e risco de chuva.",
      bullets: [
        "Chuva = mediana de 3 modelos meteorológicos, escolhidos após aferição contra dado observado; a dica mostra a taxa de acerto daquela antecedência (cancelar carga só no D-1).",
        "Mapa do Brasil em SVG próprio (malha IBGE embutida) com zoom estado → microrregião → município, bolhas por volume e cor por risco.",
        "Concilia a fonte oficial com as planilhas das analistas dia a dia, sem contar a mesma nota duas vezes."
      ],
      tags: ["Python", "Open-Meteo API", "SVG", "JavaScript"]
    },
    {
      slug: "materia-prima", icone: "camadas", filtros: ["paineis", "dados"], mockup: "mp",
      titulo: "Explosão de consumo de matéria-prima",
      problema: "Saber quanto de cada matéria-prima a carteira e a cadência vão consumir, contra o estoque de hoje.",
      solucao: "Explode venda, carteira e cadência pela fórmula de cada produto e cruza com o estoque lido direto do ERP.",
      bullets: [
        "Cobertura por matéria-prima (estoque ÷ saldo de cadência) com FALTA / ATENÇÃO / OK.",
        "Simulador de pedidos hipotéticos, em roxo, para ver o impacto antes de vender.",
        "Usa o mesmo cadastro de produtos do app de lista de preços."
      ],
      tags: ["Python", "pandas", "Power Query", "JavaScript"]
    },
    {
      slug: "lista-precos", icone: "app", filtros: ["apps"], mockup: "precos",
      titulo: "App de lista de preços",
      problema: "Lista de preço montada em planilha, sem histórico de aprovação.",
      solucao: "App em Power Apps sobre listas do SharePoint, com composição por produto (variação por filial e embalagem), tributos por UF, aprovação e versões.",
      bullets: [
        "Cenário por mês (passado = histórico, futuro = simulação), comparação entre versões e trava contra valores impossíveis.",
        "O painel HTML e a explosão de consumo usam o mesmo cadastro do app.",
        "Na demonstração, todos os valores aparecem como “R$ --”."
      ],
      tags: ["Power Apps (YAML)", "SharePoint Lists", "Power Fx", "Python"]
    },
    {
      slug: "rotina-semanal", icone: "email", filtros: ["automacao"], mockup: "rotina",
      titulo: "Rotina comercial semanal",
      problema: "Toda sexta, montar à mão o e-mail de cada regional e a lista de contratos de risco.",
      solucao: "Scripts geram os arquivos de ações por gerente, o e-mail HTML pronto para colar no Outlook e o levantamento de carteira de alto risco, um arquivo por regional, atualizado todo dia.",
      bullets: [
        "Score de risco por contrato com 9 critérios (vence curto sem movimento, vencido com saldo, nunca carregou, parado, saldo alto sem cadência, acima do histórico, baixa execução, bloqueio sem movimento, limite consumido) → alto / médio / baixo.",
        "Compara o faturado do ano com a média do mesmo período dos anos anteriores.",
        "Aponta quem tem saldo e precisa retirar."
      ],
      tags: ["Python", "openpyxl", "Excel COM", "HTML para Outlook"]
    },
    {
      slug: "leitura-erp", icone: "banco", filtros: ["dados", "automacao"], mockup: "erp",
      titulo: "Leitura direta do ERP",
      problema: "Os dados chegavam por planilhas intermediárias, com atraso e risco de erro.",
      solucao: "Estoque, pedidos, contratos e faturamento lidos do banco do ERP pelo Power Query do próprio Excel, automatizado por Python.",
      bullets: [
        "Retrato local se o banco não responder, e o painel avisa.",
        "Reproduz a base comercial que antes vinha do Power BI, conferida nota a nota.",
        "Uma leitura alimenta todos os painéis da rodada."
      ],
      tags: ["SQL Server (leitura)", "Power Query (M)", "Python"]
    }
  ],

  /* 5.1 Painel Supply */
  supply: {
    faixa: "Painel Supply · Outubro 2026 · Dia útil 8 de 27",
    manchete: "O faturamento está em 94% do pro-rata: 180 t abaixo do que deveria até hoje",
    pilula: "ritmo projeta 97% do forecast",
    mini: [
      ["Forecast total", "10.000 t"], ["Pro-rata até hoje", "2.960 t"], ["Realizado", "2.780 t"],
      ["Faturado ontem", "360 t"], ["Ritmo", "9.700 t"], ["% ritmo/forecast", "97%"]
    ],
    atalhos: [
      ["Programação CIF", "cargas, chuva e mapa"], ["Painel do cliente", "carteira e apresentação"], ["Matéria-prima", "consumo × estoque"]
    ],
    semana: [
      { dia: "seg 05", prog: 120, real: 135 },
      { dia: "ter 06", prog: 140, real: 128 },
      { dia: "qua 07", prog: 130, real: 142 },
      { dia: "qui 08", prog: 150, real: 112, nota: "chuva forte" },
      { dia: "sex 09", prog: 130, real: 70, hoje: true },
      { dia: "sáb 10", prog: 50, real: null }
    ]
  },

  /* 5.2 Painel do cliente */
  cliente: {
    kpis: { vendido: 120000, varVendido: 8.2, faturado: 82800, atendimento: 69, saldo: 37200, convencional: 57, parceria: 43, cadenciado: 6200 },
    meses: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out"],
    /* índice: vendido jan/2025 = 100 */
    vendido: [107, 125, 137, 118, 128, 140, 122, 134, 143, 65],
    faturado: [77, 87, 93, 85, 91, 97, 87, 93, 100, 27],
    vendido2025: [100, 114, 128, 108, 120, 127, 114, 122, 132, 128],
    maiores: [
      { nome: "Agropecuária Serra Verde", vendido: 3400, faturado: 2480, ult: "09/10" },
      { nome: "Usina Santa Clara", vendido: 1950, faturado: 1270, ult: "08/10" },
      { nome: "Comercial Agro Norte", vendido: 1800, faturado: 1370, ult: "09/10" },
      { nome: "Cooperativa Vale do Rio", vendido: 1600, faturado: 1020, ult: "07/10" },
      { nome: "Fazenda Boa Esperança", vendido: 1400, faturado: 730, ult: "30/09" }
    ]
  },

  /* 5.3 Programação CIF */
  cif: {
    kpis: [["Forecast CIF do mês", 8500, "c-ink"], ["Realizado CIF", 1240, "c-billed"], ["Programado na semana", 720, "c-backlog"]],
    dias: [
      { dia: "seg 05", prog: 120, real: 135, chuva: "seco" },
      { dia: "ter 06", prog: 140, real: 128, chuva: "seco" },
      { dia: "qua 07", prog: 130, real: 142, chuva: "chuva fraca" },
      { dia: "qui 08", prog: 150, real: 112, chuva: "chuva forte" },
      { dia: "sex 09", prog: 130, real: 70, chuva: "chuva fraca" },
      { dia: "sáb 10", prog: 50, real: null, chuva: "seco" }
    ],
    ufs: [
      { uf: "MG", nome: "Minas Gerais", volume: 420, risco: "atencao" },
      { uf: "SP", nome: "São Paulo", volume: 180, risco: "seco" },
      { uf: "BA", nome: "Bahia", volume: 75, risco: "seco" },
      { uf: "GO", nome: "Goiás", volume: 30, risco: "forte" },
      { uf: "MS", nome: "Mato Grosso do Sul", volume: 15, risco: "seco" }
    ],
    tabela: [
      { cliente: "Agropecuária Serra Verde", mun: "Uberaba (MG)", pot: 280, prog: 180, real: 130, chuva: "chuva fraca" },
      { cliente: "Cooperativa Vale do Rio", mun: "Franca (SP)", pot: 190, prog: 110, real: 80, chuva: "seco" },
      { cliente: "Usina Santa Clara", mun: "Ibiraci (MG)", pot: 150, prog: 90, real: 60, chuva: "chuva fraca" },
      { cliente: "Comercial Agro Norte", mun: "Claraval (MG)", pot: 110, prog: 70, real: 70, chuva: "seco" },
      { cliente: "Fazenda Boa Esperança", mun: "Pedregulho (SP)", pot: 80, prog: 50, real: 25, chuva: "chuva forte" }
    ]
  },

  /* 5.4 Matéria-prima */
  mp: {
    kpis: [["Vendido em MP", "120.000 t", "c-sold"], ["Saldo em carteira em MP", "37.200 t", "c-backlog"], ["Cadenciado M0+", "7.700 t", "c-cadence"], ["Estoque de MP", "41.000 t", "c-billed", "cobre 1,1×"]],
    itens: [
      { nome: "Fosfato 140", cobertura: 24 },
      { nome: "Óxido de magnésio", cobertura: 34 },
      { nome: "Silicato MG+", cobertura: 81 },
      { nome: "Gesso", cobertura: 97 },
      { nome: "Silicato Plus", cobertura: 120 },
      { nome: "Fosfato 100", cobertura: 142 }
    ]
  },

  /* 5.5 Modo apresentação */
  slides: {
    cliente: "Cooperativa Vale do Rio",
    periodo: "outubro 2026",
    contratado: 2000, aRetirar: 1070, retiradoPct: 46.5,
    vencimentos: [["vence em até 30 dias", 210, "bad"], ["31–90 dias", 460, "warn"], ["mais de 90 dias", 400, "ok"]],
    mes: { cadenciado: 400, faturado: 120, projecao: 300, saldoCadencia: 280, porDia: 15, diasRestantes: 19, falta: 100, proRataPct: 30 },
    historico: [["2023", 900], ["2024", 1420], ["2025", 1280], ["2026 até hoje", 1000], ["projeção 2026", 1330, true]],
    unidades: [["Franca", 390, "acelerar"], ["Ibiraci", 215, "ok"], ["Claraval", 155, "acelerar"], ["Pedregulho", 135, "atencao"], ["Capetinga", 90, "atencao"]]
  },

  /* 5.6 App de preços: só estrutura, sem valores */
  precos: {
    versoes: [
      { nome: "Lista nov/2026 · v3", status: "em revisão", data: "10/10" },
      { nome: "Lista out/2026 · v2", status: "aprovada", data: "01/10" },
      { nome: "Lista set/2026 · v4", status: "aprovada", data: "02/09" },
      { nome: "Lista ago/2026 · v1", status: "aprovada", data: "01/08" }
    ],
    composicao: ["Base do produto", "Variação por filial", "Variação por embalagem", "Tributos (UF de destino)", "Preço final"]
  },

  /* 5.7 Rotina semanal */
  rotina: {
    regional: "Regional Sudeste (fictícia)",
    contratos: [
      { contrato: "CT-0412", cliente: "Fazenda Boa Esperança", saldo: 170, motivo: "vencido com saldo", risco: "alto" },
      { contrato: "CT-0388", cliente: "Comercial Agro Norte", saldo: 270, motivo: "saldo alto sem cadência", risco: "alto" },
      { contrato: "CT-0451", cliente: "Usina Santa Clara", saldo: 70, motivo: "parado há 30 dias", risco: "medio" },
      { contrato: "CT-0467", cliente: "Agropecuária Serra Verde", saldo: 40, motivo: "baixa execução", risco: "baixo" }
    ]
  }
};
