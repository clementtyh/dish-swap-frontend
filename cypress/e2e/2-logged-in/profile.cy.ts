describe("Profile page, logged in", () => {
  beforeEach(() => {
    cy.signin();
    cy.checkNavigationBar(true);
  });

  it("access profile page, logged in", () => {
    const baseUrl = Cypress.env("CYPRESS_baseUrl");
    
    cy.visit(baseUrl + "/profile");
    cy.url().should("eq", baseUrl + "/profile");

    
    cy.get("[data-test=profile-Reviews-button]").should("exist").click();
    cy.get("[data-test=profile-review-card]").should("exist")

    cy.get("[data-test=profile-Recipes-button]").should("exist").click();
    cy.get("[data-test=card]").should("exist")

    cy.get("[data-test=profile-Flavourmarks-button]").should("exist").click();
    cy.get("[data-test=card]").should("exist")

    cy.get("[data-test=profile-settings-button]").should("exist").click();
    cy.url().should("eq", baseUrl + "/settings");
  });
});
