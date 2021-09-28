import { ActionType, FormRPartAState, FormRPartAListState } from "../types";
import {
  UPDATE_FORMR_PARTA,
  LOAD_FORMR_PARTA_LIST_SUCCESS,
  LOAD_FORMR_PARTA_LIST_FAILURE,
  LOAD_FORMR_PARTA_SUCCESS,
  LOAD_FORMR_PARTA_FAILURE
} from "../action_types";

const formRPartAState: FormRPartAState = {
  formData: null
};

export function FormRPartAReducer(
  state = formRPartAState,
  action: ActionType
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
  submittedForms: []
};

export function FormRPartAListReducer(
  state = formRPartAListState,
  action: ActionType
): FormRPartAListState {
  switch (action.type) {
    case LOAD_FORMR_PARTA_LIST_SUCCESS:
      return {
        ...state,
        submittedForms: action.payload
      };
    case LOAD_FORMR_PARTA_LIST_FAILURE:
      return {
        ...state,
        submittedForms: []
      };
    default:
      return state;
  }
}
