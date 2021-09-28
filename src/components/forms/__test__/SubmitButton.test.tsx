import React from "react";
import SubmitButton from "../SubmitButton";
import { shallow, mount } from "enzyme";

describe("DebounceButton", () => {
  it("renders without crashing", () => {
    shallow(<SubmitButton />);
  });
  it("renders with props", () => {
    const wrapper = mount(<SubmitButton data-jest="btnDebounce" />);
    expect(wrapper.find("button[data-jest='btnDebounce']").length).toBe(1);
  });

  it("calls click handler function when clicked", () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <SubmitButton data-jest="btnDebounce" clickHandler={mockFn} />
    );
    wrapper.simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });

  it("it disables button after being clicked", () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <SubmitButton data-jest="btnDebounce" clickHandler={mockFn} />
    );
    wrapper.simulate("click");
    expect(mockFn).toHaveBeenCalled();
    mockFn.mockClear();
    wrapper.simulate("click");
    expect(mockFn).toHaveBeenCalledTimes(0);
  });
});
