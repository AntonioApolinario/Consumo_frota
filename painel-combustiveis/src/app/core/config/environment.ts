// Configuração dinâmica de ambiente
// Lê da variável de ambiente injetada no window ou usa fallback
export const environment = {
  production: true,
  apiUrl: (typeof window !== 'undefined' && (window as any).__env?.apiUrl) 
    || 'https://api.example.com/api/v1'  // URL pública do backend em produção
};
