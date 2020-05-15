import React, { Component } from "react";
import Search from "./components/Search";
import AccountBar from './components/AccountBar';
import Login from './components/Login'

export class App extends Component {
  state = {
    page: "search",
    authenticated: false,
  }


  render() {
    let main;
    switch(this.state.page) {
      case "search":
        main = <Search authenticated = {true}/>
        break;
      case "login":
        main = <Login/>
      default:
        break;
    }
    
    

    return (
      <div>
        <AccountBar goToLoginPage={() => {this.setState({ page: "login"})}}/>
        <h1>Release Tracker</h1>
        {main}
        <p style={{position: "absolute", bottom: 0}}>
          Powered by
          <img
            style={{ width: "150px", marginLeft: "10px"}}
            src={require("./images/apilogo.svg")}
          />
        </p>
      </div>
    );
  }
}

export default App;
