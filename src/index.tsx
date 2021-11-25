import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import theme from "./theme"
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: ${props => (props.theme.bodyMargin )};
    background-color:${props => (props.theme.bodyColor)};
  }
`

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle/>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

