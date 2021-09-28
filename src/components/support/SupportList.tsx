import React, { useEffect, useState } from "react";
import { ActionLink, Select } from "nhsuk-react-components";
import { localOfficeContacts } from "../../models/LocalOfficeContacts";

interface Props {
  contact: string;
}

export const SupportList = (props: Props) => {
  const { contact } = props;
  const [linkContact, updateLinkContact] = useState("");

  useEffect(() => {
    if (contact) {
      updateLinkContact(contact);
    }
  }, [contact]);

  const handleChange = (event: any) => updateLinkContact(event.target.value);

  return (
    <>
      <div>
        {(() => {
          switch (linkContact) {
            case "":
              return null;
            case "PGMDE support portal":
              return (
                <ActionLink
                  data-jest="pgdmeLink"
                  href="https://lasepgmdesupport.hee.nhs.uk/support/tickets/new?form_7=true"
                >
                  PGMDE Support Portal
                </ActionLink>
              );
            default:
              return (
                <ActionLink
                  data-jest="loLink"
                  href={`mailto:${linkContact}?subject=Form R support query`}
                >
                  {linkContact}
                </ActionLink>
              );
          }
        })()}
      </div>

      <Select data-jest="contactList" onChange={handleChange}>
        <Select.Option value={contact}>
          -- Choose an alternative contact --
        </Select.Option>
        {localOfficeContacts.map((contact, index) => (
          <Select.Option key={index} value={contact.contact}>
            {contact.abbrevName}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};
