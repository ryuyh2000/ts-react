import * as React from "react";
import { useState, useEffect } from "react";
import Header from "./Hearder";
import TextBox from "./TextBox";
import { fireDB } from "./FireBase";
import { GitApi } from "./API";

interface commitData {
  commit: {
    message: string;
  };
}

interface commitArray {
  message: string;
  commitMesssage: string;
}


const App = () => {
  const [msg, setMsg] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [commit, setCommit] = useState([] as commitArray[]);

  const submitMsg = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(event.target.value);
  };

  const getFirebaseInfo = () => {
    let array: { data: string } []= [];
    fireDB
      .collection("data")
      .get()
      .then((result) => {
        result.forEach((doc) => {
          setCount(count + 1);
          array.push({ data: doc.data().content});
        });
      });

    console.log(array)
  };

  const onClick = () => {
    fireDB.collection(`data`).doc(`content${count}`).set({ content: msg });
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
      <div>
        <Header />
        {commit.map((commitMSG) => (
          <TextBox Text={commitMSG.message} />
        ))}

        <input
          style={{ marginLeft: "25%", width: "100px" }}
          onChange={submitMsg}
        ></input>
        <button onClick={onClick}>보냄!</button>
      </div>
    </>
  );
};

export default App;
