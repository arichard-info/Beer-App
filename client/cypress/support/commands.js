Cypress.Commands.add("getNrt", (selector) => {
  return cy.get(`[data-nrt=${selector}]`);
});
