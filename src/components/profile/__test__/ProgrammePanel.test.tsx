import React from "react";
import { shallow } from "enzyme";
import ProgrammePanel from "../programmes/ProgrammePanel";
import { mockProgrammeMemberships } from "../../../mock-data/trainee-profile";

it("renders without crashing", () => {
  shallow(<ProgrammePanel programmeMembership={mockProgrammeMemberships[0]} />);
});
