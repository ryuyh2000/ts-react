import * as React from "react";
import styled from "styled-components";

interface PSProrps {
  fireInfo: string[];
}

const P = styled.p`
  position: absolute;
  z-index: 2;
  top: 520px;
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

const PracticeContents: React.FunctionComponent<PSProrps> = ({ fireInfo }) => {
  const [index, setwidth] = React.useState(0);
  const left = () => {
    if (index > 0) {
      setwidth(index - 1);
    } else {
      setwidth(fireInfo.length - 3);
    }
  };

  const right = () => {
    if (index < fireInfo.length - 3) {
      setwidth(index + 1);
    } else {
      setwidth(0);
    }
  };
  return (
    <Container>
      <button style={{marginRight:'10px'}} onClick={left}>left</button>
      <ContentsContainer>
        <P>2021-12-01</P>
        <span>{fireInfo[index]}</span>
      </ContentsContainer>
      <ContentsContainer>
        <P>2021-12-02</P>
        <span>{fireInfo[index + 1]}</span>
      </ContentsContainer>
      <ContentsContainer>
        <P>2021-12-03</P>
        <span>{fireInfo[index + 2]}</span>
      </ContentsContainer>
      <button onClick={right}>right</button>
    </Container>
  );
};

export default PracticeContents;
