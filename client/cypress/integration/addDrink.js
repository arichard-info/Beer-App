/// <reference types="Cypress" />

const searchStep = "add-drink-search";
const popin = "add-drink-popin";
const directCTA = "add-drink-direct";
const month = "month-cases";

context("Add Drink", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Click on direct CTA", () => {
    cy.getNrt(directCTA).click();
    cy.getNrt(searchStep).should("be.visible");
  });

  context("Search", () => {
    it("Has default results", () => {});
  });
});
