# Vercel Deployment

Este projeto está configurado para deploy no Vercel.

## Deploy Automático

1. Acesse [vercel.com](https://vercel.com)
2. Login com GitHub
3. Import Git Repository
4. Selecione: `Consumo_frota`
5. Framework Preset: Angular (auto-detectado)
6. Root Directory: `./` (deixe vazio)
7. Deploy!

## Configurar Variável de Ambiente

No Vercel Dashboard → Settings → Environment Variables:

```bash
NG_APP_API_URL=https://seu-backend.up.railway.app/api/v1
```

## Após Deploy do Backend

1. Copie a URL do Railway: `https://seu-backend.up.railway.app`
2. Configure no Vercel
3. Redeploy no Vercel
4. Acesse: `https://seu-projeto.vercel.app`

## Build Settings (já configurado em vercel.json)

- Framework: Angular
- Output Directory: dist/painel-combustiveis/browser
- Install Command: npm install
- Build Command: npm run build
