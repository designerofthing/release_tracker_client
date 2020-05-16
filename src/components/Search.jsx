import React, { Component } from "react";
import axios from "axios";
<<<<<<< HEAD
import {
  Container,
  Image,
  Table,
  Segment,
  Grid,
  Button,
} from "semantic-ui-react";
=======
import { Container, Image, Table, Header } from "semantic-ui-react";
>>>>>>> d589767997843ecb3fbe9c1a1334c458b636eecb
import DefaultPicture from "../images/defaultpic.jpeg";
import { addToTracked, removeFromTracked } from "../modules/tracking";

class Search extends Component {
  state = {
    searchResult: [],
    message: "",
  };

  searchReq = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/v1/searches", {
        params: { q: e.target.children.search.value },
      });
      this.setState({ searchResult: response.data.data });
    } catch (error) {
      let errorMessage = error.response.data.error_message || error.message;
      this.setState({ message: errorMessage });
    }
  };

  async trackHandler(id, add) {
    if (add) {
<<<<<<< HEAD
      const response = await addToTracked(id); //add this method in a module, module will grab credentials as header and send to backend
      if (response.successful) {
        let searchResult = this.state.searchResult;
        let index = searchResult.findIndex((result) => result.id == id);
        searchResult[index].tracked = true;
        this.setState({ searchResult });
      }
    } else {
      const response = await removeFromTracked(id); //add this method in a module, module will grab credentials as header and send to backend
=======
      const response = await addToTracked(id);
      if (response.successful) {
        this.props.setUserSelection(response.response.data.user_selection);
      } else {
        this.setState({ message: response.error });
      }
    } else {
      const response = await removeFromTracked(id);
      if (response.successful) {
        this.props.setUserSelection(response.user_selection);
      } else {
        this.setState({ message: response.error });
      }
>>>>>>> d589767997843ecb3fbe9c1a1334c458b636eecb
    }
  }

  render() {
    let imgPath, sResult, button;
    let searchResult = this.state.searchResult;
<<<<<<< HEAD
=======
    let trackedIds = this.props.userTracked.map(
      (person) => person.movie_person_id
    );
>>>>>>> d589767997843ecb3fbe9c1a1334c458b636eecb

    searchResult &&
      (sResult = searchResult.map((result) => {
        debugger;
        if (this.props.authenticated && !trackedIds.includes(result.id)) {
          button = (
            <td>
              <button
                id="track-btn"
                onClick={() => {
                  this.trackHandler(result.id, true);
                }}
              >
                track
              </button>
            </td>
          );
        } else if (this.props.authenticated) {
          button = (
            <td>
              <button
                id="track-btn"
                onClick={() => {
                  this.trackHandler(result.id, false);
                }}
              >
                untrack
              </button>
            </td>
          );
        }

        imgPath = DefaultPicture;

        return (
          <Table.Row
            key={"result-item-" + result.id}
            id={"result-item-" + result.id}
          >
            <Table.Cell>
              <Image
                src={imgPath}
                size="mini"
                alt={result.name}
                style={{ paddingRight: "10px" }}
              />
            </Table.Cell>
            <Table.Cell>
              <a
                data-id={result.id}
                id={"track-" + result.id}
                onClick={(e) => {
                  this.props.moviePersonShow(e);
                }}
              >
                {result.name}
              </a>
            </Table.Cell>
            <Table.Cell>
              {result.known_for_role === "Acting" ? "Actor" : "Director"} (
              {result.known_for_movie})
            </Table.Cell>
            {button}
          </Table.Row>
        );
      }));

    return (
<<<<<<< HEAD
      <>
        <Grid relaxed fluid>
          <Grid.Column></Grid.Column>
          <Grid.Column width={5}>
            <Segment style={{ height: "100%" }}>
              {this.props.genresComp}
            </Segment>
          </Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column width={8}>
            <Container align="left">
              <form onSubmit={this.searchReq}>
                <input type="text" id="search" name="searchText" />
                <button type="submit">Search</button>
              </form>
              <p id="message">{this.props.message}</p>
              <Table padded compact>
                {sResult}
              </Table>
            </Container>
          </Grid.Column>
        </Grid>
        {this.props.authenticated && (
          <Button id="btn-tracker" onClick={(e) => this.props.showTracked(e)}>
            View Your Tracker
          </Button>
        )}
      </>
=======
      <Container>
        <Header as="h4">Who do you want to track?</Header>
        <Container align="left" style={{ width: "50%" }}>
          <form onSubmit={this.searchReq}>
            <input type="text" id="search" name="searchText" />
            <button type="submit">Search</button>
          </form>
          <p id="message">
            {this.state.message}
            <br />
            {this.props.message}
          </p>
          <Table padded compact>
            {sResult}
          </Table>
        </Container>
      </Container>
>>>>>>> d589767997843ecb3fbe9c1a1334c458b636eecb
    );
  }
}

export default Search;
