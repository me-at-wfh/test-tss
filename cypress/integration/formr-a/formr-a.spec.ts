/// <reference types="cypress" />
/// <reference path="../../support/index.d.ts" />

const todaysDate = Cypress.moment().format("YYYY-MM-DD");

const dateAttained = Cypress.moment(todaysDate)
  .subtract({ years: 1, months: 6, days: 12 })
  .format("YYYY-MM-DD");

const completionDate = Cypress.moment(todaysDate)
  .add(6, "M")
  .format("YYYY-MM-DD");

const startDate = Cypress.moment(todaysDate)
  .subtract({ months: 9, days: 30 })
  .format("YYYY-MM-DD");

describe("Form R (Part A)", () => {
  it("Should complete a new Form R Part A.", () => {
    cy.viewport("iphone-6");
    cy.get("[data-cy=BtnMenu]").should("be.visible").click();
    cy.contains("Form R-a").click();

    cy.get("#btnOpenForm")
      .should("be.visible")
      .focus()

      .then((submitButton: JQuery) => {
        if (submitButton.attr("data-cy") === "btnSubmitNewForm") {
          cy.get("#btnOpenForm").click();
          cy.log("##################### NEW FORM ##################");
          cy.get(".nhsuk-warning-callout > p").should("be.visible");
          cy.location("pathname", { timeout: 10000 }).should(
            "include",
            "/formr-a"
          );
          //-- personal details section --
          cy.get("#forename")
            .should("be.visible")
            .invoke("val")
            .should("not.be.empty");
          cy.get("#surname")
            .should("be.visible")
            .invoke("val")
            .should("not.be.empty");
          cy.get("#gmcNumber")
            .should("be.visible")
            .invoke("val")
            .should("not.be.empty");
          cy.get("[data-cy=localOfficeName]").select(
            "Health Education England Wessex"
          );
          cy.get("#dateOfBirth")
            .should("be.visible")
            .should("have.attr", "type", "date")
            .invoke("val")
            .should("not.be.empty");

          cy.get("#gender").should("be.visible").should("have.value", "Male");
          //Test for 'Other' immigration status
          cy.get("#immigrationStatus")
            .should("be.visible")
            .select("Other")
            .should("have.value", "Other");
          cy.get("#otherImmigrationStatus")
            .should("be.visible")
            .type("My special status")
            .should("have.value", "My special status");
          cy.get("#qualification > option")
            .eq(1)
            .then(element => {
              const selectedItem = element.val().toString();
              cy.get("#qualification")
                .select(selectedItem)
                .should("not.have.value", "--Please select--");
            });
          cy.get("#dateAttained")
            .should("be.visible")
            .should("have.attr", "type", "date")
            .clear()
            .type(dateAttained);
          cy.get("#medicalSchool")
            .should("be.visible")
            .clear()
            .type("University of Medical Things");
          cy.get("#address1")
            .should("be.visible")
            .invoke("val")
            .should("not.be.empty");
          cy.get("#address2")
            .should("be.visible")
            .invoke("val")
            .should("not.be.empty");
          cy.get("#address3")
            .should("be.visible")
            .invoke("val")
            .should("not.be.empty");
          cy.get("#address4")
            .should("be.visible")
            .invoke("val")
            .should("not.be.empty");
          cy.get("#postCode")
            .should("be.visible")
            .invoke("val")
            .should("not.be.empty");
          cy.get("#telephoneNumber")
            .should("be.visible")
            .invoke("val")
            .should("not.be.empty");
          cy.get("#mobileNumber").focus();
          cy.get("#mobileNumber")
            .should("be.visible")
            .clear()
            .type("0777777777777");
          // Leave email blank intentionally to check for inline error message
          cy.get("#email")
            .focus()
            .should("be.visible")
            .should("not.contain.text");

          cy.get("#email")
            .should("be.visible")
            .type("traineeui.tester@hee.nhs.uk");

          //-- Declarations section --
          cy.get("#cctSpecialty1").should("not.be.visible");
          cy.get("#cctSpecialty2").should("not.be.visible");
          cy.get("[data-cy=declarationType0]").click();
          cy.get("#cctSpecialty1").should("be.visible");
          cy.get("#cctSpecialty2").should("be.visible");

          //- Programme specialty section --
          cy.get("#programmeSpecialty > option")
            .eq(1)
            .then(element => {
              const selectedItem = element.val().toString();
              cy.get("#programmeSpecialty")
                .select(selectedItem)
                .should("not.have.value", "--Please select--");
            });
          cy.get("#cctSpecialty1 > option")
            .eq(1)
            .then(element => {
              const selectedItem = element.val().toString();
              cy.get("#cctSpecialty1")
                .select(selectedItem)
                .should("not.have.value", "--Please select--");
            });
          cy.get("#cctSpecialty2 > option")
            .eq(2)
            .then(element => {
              const selectedItem = element.val().toString();
              cy.get("#cctSpecialty2")
                .select(selectedItem)
                .should("not.have.value", "--Please select--");
            });
          cy.get("#college > option")
            .eq(1)
            .then(element => {
              const selectedItem = element.val().toString();
              cy.get("#college")
                .select(selectedItem)
                .should("not.have.value", "--Please select--");
            });

          cy.get("#completionDate").type(completionDate);

          //- Programme section --
          cy.get("#trainingGrade > option")
            .eq(3)
            .then(element => {
              const selectedItem = element.val().toString();
              cy.get("#trainingGrade")
                .select(selectedItem)
                .should("not.have.value", "--Please select--");
            });
          cy.get("#startDate").type(startDate).should("not.have.value", "");
          cy.get("#programmeMembershipType")
            .should("be.visible")
            .clear()
            .type("LAT");
          //-- error msg when FTE not completed
          cy.get("[data-cy=BtnContinue]").should("be.visible").click();
          cy.get(".nhsuk-error-summary").should("be.visible");
          cy.get("#wholeTimeEquivalent--error-message").should("be.visible");
          cy.get("#wholeTimeEquivalent").type("0.99");
        } else if (submitButton.attr("data-cy") === "btnEditSavedForm") {
          cy.log("################ EDIT FORM ###################");
          cy.get("#btnOpenForm").click();
          cy.get(".nhsuk-warning-callout > p").should("be.visible");
          cy.location("pathname", { timeout: 10000 }).should(
            "include",
            "/formr-a"
          );
          //-- personal details section --
          cy.get("#forename").should("be.visible").clear().type("Anthony");
          cy.get("#surname").should("be.visible").clear().type("Gilliam");
          cy.get("#gmcNumber").should("be.visible").clear().type("11111111");
          cy.get("[data-cy=localOfficeName]").select(
            "Health Education England Wessex"
          );
          cy.get("#dateOfBirth")
            .should("be.visible")
            .should("have.attr", "type", "date")
            .clear()
            .type("1991-11-11");

          cy.get("#gender").should("be.visible").select("Male");
          //Test for 'Other' immigration status
          cy.get("#immigrationStatus")
            .should("be.visible")
            .select("Other")
            .should("have.value", "Other");
          cy.get("#otherImmigrationStatus")
            .should("be.visible")
            .clear()
            .type("My special status")
            .should("have.value", "My special status");

          cy.get("#qualification")
            .should("be.visible")
            .select("MBBS Bachelor of Medicine and Bachelor of Surgery");

          cy.get("#dateAttained")
            .should("be.visible")
            .should("have.attr", "type", "date")
            .clear()
            .type(dateAttained);
          cy.get("#medicalSchool")
            .should("be.visible")
            .clear()
            .type("University of Medical Things");
          cy.get("#address1")
            .should("be.visible")
            .clear()
            .type("585-6360 Interdum Street");

          cy.get("#address2").should("be.visible").clear().type("Goulburn");
          cy.get("#address3").should("be.visible").clear().type("London");
          cy.get("#address4").should("be.visible").clear().type("UK");

          cy.get("#postCode").should("be.visible").clear().type("SW1A1AA");
          cy.get("#telephoneNumber")
            .should("be.visible")
            .clear()
            .type("	01632960363");

          cy.get("#mobileNumber").focus();
          cy.get("#mobileNumber")
            .should("be.visible")
            .clear()
            .type("0777777777777");
          cy.get("#email")
            .should("be.visible")
            .type("traineeui.tester@hee.nhs.uk");

          //-- Declarations section --
          cy.get("#cctSpecialty1").should("not.be.visible");
          cy.get("#cctSpecialty2").should("not.be.visible");
          cy.get("[data-cy=declarationType0]").click();
          cy.get("#cctSpecialty1").should("be.visible");
          cy.get("#cctSpecialty2").should("be.visible");

          //- Programme specialty section --
          cy.get("#programmeSpecialty")
            .should("be.visible")
            .select("Geriatric Medicine");
          cy.get("#cctSpecialty1")
            .should("be.visible")
            .select("Geriatric Medicine")
            .should("not.have.value", "--Please select--");

          cy.get("#college")
            .should("be.visible")
            .select("Faculty Of Dental Surgery");

          cy.get("#completionDate").clear().type(completionDate);

          //- Programme section --
          cy.get("#trainingGrade")
            .should("be.visible")
            .select("Foundation Year 1");
          cy.get("#startDate")
            .clear()
            .type(startDate)
            .should("not.have.value", "");
          cy.get("#programmeMembershipType")
            .should("be.visible")
            .clear()
            .type("LAT");

          cy.get("#wholeTimeEquivalent")

            .should("be.visible")
            .clear()
            .type("0.99");
        }
      });

    //submitting / editing the form
    cy.get("[data-cy=BtnContinue]").click();
    cy.get(".nhsuk-warning-callout").should("be.visible");

    cy.get("[data-cy=BtnSubmit]").should("be.visible");

    // Re-edit form
    cy.contains("Edit").should("be.visible").click();
    // Check form values persist
    cy.checkFormRAValues(dateAttained, completionDate, startDate, "0.99");

    cy.get("[data-cy=BtnSubmit]").should("not.be.visible");
    cy.contains("Edit").should("not.be.visible");
    cy.get("[data-cy=BtnContinue]").should("be.visible");
    cy.get("#wholeTimeEquivalent").clear().type("1").should("have.value", "1");

    // Save and exit

    cy.get("[data-cy=BtnSaveDraft]").click();
    cy.get("[data-cy=btnEditSavedForm]").should("be.visible").click();
    cy.checkFormRAValues(dateAttained, completionDate, startDate, "1");

    cy.get("[data-cy=BtnContinue]").click();
    cy.get(".nhsuk-warning-callout").scrollIntoView().should("be.visible");
    cy.get("[data-cy=BtnSubmit]").scrollIntoView().should("be.visible").click();

    //--Go to list of submitted/ saved forms (Form Part A)
    cy.get("[data-cy=btnSubmitNewForm]").should("be.visible");

    cy.contains("Submitted forms").should("be.visible");
    // Open the form just saved
    cy.get("[data-cy=submittedForm]").first().should("be.visible").click();
    cy.get("[data-cy=mobileNumber]").should("have.text", "0777777777777");
    cy.get("[data-cy=localOfficeName]").should(
      "have.text",
      "Health Education England Wessex"
    );
    // Navigate back to the list

    cy.get(".nhsuk-back-link__link").should("be.visible").click();
    cy.contains("Submitted forms").should("be.visible");
    cy.get("[data-cy=btnSubmitNewForm]").should("be.visible");
  });
});
