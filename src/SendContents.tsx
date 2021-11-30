import * as React from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 750px;
  height: 750px;
  position: absolute;
  z-index: 2;
  background-color: white;
  opacity: 0.5;
  margin: 5% 30% 10% 30%;
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
  form {
    height: 100px;
    width: 100px;
    margin: 35px 0px 0px 100px;
    word-wrap: break-word;
    word-break: break-all;
  }
  div {
    height: 100px;
    width: 100px;
    display: inline-block;
    word-break: break-all;
  }
`;

const SendContents = () => {
  return (
      <Box>
        <button>X</button>
        <form>
          <textarea />
        </form>
      </Box>
  );
};

export default SendContents;
