import React from "react";

import { WeekdayEnum } from "../../types";

import * as S from "./Header.styled";

import type { Weekdays } from "../../types";

interface HeaderProps {
  dayName: Weekdays;
  isFirst?: boolean;
  isTop?: boolean;
}

const HeaderDay = ({ dayName, isFirst, isTop }: HeaderProps) => {
  const shortDay = dayName.slice(0, 3);

  return (
    <S.Wrapper $isFirst={isFirst} $isTop={isTop}>
      <S.DayName>{shortDay}</S.DayName>
    </S.Wrapper>
  );
};

const Header = ({ isTop }: Pick<HeaderProps, "isTop">) => {
  return (
    <>
      {Object.keys(WeekdayEnum).map((elem, i) => {
        return (
          <HeaderDay
            key={i}
            dayName={elem as Weekdays}
            isFirst={i === 0}
            isTop={isTop}
          />
        );
      })}
    </>
  );
};

export { Header, HeaderDay };
