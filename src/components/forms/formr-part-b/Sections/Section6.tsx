import React, { FunctionComponent } from "react";
import TextInputField from "../../TextInputField";
import ScrollTo from "../../ScrollTo";
import { Fieldset, Panel } from "nhsuk-react-components";
import { Form, Formik } from "formik";
import { SectionProps } from "./SectionProps";
import FormRPartBPagination from "./FormRPartBPagination";
import PromptIfDirty from "../../../common/PromptIfDirty";

const Section6: FunctionComponent<SectionProps> = (props: SectionProps) => {
  const {
    formData,
    previousSection,
    nextSection,
    saveDraft,
    prevSectionLabel,
    nextSectionLabel,
    section
  } = props;

  return (
    formData && (
      <Formik
        initialValues={formData}
        onSubmit={values => {
          nextSection(values);
        }}
      >
        {({ values, handleSubmit }) => (
          <Form>
            <PromptIfDirty />
            <ScrollTo />
            <Fieldset
              disableErrorLine={true}
              name="currentDeclarations"
              data-jest="mainFieldset6"
            >
              <Fieldset.Legend
                headingLevel="H2"
                size="l"
                data-cy="legendFieldset6"
              >
                Section 6: Compliments
              </Fieldset.Legend>
              <Panel label="Compliments" data-cy="complimentsPanel">
                <TextInputField
                  name="compliments"
                  rows={15}
                  label=""
                  data-cy="compliments"
                  data-jest="compliments"
                  hint={
                    <span>
                      Compliments are another important piece of feedback. You
                      may wish to detail here any compliments that you have
                      received which are not already recorded in your portfolio,
                      to help give a better picture of your practice as a whole.
                      <strong>This section is not compulsory.</strong>
                    </span>
                  }
                />
              </Panel>
            </Fieldset>

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
    )
  );
};

export default Section6;
