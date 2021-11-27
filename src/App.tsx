import * as React from "react";
import { Component, useState } from "react";
import Header from "./Hearder";
import TextBox from "./TextBox";
import {fireDB} from "./FireBase"


const App = () => {

  const [msg,setMsg]=useState("");

  const submitMsg = (event:React.ChangeEvent<HTMLInputElement>) => {
    setMsg(event.target.value)
  };

  const onClick =()=>{
    fireDB.collection('data').get().then((result)=>{
      result.forEach((doc)=>{
        console.log(doc.data());
      })
    })
  }

  return (
    <>
      <div>
        <Header />
        <TextBox Text="asdfasdf" />
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
