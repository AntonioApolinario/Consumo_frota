/// <reference types="cypress" />

describe('Consulta de Abastecimentos', () => {
  beforeEach(() => {
    cy.visit('/consulta');
    cy.waitForAngular();
  });

  it('deve carregar a página de consulta', () => {
    cy.url().should('include', '/consulta');
    cy.contains('Consulta de Abastecimentos').should('be.visible');
  });

  it('deve exibir a tabela de abastecimentos', () => {
    cy.get('table').should('be.visible');
    cy.get('tbody tr').should('have.length.at.least', 1);
  });

  it('deve exibir as colunas corretas na tabela', () => {
    cy.contains('th', 'Data').should('be.visible');
    cy.contains('th', 'Posto').should('be.visible');
    cy.contains('th', 'Cidade/UF').should('be.visible');
    cy.contains('th', 'Combustível').should('be.visible');
    cy.contains('th', 'Valor/Litro').should('be.visible');
    cy.contains('th', 'Total Pago').should('be.visible');
  });

  it('deve permitir filtrar por estado', () => {
    // Seleciona um estado (primeiro select)
    cy.get('select').first().select('SP');
    cy.wait(500);
    
    // Verifica se a tabela foi atualizada
    cy.get('tbody tr').should('have.length.at.least', 1);
  });

  it('deve permitir filtrar por tipo de combustível', () => {
    // Seleciona gasolina (segundo select)
    cy.get('select').eq(1).select('Gasolina');
    cy.wait(500);
    
    // Verifica se existem resultados
    cy.get('tbody tr').should('exist');
  });

  it('deve limpar filtros corretamente', () => {
    // Aplica filtros
    cy.get('select').first().select('SP');
    cy.wait(500);
    
    // Limpa filtros
    cy.contains('button', 'Limpar Filtros').click();
    cy.wait(500);
    
    // Verifica se voltou ao estado inicial
    cy.get('tbody tr').should('have.length.at.least', 1);
  });

  it('deve exibir paginação', () => {
    cy.contains('Mostrando').should('be.visible');
    cy.get('app-paginacao').should('exist');
  });

  it('deve exibir informação de páginas', () => {
    // Verifica se mostra informação de paginação
    cy.get('app-paginacao').within(() => {
      cy.contains('Página').should('be.visible');
      cy.contains('de').should('be.visible');
    });
  });

  it('deve ter botões de navegação de páginas', () => {
    // Verifica se botões existem
    cy.contains('button', 'Anterior').should('exist');
    cy.contains('button', 'Próxima').should('exist');
  });

  it('deve abrir modal ao clicar na linha da tabela', () => {
    // Clica na primeira linha
    cy.get('tbody tr').first().click();
    cy.wait(500);
    
    // Verifica se o modal abriu
    cy.get('[role="dialog"]').should('be.visible');
    cy.contains('Detalhes do Abastecimento').should('be.visible');
  });

  it('deve exibir dados formatados corretamente', () => {
    // Verifica formatação de moeda
    cy.contains('R$').should('exist');
    
    // Verifica se tem dados na tabela
    cy.get('tbody tr td').should('have.length.at.least', 5);
  });
});
