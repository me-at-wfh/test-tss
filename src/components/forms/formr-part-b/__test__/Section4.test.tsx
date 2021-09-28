import React from "react";
import { shallow, mount } from "enzyme";
import Section4 from "../Sections/Section4";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";
import DeclarationPanel from "../Sections/DeclarationPanel";

jest.mock("../ValidationSchema", () => ({
  get Section4ValidationSchema() {
    return null;
  }
}));

const prevSection = jest.fn();
const nextSection = jest.fn();
const saveDraft = jest.fn();

const props = {
  formData: submittedFormRPartBs[0],
  previousSection: prevSection,
  nextSection: nextSection,
  saveDraft: saveDraft,
  section: 3,
  prevSectionLabel: "Previous section navigation label",
  nextSectionLabel: "Next section navigation label"
};

describe("Form-R Part-B Section4", () => {
  it("renders without crashing", () => {
    shallow(<Section4 {...props} />);
  });

  it("mounts without crashing", () => {
    mount(<Section4 {...props} />);
  });

  it("should render page heading", () => {
    const wrapper = mount(<Section4 {...props} />);
    expect(wrapper.find("[data-jest='mainFieldset4'] legend").length).toBe(1);
  });

  it("should render two radio buttons for flagging previous Significant Events, Complaints, Other investigations", () => {
    const wrapper = mount(<Section4 {...props} />);
    expect(
      wrapper.find("[data-jest='havePreviousDeclarations'] input").length
    ).toBe(2);
  });

  it("should render values of two radio buttons for flagging previous Significant Events, Complaints, Other investigations as true and false", () => {
    const component = mount(<Section4 {...props} />);
    const wrapper = component.find(
      "[data-jest='havePreviousDeclarations'] input"
    );
    expect(wrapper.first().prop("value")).toBe("true");
    expect(wrapper.last().prop("value")).toBe("false");
  });

  it("should render a 'previous declaration' panel when 'yes' radio for flagging previous Significant Events, Complaints, Other investigations is true ", () => {
    const component = mount(<Section4 {...props} />);
    const wrapper = component.find(
      "[data-jest='havePreviousDeclarations'] input"
    );
    wrapper.first().simulate("click");
    expect(component.find("[data-jest='declarationPanel4']").length).toBe(1);
  });

  it("should render a new panel when clicking on 'Add more'", async () => {
    const component = mount(<Section4 {...props} />);
    const wrapper = component.find("div.placementPanel");
    const panelLength = wrapper.length;
    component.find("button[data-jest='btnAddDeclaration']").simulate("click");
    expect(component.find("div.placementPanel").length).toBe(panelLength + 1);
  });

  it("should remove a panel when clicking on delete panel button", async () => {
    const component = mount(<Section4 {...props} />);
    const wrapper = component.find("div.placementPanel");
    const panelLength = wrapper.length;
    component.find("button[data-jest='btnAddDeclaration']").simulate("click");
    expect(component.find("div.placementPanel").length).toBe(panelLength + 1);
    component.find("button[data-jest='removePanel']").last().simulate("click");
    expect(component.find("div.placementPanel").length).toBe(panelLength);
  });

  it("should render a 'summary of previous unresolved declarations' textarea when 'yes' radio for flagging previous Significant Events, Complaints, Other investigations is true ", () => {
    const component = mount(<Section4 {...props} />);
    const wrapper = component.find(
      "[data-jest='havePreviousDeclarations'] input"
    );
    wrapper.first().simulate("click");
    expect(
      component.find("[data-jest='previousDeclarationSummaryTextInput']")
    ).toBeTruthy();
  });

  it("Should not have any Declaration panel when havePreviousDeclarations is false", () => {
    const wrapper = mount(<Section4 {...props} />);
    expect(wrapper.find(DeclarationPanel)).toHaveLength(1);

    wrapper
      .find("[data-jest='havePreviousDeclarations'] input")
      .last()
      .simulate("change", {
        persist: () => {},
        target: {
          name: "havePreviousDeclarations",
          value: "false"
        }
      });

    expect(wrapper.find(DeclarationPanel)).toHaveLength(0);
  });

  it("should render previous section link buttons with correct label", () => {
    const wrapper = mount(<Section4 {...props} />);

    expect(wrapper.find("li.nhsuk-pagination-item--previous").length).toBe(1);
    expect(wrapper.find("li.nhsuk-pagination-item--previous").text()).toContain(
      "Previous section navigation label"
    );
    wrapper.find("a.nhsuk-pagination__link--prev").first().simulate("click");
    expect(prevSection).toHaveBeenCalled();
  });

  it("should render next section link buttons  with correct label", async () => {
    const wrapper = mount(<Section4 {...props} />);

    expect(wrapper.find("li.nhsuk-pagination-item--next").length).toBe(1);
    expect(wrapper.find("li.nhsuk-pagination-item--next").text()).toContain(
      "Next section navigation label"
    );
    wrapper.find("a.nhsuk-pagination__link--next").first().simulate("click");
  });

  it("should submit the form", () => {
    const wrapper = mount(<Section4 {...props} />);
    const form = wrapper.find("form").first();

    try {
      form.simulate("submit");
      expect(nextSection).toHaveBeenCalled();
    } catch (e) {
      expect(true).toBe(false);
    }
  });
});
