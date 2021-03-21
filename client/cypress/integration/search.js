/// <reference types="Cypress" />

const searchStep = "add-drink-search";
const popin = "add-drink-popin";
const directCTA = "add-drink-direct";
const month = "month-cases";

context("Search", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Has default results", () => {
    cy.intercept({
      url: "/api/beers",
      query: { page: "1" },
    }).as("pagination");
    cy.visit("/add-drink");
    cy.getNrt("beers-list").should("be.visible");
    cy.getNrt("beers-count").contains("14");
    cy.getNrt("beer-item").its("length").should("eql", 10);
    cy.getNrt("beers-more").click();
    cy.wait("@pagination");
    cy.getNrt("beer-item").its("length").should("eql", 14);
    cy.getNrt("beers-more").should("not.exist");
  });
  it("No result", () => {
    const search = "zzzzzzzzzzzzzzzzzzz";
    cy.intercept({
      url: "/api/beers",
      query: { page: "0", search },
    }).as("search");
    cy.visit("/add-drink");
    cy.getNrt("beers-count").contains("14");
    cy.getNrt("beer-item").its("length").should("eql", 10);
    cy.getNrt("input-search").type(search);
    cy.wait("@search");
    cy.getNrt("beers-count").contains("Aucune bière trouvée");
    cy.getNrt("beer-item").should("not.exist");
    cy.getNrt("button-custombeer").should("be.visible");
  });
  it("One result", () => {
    const search = "Bourbon Baby";
    cy.intercept({
      url: "/api/beers",
      query: { page: "0", search },
    }).as("search");
    cy.visit("/add-drink");
    cy.getNrt("beers-count").contains("14");
    cy.getNrt("beer-item").its("length").should("eql", 10);
    cy.getNrt("input-search").type(search);
    cy.wait("@search");
    cy.getNrt("beers-count").contains("1");
    cy.getNrt("beer-item").its("length").should("eql", 1);
    cy.getNrt("beers-more").should("not.exist");
  });
});
