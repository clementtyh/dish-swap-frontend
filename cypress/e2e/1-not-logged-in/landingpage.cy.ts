describe("Landing Page, not logged in", () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    cy.checkNavigationBar(false);
  });

  it("access landing page content and link, not logged in", () => {
    cy.checkLandingPage(false);
  });
  //demo pipeline
});
