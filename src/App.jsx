import React, { Component } from "react";
import Search from "./components/Search";
import Genres from "./components/Genres";
import MoviePerson from "./components/MoviePerson";
import AccountBar from './components/AccountBar';
import Login from './components/Login'
import { Container } from 'semantic-ui-react'

export class App extends Component {
  state = {
    page: "search",
    authenticated: false,
    searchResult: [],
    message: "",
    genresSelected: ["thriller", "drama", "comedy"],
    moviePersonResult: [],
    activeName: "",
  }

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
    this.setState({ moviePersonResult: [], activeName: "" });
  };

  render() {
    let main;
    switch(this.state.page) {
      case "search":
        main = <Search authenticated = {true}/>
        break;
      case "login":
        main = <Login/>
        break;
      case "movie-person":
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
      default:
        break;
    }

    let moviePersonRender =
      this.state.moviePersonResult.length > 0 ? this.setState({page: "movie-person"}) : false;
      return (
        <Container align="center">
          <AccountBar goToLoginPage={() => {this.setState({ page: "login"})}}/>
          <h1 className="ui main header" style={{margin: "60px"}}>Release Tracker</h1>
          {main}
          <p style={{position: "absolute", bottom: 10, right: 10}}></p>
          <p>
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
