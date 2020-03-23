import React from "react";
import ReactDOM from "react-dom";
import { StylesProvider } from "@material-ui/core/styles";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StylesProvider injectFirst>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StylesProvider>,
  rootElement
);
