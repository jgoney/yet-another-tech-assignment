import styled from "styled-components";

import { Colors } from "../../styles/common/colors";
import { FontDefs } from "../../styles/common/typography";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  border: 0.1rem solid ${Colors.Green};
  width: 10rem;
  padding: 1rem;
  text-align: center;
`;

const DayName = styled.div`
  ${FontDefs.th}
  text-transform: uppercase;
`;

export { Wrapper, DayName };
