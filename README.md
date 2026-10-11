# Portfólio · Guilherme Vital

Landing page de página única, em HTML, CSS e JavaScript puros. Sem framework, sem build, sem dependências (só a fonte Manrope do Google Fonts). Abre com dois cliques no `index.html`.

> Os dados das demonstrações são fictícios.

## Estrutura

```
portfolio/
├── index.html                 página
├── css/styles.css             estilos (tokens de cor em :root)
├── js/data.js                 TODOS os textos e dados fictícios dos mockups
├── js/brasil.js               malha do Brasil por UF (gerada da API do IBGE)
├── js/main.js                 menu, contadores, modais, carrossel, filtros, mockups
├── assets/brasil.svg          o mesmo mapa em SVG avulso
├── assets/og-image.png        imagem de compartilhamento (1200×630)
├── assets/favicon.svg         monograma GV
└── curriculo-guilherme-vital.pdf   currículo para download
```

## Antes de publicar

1. **Currículo:** já está na pasta. Para trocar, substitua `curriculo-guilherme-vital.pdf` mantendo o nome exato. Atenção: o PDF cita o nome da empresa.
2. **Contadores a confirmar:** em `js/data.js`, os números de ~20 h/semana, ~55% e 9× estão ocultos. Depois de conferir no log, ajuste os valores se precisar e troque `mostrarNaoConfirmados: false` para `true`.
3. **Nome da empresa:** a página diz "indústria de insumos agrícolas (MG)". Só troque depois de confirmar com o gestor.
4. **Cursos e certificações:** preencha a lista `certificacoes` em `js/data.js`; o cartão aparece sozinho quando não está vazia.
5. **Endereço final no Open Graph:** as tags `og:image`, `og:url`, `twitter:image` e `canonical` já apontam para `https://guilhermeov.github.io/portfolio/`. Se o repositório tiver outro nome, troque esse endereço no `index.html`.

## Publicar no GitHub Pages (grátis, passo a passo)

1. Entre na sua conta <https://github.com/GuilhermeOV>.
2. Clique em **New repository** (botão verde "New" no canto superior esquerdo).
   - Nome: `portfolio` (é o nome que as tags de compartilhamento esperam).
   - Marque **Public** e clique em **Create repository**.
3. Na página do repositório vazio, clique em **uploading an existing file**.
4. Arraste para a janela **o conteúdo** da pasta `portfolio` (o `index.html`, as pastas `css`, `js`, `assets` e o PDF), não a pasta em si. Clique em **Commit changes**.
5. Vá em **Settings → Pages**. Em *Build and deployment*, escolha **Source: Deploy from a branch**, **Branch: main**, pasta **/ (root)** e clique em **Save**.
6. Espere 1–2 minutos e recarregue a página de Settings → Pages. O endereço aparece no topo: `https://guilhermeov.github.io/portfolio/`.
7. Coloque esse endereço no currículo e no LinkedIn (seção Destaques ou Informações de contato → Site).

Para atualizar depois: entre no repositório, clique em **Add file → Upload files**, arraste os arquivos alterados e faça o commit. O site atualiza em 1–2 minutos.

### Alternativa: Netlify (arrastar e soltar)

Acesse <https://app.netlify.com/drop>, faça login e arraste a pasta `portfolio` inteira. Ele gera um endereço na hora, que pode ser renomeado em *Site settings*.

## Editar conteúdo

- Textos dos projetos, contadores, trajetória e ferramentas: `js/data.js`.
- Textos do herói, sobre e contato: `index.html`.
- Cores: variáveis no topo de `css/styles.css`.

## Regras do conteúdo

- Volumes em escala ilustrativa (números redondos, proporções mantidas); o gráfico mensal é um índice.
- Nenhum dado real da empresa, nenhum preço, custo, margem ou nome real de cliente/fornecedor.
- Nenhum print de painel real: todos os mockups são HTML/CSS alimentados por `data.js`.
- Nenhum detalhe de infraestrutura (servidores, caminhos de rede, bancos, usuários).
