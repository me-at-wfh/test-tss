import React, { FunctionComponent } from "react";
import TextInputField from "../../TextInputField";
import MultiChoiceInputField from "../../MultiChoiceInputField";
import ScrollTo from "../../ScrollTo";
import {
  Fieldset,
  WarningCallout,
  Panel,
  Button,
  ErrorSummary,
  ErrorMessage
} from "nhsuk-react-components";
import { Form, Formik, FieldArray } from "formik";
import DeclarationPanel from "./DeclarationPanel";
import { Declaration } from "../../../../models/FormRPartB";
import { Section4ValidationSchema } from "../ValidationSchema";
import { DeclarationPanelUtilities } from "../../../../utilities/DeclarationPanelUtilities";
import { BooleanUtilities } from "../../../../utilities/BooleanUtilities";
import { YES_NO_OPTIONS } from "../../../../utilities/Constants";
import { SectionProps } from "./SectionProps";
import FormRPartBPagination from "./FormRPartBPagination";
import PromptIfDirty from "../../../common/PromptIfDirty";

const Section4: FunctionComponent<SectionProps> = (props: SectionProps) => {
  const {
    formData,
    previousSection,
    nextSection,
    saveDraft,
    prevSectionLabel,
    nextSectionLabel,
    section
  } = props;

  const newDeclaration: Declaration = {
    declarationType: undefined,
    dateOfEntry: undefined,
    title: "",
    locationOfEntry: ""
  };

  return (
    formData && (
      <Formik
        initialValues={formData}
        validationSchema={Section4ValidationSchema}
        onSubmit={values => {
          nextSection(values);
        }}
      >
        {({ values, errors, handleSubmit, setFieldValue }) => (
          <Form>
            <PromptIfDirty />
            <ScrollTo />
            <Fieldset
              disableErrorLine={true}
              name="previousDeclarations"
              data-jest="mainFieldset4"
            >
              <Fieldset.Legend
                headingLevel="H2"
                size="l"
                data-cy="legendFieldset4"
              >
                Section 4: Update to your previous Form R Part B
              </Fieldset.Legend>
              <WarningCallout label="Important" data-cy="mainWarning4">
                <div>
                  <p>
                    If you have previously declared any Significant Events,
                    Complaints, or Other Investigations on your previous Form R
                    Part B, then please provide updates to these declarations
                    below. Please add more rows as required using the 'Add More'
                    button.
                  </p>
                </div>
                <div>
                  <p>
                    Please <b>do not</b> use this space for new declarations.
                    These should be added in <b>Section 5</b> (New Declarations
                    since your previous Form R Part B).
                  </p>
                  <p>
                    <strong>
                      REMINDER: DO NOT INCLUDE ANY PATIENT-IDENTIFIABLE
                      INFORMATION ON THIS FORM
                    </strong>
                  </p>
                </div>
              </WarningCallout>

              <Panel label="Previous Declarations" data-cy="declarations4">
                <MultiChoiceInputField
                  label="Do you have any Significant Events, Complaints, Other investigations on your previous Form R Part B?"
                  id="havePreviousDeclarations"
                  name="havePreviousDeclarations"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    DeclarationPanelUtilities.changeDeclarationsArray(
                      e.target.value,
                      values.previousDeclarations,
                      newDeclaration
                    );
                    setFieldValue("previousDeclarationSummary", null, false);
                  }}
                  type="radios"
                  items={YES_NO_OPTIONS}
                  footer="If you wish to make any such declarations in relation to your current Form R Part B then please do this in Section 5"
                />
              </Panel>

              {BooleanUtilities.ToBoolean(values.havePreviousDeclarations) ? (
                <>
                  <Panel label="Resolved Declarations">
                    <p>
                      If any <strong>previously declared</strong> significant
                      events, complaints, or other investigations have been{" "}
                      <strong>RESOLVED</strong> since your last
                      ARCP/RITA/Appraisal, you are required to have written a
                      reflection on these in your Portfolio.
                    </p>
                    <FieldArray
                      name="previousDeclarations"
                      render={p => (
                        <div>
                          {values.previousDeclarations.map((_, i: number) => (
                            <DeclarationPanel
                              section={4}
                              key={i}
                              index={i}
                              removeDeclaration={(index: number) =>
                                p.remove(index)
                              }
                              data-jest="declarationPanel4"
                            ></DeclarationPanel>
                          ))}
                          <Button
                            data-cy={`btnAddDeclaration`}
                            type="button"
                            secondary
                            data-jest="btnAddDeclaration"
                            onClick={() => p.push(newDeclaration)}
                          >
                            Add more...
                          </Button>
                        </div>
                      )}
                    ></FieldArray>
                  </Panel>
                  <Panel
                    label="Summary of previous unresolved declarations"
                    data-cy="previousDeclarationSummary"
                  >
                    <TextInputField
                      name="previousDeclarationSummary"
                      rows={15}
                      label=""
                      data-cy="previousDeclarationSummaryTextInput"
                      data-jest="previousDeclarationSummaryTextInput"
                      hint={
                        <span>
                          If any <strong>previously declared</strong>{" "}
                          Significant Events, Complaints, Other investigations
                          remain <strong>UNRESOLVED</strong>, please provide a
                          brief summary below, including where you were working,
                          the date of the event, and your reflection where
                          appropriate. If known, please identify what
                          investigations are pending relating to the event and
                          which organisation is undertaking the investigation.
                        </span>
                      }
                    />
                  </Panel>
                </>
              ) : null}
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
    )
  );
};

export default Section4;
