import ReferenceDataReducer from "../reducers/reference-data-reducer";
import { ActionType, ReferenceDataState } from "../types";
import {
  LOAD_REFERENCE_GENDER_SUCCESS,
  LOAD_REFERENCE_GENDER_FAILURE,
  LOAD_REFERENCE_COLLEGES_SUCCESS,
  LOAD_REFERENCE_COLLEGES_FAILURE,
  LOAD_REFERENCE_QUALIFICATIONS_SUCCESS,
  LOAD_REFERENCE_QUALIFICATIONS_FAILURE,
  LOAD_REFERENCE_LOCAL_OFFICES_FAILURE,
  LOAD_REFERENCE_LOCAL_OFFICES_SUCCESS,
  LOAD_REFERENCE_GRADES_FAILURE,
  LOAD_REFERENCE_GRADES_SUCCESS,
  LOAD_REFERENCE_IMMIGRATION_STATUS_SUCCESS,
  LOAD_REFERENCE_IMMIGRATION_STATUS_FAILURE,
  LOAD_REFERENCE_CURRICULA_FAILURE,
  LOAD_REFERENCE_CURRICULA_SUCCESS
} from "../action_types";

describe("form-r part-a reducer", () => {
  const initialState: ReferenceDataState = {
    genders: [],
    colleges: [],
    localOffices: [],
    qualifications: [],
    grades: [],
    immigrationStatus: [],
    curricula: [],
    isLoaded: false
  };

  it("should return initial state when no action passed", () => {
    const defaultAction: ActionType = {
      type: "",
      payload: null
    };

    expect(ReferenceDataReducer(undefined, defaultAction)).toEqual(
      initialState
    );
  });

  it("should return updated state when LOAD_REFERENCE_GENDER_SUCCESS action passed", () => {
    const state: ReferenceDataState = {
      ...initialState,
      genders: [],
      isLoaded: true
    };

    const successAction: ActionType = {
      type: LOAD_REFERENCE_GENDER_SUCCESS,
      payload: []
    };

    expect(ReferenceDataReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_REFERENCE_COLLEGES_SUCCESS action passed", () => {
    const state: ReferenceDataState = {
      ...initialState,
      colleges: [],
      isLoaded: true
    };

    const successAction: ActionType = {
      type: LOAD_REFERENCE_COLLEGES_SUCCESS,
      payload: []
    };

    expect(ReferenceDataReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_REFERENCE_QUALIFICATIONS_SUCCESS action passed", () => {
    const state: ReferenceDataState = {
      ...initialState,
      colleges: [],
      isLoaded: true
    };

    const successAction: ActionType = {
      type: LOAD_REFERENCE_QUALIFICATIONS_SUCCESS,
      payload: []
    };

    expect(ReferenceDataReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_REFERENCE_LOCAL_OFFICES_SUCCESS action passed", () => {
    const state: ReferenceDataState = {
      ...initialState,
      localOffices: [],
      isLoaded: true
    };

    const successAction: ActionType = {
      type: LOAD_REFERENCE_LOCAL_OFFICES_SUCCESS,
      payload: []
    };

    expect(ReferenceDataReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_REFERENCE_GRADES_SUCCESS action passed", () => {
    const state: ReferenceDataState = {
      ...initialState,
      grades: [],
      isLoaded: true
    };

    const successAction: ActionType = {
      type: LOAD_REFERENCE_GRADES_SUCCESS,
      payload: []
    };

    expect(ReferenceDataReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_REFERENCE_IMMIGRATION_STATUS_SUCCESS action passed", () => {
    const state: ReferenceDataState = {
      ...initialState,
      immigrationStatus: [],
      isLoaded: true
    };

    const successAction: ActionType = {
      type: LOAD_REFERENCE_IMMIGRATION_STATUS_SUCCESS,
      payload: []
    };

    expect(ReferenceDataReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_REFERENCE_CURRICULA_SUCCESS action passed", () => {
    const state: ReferenceDataState = {
      ...initialState,
      curricula: [],
      isLoaded: true
    };

    const successAction: ActionType = {
      type: LOAD_REFERENCE_CURRICULA_SUCCESS,
      payload: []
    };

    expect(ReferenceDataReducer(initialState, successAction)).toEqual(state);
  });

  test.each([
    LOAD_REFERENCE_GENDER_FAILURE,
    LOAD_REFERENCE_COLLEGES_FAILURE,
    LOAD_REFERENCE_LOCAL_OFFICES_FAILURE,
    LOAD_REFERENCE_QUALIFICATIONS_FAILURE,
    LOAD_REFERENCE_GRADES_FAILURE,
    LOAD_REFERENCE_IMMIGRATION_STATUS_FAILURE,
    LOAD_REFERENCE_CURRICULA_FAILURE
  ])("should return updated state when $a action passed", actionType => {
    const state: ReferenceDataState = {
      ...initialState,
      isLoaded: false
    };

    const failureAction: ActionType = {
      type: actionType,
      payload: null
    };

    expect(ReferenceDataReducer(initialState, failureAction)).toEqual(state);
  });
});
