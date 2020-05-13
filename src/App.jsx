import React, { Component } from "react";
import axios from "axios";
import Search from "./components/Search";

export class App extends Component {
  state = {
    searchText: "",
    searchResult: [],
    message: "",
  };

  onChangeHandler = (e) => {
    debugger;
    this.setState({ [e.target.name]: e.target.value });
  };

  searchReq = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/v1/search", {
        params: { searchText: this.state.searchText },
      });
      this.setState({ searchResult: response.data.result });
    } catch (error) {
      this.setState({ message: error });
    }
  };

  render() {
    return (
      <div>
        <h1>Release Tracker</h1>
        <p>{this.state.message}</p>
        <Search
          searchResult={this.state.searchResult}
          onChangeHandler={this.onChangeHandler}
          searchReq={this.searchReq}
        />
        <p>
          Powered by{" "}
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
