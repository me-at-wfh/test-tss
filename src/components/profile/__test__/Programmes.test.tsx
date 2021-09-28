import React from "react";
import { shallow } from "enzyme";
import Programmes from "../programmes/Programmes";
import { mockProgrammeMemberships } from "../../../mock-data/trainee-profile";

it("renders without crashing", () => {
  shallow(<Programmes programmeMemberships={mockProgrammeMemberships} />);
});
