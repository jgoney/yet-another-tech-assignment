enum WeekdayEnum {
  Monday = "MONDAY",
  Tuesday = "TUESDAY",
  Wednesday = "WEDNESDAY",
  Thursday = "THURSDAY",
  Friday = "FRIDAY",
  Saturday = "SATURDAY",
  Sunday = "SUNDAY",
}

type Weekdays = `${WeekdayEnum}`;

export { WeekdayEnum };
export type { Weekdays };
