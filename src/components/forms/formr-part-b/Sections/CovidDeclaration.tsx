import React, { FunctionComponent, useEffect, useState } from "react";
import ScrollTo from "../../ScrollTo";
import {
  Fieldset,
  Panel,
  Label,
  WarningCallout,
  ErrorSummary,
  ErrorMessage
} from "nhsuk-react-components";
import { Form, Formik } from "formik";
import { SectionProps } from "./SectionProps";
import FormRPartBPagination from "./FormRPartBPagination";
import MultiChoiceInputField from "../../MultiChoiceInputField";
import SelectInputField from "../../SelectInputField";
import {
  YES_NO_OPTIONS,
  COVID_RESULT_DECLARATIONS,
  NEED_DISCUSSION_WITH_SUPERVISOR,
  NEED_DISCUSSION_WITH_SOMEONE
} from "../../../../utilities/Constants";
import { CovidSectionValidationSchema } from "../ValidationSchema";
import { BooleanUtilities } from "../../../../utilities/BooleanUtilities";
import TextInputField from "../../TextInputField";
import { KeyValue } from "../../../../models/KeyValue";
import { TraineeReferenceService } from "../../../../services/TraineeReferenceService";
import PromptIfDirty from "../../../common/PromptIfDirty";

const CovidDeclaration: FunctionComponent<SectionProps> = (
  props: SectionProps
) => {
  const {
    formData,
    previousSection,
    nextSection,
    saveDraft,
    prevSectionLabel,
    nextSectionLabel,
    section
  } = props;

  const [changeCircumstances, setChangeCircumstances] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const traineeReferenceService = new TraineeReferenceService();
      const response = await traineeReferenceService.getCovidChangeCircs();
      const responseChangeCircumstances = response.data.map(
        (d: { label: any }) => {
          return {
            label: d.label,
            value: d.label
          };
        }
      );

      setChangeCircumstances(responseChangeCircumstances);
    };
    fetchData();
  }, []);

  return (
    formData && (
      <Formik
        initialValues={formData}
        validationSchema={CovidSectionValidationSchema}
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
              name="currentDeclarations"
              data-jest="mainFieldset6"
            >
              <Fieldset.Legend
                headingLevel="H2"
                size="l"
                data-cy="legendFieldsetCovid"
              >
                Trainee Self-assessment & declaration for use in ARCPs during
                COVID 19 Pandemic
              </Fieldset.Legend>
              <Label>
                Self-declaration and Educational supervisor validation for the
                Doctors in Training ARCPs during COVID 19 Pandemic
              </Label>

              <Panel label="Covid declarations" data-cy="complimentsPanel">
                <MultiChoiceInputField
                  label="Do you wish to complete the Covid 19 self declaration?"
                  id="haveCovidDeclarations"
                  name="haveCovidDeclarations"
                  type="radios"
                  items={YES_NO_OPTIONS}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (BooleanUtilities.ToBoolean(e.target.value)) {
                      setFieldValue(
                        "covidDeclarationDto",
                        {
                          selfRateForCovid: "",
                          reasonOfSelfRate: "",
                          otherInformationForPanel: "",
                          discussWithSupervisorChecked: false,
                          discussWithSomeoneChecked: false,
                          haveChangesToPlacement: "",
                          changeCircumstances: "",
                          changeCircumstanceOther: "",
                          howPlacementAdjusted: "",
                          educationSupervisorName: "",
                          educationSupervisorEmail: ""
                        },
                        false
                      );
                    } else {
                      setFieldValue("covidDeclarationDto", null, false);
                    }
                  }}
                />
              </Panel>

              {BooleanUtilities.ToBoolean(values.haveCovidDeclarations) ? (
                <div data-jest="covidForm" data-cy="covidForm">
                  <WarningCallout label="Important" data-cy="mainWarningCovid">
                    <div>
                      <p>
                        <b>IMPORTANT:</b> Please complete this form with the
                        information about your training since your last ARCP
                        review, or this is the first scheduled ARCP in your
                        programme, since the start of your current period of
                        training.
                      </p>
                    </div>
                    <div>
                      <p>Please comment on:</p>
                      <ul>
                        <li>
                          Your self-assessment of progress up to the point of
                          COVID 19
                        </li>
                        <li>
                          How your training may have been impacted by COVID 19
                          e.g. if you have not been able to acquire required
                          competencies/capabilities through lack of appropriate
                          learning opportunities or cancellation of required
                          exams/courses
                        </li>
                        <li>Any other relevant information</li>
                      </ul>
                    </div>
                    <div>
                      <p>
                        By signing this document, you are confirming that ALL
                        details are correct and that you have made an honest
                        declaration in accordance with the professional
                        standards set out by the General Medical Council in Good
                        Medical Practice.
                      </p>
                    </div>
                  </WarningCallout>
                  <Panel label="Section 1: Trainee self-assessment of progress">
                    <Label>
                      <b>
                        1. Please self-rate your progress in your training since
                        your last ARCP using the three-point rating scale
                      </b>
                    </Label>

                    <MultiChoiceInputField
                      label=""
                      id="covidDeclarationDto.selfRateForCovid"
                      type="radios"
                      name="covidDeclarationDto.selfRateForCovid"
                      data-jest="selfRateForCovid"
                      hint=""
                      items={COVID_RESULT_DECLARATIONS.map<KeyValue>(d => {
                        return {
                          label: d,
                          value: d
                        };
                      })}
                      onChange={() => {
                        setFieldValue(
                          "covidDeclarationDto.reasonOfSelfRate",
                          null,
                          false
                        );
                      }}
                    />
                    {values.covidDeclarationDto?.selfRateForCovid !==
                    COVID_RESULT_DECLARATIONS[2] ? (
                      <TextInputField
                        label="Please explain your reason for your progress self-rating."
                        name="covidDeclarationDto.reasonOfSelfRate"
                        rows={5}
                      />
                    ) : null}

                    <Label>
                      <b>
                        2. Please add other information you wish to provide for
                        the ARCP panel below
                      </b>
                    </Label>
                    <TextInputField
                      label=""
                      name="covidDeclarationDto.otherInformationForPanel"
                      data-jest="covidDeclarationDto.otherInformationForPanel"
                      rows={10}
                    />
                  </Panel>

                  <Panel label="Section 2: Trainee Check-In">
                    <Label>
                      <b>Please indicate in response to the following</b>
                    </Label>
                    <MultiChoiceInputField
                      id="covidDeclarationDto.discussWithSupervisorChecked"
                      type="checkbox"
                      name="covidDeclarationDto.discussWithSupervisorChecked"
                      hint=""
                      items={[
                        {
                          label: NEED_DISCUSSION_WITH_SUPERVISOR,
                          value: true
                        }
                      ]}
                    />
                    <MultiChoiceInputField
                      id="covidDeclarationDto.discussWithSomeoneChecked"
                      type="checkbox"
                      name="covidDeclarationDto.discussWithSomeoneChecked"
                      hint=""
                      items={[
                        {
                          label: NEED_DISCUSSION_WITH_SOMEONE,
                          value: true
                        }
                      ]}
                    />
                  </Panel>

                  <Panel label="Section 3: Trainee placement changes">
                    <Label>
                      <p>
                        Please indicate any changes to your placement caused by
                        your individual circumstances e.g. moving from frontline
                        services for those in high-risk groups. Include as much
                        information as possible including details of any periods
                        of self-isolation with dates
                      </p>
                    </Label>

                    <MultiChoiceInputField
                      label="Changes were made to my placement due to my individual circumstances?"
                      id="covidDeclarationDto.haveChangesToPlacement"
                      name="covidDeclarationDto.haveChangesToPlacement"
                      type="radios"
                      items={YES_NO_OPTIONS}
                      data-jest="haveChangesToPlacement"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue(
                          "covidDeclarationDto.haveChangesToPlacement",
                          e.target.value,
                          false
                        );
                        setFieldValue(
                          "covidDeclarationDto.changeCircumstances",
                          null,
                          false
                        );
                        setFieldValue(
                          "covidDeclarationDto.changeCircumstanceOther",
                          null,
                          false
                        );
                        setFieldValue(
                          "covidDeclarationDto.howPlacementAdjusted",
                          null,
                          false
                        );
                      }}
                    />

                    {BooleanUtilities.ToBoolean(
                      values.covidDeclarationDto?.haveChangesToPlacement
                    ) ? (
                      <div
                        data-jest="placementChanges"
                        data-cy="placementChanges"
                      >
                        <SelectInputField
                          label="Circumstance of change"
                          name="covidDeclarationDto.changeCircumstances"
                          data-jest="changeCircumstances"
                          options={changeCircumstances}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setFieldValue(
                              "covidDeclarationDto.changeCircumstances",
                              e.target.value
                            );
                            setFieldValue(
                              "covidDeclarationDto.changeCircumstanceOther",
                              null,
                              false
                            );
                          }}
                        />
                        {values.covidDeclarationDto?.changeCircumstances ===
                        "Other" ? (
                          <TextInputField
                            label="If other, please explain"
                            name="covidDeclarationDto.changeCircumstanceOther"
                            data-jest="changeCircumstanceOther"
                          />
                        ) : null}

                        <TextInputField
                          label="Please explain further how your placement was adjusted"
                          name="covidDeclarationDto.howPlacementAdjusted"
                          rows={5}
                          data-jest="howPlacementAdjusted"
                        />
                      </div>
                    ) : null}
                  </Panel>

                  <Panel label="Section 4: Educational Supervisor (ES) Report / Validation">
                    <Label>
                      <p>
                        Please provide details of your Educational Supervisor in
                        this section. A copy of this form will need to be sent
                        to your ES when you submit this form. This will give
                        your ES the opportunity to review the information
                        provided in the self-assessment declaration, comment and
                        confirm / validate them and make a recommendation for
                        the ARCP during COVID 19. This will be completed by the
                        ES in your ePortfolio.
                      </p>
                    </Label>
                    <TextInputField
                      label="Educational Supervisor Name"
                      name="covidDeclarationDto.educationSupervisorName"
                      data-jest="educationSupervisorName"
                    />
                    <TextInputField
                      label="Educational Supervisor Email Address"
                      name="covidDeclarationDto.educationSupervisorEmail"
                      data-jest="educationSupervisorEmail"
                    />
                  </Panel>
                </div>
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

export default CovidDeclaration;
