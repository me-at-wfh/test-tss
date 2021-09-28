import { ActionType } from "../types";
import {
  LOAD_TRAINEE_PROFILE_FAILURE,
  LOAD_TRAINEE_PROFILE_SUCCESS
} from "../action_types";
import { TraineeProfileService } from "../../services/TraineeProfileService";

export function loadTraineeProfile(profileService: TraineeProfileService) {
  return async (dispatch: (action: ActionType) => any) => {
    try {
      const response = await profileService.getTraineeProfile();
      return dispatch({
        type: LOAD_TRAINEE_PROFILE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      return dispatch({
        type: LOAD_TRAINEE_PROFILE_FAILURE,
        payload: error
      });
    }
  };
}
