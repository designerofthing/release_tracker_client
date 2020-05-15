import React, { Component } from "react";
import axios from "axios";

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
  
        imgPath = result.picture;
  
        return (
          <tr key={"result-item-" + result.id} id={"result-item-" + result.id}>
            <td>
              <img src={imgPath} height="35" alt={result.name} />
            </td>
            <td>{result.name}</td>
            <td>{result.known_for_movie}</td>
            <td>{result.known_for_role}</td>
            {button}
          </tr>
        );
      }));
  
    return (
      <>
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
        <div>{sResult}</div>
      </>
    );

  }

  
};

export default Search;
