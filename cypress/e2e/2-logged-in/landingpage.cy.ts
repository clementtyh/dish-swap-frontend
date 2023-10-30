describe("Landing Page, logged in", () => {
  beforeEach(() => {
    cy.login();
    cy.checkNavigationBar(true);
  });

  it("access landing page and content, logged in", () => {
    cy.checkLandingPage(true);
  });
});
