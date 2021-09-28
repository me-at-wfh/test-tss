import { CHECK_PHONE_REGEX } from "../../../../utilities/Constants";

describe("Phone validation regex", () => {
  it("should match a number less than 16 digits but more than 9 digits starting with 0", () => {
    const telNum1 = "01511231234";
    const telNum2 = "0088888888888888";
    const telNum3 = "0169770000";
    const telNum4 = "016977000";

    expect(telNum1).toMatch(CHECK_PHONE_REGEX);
    expect(telNum2).not.toMatch(CHECK_PHONE_REGEX);
    expect(telNum3).toMatch(CHECK_PHONE_REGEX);
    expect(telNum4).not.toMatch(CHECK_PHONE_REGEX);
  });
  it("should match a number less than 16 digits but more than 9 digits starting with a + and country code", () => {
    const telNum1 = "+449999999999";
    const telNum2 = "+2569999999999";
    expect(telNum1).toMatch(CHECK_PHONE_REGEX);
    expect(telNum2).toMatch(CHECK_PHONE_REGEX);
  });
  it("should match a number less than 16 digits but more than 9 digits starting with a country code and not a +", () => {
    const telNum1 = "449999999999";
    const telNum2 = "380999999999999";
    expect(telNum1).toMatch(CHECK_PHONE_REGEX);
    expect(telNum2).toMatch(CHECK_PHONE_REGEX);
  });
  it("should match number less than 16 digits but more than 9 digits with spaces between the numbers", () => {
    const telNum1 = "0151 123 1234";
    const telNum2 = "07777 77 77 77";
    const telNum3 = "00 99 99 99 99 99 999";
    const telNum4 = "+256 99 99 99 99 99";

    expect(telNum1).toMatch(CHECK_PHONE_REGEX);
    expect(telNum2).toMatch(CHECK_PHONE_REGEX);
    expect(telNum3).toMatch(CHECK_PHONE_REGEX);
    expect(telNum4).toMatch(CHECK_PHONE_REGEX);
  });
  it("should not match a number with a non-numeric character other than a +", () => {
    const telNum1 = "0151 23 1234S";
    const telNum2 = "*07777 77 77 77";
    const telNum3 = "+256-9999999999";

    expect(telNum1).not.toMatch(CHECK_PHONE_REGEX);
    expect(telNum2).not.toMatch(CHECK_PHONE_REGEX);
    expect(telNum3).not.toMatch(CHECK_PHONE_REGEX);
  });
  it("should not match a number with more than one +", () => {
    const telNum1 = "++449999999999";
    expect(telNum1).not.toMatch(CHECK_PHONE_REGEX);
  });
});
