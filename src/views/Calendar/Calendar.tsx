import React, { useEffect, useState } from "react";

import {
  addDays,
  endOfMonth,
  format,
  getDaysInMonth,
  getISODay,
  isToday,
  startOfMonth,
  startOfISOWeek,
  endOfISOWeek,
  isSameMonth,
  isMonday,
} from "date-fns";

import { Day, Placeholder } from "../../components/Day";
import { Header } from "../../components/Header";
import { WeekdayEnum } from "../../types";

import * as S from "./Calendar.styled";

type WeekNumber = `week${number}`;

interface Activity {
  weekday: WeekdayEnum;
  title: string;
  completed: boolean;
}

type Week = Array<Activity>;

type Plan = Record<WeekNumber, Week>;

interface ProgramFetcher {
  loading: boolean;
  program?: Plan;
  error?: Error;
}

const getData = async (): Promise<ProgramFetcher> => {
  try {
    const res = await fetch("/program.json");
    const json = await res.json();
    return new Promise<ProgramFetcher>((resolve) => {
      resolve({ program: json, loading: false });
    });
  } catch (error) {
    return new Promise<ProgramFetcher>((resolve) => {
      // TODO: handle actual error here
      resolve({
        error: new Error(`an error occurred: ${error}`),
        loading: false,
      });
    });
  }
};

interface ActivityWithDate extends Activity {
  date: Date;
}

interface GetCalendarParams {
  program?: Plan;
  date?: Date;
}
const getCalendar = ({
  date,
  program,
}: GetCalendarParams): Array<ActivityWithDate> => {
  // Return an empty array in the unlikely event that this is called with no program data
  if (!program) {
    return [];
  }
  const today = date || new Date();
  const first = startOfMonth(today);

  // Subtract 1, getISODay is 1-indexed
  const headPadding = getISODay(first) - 1;

  // Subtract day number from 7 to get remaining placeholders for the week
  const tailPadding = 7 - getISODay(endOfMonth(today));

  // Construct placeholder arrays to account for blank spaces
  // at the beginning and end of the month
  const frontPlaceholders = Array(headPadding).fill(null);
  const endPlaceholders = Array(tailPadding).fill(null);

  let plan: Week | null = null;
  let planKey: WeekNumber | null = null;
  let todaysActivity: Activity | null = null;

  const days = Array(getDaysInMonth(today))
    .fill(null)
    .map((_, i) => {
      const d = addDays(first, i);

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
      } as ActivityWithDate;
    });

  return frontPlaceholders.concat(days, endPlaceholders);
};

interface CalendarProps {
  date?: Date;
}

const Calendar = ({ date }: CalendarProps) => {
  const [data, setData] = useState<ProgramFetcher>({
    loading: true,
  });

  const { loading, program, error } = data;

  useEffect(() => {
    getData().then(setData);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  return (
    <S.CalGrid>
      <S.CalTitle>Weekly Program</S.CalTitle>
      <Header />
      {getCalendar({ program, date }).map(
        (date: ActivityWithDate | null, i) => {
          if (date) {
            return (
              <Day
                key={i}
                isToday={isToday(date.date)}
                date={format(date.date, "dd")}
                activityTitle={date.title}
              />
            );
          }

          return <Placeholder key={i} />;
        },
      )}
    </S.CalGrid>
  );
};

export { Calendar };
