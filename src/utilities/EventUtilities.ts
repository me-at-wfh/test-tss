export class EventUtilities {
  public static handleBeforeUnload(event: { returnValue: string }) {
    // modern browsers don't allow custom alert msg
    const confirmMsg = "";
    event.returnValue = confirmMsg;
    return confirmMsg;
  }
}
