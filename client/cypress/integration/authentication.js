/// <reference types="Cypress" />

context("Authentication", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Login", () => {
    cy.server();
    cy.route("POST", "/api/auth/login", "fixture:authentication/login.json").as(
      "loginRequest"
    );
    cy.get('input[name="email"]').type("test@email.com");
    cy.get('input[name="password"]').type("testpassword{enter}");
    cy.wait("@loginRequest").then(xhrs => {
      expect(localStorage.getItem("auth_token")).to.exist;
    });
  });

  it("Signup", () => {
    cy.server();
    cy.route(
      "POST",
      "/api/auth/register",
      "fixture:authentication/register.json"
    ).as("registerRequest");

    cy.get('[href="/signup"]').click();
    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type("test@email.com");
    cy.get('input[name="password"]').type("testpasswo");
    cy.get('input[name="passwordConfirm"]').type("testpasswo{enter}");
    cy.wait("@registerRequest").then(xhrs => {
      expect(localStorage.getItem("auth_token")).to.exist;
    });
  });

  it("Forgotten password", () => {});

  it("Google authentication", () => {
    // cy.get("button.google").click();
  });
});
