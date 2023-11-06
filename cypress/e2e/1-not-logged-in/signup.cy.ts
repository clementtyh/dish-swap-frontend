import generateData from "../../helpers/generateData";

describe("Sign Up Page, not logged in", () => {
  beforeEach(() => {
    const baseUrl = Cypress.env("CYPRESS_baseUrl");
    cy.visit(baseUrl + "/signup");
    cy.url().should("eq", baseUrl + "/signup");

    cy.get("h1").should("have.text", "START YOUR CULINARY JOURNEY");
  });

  it("sign up successfully", () => {
    const randomUser = generateData();

    cy.get("[data-test=signup-email-input]").type(randomUser.email);
    cy.get("[data-test=signup-display_name-input]").type(
      randomUser.display_name
    );
    cy.get("[data-test=signup-password-input]").type(randomUser.password);
    cy.get("[data-test=signup-confirm_password-input]").type(
      randomUser.confirm_password
    );

    cy.intercept("POST", "**/user/register").as("postSignup");

    cy.get("[data-test=signup-submit-button]").click();

    cy.wait("@postSignup")
      .its("response.statusCode")
      .should("eq", 200);
      
      const baseUrl = Cypress.env("CYPRESS_baseUrl");
      cy.url().should("eq", baseUrl + "/signin");
  });

  it("sign up fail because email or name already exists", () => {
    cy.get("[data-test=signup-email-input]").type("test@gmail.com");
    cy.get("[data-test=signup-display_name-input]").type("test123");
    cy.get("[data-test=signup-password-input]").type("Test123@");
    cy.get("[data-test=signup-confirm_password-input]").type("Test123@");

    cy.intercept("POST", "**/user/register").as("postSignup");

    cy.get("[data-test=signup-submit-button]").click();

    cy.wait("@postSignup")
      .its("response.statusCode")
      .should("eq", 400);

    cy.get("[data-test=signup-error-message]")
      .should("exist")
      .should("have.text", "User with the given email or display name already exists");
  });

  it("sign up disabled because pw dont match", () => {
    cy.get("[data-test=signup-email-input]").type("test@gmail.com");
    cy.get("[data-test=signup-display_name-input]").type("test123");
    cy.get("[data-test=signup-password-input]").type("Test123@");
    cy.get("[data-test=signup-confirm_password-input]").type("Test123");

    cy.intercept("POST", "**/user/register").as("postSignup");

    cy.get("[data-test=signup-submit-button]").should("be.disabled");
  });
});