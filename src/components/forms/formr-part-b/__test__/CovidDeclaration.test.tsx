import React from "react";
import { shallow, mount } from "enzyme";
import CovidDeclaration from "../Sections/CovidDeclaration";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";
import { BrowserRouter } from "react-router-dom";

jest.mock("../ValidationSchema", () => ({
  get CovidSectionValidationSchema() {
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
  section: 6,
  prevSectionLabel: "Previous section navigation label",
  nextSectionLabel: "Next section navigation label"
};

describe("Form-R Part-B CovidDeclaration", () => {
  it("renders without crashing", () => {
    shallow(<CovidDeclaration {...props} />);
  });

  it("mounts without crashing", () => {
    mount(
      <BrowserRouter>
        <CovidDeclaration {...props} />
      </BrowserRouter>
    );
  });

  it("should render page heading", () => {
    const wrapper = mount(
      <BrowserRouter>
        <CovidDeclaration {...props} />
      </BrowserRouter>
    );
    expect(wrapper.find("[data-jest='mainFieldset6'] legend").length).toBe(1);
    expect(wrapper.find("[data-jest='mainFieldset6'] legend").text()).toContain(
      "COVID"
    );
  });

  it("should render 2 radio buttons to flag whether the user has been affected by Covid", () => {
    const wrapper = mount(
      <BrowserRouter>
        <CovidDeclaration {...props} />
      </BrowserRouter>
    );
    expect(
      wrapper.find("[data-jest='haveCovidDeclarations'] input").length
    ).toBe(2);
  });

  it("should render values of two radio buttons for flagging Covid affect as true and false", () => {
    const component = mount(
      <BrowserRouter>
        <CovidDeclaration {...props} />
      </BrowserRouter>
    );
    const wrapper = component.find("[data-jest='haveCovidDeclarations'] input");
    expect(wrapper.first().prop("value")).toBe("true");
    expect(wrapper.last().prop("value")).toBe("false");
  });

  it("should render two radio buttons for flagging Covid affect unchecked", () => {
    const component = mount(
      <BrowserRouter>
        <CovidDeclaration {...props} />
      </BrowserRouter>
    );
    const wrapper = component.find("[data-jest='haveCovidDeclarations'] input");
    expect(wrapper.first().prop("checked")).toBe(false);
    expect(wrapper.last().prop("checked")).toBe(false);
  });

  it("should render the affected by Covid form when 'yes' is selected and remove when 'no' selected", () => {
    const component = mount(
      <BrowserRouter>
        <CovidDeclaration {...props} />
      </BrowserRouter>
    );
    const wrapper = component.find("[data-jest='haveCovidDeclarations'] input");
    wrapper.first().simulate("change", { target: { value: true } });
    setTimeout(() => {
      expect(component.find(["data-jest='covidForm"]).length).toBe(1);
    }, 300);
    wrapper.last().simulate("change", { target: { value: true } });
    setTimeout(() => {
      expect(component.find(["data-jest='covidForm"]).length).toBe(0);
    }, 300);
  });

  describe("When form is visible", () => {
    it("should render 3 radio buttons for flagging self-rated progress, all unchecked", () => {
      const component = mount(
        <BrowserRouter>
          <CovidDeclaration {...props} />
        </BrowserRouter>
      );
      const wrapper = component.find(
        "[data-jest='haveCovidDeclarations'] input"
      );
      wrapper.first().simulate("change", { target: { value: true } });
      setTimeout(() => {
        expect(
          component.find(
            "[data-jest='covidDeclarationDto.selfRateForCovid] input[type='radio']"
          ).length
        ).toBe(3);
        expect(
          component
            .find(
              "[data-jest='covidDeclarationDto.selfRateForCovid] input[type='radio']"
            )
            .at(1)
            .prop("checked")
        ).toBe(false);

        expect(
          component
            .find(
              "[data-jest='covidDeclarationDto.selfRateForCovid] input[type='radio']"
            )
            .at(2)
            .prop("checked")
        ).toBe(false);

        expect(
          component
            .find(
              "[data-jest='covidDeclarationDto.selfRateForCovid] input[type='radio']"
            )
            .at(3)
            .prop("checked")
        ).toBe(false);
      }, 300);
    });

    it("should render a conditional textarea when self-rated progress radio is checked", () => {
      const component = mount(
        <BrowserRouter>
          <CovidDeclaration {...props} />
        </BrowserRouter>
      );
      const wrapper = component.find(
        "[data-jest='haveCovidDeclarations'] input"
      );
      wrapper.first().simulate("change", { target: { value: true } });
      setTimeout(() => {
        component
          .find(
            "[data-jest='covidDeclarationDto.selfRateForCovid] input[type='radio']"
          )
          .at(1)
          .simulate("change", { target: { value: true } });
        expect(
          component.find(
            "[data-jest='covidDeclarationDto.selfRateForCovid] .nhsuk-radios__conditional"
          ).length
        ).toBe(1);
      }, 300);
    });

    it("should render other information textarea", () => {
      const component = mount(
        <BrowserRouter>
          <CovidDeclaration {...props} />
        </BrowserRouter>
      );
      const wrapper = component.find(
        "[data-jest='haveCovidDeclarations'] input"
      );
      wrapper.first().simulate("change", { target: { value: true } });
      setTimeout(() => {
        expect(
          component.find(
            "textarea[data-jest='covidDeclarationDto.otherInformationForPanel']"
          ).length
        ).toBe(1);
      }, 300);
    });
  });

  it("should render two radio buttons valued true and false flagging if changes have been made to placement both unchecked", () => {
    const component = mount(
      <BrowserRouter>
        <CovidDeclaration {...props} />
      </BrowserRouter>
    );
    const wrapper = component.find("[data-jest='haveCovidDeclarations'] input");
    wrapper.first().simulate("change", { target: { value: true } });
    setTimeout(() => {
      expect(
        component.find("[data-jest='haveChangesToPlacement'] input").length
      ).toBe(2);
      expect(
        component
          .find("[data-jest='haveChangesToPlacement'] input")
          .first()
          .prop("checked")
      ).toBe(false);
      expect(
        component
          .find("[data-jest='haveChangesToPlacement'] input")
          .first()
          .prop("value")
      ).toBe("true");
      expect(
        component
          .find("[data-jest='haveChangesToPlacement'] input")
          .last()
          .prop("checked")
      ).toBe(false);
      expect(
        component
          .find("[data-jest='haveChangesToPlacement'] input")
          .last()
          .prop("value")
      ).toBe("false");
    }, 300);
  });

  it("should conditionally render fields for entering placement change details", () => {
    const component = mount(
      <BrowserRouter>
        <CovidDeclaration {...props} />
      </BrowserRouter>
    );
    const wrapper = component.find("[data-jest='haveCovidDeclarations'] input");
    wrapper.first().simulate("change", { target: { value: true } });
    setTimeout(() => {
      component
        .find("[data-jest='haveChangesToPlacement'] input")
        .first()
        .simulate("change", { target: { value: true } });
      expect(component.find("[data-jest='placementChanges']").length).toBe(1);
    });
  });

  it("should clear typed values when toggling flag", () => {
    const component = mount(
      <BrowserRouter>
        <CovidDeclaration {...props} />
      </BrowserRouter>
    );
    const wrapper = component.find("[data-jest='haveCovidDeclarations'] input");
    wrapper.first().simulate("change", { target: { value: true } });
    setTimeout(() => {
      component
        .find("[data-jest='haveChangesToPlacement'] input")
        .first()
        .simulate("change", { target: { value: true } });
      expect(
        component.find("textarea[data-jest=howPlacementAdjusted]").length
      ).toBe(1);
      component
        .find("textarea[data-jest=howPlacementAdjusted]")
        .simulate("change", { target: { value: "Lorem ipsum" } });
      component
        .find("[data-jest='haveChangesToPlacement'] input")
        .last()
        .simulate("change", { target: { value: true } });
      component
        .find("[data-jest='haveChangesToPlacement'] input")
        .first()
        .simulate("change", { target: { value: true } });
      expect(
        component.find("textarea[data-jest=howPlacementAdjusted]").props().value
      ).toBe("");
    });
  });

  it("should render text box for typing supervisor name", () => {
    const component = mount(
      <BrowserRouter>
        <CovidDeclaration {...props} />
      </BrowserRouter>
    );
    const wrapper = component.find("[data-jest='haveCovidDeclarations'] input");
    wrapper.first().simulate("change", { target: { value: true } });
    setTimeout(() => {
      expect(
        component.find("[data-jest='educationSupervisorName']").length
      ).toBe(1);
    });
  });

  it("should render text box for typing supervisor email", () => {
    const component = mount(
      <BrowserRouter>
        <CovidDeclaration {...props} />
      </BrowserRouter>
    );
    const wrapper = component.find("[data-jest='haveCovidDeclarations'] input");
    wrapper.first().simulate("change", { target: { value: true } });
    setTimeout(() => {
      expect(
        component.find("[data-jest='educationSupervisorEmail']").length
      ).toBe(1);
    });
  });

  it("should render previous section link buttons with correct label", () => {
    const wrapper = mount(
      <BrowserRouter>
        <CovidDeclaration {...props} />
      </BrowserRouter>
    );

    expect(wrapper.find("li.nhsuk-pagination-item--previous").length).toBe(1);
    expect(wrapper.find("li.nhsuk-pagination-item--previous").text()).toContain(
      "Previous section navigation label"
    );
    wrapper.find("a.nhsuk-pagination__link--prev").first().simulate("click");
    expect(prevSection).toHaveBeenCalled();
  });

  it("should render next section link buttons", async () => {
    const wrapper = mount(
      <BrowserRouter>
        <CovidDeclaration {...props} />
      </BrowserRouter>
    );

    expect(wrapper.find("li.nhsuk-pagination-item--next").length).toBe(1);
    expect(wrapper.find("li.nhsuk-pagination-item--next").text()).toContain(
      "Next section navigation label"
    );
    wrapper.find("a.nhsuk-pagination__link--next").first().simulate("click");
  });
});
