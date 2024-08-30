import {
  addDays,
  endOfMonth,
  format,
  getDaysInMonth,
  getISODay,
  startOfMonth,
  startOfISOWeek,
  endOfISOWeek,
  isSameMonth,
  isMonday,
} from "date-fns";

import type { Activity, Plan, Week, WeekNumber } from "../../types";

interface GetCalendarParams {
  program?: Plan;
  date?: Date;
}
const getCalendar = ({ date, program }: GetCalendarParams): Array<Activity> => {
  // Return an empty array in the unlikely event that this is called with no program data
  if (!program) {
    return [];
  }
  const today = date || new Date();
  const firstOfMonth = startOfMonth(today);

  // Construct placeholder arrays to account for blank spaces
  // at the beginning and end of the month
  const frontPlaceholders = Array(getISODay(firstOfMonth) - 1).fill(null); // Subtract 1; getISODay is 1-indexed

  // Subtract day number from 7 to get remaining placeholders for the week
  const endPlaceholders = Array(7 - getISODay(endOfMonth(today))).fill(null);

  let plan: Week | null = null;
  let planKey: WeekNumber | null = null;
  let todaysActivity: Activity | null = null;

  const days = Array(getDaysInMonth(today))
    .fill(null)
    .map((_, i) => {
      const d = addDays(firstOfMonth, i);
      const dayName = format(d, "EEEE").toUpperCase();

      const isFullWeek = isSameMonth(endOfISOWeek(d), startOfISOWeek(d));
      const isNewWeek = isMonday(d);

      if (isFullWeek) {
        if (isNewWeek) {
          switch (planKey) {
            case null: {
              planKey = "week1";
              break;
            }
            case "week1": {
              planKey = "week2";
              break;
            }
            case "week2": {
              planKey = "week3";
              break;
            }
            default: {
              planKey = null;
              break;
            }
          }
        }

        if (planKey) {
          plan = program[planKey];

          for (const activity of plan) {
            if (activity.weekday === dayName) {
              todaysActivity = activity;
              break;
            } else {
              todaysActivity = null;
            }
          }
        }
      }

      return {
        date: d,
        title: todaysActivity?.title || "",
      } as Activity;
    });

  return frontPlaceholders.concat(days, endPlaceholders);
};

export { getCalendar };
