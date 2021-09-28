import { PersonalDetails } from "../models/PersonalDetails";
import { TraineeProfile } from "../models/TraineeProfile";
import { Status } from "../models/Status";

export const mockPersonalDetails: PersonalDetails = {
  surname: "Gilliam",
  forenames: "Anthony Mara",
  knownAs: "Ivy",
  maidenName: "N/A",
  title: "Mr",
  personOwner: "Health Education England Thames Valley",
  dateOfBirth: new Date("1911-11-30"),
  gender: "Male",
  qualification: "AKC - Association of King's College",
  dateAttained: new Date("2018-05-30"),
  medicalSchool: "University of Science and Technology",
  telephoneNumber: "01632960363",
  mobileNumber: "07465879348",
  email: "email@email.com",
  address1: "585-6360 Interdum Street",
  address2: "Goulburn",
  address3: "London",
  address4: "UK",
  postCode: "WC1B 5DN",
  gmcNumber: "11111111",
  gmcStatus: "",
  gdcNumber: "",
  gdcStatus: "",
  publicHealthNumber: "",
  eeaResident: "",
  permitToWork: "",
  settled: "",
  visaIssued: "",
  detailsNumber: "",
  prevRevalBody: "",
  prevRevalDate: new Date("2021-12-31"),
  currRevalDate: new Date("2021-12-31")
};

export const mockProgrammeMemberships = [
  {
    startDate: new Date("2020-01-01"),
    endDate: new Date("2022-01-01"),
    programmeCompletionDate: new Date("2019-12-31"),
    programmeTisId: "1",
    programmeName: "Cardiology",
    programmeNumber: "EOE8945",
    managingDeanery: "East of England",
    programmeMembershipType: "SUBSTANTIVE",
    status: Status.Current,
    curricula: [
      {
        curriculumTisId: "1",
        curriculumName: "ST1",
        curriculumSubType: "MEDICAL_CURRICULUM",
        curriculumStartDate: new Date("2020-01-01")
      },
      {
        curriculumTisId: "2",
        curriculumName: "ST2",
        curriculumSubType: "ACF_OTHER_FUNDING",
        curriculumStartDate: new Date("2020-06-01")
      },
      {
        curriculumTisId: "3",
        curriculumName: "ST3",
        curriculumSubType: "MEDICAL_CURRICULUM",
        curriculumStartDate: new Date("2020-08-01")
      }
    ]
  },
  {
    startDate: new Date("2022-01-01"),
    endDate: new Date("2024-01-01"),
    programmeCompletionDate: new Date("2021-12-31"),
    programmeTisId: "2",
    programmeName: "General Practice",
    programmeNumber: "EOE8950",
    managingDeanery: "West of England",
    programmeMembershipType: "LAT",
    status: Status.Current,
    curricula: [
      {
        curriculumTisId: "4",
        curriculumName: "ST4",
        curriculumSubType: "MEDICAL_CURRICULUM",
        curriculumStartDate: new Date("2022-01-01")
      },
      {
        curriculumTisId: "5",
        curriculumName: "ST5",
        curriculumSubType: "ACF_OTHER_FUNDING",
        curriculumStartDate: new Date("2022-06-01")
      },
      {
        curriculumTisId: "6",
        curriculumName: "ST6",
        curriculumSubType: "MEDICAL_CURRICULUM",
        curriculumStartDate: new Date("2022-08-01")
      }
    ]
  }
];

export const mockPlacements = [
  {
    endDate: new Date("2020-12-31"),
    grade: "ST1",
    placementTisId: "315",
    placementType: "In Post",
    site: "Addenbrookes Hospital",
    siteLocation: "Site location",
    specialty: "Dermatology",
    startDate: new Date("2020-01-01"),
    status: Status.Current
  }
];

export const mockTraineeProfile: TraineeProfile = {
  traineeTisId: "123",
  personalDetails: mockPersonalDetails,
  programmeMemberships: mockProgrammeMemberships,
  placements: mockPlacements
};
