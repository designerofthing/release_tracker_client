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
            <h4>{result.release_date}</h4>
            <h4>Tracked people: {result.name}</h4>
            <h4>{result.role}</h4>
            <h4>Tracked genres: {result.genres.join(", ")}</h4>
            <img src={imgPath} height="35" alt={result.title} />
            <h4>{result.description}</h4>
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
