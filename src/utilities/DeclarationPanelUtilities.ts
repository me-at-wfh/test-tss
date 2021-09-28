import { BooleanUtilities } from "./BooleanUtilities";
import { Declaration } from "../models/FormRPartB";

export class DeclarationPanelUtilities {
  public static changeDeclarationsArray = (
    value: string,
    declarationsArray: Declaration[],
    declaration: Declaration
  ): void => {
    BooleanUtilities.ToBoolean(value)
      ? declarationsArray.push(declaration)
      : declarationsArray.splice(0, declarationsArray.length);
  };
}
