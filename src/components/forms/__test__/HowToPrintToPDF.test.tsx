import React from "react";
import HowToPrintToPDF from "../HowToPrintToPDF";
import { shallow } from "enzyme";

describe("HowToPrintToPDF", () => {
  it("renders without crashing", () => {
    shallow(<HowToPrintToPDF />);
  });
});
