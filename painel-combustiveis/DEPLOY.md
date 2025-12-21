# 🚀 Deploy Frontend - Angular SPA

**Projeto**: V-Lab Transportes - Painel  
**Tecnologia**: Angular 17 (SPA - Single Page Application)  
**Totalmente independente do backend**

---

## 📦 Opções de Deploy

### Opção 1: Hosting Estático (Recomendado - Mais Simples)

Frontend Angular compilado é apenas **HTML, CSS e JavaScript estáticos**.  
Pode ser hospedado em qualquer serviço de arquivos estáticos!

#### Serviços Recomendados (Gratuitos/Baratos)

- **Vercel** - Deploy automático, domínio grátis, HTTPS
- **Netlify** - Deploy automático, CI/CD integrado
- **GitHub Pages** - Gratuito para repositórios públicos
- **Firebase Hosting** - Google, CDN global
- **AWS S3 + CloudFront** - Escalável, profissional
- **Azure Static Web Apps** - Microsoft, bom para empresas

---

### Deploy: Vercel (Mais Fácil)

```bash
# 1. Instale Vercel CLI
npm install -g vercel

# 2. Build de produção
cd frontend/painel-combustiveis
npm run build

# 3. Configure URL da API
./generate-env.sh https://api.seudominio.com/api/v1

# 4. Deploy
vercel --prod

# Pronto! URL: https://seu-app.vercel.app
```

**Atualizações**: Basta rodar `vercel --prod` novamente.

---

### Deploy: Netlify

```bash
# 1. Instale Netlify CLI
npm install -g netlify-cli

# 2. Build
cd frontend/painel-combustiveis
npm run build

# 3. Configure API
./generate-env.sh https://api.seudominio.com/api/v1

# 4. Deploy
netlify deploy --prod --dir=dist/painel-combustiveis/browser

# URL: https://seu-app.netlify.app
```

**Ou use a interface web**: Arraste a pasta `dist/painel-combustiveis/browser`!

---

### Deploy: GitHub Pages

```bash
# 1. Build
npm run build -- --base-href=/nome-do-repositorio/

# 2. Configure API
./generate-env.sh https://api.seudominio.com/api/v1

# 3. Deploy
npx angular-cli-ghpages --dir=dist/painel-combustiveis/browser

# URL: https://seu-usuario.github.io/nome-do-repositorio
```

---

### Deploy: Firebase Hosting

```bash
# 1. Instale Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Inicialize
firebase init hosting

# 4. Build
npm run build

# 5. Configure API
./generate-env.sh https://api.seudominio.com/api/v1

# 6. Deploy
firebase deploy

# URL: https://seu-projeto.web.app
```

---

## Opção 2: Docker + Servidor Node (Para Controle Total)

Se quiser hospedar você mesmo:

```bash
# 1. Build da imagem Docker
cd frontend/painel-combustiveis
docker build -f Dockerfile.prod -t vlab-frontend .

# 2. Execute com variável de ambiente
docker run -d \
  -p 80:4200 \
  -e API_URL=https://api.seudominio.com/api/v1 \
  vlab-frontend

# Acesse: http://seu-servidor
```

---

## Opção 3: Servidor Tradicional (Nginx)

```bash
# 1. Build
npm run build

# 2. Configure API
./generate-env.sh https://api.seudominio.com/api/v1

# 3. Copie para servidor web
scp -r dist/painel-combustiveis/browser/* user@servidor:/var/www/html/

# 4. Configure Nginx
sudo nano /etc/nginx/sites-available/vlab-frontend
```

Configuração Nginx:
```nginx
server {
    listen 80;
    server_name painel.seudominio.com;
    root /var/www/html;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Sem cache para HTML
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
```

```bash
# 5. Ative e reinicie
sudo ln -s /etc/nginx/sites-available/vlab-frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## ⚙️ Configuração da URL da API

**IMPORTANTE**: O frontend precisa saber onde está o backend!

### Desenvolvimento (Local)

```bash
# Usa localhost
export API_URL=http://localhost:8000/api/v1
npm start
```

### Produção

Após build, antes de deploy:

```bash
./generate-env.sh https://api.seudominio.com/api/v1
```

Isso cria `dist/painel-combustiveis/browser/env.js` com a URL correta.

### Variável de Ambiente (Vercel/Netlify)

Na interface web do serviço, adicione:

```
API_URL=https://api.seudominio.com/api/v1
```

O build vai pegar automaticamente.

---

## 🔄 Atualizações

### Hosting Estático

```bash
# 1. Pull do código
git pull

