import { ActionType } from "../types";
import {
  LOAD_FORMR_PARTA_LIST_SUCCESS,
  LOAD_FORMR_PARTA_LIST_FAILURE,
  UPDATE_FORMR_PARTA,
  LOAD_FORMR_PARTA_FAILURE,
  LOAD_FORMR_PARTA_SUCCESS,
  LOADING_FORMR_PARTA_LIST
} from "../action_types";
import { FormRPartA } from "../../models/FormRPartA";
import { FormsService } from "../../services/FormsService";
import { TraineeProfileService } from "../../services/TraineeProfileService";
import { ProfileToFormRPartAInitialValues } from "../../models/ProfileToFormRPartAInitialValues";

export const loadFormRPartAList = (formService: FormsService) => (
  dispatch: (action: ActionType) => any
) => {
  dispatch({ type: LOADING_FORMR_PARTA_LIST, payload: true });
  return formService
    .getTraineeFormRPartAList()
    .then(response => {
      dispatch({
        type: LOAD_FORMR_PARTA_LIST_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: LOAD_FORMR_PARTA_LIST_FAILURE,
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
      type: LOAD_FORMR_PARTA_SUCCESS,
      payload: ProfileToFormRPartAInitialValues(response.data)
    });
  } catch (error) {
    dispatch({
      type: LOAD_FORMR_PARTA_FAILURE,
      payload: error
    });
  }
};

export const loadSavedForm = (formService: FormsService, formId: string) => (
  dispatch: (action: ActionType) => any
) => {
  return formService
    .getTraineeFormRPartAByFormId(formId)
    .then(response => {
      dispatch({
        type: LOAD_FORMR_PARTA_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: LOAD_FORMR_PARTA_FAILURE,
        payload: null
      });
    });
};

export const updateFormData = (formData: FormRPartA | null) => async (
  dispatch: (action: ActionType) => any
) => {
  return dispatch({
    type: UPDATE_FORMR_PARTA,
    payload: formData
  });
};

export const saveTraineeFormRPartA = (
  formService: FormsService,
  formData: FormRPartA
) => (dispatch: (action: ActionType) => any) => {
  return formData.id
    ? formService.updateTraineeFormRPartA(formData)
    : formService.saveTraineeFormRPartA(formData);
};
