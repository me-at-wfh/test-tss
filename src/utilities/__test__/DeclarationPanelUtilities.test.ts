import { DeclarationPanelUtilities } from "../DeclarationPanelUtilities";
import { Declaration } from "../../models/FormRPartB";

describe("DeclarationPanelUtilities", () => {
  it("changeDeclarationsArray should return a new array when value is true", () => {
    const value = "true";
    const declarationsArray = [];
    const declaration: Declaration = {
      declarationType: undefined,
      dateOfEntry: undefined,
      title: "",
      locationOfEntry: ""
    };

    DeclarationPanelUtilities.changeDeclarationsArray(
      value,
      declarationsArray,
      declaration
    );

    expect(declarationsArray.length).toEqual(1);
  });

  it("changeDeclarationsArray should remove array when value is false", () => {
    const value = "false";
    const declarationsArray = [
      {
        declarationType: "Complaint",
        dateOfEntry: new Date("2020-06-14"),
        title: "Patient not happy",
        locationOfEntry: "Hospital"
      },
      {
        declarationType: "Other Investigation",
        dateOfEntry: new Date("2019-12-25"),
        title: "Looking for Santa",
        locationOfEntry: "North Pole"
      }
    ];
    const declaration = undefined;

    DeclarationPanelUtilities.changeDeclarationsArray(
      value,
      declarationsArray,
      declaration
    );

    expect(declarationsArray.length).toEqual(0);
  });
});
