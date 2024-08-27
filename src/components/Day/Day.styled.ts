import styled from "styled-components";

import { Colors } from "../../styles/common/colors";
import { FontDefs } from "../../styles/common/typography";

interface Props {
  $isToday: boolean;
  $hasActivity: boolean;
}

const Wrapper = styled.div<Pick<Props, "$isToday">>`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  border: 0.1rem solid ${Colors.Green};
  width: 10rem;
  aspect-ratio: 1 / 1;
  padding: 1rem;
  text-align: center;

  background-color: ${({ $isToday }): string => {
    if ($isToday) {
      return Colors.Green;
    }
    return Colors.White;
  }};

  ${({ $isToday }): string => {
    if ($isToday) {
      return `
        color: ${Colors.White};
        background-color: ${Colors.Green};
      `;
    }
    return `
      color: ${Colors.Green};
      background-color: ${Colors.White};
    `;
  }};
`;

const DayNumber = styled.div<Props>`
  ${FontDefs.h2}
  margin-top: 2rem;

  color: ${({ $isToday, $hasActivity }): string => {
    if ($isToday) {
      return Colors.White;
    }
    if ($hasActivity) {
      return Colors.Green;
    }
    return Colors.Black;
  }};
`;

const ActivityTitle = styled.p<Pick<Props, "$isToday">>`
  ${FontDefs.th}
  text-transform: uppercase;

  color: ${({ $isToday }): string => {
    if ($isToday) {
      return Colors.White;
    }
    return Colors.Black;
  }};
`;

export { Wrapper, DayNumber, ActivityTitle };

export type { Props };
