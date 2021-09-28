import { ActionType, FormRPartAState, FormRPartAListState } from "../types";
import {
  UPDATE_FORMR_PARTA,
  LOADING_FORMR_PARTA_LIST,
  LOAD_FORMR_PARTA_LIST_SUCCESS,
  LOAD_FORMR_PARTA_LIST_FAILURE,
  LOAD_FORMR_PARTA_SUCCESS,
  LOAD_FORMR_PARTA_FAILURE
} from "../action_types";

const formRPartAState: FormRPartAState = {
  formData: null
};

export function FormRPartAReducer(
  state: FormRPartAState = formRPartAState,
  action: ActionType = {
    type: "",
    payload: ""
  }
): FormRPartAState {
  switch (action.type) {
    case UPDATE_FORMR_PARTA:
    case LOAD_FORMR_PARTA_SUCCESS:
      return {
        ...state,
        formData: action.payload
      };
    case LOAD_FORMR_PARTA_FAILURE:
      return {
        ...state,
        formData: null
      };
    default:
      return state;
  }
}

const formRPartAListState: FormRPartAListState = {
  submittedForms: [],
  isLoading: false
};

export function FormRPartAListReducer(
  state: FormRPartAListState = formRPartAListState,
  action: ActionType = {
    type: "",
    payload: ""
  }
): FormRPartAListState {
  switch (action.type) {
    case LOADING_FORMR_PARTA_LIST:
      return {
        ...state,
        isLoading: true
      };
    case LOAD_FORMR_PARTA_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        submittedForms: action.payload
      };
    case LOAD_FORMR_PARTA_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        submittedForms: []
      };
    default:
      return state;
  }
}
