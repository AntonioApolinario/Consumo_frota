// Runtime Environment Configuration
// Este arquivo é gerado durante o deploy e injetado no index.html
// Permite configurar a aplicação SEM rebuild

(function(window) {
  window.__env = window.__env || {};
  
  // URL da API Backend (pública)
  // Em desenvolvimento: http://localhost:8000/api/v1
  // Em produção: https://api.seudominio.com/api/v1
  window.__env.apiUrl = '__API_URL__';  // Será substituído no deploy
  
  // Outras configurações podem ser adicionadas aqui
  // window.__env.feature_flags = {...};
})(window);
