describe("Sign In Page, logged in", () => {
  it("sign in page inaccessible, redirected to recipes", () => {
    cy.signin();
    const baseUrl = Cypress.env("CYPRESS_baseUrl");
    cy.visit(baseUrl + "/signin");
    cy.url().should("eq", baseUrl + "/recipes?sortby=newest");
  });
});
