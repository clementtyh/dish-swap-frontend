describe("Recipe Page, not logged in", () => {
  it("recipe page, no edit and delete button and review button", () => {
    const baseUrl = Cypress.env("CYPRESS_baseUrl");
    cy.visit(baseUrl + "/recipes");

    cy.get("[data-test=recipes-search-input]").type("Fried Chicken");
    cy.get("[data-test=recipes-search-button]").click();
    cy.get("[data-test=card]").click();

    cy.get("h1").should("have.text", "Fried Chicken");

    cy.get("[data-test=create-update-recipe-button]").should("not.exist");
    cy.get("[data-test=delete-recipe-button]").should("not.exist");
    cy.get("[data-test=write-review-button]").should("not.exist");
  });

});
