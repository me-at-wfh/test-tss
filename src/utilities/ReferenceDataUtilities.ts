import { KeyValue } from "../models/KeyValue";
export class ReferenceDataUtilities {
  private static getIdFromLabel(refData: KeyValue[], label: string) {
    const myObj: KeyValue | undefined = refData.find(
      (item: KeyValue) => item.label === label
    );

    return myObj?.tisId;
  }

  public static isMatchInReferenceData(
    tisId: string[],
    label: string,
    refData: KeyValue[]
  ) {
    return [...tisId].some(id => this.getIdFromLabel(refData, label) === id);
  }
}
