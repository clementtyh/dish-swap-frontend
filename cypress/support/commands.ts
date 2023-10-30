/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

const baseUrl = Cypress.env("client_dev");

//command to check navigation bar, depends on logged in or not
Cypress.Commands.add("checkNavigationBar", (loggedIn) => {
  cy.visit(baseUrl);

  cy.get("[data-test=navbar]").should("exist");

  cy.get("[data-test=navbar-landing-link]").should("exist").click();
  cy.url().should("eq", baseUrl + "/");

  cy.get("[data-test=navbar-recipes-link]").should("exist").click();
  cy.url().should("eq", baseUrl + "/recipes?sortby=newest");

  if (loggedIn) {
    cy.get("[data-test=navbar-account]").should("exist").click();
    cy.get("[data-test=navbar-profile-link]").should("exist").click();
    cy.url().should("eq", baseUrl + "/profile");
  } else {
    cy.get("[data-test=navbar-signin-link]").should("exist").click();
    cy.url().should("eq", baseUrl + "/signin");
  }
});

//command to check landing page, depends on logged in or not
Cypress.Commands.add("checkLandingPage", (loggedIn) => {
  cy.visit(baseUrl);

  cy.get("h1").should("have.text", "DISH SWAP");

  cy.get("p").should(
    "have.text",
    "Embark on a journey of flavor exploration, recipe sharing, and community engagement by uniting food enthusiasts, chefs, and home cooks in a vibrant gastronomic exchange"
  );
  cy.get("[data-test=landing-link]").should("contain", "INDULGE NOW").click();

  if (loggedIn) {
    cy.url().should("eq", baseUrl + "/recipes?sortby=newest");
  } else {
    cy.url().should("eq", baseUrl + "/signin");
  }
});

//command to login
Cypress.Commands.add("login", () => {
  cy.visit(baseUrl + "/signin");

  cy.fixture("login.json").then((login) => {
    cy.get("[data-test=signin-email-input]").type(login.email);
    cy.get("[data-test=signin-password-input]").type(login.password);
  });

  cy.intercept("POST", "**/auth/login").as("postLogin");

  cy.get("[data-test=signin-submit-button]").click();

  cy.wait("@postLogin").its("response.statusCode").should("be.oneOf", [200, 304])

});

declare namespace Cypress {
  interface Chainable {
    checkNavigationBar(loggedIn: boolean): void;
    checkLandingPage(loggedIn: boolean): void;
    login(): void;
  }
}

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
