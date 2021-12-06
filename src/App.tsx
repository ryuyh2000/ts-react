import * as React from "react";
import { useState, useEffect } from "react";
import TextBox from "./GitSlide";
import { GitApi, CRUDApi } from "./API";
import styled from "styled-components";

interface commitData {
  commit: {
    message: string;
  };
}

interface commitArray {
  message: string;
}

interface dateArray {
  date: string;
}

interface dateData {
  commit: {
    author: {
      date: string;
    };
  };
}

const H1 = styled.h1`
  margin-left: 700px;
`;

const Container = styled.div<{ Opacity: boolean }>`
  opacity: ${(props) => props.Opacity && "0.1"};
  h1 {
    color: white;
  }
`;

const TextContainer = styled.div`
  ul {
    display: flex;
  }
  li {
    list-style: none;
  }
`;

const P = styled.p`
  margin: -15px;
  color: white;
  font-size: 100px;
`;

const Btn = styled.button`
  width: 143px;
  height: 93px;
  border: 2px solid white;
  border-radius: 10%;
  background-color: black;
  padding-bottom: 10px;
  margin-left: 865px;
  margin-top: 20px;
`;

const Box = styled.div`
  width: 750px;
  height: 750px;
  position: absolute;
  z-index: 2;
  background-color: white;
  opacity: 0.5;
  margin-top: -100px;
  margin-left: 550px;
  border-radius: 10px;
  button {
    float: right;
    width: 50px;
    height: 50px;
    font-size: 20px;
    border-style: none;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }
  div {
    margin: 10% 0% 0% 13%;
    textarea {
      width: 550px;
      height: 400px;
      resize: none;
      border: 2px solid black;
      font-size: 20px;
    }

    input {
      margin-left: 0%;
      margin-bottom: 10px;
    }
    button {
      margin-right: 93px;
      width: auto;
    }
  }
`;

const Ul = styled.ul`
  padding: 0%;
  display: flex;
  li {
    list-style: none;
    margin-right: 10px;
  }
`;

const App = () => {
  const [msg, setmsg] = useState("");
  const [title, settitle] = useState("");
  const [commit, setCommit] = useState<string[]>([]);
  const [commitDate, setCommitDate] = useState<string[]>([]);
  const [add, setAdd] = useState(false);
  const [langList, setLangList] = useState<string[]>([]);
  const languages = ["Java Script", "HTML", "CSS", "React", "Type Script"];

  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setmsg(event.target.value);
  };

  const contentTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    settitle(event.target.value);
  };

  const getCommitMsg = async () => {
    try {
      const res = await GitApi.getcommit({
        username: "ryuyh2000",
        repository: "ts-react",
      });
      const { data } = res;
      let msgData: commitArray[] = data.map((commitMsg: commitData) => ({
        message: commitMsg.commit.message,
      }));
      let DATA: string[] = [];
      msgData.map((information) => DATA.push(information.message));
      setCommit(DATA);

      let msgDate: dateArray[] = data.map((data: dateData) => ({
        date: data.commit.author.date.substr(0, 10),
      }));
      let DATE: string[] = [];
      msgDate.map((information) => DATE.push(information.date));
      setCommitDate(DATE);
    } catch (error) {
      console.log(error);
    }
  };

  const contentBtn = () => {
    setAdd(!add);
  };

  const checkLang = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked === true) {
      langList.push(event.target.value);
      console.log(langList);
    } else {
      langList.map((ele, index) => {
        if (ele === event.target.value) {
          langList.splice(index, 1);
        }
      });
      console.log(langList);
    }
  };

  const onClick = async () => {
    try {
      const postData = await CRUDApi.postContents({
        title: "asqwerqwreqdf",
        content: "zxcvzxcv",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const CRUDGet = async () => {
    try {
      const res = await CRUDApi.getContents();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CRUDGet();
    getCommitMsg();
  }, []);

  return (
    <div style={{ marginTop: "200px" }}>
      {add && (
        <Box>
          <button onClick={contentBtn}>X</button>
          <div>
            <input
              style={{
                border: "2px solid black",
                marginBottom: "10px",
                width: "500px",
              }}
              onChange={contentTitle}
            />
            <Ul>
              {languages.map((language, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    value={language}
                    key={index}
                    onChange={checkLang}
                  />
                  <label>{language}</label>
                </li>
              ))}
            </Ul>
            <textarea
              style={{ border: "5px solid black" }}
              onChange={textAreaChange}
            />
            <button>Send Study Record</button>
          </div>
        </Box>
      )}

      <Container Opacity={add}>
        <H1>GIT COMMIT MESSAGe</H1>
        <TextContainer>
          <TextBox commitMsg={commit} commitDate={commitDate} />
        </TextContainer>

        <H1>PRACTICE CONTENTS</H1>
        <TextContainer>
          <Btn onClick={onClick}>
            <P>+</P>
          </Btn>
        </TextContainer>
      </Container>
    </div>
  );
};
// slide => textBox 로 transfer 에 대한 props 넘겨야함
export default App;
