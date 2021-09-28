import React from "react";
import { shallow } from "enzyme";
import FormRPartB from "../FormRPartB";

describe("FormRPartB", () => {
  it("renders without crashing", () => {
    shallow(<FormRPartB />);
  });
});
