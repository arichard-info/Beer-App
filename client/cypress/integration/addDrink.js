/// <reference types="Cypress" />

const searchStep = "add-drink-search";
const popin = "add-drink-popin";
const directCTA = "add-drink-direct";
const month = "month-cases";

context("Add Drink", () => {
  beforeEach(() => {
    cy.server();
    cy.route("POST", "/api/auth/login").as("loginRequest");
    cy.visit("/");
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

  it("Click on direct CTA", () => {
    cy.getNrt(directCTA).click();
    cy.getNrt(searchStep).should("be.visible");
  });

  it("Click on day case", () => {
    cy.getNrt(monthCases)
      .first()
      .find("button")
      .first()
      .click();
    cy.getNrtt(searchStep).should("be.visible");
  });

  context("Search", () => {
    it("Has default results", () => {});
  });
});
