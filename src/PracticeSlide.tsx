import * as React from "react";
import styled from "styled-components";

const P = styled.p`
  position: absolute;
  z-index: 2;
  top: 525px;
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
  span {
    overflow: hidden;
  }
`;

interface PSProrps {
  fireInfo: {
    content: string;
    date: string;
    language: string;
    title: string;
  }[][];
}
const PracticeContents: React.FunctionComponent<PSProrps> = ({ fireInfo }) => {
  const [index, setIndex] = React.useState(0);
  const [content, setContent] = React.useState<string[]>([]);
  const [date, setDate] = React.useState<string[]>([]);
  const [title, setCitle] = React.useState<string[]>([]);
  const clear = () => {
    fireInfo.map((a) => {
      content.push(a[0].content);
      date.push(a[0].date);
      title.push(a[0].title);
    });
  };

  const left = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(fireInfo.length - 3);
    }
  };

  const right = () => {
    if (index < fireInfo.length - 3) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  React.useEffect(() => {
    clear();
  }, []);

  return (
    <Container>
      <button style={{ marginRight: "10px" }} onClick={left}>
        left
      </button>
      <ContentsContainer>
        <P>{date[0]}</P>
        <span>{content[0]}</span>
      </ContentsContainer>
      <ContentsContainer>
        <P>{date[1]}</P>
        <span>{content[1]}</span>
      </ContentsContainer>
      <ContentsContainer>
        <P>{date[2]}</P>
        <span>{content[2]}</span>
      </ContentsContainer>
      <button onClick={right}>right</button>
    </Container>
  );
};

export default PracticeContents;
