import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Panel } from "nhsuk-react-components";
import { localOfficeContacts } from "../../models/LocalOfficeContacts";
import { loadTraineeProfile } from "../../redux/actions/trainee-profile-actions";
import { RootState } from "../../redux/reducers";
import { TraineeProfileService } from "../../services/TraineeProfileService";
import Loading from "../common/Loading";
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
  contact: string;
  dataError: boolean;
  matchError: boolean;
  personOwner: string | null | undefined;
}
export class Support extends React.PureComponent<profileProps, LocalState> {
  constructor(props: profileProps) {
    super(props);
    this.state = {
      contact: "",
      dataError: false,
      matchError: false,
      personOwner: ""
    };
  }

  fetchTraineeProfileProps = async () =>
    await this.props.loadTraineeProfile(new TraineeProfileService());

  fetchPersonOwner = () => {
    return this.props.traineeProfile?.personalDetails?.personOwner;
  };

  findMappedContact(loadedPersonOwner: string | null | undefined) {
    for (let i = 0; i < localOfficeContacts.length; i++) {
      if (localOfficeContacts[i].name === loadedPersonOwner) {
        return localOfficeContacts[i].contact;
      }
    }
    return null;
  }

  async componentDidMount() {
    await this.fetchTraineeProfileProps();
    const fetchedPersonOwner = this.fetchPersonOwner();
    if (!fetchedPersonOwner) {
      this.setState({ dataError: true });
      return;
    }
    this.setState({ personOwner: fetchedPersonOwner });
    const mappedContact = this.findMappedContact(fetchedPersonOwner);
    if (mappedContact) {
      this.setState({ contact: mappedContact });
    } else this.setState({ matchError: true });
  }

  render() {
    const { traineeProfile, isLoaded } = this.props;
    const { contact, dataError, matchError, personOwner } = this.state;

    if (!isLoaded) {
      return <Loading />;
    }
    if (dataError) {
      return (
        <div data-jest="dataErrorPanel">
          <p>
            {`Sorry but your Local Office could not be found. We need this to route your query to the right place. For further assistance, We suggest you raise this with your supervisor.`}
          </p>
        </div>
      );
    }
    if (matchError) {
      return (
        <div data-jest="matchErrorPanel">
          <p>
            {`Sorry but your Local Office name ${personOwner} cannot be matched with a support contact email address. We suggest you raise this with your supervisor.`}
          </p>
        </div>
      );
    } else {
      return (
        traineeProfile && (
          <>
            <div>
              <PageTitle title="Support" />
              <h1>Support</h1>
              <p>
                If you have a query relating to completing the Form R - which
                includes queries about the information we currrently hold for
                you - then please follow the instructions below.
              </p>
            </div>
            {contact === "PGMDE" ? (
              <div data-jest="PGMDESupportPanel">
                <Panel label="Support via the PGMDE Support Portal">
                  <p>
                    {`According to our records, your Local Office is ${personOwner}. Please click on the link below to send your query to the team via the PGMDE Support Portal.`}
                  </p>
                  <p>
                    <a href="https://lasepgmdesupport.hee.nhs.uk/support/tickets/new?form_7=true">
                      PGMDE Support Portal
                    </a>
                  </p>
                </Panel>
              </div>
            ) : (
              <div data-jest="loSupportPanel">
                <Panel label="Support from your Local Office">
                  <p>
                    {`According to our records, your Local Office name is ${personOwner}. Please email them your query by either clicking on the link below (which should open your email client) or copying the email
                    address and pasting it into your email client.`}
                  </p>
                  <p>
                    <a href={`mailto:${contact}`}>{contact}</a>
                  </p>
                </Panel>
              </div>
            )}
          </>
        )
      );
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Support);
