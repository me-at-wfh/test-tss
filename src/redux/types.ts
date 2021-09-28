import { rootReducer } from "./reducers";
import { TraineeProfile } from "../models/TraineeProfile";
import { FormRPartA } from "../models/FormRPartA";
import { KeyValue } from "../models/KeyValue";
import { FormRPartB } from "../models/FormRPartB";
import { FeatureFlags } from "../models/FeatureFlags";

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
  designatedBodies: KeyValue[];
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

export interface FeatureFlagsState {
  featureFlags: FeatureFlags | null;
}

export interface FormRPartBState {
  formData: FormRPartB | null;
  section: number;
}
