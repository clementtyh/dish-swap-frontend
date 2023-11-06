// describe("Recipe Page, logged in", () => {
//   beforeEach(() => {
//     cy.signin();
//     const baseUrl = Cypress.env("CYPRESS_baseUrl");
//     cy.visit(baseUrl + "/recipes");
//   });

//   it("recipe page, have edit and delete button for own recipe, dont have review button", () => {
//     cy.get("[data-test=recipes-search-input]").type("Fried Chicken");
//     cy.get("[data-test=recipes-search-button]").click();
//     cy.get("[data-test=card]").click();

//     cy.get("h1").should("have.text", "Fried Chicken");

//     cy.get("[data-test=create-update-recipe-button]").should("exist");
//     cy.get("[data-test=delete-recipe-button]").should("exist");

//     cy.get("[data-test=write-review-button]").should("not.exist");
//   });

//   it("recipe page, no edit and delete button for others recipe, have review button (not yet reviewed)", () => {
//     cy.get("[data-test=recipes-search-input]").type("Burger BigMac");
//     cy.get("[data-test=card]").click();

//     cy.get("h1").should("have.text", "Burger BigMac");

//     cy.get("[data-test=create-update-recipe-button]").should("not.exist");
//     cy.get("[data-test=delete-recipe-button]").should("not.exist");

//     cy.get("[data-test=write-review-button]").should("exist");
//   });

// });
