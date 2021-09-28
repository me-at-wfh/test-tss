import React from "react";
import Logout from "../Logout";
import { shallow, mount } from "enzyme";
import { Authenticator } from "aws-amplify-react";

describe("Logout", () => {
  it("renders without crashing", () => {
    shallow(<Logout />);
  });

  it("mounts without crashing", () => {
    mount(
      <Authenticator>
        <Logout />
      </Authenticator>
    );
  });

  it("should allow user to click to logout", () => {
    const wrapper = mount(
      <Authenticator>
        <Logout />
      </Authenticator>
    );

    wrapper.find("button").first().simulate("click");
  });
});
