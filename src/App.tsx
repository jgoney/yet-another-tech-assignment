import React from "react";

import { Calendar } from "./views/Calendar";

import * as S from "./App.styled";

function App() {
  return (
    <S.AppWrapper className="App">
      <Calendar />
    </S.AppWrapper>
  );
}

export default App;
