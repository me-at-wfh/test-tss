import React from "react";
import { shallow, mount } from "enzyme";
import FormRPartBPagination from "../Sections/FormRPartBPagination";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";

const prevSection = jest.fn();
const nextSection = jest.fn();
const saveDraft = jest.fn();

const props = {
  values: submittedFormRPartBs[0],
  previousSection: prevSection,
  handleSubmit: nextSection,
  saveDraft: saveDraft,
  history: [],
  section: 1,
  prevSectionLabel: "Previous section navigation label",
  nextSectionLabel: "Next section navigation label"
};

describe("Pagination component", () => {
  it("renders without crashing", () => {
    shallow(<FormRPartBPagination {...props} />);
  });

  it("mounts without crashing", () => {
    mount(<FormRPartBPagination {...props} />);
  });

  it("renders previous and next section link when both section labels are present", () => {
    const component = mount(<FormRPartBPagination {...props} />);
    expect(component.find(".nhsuk-pagination__link--prev").length).toBe(1);
    expect(component.find("a[data-jest='LinkToPreviousSection0']").length).toBe(
      1
    );

    expect(component.find(".nhsuk-pagination__link--next").length).toBe(1);
    expect(component.find("a[data-jest='LinkToNextSection2']").length).toBe(1);
  });

  it("renders next section link only when previous section label is empty", () => {
    props.prevSectionLabel = "";
    const component = mount(<FormRPartBPagination {...props} />);
    expect(component.find(".nhsuk-pagination__link--prev").length).toBe(0);
  });

  it("should invoke prevSection when previous section link clicked", () => {
    props.prevSectionLabel = "Previous section label";
    const component = mount(<FormRPartBPagination {...props} />);
    const wrapper = component.find(".nhsuk-pagination__link--prev");
    wrapper.simulate("click");
    expect(prevSection).toHaveBeenCalled();
  });

  it("should invoke nextSection when next section link clicked", () => {
    const component = mount(<FormRPartBPagination {...props} />);
    const wrapper = component.find(".nhsuk-pagination__link--next");
    wrapper.simulate("click");
    expect(nextSection).toHaveBeenCalled();
  });
});
