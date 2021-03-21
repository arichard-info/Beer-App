Cypress.Commands.add("getNrt", (selector) => {
  return cy.get(`[data-nrt=${selector}]`);
});

Cypress.Commands.add("login", () => {
  const loginForm = "login-form";
  const fieldEmail = "input-email";
  const fieldPassword = "input-password";
  cy.visit("/");
  cy.fixture("authentication/user").then((user) => {
    cy.intercept("POST", "/api/auth/login").as("loginRequest");
    cy.getNrt(loginForm).within(() => {
      cy.getNrt(fieldEmail).type(user.username);
      cy.getNrt(fieldPassword).type(`${user.password}{enter}`);
    });
    cy.wait("@loginRequest");
  });
});
