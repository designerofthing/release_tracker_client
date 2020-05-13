import React from "react";

const SearchResult = (props) => {
  let searchResult = props.searchResult.map((result) => {
    return (
      <tr key={"result-item-" + result.id} id={"result-item-" + result.id}>
        <td>{result.name}</td>
        <td>{result.latestProd.movieName}</td>
        <td>{result.latestProd.year}</td>
        <td>{result.latestProd.role}</td>
      </tr>
    );
  });
  return <div>{searchResult}</div>;
};

export default SearchResult;
