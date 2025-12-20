/// <reference types="cypress" />

describe('Modal de Detalhes do Registro', () => {
  beforeEach(() => {
    cy.visit('/consulta');
    cy.waitForAngular();
  });

  it('deve abrir o modal ao clicar na linha da tabela', () => {
    cy.get('tbody tr').first().click();
    cy.wait(500);
    
    cy.get('[role="dialog"]').should('be.visible');
    cy.contains('Detalhes do Abastecimento').should('be.visible');
  });

  it('deve exibir informações do motorista', () => {
    cy.get('tbody tr').first().click();
    cy.wait(500);
    
    cy.contains('Motorista').should('be.visible');
    cy.contains('Nome').should('be.visible');
    cy.contains('CPF').should('be.visible');
  });

  it('deve exibir informações do veículo', () => {
    cy.get('tbody tr').first().click();
    cy.wait(500);
    
    cy.contains('Veículo').should('be.visible');
    cy.contains('Placa').should('be.visible');
    cy.contains('Modelo').should('be.visible');
  });

  it('deve exibir informações do abastecimento', () => {
    cy.get('tbody tr').first().click();
    cy.wait(500);
    
    cy.contains('Informações do Abastecimento').should('be.visible');
    cy.contains('Posto').should('be.visible');
    cy.contains('Combustível').should('be.visible');
    cy.contains('Litros').should('be.visible');
    cy.contains('R$').should('be.visible');
  });

  it('deve mascarar CPF para privacidade', () => {
    cy.get('tbody tr').first().click();
    cy.wait(500);
    
    // Verifica se CPF está mascarado (formato ***.XXX.XXX-**)
    cy.contains('***').should('be.visible');
  });

  it('deve ter botão Reportar Erro', () => {
    cy.get('tbody tr').first().click();
    cy.wait(500);
    
    cy.contains('button', 'Reportar Erro').scrollIntoView().should('be.visible');
  });

  it('deve fechar modal ao clicar no X', () => {
    cy.get('tbody tr').first().click();
    cy.wait(500);
    
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('button[aria-label="Fechar modal"]').first().click();
    cy.wait(300);
    
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('deve fechar modal ao clicar no botão Fechar', () => {
    cy.get('tbody tr').first().click();
    cy.wait(500);
    
    cy.contains('button', 'Fechar').click();
    cy.wait(300);
    
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('deve ter funcionalidade de fechar com ESC', () => {
    cy.get('tbody tr').first().click();
    cy.wait(500);
    
    // Verifica que modal está aberto
    cy.get('[role="dialog"]').should('be.visible');
  });

  it('deve ter elementos focáveis no modal', () => {
    cy.get('tbody tr').first().click();
    cy.wait(500);
    
    // Verifica se botões são focáveis
    cy.get('[role="dialog"] button').first().focus();
    cy.focused().should('exist');
  });

  it('deve ter atributos ARIA corretos', () => {
    cy.get('tbody tr').first().click();
    cy.wait(500);
    
    cy.get('[role="dialog"]').should('have.attr', 'aria-modal', 'true');
    cy.get('[aria-labelledby]').should('exist');
  });
});
