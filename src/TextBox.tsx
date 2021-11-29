import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100px;
  height: 90px;
  border: 2px solid white;
  border-radius: 10%;
  padding: 0px 20px 0px 20px;
  overflow: hidden;

  &:hover {
    width: 250px;
    height: 260px;
  }
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
