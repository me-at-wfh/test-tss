import React from "react";
import { connect, useField } from "formik";
import { Checkboxes, Radios, Label } from "nhsuk-react-components";
import InputFooterLabel from "./InputFooterLabel";

interface Props {
  name: string;
  type: "radios" | "checkbox";
  items: any[];
  label?: string;
  id?: string;
  hint?: any;
  footer?: any;
  onChange?: any;
  conditional?: any;
}

const MultiChoiceInputField: React.FC<Props> = props => {
  const [field, { error }, helpers] = useField(props);
  const FormElement = props.type === "radios" ? Radios : Checkboxes;
  const FormChildElement =
    props.type === "radios" ? Radios.Radio : Checkboxes.Box;
  return (
    <div
      data-jest={props.name}
      data-cy={props.name}
      className={
        error ? "nhsuk-form-group nhsuk-form-group--error" : "nhsuk-form-group"
      }
    >
      <Label>{props.label}</Label>

      <FormElement
        name={props.name}
        data-cy={props.name}
        id={props.id || props.name}
        error={error || ""}
        onChange={props.onChange ? props.onChange : field.onChange}
        hint={props.hint}
      >
        {props.items
          ? props.items.map((item, index) => (
              <FormChildElement
                key={item.value}
                value={item.value}
                id={item.id || "item_" + index}
                data-cy={`${props.name}${index}`}
                checked={
                  typeof field.value === "boolean"
                    ? field.value === item.value ||
                      item.value === field.value.toString()
                    : (field.value &&
                        field.value.toString() === item.value.toString()) ||
                      false
                }
                onChange={() => {
                  helpers.setValue(item.value);
                }}
                conditional={props.conditional}
              >
                {item.label}
              </FormChildElement>
            ))
          : null}
      </FormElement>
      <InputFooterLabel label={props.footer || ""} />
    </div>
  );
};

export default connect(MultiChoiceInputField);
