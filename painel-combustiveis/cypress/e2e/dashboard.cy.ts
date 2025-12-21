/// <reference types="cypress" />

describe('Dashboard - Visão Gerencial', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
    cy.waitForAngular();
  });

  it('deve carregar a página do dashboard', () => {
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });

  it('deve exibir os 4 KPI cards', () => {
    // Verifica se os 4 cards de KPI estão visíveis
    cy.contains('Preço Médio - Gasolina').should('be.visible');
    cy.contains('Preço Médio - Diesel').should('be.visible');
    cy.contains('Total de Litros').should('be.visible');
    cy.contains('Postos Monitorados').should('be.visible');
  });

  it('deve exibir valores numéricos nos KPIs', () => {
    // Verifica se os valores estão formatados corretamente
    cy.contains('R$').should('be.visible');
    cy.get('app-kpi-card').should('have.length.at.least', 4);
  });

  it('deve exibir o gráfico de evolução de preços', () => {
    cy.contains('Evolução de Preço').should('be.visible');
    cy.get('canvas').should('exist');
  });

  it('deve exibir o gráfico de consumo por região', () => {
    cy.contains('Consumo por Região').should('be.visible');
    cy.get('canvas').should('have.length', 2); // 2 gráficos
  });

  it('deve permitir navegação via breadcrumbs', () => {
    cy.contains('Dashboard').should('be.visible');
    cy.get('[aria-label*="Breadcrumb"]').should('exist');
  });

  it('deve ter elementos acessíveis', () => {
    // Verifica se gráficos existem
    cy.get('canvas').should('have.length', 2);
    cy.get('[role="img"]').should('exist');
  });

  it('deve ser responsivo', () => {
    // Testa viewport mobile
    cy.viewport('iphone-x');
    cy.contains('Dashboard').should('be.visible');
    
    // Volta para desktop
    cy.viewport(1280, 720);
    cy.contains('Dashboard').should('be.visible');
  });
});
