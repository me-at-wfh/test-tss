import React from "react";
import { Curriculum } from "../../../models/ProgrammeMembership";
import { DateUtilities } from "../../../utilities/DateUtilities";
import styles from "./CurriculumPanel.module.scss";

interface ICurriculumPanelProps {
  curriculum: Curriculum;
}

export const CurriculumPanel = (props: ICurriculumPanelProps) => {
  const curricData = props.curriculum;

  return (
    <div className={styles.cItems}>
      <div>{curricData.curriculumName}</div>
      <div>
        {DateUtilities.ToLocalDate(curricData.curriculumStartDate)} -{" "}
        {DateUtilities.ToLocalDate(curricData.curriculumEndDate)}
      </div>
    </div>
  );
};
