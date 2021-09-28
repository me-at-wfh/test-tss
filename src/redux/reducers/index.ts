import { combineReducers } from "redux";
import TraineeProfileReducer from "./trainee-profile-reducer";
import ReferenceDataReducer from "./reference-data-reducer";
import {
  FormRPartAReducer,
  FormRPartAListReducer
} from "./formr-parta-reducer";
import {
  FormRPartBReducer,
  FormRPartBListReducer,
  FeatureFlagsReducer
} from "./formr-partb-reducer";

export const rootReducer = combineReducers({
  profile: TraineeProfileReducer,
  referenceData: ReferenceDataReducer,
  formRPartA: FormRPartAReducer,
  formRPartAList: FormRPartAListReducer,
  formRPartB: FormRPartBReducer,
  formRPartBList: FormRPartBListReducer,
  featureFlags: FeatureFlagsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
