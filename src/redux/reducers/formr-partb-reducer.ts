import {
  ActionType,
  FormRPartBListState,
  FormRPartBState,
  FeatureFlagsState
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
  LOAD_FEATURE_FLAGS_SUCCESS,
  LOAD_FEATURE_FLAGS_FAILURE
} from "../action_types";

const formRPartBListState: FormRPartBListState = {
  submittedForms: [],
  isLoading: false
};

export function FormRPartBListReducer(
  state: FormRPartBListState = formRPartBListState,
  action: ActionType = {
    type: "",
    payload: ""
  }
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
  state: FormRPartBState = { ...initialState },
  action: ActionType = {
    type: "",
    payload: ""
  }
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

const featureFlagsInitialState: FeatureFlagsState = {
  featureFlags: null
};

export function FeatureFlagsReducer(
  state: FeatureFlagsState = featureFlagsInitialState,
  action: ActionType = {
    type: "",
    payload: ""
  }
): FeatureFlagsState {
  switch (action.type) {
    case LOAD_FEATURE_FLAGS_SUCCESS:
      return {
        ...state,
        featureFlags: action.payload
      };
    case LOAD_FEATURE_FLAGS_FAILURE:
      return {
        ...state,
        featureFlags: null
      };
    default:
      return state;
  }
}
