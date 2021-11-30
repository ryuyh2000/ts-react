import * as React from "react";
import styled from "styled-components";

const P = styled.p`
  position: absolute;
  z-index: 2;
  padding-left: 30px;
  padding-top: 80px;
  color: #00ff73;
  opacity: 0;
`;

const Container = styled.div`
  width: 100px;
  height: 90px;
  background-color: #3f3f3f;
  border-radius: 10px;
  padding: 0px 20px 0px 20px;
  overflow: hidden;
  margin-right: 20px;
  box-shadow: 8px 7px 2px 1px rgba(0, 0, 0, 0.2);
  color: white;
  transition-duration: 0.3s;

  &:hover {
    ${P} {
      opacity: 1;
    }
    background-color: rgba(63, 63, 63, 0.3);
    color: rgba(255, 255, 255, 0.3);
  }
`;

interface ITextBox {
  Text: string;
  date: string;
}

const TextBox: React.FunctionComponent<ITextBox> = ({ Text, date }) => {
  return (
    <>
      <Container>
        <P>{date.substr(0,10)}</P>
        <span>{Text}</span>
      </Container>
    </>
  );
};

export default TextBox;
