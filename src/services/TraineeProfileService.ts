import { AxiosResponse } from "axios";
import ApiService from "./apiService";
import { TraineeProfile } from "../models/TraineeProfile";

export class TraineeProfileService extends ApiService {
  constructor() {
    super("/trainee/api");
  }

  async getTraineeProfile(): Promise<AxiosResponse<TraineeProfile>> {
    return this.get<TraineeProfile>(
      `/trainee-profile/trainee/${this.traineeTisId}`
    );
  }
}
