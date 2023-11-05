describe("Sign In Page, not logged in", () => {
  beforeEach(() => {
    const baseUrl = Cypress.env("CYPRESS_baseUrl");
    cy.visit(baseUrl + "/signin");
    cy.url().should("eq", baseUrl + "/signin");

    cy.get("h1").should("have.text", "RESUME YOUR CULINARY JOURNEY");
  });

  it("sign in successfully", () => {
    cy.signin();
  });

  it("sign in fail bc user not found", () => {
    cy.get("[data-test=signin-email-input]").type("gugugaga@gmail.com");
    cy.get("[data-test=signin-password-input]").type("Test123@");

    cy.intercept("POST", "**/auth/login").as("postSignin");

    cy.get("[data-test=signin-submit-button]").click();

    cy.wait("@postSignin").its("response.statusCode").should("eq", 400);

    cy.get("[data-test=signin-error-message]")
      .should("exist")
      .should(
        "have.text",
        "User with email 'gugugaga@gmail.com' not found"
      );
  });

  it("sign in fail bc invalid pw", () => {
    cy.get("[data-test=signin-email-input]").type("test@gmail.com");
    cy.get("[data-test=signin-password-input]").type("Test123");

    cy.intercept("POST", "**/auth/login").as("postSignin");

    cy.get("[data-test=signin-submit-button]").click();

    cy.wait("@postSignin").its("response.statusCode").should("eq", 400);

    cy.get("[data-test=signin-error-message]")
      .should("exist")
      .should(
        "have.text",
        "Invalid password"
      );
  });
});
