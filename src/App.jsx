import React, { Component } from "react";
import axios from "axios";
import SearchResult from "./components/SearchResult";

export class App extends Component {
  state = {
    searchText: "",
    searchResult: [],
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
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <h1>Release Tracker</h1>

        <form>
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
