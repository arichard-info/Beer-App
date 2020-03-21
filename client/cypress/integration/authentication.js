/// <reference types="Cypress" />

context("Authentication", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Login", () => {
    cy.server();
    cy.route("POST", "/api/auth/login", "fixture:authentication/login.json").as(
      "loginRequest"
    );
    cy.get('input[name="email"]').type("test@email.com");
    cy.get('input[name="password"]').type("testpassword{enter}");
    cy.wait("@loginRequest").then(xhrs => {});
  });

  it("Login with wrong credentials", () => {
    cy.server();
    cy.route(
      "POST",
      "/api/auth/login",
      "fixture:authentication/login-error.json"
    ).as("loginRequest");
    cy.get('input[name="email"]').type("test@email.com");
    cy.get('input[name="password"]').type("testpassword{enter}");
    cy.wait("@loginRequest").then(xhrs => {
      cy.get('input[name="email"]').should("exist");
      cy.get('input[name="password"]').should("exist");
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
    cy.get('input[name="password"]').type("Testpasswo55!");
    cy.get('input[name="confirm"]').type("Testpasswo55!{enter}");
    cy.wait("@registerRequest").then(() => {});
  });

  /*
  it("Forgotten password", () => {});

  it("Google authentication", () => {
    // cy.get("button.google").click();
  });
  */
});
