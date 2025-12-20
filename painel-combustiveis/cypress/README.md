# Testes E2E com Cypress

## 🎯 Cobertura de Testes

### ✅ 4 Suites de Teste Implementadas:

1. **dashboard.cy.ts** - Dashboard e KPIs
2. **consulta.cy.ts** - Listagem e filtros
3. **modal-detalhes.cy.ts** - Modal de detalhes
4. **acessibilidade.cy.ts** - Acessibilidade e navegação

### 📊 Total de Testes: ~40 casos

---

## 🚀 Como Executar

### Modo Interativo (Visual - Recomendado)
```bash
# 1. Certifique-se que a aplicação está rodando
docker compose up -d

# 2. Abra o Cypress
npm run e2e:open

# Ou
npx cypress open
```

### Modo Headless (CI/CD)
```bash
# 1. App rodando
docker compose up -d

# 2. Executar todos os testes
npm run e2e

# Ou
npx cypress run
```

### Executar teste específico
```bash
npx cypress run --spec "cypress/e2e/dashboard.cy.ts"
```

---

## 📝 Testes por Arquivo

### dashboard.cy.ts
- ✅ Carregamento da página
- ✅ Exibição dos 4 KPI cards
- ✅ Valores numéricos formatados
- ✅ Gráfico de evolução de preços
- ✅ Gráfico de consumo por região
- ✅ Breadcrumbs
- ✅ Acessibilidade
- ✅ Responsividade

### consulta.cy.ts
- ✅ Carregamento da tabela
- ✅ Colunas corretas
- ✅ Filtro por estado
- ✅ Filtro por combustível
- ✅ Limpar filtros
- ✅ Paginação
- ✅ Itens por página
- ✅ Navegação entre páginas
- ✅ Abertura de modal
- ✅ Formatação de dados

### modal-detalhes.cy.ts
- ✅ Abertura do modal
- ✅ Informações do motorista
- ✅ Informações do veículo
- ✅ Informações do abastecimento
- ✅ Máscara de CPF
- ✅ Botão Reportar Erro
- ✅ Fechar com X
- ✅ Fechar com botão
- ✅ Fechar com ESC
- ✅ Trap de foco
- ✅ Atributos ARIA

### acessibilidade.cy.ts
- ✅ Header Gov.br
- ✅ Links de acessibilidade
- ✅ Alto contraste
- ✅ Menu de navegação
- ✅ Navegação entre rotas
- ✅ Rota ativa destacada
- ✅ Breadcrumbs
- ✅ Navegação por teclado
- ✅ Foco visível
- ✅ Página 404
- ✅ Responsividade (mobile/tablet/desktop)
- ✅ Roles ARIA
- ✅ Aria-labels
- ✅ Estrutura de headings

---

## 📁 Estrutura de Arquivos

```
cypress/
├── e2e/
│   ├── dashboard.cy.ts         # 8 testes
│   ├── consulta.cy.ts          # 10 testes
│   ├── modal-detalhes.cy.ts    # 11 testes
│   └── acessibilidade.cy.ts    # 15+ testes
├── support/
│   ├── commands.ts             # Comandos customizados
│   └── e2e.ts                  # Setup global
└── videos/                     # Gravações (gitignore)
└── screenshots/                # Capturas (gitignore)
```

---

## ⚙️ Configuração

### cypress.config.ts
- **baseUrl:** http://localhost:4200
- **viewport:** 1280x720
- **video:** true
- **screenshots:** on failure
- **timeout:** 10 segundos

---

## 🎬 Recursos do Cypress

### Durante os testes você pode:
- ⏸️ Pausar execução
- 🔍 Inspecionar elementos
- 📸 Ver screenshots automáticos
- 🎥 Rever execução em vídeo
- 🕐 Time-travel (voltar passos)
- 🐛 Debugar com console

---

## 📦 Dependências

```json
"cypress": "^15.8.1"
```

---

## 🔥 Comandos Úteis

```bash
# Abrir Cypress
npm run cypress:open

# Rodar todos os testes
npm run cypress:run

# Rodar teste específico
npx cypress run --spec "cypress/e2e/dashboard.cy.ts"

# Rodar em navegador específico
npx cypress run --browser chrome

# Modo debug
DEBUG=cypress:* npx cypress run
```

---

## 📝 Notas

- Os testes assumem que a aplicação está rodando em `localhost:4200`
- Certifique-se que o Docker está ativo antes de rodar os testes
- Videos e screenshots NÃO são versionados (estão no .gitignore)
- Testes focam nos fluxos críticos, não em features extras dos gráficos

---

**Última atualização:** 20/12/2025
