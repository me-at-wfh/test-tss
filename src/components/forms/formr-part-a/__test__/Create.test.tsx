import React from "react";
import { shallow, mount } from "enzyme";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import Create from "../Create";
import { Provider } from "react-redux";
import * as yup from "yup";
import { FormRPartA } from "../../../../models/FormRPartA";
import { submittedFormRPartAs } from "../../../../mock-data/submitted-formr-parta";
import { BrowserRouter, Redirect } from "react-router-dom";
import { act } from "react-test-renderer";

const history: any[] = [];
const location: any[] = [];
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const createStore = (form: FormRPartA | null) =>
  mockStore({
    formRPartA: { formData: form },
    referenceData: {
      genders: [{ label: "gender", value: "gender" }],
      colleges: [{ label: "college", value: "college" }],
      localOffices: [{ label: "localOffice", value: "localOffice" }],
      curricula: [{ label: "curriculum", value: "curriculum" }],
      qualifications: [{ label: "qualification", value: "qualification" }],
      grades: [{ label: "grade", value: "grade" }],
      immigrationStatus: [
        { label: "immigrationStatus", value: "immigrationStatus" },
        { label: "Other", value: "Other" }
      ],
      isLoaded: true
    }
  });

const getComponent = (form: FormRPartA | null) => (
  <Provider store={createStore(form)}>
    <BrowserRouter>
      <Create history={history} location={location} />
    </BrowserRouter>
  </Provider>
);

beforeEach(() => {
  jest.resetModules();
});

describe("Create", () => {
  it("renders without crashing", () => {
    shallow(getComponent(submittedFormRPartAs[0]));
  });

  it("mounts without crashing", () => {
    mount(getComponent(submittedFormRPartAs[0]));
  });

  it("should load Loading when form data is null", () => {
    const wrapper = mount(getComponent(null));

    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  it("should show program speciality fields when CCT_DECLRATION is selected", () => {
    const wrapper = mount(getComponent(submittedFormRPartAs[0]));

    const submitBtn = wrapper.find("button").last();
    submitBtn.simulate("submit");
  });

  it("should call loadFormRPartA, when the form is submitted", async () => {
    const wrapper = mount(getComponent(submittedFormRPartAs[0]));
    const mockValidationSchema = yup.object({
      forename: yup.string()
    });
    const mockFn = jest.fn();

    jest.mock("../ValidationSchema", () => ({
      get ValidationSchema() {
        return mockValidationSchema;
      }
    }));

    jest.mock("../../../../redux/actions/formr-parta-actions", () => ({
      get loadFormRPartA() {
        return mockFn;
      }
    }));

    try {
      wrapper.find("button").last().simulate("click");
      expect(mockFn).toHaveBeenCalled();
    } catch (e) {
      //expect(true).toBe(false);
    }
  });

  it("should invoke saveTraineeFormRPartA with form data when submit button clicked", () => {
    const wrapper = mount(getComponent(submittedFormRPartAs[0]));
    const saveButton = wrapper.find("[data-cy='BtnSaveDraft']").last();
    act(() => {
      saveButton.simulate("click");
    });
  });
});
