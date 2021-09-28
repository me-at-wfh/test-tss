import React from "react";
import { shallow } from "enzyme";
import { Support } from "../Support";
import { mockTraineeProfile } from "../../../mock-data/trainee-profile";
import { SupportMsg } from "../SupportMsg";

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

  it("should call fetchTraineeProfileProps ", async () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, "fetchTraineeProfileProps").mockResolvedValue(null);
    await instance.componentDidMount();
    expect(instance.fetchTraineeProfileProps).toHaveBeenCalledTimes(1);
  });

  it("should render the dataError message when no personOwner found", async () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, "fetchTraineeProfileProps").mockResolvedValue(null);
    jest.spyOn(instance, "fetchPersonOwner").mockReturnValue(null);
    await instance.componentDidMount();
    expect(
      wrapper.containsMatchingElement(
        <SupportMsg dataError={true} matchError={false} personOwner={""} />
      )
    ).toEqual(true);
  });

  it("should render the matchError message if no mapped contact found", async () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, "fetchTraineeProfileProps").mockResolvedValue(null);
    jest.spyOn(instance, "fetchPersonOwner").mockReturnValue("made up LO");
    jest.spyOn(instance, "findMappedContact");
    await instance.componentDidMount();
    expect(
      wrapper.containsMatchingElement(
        <SupportMsg
          dataError={false}
          matchError={true}
          personOwner={"made up LO"}
        />
      )
    ).toEqual(true);
  });

  it("should render the success message when person owner found and matched with office", async () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, "fetchTraineeProfileProps").mockResolvedValue(null);
    jest
      .spyOn(instance, "fetchPersonOwner")
      .mockReturnValue("Health Education England North West");
    await instance.componentDidMount();
    expect(
      wrapper.containsMatchingElement(
        <SupportMsg
          dataError={false}
          matchError={false}
          personOwner={"Health Education England North West"}
        />
      )
    ).toEqual(true);
  });
});
