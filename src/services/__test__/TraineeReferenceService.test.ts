import { TraineeReferenceService } from "../TraineeReferenceService";
import { AxiosResponse } from "axios";

const mockService = new TraineeReferenceService();
describe("TraineeReferenceService", () => {
  it("all methods should return success response", () => {
    const successResponse: Promise<AxiosResponse<any>> = Promise.resolve({
      data: [],
      status: 200,
      statusText: "OK",
      headers: {},
      config: {}
    });

    jest.spyOn(mockService, "get").mockReturnValue(successResponse);

    expect(mockService.getGenders()).toEqual(successResponse);
    expect(mockService.getColleges()).toEqual(successResponse);
    expect(mockService.getCurricula()).toEqual(successResponse);
    expect(mockService.getDesignatedBodies()).toEqual(successResponse);
    expect(mockService.getLocalOffices()).toEqual(successResponse);
    expect(mockService.getImmigrationStatus()).toEqual(successResponse);
    expect(mockService.getQualifications()).toEqual(successResponse);
    expect(mockService.getTrainingGrades()).toEqual(successResponse);
  });

  it("all methods should return failure response", () => {
    const errorResponse = {
      data: null,
      status: 500,
      statusText: "Internal server error",
      headers: {},
      config: {}
    };

    jest
      .spyOn(mockService, "get")
      .mockReturnValue(Promise.reject(errorResponse));

    const expectedResponse = Promise.resolve(errorResponse);

    expect(mockService.getGenders()).toEqual(expectedResponse);
    expect(mockService.getColleges()).toEqual(expectedResponse);
    expect(mockService.getCurricula()).toEqual(expectedResponse);
    expect(mockService.getDesignatedBodies()).toEqual(expectedResponse);
    expect(mockService.getLocalOffices()).toEqual(expectedResponse);
    expect(mockService.getImmigrationStatus()).toEqual(expectedResponse);
    expect(mockService.getQualifications()).toEqual(expectedResponse);
    expect(mockService.getTrainingGrades()).toEqual(expectedResponse);
  });
});
