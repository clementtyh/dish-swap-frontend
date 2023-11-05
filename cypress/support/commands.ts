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

const baseUrl = Cypress.env("CYPRESS_baseUrl");

// mobile: 320, tablet: 768, laptop: 1024,
const sizes = [
  [320, 568],
  [768, 1024],
  [1024, 768],
];

//command to check navigation bar, depends on logged in or not, and viewport
Cypress.Commands.add("checkNavigationBar", (loggedIn) => {
  sizes.map((size) => {
    cy.viewport(size[0], size[1]);

    cy.visit(baseUrl);

    cy.get("[data-test=navbar]").should("exist");

    cy.get("[data-test=navbar-landing-link]").should("exist").click();
    cy.url().should("eq", baseUrl + "/");

    if (size[0] !== 320) {
      cy.get("[data-test=navbar-recipes-link]").should("exist").click();
      cy.url().should("eq", baseUrl + "/recipes?sortby=newest");

      if (loggedIn) {
        cy.get("[data-test=navbar-account]").should("exist").click();
        cy.get("[data-test=navbar-signout-link]").should("exist");
        cy.get("[data-test=navbar-profile-link]").should("exist").click();
        cy.url().should("eq", baseUrl + "/profile");
        cy.get("[data-test=navbar-settings-link]").should("exist").click();
        cy.url().should("eq", baseUrl + "/settings");
      } else {
        cy.get("[data-test=navbar-signin-link]").should("exist").click();
        cy.url().should("eq", baseUrl + "/signin");
      }
    } else {
      cy.get("[data-test=navbar-dropdown]").should("exist").click();

      cy.get("[data-test=navbar-dropdown-recipes-link]")
        .should("exist")
        .click();
      cy.url().should("eq", baseUrl + "/recipes?sortby=newest");

      if (loggedIn) {
        cy.get("[data-test=navbar-dropdown]").should("exist").click();
        cy.get("[data-test=navbar-dropdown-signout-link]").should("exist");
        cy.get("[data-test=navbar-dropdown-profile-link]")
          .should("exist")
          .click();
        cy.url().should("eq", baseUrl + "/profile");
        cy.get("[data-test=navbar-dropdown-settings-link]")
          .should("exist")
          .click();
        cy.url().should("eq", baseUrl + "/settings");
      } else {
        cy.get("[data-test=navbar-dropdown-signin-link]")
          .should("exist")
          .click();
        cy.url().should("eq", baseUrl + "/signin");
      }
    }
  });
});

//command to check landing page, depends on logged in or not, and viewport
Cypress.Commands.add("checkLandingPage", (loggedIn) => {
  sizes.map((size) => {
    cy.viewport(size[0], size[1]);

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
});

//command to login
Cypress.Commands.add("signin", () => {
  cy.visit(baseUrl + "/signin");

  cy.get("[data-test=signin-email-input]").type("test@gmail.com");
  cy.get("[data-test=signin-password-input]").type("Test123@");

  cy.intercept("POST", "**/auth/login").as("postSignin");

  cy.get("[data-test=signin-submit-button]").click();

  // cy.wait("@postSignin").its("response.statusCode").should("eq", 200);
  cy.get("[data-test=navbar-account]").should("exist")

});

declare namespace Cypress {
  interface Chainable {
    checkNavigationBar(loggedIn: boolean): void;
    checkLandingPage(loggedIn: boolean): void;
    signin(): void;
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
