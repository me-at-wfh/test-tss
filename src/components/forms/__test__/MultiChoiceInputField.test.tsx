import React from "react";
import MultiChoiceInputField from "../MultiChoiceInputField";
import { shallow, mount } from "enzyme";
import { Formik, Form } from "formik";
import { KeyValue } from "../../../models/KeyValue";

const items: KeyValue[] = [
  { label: "Label1", value: "Value1" },
  { label: "Label2", value: "Value2" }
];

const getComponent = (
  options: KeyValue[],
  type: "checkbox" | "radios" = "checkbox",
  footer = null,
  hint = null
) => (
  <Formik initialValues={null} onSubmit={() => {}}>
    {() => (
      <Form>
        <MultiChoiceInputField
          type={type}
          name="multiChoiceInputField"
          label="Select input field"
          items={options}
          footer={footer}
          hint={hint}
        />
      </Form>
    )}
  </Formik>
);

describe("MultiChoiceInputField as checkboxes", () => {
  it("renders without crashing", () => {
    shallow(
      <MultiChoiceInputField
        type="checkbox"
        name="multiChoiceInputField"
        label="Select items"
        items={items}
      />
    );
  });

  it("should display checkboxes when items passed", () => {
    const wrapper = mount(getComponent(items, "checkbox"));
    expect(wrapper.find("input[type='checkbox']").length).toBe(items.length);
  });

  it("should display checkbox value", () => {
    const component = mount(getComponent(items, "checkbox"));
    const wrapper = component.find("input[type='checkbox']").first();
    expect(wrapper.props().value).toBe(items[0].value);
  });

  it("should display checkbox label", () => {
    const component = mount(getComponent(items, "checkbox"));
    const wrapper = component
      .find("input[type='checkbox']")
      .first()
      .parents()
      .first()
      .children();
    expect(wrapper.find("label")).toHaveLength(1);
    expect(wrapper.find("label").text()).toBe(items[0].label);
  });

  it("should render hint when hint property passed", () => {
    const wrapper = mount(getComponent(items, "checkbox", null, "Hint label"));
    expect(wrapper.find("span").last().text()).toBe("Hint label");
  });

  it("should render footer when footer property passed", () => {
    const wrapper = mount(getComponent(items, "checkbox", "Footer label"));

    expect(wrapper.find("div").last().text()).toBe("Footer label");
  });
});

describe("MultiChoiceInputField as radios", () => {
  it("renders without crashing", () => {
    shallow(
      <MultiChoiceInputField
        type="radios"
        name="multiChoiceInputField"
        label="Select items"
        items={items}
      />
    );
  });

  it("should render footer when footer property passed", () => {
    const wrapper = mount(getComponent(items, "radio", "Footer label"));

    expect(wrapper.find("div").last().text()).toBe("Footer label");
  });
});

describe("MultiChoiceInputField as radios", () => {
  it("renders without crashing", () => {
    shallow(
      <MultiChoiceInputField
        type="radios"
        name="multiChoiceInputField"
        label="Select items"
        items={items}
      />
    );
  });

  it("should display radios when items passed", () => {
    const wrapper = mount(getComponent(items, "radios"));
    expect(wrapper.find("input[type='radio']").length).toBe(items.length);
  });

  it("should display radio value", () => {
    const component = mount(getComponent(items, "radios"));
    const wrapper = component.find("input[type='radio']").first();
    expect(wrapper.props().value).toBe(items[0].value);
  });

  it("should display radio label", () => {
    const component = mount(getComponent(items, "radios"));
    const wrapper = component
      .find("input[type='radio']")
      .first()
      .parents()
      .first()
      .children();
    expect(wrapper.find("label")).toHaveLength(1);
    expect(wrapper.find("label").text()).toBe(items[0].label);
  });

  it("should render hint when hint property passed", () => {
    const wrapper = mount(getComponent(items, "radios", null, "Hint label"));
    expect(wrapper.find("span").last().text()).toBe("Hint label");
  });

  it("should render footer when footer property passed", () => {
    const wrapper = mount(getComponent(items, "radios", "Footer label"));

    expect(wrapper.find("div").last().text()).toBe("Footer label");
  });
});