# 2. Build novo
npm run build

# 3. Configure API (se mudou)
./generate-env.sh https://api.seudominio.com/api/v1

# 4. Deploy
vercel --prod  # ou netlify deploy --prod
```

### Docker

```bash
git pull
docker build -f Dockerfile.prod -t vlab-frontend .
docker stop vlab-frontend-container
docker rm vlab-frontend-container
docker run -d --name vlab-frontend-container -p 80:4200 \
  -e API_URL=https://api.seudominio.com/api/v1 \
  vlab-frontend
```

---

## 🌐 Domínio Customizado

### Vercel

```bash
vercel domains add painel.seudominio.com
```

Depois configure DNS:
```
CNAME painel cname.vercel-dns.com
```

### Netlify

Interface web → Domain Settings → Add custom domain

### Outros

Configure DNS para apontar para IP do servidor:
```
A painel 192.168.1.100
```

---

## 🔒 HTTPS (SSL)

### Hosting Estático (Vercel/Netlify/Firebase)
✅ **Automático!** HTTPS já vem configurado.

### Nginx (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d painel.seudominio.com
sudo systemctl reload nginx
```

Renovação automática:
```bash
sudo certbot renew --dry-run
```

---

## 📊 Monitoramento

### Build Size

```bash
npm run build
ls -lh dist/painel-combustiveis/browser/
```

Tamanho ideal: < 1MB total

### Performance

Use ferramentas:
- **Lighthouse** (Chrome DevTools)
- **WebPageTest**
- **GTmetrix**

Métricas alvo:
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s

---

## 🐛 Troubleshooting

### Página branca após deploy

1. Verifique console do navegador (F12)
2. Confirme que `env.js` foi gerado
3. Teste API diretamente:
   ```bash
   curl https://api.seudominio.com/api/v1/abastecimentos?limite=1
   ```

### Erro 404 ao recarregar página

Configuração de SPA routing faltando:

**Vercel**: Crie `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Netlify**: Crie `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### CORS Error

Backend não está aceitando requisições do frontend:

```bash
# No backend, adicione origem do frontend:
CORS_ORIGINS=https://seu-frontend.vercel.app
```

---

## 📈 Otimizações

### Cache Headers

Já configurado no `serve.js` e nos exemplos Nginx.

### Lazy Loading

Já implementado! Dashboard e Consulta carregam sob demanda.

### CDN

Hosting estático (Vercel/Netlify) já usa CDN global automaticamente!

---

## 🎨 Customizações Pós-Deploy

### Trocar URL da API (sem rebuild)

Basta editar `env.js` no servidor:

```bash
# No servidor/hospedagem
cat > dist/painel-combustiveis/browser/env.js << EOF
(function(window) {
  window.__env = window.__env || {};
  window.__env.apiUrl = 'https://nova-api.com/api/v1';
})(window);
EOF
```

Recarregue o site. Pronto!

### Analytics

Adicione Google Analytics em `index.html` antes do deploy.

### Monitoramento de Erros

Integre Sentry:
```bash
npm install @sentry/angular
```

---

## 🎯 Checklist de Deploy

- [ ] Build de produção gerado (`npm run build`)
- [ ] `env.js` configurado com URL da API real
- [ ] Domínio configurado
- [ ] HTTPS ativo
- [ ] SPA routing funcionando (teste F5 em rotas)
- [ ] API acessível (teste CORS)
- [ ] Performance > 90 no Lighthouse
- [ ] Responsivo mobile testado
- [ ] Compatibilidade navegadores testada

---

## ✅ Frontend Deploy Completo!

Seu frontend está hospedado de forma **totalmente independente** e pode:

- ✅ Ser servido de qualquer CDN/hosting estático
- ✅ Apontar para qualquer backend via configuração
- ✅ Ser atualizado sem afetar o backend
- ✅ Ter domínio próprio
- ✅ Escalar para milhões de usuários (via CDN)
- ✅ Ser movido entre serviços facilmente (são só arquivos estáticos!)

**Exemplo de Stack Profissional Completa**:
- **Backend**: https://api.seudominio.com (Heroku/Railway)
- **Frontend**: https://painel.seudominio.com (Vercel/Netlify)
- **Totalmente desacoplados!** ✨
