import React from "react";
import { Button } from "nhsuk-react-components";
import { connect } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { FormsService } from "../../../services/FormsService";
import View from "./View";
import { FormRPartB } from "../../../models/FormRPartB";
import {
  moveToSection,
  saveForm,
  loadForm
} from "../../../redux/actions/formr-partb-actions";
import { Redirect } from "react-router-dom";
import { LifeCycleState } from "../../../models/LifeCycleState";
import { AxiosResponse } from "axios";

interface ConfirmProps {
  formData: FormRPartB | null;
  history: any;
  moveToSection: (section: number) => any;
  saveForm: (
    formsService: FormsService,
    formData: FormRPartB
  ) => Promise<AxiosResponse<FormRPartB>>;
  loadForm: (formData: FormRPartB | null) => Promise<any>;
}

const mapStateToProps = (state: RootState) => ({
  formData: state.formRPartB.formData
});

const mapDispatchToProps = {
  moveToSection,
  saveForm,
  loadForm
};

class Confirm extends React.PureComponent<ConfirmProps> {
  formsService: FormsService = new FormsService();

  handleSubmit = (formData: FormRPartB) => {
    formData.submissionDate = new Date();
    formData.lifecycleState = LifeCycleState.Submitted;

    this.saveForm(formData);
  };

  editSection = (section: number) => {
    this.props.moveToSection(section);
    this.props.history.push("/formr-b/create");
  };

  saveDraft(formData: FormRPartB) {
    if (formData.lifecycleState !== LifeCycleState.Unsubmitted) {
      formData.submissionDate = null;
      formData.lifecycleState = LifeCycleState.Draft;
    }
    formData.lastModifiedDate = new Date();

    this.saveForm(formData);
  }

  private saveForm(formData: FormRPartB) {
    formData.lastModifiedDate = new Date();

    this.props
      .saveForm(new FormsService(), formData)
      .then(_ => {
        // show success toast / popup
        this.props
          .loadForm(null)
          .then(() => this.props.history.push("/formr-b"));
      })
      .catch(_ => {});
  }

  render() {
    const { formData } = this.props;
    if (!formData) {
      return <Redirect to="/formr-b/create" />;
    } else {
      return (
        <div>
          <View
            canEdit={true}
            history={this.props.history}
            editSection={this.editSection}
          ></View>

          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-two-thirds">
              <div className="nhsuk-grid-row">
                <div className="nhsuk-grid-column-one-third">
                  <Button
                    onClick={() => this.saveDraft(formData)}
                    data-cy="BtnSaveDraft"
                  >
                    Save & Exit
                  </Button>
                </div>
                <div className="nhsuk-grid-column-one-quarter">
                  <Button
                    type="submit"
                    onClick={() => this.handleSubmit(formData)}
                    data-cy="BtnSubmitPartB"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
