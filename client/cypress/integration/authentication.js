/// <reference types="Cypress" />
import { v4 } from "uuid";

export const loginForm = "login-form";
export const loginFieldEmail = "field-email";
export const loginFieldPassword = "field-password";

export const signupCta = "signup-cta";
export const signupForm = "signup-form";
export const signupFieldName = "field-name";
export const signupFieldEmail = "field-email";
export const signupFieldPassword = "field-password";
export const signupFieldPasswordConfirm = "field-confirm";

export const login = () => {
  cy.visit("/");
  cy.fixture("authentication/user").then(user => {
    cy.server();
    cy.route("POST", "/api/auth/login").as("loginRequest");
    cy.getNrt(loginForm).within(() => {
      cy.getNrt(loginFieldEmail)
        .find("input")
        .type(this.user.username);
      cy.getNrt(loginFieldPassword)
        .find("input")
        .type(`${this.user.password}{enter}`);
    });
    cy.wait("@loginRequest");
  });
};

context("Authentication", () => {
  beforeEach(function() {
    cy.visit("/");
    cy.fixture("authentication/user").then(user => {
      this.user = user;
    });
  });

  it("Login", function() {
    cy.server();
    cy.route("POST", "/api/auth/login").as("loginRequest");
    cy.getNrt(loginForm).within(() => {
      cy.getNrt(loginFieldEmail)
        .find("input")
        .type(this.user.username);
      cy.getNrt(loginFieldPassword)
        .find("input")
        .type(`${this.user.password}{enter}`);
    });
    cy.wait("@loginRequest").then(xhrs => {
      cy.getCookie("auth").should("exist");
    });
  });

  it("Login with wrong credentials", function() {
    const checkNotLoggued = () => {
      cy.getNrt(loginFieldEmail).should("be.visible");
      cy.getNrt(loginFieldPassword).should("be.visible");
      cy.getCookie("auth").should("not.exist");
    };

    cy.server();
    cy.route("POST", "/api/auth/login").as("loginRequest");
    cy.getNrt(loginForm).within(() => {
      cy.getNrt(loginFieldEmail)
        .find("input")
        .type("test@email.com");
      cy.getNrt(loginFieldPassword)
        .find("input")
        .type("testpassword{enter}");
      cy.wait("@loginRequest").then(xhrs => {
        cy.getNrt(loginFieldEmail).should("be.visible");
        cy.getNrt(loginFieldPassword).should("be.visible");
        cy.getCookie("auth").should("not.exist");
      });
    });
  });

  it("Signup", function() {
    const randomUsr = v4();
    cy.server();
    cy.route("POST", "/api/auth/register").as("registerRequest");
    cy.getNrt(signupCta).click();
    cy.getNrt(signupForm).within(() => {
      cy.getNrt(signupFieldName)
        .find("input")
        .type(randomUsr);
      cy.getNrt(signupFieldEmail)
        .find("input")
        .type(`${randomUsr}-test@email.com`);
      cy.getNrt(signupFieldPassword)
        .find("input")
        .type("Testpasswo55!");
      cy.getNrt(signupFieldPasswordConfirm)
        .find("input")
        .type("Testpasswo55!{enter}");
      cy.wait("@registerRequest").then(() => {
        cy.getCookie("auth").should("exist");
      });
    });
  });

  /*
  it("Forgotten password", () => {});

  it("Google authentication", () => {
    // cy.get("button.google").click();
  });
  */
});
