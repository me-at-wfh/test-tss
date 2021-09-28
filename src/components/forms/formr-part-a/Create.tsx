import React from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { RootState } from "../../../redux/reducers";
import {
  Button,
  ErrorSummary,
  BackLink,
  WarningCallout,
  Panel,
  ErrorMessage
} from "nhsuk-react-components";
import {
  updateFormData,
  saveTraineeFormRPartA
} from "../../../redux/actions/formr-parta-actions";
import SelectInputField from "../SelectInputField";
import TextInputField from "../TextInputField";
import { ValidationSchema } from "./ValidationSchema";
import { GenericOwnProps } from "../../../redux/types";
import {
  FORMR_PARTA_DECLARATIONS,
  CCT_DECLARATION
} from "../../../utilities/Constants";
import Loading from "../../common/Loading";
import { loadReferenceData } from "../../../redux/actions/reference-data-actions";
import { TraineeReferenceService } from "../../../services/TraineeReferenceService";
import { KeyValue } from "../../../models/KeyValue";
import { FormRPartA } from "../../../models/FormRPartA";
import { LifeCycleState } from "../../../models/LifeCycleState";
import { AxiosResponse } from "axios";
import { FormsService } from "../../../services/FormsService";
import { Redirect } from "react-router-dom";
import MultiChoiceInputField from "../MultiChoiceInputField";

interface CreateProps extends GenericOwnProps {
  formData: FormRPartA | null;
  genders: KeyValue[];
  qualifications: KeyValue[];
  colleges: KeyValue[];
  localOffices: KeyValue[];
  trainingGrades: KeyValue[];
  immigrationStatus: KeyValue[];
  curricula: KeyValue[];
  isLoaded: boolean;
  loadReferenceData: (
    referenceService: TraineeReferenceService
  ) => Promise<any>[];
  updateFormData: (formData: FormRPartA | null) => Promise<any>;
  saveTraineeFormRPartA: (
    formService: FormsService,
    formData: FormRPartA
  ) => Promise<AxiosResponse<FormRPartA>>;
}

const mapStateToProps = (state: RootState) => ({
  formData: state.formRPartA.formData,
  genders: state.referenceData.genders,
  qualifications: state.referenceData.qualifications,
  colleges: state.referenceData.colleges,
  localOffices: state.referenceData.localOffices,
  trainingGrades: state.referenceData.grades,
  immigrationStatus: state.referenceData.immigrationStatus,
  curricula: state.referenceData.curricula,
  isLoaded: state.referenceData.isLoaded
});

const mapDispatchProps = {
  loadReferenceData,
  updateFormData,
  saveTraineeFormRPartA
};

