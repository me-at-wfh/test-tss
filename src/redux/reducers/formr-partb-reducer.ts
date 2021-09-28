import {
  ActionType,
  FormRPartBListState,
  FormRPartBState,
  FormSwitchesState
} from "../types";
import {
  LOADING_FORMR_PARTB_LIST,
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

const formRPartBListState: FormRPartBListState = {
  submittedForms: [],
  isLoading: false
};

export function FormRPartBListReducer(
  state = formRPartBListState,
  action: ActionType
): FormRPartBListState {
  switch (action.type) {
    case LOADING_FORMR_PARTB_LIST:
      return {
        ...state,
        isLoading: true
      };
    case LOAD_FORMR_PARTB_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        submittedForms: action.payload
      };
    case LOAD_FORMR_PARTB_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
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
