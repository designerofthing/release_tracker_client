import React, { Component } from "react";
import axios from "axios";
import Search from "./components/Search";
import Genres from "./components/Genres";
import MoviePerson from "./components/MoviePerson";

export class App extends Component {
  state = {
    searchResult: [],
    message: "",
    genresSelected: ["thriller", "drama", "comedy"],
    moviePersonResult: [],
    activeName: "",
  };

  searchReq = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/v1/search", {
        params: {
          q: e.target.children.search.value,
        },
      });
      this.setState({ searchResult: response.data.result });
    } catch (error) {
      let errorMessage = error.response.data.error_message || error.message;
      this.setState({ message: errorMessage });
    }
  };

  moviePersonSearch = async (e) => {
    e.preventDefault();
    let id = e.target.dataset.id;
    this.setState({ activeName: e.target.text });
    try {
      const response = await axios.get(`/api/v1/movie_person/${id}`, {
        params: { genres: this.state.genresSelected },
      });
      this.setState({ moviePersonResult: response.data.result.movies });
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

  resetMoviePerson = () => {
    this.setState({ moviePersonResult: [] });
  };

  render() {
    let moviePersonRender =
      this.state.moviePersonResult.length > 0 ? true : false;
    return (
      <div>
        <h1 id="header">Release Tracker</h1>
        <p id="message">{this.state.message}</p>

        {moviePersonRender ? (
          <MoviePerson
            moviePersonResult={this.state.moviePersonResult}
            activeName={this.state.activeName}
            resetMoviePerson={this.resetMoviePerson}
          />
        ) : (
          <>
            <Search
              searchResult={this.state.searchResult}
              searchReq={this.searchReq}
              moviePersonSearch={this.moviePersonSearch}
            />
            <Genres genresHandler={this.genresHandler} />
          </>
        )}

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
