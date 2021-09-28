/// <reference types="cypress" />
describe("Profile", () => {
  it("should click expand to show all personal information then toggle close", () => {
    cy.contains("Personal details").should("be.visible").click();
    cy.contains("Gender").should("be.visible");
    cy.contains("Sensitive data").should("be.visible");
    cy.contains("Personal details").click();
    cy.contains("Gender").should("not.be.visible");
    cy.contains("Sensitive data").should("not.be.visible");
  });

  it("should click expand to show placement information then toggle close", () => {
    cy.contains("Placements").should("be.visible").click();
    cy.contains("Site").should("be.visible");
    cy.contains("Specialty").should("be.visible");
    cy.contains("Placements").click();
    cy.contains("Site").should("not.be.visible");
    cy.contains("Specialty").should("not.be.visible");
  });

  it("should click expand to show placement information then toggle close", () => {
    cy.contains("Programmes").should("be.visible").click();
    cy.contains("Number").should("be.visible");
    cy.contains("Curricula").should("be.visible");
    cy.contains("Programmes").click();
    cy.contains("Number").should("not.be.visible");
    cy.contains("Curricula").should("not.be.visible");
  });
});
