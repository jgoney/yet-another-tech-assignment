import React, { useMemo } from "react";

import { format, isToday } from "date-fns";

import { Day, Placeholder } from "../../components/Day";
import { Header } from "../../components/Header";
import { useFetchProgramData } from "../../hooks";
import { getCalendar } from "./helpers";

import * as S from "./Calendar.styled";

import type { Activity } from "../../types";

interface CalendarProps {
  date?: Date;
}

const Calendar = ({ date }: CalendarProps) => {
  const { loading, program, error } = useFetchProgramData();

  const calendar = useMemo(() => {
    return getCalendar({ program, date });
  }, [program, date]);

  // TODO: implement a proper loading spinner
  if (loading) {
    return <p>Loading...</p>;
  }

  // TODO: implement a proper error page
  if (error) {
    return <p>Error! {error.message}</p>;
  }

  return (
    <S.CalGrid>
      <S.CalTitle>Weekly Program</S.CalTitle>
      <Header isTop={true} />
      {calendar.map((activity: Activity | null, i) => {
        if (activity) {
          return (
            <Day
              key={i}
              isToday={isToday(activity.date)}
              date={format(activity.date, "d")}
              activityTitle={activity.title}
            />
          );
        }

        return <Placeholder key={i} />;
      })}
    </S.CalGrid>
  );
};

export { Calendar };
