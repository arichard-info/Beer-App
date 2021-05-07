const fillBeer = (quantity) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  ).set;
  cy.get('input[type="range"]').then(($range) => {
    const range = $range[0];
    nativeInputValueSetter.call(range, quantity);

    range.dispatchEvent(
      new Event("change", { value: quantity, bubbles: true })
    );
  });
};

context("Add drink", async () => {
  it("User can add existing drink", () => {
    const beerQuantity = 500;
    const today = new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).format(new Date());

    cy.login();
    cy.visit("/add-drink");
    cy.getNrt("beer-item").first().click();
    fillBeer(beerQuantity);
    cy.getNrt("beer-item-name").then(($el) => {
      cy.wrap($el).should("be.visible");
      const beerName = $el.text();
      cy.getNrt("submit-button").click();
      cy.getNrt(`case-${today}`).find("button").click();
      cy.getNrt("beer-item").its("length").should("eql", 1);
      cy.getNrt("beer-item").within(() => {});
      cy.getNrt("beer-item-name").should("contain", beerName);
      cy.getNrt("beer-item-quantity").should("contain", beerQuantity);
    });
  });
});
