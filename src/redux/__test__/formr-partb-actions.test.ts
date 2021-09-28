import {
  LOAD_FORMR_PARTB,
  LOAD_FORMR_PARTB_LIST_SUCCESS,
  LOAD_FORMR_PARTB_LIST_FAILURE,
  INITIALIZE_FORMR_PARTB_FAILURE,
  INITIALIZE_FORMR_PARTB_SUCCESS,
  MOVE_TO_SECTION,
  EDIT_FORMR_PARTB,
  LOAD_FEATURE_FLAGS_SUCCESS,
  LOAD_FEATURE_FLAGS_FAILURE,
  LOADING_FORMR_PARTB_LIST
} from "../action_types";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { submittedFormRPartBs } from "../../mock-data/submitted-formr-partb";
import {
  loadForm,
  loadFormRPartBList,
  initializeForm,
  moveToSection,
  editForm,
  loadFeatureFlags,
  loadSavedForm
} from "../actions/formr-partb-actions";
import { FormRPartB } from "../../models/FormRPartB";
import { AxiosResponse } from "axios";
import { FormsService } from "../../services/FormsService";
import { TraineeProfileService } from "../../services/TraineeProfileService";
import { TraineeProfile } from "../../models/TraineeProfile";
import { mockTraineeProfile } from "../../mock-data/trainee-profile";
import { ProfileToFormRPartBInitialValues } from "../../models/ProfileToFormRPartBInitialValues";
import { FeatureFlags } from "../../models/FeatureFlags";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const formsService = new FormsService();
const traineeProfileService = new TraineeProfileService();
let store = null;

beforeEach(() => {
  store = mockStore({
    formrPartb: { formData: null, section: 1 }
  });
});

