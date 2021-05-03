const getNrtSelector = (s) => `[data-nrt=${s}]`;

Cypress.Commands.add("getNrt", (selector) => {
  return cy.get(getNrtSelector(selector));
});

Cypress.Commands.add(
  "findNrt",
  {
    prevSubject: true,
  },
  (subject, selector, options) => {
    return cy.wrap(subject).find(getNrtSelector(selector), options);
  }
);

Cypress.Commands.add("login", () => {
  cy.fixture("authentication/user").then((user) => {
    cy.wrap(user).as("user");
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
