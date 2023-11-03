describe("Landing Page, not logged in", () => {
  beforeEach(() => {
    cy.checkNavigationBar(false);
  });

  it("access landing page content and link, not logged in", () => {
    cy.checkLandingPage(false);
  });
});
