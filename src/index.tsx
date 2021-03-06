import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider,createGlobalStyle } from "styled-components";
import {Themes} from "./theme"


const GlobalStyle = createGlobalStyle`
  body {
    margin: ${props => (props.theme.bodyMargin )};
    background-color:${props => (props.theme.bodyColor)};
  }
`

ReactDOM.render(
  <ThemeProvider theme={Themes}>
    <GlobalStyle/>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

