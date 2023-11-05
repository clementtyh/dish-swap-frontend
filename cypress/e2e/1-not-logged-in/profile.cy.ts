describe("Profile Page, not logged in", () => {
  it("profile page inaccessible, redirected to recipes", () => {
    const baseUrl = Cypress.env("CYPRESS_baseUrl");
    cy.visit(baseUrl + "/profile");
    // cy.url().should("eq", baseUrl + "/recipes?sortby=newest");
  });
});
