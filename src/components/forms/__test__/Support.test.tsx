import React from "react";
import { shallow } from "enzyme";
import { Support } from "../Support";
import { mockTraineeProfile } from "../../../mock-data/trainee-profile";

describe("Support", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(
      <Support
        traineeProfile={mockTraineeProfile}
        isLoaded={true}
        loadTraineeProfile={null}
      />
    );
  });

  it("renders Loading when isLoading is true", () => {
    wrapper = shallow(
      <Support
        traineeProfile={null}
        isLoaded={false}
        loadTraineeProfile={null}
      />
    );

    expect(wrapper.find("Loading")).toBeTruthy();
  });

  it("should mount and call fetchTraineeProfileProps ", async () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, "fetchTraineeProfileProps").mockResolvedValue(null);
    await instance.componentDidMount();
    expect(instance.fetchTraineeProfileProps).toHaveBeenCalledTimes(1);
  });

  it("should render the PGMDE panel for London-based trainee", async () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, "fetchTraineeProfileProps").mockResolvedValue(null);
    jest
      .spyOn(instance, "fetchPersonOwner")
      .mockReturnValue("Health Education England North West London");
    await instance.componentDidMount();
    expect(wrapper.find("[data-jest='PGMDESupportPanel']")).toHaveLength(1);
    expect(wrapper.find("[data-jest='loSupportPanel']")).toHaveLength(0);
  });

  it("should render the Local Office panel for trainee outside London", async () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, "fetchTraineeProfileProps").mockResolvedValue(null);
    jest
      .spyOn(instance, "fetchPersonOwner")
      .mockReturnValue("Health Education England North West");
    await instance.componentDidMount();
    expect(wrapper.find("[data-jest='loSupportPanel']")).toHaveLength(1);
    expect(wrapper.find("[data-jest='PGMDESupportPanel']")).toHaveLength(0);
  });

  it("should render the dataError panel when no personOwner found", async () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, "fetchTraineeProfileProps").mockResolvedValue(null);
    jest.spyOn(instance, "fetchPersonOwner").mockReturnValue(null);
    await instance.componentDidMount();
    expect(wrapper.find("[data-jest='dataErrorPanel']")).toHaveLength(1);
  });

  it("should render the matchError panel if no mapped contact found", async () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, "fetchTraineeProfileProps").mockResolvedValue(null);
    jest.spyOn(instance, "fetchPersonOwner").mockReturnValue("made up LO");
    jest.spyOn(instance, "findMappedContact");
    await instance.componentDidMount();
    expect(wrapper.find("[data-jest='matchErrorPanel']")).toHaveLength(1);
  });
});
