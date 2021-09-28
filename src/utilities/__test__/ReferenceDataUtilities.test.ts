import { ReferenceDataUtilities } from "../ReferenceDataUtilities";
import { KeyValue } from "../../models/KeyValue";

const refData: KeyValue[] = [
  { tisId: "1", label: "Label one", value: "Value one" },
  { tisId: "2", label: "Label two", value: "Value two" },
  { tisId: "3", label: "Label three", value: "Value three" }
];

describe("ReferenceDataUtilities", () => {
  it("Should return true when matching tisID of '1' to label 'Label one'", () => {
    expect(
      ReferenceDataUtilities.isMatchInReferenceData("1", "Label one", refData)
    ).toBe(true);
  });

  it("Should return true when matching tisID of '1 or 2' passed as an array to label 'Label one'", () => {
    expect(
      ReferenceDataUtilities.isMatchInReferenceData(
        ["1", "2"],
        "Label one",
        refData
      )
    ).toBe(true);
  });
  it("Should return false when matching tisID of '1' to label 'Label two'", () => {
    expect(
      ReferenceDataUtilities.isMatchInReferenceData("1", "Label two", refData)
    ).toBe(false);
  });

  it("Should return false when matching tisID of '1 or 2' passed as an array to label 'Label three'", () => {
    expect(
      ReferenceDataUtilities.isMatchInReferenceData(
        ["1", "2"],
        "Label three",
        refData
      )
    ).toBe(false);
  });
});
