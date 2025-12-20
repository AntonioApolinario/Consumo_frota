# 🚀 Guia Rápido - Executar Testes E2E

## ⚡ Passos para testar

### 1️⃣ Subir a aplicação
```bash
cd "/mnt/files/Projetos/Vlab transportes/frontend"
docker compose up -d
```

Aguarde ~30 segundos para o Angular iniciar em `http://localhost:4200`

---

### 2️⃣ Abrir Cypress (Interface Visual)
```bash
cd painel-combustiveis
npm run e2e:open
```

**O que vai acontecer:**
- ✅ Cypress abrirá uma janela com interface gráfica
- ✅ Você verá a lista de 4 arquivos de teste
- ✅ Clique em qualquer teste para executá-lo
- ✅ Um navegador Chrome abrirá mostrando os testes rodando

---

### 3️⃣ Ver testes rodando

**No Cypress você pode:**
- ▶️ Clicar em um teste para executar
- ⏸️ Pausar em qualquer momento
- 🔍 Inspecionar elementos
- 🕐 Voltar no tempo (time-travel)
- 📸 Ver screenshots
- 🐛 Debugar no console

---

## 📋 Testes Disponíveis

1. **dashboard.cy.ts**
   - Testa KPIs, gráficos, responsividade
   - ~8 testes, rápido (~20s)

2. **consulta.cy.ts**
   - Testa tabela, filtros, paginação
   - ~10 testes, médio (~30s)

3. **modal-detalhes.cy.ts**
   - Testa modal, máscaras, acessibilidade
   - ~11 testes, rápido (~25s)

4. **acessibilidade.cy.ts**
   - Testa navegação, ARIA, responsividade
   - ~15 testes, médio (~40s)

**Total:** ~40 testes, ~2 minutos

---

## 🎬 O que você vai ver

1. **Cypress abre navegador automaticamente**
2. **Navega pela aplicação sozinho**
3. **Clica em botões, preenche filtros**
4. **Abre modais, testa teclado**
5. **Valida textos, elementos, formatação**
6. **Mostra ✅ verde quando passa**

---

## 🔧 Modo Alternativo (Sem Interface)

Se preferir rodar direto (mais rápido):
```bash
npm run e2e
```

Isso roda todos os testes em background e gera vídeos em `cypress/videos/`

---

## ⚠️ Troubleshooting

**Se der erro "baseUrl não responde":**
```bash
# Verifique se app está rodando
curl http://localhost:4200

# Se não estiver, suba o Docker
docker compose up -d
```

**Se Cypress não abrir:**
```bash
# Instale novamente
npm install cypress --save-dev
```

---

## 📦 Depois de testar

**Parar containers:**
```bash
docker compose down
```

**Ver vídeos dos testes:**
```bash
ls cypress/videos/
```

---

**Pronto! Agora é só executar e ver a mágica acontecer! 🎉**
