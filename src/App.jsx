import React, { Component } from "react";
import Search from "./components/Search";

export class App extends Component {
  state = {

  };



  render() {
    return (
      <div>
        <h1>Release Tracker</h1>
        <Search 
          authenticated = {true}
        />
        <p>
          Powered by
          <img
            style={{ width: "150px" }}
            src={require("./images/apilogo.svg")}
          />
        </p>
      </div>
    );
  }
}

export default App;
