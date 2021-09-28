import React from "react";
import { mount } from "enzyme";
import View from "../View";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";
import { Provider } from "react-redux";
import { FormRPartB } from "../../../../models/FormRPartB";
import { BrowserRouter } from "react-router-dom";
const mockStore = configureMockStore([thunk]);

const mountComponent = (
  form: FormRPartB | null,
  history: any,
  canEdit: boolean
) => {
  const store = mockStore({
    formRPartB: {
      formData: form
    },
    featureFlags: {
      formRPartB: {
        covidDeclaration: false
      }
    }
  });

  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <View canEdit={canEdit} history={history} editSection={() => jest.fn} />
      </BrowserRouter>
    </Provider>
  );
};

describe("View", () => {
  it("renders without crashing", () => {
    mountComponent(submittedFormRPartBs[0], [], false);
  });

  it("should push /formr-b to history when form data is null", () => {
    const history: any[] = [];
    mountComponent(null, history, false);

    expect(history[0]).toEqual("/formr-b");
  });

  it("should load data when form data is not null", () => {
    const wrapper = mountComponent(submittedFormRPartBs[0], [], false);

    expect(wrapper.find("button.sectionEditButton").length).toBe(0);
  });

  it("should render date fields in local date format", () => {
    const wrapper = mountComponent(submittedFormRPartBs[0], [], false);
    expect(wrapper.find("[data-jest='currRevalDate']").first().text()).toBe(
      "22/04/2020"
    );
    expect(wrapper.find("[data-jest='prevRevalDate']").first().text()).toBe(
      "22/04/2020"
    );
    expect(wrapper.find("[data-jest='startDate']").first().text()).toBe(
      "01/01/2020"
    );
    expect(wrapper.find("[data-jest='endDate']").first().text()).toBe(
      "31/12/2020"
    );
    expect(
      wrapper.find("[data-jest='previousDateOfEntry']").first().text()
    ).toBe("07/03/2020");
    expect(
      wrapper.find("[data-jest='currentDateOfEntry']").first().text()
    ).toBe("12/06/2020");
  });

  it("should show date fields value empty when undefined", () => {
    const work = submittedFormRPartBs[0].work[0];
    const prevDeclarations = submittedFormRPartBs[0].previousDeclarations[0];
    const currDeclarations = submittedFormRPartBs[0].currentDeclarations[0];

    const formData = {
      ...submittedFormRPartBs[0],
      currRevalDate: undefined,
      prevRevalDate: undefined,
      work: [
        {
          ...work,
          startDate: undefined,
          endDate: undefined
        }
      ],
      previousDeclarations: [
        {
          ...prevDeclarations,
          dateOfEntry: undefined
        }
      ],
      currentDeclarations: [
        {
          ...currDeclarations,
          dateOfEntry: undefined
        }
      ]
    };

    const wrapper = mountComponent(formData, [], false);

    expect(wrapper.find("[data-jest='currRevalDate']").first().text()).toBe("");
    expect(wrapper.find("[data-jest='prevRevalDate']").first().text()).toBe("");
    expect(wrapper.find("[data-jest='startDate']").first().text()).toBe("");
    expect(wrapper.find("[data-jest='endDate']").first().text()).toBe("");
    expect(
      wrapper.find("[data-jest='previousDateOfEntry']").first().text()
    ).toBe("");
    expect(
      wrapper.find("[data-jest='currentDateOfEntry']").first().text()
    ).toBe("");
  });

  it("should not add any work panels if no items found", () => {
    const formData = { ...submittedFormRPartBs[0], work: [] };
    const wrapper = mountComponent(formData, [], false);

    expect(wrapper.find("div.workPanel").length).toBe(0);
  });

  it("should not add any previous declaration event panels if no items found", () => {
    const formData = { ...submittedFormRPartBs[0], previousDeclarations: [] };
    const wrapper = mountComponent(formData, [], false);

    expect(wrapper.find("div.previousDeclarationsPanel").length).toBe(0);
  });

  it("should not add any current declaration event panels if no items found", () => {
    const formData = { ...submittedFormRPartBs[0], currentDeclarations: [] };
    const wrapper = mountComponent(formData, [], false);

    expect(wrapper.find("div.currentDeclarationsPanel").length).toBe(0);
  });

  it("should not load Edit buttons when canEdit is false", () => {
    const wrapper = mountComponent(submittedFormRPartBs[0], [], true);

    expect(wrapper.find("button.sectionEditButton").length).toBeGreaterThan(0);
  });

  it("should load Edit buttons when canEdit is true", () => {
    const wrapper = mountComponent(submittedFormRPartBs[0], [], true);

    expect(wrapper.find("button.sectionEditButton").length).toBeGreaterThan(0);
  });

  it("should display 'How to export' link when uneditable", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartBs[0], history, false);
    expect(wrapper.find("a[data-jest='linkHowToExport']")).toHaveLength(1);
  });

  it("should not display 'How to export' link when editable", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartBs[0], history, true);
    expect(wrapper.find("a[data-jest='linkHowToExport']")).toHaveLength(0);
  });

  it("should display confirm message when editable", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartBs[0], history, true);
    expect(wrapper.find("[data-jest='warningConfirmation'] h3")).toHaveLength(
      1
    );
  });

  it("should not display confirm message when not editable", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartBs[0], history, false);
    expect(wrapper.find("[data-jest='warningConfirmation']")).toHaveLength(0);
  });
});
