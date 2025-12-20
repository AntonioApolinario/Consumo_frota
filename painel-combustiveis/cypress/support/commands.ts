/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to wait for Angular app to be ready
       */
      waitForAngular(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('waitForAngular', () => {
  cy.wait(500); // Wait for Angular to bootstrap
});

export {};
