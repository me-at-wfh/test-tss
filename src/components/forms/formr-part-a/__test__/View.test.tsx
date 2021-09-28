import React from "react";
import { mount } from "enzyme";
import View from "../View";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { submittedFormRPartAs } from "../../../../mock-data/submitted-formr-parta";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { FormRPartA } from "../../../../models/FormRPartA";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("View", () => {
  const mountComponent = (
    form: FormRPartA | null,
    history: any,
    canEdit: boolean = false
  ) => {
    const store = mockStore({
      formRPartA: {
        formData: form
      }
    });

    return mount(
      <Provider store={store}>
        <BrowserRouter>
          <View canEdit={canEdit} history={history} />
        </BrowserRouter>
      </Provider>
    );
  };

  it("renders without crashing", () => {
    mountComponent(submittedFormRPartAs[0], []);
  });

  it("should push /formr-a to history when form data is null", () => {
    const history: any[] = [];
    mountComponent(null, history);

    expect(history[0]).toEqual("/formr-a");
  });

  it("should load data when form data is not null", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartAs[0], history);
    expect(history).toHaveLength(0);
    expect(wrapper.find(".nhsuk-summary-list__key")).toBeTruthy();
  });

  it("should display 'How to export' link when uneditable", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartAs[0], history, false);
    expect(wrapper.find("a[data-jest='linkHowToExport']")).toHaveLength(1);
  });

  it("should not display 'How to export' link when editable", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartAs[0], history, true);
    expect(wrapper.find("a[data-jest='linkHowToExport']")).toHaveLength(0);
  });

  it("should display confirm message when editable", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartAs[0], history, true);
    expect(wrapper.find("[data-jest='warningConfirmation'] h3")).toHaveLength(
      1
    );
  });

  it("should not display confirm message when not editable", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartAs[0], history, false);
    expect(wrapper.find("[data-jest='warningConfirmation']")).toHaveLength(0);
  });
});