class Create extends React.PureComponent<CreateProps> {
  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.loadReferenceData(new TraineeReferenceService());
    }
  }

  saveDraft(formData: FormRPartA) {
    formData.submissionDate = null;
    formData.lifecycleState = LifeCycleState.Draft;
    formData.lastModifiedDate = new Date();

    this.props.saveTraineeFormRPartA(new FormsService(), formData).then(() => {
      this.props.history.push(`/formr-a`);
    });
  }

  handleSubmit(formData: FormRPartA) {
    this.props
      .updateFormData(formData)
      .then(_ => this.props.history.push("/formr-a/confirm"));
  }

  render() {
    const {
      formData,
      genders,
      qualifications,
      colleges,
      localOffices,
      trainingGrades,
      immigrationStatus,
      curricula,
      isLoaded
    } = this.props;

    if (!formData) {
      return <Redirect to="/formr-a" />;
    }

    if (!isLoaded) {
      return <Loading />;
    }

    if (localOffices.length > 0) {
      if (!localOffices.some(l => l.label === formData.localOfficeName)) {
        formData.localOfficeName = "";
      }
    }

    return (
      <>
        <BackLink href="/formr-a">Go back</BackLink>
        <Formik
          initialValues={formData}
          validationSchema={ValidationSchema}
          onSubmit={values => this.handleSubmit(values)}
        >
          {({ values, errors }) => (
            <Form>
              <WarningCallout label="Important">
                <p>
                  This form has been pre-populated using the information
                  available against your records within the Trainee Information
                  System (TIS). Please check all details and amend where
                  necessary. Amendments made to your details on this form will
                  not update other systems that you may have access to. By
                  submitting this document you are confirming that ALL DETAILS
                  (pre-populated or entered/amended by you) are correct. <br />
                  <br />
                  It remains your own responsibility to keep your Designated
                  Body and the GMC informed as soon as possible of any changes
                  to your contact details. Your HEE Local team remains your
                  Designated Body throughout your time in training. You can
                  update your Designated Body on your GMC Online account under
                  "My Revalidation".
                </p>
              </WarningCallout>
              <Panel label="Personal Details">
                <TextInputField label="Forename(s)" name="forename" />
                <TextInputField
                  label="Surname (GMC-Registered)"
                  name="surname"
                />
                <TextInputField label="GMC Number" name="gmcNumber" />
                <SelectInputField
                  label="Deanery / HEE Local Office"
                  options={localOffices}
                  name="localOfficeName"
                />
                <TextInputField
                  label="Date of Birth"
                  type="date"
                  name="dateOfBirth"
                />
                <SelectInputField
                  label="Gender"
                  options={genders}
                  name="gender"
                />
                <SelectInputField
                  label="Immigration Status"
                  name="immigrationStatus"
                  options={immigrationStatus}
                />
                {values.immigrationStatus === "Other" ? (
                  <TextInputField
                    name="otherImmigrationStatus"
                    label="Other"
                    placeholder="Please add your 'Other' immigration status"
                  />
                ) : null}
                <SelectInputField
                  label="Primary Qualification (most recent)"
                  name="qualification"
                  options={qualifications}
                />
                <TextInputField
                  label="Date Awarded"
                  type="date"
                  name="dateAttained"
                />
                <TextInputField
                  label="Medical School Awarding Primary Qualification (name and
                    country)"
                  name="medicalSchool"
                />
                <TextInputField
                  label="Home Address"
                  name="address1"
                  placeholder="House number, name / road"
                />
                <TextInputField
                  label="District"
                  name="address2"
                  placeholder="district"
                />
                <TextInputField
                  label="Town or city"
                  name="address3"
                  placeholder="town or city"
                />
                <TextInputField
                  label="Country"
                  name="address4"
                  placeholder="country"
                />
                <TextInputField
                  label="Postcode"
                  name="postCode"
                  placeholder="postcode"
                />
                <TextInputField
                  label="Contact Telephone (landline)"
                  name="telephoneNumber"
                />
                <TextInputField
                  label="Contact Telephone (Mobile)"
                  name="mobileNumber"
                />
                <TextInputField label="Email" name="email" />
              </Panel>

              <Panel label="Declarations">
                <MultiChoiceInputField
                  label="I confirm that"
                  id="declarationType"
                  type="radios"
                  name="declarationType"
                  hint=""
                  items={FORMR_PARTA_DECLARATIONS.map<KeyValue>(d => {
                    return {
                      label: d,
                      value: d
                    };
                  })}
                />

                <SelectInputField
                  label="Programme Specialty"
                  name="programmeSpecialty"
                  options={curricula}
                />
                {values.declarationType === CCT_DECLARATION ? (
                  <>
                    <SelectInputField
                      label="Specialty 1 for Award of CCT"
                      name="cctSpecialty1"
                      options={curricula}
                    />
                    <SelectInputField
                      label="Specialty 2 for Award of CCT"
                      name="cctSpecialty2"
                      options={curricula}
                    />
                  </>
                ) : null}
                <SelectInputField
                  label="Royal College / Faculty Assessing Training for the Award of
                    CCT"
                  name="college"
                  options={colleges}
                />
                <TextInputField
                  label="Anticipated Completion Date of Current Programme"
                  type="date"
                  name="completionDate"
                />
              </Panel>

              <Panel label="Programme">
                <SelectInputField
                  label="Training Grade"
                  name="trainingGrade"
                  options={trainingGrades}
                />
                <TextInputField
                  label="Start Date"
                  type="date"
                  name="startDate"
                />
                <TextInputField
                  label="Post type / Appointment"
                  name="programmeMembershipType"
                  placeholder="programmeMembership type"
                />
                <TextInputField
                  label="Full Time Equivalent in Training"
                  name="wholeTimeEquivalent"
                  placeholder="e.g. 0.1 for 10%; 0.25 for 25% etc. or 1 for Full Time"
                />
              </Panel>

              {[...Object.values(errors)].length > 0 ? (
                <ErrorSummary
                  aria-labelledby="errorSummaryTitle"
                  role="alert"
                  tabIndex={-1}
                >
                  <ErrorMessage>Please check highlighted fields</ErrorMessage>
                </ErrorSummary>
              ) : null}

              <div className="nhsuk-grid-row">
                <div className="nhsuk-grid-column-two-thirds">
                  <div className="nhsuk-grid-row">
                    <div className="nhsuk-grid-column-one-third">
                      <Button
                        onClick={() => this.saveDraft(values)}
                        data-cy="BtnSaveDraft"
                      >
                        Save & Exit
                      </Button>
                    </div>
                    <div className="nhsuk-grid-column-two-thirds">
                      <Button type="submit" data-cy="BtnContinue">
                        Continue to submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchProps)(Create);
