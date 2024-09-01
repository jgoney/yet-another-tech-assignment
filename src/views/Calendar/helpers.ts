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
} from "date-fns";

import type { Activity, Plan, Week, WeekNumber } from "../../types";

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

  let plan: Week | null = null;
  let planKey: WeekNumber | null = null;

  const queue: Array<Activity> = [];
  // Construct valid days for a given calendar month
  const days = Array(getDaysInMonth(today))
    .fill(null)
    .map((_, i) => {
      // Current day is the first offset by iterator index (0-indexed)
      const d = addDays(firstOfMonth, i);
      const dayName = format(d, "EEEE").toUpperCase();

      // TODO: refactor
      const isFullWeek = isSameMonth(startOfISOWeek(d), endOfISOWeek(d));
      const isNewWeek = isMonday(d);
      const isPast = isBefore(d, today);

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
          // Get that week's plan activities
          plan = program[planKey];

          for (const [j, activity] of plan.entries()) {
            if (activity.weekday === dayName) {
              if (activity.completed) {
                // if weekday matches and activity is completed, show no matter what
                return {
                  date: d,
                  title: activity.title,
                  completed: activity.completed,
                } as Activity;
              } else {
                // if weekday matches and activity is not completed, never show, add to queue
                if (isPast) {
                  queue.push(activity);
                  break;
                } else {
                  if (queue.length) {
                    queue.push(activity);
                    const act = queue.shift();
                    return {
                      date: d,
                      title: act?.title,
                      completed: act?.completed,
                    } as Activity;
                  } else {
                    return {
                      date: d,
                      title: activity.title,
                      completed: activity.completed,
                    } as Activity;
                  }
                }
              }
            } else {
              // if weekday does not match, we're in the present/future, and
              // there's an incomplete activity in the queue, pop it and display it
              if (!isPast && queue.length && j === plan.length - 1) {
                const act = queue.shift();
                return {
                  date: d,
                  title: act?.title,
                  completed: act?.completed,
                } as Activity;
              }
            }
          }
        }
      }

      // Finally, check to see if we need to clear the queue from incomplete activities
      if (!isPast && queue.length) {
        const act = queue.shift();
        return {
          date: d,
          title: act?.title,
          completed: act?.completed,
        } as Activity;
      }

      return {
        date: d,
        title: "",
      } as Activity;
    });

  return frontPlaceholders.concat(days, endPlaceholders);
};

export { getCalendar };
