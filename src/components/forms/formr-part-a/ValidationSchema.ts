import * as yup from "yup";
import { DateUtilities } from "../../../utilities/DateUtilities";
import { StringValidationSchema } from "../StringValidationSchema";
import { CCT_DECLARATION } from "../../../utilities/Constants";

const phoneRegex = /^\s*\(?(020[7,8]{1}\)?[ ]?[1-9]{1}[0-9{2}[ ]?[0-9]{4})|(0[1-8]{1}[0-9]{3}\)?[ ]?[1-9]{1}[0-9]{2}[ ]?[0-9]{3})\s*$/g;
const mobileRegex = /((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/g;
const postcodeRegex = /[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}/i;
const wholeTimeEquivalentRegex = /^((0\.[1-9]{1})?|(0\.([0-9]{1}[1-9]{1}|[1-9]{1}[0-9]{1}))|1(\.0{1,2})?)$/;

const dateValidationSchema = (fieldName: string) =>
  yup.date().required(`${fieldName} is required`);

export const ValidationSchema = yup.object({
  forename: StringValidationSchema("Forename(s)"),
  surname: StringValidationSchema("Surname (GMC-Registered)", 30),
  gmcNumber: StringValidationSchema("GMC number", 20),
  localOfficeName: StringValidationSchema("Deanery / HEE Local Office"),
  dateOfBirth: dateValidationSchema("Your date of birth")
    .test("dateOfBirth", "You must be 17 years or above", value =>
      DateUtilities.IsLegalAge(value)
    )
    .test(
      "dateOfBirth",
      "This date is before the minumum date allowed",
      value => DateUtilities.IsMoreThanMinDate(value)
    ),
  gender: StringValidationSchema("Gender"),
  immigrationStatus: StringValidationSchema("Immigration Status"),
  qualification: StringValidationSchema("Qualification"),
  dateAttained: dateValidationSchema("Date awarded (most recent qualification)")
    .test(
      "dateAttained",
      "Date awarded (most recent qualification) - please choose a date from the past",
      value => DateUtilities.IsPastDate(value)
    )
    .test(
      "dateAttained",
      "This date is before the minumum date allowed",
      value => DateUtilities.IsMoreThanMinDate(value)
    ),
  medicalSchool: StringValidationSchema("Medical school"),
  address1: StringValidationSchema("Address - house number/ name and road"),
  address2: StringValidationSchema("Address - district"),
  address3: StringValidationSchema("Address - town or city"),
  address4: StringValidationSchema("Address - country"),
  postCode: StringValidationSchema("Postcode", 8).matches(
    postcodeRegex,
    "Please enter a valid postcode"
  ),
  telephoneNumber: StringValidationSchema(
    "Contact (landline telephone)"
  ).matches(phoneRegex, "Contact (landline) number - requires a valid number"),
  mobileNumber: StringValidationSchema("Contact (mobile)").matches(
    mobileRegex,
    "Contact (mobile) number - requires a valid number"
  ),
  email: yup
    .string()
    .email("Email is invalid")
    .max(255, "Email must be shorter than 255 characters")
    .required("Email"),
  declarationType: yup
    .string()
    .required("You need to choose at least one Declaration")
    .nullable(),
  programmeSpecialty: StringValidationSchema("Programme specialty"),
  cctSpecialty1: yup.string().when("declarationType", {
    is: CCT_DECLARATION,
    then: StringValidationSchema("Specialty 1 for Award of CCT")
  }),
  college: StringValidationSchema("Royal College / Faculty Assessing Training"),
  completionDate: dateValidationSchema("Anticipated completion date")
    .test(
      "completionDate",
      "Anticipated completion date - please choose a future date",
      value => DateUtilities.IsFutureDate(value)
    )
    .test(
      "completionDate",
      "This date is greater than the maximum date allowed",
      value => DateUtilities.IsLessThanMaxDate(value)
    ),
  trainingGrade: StringValidationSchema("Training Grade"),
  startDate: dateValidationSchema("Programme start date").test(
    "startDate",
    "This date is outside the allowed date range",
    value => DateUtilities.IsInsideDateRange(value)
  ),
  programmeMembershipType: StringValidationSchema("Post type / Appointment"),
  wholeTimeEquivalent: yup
    .string()
    .required("Programme Full Time Equivalent in Training is required")
    .test(
      "wholeTimeEquivalent",
      "Programme Full Time Equivalent in Training needs to be a number less than or equal to 1 and greater than zero (a maximum of 2 decimal places)",
      value => (value ? wholeTimeEquivalentRegex.test(value) : false)
    )
    .nullable()
});
