import React from "react";
import { shallow, mount } from "enzyme";
import Profile from "../Profile";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { mockTraineeProfile } from "../../../mock-data/trainee-profile";
import { TraineeProfile } from "../../../models/TraineeProfile";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Profile", () => {
  const createStore = (profile: TraineeProfile | null) =>
    mockStore({
      profile: {
        traineeProfile: profile,
        isLoaded: profile
      }
    });

  it("renders without crashing", () => {
    shallow(
      <Provider store={createStore(null)}>
        <Profile />
      </Provider>
    );
  });

  it("renders Loading when isLoading is flase", () => {
    const wrapper = mount(
      <Provider store={createStore(null)}>
        <Profile />
      </Provider>
    );

    expect(wrapper.find("h1")).toHaveLength(0);
  });

  it("renders profile when data available", () => {
    const wrapper = mount(
      <Provider store={createStore(mockTraineeProfile)}>
        <Profile />
      </Provider>
    );

    expect(wrapper.find("h1")).toHaveLength(1);
  });
});
