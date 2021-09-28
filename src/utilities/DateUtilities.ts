import moment from "moment";

export class DateUtilities {
  public static ToUTCDate(date: Date | string | null): string {
    let utcDate = "";

    if (date) {
      const momentDate = moment(date, moment.ISO_8601);
      utcDate = momentDate.isValid() ? moment(date).format("YYYY-MM-DD") : "";
    }

    return utcDate;
  }

  public static ToLocalDate(date: Date | string | null): string {
    let localDate = "";
    if (date) {
      const momentDate = moment(date, moment.ISO_8601);
      localDate = momentDate.isValid() ? momentDate.format("DD/MM/YYYY") : "";
    }

    return localDate;
  }

  public static IsLegalAge(value: Date | string | null | undefined): boolean {
    if (value) {
      const momentDate = moment(value, moment.ISO_8601);
      return momentDate.isValid() && moment().diff(momentDate, "years") >= 18;
    }
    return false;
  }

  public static IsMoreThanMinDate(
    value: Date | string | null | undefined
  ): boolean {
    if (value) {
      const momentDate = moment(value, moment.ISO_8601);
      return momentDate.isValid() && moment().diff(momentDate, "years") < 100;
    }
    return false;
  }

  public static IsLessThanMaxDate(
    value: Date | string | null | undefined
  ): boolean {
    if (value) {
      const momentDate = moment(value, moment.ISO_8601);
      const maxDate = moment().add(50, "y");
      return momentDate.isValid() && momentDate < maxDate;
    }
    return false;
  }

  public static IsInsideDateRange(
    value: Date | string | null | undefined
  ): boolean {
    if (value) {
      const momentDate = moment(value, moment.ISO_8601);
      const minDate = moment().subtract(10, "y");
      const maxDate = moment().add(10, "y");
      return momentDate.isValid() && momentDate.isBetween(minDate, maxDate);
    }
    return false;
  }

  public static IsPastDate(value: Date | string | null | undefined): boolean {
    if (value) {
      const momentDate = moment(value, moment.ISO_8601);
      return momentDate.isValid() && moment().diff(momentDate, "years") >= 1;
    }
    return false;
  }

  public static IsFutureDate(value: Date | string | null | undefined): boolean {
    if (value) {
      const momentDate = moment(value, moment.ISO_8601);
      return momentDate.isValid() && moment().diff(momentDate, "years") <= 1;
    }
    return false;
  }
}
