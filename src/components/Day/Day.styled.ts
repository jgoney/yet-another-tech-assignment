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
  padding: 1rem;
  aspect-ratio: 1 / 1;
  text-align: center;
  grid-column: span 1;
  width: 8rem;

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

const DayNumber = styled.h2<Props>`
  // Remove browser styling on h2 from i.e., Safari
  margin: 0;

  ${FontDefs.h2}

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

const ActivityTitle = styled.h3<Pick<Props, "$isToday">>`
  // Remove browser styling on h3 from i.e., Safari
  margin: 0;

  ${FontDefs.h3}
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
