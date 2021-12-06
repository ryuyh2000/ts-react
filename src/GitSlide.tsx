import * as React from "react";
import styled from "styled-components";

const P = styled.p`
  position: absolute;
  z-index: 2;
  top: 340px;
  padding-left: 30px;
  color: #00ff73;
  opacity: 0;
`;

const Container = styled.div`
  margin-left: 35%;
  width: 800px;
  height: 100px;
  display: flexbox;
`;

const ContentsContainer = styled.div`
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
  list-style: none;
  &:hover {
    ${P} {
      opacity: 1;
    }
    background-color: rgba(63, 63, 63, 0.3);
    color: rgba(255, 255, 255, 0.3);
  }
`;

interface ITextBox {
  commitMsg: string[];
  commitDate: string[];

}
// index 를 넘겨서 *100 해주면 될듯?
const GitSlide: React.FunctionComponent<ITextBox> = ({
  commitMsg,
  commitDate,
}) => {
  const [index, setwidth] = React.useState(0);
  const left = () => {
    if (index > 0) {
      setwidth(index - 1);
    } else {
      setwidth(commitMsg.length - 3);
    }
  };

  const right = () => {
    if (index < commitMsg.length - 3) {
      setwidth(index + 1); 
    } else {
      setwidth(0);
    }
  };
  return (
    <Container>
      <button style={{marginRight:'10px'}} onClick={left}>left</button>
      <ContentsContainer>
        <P>{commitDate[index]}</P>
        <span>{commitMsg[index]}</span>
      </ContentsContainer>
      <ContentsContainer>
        <P>{commitDate[index + 1]}</P>
        <span>{commitMsg[index + 1]}</span>
      </ContentsContainer>
      <ContentsContainer>
        <P>{commitDate[index + 2]}</P>
        <span>{commitMsg[index + 2]}</span>
      </ContentsContainer>
      <button onClick={right}>right</button>
    </Container>
  );
};

export default GitSlide;
