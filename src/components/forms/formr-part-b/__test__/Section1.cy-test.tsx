import { mount } from "@cypress/react";
import Section1 from "../Sections/Section1";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";
import { beforeEach } from "mocha";

describe("Section 1 - previous revalidation body", () => {
  beforeEach(() => {
    const props = {
      designatedBodies: [
        {
          tisId: "2",
          label: "Health Education England East of England",
          value: "Health Education England East of England"
        },
        {
          tisId: "8",
          label: "Health Education England South London",
          value: "Health Education England South London"
        },
        {
          tisId: "5",
          label: "Health Education England Thames Valley",
          value: "Health Education England Thames Valley"
        }
      ],
      localOffices: [],
      curricula: [],
      formData: submittedFormRPartBs[0],
      nextSection: cy.stub(),
      previousSection: cy.stub(),
      saveDraft: cy.stub(),
      section: 0,
      nextSectionLabel: "Next section navigation label"
    };
    mount(<Section1 {...props} />);
  });
  it("should keep the 'other' dropdown list hidden if 'Other' option is not chosen", () => {
    cy.get("#defaultAutocompleteID").should("not.exist");
    cy.get("#prevRevalBody")
      .should("exist")
      .select("Health Education England East of England")
      .should("have.value", "Health Education England East of England");
    cy.get("#defaultAutocompleteID").should("not.exist");
  });

  it("should display the 'other' dropdown default value when 'Other' option chosen", () => {
    cy.get("#defaultAutocompleteID").should("not.exist");
    cy.get("#prevRevalBody").select("other").should("have.value", "other");
    cy.get("#defaultAutocompleteID").should("exist");
    cy.get("#defaultAutocompleteID").should(
      "have.value",
      "AFC Bournemouth Limited"
    );
  });

  it("should show no default 'other' dropdown value when prevRevalBodyOther is empty ", () => {
    const props = {
      designatedBodies: [],
      localOffices: [],
      curricula: [],
      formData: submittedFormRPartBs[1],
      nextSection: cy.stub(),
      previousSection: cy.stub(),
      saveDraft: cy.stub(),
      section: 0,
      nextSectionLabel: "Next section navigation label"
    };
    mount(<Section1 {...props} />);
    cy.get("#defaultAutocompleteID").should("not.exist");
    cy.get("#prevRevalBody").select("other").should("have.value", "other");
    cy.get("#defaultAutocompleteID").should("exist");
    cy.get("#defaultAutocompleteID").should("have.value", "");
  });
});
