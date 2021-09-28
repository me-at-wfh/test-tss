import React from "react";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import Confirm from "../Confirm";
import { Provider } from "react-redux";
import { FormRPartA } from "../../../../models/FormRPartA";
import { submittedFormRPartAs } from "../../../../mock-data/submitted-formr-parta";
import { act } from "react-test-renderer";
import { BrowserRouter, Redirect } from "react-router-dom";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Confirm", () => {
  const mountComponent = (form: FormRPartA | null, history: any) => {
    const store = mockStore({
      formRPartA: {
        formData: form
      }
    });

    return mount(
      <Provider store={store}>
        <BrowserRouter>
          <Confirm history={history} />
        </BrowserRouter>
      </Provider>
    );
  };

  it("renders without crashing", () => {
    mountComponent(submittedFormRPartAs[0], null);
  });

  it("should push 'formr-a/create' page to history when form data not available", () => {
    const history: any[] = [];
    const wrapper = mountComponent(null, history);

    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  it("renders the edit and confirm buttons when form data is avaialbe", () => {
    const wrapper = mountComponent(submittedFormRPartAs[0], null);

    expect(wrapper.find("button")).toHaveLength(3);
  });

  it("should push 'formr-a/create' along with formData page to history when edit button clicked", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartAs[0], history);

    const editButton = wrapper.find("button").first();
    act(() => {
      editButton.simulate("click");
    });

    expect(history[0].pathname).toEqual("/formr-a/create");
    expect(history[0].formData).toEqual(submittedFormRPartAs[0]);
  });

  it("should invoke saveTraineeFormRPartA with form data when submit button clicked", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartAs[0], history);

    const submitButton = wrapper.find("button").last();

    act(() => {
      submitButton.simulate("click");
    });
  });
});
