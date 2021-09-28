/// <reference types="cypress" />

describe("Desktop/ tablet header", () => {
  const mobileView = "iphone-6";
  const desktopView = "macbook-15";

  const sizes = [mobileView, desktopView];

  sizes.forEach((size: any) => {
    it(`should have menu items after successfull sign-in on ${size} screen`, () => {
      cy.viewport(size);
      if (size === mobileView) {
        cy.get(".nhsuk-header__menu-toggle").should("exist");

        cy.get(".nhsuk-header__menu-toggle").click();
      }

      cy.get(".nhsuk-header__navigation-link")
        .should("exist")
        .contains(/Profile/);
      cy.get(".nhsuk-header__navigation-link")
        .should("exist")
        .contains(/Part A/);
      cy.get(".nhsuk-header__navigation-link")
        .should("exist")
        .contains(/Part B/);
      cy.get(".nhsuk-header__navigation-link")
        .should("exist")
        .contains(/Logout/);

      cy.contains("Form R (Part A)").should("exist").click();
      cy.location("pathname", { timeout: 10000 }).should("include", "/formr-a");
    });
  });
});
