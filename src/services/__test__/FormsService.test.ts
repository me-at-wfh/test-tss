import { AxiosResponse } from "axios";
import { FormsService } from "../FormsService";
import { submittedFormRPartAs } from "../../mock-data/submitted-formr-parta";
import { submittedFormRPartBs } from "../../mock-data/submitted-formr-partb";

const mockService = new FormsService();
describe("FormsService", () => {
  it("getTraineeFormRPartA method should return success response", () => {
    const successResponse: Promise<AxiosResponse<any>> = Promise.resolve({
      data: submittedFormRPartAs,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {}
    });

    jest.spyOn(mockService, "get").mockReturnValue(successResponse);

    expect(mockService.getTraineeFormRPartAList()).toEqual(successResponse);
  });

  it("saveTraineeFormRPartA method should return success response", () => {
    const successResponse: Promise<AxiosResponse<any>> = Promise.resolve({
      data: submittedFormRPartAs[0],
      status: 200,
      statusText: "OK",
      headers: {},
      config: {}
    });

    jest.spyOn(mockService, "post").mockReturnValue(successResponse);

    expect(mockService.saveTraineeFormRPartA(submittedFormRPartAs[0])).toEqual(
      successResponse
    );
  });

  it("getTraineeFormRPartB method should return success response", () => {
    const successResponse: Promise<AxiosResponse<any>> = Promise.resolve({
      data: submittedFormRPartBs,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {}
    });

    jest.spyOn(mockService, "get").mockReturnValue(successResponse);

    expect(mockService.getTraineeFormRPartAList()).toEqual(successResponse);
  });

  it("saveTraineeFormRPartB method should return success response", () => {
    const successResponse: Promise<AxiosResponse<any>> = Promise.resolve({
      data: submittedFormRPartBs[0],
      status: 200,
      statusText: "OK",
      headers: {},
      config: {}
    });

    jest.spyOn(mockService, "post").mockReturnValue(successResponse);

    expect(mockService.saveTraineeFormRPartB(submittedFormRPartBs[0])).toEqual(
      successResponse
    );
  });
});
