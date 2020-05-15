import React, { Component } from "react";
import Search from "./components/Search";
import AccountBar from './components/AccountBar';
import Login from './components/Login'
import { Container } from 'semantic-ui-react'

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
        break;
      default:
        break;
    }

    return (
      <Container align="center">
        <AccountBar goToLoginPage={() => {this.setState({ page: "login"})}}/>
        <h1 className="ui main header" style={{margin: "60px"}}>Release Tracker</h1>
        {main}
        <p style={{position: "absolute", bottom: 10, right: 10}}>
          Powered by
          <img
            style={{ width: "150px", marginLeft: "10px"}}
            src={require("./images/apilogo.svg")}
          />
        </p>
      </Container>
    );
  }
}

export default App;
