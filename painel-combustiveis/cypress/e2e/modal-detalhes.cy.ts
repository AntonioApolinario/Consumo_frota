/// <reference types="cypress" />

describe('Modal de Detalhes do Registro', () => {
  beforeEach(() => {
    cy.visit('/consulta');
    cy.waitForAngular();
  });

  it('deve abrir o modal ao clicar em Ver Detalhes', () => {
    cy.contains('button', 'Ver Detalhes').first().click();
    cy.wait(500);
    
    cy.get('[role="dialog"]').should('be.visible');
    cy.contains('Detalhes do Abastecimento').should('be.visible');
  });

  it('deve exibir informações do motorista', () => {
    cy.contains('button', 'Ver Detalhes').first().click();
    cy.wait(500);
    
    cy.contains('Dados do Motorista').should('be.visible');
    cy.contains('Nome').should('be.visible');
    cy.contains('CPF').should('be.visible');
  });

  it('deve exibir informações do veículo', () => {
    cy.contains('button', 'Ver Detalhes').first().click();
    cy.wait(500);
    
    cy.contains('Dados do Veículo').should('be.visible');
    cy.contains('Placa').should('be.visible');
    cy.contains('Modelo').should('be.visible');
  });

  it('deve exibir informações do abastecimento', () => {
    cy.contains('button', 'Ver Detalhes').first().click();
    cy.wait(500);
    
    cy.contains('Dados do Abastecimento').should('be.visible');
    cy.contains('Posto').should('be.visible');
    cy.contains('Combustível').should('be.visible');
    cy.contains('Litros').should('be.visible');
    cy.contains('R$').should('be.visible');
  });

  it('deve mascarar CPF para privacidade', () => {
    cy.contains('button', 'Ver Detalhes').first().click();
    cy.wait(500);
    
    // Verifica se CPF está mascarado (formato ***.XXX.XXX-**)
    cy.contains('***').should('be.visible');
  });

  it('deve ter botão Reportar Erro', () => {
    cy.contains('button', 'Ver Detalhes').first().click();
    cy.wait(500);
    
    cy.contains('button', 'Reportar Erro').should('be.visible');
  });

  it('deve fechar modal ao clicar no X', () => {
    cy.contains('button', 'Ver Detalhes').first().click();
    cy.wait(500);
    
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('button[aria-label="Fechar"]').click();
    cy.wait(300);
    
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('deve fechar modal ao clicar no botão Fechar', () => {
    cy.contains('button', 'Ver Detalhes').first().click();
    cy.wait(500);
    
    cy.contains('button', 'Fechar').click();
    cy.wait(300);
    
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('deve fechar modal ao pressionar ESC', () => {
    cy.contains('button', 'Ver Detalhes').first().click();
    cy.wait(500);
    
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('body').type('{esc}');
    cy.wait(300);
    
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('deve ter trap de foco no modal', () => {
    cy.contains('button', 'Ver Detalhes').first().click();
    cy.wait(500);
    
    // Verifica se o foco está dentro do modal
    cy.get('[role="dialog"]').within(() => {
      cy.focused().should('exist');
    });
  });

  it('deve ter atributos ARIA corretos', () => {
    cy.contains('button', 'Ver Detalhes').first().click();
    cy.wait(500);
    
    cy.get('[role="dialog"]').should('have.attr', 'aria-modal', 'true');
    cy.get('[aria-labelledby]').should('exist');
  });
});
