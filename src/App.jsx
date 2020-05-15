import React, { Component } from "react";
import axios from "axios";
import Search from "./components/Search";
import Genres from "./components/Genres";

export class App extends Component {
  state = {
    searchResult: [],
    message: "",
    genresSelected: ["thriller", "drama", "comedy"],
  };

  searchReq = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/v1/search", {
        params: {
          q: e.target.children.search.value,
          genres: this.state.genresSelected,
        },
      });
      this.setState({ searchResult: response.data.result });
    } catch (error) {
      let errorMessage = error.response.data.error_message || error.message;
      this.setState({ message: errorMessage });
    }
  };

  genresHandler = (e) => {
    let selectedGenre = e.target.name;
    if (this.state.genresSelected.includes(selectedGenre)) {
      this.setState({
        genresSelected: this.state.genresSelected.filter(
          (element) => element !== selectedGenre
        ),
      });
    } else {
      this.setState({
        genresSelected: [...this.state.genresSelected, selectedGenre],
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Release Tracker</h1>
        <p id="message">{this.state.message}</p>
        <Search
          searchResult={this.state.searchResult}
          searchReq={this.searchReq}
        />
        <Genres genresHandler={this.genresHandler} />
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
