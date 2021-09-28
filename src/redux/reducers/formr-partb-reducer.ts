import {
  ActionType,
  FormRPartBListState,
  FormRPartBState,
  FormSwitchesState
} from "../types";
import {
  LOAD_FORMR_PARTB_LIST_SUCCESS,
  LOAD_FORMR_PARTB_LIST_FAILURE,
  INITIALIZE_FORMR_PARTB_FAILURE,
  INITIALIZE_FORMR_PARTB_SUCCESS,
  MOVE_TO_SECTION,
  EDIT_FORMR_PARTB,
  LOAD_FORMR_PARTB,
  LOAD_FORM_SWITCHES_SUCCESS,
  LOAD_FORM_SWITCHES_FAILURE
} from "../action_types";

const formRPartAListState: FormRPartBListState = {
  submittedForms: []
};

export function FormRPartBListReducer(
  state = formRPartAListState,
  action: ActionType
): FormRPartBListState {
  switch (action.type) {
    case LOAD_FORMR_PARTB_LIST_SUCCESS:
      return {
        ...state,
        submittedForms: action.payload
      };
    case LOAD_FORMR_PARTB_LIST_FAILURE:
      return {
        ...state,
        submittedForms: []
      };
    default:
      return state;
  }
}

const initialState: FormRPartBState = {
  formData: null,
  section: 0
};

export function FormRPartBReducer(
  state = { ...initialState },
  action: ActionType
): FormRPartBState {
  switch (action.type) {
    case INITIALIZE_FORMR_PARTB_SUCCESS:
      return {
        ...state,
        formData: action.payload,
        section: 0
      };
    case INITIALIZE_FORMR_PARTB_FAILURE:
      return {
        ...state,
        formData: null,
        section: 0
      };
    case LOAD_FORMR_PARTB:
      return {
        ...state,
        formData: action.payload
      };
    case MOVE_TO_SECTION:
      return {
        ...state,
        section: action.payload
      };
    case EDIT_FORMR_PARTB:
    default:
      return {
        ...state
      };
  }
}

const formSwitchesState: FormSwitchesState = {
  formSwitches: []
};

export function FormSwitchesReducer(
  state = formSwitchesState,
  action: ActionType
): FormSwitchesState {
  switch (action.type) {
    case LOAD_FORM_SWITCHES_SUCCESS:
      return {
        ...state,
        formSwitches: action.payload
      };
    case LOAD_FORM_SWITCHES_FAILURE:
      return {
        ...state,
        formSwitches: []
      };
    default:
      return state;
  }
}
