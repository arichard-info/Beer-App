/// <reference types="Cypress" />

context("Authentication", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Login", () => {});

  it("Signup", () => {
    cy.server();
    cy.route({ url: "/api/auth/register", method: "POST" }).as(
      "registerRequest"
    );

    cy.get('[href="/signup"]').click();
    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type("test@email.com");
    cy.get('input[name="password"]').type("testpasswo");
    cy.get('input[name="passwordConfirm"]').type("testpasswo{enter}");
    cy.wait("@registerRequest").then(xhrs => {
      cy.wait(3000).then(() => {
        expect(localStorage.getItem("auth_token")).to.exist();
      });
    });
  });

  it("Forgotten password", () => {});

  it("Google authentication", () => {});
});
