import React from "react";
import { shallow, mount } from "enzyme";
import Section1 from "../Sections/Section1";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";

jest.mock("../ValidationSchema", () => ({
  get Section1ValidationSchema() {
    return null;
  }
}));

const mockFn = jest.fn();
const saveDraft = jest.fn();

const props = {
  designatedBodies: [],
  localOffices: [],
  curricula: [],
  formData: submittedFormRPartBs[0],
  nextSection: mockFn,
  previousSection: null,
  saveDraft: saveDraft,
  section: 0,
  nextSectionLabel: "Next section navigation label"
};

describe("Form-R Part-B Section1", () => {
  it("renders without crashing", () => {
    shallow(<Section1 {...props} />);
  });

  it("mounts without crashing", () => {
    mount(<Section1 {...props} />);
  });

  it("should render next section link buttons with correct label", async () => {
    const wrapper = mount(<Section1 {...props} />);

    expect(wrapper.find("li.nhsuk-pagination-item--next").length).toBe(1);
    expect(wrapper.find("li.nhsuk-pagination-item--next").text()).toContain(
      "Next section navigation label"
    );

    wrapper.find("a.nhsuk-pagination__link--next").first().simulate("click");
  });

  it("should submit the form", () => {
    const wrapper = mount(<Section1 {...props} />);
    const form = wrapper.find("form").first();

    try {
      form.simulate("submit");
      expect(mockFn).toHaveBeenCalled();
    } catch (e) {
      expect(true).toBe(false);
    }
  });
});
