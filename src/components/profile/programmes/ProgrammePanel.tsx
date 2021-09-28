import React from "react";
import { ProgrammeMembership } from "../../../models/ProgrammeMembership";
import { SummaryList } from "nhsuk-react-components";
import { DateUtilities } from "../../../utilities/DateUtilities";

interface IProgrammePanelProps {
  programmeMembership: ProgrammeMembership;
}

export const ProgrammePanel = (props: IProgrammePanelProps) => {
  const data = props.programmeMembership;
  return (
    <SummaryList>
      <SummaryList.Row>
        <SummaryList.Key>Number</SummaryList.Key>
        <SummaryList.Value>{data.programmeNumber}</SummaryList.Value>
      </SummaryList.Row>

      <SummaryList.Row>
        <SummaryList.Key>Status</SummaryList.Key>
        <SummaryList.Value>
          {data.status.charAt(0) + data.status.slice(1).toLowerCase()}
        </SummaryList.Value>
      </SummaryList.Row>

      <SummaryList.Row>
        <SummaryList.Key>Name</SummaryList.Key>
        <SummaryList.Value>{data.programmeName}</SummaryList.Value>
      </SummaryList.Row>

      <SummaryList.Row>
        <SummaryList.Key>Start date</SummaryList.Key>
        <SummaryList.Value>
          {DateUtilities.ToLocalDate(data.startDate)}
          </SummaryList.Value>
      </SummaryList.Row>

      <SummaryList.Row>
        <SummaryList.Key>End date</SummaryList.Key>
        <SummaryList.Value>
          {DateUtilities.ToLocalDate(data.endDate)}
          </SummaryList.Value>
      </SummaryList.Row>

      <SummaryList.Row>
        <SummaryList.Key>Projected Completion date</SummaryList.Key>
        <SummaryList.Value>
          {DateUtilities.ToLocalDate(data.programmeCompletionDate)}
          </SummaryList.Value>
      </SummaryList.Row>

      <SummaryList.Row>
        <SummaryList.Key>Owner</SummaryList.Key>
        <SummaryList.Value>{data.managingDeanery}</SummaryList.Value>
      </SummaryList.Row>

      <SummaryList.Row>
        <SummaryList.Key>Curricula</SummaryList.Key>
        <SummaryList.Value>
          {" "}
          {data.curricula.length === 0
            ? "N/A"
            : data.curricula.map((c, index) => (
                <span key={index}>
                  {index > 0 && ", "}
                  {c.curriculumName}
                </span>
              ))}
        </SummaryList.Value>
      </SummaryList.Row>
    </SummaryList>
  );
};

export default ProgrammePanel;
