import React from "react";
import { Button, Table, ActionLink, LedeText } from "nhsuk-react-components";
import { RootState, ActionType } from "../../redux/types";
import { connect } from "react-redux";
import { FormsService } from "../../services/FormsService";
import { DateUtilities } from "../../utilities/DateUtilities";
import styles from "./FormR.module.scss";
import { IFormR } from "../../models/IFormR";
import { LifeCycleState } from "../../models/LifeCycleState";
import Loading from "../common/Loading";
import { TraineeProfileService } from "../../services/TraineeProfileService";
import { loadFeatureFlags } from "../../redux/actions/formr-partb-actions";
import ScrollTo from "./ScrollTo";

export const CreateList = (
  loadFormList: (
    formService: FormsService
  ) => (dispatch: (action: ActionType) => any) => Promise<void>,
  updateForm: (
    data: any | null
  ) => (dispatch: (action: ActionType) => any) => Promise<any>,
  loadSavedForm: (
    formService: FormsService,
    formId: string
  ) => (dispatch: (action: ActionType) => any) => Promise<void>,
  initializeForm: (
    traineeProfileService: TraineeProfileService
  ) => (dispatch: (action: ActionType) => any) => Promise<void>,
  rootPath: string
) => {
  interface ListProps {
    isLoading: boolean;
    forms: IFormR[];
    history: any;
    loadFormList: (service: FormsService) => Promise<void>;
    loadSavedForm: (service: FormsService, formId: string) => Promise<void>;
    updateForm: (data: any | null) => Promise<any>;
    initializeForm: (
      traineeProfileService: TraineeProfileService
    ) => Promise<void>;
    loadFeatureFlags: (service: FormsService) => Promise<void>;
  }

  const formsService = new FormsService();

  const mapStateToProps = (state: RootState) => ({
    isLoading:
      rootPath === "formr-a"
        ? state.formRPartAList.isLoading
        : state.formRPartBList.isLoading,
    forms:
      rootPath === "formr-a"
        ? state.formRPartAList.submittedForms
        : state.formRPartBList.submittedForms
  });

  const mapDispatchToProps = {
    updateForm,
    loadFormList,
    loadSavedForm,
    initializeForm,
    loadFeatureFlags
  };

  class List extends React.PureComponent<ListProps> {
    componentDidMount() {
      this.props.loadFormList(formsService);
      this.props.loadFeatureFlags(formsService);
    }

    getFormDataByFormId = (formId: string) => {
      return this.props.loadSavedForm(formsService, formId);
    };

    handleRowClick = (formId: string | undefined) => {
      if (formId) {
        this.props
          .loadSavedForm(formsService, formId)
          .then(_ => this.props.history.push(`/${rootPath}/${formId}`));
      }
    };

    handleNewFormClick = () => {
      this.props.initializeForm(new TraineeProfileService()).then(_ =>
        this.props.history.push({
          pathname: `/${rootPath}/create`,
          history: this.props.history
        })
      );
    };

    loadSavedForm = (formId: string | undefined) => {
      if (formId) {
        this.props
          .loadSavedForm(formsService, formId)
          .then(_ => this.props.history.push(`/${rootPath}/create`));
      }
    };

    renderEditFormButton = () => {
      const { forms } = this.props;
      const draftForm = forms.filter(
        form => form.lifecycleState === LifeCycleState.Draft
      );
      const unsubmittedForm = forms.filter(
        form => form.lifecycleState === LifeCycleState.Unsubmitted
      );

      if (unsubmittedForm.length === 1) {
        return (
          <Button
            id="btnOpenForm"
            data-cy="btnEditUnsubmittedForm"
            reverse
            type="submit"
            onClick={() => this.loadSavedForm(unsubmittedForm[0].id)}
          >
            Edit unsubmitted form
          </Button>
        );
      }

      if (draftForm.length >= 1) {
        return (
          <Button
            id="btnOpenForm"
            data-cy="btnEditSavedForm"
            reverse
            type="submit"
            onClick={() => this.loadSavedForm(draftForm[0].id)}
          >
            Edit saved form
          </Button>
        );
      }

      return (
        <Button
          id="btnOpenForm"
          data-cy="btnSubmitNewForm"
          reverse
          type="submit"
          onClick={this.handleNewFormClick}
        >
          Submit new form
        </Button>
      );
    };

    render() {
      const { forms } = this.props;
      const submittedForms = forms.filter(
        form => form.lifecycleState === LifeCycleState.Submitted
      );
      if (this.props.isLoading) return <Loading />;
      return (
        <div>
          <ScrollTo />
          {this.renderEditFormButton()}
          {submittedForms.length > 0 ? (
            <Table>
              <Table.Head>
                <Table.Row>
                  <td>
                    <b>Submitted forms</b>
                  </td>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {submittedForms.map((formData: IFormR, index: number) => (
                  <Table.Row key={formData.id} className={styles.listTableRow}>
                    <td>
                      <ActionLink
                        onClick={() => this.handleRowClick(formData.id)}
                        data-cy="submittedForm"
                      >
                        form submitted on{" "}
                        {DateUtilities.ToLocalDate(formData.submissionDate)}
                      </ActionLink>
                    </td>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <LedeText>No forms submitted yet.</LedeText>
          )}
        </div>
      );
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(List);
};
