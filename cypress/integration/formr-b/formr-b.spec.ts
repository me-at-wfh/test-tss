/// <reference types="cypress" />
/// <reference path="../../support/index.d.ts" />

let isCovid = false;

before(() => {
  isCovid = true;
});

let currentDate = Cypress.moment().format("YYYY-MM-DD");
let futureDate = Cypress.moment(currentDate).add(6, "M").format("YYYY-MM-DD");
let pastDate = Cypress.moment(currentDate)
  .subtract(6, "M")
  .format("YYYY-MM-DD");

let outOfRangeFutureDate = Cypress.moment(futureDate)
  .add({ years: 20 })
  .format("YYYY-MM-DD");

const currRevalDate = Cypress.moment(currentDate)
  .add(3, "M")
  .format("YYYY-MM-DD");

const prevRevalDate = Cypress.moment(currentDate)
  .subtract({ years: 5 })
  .format("YYYY-MM-DD");

describe("Form R (Part B)", () => {
  it("Should complete a new Form R Part B.", () => {
    cy.viewport("iphone-6");
    cy.get("[data-cy=BtnMenu]").should("exist").click();
    cy.contains("Form R (Part B)").click();

    cy.get("#btnOpenForm").click();

    cy.get(".nhsuk-warning-callout > p").should("exist");
    cy.location("pathname", { timeout: 10000 }).should("include", "/formr-b");

    // -------- Section 1 - Doctor's details -----------
    cy.checkAndFillSection1(currRevalDate, prevRevalDate);

    cy.get("#gmcNumber").focus().clear();
    cy.get("#email").focus().clear();

    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page")
      .should("exist")
      .click();

    cy.get(".nhsuk-error-summary").should("exist");
    cy.get("#gmcNumber").type("11111111");
    cy.get("#email").type("traineeui.tester@hee.nhs.uk");
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();

    // -------- Section 2 Whole Scope Types of Work -----------
    cy.checkAndFillSection2(pastDate, currentDate);

    cy.get('[data-cy="work[0].startDate"]')
      .should("exist")
      .clear()
      .type(outOfRangeFutureDate);

    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page")
      .should("exist")
      .click();
    cy.get(".nhsuk-error-summary").should("exist");

    cy.get('[data-cy="work[0].startDate"]').clear().type(pastDate);
    cy.get(".nhsuk-error-summary").should("not.exist");

    cy.addWorkPanel(pastDate, currentDate);

    //Navigate back to section 1
    cy.get("[data-cy=LinkToPreviousSection] > .nhsuk-pagination__page").click();

    cy.get(".nhsuk-error-summary").should("not.exist");
    cy.get("[data-cy=mainWarning1]").should("exist");

    //Return to section 2
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();

    cy.get(".nhsuk-error-summary").should("not.exist");
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();

    // -------- Section 3 Declarations relating to Good Medical Practice -----------
    cy.checkAndFillSection3();

    // Navigate back to section 2
    cy.get("[data-cy=LinkToPreviousSection] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=mainWarning2]").should("exist");
    cy.get("#totalLeave").should("exist").should("contain.value", "21");

    // Return to section 3
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();

    cy.get(".nhsuk-error-summary").should("not.exist");
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();

    // -------- Section 4: Update to your previous Form R Part B -----------
    cy.checkAndFillSection4(pastDate);

    // Navigate back to section 3
    cy.get("[data-cy=LinkToPreviousSection] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=mainWarning3]").should("exist");
    cy.get(".nhsuk-form-group > [data-cy=healthStatement]")
      .should("exist")
      .type("I'm in astonishingly excellent health.");

    // Return to section 4
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();

    cy.get(".nhsuk-error-summary").should("not.exist");
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();

    // -------- Section 5: Update to your previous Form R Part B -----------
    cy.checkAndFillSection5(pastDate);

    // Navigate back to section 4
    cy.get("[data-cy=LinkToPreviousSection] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=mainWarning4]").should("exist");

    // Return to section 5
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();

    cy.get(".nhsuk-error-summary").should("not.exist");
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();

    // -------- Section 6: Compliments -----------
    cy.checkAndFillSection6("This is the compliment text.");

    // Navigate back to section 5
    cy.get("[data-cy=LinkToPreviousSection] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=mainWarning5]").should("exist");

    // Return to section 6
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=compliments]")
      .should("exist")
      .should("contain.value", "This is the compliment text.");

    cy.get(".nhsuk-error-summary").should("not.exist");
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();

    // -------- COVID Section -----------
    if (isCovid) {
      cy.log("### COVID SECTION CHECK ###");
      cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
      cy.get("#haveCovidDeclarations--error-message").should("exist");

      cy.checkAndFillCovidSection();
      cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
    }
    // -------- Section 7: Declarations -----------

    // Initial state
    cy.get("[data-cy=legendFieldset7]").should("include.text", "Section 7");
    cy.get("[data-cy=isDeclarationAccepted0]")
      .should("exist")
      .should("contain.value", "true")
      .should("not.be.checked");
    cy.get("[data-cy=isConsentAccepted0]")
      .should("exist")
      .should("contain.value", "true")
      .should("not.be.checked");

    //Attempt to submit without checking boxes should fail
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=isDeclarationAccepted] .nhsuk-error-message").should(
      "exist"
    );
    cy.get("[data-cy=isConsentAccepted] .nhsuk-error-message").should("exist");

    //Toggle error message when clicked
    cy.get("[data-cy=isDeclarationAccepted0]").click().should("be.checked");
    cy.get("[data-cy=isDeclarationAccepted0]").click().should("not.be.checked");
    cy.get("[data-cy=isDeclarationAccepted] .nhsuk-error-message").should(
      "exist"
    );

    cy.get("[data-cy=isConsentAccepted0]").click().should("be.checked");
    cy.get("[data-cy=isDeclarationAccepted0]").click().should("be.checked");

    // Go back to section 6
    cy.get("[data-cy=LinkToPreviousSection] > .nhsuk-pagination__page").click();
    if (isCovid) {
      cy.get("[data-cy='covidForm']").should("exist");
    } else {
      cy.get("[data-cy=compliments]").should("exist");
    }
    // Return to section 7
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=isConsentAccepted0]").should("exist").should("be.checked");
    cy.get("[data-cy=isDeclarationAccepted0]")
      .should("exist")
      .should("be.checked");

    // Navigate to submit page
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
    cy.get("[data-cy=BtnEditSection1]").should("exist");
    cy.get("[data-cy=gmcNumber]").should("exist");
    cy.get("[data-cy=BtnEditSection2]").should("exist");
    cy.get("[data-cy=BtnEditSection3]").should("exist");
    cy.get("[data-cy=BtnEditSection4]").should("exist");
    cy.get("[data-cy=BtnEditSection5]").should("exist");

    // Click edit btn to edit section 1 details
    cy.get(".nhsuk-back-link__link").should("exist");
    cy.get("[data-cy=BtnEditSection1]").should("exist").click();
    cy.get("#gmcNumber").clear().type("11111111");

    // Navigate to section 2
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();

    // Navigate to section 3
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();

    cy.get(".nhsuk-form-group > [data-cy=healthStatement]").should(
      "contain.value",
      "I'm in astonishingly excellent health."
    );

    // Navigate to section 4
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();

    cy.get('[data-cy="previousDeclarations[0].declarationType"]')
      .should("exist")
      .select("Significant event");

    // Navigate to section 5
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();

    cy.get('[data-cy="currentDeclarations[0].declarationType"]')
      .should("exist")
      .select("Significant event");

    // Navigate to section 6
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();

    cy.get("[data-cy=compliments]")
      .should("exist")
      .should("contain.value", "This is the compliment text.");

    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
    // Navigate to COVID
    if (isCovid) {
      cy.get("[data-cy='covidDeclarationDto.reasonOfSelfRate']")
        .should("exist")
        .should("contain.value", "Covid Training Progress Reason");

      cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
    }

    // Navigate to section 7

    cy.get("[data-cy=isConsentAccepted0]").should("exist").should("be.checked");
    cy.get("[data-cy=isDeclarationAccepted0]")
      .should("exist")
      .should("be.checked");

    // Navigate to submit
    cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();

    cy.get("[data-cy=gmcNumber]").should("have.text", "11111111");

    // intercept formr-partb POST req
    let uid: string;

    cy.intercept("POST", "/api/forms/formr-partb", res => {
      uid = res.body["id"];
    });

    // intercept formr-partBs GET req
    cy.intercept("GET", "/api/forms/formr-partbs").as("getFormrPartBs");

    // submit form
    cy.get("[data-cy=BtnSubmitPartB]").scrollIntoView().should("exist").click();
    cy.get("[data-cy=btnSubmitNewForm]").should("exist");
    cy.contains("Submitted forms").should("exist");

    // compare uid to row id
    cy.wait("@getFormrPartBs").then(interception => {
      const body = interception.response.body;
      const formrbsArray: string[] = Object.values(body);
      formrbsArray.forEach((row, index) => {
        if (row["id"] === uid) {
          // Open the form just saved
          cy.get("[data-cy=submittedForm]").eq(index).click();
          // check contents
          cy.get("[data-cy=gmcNumber]")
            .should("exist")
            .should("have.text", "11111111");
          cy.get("[data-cy=localOfficeName]").should(
            "have.text",
            "Health Education England Wessex"
          );
          // Navigate back to the list
          cy.get(".nhsuk-back-link__link").should("exist").click();
          cy.contains("Submitted forms").should("exist");
        }
      });
    });
  });

  it("should be able save and edit the form", () => {
    cy.viewport("iphone-6");
    cy.get("[data-cy=BtnMenu]").should("exist").click();
    cy.contains("Form R (Part B)").click();

    cy.get("#btnOpenForm")
      .should("exist")
      .focus()

      .then((submitButton: JQuery) => {
        cy.get("#btnOpenForm").click();

        cy.get(".nhsuk-warning-callout > p").should("exist");
        cy.location("pathname", { timeout: 10000 }).should(
          "include",
          "/formr-b"
        );

        // #### SAVE DRAFTS ####
        // Fill in section 1
        cy.checkAndFillSection1(currRevalDate, prevRevalDate);
        cy.get("[data-cy=BtnSaveDraft]").click();

        cy.logout();
        cy.login();
        cy.get("[data-cy=BtnMenu]").should("exist").click();
        cy.contains("Form R (Part B)").click();

        cy.get("[data-cy=btnEditSavedForm]").should("exist").click();
        cy.get("[data-cy=gmcNumber]").should("have.value", "11111111");

        // Navigate to and complete section 2
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.checkAndFillSection2(pastDate, currentDate);
        cy.get("[data-cy=BtnSaveDraft]").click();

        // Navigate to and complete section 3
        cy.get("[data-cy=btnEditSavedForm]").should("exist").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.checkAndFillSection3();
        cy.get("[data-cy=BtnSaveDraft]").click();

        // Navigate to and complete section 4
        cy.get("[data-cy=btnEditSavedForm]").should("exist").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.checkAndFillSection4(pastDate);
        cy.get("[data-cy=BtnSaveDraft]").click();

        // Navigate to and complete section 5
        cy.get("[data-cy=btnEditSavedForm]").should("exist").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.checkAndFillSection5(pastDate);
        cy.get("[data-cy=BtnSaveDraft]").click();

        // Navigate to and complete section 6
        cy.get("[data-cy=btnEditSavedForm]").should("exist").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.checkAndFillSection6("This is the compliment text.");
        cy.get("[data-cy=BtnSaveDraft]").click();

        // Navigate to COVID
        if (isCovid) {
          // Navigate to and complete section 6
          cy.get("[data-cy=btnEditSavedForm]").should("exist").click();
          cy.get(
            "[data-cy=LinkToNextSection] > .nhsuk-pagination__page"
          ).click();
          cy.get(
            "[data-cy=LinkToNextSection] > .nhsuk-pagination__page"
          ).click();
          cy.get(
            "[data-cy=LinkToNextSection] > .nhsuk-pagination__page"
          ).click();
          cy.get(
            "[data-cy=LinkToNextSection] > .nhsuk-pagination__page"
          ).click();
          cy.get(
            "[data-cy=LinkToNextSection] > .nhsuk-pagination__page"
          ).click();
          cy.get(
            "[data-cy=LinkToNextSection] > .nhsuk-pagination__page"
          ).click();
          cy.checkAndFillCovidSection();
          cy.get("[data-cy=BtnSaveDraft]").click();
        }

        // Navigate to and complete section 7
        cy.get("[data-cy=btnEditSavedForm]").should("exist").click();
        //On section 1
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        //On section 2
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        //On section 3
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        //On section 4
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        //On section 5
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        //On section 6
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();

        if (isCovid) {
          // On section COVID

          cy.get(
            "[data-cy=LinkToNextSection] > .nhsuk-pagination__page"
          ).click();
        }
        // On section 7
        cy.get("[data-cy=isConsentAccepted0]").click().should("be.checked");
        cy.get("[data-cy=isDeclarationAccepted0]").click().should("be.checked");
        cy.get("[data-cy=BtnSaveDraft]").click();

        // Navigate to and complete section 7 and submit
        cy.get("[data-cy=btnEditSavedForm]").should("exist").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();

        if (isCovid) {
          // on section COVID
          cy.get(
            "[data-cy=LinkToNextSection] > .nhsuk-pagination__page"
          ).click();
        }
        cy.get("[data-cy=isConsentAccepted0]").click().should("be.checked");
        cy.get("[data-cy=isDeclarationAccepted0]").click().should("be.checked");
        cy.get("[data-cy=LinkToNextSection] > .nhsuk-pagination__page").click();
        cy.get("[data-cy=BtnSubmitPartB]").should("exist").click();
      });
  });
});
