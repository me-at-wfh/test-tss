/// <reference types="cypress" />

describe("Footer", () => {
  it("should contain link to privacy policy", () => {
    cy.get("a[data-cy='linkPrivacyPolicy']").should("exist");
  });

  it("should contain link to support page when logged in", () => {
    cy.get("a[data-cy='linkSupport']").should("have.attr", "href", "/support");
  });

  it("should contain link to TIS support website when logged out", () => {
    cy.get("a[data-jest='btn-logout']").click();
    cy.get("a[data-cy='linkSupport']").should(
      "have.attr",
      "href",
      "https://tis-support.hee.nhs.uk"
    );
  });
});
