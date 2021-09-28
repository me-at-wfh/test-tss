import { ActionType, PersonState } from "../types";
import {
  LOAD_TRAINEE_PROFILE_FAILURE,
  LOAD_TRAINEE_PROFILE_SUCCESS
} from "../action_types";

const initialState: PersonState = {
  traineeProfile: null,
  isLoaded: false
};

export default function TraineeProfileReducer(
  state: PersonState = initialState,
  action: ActionType = {
    type: "",
    payload: ""
  }
): PersonState {
  switch (action.type) {
    case LOAD_TRAINEE_PROFILE_SUCCESS:
      return {
        ...state,
        traineeProfile: action.payload,
        isLoaded: true
      };
    case LOAD_TRAINEE_PROFILE_FAILURE:
      return {
        ...state,
        traineeProfile: null,
        isLoaded: false
      };
    default:
      return state;
  }
}
