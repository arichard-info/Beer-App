/// <reference types="Cypress" />
import { v4 } from "uuid";

import {
  loginForm,
  loginFieldEmail,
  loginFieldPassword,
} from "./authentication.utils";

export const signupCta = "signup-cta";
export const signupForm = "signup-form";
export const signupFieldName = "field-name";
export const signupFieldEmail = "field-email";
export const signupFieldPassword = "field-password";
export const signupFieldPasswordConfirm = "field-confirm";

context("Authentication", () => {
  beforeEach(function () {
    cy.visit("/");
    cy.fixture("authentication/user").then((user) => {
      this.user = user;
    });
  });

  it("Login", function () {
    cy.intercept("POST", "/api/auth/login").as("loginRequest");
    cy.getNrt(loginForm).within(() => {
      cy.getNrt(loginFieldEmail).find("input").type(this.user.username);
      cy.getNrt(loginFieldPassword)
        .find("input")
        .type(`${this.user.password}{enter}`);
    });
    cy.wait("@loginRequest").then((xhrs) => {
      cy.getCookie("auth").should("exist");
    });
  });

  it("Login with wrong credentials", function () {
    const checkNotLoggued = () => {
      cy.getNrt(loginFieldEmail).should("be.visible");
      cy.getNrt(loginFieldPassword).should("be.visible");
      cy.getCookie("auth").should("not.exist");
    };

    cy.intercept("POST", "/api/auth/login").as("loginRequest");
    cy.getNrt(loginForm).within(() => {
      cy.getNrt(loginFieldEmail).find("input").type("test@email.com");
      cy.getNrt(loginFieldPassword).find("input").type("testpassword{enter}");
      cy.wait("@loginRequest").then((xhrs) => {
        cy.getNrt(loginFieldEmail).should("be.visible");
        cy.getNrt(loginFieldPassword).should("be.visible");
        cy.getCookie("auth").should("not.exist");
      });
    });
  });

  it("Signup", function () {
    const randomUsr = v4();
    cy.intercept("POST", "/api/auth/register").as("registerRequest");
    cy.getNrt(signupCta).click();
    cy.getNrt(signupForm).within(() => {
      cy.getNrt(signupFieldName).find("input").type(randomUsr);
      cy.getNrt(signupFieldEmail)
        .find("input")
        .type(`${randomUsr}-test@email.com`);
      cy.getNrt(signupFieldPassword).find("input").type("Testpasswo55!");
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
