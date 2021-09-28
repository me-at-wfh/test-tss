import React, { FunctionComponent } from "react";
import TextInputField from "../../TextInputField";
import ScrollTo from "../../ScrollTo";
import {
  Fieldset,
  WarningCallout,
  Panel,
  InsetText,
  Button,
  ErrorSummary,
  ErrorMessage
} from "nhsuk-react-components";
import { Form, Formik, FieldArray } from "formik";
import WorkPanel from "./WorkPanel";
import { Work } from "../../../../models/FormRPartB";
import { Section2ValidationSchema } from "../ValidationSchema";
import classes from "../FormRPartB.module.scss";
import { SectionProps } from "./SectionProps";
import FormRPartBPagination from "./FormRPartBPagination";
import PromptIfDirty from "../../../common/PromptIfDirty";

const Section2: FunctionComponent<SectionProps> = (props: SectionProps) => {
  const {
    formData,
    previousSection,
    nextSection,
    saveDraft,
    prevSectionLabel,
    nextSectionLabel,
    section
  } = props;
  const newWork: Work = {
    typeOfWork: "",
    startDate: undefined,
    endDate: undefined,
    trainingPost: "",
    site: "",
    siteLocation: ""
  };

  const getNumber = (value: number) => {
    return isNaN(value) ? 0 : Number(value);
  };

  if (formData && formData.work.length === 0) {
    formData.work.push(newWork);
  }

  return (
    formData && (
      <Formik
        initialValues={formData}
        validationSchema={Section2ValidationSchema}
        onSubmit={values => {
          nextSection(values);
        }}
      >
        {({ values, errors, handleSubmit }) => (
          <Form>
            <PromptIfDirty />
            <ScrollTo />
            <Fieldset disableErrorLine={true} name="scopeOfPractice">
              <Fieldset.Legend
                headingLevel="H2"
                size="l"
                data-cy="legendFieldset2"
              >
                Section 2: Whole Scope of Practice
              </Fieldset.Legend>
              <WarningCallout label="Important" data-cy="mainWarning2">
                <p>
                  Read these instructions carefully! Please list all placements
                  in your capacity as a registered medical practitioner since
                  last ARCP (or since initial registration to programme if more
                  recent). This includes: (1) each of your training posts if you
                  are or were in a training programme; (2) any time out of
                  programme, e.g. OOP, mat leave, career break, etc.;{" "}
                  <b>(3) any voluntary or advisory work</b>, work in non-NHS
                  bodies, or self-employment; (4) any work as a locum. For locum
                  work, please group shifts with one employer within an unbroken
                  period as one employer-entry. Include the dates and number of
                  shifts worked in each locum employer-entry. Please add more
                  rows if required.
                </p>
              </WarningCallout>
              <Panel label="Type of work">
                <FieldArray
                  name="work"
                  render={ps => (
                    <div>
                      {values.work.map((_, i: number) => (
                        <WorkPanel
                          key={i}
                          index={i}
                          removeWork={(index: number) => ps.remove(index)}
                          data-jest="workPanel"
                        ></WorkPanel>
                      ))}
                      <Button
                        data-cy={`BtnAddWorkType`}
                        type="button"
                        secondary
                        data-jest="addMore"
                        onClick={() => ps.push(newWork)}
                      >
                        Add more...
                      </Button>
                    </div>
                  )}
                ></FieldArray>
              </Panel>
              <Panel label="Reasons for TIME OUT OF TRAINING (TOOT)">
                <InsetText className={classes.tootInsetText}>
                  <p>
                    <b>TIME OUT OF TRAINING (TOOT)</b> Self-reported absence
                    whilst part of a training programme since last ARCP (or, if
                    no ARCP, since initial registration to programme). Time out
                    of training should reflect days absent from the training
                    programme and is considered by the ARCP panel/Deanery/HEE in
                    recalculation of the date you should end your current
                    training programme. Partial days must be rounded up.
                    <b>
                      Enter 0 for any reasons where you have not had Time Out Of
                      Training.
                    </b>
                  </p>
                </InsetText>
                <TextInputField
                  label="Short and Long-term sickness absence"
                  name="sicknessAbsence"
                />
                <TextInputField
                  label="Parental leave (incl Maternity / Paternity leave)"
                  name="parentalLeave"
                />
                <TextInputField
                  label="Career breaks within a Programme (OOPC) and non-training placements for experience (OOPE)"
                  name="careerBreaks"
                />
                <TextInputField
                  label="Paid / unpaid leave (e.g. compassionate, jury service)"
                  name="paidLeave"
                />
                <TextInputField
                  label="Unpaid/unauthorised leave including industrial action"
                  name="unauthorisedLeave"
                />
                <TextInputField
                  label="Other"
                  name="otherLeave"
                  hint="TOOT does not include study leave, paid annual leave, prospectively approved Out of Programme Training/Research (OOPT/OOPR) or periods of time between training programmes (e.g. between core and higher training)."
                />
                <TextInputField
                  label="Total"
                  name="totalLeave"
                  value={
                    (values.totalLeave =
                      getNumber(values.sicknessAbsence) +
                      getNumber(values.parentalLeave) +
                      getNumber(values.careerBreaks) +
                      getNumber(values.paidLeave) +
                      getNumber(values.unauthorisedLeave) +
                      getNumber(values.otherLeave))
                  }
                  readOnly
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
    )
  );
};

export default Section2;
