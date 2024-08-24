import styled from "styled-components";

import { Colors } from "../../styles/common/colors";
import { FontDefs } from "../../styles/common/typography";

interface WrapperProps {
  $isToday: boolean;
  $hasActivity: boolean;
}

type ActivityTitleProps = Pick<WrapperProps, "$isToday">;

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  border: 0.1rem solid ${Colors.Green};
  width: 10rem;
  aspect-ratio: 1 / 1;
  padding: 1rem;
  text-align: center;

  background-color: ${({ $isToday }: WrapperProps): string => {
    if ($isToday) {
      return Colors.Green;
    }
    return Colors.White;
  }};

  ${({ $isToday }: WrapperProps): string => {
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

const DayNumber = styled.div`
  ${FontDefs.h2}
  margin-top: 2rem;
`;

const ActivityTitle = styled.p<ActivityTitleProps>`
  ${FontDefs.th}
  text-transform: uppercase;

  color: ${({ $isToday }: ActivityTitleProps): string => {
    if ($isToday) {
      return Colors.White;
    }
    return Colors.Black;
  }};
`;

export { Wrapper, DayNumber, ActivityTitle };

export type { WrapperProps };
