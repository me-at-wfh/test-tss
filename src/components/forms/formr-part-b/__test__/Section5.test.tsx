import React from "react";
import { shallow, mount } from "enzyme";
import Section5 from "../Sections/Section5";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";
import { SectionProps } from "../Sections/SectionProps";
import DeclarationPanel from "../Sections/DeclarationPanel";
import { BrowserRouter } from "react-router-dom";

jest.mock("../ValidationSchema", () => ({
  get Section5ValidationSchema() {
    return null;
  }
}));

const prevSection = jest.fn();
const nextSection = jest.fn();
const saveDraft = jest.fn();

const props: SectionProps = {
  formData: submittedFormRPartBs[0],
  previousSection: prevSection,
  nextSection: nextSection,
  saveDraft: saveDraft,
  section: 4,
  prevSectionLabel: "Previous section navigation label",
  nextSectionLabel: "Next section navigation label"
};

describe("Form-R Part-B Section5", () => {
  it("renders without crashing", () => {
    shallow(<Section5 {...props} />);
  });

  it("mounts without crashing", () => {
    mount(
      <BrowserRouter>
        <Section5 {...props} />
      </BrowserRouter>
    );
  });

  it("should render page heading", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Section5 {...props} />
      </BrowserRouter>
    );
    expect(wrapper.find("[data-jest='mainFieldset5'] legend").length).toBe(1);
  });

  it("should render two radio buttons for flagging current Significant Events, Complaints, Other investigations", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Section5 {...props} />
      </BrowserRouter>
    );
    expect(
      wrapper.find("[data-jest='haveCurrentDeclarations'] input").length
    ).toBe(2);
  });

  it("should render a new panel when clicking on 'Add more'", async () => {
    const component = mount(
      <BrowserRouter>
        <Section5 {...props} />
      </BrowserRouter>
    );
    const wrapper = component.find("div.placementPanel");
    const panelLength = wrapper.length;
    component.find("button[data-jest='btnAddDeclaration']").simulate("click");
    component.update();
    expect(component.find("div.placementPanel").length).toBe(panelLength + 1);
  });

  it("should remove a panel when clicking on delete panel button", async () => {
    const component = mount(
      <BrowserRouter>
        <Section5 {...props} />
      </BrowserRouter>
    );
    const wrapper = component.find("div.placementPanel");
    const panelLength = wrapper.length;
    component.find("button[data-jest='btnAddDeclaration']").simulate("click");
    component.update();
    expect(component.find("div.placementPanel").length).toBe(panelLength + 1);
    component.find("button[data-jest='removePanel']").last().simulate("click");
    component.update();
    expect(component.find("div.placementPanel").length).toBe(panelLength);
  });

  it("should render values of two radio buttons for flagging current Significant Events, Complaints, Other investigations as true and false", () => {
    const component = mount(
      <BrowserRouter>
        <Section5 {...props} />
      </BrowserRouter>
    );
    const wrapper = component.find(
      "[data-jest='haveCurrentDeclarations'] input"
    );
    expect(wrapper.first().prop("value")).toBe("true");
    expect(wrapper.last().prop("value")).toBe("false");
  });

  it("should render a 'summary of current unresolved declarations' textarea when 'yes' radio for flagging current Significant Events, Complaints, Other investigations is true ", () => {
    const component = mount(
      <BrowserRouter>
        <Section5 {...props} />
      </BrowserRouter>
    );
    const wrapper = component.find(
      "[data-jest='haveCurrentDeclarations'] input"
    );
    wrapper.first().simulate("click");
    expect(
      component.find("[data-jest='currentDeclarationSummaryTextInput']")
    ).toBeTruthy();
  });

  it("Should not have any Declaration panel when haveCurrentDeclarations is false", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Section5 {...props} />
      </BrowserRouter>
    );
    expect(wrapper.find(DeclarationPanel)).toHaveLength(1);

    wrapper
      .find("[data-jest='haveCurrentDeclarations'] input")
      .last()
      .simulate("change", {
        persist: () => {},
        target: {
          name: "haveCurrentDeclarations",
          value: "false"
        }
      });

    expect(wrapper.find(DeclarationPanel)).toHaveLength(0);
  });

  it("should render previous section link buttons with correct label", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Section5 {...props} />
      </BrowserRouter>
    );

    expect(wrapper.find("li.nhsuk-pagination-item--previous").length).toBe(1);
    expect(wrapper.find("li.nhsuk-pagination-item--previous").text()).toContain(
      "Previous section navigation label"
    );
    wrapper.find("a.nhsuk-pagination__link--prev").first().simulate("click");
    expect(prevSection).toHaveBeenCalled();
  });

  it("should render next section link buttons with correct label", async () => {
    const wrapper = mount(
      <BrowserRouter>
        <Section5 {...props} />
      </BrowserRouter>
    );

    expect(wrapper.find("li.nhsuk-pagination-item--next").length).toBe(1);
    expect(wrapper.find("li.nhsuk-pagination-item--next").text()).toContain(
      "Next section navigation label"
    );
    wrapper.find("a.nhsuk-pagination__link--next").first().simulate("click");
  });

  it("should submit the form", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Section5 {...props} />
      </BrowserRouter>
    );
    const form = wrapper.find("form").first();

    try {
      form.simulate("submit");
      expect(nextSection).toHaveBeenCalled();
    } catch (e) {
      expect(true).toBe(false);
    }
  });
});
