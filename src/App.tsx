import * as React from "react";
import { Component } from "react";
import Header from "./Hearder";
import TextBox from "./TextBox"
interface IState {

}

class App extends Component<{}, IState> {
  state = {

  };


  render() {

    return (
      <>
        <div >
          <Header/>
          <TextBox
            Text="asdfasdf"
          />
        </div>
      </>
    );
  }
}

export default App;
