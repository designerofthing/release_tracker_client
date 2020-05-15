import React, { Component } from "react";
import axios from "axios";
import Search from "./components/Search";

export class App extends Component {
  state = {
    searchResult: [],
    message: "",
  };

  searchReq = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/v1/search", {
        params: { q: e.target.children.search.value },
      });
      this.setState({ searchResult: response.data.result });
    } catch (error) {
      let errorMessage = error.response.data.error_message || error.message;
      this.setState({ message: errorMessage });
    }
  };

  render() {
    return (
      <div>
        <h1>Release Tracker</h1>
        <p id="message">{this.state.message}</p>
        <Search
          searchResult={this.state.searchResult}
          searchHandler={this.searchHandler}
          searchReq={this.searchReq}
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
