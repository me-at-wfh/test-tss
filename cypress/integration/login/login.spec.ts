/// <reference types="cypress" />

describe("App sign-in", () => {
  const mobileView = "iphone-6";
  const desktopView = "macbook-15";

  const sizes = [mobileView, desktopView];
  sizes.forEach((size: any) => {
    it(`should take to profile page on successful sign-in on ${size} screen`, () => {
      cy.viewport(size);

      cy.location("pathname", { timeout: 10000 }).should("include", "/profile");
      cy.get("#profile").should("be.visible");
      cy.contains("Personal details").should("be.visible");
      cy.contains("Placements").should("be.visible");
      cy.contains("Programmes").should("be.visible");
    });
  });
});
