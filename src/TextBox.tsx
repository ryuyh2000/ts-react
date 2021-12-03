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
display: flex;
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
  fireInfo: string[];
}
// index 를 넘겨서 *100 해주면 될듯?
const TextBox: React.FunctionComponent<ITextBox> = ({
  commitMsg,
  commitDate,
  fireInfo,
}) => {
  return (
    <Container>
      {commitMsg.map((msg,index) => (
        <ContentsContainer>
          <span>{msg}</span>
          <P>{commitDate[index]}</P>
          <br />
        </ContentsContainer>
      ))}
      <button>asd</button>
    </Container>
  );
};

export default TextBox;

/* 
commit
commitDate
fireInfo

            {commit.map((commitMSG, index) => (
              <li key={index}>
                <TextBox
                  date={commitDate[index].date}
                  Text={commitMSG.message}
                  index={index}
                />
              </li>
            ))}
            {fireInfo.map((info, index) => (
              <li key={index}>
                <TextBox
                  date={todayDate}
                  Text={info}
                  index={index}
                />
              </li>
            ))}
*/
