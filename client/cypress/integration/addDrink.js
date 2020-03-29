/// <reference types="Cypress" />

const wrapper = "add-drink-search";
const popin = "add-drink-popin";
const directCTA = "add-drink-direct";

context("Add Drink", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="password"]').type("wes{enter}");
  });

  context("Search", () => {
    it("Click on direct cta", () => {});
    it("Click on day case", () => {});
    it("Has default results", () => {});
  });
});
