import React from "react";
import App from "./App";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import Login from "./components/authentication/Login";
import { BrowserRouter } from "react-router-dom";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const globalAny: any = global;

let wrapper: any;

beforeEach(() => {
  const store = mockStore({});

  globalAny.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          version: "0.1.1"
        })
    })
  );

  wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MemoryRouter>
    </Provider>
  );
});

describe("App", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });

  it("should call componentDidMount", () => {
    const spy = jest.spyOn(App.prototype, "componentDidMount");
    shallow(<App />);
    expect(spy).toHaveBeenCalled();
  });

  it("should call checkAppVersion on componentDidMount", async () => {
    wrapper = shallow(<App />);
    const instance = wrapper.instance();
    jest.spyOn(instance, "checkAppVersion");
    await instance.componentDidMount();
    expect(instance.checkAppVersion).toHaveBeenCalledTimes(2);
  });

  it("should load login page by default", () => {
    expect(wrapper.find(Login)).toHaveLength(1);
  });

  it("should set isAuthenticated to true, when signedIn state received", async () => {
    wrapper.find(App).find(Login).props().setAuthenticationStatus("signedIn");

    expect(wrapper.find(App).state("isAuthenticated")).toBe(true);
  });

  it("should set isAuthenticated to false, when state received is not signedIn ", async () => {
    wrapper.find(App).find(Login).props().setAuthenticationStatus("signedOut");

    expect(wrapper.find(App).state("isAuthenticated")).toBe(false);
  });
});
