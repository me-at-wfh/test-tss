import React from "react";
import { shallow, mount } from "enzyme";
import Support, { UnconnectedSupport } from "../Support";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { mockTraineeProfile } from "../../../mock-data/trainee-profile";
import { TraineeProfile } from "../../../models/TraineeProfile";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// NOTE: can only be called on a wrapper instance that is also the root instance.
// With React 16 and above, instance() returns null for stateless functional components.

describe("Support", () => {
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
        <Support />
      </Provider>
    );
  });

  it("renders Loading when isLoading is false", () => {
    const wrapper = mount(
      <Provider store={createStore(null)}>
        <Support />
      </Provider>
    );

    expect(wrapper.find("h1")).toHaveLength(0);
  });

  it("renders profile when data available", () => {
    const wrapper = mount(
      <Provider store={createStore(mockTraineeProfile)}>
        <Support />
      </Provider>
    );

    expect(wrapper.find("h1")).toHaveLength(1);
  });

  it("`getCurrentProgramme` should return a `CURRENT` programme.", () => {
    const wrapper = shallow(
      <UnconnectedSupport
        traineeProfile={mockTraineeProfile}
        isLoaded={true}
        loadTraineeProfile={null}
      />
    );
    const currentProgramme = (wrapper.instance() as UnconnectedSupport).getCurrentProgramme(
      mockTraineeProfile
    );
    expect(currentProgramme.status).toBe("CURRENT");
  });

  it("`getLocalOfficeEmail` should return a valid email when associated with a valid local office.", () => {
    const wrapper = shallow(
      <UnconnectedSupport
        traineeProfile={mockTraineeProfile}
        isLoaded={true}
        loadTraineeProfile={null}
      />
    );
    const localOfficeEmail = (wrapper.instance() as UnconnectedSupport).getLocalOfficeEmail(
      "Health Education England West Midlands"
    );
    expect(localOfficeEmail).not.toBeNull();
  });

  it("`getLocalOfficeEmail` should return null when associated with a local London office.", () => {
    const wrapper = shallow(
      <UnconnectedSupport
        traineeProfile={mockTraineeProfile}
        isLoaded={true}
        loadTraineeProfile={null}
      />
    );
    const localOfficeEmail = (wrapper.instance() as UnconnectedSupport).getLocalOfficeEmail(
      "Health Education England North West London"
    );
    expect(localOfficeEmail).toBeNull();
  });

  it("Should display the form when showForm is true.", () => {
    const wrapper = shallow(
      <UnconnectedSupport
        traineeProfile={mockTraineeProfile}
        isLoaded={true}
        loadTraineeProfile={null}
      />
    );
    wrapper.setState({ showForm: true });
    expect(wrapper.find("[data-jest='FormPanel']")).toHaveLength(1);
    expect(wrapper.find("[data-jest='GetHelpPanel']")).toHaveLength(0);
  });

  it("Should display the get help panel when showForm is false.", () => {
    const wrapper = shallow(
      <UnconnectedSupport
        traineeProfile={mockTraineeProfile}
        isLoaded={true}
        loadTraineeProfile={null}
      />
    );
    wrapper.setState({ showForm: false });
    expect(wrapper.find("[data-jest='FormPanel']")).toHaveLength(0);
    expect(wrapper.find("[data-jest='GetHelpPanel']")).toHaveLength(1);
  });
});
