describe("Profile page, logged in", () => {
  beforeEach(() => {
    cy.signin();
    cy.checkNavigationBar(true);
  });

  it("access profile page, logged in", () => {
    const baseUrl = Cypress.env("CYPRESS_baseUrl");
    cy.get("[data-test=navbar-account]").should("exist").click();
    cy.get("[data-test=navbar-profile-link]").should("exist").click();
    cy.url().should("eq", baseUrl + "/profile");

    cy.get("[data-test=profile-settings-button]").should("exist").click();
    cy.url().should("eq", baseUrl + "/settings");

    cy.get("[data-test=profile-Recipes-button]").should("exist").click();
  });
});
