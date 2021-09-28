import React from "react";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import Confirm from "../Confirm";
import { Provider } from "react-redux";
import { FormRPartB } from "../../../../models/FormRPartB";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";
import { act } from "react-test-renderer";
import { BrowserRouter, Redirect } from "react-router-dom";

const showCovidDeclarationFeature: boolean = false;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let btnLength = showCovidDeclarationFeature ? 10 : 9;
describe("Confirm", () => {
  const mountComponent = (form: FormRPartB | null, history: any) => {
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
          <Confirm history={history} />
        </BrowserRouter>
      </Provider>
    );
  };

  it("renders without crashing", () => {
    mountComponent(submittedFormRPartBs[0], null);
  });

  it("should redirect to create page when no data available", () => {
    const wrapper = mountComponent(null, null);

    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  it("renders the edit and confirm buttons when form data is available", () => {
    const wrapper = mountComponent(submittedFormRPartBs[0], null);

    expect(wrapper.find("button")).toHaveLength(btnLength);
  });

  it("should push 'formr-b/create' along with formData page to history when edit button clicked", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartBs[0], history);

    const editButton = wrapper.find("button").first();
    act(() => {
      editButton.simulate("click");
    });
  });

  it("should invoke saveTraineeFormRPartB with form data when submit button clicked", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartBs[0], history);

    const submitButton = wrapper.find("button").last();

    act(() => {
      submitButton.simulate("click");
    });
  });
});
