import React from "react";

import { WeekdayEnum } from "../../types";

import * as S from "./Header.styled";

import type { Weekdays } from "../../types";

interface HeaderProps {
  dayName: Weekdays;
  isFirst?: boolean;
}

const HeaderDay = ({ dayName, isFirst }: HeaderProps) => {
  const shortDay = dayName.slice(0, 3);

  return (
    <S.Wrapper $isFirst={isFirst}>
      <S.DayName>{shortDay}</S.DayName>
    </S.Wrapper>
  );
};

const Header = () => {
  return (
    <>
      {Object.keys(WeekdayEnum).map((elem, i) => {
        return (
          <HeaderDay key={i} dayName={elem as Weekdays} isFirst={i === 0} />
        );
      })}
    </>
  );
};

export { Header, HeaderDay };
