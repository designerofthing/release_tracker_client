import React, { Component } from "react";
import axios from "axios";
import { Container, Image, Table, Segment, Grid} from "semantic-ui-react";
import DefaultPicture from '../images/defaultpic.jpeg'
import { addToTracked, removeFromTracked } from "../modules/tracking"

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

  async trackHandler(id,add){
    if (add) {
      const response = await addToTracked(id) //add this method in a module, module will grab credentials as header and send to backend
      if (response.successful) {
        let searchResult = this.state.searchResult
        let index = searchResult.findIndex((result) => result.id == id )
        searchResult[index].tracked = true
        this.setState({ searchResult })
      }
    } else {
      const response = await removeFromTracked(id) //add this method in a module, module will grab credentials as header and send to backend
    }
  }

  render() {
    let imgPath, sResult, button;
    let searchResult = this.state.searchResult;
  
    searchResult &&
      (sResult = searchResult.map((result) => {
        if (this.props.authenticated && !result.tracked) {
          button = (
            <td>
              <button id="track-btn" onClick={() => {this.trackHandler(result.id,true)}}>track</button> 
            </td>
          )
        } else if (this.props.authenticated){
          button = (
            <td>
              <button id="track-btn" onClick={() => {this.trackHandler(result.id,false)}}>untrack</button> 
            </td>
          )
        }
  
        imgPath = DefaultPicture
  
        return (
          <Table.Row key={"result-item-" + result.id} id={"result-item-" + result.id}>
            <Table.Cell>
              <Image src={imgPath} size="mini" alt={result.name} style={{paddingRight: "10px"}}/>
            </Table.Cell>
            <Table.Cell>
              <a
                data-id={result.id}
                id={"track-" + result.id}
                onClick={(e) => {
                  moviePersonSearch(e);
                }}
              >
              {result.name}
            </a></Table.Cell>
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

  
// const Search = ({ searchResult, searchReq, moviePersonSearch }) => {
//   let imgPath;
//   let sResult;

//   searchResult &&
//     (sResult = searchResult.map((result) => {
//       imgPath = result.pic;
//       return (
//         <tr key={"result-item-" + result.id} id={"result-item-" + result.id}>
//           <td>
//             <img src={imgPath} height="35" alt={result.name} />
//           </td>
//           <td>
//             <a
//               data-id={result.id}
//               id={"track-" + result.id}
//               onClick={(e) => {
//                 moviePersonSearch(e);
//               }}
//             >
//               {result.name}
//             </a>
//           </td>
//           <td>{result.latestProd.movieName}</td>
//           <td>{result.latestProd.year}</td>
//           <td>{result.latestProd.role}</td>
//         </tr>
//       );
//     }));

//   return (
//     <>
//       <form onSubmit={searchReq}>
//         <input type="text" id="search" name="searchText" />
//         <button type="submit">Search</button>
//       </form>
//       <div>{sResult}</div>
//     </>
//   );
//         <input type="text" id="search" name="searchText" />
//         <button type="submit">Search</button>
//       </form>
//       <div>{sResult}</div>
//     </>
//   );
};

export default Search;
