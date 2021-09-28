import React from "react";
import { RootState } from "../../../redux/reducers";
import { GenericOwnProps } from "../../../redux/types";
import { connect, ConnectedProps } from "react-redux";
import {
  loadForm,
  moveToSection,
  saveForm
} from "../../../redux/actions/formr-partb-actions";
import { loadReferenceData } from "../../../redux/actions/reference-data-actions";
import { TraineeReferenceService } from "../../../services/TraineeReferenceService";
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import Section4 from "./Sections/Section4";
import Section5 from "./Sections/Section5";

import { FormRPartB } from "../../../models/FormRPartB";
import Section6 from "./Sections/Section6";
import Section7 from "./Sections/Section7";
import { SectionProps } from "./Sections/SectionProps";
import { LifeCycleState } from "../../../models/LifeCycleState";
import { FormsService } from "../../../services/FormsService";
import Loading from "../../common/Loading";
import CovidDeclaration from "./Sections/CovidDeclaration";

const mapStateToProps = (state: RootState, ownProps: GenericOwnProps) => ({
  formData: state.formRPartB.formData,
  localOffices: state.referenceData.localOffices,
  curricula: state.referenceData.curricula,
  isLoaded: state.referenceData.isLoaded,
  section: state.formRPartB.section,
  history: ownProps.history,
  location: ownProps.location,
  formSwitches: state.formSwitches.formSwitches
});

const mapDispatchProps = {
  loadReferenceData,
  loadForm,
  moveToSection,
  saveForm
};

const connector = connect(mapStateToProps, mapDispatchProps);
const formsService = new FormsService();

interface ISection {
  component: any;
  title: string;
}

class Create extends React.PureComponent<
  ConnectedProps<typeof connector>,
  ISection
> {
  componentDidMount() {
    const { isLoaded, loadReferenceData } = this.props;

    if (!isLoaded) {
      loadReferenceData(new TraineeReferenceService());
    }
  }

  nextSection = (formData: FormRPartB, section?: number) => {
    this.props.loadForm(formData);
    this.props.moveToSection(section ? section : this.props.section + 1);
  };

  previousSection = (formData: FormRPartB, section?: number) => {
    this.props.loadForm(formData);
    this.props.moveToSection(section ? section : this.props.section - 1);
  };

  submitForm = (formData: FormRPartB) => {
    this.props.loadForm(formData);
  };

  saveDraft = (formData: FormRPartB) => {
    if (formData.lifecycleState !== LifeCycleState.Unsubmitted) {
      formData.submissionDate = null;
      formData.lifecycleState = LifeCycleState.Draft;
    }
    formData.lastModifiedDate = new Date();

    this.props
      .saveForm(formsService, formData)
      .then(_ => {
        // show success toast / popup
        this.props.history.push("/formr-b");
        this.props.loadForm(null);
      })
      .catch(_ => {
        // show failure toast / popup
      });
  };

  render() {
    const {
      formData,
      localOffices,
      curricula,
      isLoaded,
      section,
      formSwitches
    } = this.props;
    const enableCovidDeclaration: boolean =
      formSwitches.find(s => s.name === "COVID")?.enabled || false;

    if (!isLoaded || !formData) {
      return <Loading />;
    }

    if (localOffices.length > 0) {
      if (!localOffices.some(l => l.label === formData.localOfficeName)) {
        formData.localOfficeName = "";
      }

      if (!localOffices.some(l => l.label === formData.prevRevalBody)) {
        formData.prevRevalBody = "";
      }
    }

    if (
      curricula.length > 0 &&
      !curricula.some(l => l.label === formData.programmeSpecialty)
    ) {
      formData.programmeSpecialty = "";
    }

    const sectionProps: SectionProps = {
      formData: formData,
      previousSection: this.previousSection,
      nextSection: this.nextSection,
      saveDraft: this.saveDraft,
      showCovidDeclaration: enableCovidDeclaration,
      section: section
    };

    const sections: ISection[] = [
      {
        component: Section1,
        title: "Section 1:\nDoctor's details"
      },

      {
        component: Section2,
        title: "Section 2:\nWhole Scope of Practice"
      },

      {
        component: Section3,
        title: "Section 3:\nDeclarations relating to\nGood Medical Practice"
      },
      {
        component: Section4,
        title: "Section 4:\nUpdate to your previous Form R Part B"
      },
      {
        component: Section5,
        title: "Section 5:\nDeclarations since your previous Form R Part B"
      },
      {
        component: Section6,
        title: "Section 6:\nCompliments"
      },

      {
        component: Section7,
        title: "Section 7:\nDeclaration"
      }
    ];

    const covidSection: ISection = {
      component: CovidDeclaration,
      title: "Covid declaration"
    };

    if (enableCovidDeclaration) {
      sections.splice(6, 0, covidSection);
    }
    if (section < sections.length) {
      return React.createElement(sections[section].component, {
        ...sectionProps,
        localOffices: this.props.localOffices,
        curricula: curricula,
        history: this.props.history,
        prevSectionLabel: section > 0 ? sections[section - 1].title : "",
        nextSectionLabel:
          section < sections.length - 1 ? sections[section + 1].title : ""
      });
    } else {
      return <Loading />;
    }
  }
}

export default connector(Create);
