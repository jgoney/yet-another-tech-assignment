import React from "react";

import * as S from "./Day.styled";

interface DayProps {
  activityTitle: string;
  date: number | string;
  isToday: boolean;
}

const Day = ({ activityTitle, date, isToday }: DayProps) => {
  const hasActivity = !!activityTitle;

  return (
    <S.Wrapper $isToday={isToday}>
      <S.DayNumber $isToday={isToday} $hasActivity={hasActivity}>
        {date}
      </S.DayNumber>
      <S.ActivityTitle $isToday={isToday}>{activityTitle}</S.ActivityTitle>
    </S.Wrapper>
  );
};

const Placeholder = () => {
  return <S.Wrapper $isToday={false}></S.Wrapper>;
};

export { Day, Placeholder };
