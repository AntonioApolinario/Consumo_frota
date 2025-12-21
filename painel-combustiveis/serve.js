const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 4200;
const API_URL = process.env.API_URL || 'http://localhost:8000/api/v1';

// Segurança básica com Helmet
app.use(helmet({
  contentSecurityPolicy: false, // Angular gerencia CSP
  crossOriginEmbedderPolicy: false
}));

// Compressão gzip
app.use(compression());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'frontend' });
});

// Serve arquivos estáticos do build de produção com cache
app.use(express.static(path.join(__dirname, 'dist/painel-combustiveis/browser'), {
  maxAge: '1d', // Cache por 1 dia
  etag: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      // HTML sem cache (para sempre pegar versão mais nova)
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Todas as rotas retornam index.html (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/painel-combustiveis/browser/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Frontend rodando em http://localhost:${PORT}`);
  console.log(`📦 Servindo build de produção`);
  console.log(`🔗 Backend: ${API_URL}`);
  console.log(`🛡️  Segurança e compressão ativadas`);
});
