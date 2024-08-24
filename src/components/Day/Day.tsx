import * as S from "./Day.styled";

interface DayProps {
  activityTitle: string;
  date: number;
  isToday: boolean;
}

const Day = ({ activityTitle, date, isToday }: DayProps) => {
  const hasActivity = !!activityTitle;

  return (
    <S.Wrapper $isToday={isToday} $hasActivity={hasActivity}>
      <S.DayNumber>{date}</S.DayNumber>
      <S.ActivityTitle $isToday={isToday}>{activityTitle}</S.ActivityTitle>
    </S.Wrapper>
  );
};

export { Day };
