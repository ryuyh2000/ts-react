import * as React from "react";
import { useState, useEffect, TextareaHTMLAttributes } from "react";
import Header from "./Hearder";
import TextBox from "./TextBox";
import { fireDB } from "./FireBase";
import { GitApi } from "./API";
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
`;

const Box = styled.div`
  width: 750px;
  height: 750px;
  position: absolute;
  z-index: 2;
  background-color: white;
  opacity: 0.5;
  margin: 5% 0 10% 25%;
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
    margin: 30% 0% 0% 13%;
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

const App = () => {
  const [msg, setmsg] = useState("");
  const [count, setCount] = useState(0);
  const [commit, setCommit] = useState<string[]>([]);
  const [commitDate, setCommitDate] = useState<string[]>([]);
  const [fireInfo, setFireInfo] = useState<string[]>([]);
  const [add, setAdd] = useState(false);
  const [todayDate, setTodayDate] = useState("");

  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setmsg(event.target.value);
  };

  const sendMsg = () => {
    fireDB.collection(`data`).doc(`content${count}`).set({ content: msg });
  };

  const getFirebaseInfo = async () => {
    let array: string[] = [];
    try {
      const res = await fireDB.collection("data").get();
      res.forEach((doc) => {
        setCount(count + 1);
        array.push(doc.data().content);
      });
      const uniqueArr = array.filter((element, index) => {
        return array.indexOf(element) === index;
      });
      setFireInfo(uniqueArr);
      getDate();
    } catch (error) {
      console.log(error);
    }
  };

  const onClick = () => {
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
        date: data.commit.author.date.substr(0,10),
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
    setTodayDate(year + "-" + month + "-" + day);
  };

  const contentBtn = () => {
    setAdd(!add);
  };
  useEffect(() => {
    getFirebaseInfo();
    getCommitMsg();
  }, []);

  return (
    <>
      {add && (
        <Box>
          <button onClick={contentBtn}>X</button>
          <div>
            <input style={{ marginLeft: "0%", marginBottom: "10px" }} />
            <textarea onChange={textAreaChange} />
            <button onClick={sendMsg}>Send Study Record</button>
          </div>
        </Box>
      )}
      <Header />
      <Container Opacity={add}>
        <h1>GIT COMMIT MESSAGE</h1>
        <TextContainer>
          <TextBox commitMsg={commit} commitDate={commitDate} fireInfo={fireInfo} />
        </TextContainer>

        <h1>PRACTICE CONTENTS</h1>
        <TextContainer>
          <ul>
            <Btn onClick={onClick}>
              <P>+</P>
            </Btn>
          </ul>
        </TextContainer>
      </Container>
    </>
  );
};
// slide => textBox 로 transfer 에 대한 props 넘겨야함
export default App;
