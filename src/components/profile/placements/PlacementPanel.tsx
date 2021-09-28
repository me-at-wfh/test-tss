import React from "react";
import { Placement } from "../../../models/Placement";
import { SummaryList } from "nhsuk-react-components";
import { DateUtilities } from "../../../utilities/DateUtilities";
import { StringUtilities } from "../../../utilities/StringUtilities";

interface IPlacementPanelProps {
  placement: Placement;
}

export const PlacementPanel = (props: IPlacementPanelProps) => {
  const data = props.placement;

  return (
    <SummaryList>
      <SummaryList.Row>
        <SummaryList.Key>Site</SummaryList.Key>
        <SummaryList.Value>{data.site}</SummaryList.Value>
      </SummaryList.Row>
      <SummaryList.Row>
        <SummaryList.Key>Site Location</SummaryList.Key>
        <SummaryList.Value>{data.siteLocation}</SummaryList.Value>
      </SummaryList.Row>

      <SummaryList.Row>
        <SummaryList.Key>
          <span className="noWrap">Starts</span>
        </SummaryList.Key>
        <SummaryList.Value>
          {DateUtilities.ToLocalDate(data.startDate)}
        </SummaryList.Value>
      </SummaryList.Row>
      <SummaryList.Row>
        <SummaryList.Key>Ends</SummaryList.Key>
        <SummaryList.Value>
          {DateUtilities.ToLocalDate(data.endDate)}
        </SummaryList.Value>
      </SummaryList.Row>
      <SummaryList.Row>
        <SummaryList.Key>Whole Time Equivalent</SummaryList.Key>
        <SummaryList.Value>
          {StringUtilities.TrimZeros(data.wholeTimeEquivalent)}
        </SummaryList.Value>
      </SummaryList.Row>

      <SummaryList.Row>
        <SummaryList.Key>
          <span className="noWrap">Specialty</span>
        </SummaryList.Key>
        <SummaryList.Value>{data.specialty}</SummaryList.Value>
      </SummaryList.Row>

      <SummaryList.Row>
        <SummaryList.Key>
          <span className="noWrap">Grade</span>
        </SummaryList.Key>
        <SummaryList.Value>{data.grade}</SummaryList.Value>
      </SummaryList.Row>

      <SummaryList.Row>
        <SummaryList.Key>
          <span className="noWrap">Placement Type</span>
        </SummaryList.Key>
        <SummaryList.Value>{data.placementType}</SummaryList.Value>
      </SummaryList.Row>

      <SummaryList.Row>
        <SummaryList.Key>Employing Body</SummaryList.Key>
        <SummaryList.Value>{data.employingBody}</SummaryList.Value>
      </SummaryList.Row>
      <SummaryList.Row>
        <SummaryList.Key>Training Body</SummaryList.Key>
        <SummaryList.Value>{data.trainingBody}</SummaryList.Value>
      </SummaryList.Row>
    </SummaryList>
  );
};

export default PlacementPanel;
