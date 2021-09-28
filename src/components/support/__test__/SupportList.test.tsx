import { mount, shallow } from "enzyme";
import React from "react";
import { SupportList } from "../SupportList";

describe("SupportList", () => {
  let wrapper: any;
  it("should render without crashing", () => {
    const props = {
      contact: ""
    };
    shallow(<SupportList {...props} />);
  });

  it("should give the PGMDE link if contact provided is 'PGMDE support portal'", () => {
    const props = {
      contact: "PGMDE support portal"
    };
    wrapper = mount(<SupportList {...props} />);
    expect(wrapper.exists("[data-jest='pgdmeLink']")).toBe(true);
  });

  it("should give the LO link for all non-London/ SE contacts", () => {
    const props = {
      contact: "TIS.yh@hee.nhs.uk"
    };
    wrapper = mount(<SupportList {...props} />);
    expect(wrapper.exists("[data-jest='loLink']")).toBe(true);
  });

  it("should give no link for a blank contact", () => {
    const props = {
      contact: ""
    };
    wrapper = mount(<SupportList {...props} />);
    expect(wrapper.exists("[data-jest='loLink']")).toBe(false);
    expect(wrapper.exists("[data-jest='pgdmeLink']")).toBe(false);
  });

  it("should update the link when choosing a contact from the list", () => {
    const props = {
      contact: "PGMDE support portal"
    };
    const wrapper = mount(<SupportList {...props} />);
    expect(wrapper.exists("[data-jest='loLink']")).toBe(false);
    expect(wrapper.exists("select")).toBe(true);

    const dropdpownListItem = wrapper.find("select");

    dropdpownListItem.simulate("change", {
      target: { value: "TIS.EM@hee.nhs.uk" }
    });

    expect(wrapper.exists("[data-jest='loLink']")).toBe(true);
  });
});
