import * as React from "react";
import { useState, useEffect } from "react";
import Header from "./Hearder";
import TextBox from "./TextBox";
import { fireDB } from "./FireBase";
import { GitApi } from "./API";
import styled from "styled-components";
import SendContents from "./SendContents";

interface commitData {
  commit: {
    message: string;
  };
}

interface commitArray {
  message: string;
  commitMesssage: string;
}

const Container = styled.div<{ Opacity: boolean }>`
  opacity: ${(props) => props.Opacity && "0.5"};
`;

const TextContainer = styled.div`
  display: flex;
  margin-left: 5%;
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

const App = () => {
  const [msg, setMsg] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [commit, setCommit] = useState([] as commitArray[]);
  const [fireInfo, setFireInfo] = useState<string[]>([]);
  const [add, setAdd] = useState<boolean>(false);

  const submitMsg = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(event.target.value);
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
    } catch (error) {
      console.log(error);
    }
  };

  const onClick = () => {
    //fireDB.collection(`data`).doc(`content${count}`).set({ content: msg });
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
      setCommit(msgData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFirebaseInfo();
    getCommitMsg();
  }, []);

  return (
    <>
      <Container Opacity={add}>
        {add && <SendContents />}
        <Header />
        <h1 style={{ color: "white" }}>GIT COMMIT MESSAGE</h1>
        <TextContainer>
          {commit.map((commitMSG, index) => (
            <TextBox key={index} Text={commitMSG.message} />
          ))}
        </TextContainer>

        <h1 style={{ color: "white" }}>PRACTICE CONTENTS</h1>
        <TextContainer>
          {fireInfo.map((info, index) => (
            <TextBox key={index} Text={info} />
          ))}
          <Btn onClick={onClick}>
            <P>+</P>
          </Btn>
        </TextContainer>
      </Container>
    </>
  );
};

export default App;
