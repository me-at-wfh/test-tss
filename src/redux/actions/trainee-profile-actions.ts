import { ActionType } from "../types";
import {
  LOAD_TRAINEE_PROFILE_FAILURE,
  LOAD_TRAINEE_PROFILE_SUCCESS
} from "../action_types";
import { TraineeProfileService } from "../../services/TraineeProfileService";

export function loadTraineeProfile(profileService: TraineeProfileService) {
  return (dispatch: (action: ActionType) => any) => {
    return profileService
      .getTraineeProfile()
      .then(response =>
        dispatch({
          type: LOAD_TRAINEE_PROFILE_SUCCESS,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: LOAD_TRAINEE_PROFILE_FAILURE,
          payload: error
        })
      );
  };
}
