import { TraineeProfileService } from "../../services/TraineeProfileService";
import {
  LOAD_TRAINEE_PROFILE_SUCCESS,
  LOAD_TRAINEE_PROFILE_FAILURE
} from "../action_types";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { mockTraineeProfile } from "../../mock-data/trainee-profile";
import { AxiosResponse } from "axios";
import { TraineeProfile } from "../../models/TraineeProfile";
import { loadTraineeProfile } from "../actions/trainee-profile-actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const profileService = new TraineeProfileService();

describe("fetchTraineeProfile method", () => {
  it("Should dispatch LOAD_TRAINEE_PROFILE_SUCCESS on successfull api call", () => {
    const store = mockStore({});

    const successResponse: Promise<AxiosResponse<
      TraineeProfile
    >> = Promise.resolve({
      data: mockTraineeProfile,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {}
    });

    jest
      .spyOn(profileService, "getTraineeProfile")
      .mockReturnValue(successResponse);

    const expectedActions = [
      {
        type: LOAD_TRAINEE_PROFILE_SUCCESS,
        payload: mockTraineeProfile
      }
    ];

    return store.dispatch(loadTraineeProfile(profileService)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Should dispatch LOAD_TRAINEE_PROFILE_FAILURE if api call fails", () => {
    const store = mockStore({});

    const errorResponse = {
      data: null,
      status: 500,
      statusText: "Internal server error",
      headers: {},
      config: {}
    };

    jest
      .spyOn(profileService, "getTraineeProfile")
      .mockReturnValue(Promise.reject(errorResponse));

    const expectedActions = [
      {
        type: LOAD_TRAINEE_PROFILE_FAILURE,
        payload: errorResponse
      }
    ];

    return store.dispatch(loadTraineeProfile(profileService)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
