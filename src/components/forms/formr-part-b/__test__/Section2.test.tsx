import React from "react";
import { shallow, mount } from "enzyme";
import Section2 from "../Sections/Section2";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";

const prevSection = jest.fn();
const nextSection = jest.fn();
const saveDraft = jest.fn();

jest.mock("../ValidationSchema", () => ({
  get Section2ValidationSchema() {
    return null;
  }
}));

const props = {
  formData: submittedFormRPartBs[0],
  previousSection: prevSection,
  nextSection: nextSection,
  history: [],
  saveDraft: saveDraft,
  section: 1,
  prevSectionLabel: "Previous section navigation label",
  nextSectionLabel: "Next section navigation label"
};

describe("Form-R Part-B Section2", () => {
  it("renders without crashing", () => {
    shallow(<Section2 {...props} />);
  });

  it("mounts without crashing", () => {
    mount(<Section2 {...props} />);
  });

  it("should put the work placements in decending order by end date", () => {
    const wrapper = mount(<Section2 {...props} />);

    const firstWorkEndDate = wrapper
      .find("[data-cy='work[0].endDate']")
      .first()
      .prop("value");

    expect(firstWorkEndDate).toBe("2020-12-31");
  });

  it("should add work panel if no placements exists", () => {
    props.formData.work = [];
    const wrapper = mount(<Section2 {...props} />);

    expect(wrapper.find("[data-jest='workPanel']").length).toBe(1);
  });

  it("should add work panel on 'Add more' button click", () => {
    const wrapper = mount(<Section2 {...props} />);

    expect(wrapper.find("[data-jest='workPanel']").length).toBe(
      props.formData.work.length
    );

    const addMoreButton = wrapper.find("[data-jest='addMore']").first();
    addMoreButton.simulate("click");

    expect(wrapper.find("[data-jest='workPanel']").length).toBe(
      props.formData.work.length + 1
    );
  });

  it("should remove work panel on 'Delete' button click", () => {
    const wrapper = mount(<Section2 {...props} />);

    const addMoreButton = wrapper.find("[data-jest='addMore']").first();
    addMoreButton.simulate("click");

    const removePanelButton = wrapper.find("[data-jest='removePanel']").first();
    removePanelButton.simulate("click");

    expect(wrapper.find("[data-jest='workPanel']").length).toBe(
      props.formData.work.length
    );
  });

  it("should render previous section link buttons with correct label", () => {
    const wrapper = mount(<Section2 {...props} />);

    expect(wrapper.find("li.nhsuk-pagination-item--previous").length).toBe(1);
    expect(wrapper.find("li.nhsuk-pagination-item--previous").text()).toContain(
      "Previous section navigation label"
    );
    wrapper.find("a.nhsuk-pagination__link--prev").first().simulate("click");
    expect(prevSection).toHaveBeenCalled();
  });

  it("should render next section link buttons with correct label", async () => {
    const wrapper = mount(<Section2 {...props} />);

    expect(wrapper.find("li.nhsuk-pagination-item--next").length).toBe(1);
    expect(wrapper.find("li.nhsuk-pagination-item--next").text()).toContain(
      "Next section navigation label"
    );
    wrapper.find("a.nhsuk-pagination__link--next").first().simulate("click");
  });

  it("should submit the form", () => {
    const wrapper = mount(<Section2 {...props} />);
    const form = wrapper.find("form").first();

    try {
      form.simulate("submit");
      expect(nextSection).toHaveBeenCalled();
    } catch (e) {
      expect(true).toBe(false);
    }
  });
});
