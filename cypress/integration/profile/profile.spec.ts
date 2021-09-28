/// <reference types="cypress" />
describe("Profile", () => {
  it("should click expand to show all personal information then toggle close", () => {
    cy.contains("Personal details").should("exist").click();
    cy.contains("Gender").should("exist");
    cy.contains("Sensitive data").should("exist");
    cy.contains("Personal details").click();
    cy.contains("Gender").should("not.be.visible");
    cy.contains("Sensitive data").should("not.be.visible");
  });

  it("should click expand to show placement information then toggle close", () => {
    cy.contains("Placements").should("exist").click();
    cy.contains("Site").should("exist");
    cy.contains("Specialty").should("exist");
    cy.contains("Placements").click();
    cy.contains("Site").should("not.be.visible");
    cy.contains("Specialty").should("not.be.visible");
  });

  it("should click expand to show placement information then toggle close", () => {
    cy.contains("Programmes").should("exist").click();
    cy.get(".nhsuk-details__text").should("exist");
  });
});
