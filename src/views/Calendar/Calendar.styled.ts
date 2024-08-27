import styled from "styled-components";

import { Colors } from "../../styles/common/colors";
import { FontDefs } from "../../styles/common/typography";

const CalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 0fr);
  justify-content: center;
  align-items: stretch;
  justify-items: center;
  border: 0.3rem solid ${Colors.Green};
  background-color: ${Colors.White};
  filter: drop-shadow(0 0 0.5rem ${Colors.Black});
`;

const CalTitle = styled.h1`
  ${FontDefs.h1}
  grid-column: 1/-1;
`;

export { CalGrid, CalTitle };
