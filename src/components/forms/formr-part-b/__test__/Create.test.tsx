import React from "react";
import { shallow, mount } from "enzyme";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import Create from "../Create";
import { Provider } from "react-redux";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";
import { FormRPartB } from "../../../../models/FormRPartB";
import Loading from "../../../common/Loading";
import { BrowserRouter } from "react-router-dom";

const covidEnabled: boolean = true;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history: any[] = [];
const location: any[] = [];

const createStore = (form: FormRPartB | null, section: number = 1) =>
  mockStore({
    formRPartB: { formData: form, section: section },
    referenceData: {
      localOffices: [{ label: "localOffice", value: "localOffice" }],
      curricula: [{ label: "curriculum", value: "curriculum" }],
      isLoaded: true
    },
    formSwitches: {
      formSwitches: [
        {
          name: "COVID",
          enabled: covidEnabled
        }
      ]
    }
  });

let store = createStore(submittedFormRPartBs[0]);

describe("Create", () => {
  it("renders without crashing", () => {
    shallow(
      <Provider store={store}>
        <BrowserRouter>
          <Create history={history} location={location} />
        </BrowserRouter>
      </Provider>
    );
  });

  let sections = [
    "Section 1",
    "Section 2",
    "Section 3",
    "Section 4",
    "Section 5",
    "Section 6",
    "Section 7"
  ];
  if (covidEnabled) {
    sections.splice(6, 0, "COVID");
  }

  sections.forEach((section, index) => {
    it(`renders section ${section} when section value is ${index}`, () => {
      const store = createStore(submittedFormRPartBs[0], index);

      const wrapper = mount(
        <Provider store={store}>
          <BrowserRouter>
            <Create history={history} location={location} />
          </BrowserRouter>
        </Provider>
      );

      expect(wrapper.find("legend.nhsuk-fieldset__legend").text()).toContain(
        section
      );
    });
  });

  it("should render Loading when section value is not valid", () => {
    const stores = createStore(submittedFormRPartBs[0], 999);

    const wrapper = mount(
      <Provider store={stores}>
        <BrowserRouter>
          <Create history={history} location={location} />
        </BrowserRouter>
      </Provider>
    );

    expect(wrapper.find(Loading)).toHaveLength(1);
  });

  it("should render Loading when reference data is not loaded", () => {
    store = mockStore({
      formRPartB: { formData: submittedFormRPartBs[0], section: 1 },
      referenceData: {
        localOffices: [],
        curricula: [],
        isLoaded: false
      },
      formSwitches: {
        formSwitches: [
          {
            name: "COVID",
            enabled: covidEnabled
          }
        ]
      }
    });

    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Create history={history} location={location} />
        </BrowserRouter>
      </Provider>
    );

    expect(wrapper.find(Loading)).toHaveLength(1);
  });
});
