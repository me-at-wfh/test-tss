import { FormRPartB, Work } from "../models/FormRPartB";

export class ProfileUtilities {
  public static sortWorkDesc(formData: FormRPartB) {
    return formData.work.sort(
      (a: Work, b: Work) =>
        new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
    );
  }
}
