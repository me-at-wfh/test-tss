import { ProfileUtilities } from "../ProfileUtilities";
import { submittedFormRPartBs } from "../../mock-data/submitted-formr-partb";

describe("DesignatedBodiesUtilities", () => {
  it("should sort work in desc order by end date", () => {
    const sortedWork = ProfileUtilities.sortWorkDesc(submittedFormRPartBs[0]);
    expect(sortedWork[0].endDate).toBe("2020-12-31");
  });
});
