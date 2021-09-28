import { FunctionComponent, useEffect, useState } from "react";
import SelectInputField from "../../SelectInputField";
import TextInputField from "../../TextInputField";
import MyAutocomplete from "../../Autocomplete";

import ScrollTo from "../../ScrollTo";
import FormRPartBPagination from "./FormRPartBPagination";
import { SectionProps } from "./SectionProps";
import {
  Fieldset,
  ErrorSummary,
  WarningCallout,
  Panel,
  ErrorMessage
} from "nhsuk-react-components";
import { Form, Formik } from "formik";
import { Section1ValidationSchema } from "../ValidationSchema";
import { KeyValue } from "../../../../models/KeyValue";

interface Section1Props {
  localOffices: KeyValue[];
  designatedBodies: KeyValue[];
  curricula: KeyValue[];
}
type CombinedSectionProps = SectionProps & Section1Props;

const Section1: FunctionComponent<CombinedSectionProps> = (
  props: CombinedSectionProps
) => {
  const {
    localOffices,
    designatedBodies,
    curricula,
    formData,
    nextSection,
    previousSection,
    saveDraft,
    prevSectionLabel,
    nextSectionLabel,
    section
  } = props;

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<KeyValue[]>([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await (await fetch("../dbc.json")).json();
      const options: KeyValue[] = response.map((dbc: { label: string }) => {
        return {
          label: dbc.label,
          value: dbc.label
        };
      });
      if (active) {
        setOptions(options);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Formik
      initialValues={formData}
      validationSchema={Section1ValidationSchema}
      onSubmit={values => {
        nextSection(values);
      }}
    >
      {({ values, errors, handleSubmit, setFieldValue }) => (
        <Form>
          <ScrollTo />
          <Fieldset disableErrorLine={true} name="doctorsDetails">
            <Fieldset.Legend
              headingLevel="H2"
              size="l"
              data-cy="legendFieldset1"
            >
              Section 1: Doctor's details
            </Fieldset.Legend>

            <WarningCallout label="Important" data-cy="mainWarning1">
              <p>
                This form has been pre-populated using the information available
                against your records within the Trainee Information System
                (TIS). Please check all details and amend where necessary.
                Amendments made to your details on this form will not update
                other systems that you may have access to. By submitting this
                document you are confirming that ALL DETAILS (pre-populated or
                entered/amended by you) are correct.
                <br />
                <br /> It remains your own responsibility to keep your
                Designated Body and the GMC informed as soon as possible of any
                changes to your contact details. Your HEE Local team remains
                your Designated Body throughout your time in training. You can
                update your Designated Body on your GMC Online account under "My
                Revalidation".
                <br />
                <br /> Failure to appropriately complete a Form R Part B when
                requested may result in an Outcome 5 at ARCP{" "}
                <b>(Please refer to latest edition of the Gold Guide)</b>.
              </p>
            </WarningCallout>

            <Panel label="Personal details">
              <TextInputField label="Forename" name="forename" />
              <TextInputField label="GMC-Registered Surname" name="surname" />
              <TextInputField label="GMC Number" name="gmcNumber" />
              <TextInputField
                label="Primary contact email address"
                name="email"
                hint="For reasons of security and due to frequent system failures with internet email accounts, you are strongly advised to provide an NHS.net email address."
              />
              <SelectInputField
                label="Deanery / HEE Local Team"
                options={localOffices}
                name="localOfficeName"
              />
              <SelectInputField
                label="Previous Designated Body for Revalidation (if applicable)"
                options={[
                  ...designatedBodies,
                  { label: "other", value: "other" }
                ]}
                name="prevRevalBody"
              />
              {values.prevRevalBody === "other" ? (
                <>
                  <MyAutocomplete
                    name="prevRevalBodyOther"
                    label="Previous Revalidation Body ('other' non-Deanery)"
                    options={options}
                    handleOpen={() => {
                      setOpen(true);
                    }}
                  />
                </>
              ) : null}

              <TextInputField
                label="Current Revalidation Date"
                type="date"
                name="currRevalDate"
              />
              <TextInputField
                label="Date of Previous Revalidation (if applicable)"
                type="date"
                name="prevRevalDate"
              />
              <SelectInputField
                label="Programme / Training Specialty"
                name="programmeSpecialty"
                options={curricula}
              />
              <SelectInputField
                label="Dual Specialty (if applicable)"
                name="dualSpecialty"
                options={curricula}
              />
            </Panel>
          </Fieldset>
          {[...Object.values(errors)].length > 0 ? (
            <ErrorSummary
              aria-labelledby="errorSummaryTitle"
              role="alert"
              tabIndex={-1}
            >
              <ErrorMessage>Please check highlighted fields</ErrorMessage>
            </ErrorSummary>
          ) : null}
          <FormRPartBPagination
            values={values}
            previousSection={previousSection}
            handleSubmit={handleSubmit}
            saveDraft={saveDraft}
            prevSectionLabel={prevSectionLabel}
            nextSectionLabel={nextSectionLabel}
            section={section}
          />
        </Form>
      )}
    </Formik>
  );
};

export default Section1;
