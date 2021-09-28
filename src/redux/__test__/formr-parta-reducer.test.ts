import { ActionType, FormRPartAState, FormRPartAListState } from "../types";
import {
  UPDATE_FORMR_PARTA,
  LOAD_FORMR_PARTA_LIST_SUCCESS,
  LOAD_FORMR_PARTA_LIST_FAILURE
} from "../action_types";
import {
  FormRPartAReducer,
  FormRPartAListReducer
} from "../reducers/formr-parta-reducer";

describe("Load form-r part-a reducer", () => {
  const initialState: FormRPartAState = {
    formData: null
  };

  it("should return initial state when no action passed", () => {
    const defaultAction: ActionType = {
      type: "",
      payload: null
    };

    expect(FormRPartAReducer(undefined, defaultAction)).toEqual(initialState);
  });

  it("should return updated state when UPDATE_FORMR_PARTA action passed", () => {
    const state: FormRPartAState = {
      ...initialState,
      formData: null
    };

    const successAction: ActionType = {
      type: UPDATE_FORMR_PARTA,
      payload: null
    };

    expect(FormRPartAReducer(initialState, successAction)).toEqual(state);
  });
});

describe("Load form-r part-a list reducer", () => {
  const initialState: FormRPartAListState = {
    submittedForms: [],
    isLoading: false
  };

  it("should return initial state when no action passed", () => {
    const defaultAction: ActionType = {
      type: "",
      payload: null
    };

    expect(FormRPartAListReducer(undefined, defaultAction)).toEqual(
      initialState
    );
  });

  it("should return updated state when LOAD_FORMR_PARTA_LIST_SUCCESS action passed", () => {
    const state: FormRPartAListState = {
      ...initialState,
      submittedForms: []
    };

    const successAction: ActionType = {
      type: LOAD_FORMR_PARTA_LIST_SUCCESS,
      payload: []
    };

    expect(FormRPartAListReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_FORMR_PARTA_LIST_FAILURE action passed", () => {
    const state: FormRPartAListState = {
      ...initialState
    };

    const failureAction: ActionType = {
      type: LOAD_FORMR_PARTA_LIST_FAILURE,
      payload: null
    };

    expect(FormRPartAListReducer(initialState, failureAction)).toEqual(state);
  });
});
