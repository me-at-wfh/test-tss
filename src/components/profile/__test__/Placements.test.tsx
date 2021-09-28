import React from "react";
import { shallow } from "enzyme";
import Placements from "../placements/Placements";
import { mockPlacements } from "../../../mock-data/trainee-profile";

it("renders without crashing", () => {
  shallow(<Placements placements={mockPlacements} />);
});
