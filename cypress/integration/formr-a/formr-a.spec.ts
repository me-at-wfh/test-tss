/// <reference types="cypress" />
/// <reference path="../../support/index.d.ts" />

const dateAttained = Cypress.dayjs()
  .subtract(Cypress.dayjs.duration({ years: 1, months: 6, days: 12 }))
  .format("YYYY-MM-DD");
const completionDate = Cypress.dayjs()
  .add(Cypress.dayjs.duration({ months: 6 }))
  .format("YYYY-MM-DD");
const startDate = Cypress.dayjs()
  .subtract(Cypress.dayjs.duration({ months: 9, days: 30 }))
  .format("YYYY-MM-DD");

describe("Form R (Part A)", () => {
  it("Should complete a new Form R Part A.", () => {
    cy.viewport("iphone-6");
    cy.get("[data-cy=BtnMenu]").should("exist");
    cy.get("[data-cy=BtnMenu]").click();
    cy.contains("Form R (Part A)").click();

    cy.get("#btnOpenForm")
      .should("exist")
      .focus()

      .then((submitButton: JQuery) => {
        if (submitButton.attr("data-cy") === "btnSubmitNewForm") {
          cy.get("#btnOpenForm").click();
          cy.log("##################### NEW FORM ##################");
          cy.get(".nhsuk-warning-callout > p").should("exist");
          cy.location("pathname", { timeout: 10000 }).should(
            "include",
            "/formr-a"
          );
          //-- personal details section --
          cy.get("#forename")
            .should("exist")
            .invoke("val")
            .should("not.be.empty");
          cy.get("#surname")
            .should("exist")
            .invoke("val")
            .should("not.be.empty");
          cy.get("#gmcNumber")
            .should("exist")
            .invoke("val")
            .should("not.be.empty");
          cy.get("[data-cy=localOfficeName]").select(
            "Health Education England Wessex"
          );
          cy.get("#dateOfBirth")
            .should("exist")
            .should("have.attr", "type", "date")
            .invoke("val")
            .should("not.be.empty");

          cy.get("#gender").should("exist").should("have.value", "Male");
          cy.get("#immigrationStatus")
            .should("exist")
            .select("Tier 1")
            .should("have.value", "Tier 1");
          cy.get("#qualification")
            .should("exist")
            .invoke("val")
            .should("not.be.empty");
          cy.get("#dateAttained")
            .should("exist")
            .should("have.attr", "type", "date")
            .clear()
            .type(dateAttained);
          cy.get("#medicalSchool")
            .should("exist")
            .clear()
            .type("University of Medical Things");
          cy.get("#address1")
            .should("exist")
            .invoke("val")
            .should("not.be.empty");
          cy.get("#address2")
            .should("exist")
            .invoke("val")
            .should("not.be.empty");
          cy.get("#address3")
            .should("exist")
            .invoke("val")
            .should("not.be.empty");

          cy.get("#postCode")
            .should("exist")
            .invoke("val")
            .should("not.be.empty");
          cy.get("#telephoneNumber")
            .should("exist")
            .clear()
            .type("01234567890");
          cy.get("#mobileNumber").focus();
          cy.get("#mobileNumber").should("exist").clear().type("0777777777777");
          // Leave email blank intentionally to check for inline error message
          cy.get("#email").focus().should("exist").should("not.contain.text");

          cy.get("#email").should("exist").type("traineeui.tester@hee.nhs.uk");

          //-- Declarations section --
          cy.get("#cctSpecialty1").should("not.exist");
          cy.get("#cctSpecialty2").should("not.exist");
          cy.get("[data-cy=declarationType0]").click();
          cy.get("#cctSpecialty1").should("exist");
          cy.get("#cctSpecialty2").should("exist");

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
            .should("exist")
            .clear()
            .type("LAT");
          //-- error msg when FTE not completed
          cy.get("[data-cy=BtnContinue]").should("exist").click();
          cy.get(".nhsuk-error-summary").should("exist");
          cy.get("#wholeTimeEquivalent--error-message").should("exist");
          cy.get("#wholeTimeEquivalent").type("0.99");
        } else if (submitButton.attr("data-cy") === "btnEditSavedForm") {
          cy.log("################ EDIT FORM ###################");
          cy.get("#btnOpenForm").click();
          cy.get(".nhsuk-warning-callout > p").should("exist");
          cy.location("pathname", { timeout: 10000 }).should(
            "include",
            "/formr-a"
          );
          //-- personal details section --
          cy.get("#forename").should("exist").clear().type("Anthony");
          cy.get("#surname").should("exist").clear().type("Gilliam");
          cy.get("#gmcNumber").should("exist").clear().type("11111111");
          cy.get("[data-cy=localOfficeName]").select(
            "Health Education England Wessex"
          );
          cy.get("#dateOfBirth")
            .should("exist")
            .should("have.attr", "type", "date")
            .clear()
            .type("1991-11-11");

          cy.get("#gender").should("exist").select("Male");
          cy.get("#immigrationStatus")
            .should("exist")
            .select("Tier 1")
            .should("have.value", "Tier 1");

          cy.get("#qualification")
            .should("exist")
            .clear()
            .type("MBBS Bachelor of Medicine and Bachelor of Surgery");

          cy.get("#dateAttained")
            .should("exist")
            .should("have.attr", "type", "date")
            .clear()
            .type(dateAttained);
          cy.get("#medicalSchool")
            .should("exist")
            .clear()
            .type("University of Medical Things");
          cy.get("#address1")
            .should("exist")
            .clear()
            .type("585-6360 Interdum Street");

          cy.get("#address2").should("exist").clear().type("Goulburn");
          cy.get("#address3").should("exist").clear().type("London");

          cy.get("#postCode").should("exist").clear().type("SW1A1AA");
          cy.get("#telephoneNumber")
            .should("exist")
            .clear()
            .type("	01632960363");

          cy.get("#mobileNumber").focus();
          cy.get("#mobileNumber").should("exist").clear().type("0777777777777");
          cy.get("#email").should("exist").type("traineeui.tester@hee.nhs.uk");

          //-- Declarations section --
          cy.get("#cctSpecialty1").should("not.exist");
          cy.get("#cctSpecialty2").should("not.exist");
          cy.get("[data-cy=declarationType0]").click();
          cy.get("#cctSpecialty1").should("exist");
          cy.get("#cctSpecialty2").should("exist");

          //- Programme specialty section --
          cy.get("#programmeSpecialty")
            .should("exist")
            .select("Geriatric Medicine");
          cy.get("#cctSpecialty1")
            .should("exist")
            .select("Geriatric Medicine")
            .should("not.have.value", "--Please select--");

          cy.get("#college")
            .should("exist")
            .select("Faculty Of Dental Surgery");

          cy.get("#completionDate").clear().type(completionDate);

          //- Programme section --
          cy.get("#trainingGrade").should("exist").select("Foundation Year 1");
          cy.get("#startDate")
            .clear()
            .type(startDate)
            .should("not.have.value", "");
          cy.get("#programmeMembershipType")
            .should("exist")
            .clear()
            .type("LAT");

          cy.get("#wholeTimeEquivalent")

            .should("exist")
            .clear()
            .type("0.99");
        }
      });

    // submitting / editing the form
    cy.get("[data-cy=BtnContinue]").click();
    cy.get(".nhsuk-warning-callout").should("exist");

    cy.get("[data-cy=BtnSubmit]").should("exist");

    // Re-edit form
    cy.contains("Edit").should("exist").click();
    // Check form values persist
    cy.checkFormRAValues(dateAttained, completionDate, startDate, "0.99");

    cy.get("[data-cy=BtnSubmit]").should("not.exist");
    cy.contains("Edit").should("not.exist");
    cy.get("[data-cy=BtnContinue]").should("exist");

    cy.get("#wholeTimeEquivalent").clear().type("1").should("have.value", "1");

    // Save draft
    cy.get("[data-cy=BtnSaveDraft]").click();
    cy.get("[data-cy=btnEditSavedForm]").should("exist").click();
    cy.checkFormRAValues(dateAttained, completionDate, startDate, "1");

    cy.get("[data-cy=BtnContinue]").click();
    cy.get("[data-cy='warningSubmit']")
      .first()
      .scrollIntoView()
      .should("exist");

    // intercept formr-parta PUT req
    let uid: string;

    cy.intercept("PUT", "/api/forms/formr-parta", res => {
      uid = res.body["id"];
    });

    // intercept formr-partas GET req
    cy.intercept("GET", "/api/forms/formr-partas").as("getFormrPartAs");

    // submit form
    cy.get("[data-cy=BtnSubmit]").scrollIntoView().should("exist").click();
    cy.get("[data-cy=btnSubmitNewForm]").should("exist");
    cy.contains("Submitted forms").should("exist");

    // compare uid to row id
    cy.wait("@getFormrPartAs").then(interception => {
      const body = interception.response.body;
      const formrasArray: string[] = Object.values(body);
      formrasArray.forEach((row, index) => {
        if (row["id"] === uid) {
          // Open the form just saved
          cy.get("[data-cy=submittedForm]").eq(index).click();
          // check contents
          cy.get("[data-cy=mobileNumber]").should("have.text", "0777777777777");
          cy.get("[data-cy=localOfficeName]").should(
            "have.text",
            "Health Education England Wessex"
          );
          // Navigate back to the list
          cy.get(".nhsuk-back-link__link").should("exist").click();
          cy.contains("Submitted forms").should("exist");
          cy.get("[data-cy=btnSubmitNewForm]").should("exist");
        }
      });
    });
  });
});
