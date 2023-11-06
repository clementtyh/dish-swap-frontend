describe("Profile Page, not logged in", () => {
  it("profile page inaccessible, redirected to unauthorised page", () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    const baseUrl = Cypress.env("CYPRESS_baseUrl");
    cy.visit(baseUrl + "/profile");

    cy.get("h1").should("have.text", "Whoops!");

    cy.get("[data-test=profile-unauthorised-signup]").should("exist").click();
    cy.url().should("eq", baseUrl + "/signup");

    cy.visit(baseUrl + "/profile");
    cy.get("[data-test=profile-unauthorised-signin]").should("exist").click();
    cy.url().should("eq", baseUrl + "/signin");
  });
});
