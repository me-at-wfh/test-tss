import { Status } from "./Status";

export interface ProgrammeMembership {
  programmeTisId: string;
  programmeName: string;
  programmeNumber: string;
  managingDeanery: string;
  programmeMembershipType: string;
  status: Status;
  startDate: Date;
  endDate: Date;
  programmeCompletionDate: Date;
  curricula: curriculm[];
}

export interface curriculm {
  curriculumTisId: string;
  curriculumName: string;
  curriculumSubType: string;
  curriculumStartDate: Date;
}
