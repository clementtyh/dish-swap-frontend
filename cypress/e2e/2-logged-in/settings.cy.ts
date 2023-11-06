import generateData from "../../helpers/generateData";

describe("Settings page, logged in", () => {
  beforeEach(() => {
    cy.signin();
    const baseUrl = Cypress.env("CYPRESS_baseUrl");
    cy.visit(baseUrl + "/settings");
    cy.url().should("eq", baseUrl + "/settings");
  });

  it("access settings page, logged in", () => {
    cy.get("[data-test=settings-title]").should("have.text", "Settings");
  });

  it("edit display name successfully", () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    const randomUser = generateData();

    cy.get("[data-test=settings-display-edit]").should("exist").click();
    cy.get("[data-test=settings-display-input]").type(randomUser.display_name);

    cy.intercept("POST", "**/update_display_name").as("postUpdateDisplay");

    cy.get("[data-test=settings-display-submit]").click();

    cy.wait("@postUpdateDisplay").its("response.statusCode").should("eq", 200);

    cy.get("[data-test=settings-toast-success]")
      .should("exist")
      .should("have.text", "Display name updated successfully!");

    //reupdate
    cy.get("[data-test=settings-display-edit]").should("exist").click();
    cy.get("[data-test=settings-display-input]").type("fortesting");
    cy.get("[data-test=settings-display-submit]").click();
    cy.wait("@postUpdateDisplay").its("response.statusCode").should("eq", 200);
  });

  it("edit pw successfully", () => {
    const randomPw = generateData();

    cy.get("[data-test=settings-pw-edit]").should("exist").click();

    cy.fixture("signin.json").then((signin) => {
      cy.get("[data-test=settings-currentpw-input]").type(signin.password);
    })
    cy.get("[data-test=settings-newpw-input]").type(randomPw.password);
    cy.get("[data-test=settings-confirmnewpw-input]").type(randomPw.confirm_password);

    cy.intercept("POST", "**/update_password").as("postUpdatePw");

    cy.get("[data-test=settings-pw-submit]").click();

    cy.wait("@postUpdatePw")
      .its("response.statusCode")
      .should("eq", 200);

    cy.get("[data-test=settings-toast-success]")
    .should("exist")
    .should("have.text", "Password updated successfully!");

    //reupdate
    cy.get("[data-test=settings-pw-edit]").should("exist").click();
    cy.get("[data-test=settings-currentpw-input]").type(randomPw.password);
    cy.fixture("signin.json").then((signin) => {
      cy.get("[data-test=settings-newpw-input]").type(signin.password);
      cy.get("[data-test=settings-confirmnewpw-input]").type(signin.password);
    })
    cy.get("[data-test=settings-pw-submit]").click();
    cy.wait("@postUpdatePw")
    .its("response.statusCode")
    .should("eq", 200);
  });

  it("edit display name fail, alr exist", () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    cy.get("[data-test=settings-display-edit]").should("exist").click();
    cy.get("[data-test=settings-display-input]").type("fortesting");

    cy.intercept("POST", "**/update_display_name").as("postUpdateDisplay");

    cy.get("[data-test=settings-display-submit]").click();

    cy.wait("@postUpdateDisplay").its("response.statusCode").should("eq", 400);

    cy.get("[data-test=settings-error-message]")
      .should("exist")
      .should("have.text", "Display name fortesting already exists");
  });

  it("edit pw fail, current pw invalid", () => {
    const randomPw = generateData();

    cy.get("[data-test=settings-pw-edit]").should("exist").click();

    cy.get("[data-test=settings-currentpw-input]").type("Test123@wrongpw");
    cy.get("[data-test=settings-newpw-input]").type(randomPw.password);
    cy.get("[data-test=settings-confirmnewpw-input]").type(randomPw.confirm_password);

    cy.intercept("POST", "**/update_password").as("postUpdatePw");

    cy.get("[data-test=settings-pw-submit]").click();

    cy.wait("@postUpdatePw")
      .its("response.statusCode")
      .should("eq", 400);

    cy.get("[data-test=settings-error-message]")
    .should("exist")
    .should("have.text", "Wrong password");
  });
});
