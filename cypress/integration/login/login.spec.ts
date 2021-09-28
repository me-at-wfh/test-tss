/// <reference types="cypress" />

describe("App sign-in", () => {
  const mobileView = "iphone-6";
  const desktopView = "macbook-15";

  const sizes = [mobileView, desktopView];
  sizes.forEach((size: any) => {
    it(`should take to profile page on successful sign-in on ${size} screen`, () => {
      cy.viewport(size);

      cy.location("pathname", { timeout: 10000 }).should("include", "/profile");
      cy.get("#profile").should("exist");
      cy.contains("Personal details").should("exist");
      cy.contains("Placements").should("exist");
      cy.contains("Programmes").should("exist");
    });
  });
});
