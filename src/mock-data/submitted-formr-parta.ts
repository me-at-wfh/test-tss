import { FormRPartA } from "../models/FormRPartA";
import { LifeCycleState } from "../models/LifeCycleState";

export const submittedFormRPartAs: FormRPartA[] = [
  {
    id: "5e972ec9b9b5781b94eb1270",
    traineeTisId: "123",
    forename: "Anthony Mara",
    surname: "Gilliam",
    gmcNumber: "11111111",
    localOfficeName: "Health Education England Thames Valley",
    dateOfBirth: new Date("1911-11-30"),
    gender: "Male",
    immigrationStatus: "Other",
    qualification: "AKC - Association of King's College",
    dateAttained: new Date("2018-05-30"),
    medicalSchool: "University of Science and Technology",
    address1: "585-6360 Interdum Street",
    address2: "Goulburn",
    address3: "London",
    address4: "UK",
    postCode: "WC1B 5DN",
    telephoneNumber: "01632960363",
    mobileNumber: "07465879348",
    email: "email@email.com",
    declarationType:
      "I will be seeking specialist registration by application for a CESR CP",
    isLeadingToCct: false,
    programmeSpecialty: "ST3",
    cctSpecialty1: "",
    cctSpecialty2: "",
    college: "Faculty of Intensive Care Medicine",
    completionDate: new Date("2020-04-22"),
    trainingGrade: "Foundation Year 1",
    startDate: new Date("2020-04-22"),
    programmeMembershipType: "General Practice",
    wholeTimeEquivalent: 0.69,
    lifecycleState: LifeCycleState.Submitted,
    submissionDate: new Date("2020-04-22"),
    lastModifiedDate: new Date("2020-04-15"),
    otherImmigrationStatus: "Other status"
  }
];
