import React from "react";
import { PersonalDetails } from "../../../models/PersonalDetails";
import { SummaryList, Details } from "nhsuk-react-components";
import { KeyValue } from "../../../models/KeyValue";
import { DateUtilities } from "../../../utilities/DateUtilities";

interface IProps {
  personalDetails: PersonalDetails | null;
}

const PersonalDetailsComponent: React.FC<IProps> = ({ personalDetails }) => {
  if (!personalDetails) {
    return <div>Failed to load data.</div>;
  }

  const personalData: KeyValue[] = [
    { label: "Maiden name", value: personalDetails.maidenName },
    { label: "Known As", value: personalDetails.knownAs },
    { label: "Gender", value: personalDetails.gender },
    {
      label: "Date of birth",
      value: DateUtilities.ToLocalDate(personalDetails.dateOfBirth)
    },
    { label: "Email", value: personalDetails.email },
    { label: "Telephone", value: personalDetails.telephoneNumber },
    { label: "Mobile", value: personalDetails.mobileNumber }
  ];

  const registrationDetails: KeyValue[] = [
    {
      label: "General Medical Council (GMC)",
      value: personalDetails.gmcNumber
    },
    { label: "General Dental Council (GDC)", value: personalDetails.gdcNumber },
    {
      label: "Public Health Number",
      value: personalDetails.publicHealthNumber
    },
    {
      label: "GMC status",
      value: personalDetails.gmcStatus
    },
    {
      label: "GDC status",
      value: personalDetails.gdcStatus
    },
    { label: "Permit to Work", value: personalDetails.permitToWork },
    { label: "Settled", value: personalDetails.settled },
    { label: "Visa Issued", value: personalDetails.visaIssued },
    { label: "Details/Number", value: personalDetails.detailsNumber }
  ];

  return (
    <Details expander>
      <Details.Summary>Personal details</Details.Summary>
      <Details.Text>
        <SummaryList>
          <SummaryList.Row>
            <SummaryList.Key>Fullname</SummaryList.Key>
            <SummaryList.Value>
              {personalDetails.title && `${personalDetails.title} `}
              {personalDetails.forenames && `${personalDetails.forenames} `}
              {personalDetails.surname}
            </SummaryList.Value>
          </SummaryList.Row>
          {personalData.map(pd => (
            <SummaryList.Row key={pd.label}>
              <SummaryList.Key>{pd.label}</SummaryList.Key>
              <SummaryList.Value>{pd.value}</SummaryList.Value>
            </SummaryList.Row>
          ))}

          <SummaryList.Row>
            <SummaryList.Key>Address</SummaryList.Key>
            <SummaryList.Value>
              <p>{personalDetails.address1}</p>
              <p>{personalDetails.address2}</p>
              <p>{personalDetails.address3}</p>
              <p>{personalDetails.postCode}</p>
            </SummaryList.Value>
          </SummaryList.Row>
          <div className="nhsuk-heading-m nhsuk-u-margin-top-4">
            Registration details
          </div>
          {registrationDetails.map(
            rd =>
              rd.value && (
                <SummaryList.Row key={rd.label}>
                  <SummaryList.Key>{rd.label}</SummaryList.Key>
                  <SummaryList.Value>{rd.value}</SummaryList.Value>
                </SummaryList.Row>
              )
          )}
        </SummaryList>
      </Details.Text>
    </Details>
  );
};

export default PersonalDetailsComponent;
