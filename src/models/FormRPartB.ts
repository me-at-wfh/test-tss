import { IFormR } from "./IFormR";

export interface FormRPartB extends IFormR {
  traineeTisId?: string;
  forename: string;
  surname: string;
  gmcNumber: string;
  email: string;
  localOfficeName: string;
  prevRevalBody: string;
  currRevalDate: Date | undefined;
  prevRevalDate: Date | undefined;
  programmeSpecialty: string;
  dualSpecialty: string;
  work: Work[];
  sicknessAbsence: number;
  parentalLeave: number;
  careerBreaks: number;
  paidLeave: number;
  unauthorisedLeave: number;
  otherLeave: number;
  totalLeave: number;
  isHonest: boolean | string;
  isHealthy: boolean | string;
  isWarned: boolean | string;
  isComplying: boolean | string;
  healthStatement: string;
  havePreviousDeclarations: boolean | string;
  previousDeclarations: Declaration[];
  previousDeclarationSummary: string;
  haveCurrentDeclarations: boolean | string;
  currentDeclarations: Declaration[];
  currentDeclarationSummary: string;
  compliments: string;
  haveCovidDeclarations: boolean | string;
  covidDeclarationDto: CovidDeclaration | null;
}

export interface Declaration {
  declarationType: string | undefined;
  dateOfEntry: Date | undefined;
  title: string;
  locationOfEntry: string;
}

export interface Work {
  typeOfWork: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  trainingPost: string;
  site: string;
  siteLocation: string;
}

export interface CovidDeclaration {
  selfRateForCovid: string;
  reasonOfSelfRate: string;
  otherInformationForPanel: string;
  discussWithSupervisorChecked: boolean | string;
  discussWithSomeoneChecked: boolean | string;
  haveChangesToPlacement: boolean | string;
  changeCircumstances: string;
  changeCircumstanceOther: string;
  howPlacementAdjusted: string;
  educationSupervisorName: string;
  educationSupervisorEmail: string;
}

export interface FormSwitch {
  id: string;
  name: string;
  enabled: boolean;
}
