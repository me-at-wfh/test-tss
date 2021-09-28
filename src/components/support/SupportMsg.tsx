import { ErrorMessage } from "nhsuk-react-components";
import React from "react";

interface Props {
  dataError: boolean;
  matchError: boolean;
  personOwner: string | null | undefined;
}

export const SupportMsg = (props: Props) => {
  const { dataError, matchError, personOwner } = props;
  if (dataError) {
    return (
      <div data-jest="dataErrorMsg">
        <ErrorMessage>
          Sorry but your contact could not be found. Please choose a contact
          from the list below (which will provide a new link)
        </ErrorMessage>
      </div>
    );
  } else if (matchError) {
    return (
      <div data-jest="matchErrorMsg">
        <ErrorMessage>
          {`Sorry but your contact ${personOwner} cannot be matched with a support contact. Please choose a contact from the list below (which will provide a new link)`}
        </ErrorMessage>
      </div>
    );
  } else {
    return (
      <div data-jest="successMsg">
        <p>{`According to our records, your contact is ${personOwner}.`}</p>
        <p>
          {
            "Please click on the link below or choose an alternative contact from the list."
          }
        </p>
      </div>
    );
  }
};
