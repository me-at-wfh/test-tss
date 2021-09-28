/// <reference types="cypress" />

describe("Desktop/ tablet header", () => {
  const mobileView = "iphone-6";
  const desktopView = "macbook-15";

  const sizes = [mobileView, desktopView];

  sizes.forEach((size: any) => {
    it(`should have menu items after successfull sign-in on ${size} screen`, () => {
      cy.viewport(size);
      if (size === mobileView) {
        cy.get(".nhsuk-header__search-toggle").should("be.visible");
        cy.get(".nhsuk-header__menu-toggle").should("be.visible");

        cy.get(".nhsuk-header__menu-toggle").click();
      }

      cy.get(".nhsuk-header__navigation-link")
        .should("be.visible")
        .should("contain.text", "Profile");
      cy.get(".nhsuk-header__navigation-link")
        .should("be.visible")
        .should("contain.text", "Form R-a");
      cy.get(".nhsuk-header__navigation-link")
        .should("be.visible")
        .should("contain.text", "Form R-b");
      cy.get(".nhsuk-header__navigation-link")
        .should("be.visible")
        .should("contain.text", "Logout");

      cy.contains("Form R-a").should("be.visible").click();
      cy.location("pathname", { timeout: 10000 }).should("include", "/formr-a");
    });
  });

  it("Should be able to toggle search button to show hide search form on mobbile view", () => {
    cy.viewport("iphone-6");
    cy.get(".nhsuk-header__search-toggle > .nhsuk-icon").click();
    cy.get("#search-field").should("be.visible");
    cy.get(".nhsuk-search__close > .nhsuk-icon > path").click();
    cy.get("#search-field").should("not.be.visible");
  });
});
