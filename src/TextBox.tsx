import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100px;
  height: 110px;
  border: 2px solid white;
  border-radius: 10%;
  margin-top: 25%;
  margin-left: 25%;
`;

interface ITextBox {
  Text: string;
}

const TextBox: React.FunctionComponent<ITextBox> = ({ Text }) => {
  return (
    <Container>
      <span style={{ color: "white" }}>{Text}</span>
    </Container>
  );
};

export default TextBox;
