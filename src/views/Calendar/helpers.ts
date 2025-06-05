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
  isBefore,
  isSameDay,
} from "date-fns";

import type { Activity, Plan, WeekNumber } from "../../types";

type PlanKey = WeekNumber | null;

function getNextPlanKey(planKey: PlanKey): PlanKey {
  switch (planKey) {
    case null: {
      return "week1";
    }
    case "week1": {
      return "week2";
    }
    case "week2": {
      return "week3";
    }
    default: {
      return null;
    }
  }
}

interface GetCalendarParams {
  program?: Plan;
  today: Date;
}
const getCalendar = ({
  today,
  program,
}: GetCalendarParams): Array<Activity> => {
  // Return an empty array in the unlikely event that this is called with no program data
  if (!program) {
    return [];
  }
  const firstOfMonth = startOfMonth(today);

  // Construct placeholder arrays to account for blank spaces at the beginning and end of the month
  // Subtract 1; getISODay is 1-indexed
  const frontPlaceholders = Array(getISODay(firstOfMonth) - 1).fill(null);

  // Subtract day number from 7 to get remaining placeholders for the week
  const endPlaceholders = Array(7 - getISODay(endOfMonth(today))).fill(null);

  let planKey: PlanKey = null;

  const incompleteQueue: Array<Activity> = [];
  // Construct valid days for a given calendar month
  const days = Array(getDaysInMonth(today))
    .fill(null)
    .map((_, i) => {
      // Current day is the first offset by iterator index (0-indexed)
      const d = addDays(firstOfMonth, i);
      const dayName = format(d, "EEEE").toUpperCase();

      const isFullWeek = isSameMonth(startOfISOWeek(d), endOfISOWeek(d));
      const isNewWeek = isMonday(d);
      const isPast = isBefore(d, today);
      const isToday = isSameDay(d, today);

      if (isFullWeek) {
        if (isNewWeek) {
          planKey = getNextPlanKey(planKey);
        }

        if (planKey) {
          // Get that week's plan activities
          const plan = program[planKey];

          for (const activity of plan) {
            if (activity.weekday === dayName) {
              if (activity.completed) {
                // if weekday matches and activity is completed, show if in the past or today.
                // n.b., there shouldn't be completed tasks in the future, but this isn't
                // really defined in the spec.
                return {
                  date: d,
                  title: isPast || isToday ? activity.title : "",
                };
              }
              // otherwise, add activity to queue to be shown later
              incompleteQueue.push(activity);
            }
          }
        }
      }

      // grab activites from the queue if we're not in the past
      if (!isPast) {
        const act = incompleteQueue.shift();
        return {
          date: d,
          title: act?.title || "",
        };
      }

      // Finally, return no activity title if there are none applicable
      return {
        date: d,
        title: "",
      };
    });

  return frontPlaceholders.concat(days, endPlaceholders);
};

export { getCalendar };
