/// <reference types="Cypress" />

import { v4 } from "uuid";

const signupCta = "signup-cta";
const signupForm = "signup-form";
const loginForm = "login-form";

const fieldEmail = "input-email";
const fieldPassword = "input-password";
const fieldName = "input-name";
const fieldPasswordConfirm = "input-passwordconfirm";

context("Authentication", () => {
  beforeEach(function () {
    cy.visit("/");
    cy.fixture("authentication/user").then((user) => {
      this.user = user;
    });
  });

  context("Login", () => {
    it("Login", function () {
      cy.intercept("POST", "/api/auth/login").as("loginRequest");
      cy.getNrt(loginForm).within(() => {
        cy.getNrt(fieldEmail).type(this.user.username);
        cy.getNrt(fieldPassword).type(`${this.user.password}{enter}`);
      });
      cy.wait("@loginRequest").then((xhrs) => {
        cy.getCookie("auth").should("exist");
      });
    });

    it("Login with wrong credentials", function () {
      cy.intercept("POST", "/api/auth/login").as("loginRequest");
      cy.getNrt(loginForm).within(() => {
        cy.getNrt(fieldEmail).type("test@email.com");
        cy.getNrt(fieldPassword).type("testpassword{enter}");
        cy.wait("@loginRequest").then((xhrs) => {
          cy.getNrt(fieldEmail).should("be.visible");
          cy.getNrt(fieldPassword).should("be.visible");
          cy.getCookie("auth").should("not.exist");
        });
      });
    });
  });

  context("Signup", () => {
    it("Signup", function () {
      const randomUsr = v4();
      cy.intercept("POST", "/api/auth/register").as("registerRequest");
      cy.getNrt(signupCta).click();
      cy.getNrt(signupForm).within(() => {
        cy.getNrt(fieldName).type(randomUsr);
        cy.getNrt(fieldEmail).type(`${randomUsr}-test@email.com`);
        cy.getNrt(fieldPassword).type("Testpasswo55!");
        cy.getNrt(fieldPasswordConfirm).type("Testpasswo55!{enter}");
        cy.wait("@registerRequest").then(() => {
          cy.getCookie("auth").should("exist");
        });
      });
    });
  });
});
