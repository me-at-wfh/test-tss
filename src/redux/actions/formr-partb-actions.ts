import { ActionType } from "../types";
import {
  LOAD_FORMR_PARTB,
  LOAD_FORMR_PARTB_LIST_SUCCESS,
  LOAD_FORMR_PARTB_LIST_FAILURE,
  INITIALIZE_FORMR_PARTB_FAILURE,
  INITIALIZE_FORMR_PARTB_SUCCESS,
  MOVE_TO_SECTION,
  EDIT_FORMR_PARTB,
  LOAD_FORM_SWITCHES_SUCCESS,
  LOAD_FORM_SWITCHES_FAILURE
} from "../action_types";
import { FormRPartB } from "../../models/FormRPartB";
import { FormsService } from "../../services/FormsService";
import { TraineeProfileService } from "../../services/TraineeProfileService";
import { ProfileToFormRPartBInitialValues } from "../../models/ProfileToFormRPartBInitialValues";

export const loadFormRPartBList = (formService: FormsService) => (
  dispatch: (action: ActionType) => any
) => {
  return formService
    .getTraineeFormRPartBList()
    .then(response => {
      return dispatch({
        type: LOAD_FORMR_PARTB_LIST_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      return dispatch({
        type: LOAD_FORMR_PARTB_LIST_FAILURE,
        payload: error
      });
    });
};

export const initializeForm = (
  traineeProfileService: TraineeProfileService
) => async (dispatch: (action: ActionType) => any) => {
  try {
    const response = await traineeProfileService.getTraineeProfile();
    dispatch({
      type: INITIALIZE_FORMR_PARTB_SUCCESS,
      payload: ProfileToFormRPartBInitialValues(response.data)
    });
  } catch (error) {
    dispatch({
      type: INITIALIZE_FORMR_PARTB_FAILURE,
      payload: error
    });
  }
};

export const loadForm = (formData: FormRPartB | null) => async (
  dispatch: (action: ActionType) => any
) => {
  return dispatch({
    type: LOAD_FORMR_PARTB,
    payload: formData
  });
};

export const loadSavedForm = (formService: FormsService, formId: string) => (
  dispatch: (action: ActionType) => any
) => {
  return formService
    .getTraineeFormRPartBByFormId(formId)
    .then(response => {
      dispatch({
        type: INITIALIZE_FORMR_PARTB_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: INITIALIZE_FORMR_PARTB_FAILURE,
        payload: null
      });
    });
};

export const editForm = (formData: FormRPartB, section: number) => (
  dispatch: (action: ActionType) => any
) => {
  return dispatch({
    type: EDIT_FORMR_PARTB,
    payload: { formData, section }
  });
};

export const saveForm = (formService: FormsService, formData: FormRPartB) => (
  dispatch: (action: ActionType) => any
) => {
  return formData.id
    ? formService.updateTraineeFormRPartB(formData)
    : formService.saveTraineeFormRPartB(formData);
};

export const moveToSection = (section: number) => (
  dispatch: (action: ActionType) => any
) => {
  return dispatch({
    type: MOVE_TO_SECTION,
    payload: section
  });
};

export const loadFormSwitches = (formService: FormsService) => (
  dispatch: (action: ActionType) => any
) => {
  return formService
    .getFormSwitches()
    .then(response => {
      dispatch({
        type: LOAD_FORM_SWITCHES_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: LOAD_FORM_SWITCHES_FAILURE,
        payload: null
      });
    });
};
