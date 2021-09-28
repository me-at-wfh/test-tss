import View from "./View";
import React from "react";
import { Button, WarningCallout } from "nhsuk-react-components";
import SubmitButton from "../SubmitButton";
import { connect } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { FormsService } from "../../../services/FormsService";
import { FormRPartA } from "../../../models/FormRPartA";
import { LifeCycleState } from "../../../models/LifeCycleState";
import ScrollTo from "../ScrollTo";
import { AxiosResponse } from "axios";
import {
  saveTraineeFormRPartA,
  updateFormData
} from "../../../redux/actions/formr-parta-actions";
import { Redirect } from "react-router-dom";

interface ConfirmProps {
  formData: FormRPartA | null;
  saveTraineeFormRPartA: (
    formService: FormsService,
    formData: FormRPartA
  ) => Promise<AxiosResponse<FormRPartA>>;
  updateFormData: (formData: FormRPartA | null) => Promise<any>;
  history: any;
}

const mapStateToProps = (state: RootState) => ({
  formData: state.formRPartA.formData
});

const mapDispatchProps = {
  saveTraineeFormRPartA,
  updateFormData
};

class Confirm extends React.PureComponent<ConfirmProps> {
  handleEdit = (formData: FormRPartA) => {
    this.props.history.push({
      pathname: `/formr-a/create`,
      formData: formData
    });
  };

  saveForm = (formData: FormRPartA) => {
    formData.lastModifiedDate = new Date();

    this.props.saveTraineeFormRPartA(new FormsService(), formData).then(() => {
      this.props
        .updateFormData(null)
        .then(_ => this.props.history.push(`/formr-a`));
    });
  };

  saveDraft(formData: FormRPartA) {
    if (formData.lifecycleState !== LifeCycleState.Unsubmitted) {
      formData.submissionDate = null;
      formData.lifecycleState = LifeCycleState.Draft;
    }

    this.saveForm(formData);
  }

  handleSubmit = (formData: FormRPartA) => {
    formData.submissionDate = new Date();
    formData.lifecycleState = LifeCycleState.Submitted;

    this.saveForm(formData);
  };

  render() {
    const { formData } = this.props;
    if (!formData) {
      return <Redirect to="/formr-a/create" />;
    }

    return (
      <div>
        <ScrollTo />
        <View canEdit={true} history={this.props.history}></View>
        <WarningCallout data-cy="warningSubmit" label="Warning">
          <p>
            By submitting this form, I confirm that the information above is
            correct and I will keep my Designated Body and the GMC informed as
            soon as possible of any change to my contact details.
          </p>
        </WarningCallout>

        <div className="nhsuk-grid-row">
          <div className="nhsuk-grid-column-two-thirds">
            <div className="nhsuk-grid-row">
              <div className="nhsuk-grid-column-one-quarter">
                <Button onClick={() => this.handleEdit(formData)}>Edit</Button>
              </div>
              <div className="nhsuk-grid-column-one-third">
                <SubmitButton
                  label="Save & Exit"
                  clickHandler={() => this.saveDraft(formData)}
                  data-cy="BtnSaveDraft"
                />
              </div>
              <div className="nhsuk-grid-column-one-quarter">
                <SubmitButton
                  type="submit"
                  label="Submit"
                  clickHandler={() => this.handleSubmit(formData)}
                  data-cy="BtnSubmit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchProps)(Confirm);
