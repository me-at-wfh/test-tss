import ApiService from "./apiService";
import { AxiosResponse } from "axios";

export class TraineeReferenceService extends ApiService {
  constructor() {
    super("/reference/api");
  }

  getGenders(): Promise<AxiosResponse<any>> {
    return this.get("/gender");
  }

  getQualifications(): Promise<AxiosResponse<any>> {
    return this.get("/qualification");
  }

  getColleges(): Promise<AxiosResponse<any>> {
    return this.get("/college");
  }

  getLocalOffices(): Promise<AxiosResponse<any>> {
    return this.get("/local-office");
  }

  getTrainingGrades(): Promise<AxiosResponse<any>> {
    return this.get("/grade");
  }

  getImmigrationStatus(): Promise<AxiosResponse<any>> {
    return this.get("/immigration-status");
  }

  getCurricula(): Promise<AxiosResponse<any>> {
    return this.get("/curriculum");
  }

  getDeclarationType(): Promise<AxiosResponse<any>> {
    return this.get("/declaration-type");
  }

  getCovidChangeCircs(): Promise<AxiosResponse<any>> {
    return this.get("/covid-change-circs");
  }
}
