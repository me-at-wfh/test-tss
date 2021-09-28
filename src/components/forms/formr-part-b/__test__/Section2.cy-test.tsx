import { mount } from "@cypress/react";
import Section2 from "../Sections/Section2";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";
import { beforeEach } from "mocha";
describe("Section 2", () => {
  beforeEach(() => {
    const props = {
      formData: submittedFormRPartBs[0],
      nextSection: cy.stub(),
      previousSection: cy.stub(),
      saveDraft: cy.stub(),
      section: 0
    };
    mount(<Section2 {...props} />);
  });
  it("should put the work placements in desc endDate order.", () => {
    cy.get(`[data-cy="work[0].endDate"]`)
      .should("exist")
      .should("have.value", "2020-12-31");
  });
});
