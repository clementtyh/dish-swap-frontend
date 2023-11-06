describe("Recipes Page, not logged in", () => {
  it("recipes page, no create button, can search", () => {
    const baseUrl = Cypress.env("CYPRESS_baseUrl");
    cy.visit(baseUrl + "/recipes");

    cy.get("[data-test=create-update-recipe-button]").should("not.exist");

    cy.get("[data-test=recipes-search-input]").type("Chicken");
    cy.get("[data-test=recipes-search-button]").click();

    cy.get("[data-test=recipe-name]").should("have.text", "Fried Chicken");
  });

});
