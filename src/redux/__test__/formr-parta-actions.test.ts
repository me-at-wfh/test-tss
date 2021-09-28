import {
  LOAD_FORMR_PARTA_LIST_SUCCESS,
  LOAD_FORMR_PARTA_LIST_FAILURE,
  UPDATE_FORMR_PARTA,
  LOAD_FORMR_PARTA_SUCCESS,
  LOAD_FORMR_PARTA_FAILURE
} from "../action_types";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { AxiosResponse } from "axios";
import { FormsService } from "../../services/FormsService";
import { submittedFormRPartAs } from "../../mock-data/submitted-formr-parta";

import {
  loadFormRPartAList,
  updateFormData,
  initializeForm,
  loadSavedForm
} from "../actions/formr-parta-actions";
import { FormRPartA } from "../../models/FormRPartA";
import { TraineeProfile } from "../../models/TraineeProfile";
import { mockTraineeProfile } from "../../mock-data/trainee-profile";
import { TraineeProfileService } from "../../services/TraineeProfileService";
import { ProfileToFormRPartAInitialValues } from "../../models/ProfileToFormRPartAInitialValues";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const formRPartAService = new FormsService();
const traineeProfileService = new TraineeProfileService();
let store = null;

beforeEach(() => {
  store = mockStore({
    formrParta: { formData: null }
  });
});

describe("loadFormRPartAList method", () => {
  it("Should dispatch LOAD_FORMR_PARTA_LIST_SUCCESS on successfull api call", () => {
    const responsedata = submittedFormRPartAs;

    const successResponse: Promise<AxiosResponse<
      FormRPartA[]
    >> = Promise.resolve({
      data: responsedata,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {}
    });

    jest
      .spyOn(formRPartAService, "getTraineeFormRPartAList")
      .mockReturnValue(successResponse);

    const expectedActions = [
      {
        type: LOAD_FORMR_PARTA_LIST_SUCCESS,
        payload: responsedata
      }
    ];

    return store.dispatch(loadFormRPartAList(formRPartAService)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Should dispatch LOAD_FORMR_PARTA_LIST_FAILURE if api call fails", () => {
    store = mockStore({});

    const errorResponse = {
      data: null,
      status: 500,
      statusText: "Internal server error",
      headers: {},
      config: {}
    };

    jest
      .spyOn(formRPartAService, "getTraineeFormRPartAList")
      .mockReturnValue(Promise.reject(errorResponse));

    const expectedActions = [
      {
        type: LOAD_FORMR_PARTA_LIST_FAILURE,
        payload: errorResponse
      }
    ];

    return store.dispatch(loadFormRPartAList(formRPartAService)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("updateFormData method", () => {
  it("should dispatch UPDATE_FORMR_PARTA if data is not null", () => {
    const formrParta = submittedFormRPartAs[0];
    const expectedActions = [
      {
        type: UPDATE_FORMR_PARTA,
        payload: formrParta
      }
    ];

    return store.dispatch(updateFormData(formrParta)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("initializeForm method", () => {
  it("should dispatch LOAD_FORMR_PARTA_SUCCESS if trainee profile is received", () => {
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
      .spyOn(traineeProfileService, "getTraineeProfile")
      .mockReturnValue(successResponse);

    const expectedAction = [
      {
        type: LOAD_FORMR_PARTA_SUCCESS,
        payload: ProfileToFormRPartAInitialValues(mockTraineeProfile)
      }
    ];

    return store.dispatch(initializeForm(traineeProfileService)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("should dispatch LOAD_FORMR_PARTA_FAILURE if trainee profile call fails", () => {
    const errorResponse = {
      data: null,
      status: 500,
      statusText: "Internal server error",
      headers: {},
      config: {}
    };

    jest
      .spyOn(traineeProfileService, "getTraineeProfile")
      .mockReturnValue(Promise.reject(errorResponse));

    const expectedAction = [
      {
        type: LOAD_FORMR_PARTA_FAILURE,
        payload: errorResponse
      }
    ];

    return store.dispatch(initializeForm(traineeProfileService)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe("loadSavedForm method", () => {
  it("Should dispatch LOAD_FORMR_PARTA_SUCCESS on successfull api call", () => {
    const formrParta = submittedFormRPartAs[0];

    const successResponse: Promise<AxiosResponse<FormRPartA>> = Promise.resolve(
      {
        data: formrParta,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {}
      }
    );

    jest
      .spyOn(formRPartAService, "getTraineeFormRPartAByFormId")
      .mockReturnValue(successResponse);

    const expectedActions = [
      {
        type: LOAD_FORMR_PARTA_SUCCESS,
        payload: formrParta
      }
    ];

    return store
      .dispatch(loadSavedForm(formRPartAService, "fomrId"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("Should dispatch LOAD_FORMR_PARTA_FAILURE if api call fails", () => {
    const errorResponse = {
      data: null,
      status: 500,
      statusText: "Internal server error",
      headers: {},
      config: {}
    };

    jest
      .spyOn(formRPartAService, "getTraineeFormRPartAByFormId")
      .mockReturnValue(Promise.reject(errorResponse));

    const expectedActions = [
      {
        type: LOAD_FORMR_PARTA_FAILURE,
        payload: null
      }
    ];

    return store
      .dispatch(loadSavedForm(formRPartAService, "formId"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
