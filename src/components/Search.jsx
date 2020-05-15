import React, { Component } from "react";
import axios from "axios";
import { Container, Image, Table, Segment, Grid, GridColumn } from "semantic-ui-react";
import DefaultPicture from '../images/defaultpic.jpeg'

class Search extends Component {
  state = {
    searchResult: [],
    message: "",
  }

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

  render() {
    let imgPath, sResult, button;
    let searchResult = this.state.searchResult;
  
    searchResult &&
      (sResult = searchResult.map((result) => {
        if (this.props.authenticated && !result.tracked) {
          button = (
            <td>
              <button id="track-btn" onClick={() => {this.trackHandler(result.id)}}>track</button> 
            </td>
          )
        } else if (this.props.authenticated){
          button = (
            <td>
              <button id="track-btn" onClick={() => {alert("This should be an untrack button later")}}>tracked</button> 
            </td>
          )
        }
  
        imgPath = DefaultPicture
  
        return (
          <Table.Row key={"result-item-" + result.id} id={"result-item-" + result.id}>
            <Table.Cell>
              <Image src={imgPath} size="mini" alt={result.name} style={{paddingRight: "10px"}}/>
            </Table.Cell>
            <Table.Cell>{result.name}</Table.Cell>
            <Table.Cell>{result.known_for_role === "Acting" ? "Actor" : "Director"} ({result.known_for_movie})</Table.Cell>
            {button}
          </Table.Row>
        );
      }));
  
    return (
      <Grid relaxed fluid>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column width={5}>
          <Segment style={{height: "100%"}}>Genre thing placeholder</Segment>
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column width={8}>
          <Container align="left">
            <form onSubmit={this.searchReq} >
              <input
                type="text"
                id="search"
                name="searchText"
              />
              <button type="submit">
                Search
              </button>
            </form>
            <p id="message">{this.state.message}</p>
            <Table padded compact>{sResult}</Table>
          </Container>
        </Grid.Column>
      </Grid>
    );

  }

  
};

export default Search;
