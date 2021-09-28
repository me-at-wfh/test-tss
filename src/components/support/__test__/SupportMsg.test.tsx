import React from "react";
import { shallow } from "enzyme";
import { SupportMsg } from "../SupportMsg";

describe("SupportMsg", () => {
  let wrapper: any;
  it("should render without crashing", () => {
    const props = {
      dataError: false,
      matchError: false,
      personOwner: ""
    };
    shallow(<SupportMsg {...props} />);
  });

  it("should show the data error message if no person owner (LO) found ", () => {
    const props = {
      dataError: true,
      matchError: false,
      personOwner: ""
    };
    wrapper = shallow(<SupportMsg {...props} />);
    expect(wrapper.exists("[data-jest='dataErrorMsg']")).toBe(true);
  });

  it("should show the match error message if no person owner (LO) found ", () => {
    const props = {
      dataError: false,
      matchError: true,
      personOwner: "made up office"
    };
    wrapper = shallow(<SupportMsg {...props} />);
    expect(wrapper.exists("[data-jest='matchErrorMsg']")).toBe(true);
  });
});
