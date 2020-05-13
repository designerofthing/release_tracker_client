import React, { Component } from "react";
import axios from "axios";
import SearchResult from "./components/SearchResult";

export class App extends Component {
  state = {
    searchText: "",
    searchResult: [],
    message: "",
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchReq = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/v1/search");
      this.setState({ searchResult: response.data.result });
    } catch (error) {
      this.setState({ message: error });
    }
  };

  render() {
    return (
      <div>
        <h1>Release Tracker</h1>

        <form>
          <p>{this.state.message}</p>
          <input
            type="text"
            id="search"
            name="searchText"
            onChange={this.onChangeHandler}
          />
          <button type="submit" onClick={this.searchReq}>
            Search
          </button>
        </form>
        <SearchResult searchResult={this.state.searchResult} />
      </div>
    );
  }
}

export default App;
