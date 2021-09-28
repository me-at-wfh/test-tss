import React, { FormEvent } from "react";
import { Pagination, Button } from "nhsuk-react-components";
import { FormRPartB } from "../../../../models/FormRPartB";
import classes from "../FormRPartB.module.scss";

interface Props {
  values: FormRPartB;
  previousSection: (v: FormRPartB, prevSection?: number) => void;
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  saveDraft: (v: FormRPartB) => void;
  section: number;
  prevSectionLabel?: string;
  nextSectionLabel?: string;
}

const FormRPartBPagination: React.FC<Props> = (props: Props) => {
  const { values, nextSectionLabel, prevSectionLabel, section } = props;

  const paginationClasses = [
    classes.heePagination,
    section === 0 ? classes.twoCol : null
  ]
    .filter(c => c)
    .join(" ");
  return (
    <Pagination className={paginationClasses}>
      {prevSectionLabel ? (
        <Pagination.Link
          previous
          onClick={() => props.previousSection(values, section && section - 1)}
          data-cy="LinkToPreviousSection"
          data-jest={section ? "LinkToPreviousSection" + (section - 1) : ""}
        >
          {prevSectionLabel.split("\n").map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </Pagination.Link>
      ) : null}

      <Pagination.Link onClick={() => props.saveDraft(values)}>
        <Button type="button" data-cy="BtnSaveDraft">
          Save & Exit
        </Button>
      </Pagination.Link>

      <Pagination.Link
        next
        onClick={() => props.handleSubmit()}
        data-cy="LinkToNextSection"
        data-jest={section ? "LinkToNextSection" + (section + 1) : ""}
      >
        {nextSectionLabel
          ? nextSectionLabel
              .split("\n")
              .map((item, index) => <div key={index}>{item}</div>)
          : null}
      </Pagination.Link>
    </Pagination>
  );
};

export default FormRPartBPagination;
