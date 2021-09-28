import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { connect, ConnectedProps } from "react-redux";
import { Button, Panel } from "nhsuk-react-components";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LocalOfficeContact,
  localOfficeContacts
} from "../../models/LocalOfficeContacts";
import {
  FormParams,
  EmailTemplateParams
} from "../../models/FeedbackFormParams";
import { TraineeProfile } from "../../models/TraineeProfile";
import { ProgrammeMembership } from "../../models/ProgrammeMembership";
import { loadTraineeProfile } from "../../redux/actions/trainee-profile-actions";

import { RootState } from "../../redux/reducers";
import { TraineeProfileService } from "../../services/TraineeProfileService";

import TextInputField from "./TextInputField";
import Loading from "../common/Loading";
import ScrollTo from "./ScrollTo";
import PageTitle from "../common/PageTitle";
const mapStateToProps = (state: RootState) => ({
  traineeProfile: state.profile.traineeProfile,
  isLoaded: state.profile.isLoaded
});

const mapDispatchToProps = {
  loadTraineeProfile
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type profileProps = ConnectedProps<typeof connector>;

interface LocalState {
  sendingEmail: boolean;
  showForm: boolean;
}

//https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type CurrentProgrammeMembership =
  | Partial<ProgrammeMembership>
  | undefined;

export class UnconnectedSupport extends React.PureComponent<
  profileProps,
  LocalState
> {
  constructor(props: profileProps) {
    super(props);
    this.state = { sendingEmail: false, showForm: false };
  }

  currentProgramme: CurrentProgrammeMembership = {};

  getLocalOfficeEmail(localOfficeName: string | undefined) {
    if (localOfficeName) {
      const currentLocalOffice = localOfficeContacts.find(
        (localOffice: LocalOfficeContact) => {
          return localOffice.name === localOfficeName;
        }
      );
      return currentLocalOffice ? currentLocalOffice.email : null;
    }
    return null;
  }

  getCurrentProgramme(
    profile: TraineeProfile | null
  ): CurrentProgrammeMembership {
    return profile?.programmeMemberships
      ? profile.programmeMemberships.find((programme: ProgrammeMembership) => {
          return programme.status === "CURRENT";
        })
      : {};
  }

  async componentDidMount() {
    await this.props.loadTraineeProfile(new TraineeProfileService());

    this.currentProgramme = this.getCurrentProgramme(this.props.traineeProfile);
    this.getLocalOfficeEmail(this.currentProgramme?.managingDeanery)
      ? this.setState({ showForm: true })
      : this.setState({ showForm: false });
  }

  mockSendEmail(success: boolean) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        if (success) {
          resolve("SUCCESS");
        } else {
          reject("FAIL");
        }
      }, 1000);
    });
  }

  defaultToastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "customToast"
  };

  handleSubmit(values: FormParams, resetForm: any) {
    this.setState({ sendingEmail: true });

    const templateParams: EmailTemplateParams = {
      surname:
        this.props.traineeProfile?.personalDetails?.surname ||
        "No surname associated with trainee profile",
      forenames:
        this.props.traineeProfile?.personalDetails?.forenames ||
        "No forename associated with trainee profile",
      email:
        this.props.traineeProfile?.personalDetails?.email ||
        "No email associated with trainee profile",
      gmcNumber:
        this.props.traineeProfile?.personalDetails?.gmcNumber ||
        "No GMC number associated with trainee profile",
      programmeName:
        this.currentProgramme?.programmeName ||
        "No current programme associated with trainee profile",
      localOffice:
        this.currentProgramme?.managingDeanery ||
        "No current deanery associated with trainee profile",
      localOfficeEmail: this.getLocalOfficeEmail(
        this.currentProgramme?.managingDeanery || "noreply@hee.nhs.uk"
      ),
      message: values.message
    };

    this.mockSendEmail(true)
      .then(() => {
        toast.success("Message sent", {
          ...this.defaultToastOptions,
          className: "customToast successToast"
        });
        resetForm({});
        console.log(templateParams);
      })
      .catch(() => {
        toast.error("Message failed to send", {
          ...this.defaultToastOptions,
          className: "autoClose: false, customToast failToast"
        });
      })

      .finally(() => {
        this.setState({ sendingEmail: false });
      });
  }

  render() {
    const { traineeProfile, isLoaded } = this.props;

    if (!isLoaded) {
      return <Loading />;
    } else {
      return (
        traineeProfile && (
          <div id="feedback">
            <PageTitle title="Support" />
            <ScrollTo />
            <ToastContainer />
            <h1>Support</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint ad
              ipsum, magni architecto ratione in cumque nihil eveniet numquam.
              Molestias eos quibusdam libero accusantium officia consequuntur.
              Architecto ducimus laborum similique?
            </p>

            {this.state.showForm ? (
              <div data-jest="FormPanel">
                <Panel label="Submit your question">
                  <Formik
                    initialValues={{ message: "" }}
                    validationSchema={yup.object({
                      message: yup.string().required("Message is required!")
                    })}
                    onSubmit={(values, { resetForm }) => {
                      this.handleSubmit(values, resetForm);
                    }}
                  >
                    {({ values, errors }) => (
                      <Form>
                        <TextInputField
                          rows={10}
                          label="Enter your query"
                          name="message"
                          hidelabel={true}
                          disabled={this.state.sendingEmail}
                        />
                        <div className="nhsuk-grid-row">
                          <div className="nhsuk-grid-column-full">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end"
                              }}
                            >
                              <Button
                                disabled={this.state.sendingEmail}
                                data-cy="BtnSendEmail"
                                data-jest="btnSendEmail"
                              >
                                {this.state.sendingEmail ? (
                                  <span>Sending...</span>
                                ) : (
                                  <span>Send</span>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>{" "}
                      </Form>
                    )}
                  </Formik>
                </Panel>
              </div>
            ) : (
              <div data-jest="GetHelpPanel">
                <Panel label="How to get help">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Amet maiores voluptatum voluptas totam nostrum illum omnis
                    harum aliquid, distinctio id doloribus quos dignissimos
                    iure, magni odit quam. Odit, repudiandae asperiores.
                  </p>
                  <p>
                    <a href="https://lasepgmdesupport.hee.nhs.uk/support/tickets/new?form_7=true">
                      PGMDE Support Portal
                    </a>
                  </p>
                </Panel>
              </div>
            )}
          </div>
        )
      );
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedSupport);
