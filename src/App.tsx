import * as React from "react";
import { useState, useEffect } from "react";
import TextBox from "./GitSlide";
import { fireDB } from "./FireBase";
import { GitApi } from "./API";
import PracticeSlide from "./PracticeSlide";
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
  const [count, setCount] = useState(0);
  const [commit, setCommit] = useState<string[]>([]);
  const [commitDate, setCommitDate] = useState<string[]>([]);
  const [fireInfo, setFireInfo] = useState<
    { content: string; date: string; language: string; title: string }[][]
  >([]);
  const [add, setAdd] = useState(false);
  const [todayDate, setTodayDate] = useState("");
  const [langList, setLangList] = useState<string[]>([]);
  const languages = ["Java Script", "HTML", "CSS", "React", "Type Script"];

  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setmsg(event.target.value);
  };

  const contentTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    settitle(event.target.value);
  };

  const sendMsg = async () => {
    if ((title && todayDate && msg) !== "") {
      console.log(langList);
      fireDB.collection(`data`).doc(todayDate).set({
        title: title,
        date: todayDate,
        content: msg,
        languages: langList,
      });
    } else {
      alert("empty");
    }
    setAdd(!add);
  };

  const getFirebaseInfo = async () => {
    let firstArray: {
      content: string;
      date: string;
      language: string;
      title: string;
    }[][] = [];

    let secondArray: {
      content: string;
      date: string;
      language: string;
      title: string;
    }[] = [];

    try {
      const res = await fireDB.collection("data").get();
      res.forEach((doc) => {
        secondArray.push({
          content: doc.data().content,
          date: doc.data().date,
          language: doc.data().language,
          title: doc.data().title,
        });

        firstArray.push(secondArray);
        secondArray = [];
      });
      setFireInfo(firstArray);
      getDate();
    } catch (error) {
      console.log(error);
    }
  };

  const onClick = async () => {
    try {
      const res = await fireDB.collection("data").get();
      res.forEach((doc) => {
        setCount(count + 1);
        console.log(count);
      });
    } catch (error) {
      console.log(error);
    }
    setLangList([]);
    setAdd(!add);
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

  const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let milliseconds = today.getMilliseconds();

    setTodayDate(
      year +
        "-" +
        month +
        "-" +
        day +
        hours +
        ":" +
        minutes +
        ":" +
        seconds +
        ":" +
        milliseconds
    );
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

  useEffect(() => {
    getFirebaseInfo();
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
            <button onClick={sendMsg}>Send Study Record</button>
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
          <PracticeSlide fireInfo={fireInfo} />
        </TextContainer>
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
