import React from "react";
import PrivacyPolicy from "../PrivacyPolicy";
import { shallow, mount } from "enzyme";

describe("Privacy Policy", () => {
  it("renders without crashing", () => {
    shallow(<PrivacyPolicy />);
  });
  it("displays as modal when property set to true", () => {
    const wrapper = mount(<PrivacyPolicy modal={true} />);
    expect(wrapper.find("[data-jest='modal']").length).toBe(1);
  });

  it("displays non modal when property set to false", () => {
    const wrapper = mount(<PrivacyPolicy modal={false} />);
    expect(wrapper.find("[data-jest='modal']").length).toBe(0);
  });
});
