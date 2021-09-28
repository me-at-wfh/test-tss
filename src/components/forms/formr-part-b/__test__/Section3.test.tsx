import React from "react";
import { shallow, mount } from "enzyme";
import Section3 from "../Sections/Section3";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";
import { BrowserRouter } from "react-router-dom";

jest.mock("../ValidationSchema", () => ({
  get Section3ValidationSchema() {
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
  history: [],
  section: 2,
  prevSectionLabel: "Previous section navigation label",
  nextSectionLabel: "Next section navigation label"
};

describe("Form-R Part-B Section3", () => {
  it("renders without crashing", () => {
    shallow(<Section3 {...props} />);
  });

  it("mounts without crashing", () => {
    mount(
      <BrowserRouter>
        <Section3 {...props} />
      </BrowserRouter>
    );
  });

  it("should render page heading", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Section3 {...props} />
      </BrowserRouter>
    );
    expect(wrapper.find("[data-jest='mainFieldset'] legend").length).toBe(1);
  });

  it("should render single checkbox for acceptance of honesty and integrity", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Section3 {...props} />
      </BrowserRouter>
    );
    expect(wrapper.find("[data-jest='isHonest'] input").length).toBe(1);
  });

  it("should render single checkbox for acceptance of personal health", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Section3 {...props} />
      </BrowserRouter>
    );
    expect(wrapper.find("[data-jest='isHealthy'] input").length).toBe(1);
  });

  it("should render two radio buttons for flagging of GMC conditions or warnings", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Section3 {...props} />
      </BrowserRouter>
    );
    expect(wrapper.find("[data-jest='isWarned'] input").length).toBe(2);
  });

  it("should render health statement textarea", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Section3 {...props} />
      </BrowserRouter>
    );
    expect(wrapper.find("textarea").length).toBe(1);
  });

  it("should render GMC conditions or warnings radio button values as true and false", () => {
    const component = mount(
      <BrowserRouter>
        <Section3 {...props} />
      </BrowserRouter>
    );
    const wrapper = component.find("[data-jest='isWarned'] input");
    expect(wrapper.at(0).prop("value")).toBe("true");
    expect(wrapper.at(1).prop("value")).toBe("false");
  });

  it("should show single checkbox for compying with conditions or warnings when GMC conditions or warnings set to true ", () => {
    const component = mount(
      <BrowserRouter>
        <Section3 {...props} />
      </BrowserRouter>
    );
    const wrapper = component.find("[data-jest='isWarned'] input");
    wrapper.at(0).simulate("click");
    expect(component.find("[data-jest='isComplying']").length).toBe(1);
  });

  it("should render previous section link buttons with correct label", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Section3 {...props} />
      </BrowserRouter>
    );

    expect(wrapper.find("li.nhsuk-pagination-item--previous").length).toBe(1);
    expect(wrapper.find("li.nhsuk-pagination-item--previous").text()).toContain(
      "Previous section navigation label"
    );
    wrapper.find("a.nhsuk-pagination__link--prev").first().simulate("click");
    expect(prevSection).toHaveBeenCalled();
  });

  it("should render next section link buttons  with correct label", async () => {
    const wrapper = mount(
      <BrowserRouter>
        <Section3 {...props} />
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
        <Section3 {...props} />
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
