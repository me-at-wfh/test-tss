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
    return <div>Failed to laod data.</div>;
  }

  const fullName = `${personalDetails.title}. ${personalDetails.forenames} ${personalDetails.surname}`;

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

  const sensitiveData: KeyValue[] = [
    { label: "GMC", value: personalDetails.gmcNumber },
    { label: "GDC", value: personalDetails.gdcNumber },
    { label: "PH", value: personalDetails.publicHealthNumber },
    { label: "GMC status", value: personalDetails.gmcStatus },
    { label: "GDC status", value: personalDetails.gdcStatus },
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
            <SummaryList.Value>{fullName}</SummaryList.Value>
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
              <p>
                {personalDetails.address3}, {personalDetails.address4}
              </p>
              <p>{personalDetails.postCode}</p>
            </SummaryList.Value>
          </SummaryList.Row>
          <div className="nhsuk-heading-m nhsuk-u-margin-top-4">
            Sensitive data
          </div>
          {sensitiveData.map(
            sd =>
              sd.value && (
                <SummaryList.Row key={sd.label}>
                  <SummaryList.Key>{sd.label}</SummaryList.Key>
                  <SummaryList.Value>{sd.value}</SummaryList.Value>
                </SummaryList.Row>
              )
          )}
        </SummaryList>
      </Details.Text>
    </Details>
  );
};

export default PersonalDetailsComponent;
