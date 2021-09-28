import React from "react";
import {
  Curriculum,
  ProgrammeMembership
} from "../../../models/ProgrammeMembership";
import { SummaryList } from "nhsuk-react-components";
import { DateUtilities } from "../../../utilities/DateUtilities";
import { CurriculumPanel } from "./CurriculumPanel";

interface IProgrammePanelProps {
  programmeMembership: ProgrammeMembership;
}

export const ProgrammePanel = (props: IProgrammePanelProps) => {
  const data = props.programmeMembership;
  return (
    <>
      <SummaryList>
        <SummaryList.Row>
          <SummaryList.Key>Programme Name</SummaryList.Key>
          <SummaryList.Value>{data.programmeName}</SummaryList.Value>
        </SummaryList.Row>

        <SummaryList.Row>
          <SummaryList.Key>Programme Number</SummaryList.Key>
          <SummaryList.Value>{data.programmeNumber}</SummaryList.Value>
        </SummaryList.Row>

        <SummaryList.Row>
          <SummaryList.Key>Programme Start date</SummaryList.Key>
          <SummaryList.Value>
            {DateUtilities.ToLocalDate(data.startDate)}
          </SummaryList.Value>
        </SummaryList.Row>

        <SummaryList.Row>
          <SummaryList.Key>Programme End date</SummaryList.Key>
          <SummaryList.Value>
            {DateUtilities.ToLocalDate(data.endDate)}
          </SummaryList.Value>
        </SummaryList.Row>

        <SummaryList.Row>
          <SummaryList.Key>Owner</SummaryList.Key>
          <SummaryList.Value>{data.managingDeanery}</SummaryList.Value>
        </SummaryList.Row>

        <SummaryList.Row>
          <SummaryList.Key>Curricula</SummaryList.Key>
          <SummaryList.Value>
            {data.curricula.length === 0 ? (
              <div>N/A</div>
            ) : (
              data.curricula.map(
                (
                  curriculum: Curriculum,
                  index: string | number | undefined
                ) => <CurriculumPanel key={index} curriculum={curriculum} />
              )
            )}
          </SummaryList.Value>
        </SummaryList.Row>
      </SummaryList>
    </>
  );
};

export default ProgrammePanel;
