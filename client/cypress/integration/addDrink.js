/// <reference types="Cypress" />

import { login } from "./authentication";

const searchStep = "add-drink-search";
const popin = "add-drink-popin";
const directCTA = "add-drink-direct";
const month = "month-cases";

context("Add Drink", () => {
  beforeEach(() => {
    login();
  });

  it("Click on direct CTA", () => {
    cy.getNrt(directCTA).click();
    cy.getNrt(searchStep).should("be.visible");
  });

  // it("Click on day case", () => {
  //   cy.getNrt(month)
  //     .first()
  //     .find("button")
  //     .first()
  //     .click();
  //   cy.getNrt(searchStep).should("be.visible");
  // });

  context("Search", () => {
    it("Has default results", () => {});
  });
});
