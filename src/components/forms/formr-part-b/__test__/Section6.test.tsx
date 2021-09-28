import React from "react";
import { shallow, mount } from "enzyme";
import Section6 from "../Sections/Section6";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";
import { SectionProps } from "../Sections/SectionProps";
import { BrowserRouter } from "react-router-dom";

const prevSection = jest.fn();
const nextSection = jest.fn();
const saveDraft = jest.fn();

const props: SectionProps = {
  formData: submittedFormRPartBs[0],
  previousSection: prevSection,
  nextSection: nextSection,
  saveDraft: saveDraft,
  section: 5,
  prevSectionLabel: "Previous section navigation label",
  nextSectionLabel: "Next section navigation label"
};

describe("Form-R Part-B Section6", () => {
  it("renders without crashing", () => {
    shallow(<Section6 {...props} />);
  });

  it("mounts without crashing", () => {
    mount(
      <BrowserRouter>
        <Section6 {...props} />
      </BrowserRouter>
    );
  });

  it("should render page heading", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Section6 {...props} />
      </BrowserRouter>
    );
    expect(wrapper.find("[data-jest='mainFieldset6'] legend").length).toBe(1);
  });

  it("should render previous section link buttons with correct label", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Section6 {...props} />
      </BrowserRouter>
    );

    expect(wrapper.find("li.nhsuk-pagination-item--previous").length).toBe(1);
    expect(wrapper.find("li.nhsuk-pagination-item--previous").text()).toContain(
      "Previous section navigation label"
    );
    wrapper.find("a.nhsuk-pagination__link--prev").first().simulate("click");
    expect(prevSection).toHaveBeenCalled();
  });

  it("should render next section link buttons with correct label", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Section6 {...props} />
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
        <Section6 {...props} />
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
