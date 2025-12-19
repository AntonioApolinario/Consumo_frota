export const environment = {
  production: false,
  // No SSR (servidor), usar o nome do serviço Docker
  // No navegador, usar localhost
  apiUrl: typeof window !== 'undefined' ? 'http://localhost:3000' : 'http://api:3000'
};
