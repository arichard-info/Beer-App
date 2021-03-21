/// <reference types="Cypress" />

const searchStep = "add-drink-search";
const popin = "add-drink-popin";
const directCTA = "add-drink-direct";
const month = "month-cases";

context("Grid", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Quick CTA", () => {
    cy.visit("/");
    cy.getNrt(directCTA).click();
    cy.getNrt(searchStep).should("be.visible");
  });
});
