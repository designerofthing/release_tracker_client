import React, { Component } from "react";
import {
  Container,
  Image,
  Table,
  Segment,
  Grid,
  Button,
} from "semantic-ui-react";

export class ViewTracker extends Component {
  render() {
    let releaseTable;

    releaseTable = this.props.trackedInfo.movies.map((result) => {
      let imgPath = result.image;

      return (
        <>
          <div
            id={
              "release-item-" +
              (1 + this.props.trackedInfo.movies.indexOf(result))
            }
          >
            <h3>{result.title}</h3>
            <p>{result.release_date}</p>
            <p>Tracked people: {result.name}</p>
            <p>{result.role}</p>
            <p>Tracked genres: {result.genres.join(", ")}</p>
            <img src={imgPath} height="35" alt={result.title} />
            <p>{result.description}</p>
          </div>
        </>
      );
    });

    return (
      <div>
        <h1 id="release-header">Upcoming Releases</h1>
        {releaseTable}
      </div>
    );
  }
}

export default ViewTracker;
