import { ProfileToFormRPartAInitialValues } from "./../ProfileToFormRPartAInitialValues";
import {
  mockProgrammeMembershipDuplicateCurriculaStart,
  mockProgrammeMembershipNoCurricula,
  mockProgrammeMembershipNoMedicalCurricula,
  mockTraineeProfile
} from "../../mock-data/trainee-profile";
import { FormRPartA } from "../FormRPartA";
import { LifeCycleState } from "../LifeCycleState";

const formrPartA: FormRPartA = {
  traineeTisId: "123",
  forename: "Anthony Mara",
  surname: "Gilliam",
  gmcNumber: "11111111",
  localOfficeName: "Health Education England Thames Valley",
  dateOfBirth: new Date("1911-11-30"),
  gender: "Male",
  immigrationStatus: "",
  qualification: "AKC - Association of King's College",
  dateAttained: new Date("2018-05-30"),
  medicalSchool: "University of Science and Technology",
  address1: "585-6360 Interdum Street",
  address2: "Goulburn",
  address3: "London",
  address4: "",
  postCode: "WC1B 5DN",
  telephoneNumber: "01632960363",
  mobileNumber: "07465879348",
  email: "",
  declarationType: "",
  isLeadingToCct: false,
  programmeSpecialty: "ST6",
  cctSpecialty1: "ST6",
  cctSpecialty2: "",
  college: "",
  completionDate: new Date("2021-12-31"),
  trainingGrade: "",
  startDate: new Date("2022-01-01"),
  programmeMembershipType: "LAT",
  lifecycleState: LifeCycleState.New,
  wholeTimeEquivalent: undefined,
  submissionDate: null,
  lastModifiedDate: null,
  otherImmigrationStatus: ""
};

describe("ProfileToFormRPartAInitialValues", () => {
  it("should return null when null is passed", () => {
    expect(ProfileToFormRPartAInitialValues(null)).toEqual(null);
  });

  it("should return formrPartA when trainee profile is passed", () => {
    expect(ProfileToFormRPartAInitialValues(mockTraineeProfile)).toEqual(
      formrPartA
    );

    expect(
      ProfileToFormRPartAInitialValues(mockTraineeProfile)?.programmeSpecialty
    ).toEqual("ST6");
    expect(
      ProfileToFormRPartAInitialValues(mockTraineeProfile)?.cctSpecialty1
    ).toEqual("ST6");
    expect(
      ProfileToFormRPartAInitialValues(mockTraineeProfile)?.cctSpecialty2
    ).toEqual("");
  });

  it("should return formRPartA with empty programmespeciality when no programmeMemberships available", () => {
    const traineeProfile = { ...mockTraineeProfile, programmeMemberships: [] };
    expect(
      ProfileToFormRPartAInitialValues(traineeProfile)?.programmeSpecialty
    ).toEqual("");
    expect(
      ProfileToFormRPartAInitialValues(traineeProfile)?.cctSpecialty1
    ).toEqual("");
    expect(
      ProfileToFormRPartAInitialValues(traineeProfile)?.cctSpecialty2
    ).toEqual("");
  });

  it("should return formRPartA with empty programmeSpecialty when no curriculum", () => {
    const traineeProfile = {
      ...mockTraineeProfile,
      programmeMemberships: [mockProgrammeMembershipNoCurricula]
    };

    expect(
      ProfileToFormRPartAInitialValues(traineeProfile)?.programmeSpecialty
    ).toEqual("");
    expect(
      ProfileToFormRPartAInitialValues(traineeProfile)?.cctSpecialty1
    ).toEqual("");
    expect(
      ProfileToFormRPartAInitialValues(traineeProfile)?.cctSpecialty2
    ).toEqual("");
  });

  it("should return formRPartA with empty programmeSpecialty when no medical curriculum", () => {
    const traineeProfile = {
      ...mockTraineeProfile,
      programmeMemberships: [mockProgrammeMembershipNoMedicalCurricula]
    };

    expect(
      ProfileToFormRPartAInitialValues(traineeProfile)?.programmeSpecialty
    ).toEqual("");
    expect(
      ProfileToFormRPartAInitialValues(traineeProfile)?.cctSpecialty1
    ).toEqual("");
    expect(
      ProfileToFormRPartAInitialValues(traineeProfile)?.cctSpecialty2
    ).toEqual("");
  });

  it("should return formRPartA with first alphabetical programmeSpecialty when latest start date duplicated", () => {
    const traineeProfile = {
      ...mockTraineeProfile,
      programmeMemberships: [mockProgrammeMembershipDuplicateCurriculaStart]
    };

    expect(
      ProfileToFormRPartAInitialValues(traineeProfile)?.programmeSpecialty
    ).toEqual("A");
    expect(
      ProfileToFormRPartAInitialValues(traineeProfile)?.cctSpecialty1
    ).toEqual("A");
    expect(
      ProfileToFormRPartAInitialValues(traineeProfile)?.cctSpecialty2
    ).toEqual("");
  });

  it("should return formRPartA with empty strings when no personal details available", () => {
    const traineeProfile = { ...mockTraineeProfile, personalDetails: null };
    expect(ProfileToFormRPartAInitialValues(traineeProfile)?.forename).toEqual(
      ""
    );
  });
});
