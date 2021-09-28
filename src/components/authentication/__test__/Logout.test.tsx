import React from "react";
import Logout from "../Logout";
import { shallow, mount } from "enzyme";
import { Authenticator } from "aws-amplify-react";

describe("Logout", () => {
  it("renders without crashing", () => {
    shallow(<Logout onClick={() => {}} />);
  });

  it("mounts without crashing", () => {
    mount(
      <Authenticator>
        <Logout onClick={() => {}} />
      </Authenticator>
    );
  });

  it("should allow user to click to logout", () => {
    const mockOnClick = jest.fn();
    const wrapper = mount(
      <Authenticator>
        <Logout onClick={mockOnClick} />
      </Authenticator>
    );

    wrapper.find("a[data-jest='btn-logout']").first().simulate("click");
  });
});
