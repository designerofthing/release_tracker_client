import React, { Component } from "react";
import Search from "./components/Search";
import Genres from "./components/Genres";
import MoviePerson from "./components/MoviePerson";
import AccountBar from "./components/AccountBar";
import ViewTracker from "./components/ViewTracker";
import Login from "./components/Login";
import { Container } from "semantic-ui-react";
import axios from "axios";

export class App extends Component {
  state = {
    page: "search",
    authenticated: false,
    searchResult: [],
    message: "",
    genresSelected: ["thriller", "drama", "comedy"],
    moviePersonResult: [],
    activeName: "",
    trackedInfo: {},
  };

  moviePersonShow = async (e) => {
    e.preventDefault();
    let id = e.target.dataset.id;
    let name = e.target.text;
    try {
      const response = await axios.get(`/api/v1/movie_person/${id}`, {
        params: { genres: this.state.genresSelected },
      });
      let result = response.data.result.movies;
      this.setState({
        moviePersonResult: result,
        page: "movie-person",
        activeName: name,
      });
    } catch (error) {
      let errorMessage = error.response.data.error_message || error.message;
      this.setState({ message: errorMessage });
      setTimeout(() => {
        this.setState({ message: "" });
      }, 3000);
    }
  };

  showTracked = async (e) => {
    e.preventDefault();
    let headers = sessionStorage.getItem("credentials");
    headers = JSON.parse(headers);
    try {
      const response = await axios.get("/api/v1/user/", { headers: headers });
      this.setState({ trackedInfo: response.data.result });
    } catch (error) {
      let errorMessage = error.response.data.error_message || error.message;
      this.setState({ message: errorMessage });
    }
  };

  resetMoviePerson = () => {
    this.setState({ moviePersonResult: [], activeName: "", page: "search" });
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
    let main;
    switch (this.state.page) {
      case "search":
        main = (
          <Search
            authenticated={true}
            message={this.state.message}
            moviePersonShow={this.moviePersonShow}
            genresComp={<Genres genresHandler={this.genresHandler} />}
          />
        );
        break;
      case "login":
        main = <Login />;
        break;
      case "movie-person":
        main = (
          <MoviePerson
            moviePersonResult={this.state.moviePersonResult}
            activeName={this.state.activeName}
            resetMoviePerson={this.resetMoviePerson}
          />
        );
        break;
      case "view-tracker":
        main = <ViewTracker trackedInfo={this.state.trackedInfo} />;
        break;
      default:
        break;
    }

    return (
      <Container align="center">
        <AccountBar
          goToLoginPage={() => {
            this.setState({ page: "login" });
          }}
        />
        <h1 className="ui main header" style={{ margin: "60px" }}>
          Release Tracker
        </h1>
        {main}
        <p style={{ position: "absolute", bottom: 10, right: 10 }}>
          Powered by
          <img
            style={{ width: "150px", marginLeft: "10px" }}
            src={require("./images/apilogo.svg")}
          />
        </p>
      </Container>
    );
  }
}

export default App;
