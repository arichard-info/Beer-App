Cypress.Commands.add("getNrt", (selector) => {
  return cy.get(`[data-nrt=${selector}]`);
});

Cypress.Commands.add("login", () => {
  cy.fixture("authentication/user").then((user) => {
    cy.request({
      method: "POST",
      url: "/api/auth/login",
      body: {
        email: user.username,
        password: user.password,
      },
    });
  });
});
