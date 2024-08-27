import React from "react";

import * as S from "./Header.styled";

import type { Weekdays } from "../../types";

interface HeaderProps {
  dayName: Weekdays;
}

const Header = ({ dayName }: HeaderProps) => {
  const shortDay = dayName.slice(0, 3);

  return (
    <S.Wrapper>
      <S.DayName>{shortDay}</S.DayName>
    </S.Wrapper>
  );
};

export { Header };
