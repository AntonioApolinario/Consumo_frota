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
    cy.contains('th', 'Ações').should('be.visible');
  });

  it('deve permitir filtrar por estado', () => {
    // Seleciona um estado
    cy.get('select[aria-label*="estado"]').select('SP');
    cy.wait(500);
    
    // Verifica se a tabela foi atualizada
    cy.get('tbody tr').should('have.length.at.least', 1);
  });

  it('deve permitir filtrar por tipo de combustível', () => {
    // Seleciona gasolina
    cy.get('select').contains('option', 'Gasolina').parent().select('gasolina');
    cy.wait(500);
    
    // Verifica se existem resultados
    cy.get('tbody tr').should('exist');
  });

  it('deve limpar filtros corretamente', () => {
    // Aplica filtros
    cy.get('select[aria-label*="estado"]').select('SP');
    cy.wait(500);
    
    // Limpa filtros
    cy.contains('button', 'Limpar Filtros').click();
    cy.wait(500);
    
    // Verifica se voltou ao estado inicial
    cy.get('tbody tr').should('have.length.at.least', 1);
  });

  it('deve exibir paginação', () => {
    cy.contains('Itens por página').should('be.visible');
    cy.get('select[aria-label*="itens por página"]').should('exist');
  });

  it('deve permitir mudar itens por página', () => {
    // Muda para 20 itens
    cy.get('select[aria-label*="itens por página"]').select('20');
    cy.wait(500);
    
    // Verifica se a tabela foi atualizada
    cy.get('tbody tr').should('have.length.at.most', 20);
  });

  it('deve permitir navegar entre páginas', () => {
    // Vai para próxima página
    cy.contains('button', 'Próximo').click();
    cy.wait(500);
    
    // Verifica se mudou de página
    cy.get('tbody tr').should('exist');
    
    // Volta para anterior
    cy.contains('button', 'Anterior').click();
    cy.wait(500);
  });

  it('deve abrir modal ao clicar em Ver Detalhes', () => {
    // Clica no primeiro botão de detalhes
    cy.contains('button', 'Ver Detalhes').first().click();
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
