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

interface Activity {
  weekday: WeekdayEnum;
  title: string;
  completed: boolean;
  date: Date;
}

type WeekNumber = `week${number}`;

type Week = Array<Activity>;

type Plan = Record<WeekNumber, Week>;

export { WeekdayEnum };
export type { Activity, Weekdays, Plan, Week, WeekNumber };
