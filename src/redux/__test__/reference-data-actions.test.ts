import { TraineeReferenceService } from "../../services/TraineeReferenceService";
import { loadReferenceData } from "../actions/reference-data-actions";
import {
  LOAD_REFERENCE_GENDER_SUCCESS,
  LOAD_REFERENCE_QUALIFICATIONS_SUCCESS,
  LOAD_REFERENCE_COLLEGES_SUCCESS,
  LOAD_REFERENCE_LOCAL_OFFICES_SUCCESS,
  LOAD_REFERENCE_GRADES_SUCCESS,
  LOAD_REFERENCE_IMMIGRATION_STATUS_SUCCESS,
  LOAD_REFERENCE_CURRICULA_SUCCESS,
  LOAD_REFERENCE_GENDER_FAILURE,
  LOAD_REFERENCE_QUALIFICATIONS_FAILURE,
  LOAD_REFERENCE_COLLEGES_FAILURE,
  LOAD_REFERENCE_LOCAL_OFFICES_FAILURE,
  LOAD_REFERENCE_GRADES_FAILURE,
  LOAD_REFERENCE_IMMIGRATION_STATUS_FAILURE,
  LOAD_REFERENCE_CURRICULA_FAILURE
} from "../action_types";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { AxiosResponse } from "axios";
import { KeyValue } from "../../models/KeyValue";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const referenceService = new TraineeReferenceService();

describe("loadReferenceData method", () => {
  it("Should dispatch SUCCESS actions on successfull api call", () => {
    const store = mockStore({});

    const successResponse: Promise<AxiosResponse<any>> = Promise.resolve({
      data: [
        { id: "1", label: "option1" },
        { id: "2", label: "option2" }
      ],
      status: 200,
      statusText: "OK",
      headers: {},
      config: {}
    });

    jest.spyOn(referenceService, "getGenders").mockReturnValue(successResponse);
    jest
      .spyOn(referenceService, "getQualifications")
      .mockReturnValue(successResponse);
    jest
      .spyOn(referenceService, "getColleges")
      .mockReturnValue(successResponse);
    jest
      .spyOn(referenceService, "getLocalOffices")
      .mockReturnValue(successResponse);
    jest
      .spyOn(referenceService, "getTrainingGrades")
      .mockReturnValue(successResponse);
    jest
      .spyOn(referenceService, "getImmigrationStatus")
      .mockReturnValue(successResponse);
    jest
      .spyOn(referenceService, "getCurricula")
      .mockReturnValue(successResponse);

    const returnValue = [
      { label: "option1", value: "option1" },
      { label: "option2", value: "option2" }
    ];

    const expectedActions = [
      {
        type: LOAD_REFERENCE_GENDER_SUCCESS,
        payload: returnValue
      },
      {
        type: LOAD_REFERENCE_QUALIFICATIONS_SUCCESS,
        payload: returnValue
      },
      {
        type: LOAD_REFERENCE_COLLEGES_SUCCESS,
        payload: returnValue
      },
      {
        type: LOAD_REFERENCE_LOCAL_OFFICES_SUCCESS,
        payload: returnValue
      },
      {
        type: LOAD_REFERENCE_GRADES_SUCCESS,
        payload: returnValue
      },
      {
        type: LOAD_REFERENCE_IMMIGRATION_STATUS_SUCCESS,
        payload: returnValue
      },
      {
        type: LOAD_REFERENCE_CURRICULA_SUCCESS,
        payload: returnValue
      }
    ];

    return store
      .dispatch(loadReferenceData(referenceService))
      .forEach((action: Promise<KeyValue>) => {
        action.then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
  });

  it("Should dispatch FAILURE actions if api call fails", () => {
    const store = mockStore({});

    const errorResponse = {
      data: null,
      status: 500,
      statusText: "Internal server error",
      headers: {},
      config: {}
    };

    jest
      .spyOn(referenceService, "getGenders")
      .mockReturnValue(Promise.reject(errorResponse));
    jest
      .spyOn(referenceService, "getQualifications")
      .mockReturnValue(Promise.reject(errorResponse));
    jest
      .spyOn(referenceService, "getColleges")
      .mockReturnValue(Promise.reject(errorResponse));
    jest
      .spyOn(referenceService, "getLocalOffices")
      .mockReturnValue(Promise.reject(errorResponse));
    jest
      .spyOn(referenceService, "getTrainingGrades")
      .mockReturnValue(Promise.reject(errorResponse));
    jest
      .spyOn(referenceService, "getImmigrationStatus")
      .mockReturnValue(Promise.reject(errorResponse));
    jest
      .spyOn(referenceService, "getCurricula")
      .mockReturnValue(Promise.reject(errorResponse));

    const expectedActions = [
      {
        type: LOAD_REFERENCE_GENDER_FAILURE,
        payload: errorResponse
      },
      {
        type: LOAD_REFERENCE_QUALIFICATIONS_FAILURE,
        payload: errorResponse
      },
      {
        type: LOAD_REFERENCE_COLLEGES_FAILURE,
        payload: errorResponse
      },
      {
        type: LOAD_REFERENCE_LOCAL_OFFICES_FAILURE,
        payload: errorResponse
      },
      {
        type: LOAD_REFERENCE_GRADES_FAILURE,
        payload: errorResponse
      },
      {
        type: LOAD_REFERENCE_IMMIGRATION_STATUS_FAILURE,
        payload: errorResponse
      },
      {
        type: LOAD_REFERENCE_CURRICULA_FAILURE,
        payload: errorResponse
      }
    ];

    return store
      .dispatch(loadReferenceData(referenceService))
      .forEach((action: Promise<any>) => {
        action.then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
  });
});
