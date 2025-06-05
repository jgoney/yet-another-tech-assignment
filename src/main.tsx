import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "@fontsource/fjalla-one";
import "@fontsource-variable/libre-franklin";
import "@fontsource-variable/work-sans";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
