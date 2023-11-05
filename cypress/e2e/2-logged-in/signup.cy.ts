describe("Sign Up Page, logged in", () => {
  it("sign up page inaccessible, redirected to recipes", () => {
    cy.signin();
    const baseUrl = Cypress.env("CYPRESS_baseUrl");
    cy.visit(baseUrl + "/signup");
    cy.url().should("eq", baseUrl + "/recipes?sortby=newest");
  });
});
