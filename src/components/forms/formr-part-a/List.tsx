import { CreateList } from "../CreateList";
import {
  loadFormRPartAList,
  initializeForm
} from "../../../redux/actions/formr-parta-actions";
import { updateFormData } from "../../../redux/actions/formr-parta-actions";
import { loadSavedForm } from "../../../redux/actions/formr-parta-actions";

export default CreateList(
  loadFormRPartAList,
  updateFormData,
  loadSavedForm,
  initializeForm,
  "formr-a"
);
