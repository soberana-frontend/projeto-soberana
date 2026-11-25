# Fluxo da Pasta Docs - Projeto Soberana

## Conteúdo

```
docs/
├── LEIA-ME.txt # Documentação legada dos templates HTML v1-v4
├── architecture-diagram.html # Diagrama interativo da arquitetura
└── README-FLUX.md # Este arquivo
```

## Descrição dos Arquivos

### `LEIA-ME.txt`
Documentação histórica dos templates HTML estáticos que antecederam a migração para Next.js:
- **soberana-template-v4-paleta-catolica.html** — Template com paleta institucional (azul, azul vivo, cinza, amarelo)
- **soberana-template-v3.html** — Versão mais completa com fotos (azul-marinho e dourado)
- **soberana-template-v2.html** — Mesmo layout v3, sem fotos
- **soberana-template-moderno.html** — Template v1 (versão simples)
- **soberana-simulacao.html** — Simulador responsivo (tablet, Galaxy S25, iPhone 16 Pro Max)
- **home-corrigido.asp** — Home atual corrigida (HTML5, viewport, alt, acentos)
- **imagens/** — Fotos ilustrativas usadas nos templates (hero.jpg, equipe.jpg, seguranca-pessoal.jpg)

⚠️ **Nota**: As fotos são ilustrativas e de licença não confirmada. Para produção, usar fotos próprias ou banco de imagens com licença comercial.

### `architecture-diagram.html`
Diagrama interativo mostrando:
- Visão geral das 3 camadas (Frontend Next.js, API REST, Backend NestJS)
- Módulos clicáveis com detalhes (arquivos, endpoints, tipos de renderização)
- Endpoints da API com métodos GET/POST
- Árvore de arquivos completa da estrutura feature-based
- Legenda visual diferenciando Server/Client Components

**Como usar**: Abra diretamente no navegador. Funciona offline após primeiro carregamento (única dependência externa: Google Fonts).

## Relação com o Projeto

- Esta pasta contém **documentação de referência**, não código executável
- O diagrama foi gerado durante a refatoração para TypeScript e Feature-Based Architecture
- O `LEIA-ME.txt` é mantido como histórico, mas não faz parte da runtime atual
- Assets legados (`imagens/`) foram movidos para `frontend/public/images/` durante o saneamento

## Convenções

- Arquivos de documentação usam extensão `.md` (Markdown)
- Diagramas visuais usam `.html` standalone (sem framework)
- Documentação legada mantém formato original (`.txt`, `.asp`, `.html`)
- Todos os arquivos nesta pasta são git-tracked (não estão no .gitignore)