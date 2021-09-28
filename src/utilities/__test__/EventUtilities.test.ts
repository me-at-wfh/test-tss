import { EventUtilities } from "../EventUtilities";

describe("handleBeforeUnload", () => {
  it("should should call handleBeforeUnload on browser refresh ", () => {
    EventUtilities.handleBeforeUnload = jest.fn(beforeunloadEvent => {
      const confirmMsg = "test";
      beforeunloadEvent.returnValue = confirmMsg;
      return confirmMsg;
    });
    window.addEventListener("beforeunload", EventUtilities.handleBeforeUnload);
    window.dispatchEvent(new Event("beforeunload"));
    expect(EventUtilities.handleBeforeUnload).toHaveBeenCalled();
    expect(EventUtilities.handleBeforeUnload).toHaveReturnedWith("test");
  });
});
