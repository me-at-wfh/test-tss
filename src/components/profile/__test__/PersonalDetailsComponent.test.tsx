import React from "react";
import { shallow } from "enzyme";
import PersonalDetailsComponent from "../personal-details/PersonalDetailsComponent";

it("renders without crashing", () => {
  shallow(<PersonalDetailsComponent personalDetails={null} />);
});