describe("loadFormRPartBList method", () => {
  it("Should dispatch LOAD_FORMR_PARTB_LIST_SUCCESS on successfull api call", () => {
    const responsedata = submittedFormRPartBs;

    const successResponse: Promise<AxiosResponse<FormRPartB[]>> =
      Promise.resolve({
        data: responsedata,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {}
      });

    jest
      .spyOn(formsService, "getTraineeFormRPartBList")
      .mockReturnValue(successResponse);

    const expectedActions = [
      { type: LOADING_FORMR_PARTB_LIST, payload: true },
      {
        type: LOAD_FORMR_PARTB_LIST_SUCCESS,
        payload: responsedata
      }
    ];

    return store.dispatch(loadFormRPartBList(formsService)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Should dispatch LOAD_FORMR_PARTB_LIST_FAILURE if api call fails", () => {
    const errorResponse = {
      data: null,
      status: 500,
      statusText: "Internal server error",
      headers: {},
      config: {}
    };

    jest
      .spyOn(formsService, "getTraineeFormRPartBList")
      .mockReturnValue(Promise.reject(errorResponse));

    const expectedActions = [
      { type: LOADING_FORMR_PARTB_LIST, payload: true },
      {
        type: LOAD_FORMR_PARTB_LIST_FAILURE,
        payload: errorResponse
      }
    ];

    return store.dispatch(loadFormRPartBList(formsService)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("initializeForm method", () => {
  it("should dispatch INITIALIZE_FORMR_PARTB_SUCCESS if trainee profile is received", () => {
    const successResponse: Promise<AxiosResponse<TraineeProfile>> =
      Promise.resolve({
        data: mockTraineeProfile,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {}
      });

    jest
      .spyOn(traineeProfileService, "getTraineeProfile")
      .mockReturnValue(successResponse);

    const expectedAction = {
      type: INITIALIZE_FORMR_PARTB_SUCCESS,
      payload: ProfileToFormRPartBInitialValues(mockTraineeProfile)
    };

    return store.dispatch(initializeForm(traineeProfileService)).then(() => {
      expect(store.getActions()).toContainEqual(expectedAction);
    });
  });

  it("should dispatch INITIALIZE_FORMR_PARTB_FAILURE if trainee profile call fails", () => {
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

    const expectedAction = {
      type: INITIALIZE_FORMR_PARTB_FAILURE,
      payload: errorResponse
    };

    return store.dispatch(initializeForm(traineeProfileService)).then(() => {
      expect(store.getActions()).toContainEqual(expectedAction);
    });
  });
});

describe("loadForm method", () => {
  it("should dispatch LOAD_FORMR_PARTB if data is not null", () => {
    const formrPartb = submittedFormRPartBs[0];
    const expectedActions = [
      {
        type: LOAD_FORMR_PARTB,
        payload: formrPartb
      }
    ];

    return store.dispatch(loadForm(formrPartb)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("moveToSection method", () => {
  it("should dispatch FORMR_PARTB_MOVE_TO_SECTION with section passed", () => {
    const sectionNumber = 3;
    const expectedActions = {
      type: MOVE_TO_SECTION,
      payload: 3
    };

    return expect(store.dispatch(moveToSection(sectionNumber))).toEqual(
      expectedActions
    );
  });
});

describe("editForm", () => {
  it("should dispatch EDIT_FORMR_PARTB with section and formData passed", () => {
    const formrPartb = submittedFormRPartBs[0];
    const sectionNumber = 3;
    const expectedActions = {
      type: EDIT_FORMR_PARTB,
      payload: { formData: formrPartb, section: sectionNumber }
    };

    return expect(store.dispatch(editForm(formrPartb, sectionNumber))).toEqual(
      expectedActions
    );
  });
});

describe("loadFeatureFlags method", () => {
  it("Should dispatch LOAD_FEATURE_FLAGS_SUCCESS on successful api call", () => {
    const responsedata: FeatureFlags = {
      formRPartB: {
        covidDeclaration: false
      }
    };

    const successResponse: Promise<AxiosResponse<FeatureFlags>> =
      Promise.resolve({
        data: responsedata,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {}
      });

    jest
      .spyOn(formsService, "getFeatureFlags")
      .mockReturnValue(successResponse);

    const expectedActions = [
      {
        type: LOAD_FEATURE_FLAGS_SUCCESS,
        payload: responsedata
      }
    ];

    return store.dispatch(loadFeatureFlags(formsService)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Should dispatch LOAD_FEATURE_FLAGS_FAILURE if api call fails", () => {
    const errorResponse = {
      data: null,
      status: 500,
      statusText: "Internal server error",
      headers: {},
      config: {}
    };

    jest
      .spyOn(formsService, "getFeatureFlags")
      .mockReturnValue(Promise.reject(errorResponse));

    const expectedActions = [
      {
        type: LOAD_FEATURE_FLAGS_FAILURE,
        payload: null
      }
    ];

    return store.dispatch(loadFeatureFlags(formsService)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("loadSavedForm method", () => {
  it("Should dispatch INITIALIZE_FORMR_PARTB_SUCCESS on successful api call", () => {
    const formrPartb = submittedFormRPartBs[0];

    const successResponse: Promise<AxiosResponse<FormRPartB>> = Promise.resolve(
      {
        data: formrPartb,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {}
      }
    );

    jest
      .spyOn(formsService, "getTraineeFormRPartBByFormId")
      .mockReturnValue(successResponse);

    const expectedActions = [
      {
        type: INITIALIZE_FORMR_PARTB_SUCCESS,
        payload: formrPartb
      }
    ];

    return store.dispatch(loadSavedForm(formsService, "fomrId")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Should dispatch INITIALIZE_FORMR_PARTB_FAILURE if api call fails", () => {
    const errorResponse = {
      data: null,
      status: 500,
      statusText: "Internal server error",
      headers: {},
      config: {}
    };

    jest
      .spyOn(formsService, "getTraineeFormRPartBByFormId")
      .mockReturnValue(Promise.reject(errorResponse));

    const expectedActions = [
      {
        type: INITIALIZE_FORMR_PARTB_FAILURE,
        payload: null
      }
    ];

    return store.dispatch(loadSavedForm(formsService, "formId")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
