describe("Recipes Page, logged in", () => {
  it("recipes page, have create button, can search", () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    cy.signin()
    const baseUrl = Cypress.env("CYPRESS_baseUrl");
    cy.visit(baseUrl + "/recipes");

    cy.get("[data-test=create-update-recipe-button]").should("exist");

    cy.get("[data-test=recipes-search-input]").type("Chicken");
    cy.get("[data-test=recipes-search-button]").click();

    cy.get("[data-test=recipe-name]").should("have.text", "Fried Chicken");
  });

});
