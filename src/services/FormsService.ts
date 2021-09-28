import { AxiosResponse } from "axios";
import ApiService from "./apiService";
import { FormRPartA } from "../models/FormRPartA";
import { FormRPartB, FormSwitch } from "../models/FormRPartB";

export class FormsService extends ApiService {
  constructor() {
    super("/api/forms");
  }

  async saveTraineeFormRPartA(
    formData: FormRPartA
  ): Promise<AxiosResponse<FormRPartA>> {
    return this.post<FormRPartA>("/formr-parta", formData);
  }

  async updateTraineeFormRPartA(
    formData: FormRPartA
  ): Promise<AxiosResponse<FormRPartA>> {
    return this.put<FormRPartA>("/formr-parta", formData);
  }

  async getTraineeFormRPartAList(): Promise<AxiosResponse<FormRPartA[]>> {
    return this.get<FormRPartA[]>("/formr-partas");
  }

  async getTraineeFormRPartAByFormId(
    id: string
  ): Promise<AxiosResponse<FormRPartA>> {
    return this.get<FormRPartA>(`/formr-parta/${id}`);
  }
  async saveTraineeFormRPartB(
    formData: FormRPartB
  ): Promise<AxiosResponse<FormRPartB>> {
    const {
      isDeclarationAccepted,
      isConsentAccepted,
      ...newFormData
    } = formData;
    return this.post<FormRPartB>("/formr-partb", newFormData);
  }

  async getTraineeFormRPartBList(): Promise<AxiosResponse<FormRPartB[]>> {
    return this.get<FormRPartB[]>("/formr-partbs");
  }

  async getTraineeFormRPartBByFormId(
    id: string
  ): Promise<AxiosResponse<FormRPartB>> {
    return this.get<FormRPartB>(`/formr-partb/${id}`);
  }

  async updateTraineeFormRPartB(
    formData: FormRPartB
  ): Promise<AxiosResponse<FormRPartB>> {
    const {
      isDeclarationAccepted,
      isConsentAccepted,
      ...newFormData
    } = formData;
    return this.put<FormRPartB>("/formr-partb", newFormData);
  }

  async getFormSwitches(): Promise<AxiosResponse<FormSwitch[]>> {
    return this.get<FormSwitch[]>("/form-switches");
  }
}
