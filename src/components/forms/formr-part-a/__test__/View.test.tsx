import React from "react";
import { mount } from "enzyme";
import View from "../View";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { submittedFormRPartAs } from "../../../../mock-data/submitted-formr-parta";
import { Provider } from "react-redux";
import { FormRPartA } from "../../../../models/FormRPartA";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("View", () => {
  const mountComponent = (form: FormRPartA | null, history: any) => {
    const store = mockStore({
      formRPartA: {
        formData: form
      }
    });

    return mount(
      <Provider store={store}>
        <View history={history} />
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
    expect(wrapper.find("a")).toHaveLength(1);
  });
});
