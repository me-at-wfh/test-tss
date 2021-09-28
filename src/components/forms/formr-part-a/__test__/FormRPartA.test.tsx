import React from "react";
import { shallow } from "enzyme";
import FormRPartA from "../FormRPartA";

describe("FormRPartA", () => {
  it("renders without crashing", () => {
    shallow(<FormRPartA />);
  });
});
