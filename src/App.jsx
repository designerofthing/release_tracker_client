import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import Search from "./components/Search";
import Genres from "./components/Genres";
import MoviePerson from "./components/MoviePerson";
import AccountBar from "./components/AccountBar";
<<<<<<< HEAD
import ViewTracker from "./components/ViewTracker";
import Login from "./components/Login";
import { Container } from "semantic-ui-react";
import axios from "axios";
=======
import Login from "./components/Login";
import SignUp from "./components/SignUp";
>>>>>>> d589767997843ecb3fbe9c1a1334c458b636eecb

export class App extends Component {
  state = {
    page: "search",
    authenticated: false,
    searchResult: [],
    message: "",
    genresSelected: ["thriller", "drama", "comedy"],
    moviePersonResult: [],
    activeName: "",
<<<<<<< HEAD
    trackedInfo: {},
=======
    userTracked: [],
>>>>>>> d589767997843ecb3fbe9c1a1334c458b636eecb
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
<<<<<<< HEAD
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
      this.setState({ trackedInfo: response.data.data, page: "view-tracker" });
    } catch (error) {
      let errorMessage = error.response.data.error_message || error.message;
      this.setState({ message: errorMessage });
=======
    } catch (error) {
      let errorMessage = error.response.data.error_message || error.message;
      this.setState({ message: errorMessage });
      setTimeout(() => {
        this.setState({ message: "" });
      }, 3000);
>>>>>>> d589767997843ecb3fbe9c1a1334c458b636eecb
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

  goToPage = (page) => {
    this.setState({ page });
  };

  globalAuthHandler = (authenticated) => {
    this.setState({ authenticated });
  };

  setUserSelection = (userTracked) => {
    this.setState({ userTracked: userTracked || [] });
  };

  render() {
    let main;
    switch (this.state.page) {
      case "search":
        main = (
          <Search
<<<<<<< HEAD
            authenticated={true}
=======
            authenticated={this.state.authenticated}
>>>>>>> d589767997843ecb3fbe9c1a1334c458b636eecb
            message={this.state.message}
            moviePersonShow={this.moviePersonShow}
            showTracked={this.showTracked}
            genresComp={<Genres genresHandler={this.genresHandler} />}
            userTracked={this.state.userTracked}
            setUserSelection={this.setUserSelection}
          />
        );
        break;
      case "login":
<<<<<<< HEAD
        main = <Login />;
=======
        main = (
          <Login
            goToPage={this.goToPage}
            authenticated={this.state.authenticated}
            globalAuthHandler={this.globalAuthHandler}
            setUserSelection={this.setUserSelection}
          />
        );
        break;
      case "signup":
        main = (
          <SignUp
            goToPage={this.goToPage}
            globalAuthHandler={this.globalAuthHandler}
            authenticated={this.state.authenticated}
          />
        );
>>>>>>> d589767997843ecb3fbe9c1a1334c458b636eecb
        break;
      case "movie-person":
        main = (
          <MoviePerson
            moviePersonResult={this.state.moviePersonResult}
            activeName={this.state.activeName}
            resetMoviePerson={this.resetMoviePerson}
          />
        );
<<<<<<< HEAD
        break;
      case "view-tracker":
        main = <ViewTracker trackedInfo={this.state.trackedInfo} />;
=======
>>>>>>> d589767997843ecb3fbe9c1a1334c458b636eecb
        break;
      default:
        break;
    }

    return (
      <Container align="center">
        <AccountBar
<<<<<<< HEAD
          goToLoginPage={() => {
            this.setState({ page: "login" });
          }}
=======
          goToPage={(page) => this.goToPage(page)}
          authenticated={this.state.authenticated}
          globalAuthHandler={this.globalAuthHandler}
          uid={this.state.uid}
>>>>>>> d589767997843ecb3fbe9c1a1334c458b636eecb
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
