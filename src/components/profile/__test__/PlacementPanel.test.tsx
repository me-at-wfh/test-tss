import React from "react";
import { shallow } from "enzyme";
import PlacementPanel from "../placements/PlacementPanel";
import { mockPlacements } from "../../../mock-data/trainee-profile";

it("renders without crashing", () => {
  shallow(<PlacementPanel placement={mockPlacements[0]} />);
});
