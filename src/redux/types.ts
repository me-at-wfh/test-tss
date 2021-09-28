import { rootReducer } from "./reducers";
import { TraineeProfile } from "../models/TraineeProfile";
import { FormRPartA } from "../models/FormRPartA";
import { KeyValue } from "../models/KeyValue";
import { FormRPartB, FormSwitch } from "../models/FormRPartB";

export type RootState = ReturnType<typeof rootReducer>;

export interface ActionType {
  type: string;
  payload: any;
}

export interface PersonState {
  traineeProfile: TraineeProfile | null;
  isLoaded: boolean;
}

export interface GenericOwnProps {
  history: any;
  location: any;
}

export interface ReferenceDataState {
  genders: KeyValue[];
  colleges: KeyValue[];
  localOffices: KeyValue[];
  grades: KeyValue[];
  immigrationStatus: KeyValue[];
  curricula: KeyValue[];
  isLoaded: boolean;
}

export interface FormRPartAState {
  formData: FormRPartA | null;
}

export interface FormRPartAListState {
  submittedForms: FormRPartA[];
  isLoading: boolean;
}

export interface FormRPartBListState {
  submittedForms: FormRPartB[];
  isLoading: boolean;
}

export interface FormSwitchesState {
  formSwitches: FormSwitch[];
}

export interface FormRPartBState {
  formData: FormRPartB | null;
  section: number;
}
