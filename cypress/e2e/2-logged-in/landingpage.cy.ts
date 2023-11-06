describe("Landing Page, logged in", () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    cy.signin();
    cy.checkNavigationBar(true);
  });

  it("access landing page and content, logged in", () => {
    cy.checkLandingPage(true);
  });
});
