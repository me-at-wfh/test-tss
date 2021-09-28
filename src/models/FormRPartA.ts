import { IFormR } from "./IFormR";

export interface FormRPartA extends IFormR {
  traineeTisId?: string;
  forename: string;
  surname: string;
  gmcNumber: string;
  localOfficeName: string;
  dateOfBirth: Date | null;
  gender: string;
  immigrationStatus: string;
  qualification: string;
  dateAttained: Date | null;
  medicalSchool: string;
  address1: string;
  address2: string;
  address3: string;
  address4?: string;
  postCode: string;
  telephoneNumber: string;
  mobileNumber: string;
  email: string;
  isLeadingToCct: boolean;
  programmeSpecialty: string;
  cctSpecialty1: string;
  cctSpecialty2: string;
  college: string;
  completionDate: Date | null;
  trainingGrade: string;
  startDate: Date | null;
  programmeMembershipType: string;
  wholeTimeEquivalent: number | undefined;
  declarationType: string;
  otherImmigrationStatus: string;
}
