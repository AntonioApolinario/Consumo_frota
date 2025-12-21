// Ambiente de PRODUÇÃO
// URL da API deve ser injetada via env.js (ver public/env.template.js)
export const environment = {
  production: true,
  apiUrl: (typeof window !== 'undefined' && (window as any).__env?.apiUrl) 
    || 'https://api.example.com/api/v1'  // Substitua pela URL real do backend
};
