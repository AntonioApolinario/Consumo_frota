/// <reference types="cypress" />

describe('Acessibilidade e Navegação', () => {
  
  describe('Header Gov.br', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.waitForAngular();
    });

    it('deve exibir o header com logo Gov.br', () => {
      cy.get('header').should('be.visible');
      cy.contains('Governo Federal').should('be.visible');
    });

    it('deve ter links de acessibilidade', () => {
      cy.contains('Ir para o conteúdo').should('be.visible');
      cy.contains('Ir para o menu').should('be.visible');
    });

    it('deve ter botão de alto contraste', () => {
      cy.contains('Alto Contraste').should('be.visible');
    });

    it('deve alternar alto contraste', () => {
      // Ativa alto contraste
      cy.contains('button', 'Alto Contraste').click();
      cy.wait(300);
      
      // Verifica se a classe foi aplicada
      cy.get('body').should('have.class', 'high-contrast');
      
      // Desativa
      cy.contains('button', 'Alto Contraste').click();
      cy.wait(300);
      
      cy.get('body').should('not.have.class', 'high-contrast');
    });
  });

  describe('Navegação e Menu', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.waitForAngular();
    });

    it('deve exibir menu de navegação', () => {
      cy.contains('Dashboard').should('be.visible');
      cy.contains('Consulta').should('be.visible');
    });

    it('deve navegar para Dashboard', () => {
      cy.contains('a', 'Dashboard').click();
      cy.url().should('include', '/dashboard');
      cy.contains('Evolução de Preço').should('be.visible');
    });

    it('deve navegar para Consulta', () => {
      cy.contains('a', 'Consulta').click();
      cy.url().should('include', '/consulta');
      cy.contains('Consulta de Abastecimentos').should('be.visible');
    });

    it('deve navegar entre rotas', () => {
      cy.contains('a', 'Dashboard').click();
      cy.wait(300);
      cy.url().should('include', '/dashboard');
      
      cy.contains('a', 'Consulta').click();
      cy.wait(300);
      cy.url().should('include', '/consulta');
    });
  });

  describe('Breadcrumbs', () => {
    it('deve exibir breadcrumbs corretos no dashboard', () => {
      cy.visit('/dashboard');
      cy.waitForAngular();
      
      cy.get('[aria-label*="Breadcrumb"]').should('exist');
      cy.contains('Dashboard').should('be.visible');
    });

    it('deve exibir breadcrumbs corretos na consulta', () => {
      cy.visit('/consulta');
      cy.waitForAngular();
      
      cy.get('[aria-label*="Breadcrumb"]').should('exist');
      cy.contains('Consulta').should('be.visible');
    });
  });

  describe('Navegação por Teclado', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.waitForAngular();
    });

    it('deve ter elementos focáveis', () => {
      // Verifica se botões e links são focáveis
      cy.get('button, a').first().focus();
      cy.focused().should('exist');
    });

    it('deve ter foco visível em elementos interativos', () => {
      cy.contains('button', 'Alto Contraste').focus();
      cy.focused().should('have.css', 'outline');
    });
  });

  describe('Página 404', () => {
    it('deve exibir página 404 para rota inexistente', () => {
      cy.visit('/rota-inexistente', { failOnStatusCode: false });
      cy.waitForAngular();
      
      cy.contains('404').should('be.visible');
      cy.contains('Página não encontrada').should('be.visible');
    });

    it('deve ter botão para voltar à home', () => {
      cy.visit('/404');
      cy.waitForAngular();
      
      cy.contains('Ir para o Dashboard').should('be.visible');
    });
  });

  describe('Responsividade', () => {
    const viewports = [
      { device: 'iphone-x', width: 375, height: 812 },
      { device: 'ipad-2', width: 768, height: 1024 },
      { device: 'macbook-15', width: 1440, height: 900 }
    ];

    viewports.forEach(({ device, width, height }) => {
      it(`deve ser responsivo em ${device}`, () => {
        cy.viewport(width, height);
        cy.visit('/dashboard');
        cy.waitForAngular();
        
        cy.get('header').should('be.visible');
        cy.contains('Dashboard').should('be.visible');
      });
    });
  });

  describe('ARIA e Semântica', () => {
    beforeEach(() => {
      cy.visit('/dashboard');
      cy.waitForAngular();
    });

    it('deve ter roles ARIA corretos', () => {
      cy.get('[role="navigation"]').should('exist');
      cy.get('[role="img"]').should('exist');
    });

    it('deve ter aria-labels em elementos interativos', () => {
      cy.get('button[aria-label]').should('have.length.at.least', 1);
    });

    it('deve ter estrutura de headings correta', () => {
      cy.get('h1, h2, h3').should('have.length.at.least', 1);
    });
  });
});
