import styled from "styled-components";

import { Colors } from "../../styles/common/colors";
import { FontDefs } from "../../styles/common/typography";

interface Props {
  $isFirst?: boolean;
  $isTop?: boolean;
}

const Wrapper = styled.div<Props>`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  border: 0.1rem solid ${Colors.Green};

  ${({ $isTop }) => ($isTop ? "border-top-width: 0.15rem;" : "")}

  padding: 0.5rem;
  text-align: center;
  grid-column: span 1;
  min-width: 4vw;

  ${({ $isFirst }) => ($isFirst ? "grid-column-start: 1;" : "")}
`;

const DayName = styled.div`
  ${FontDefs.th}
  text-transform: uppercase;
`;

export { Wrapper, DayName };
