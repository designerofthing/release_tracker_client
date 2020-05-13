import React from "react";

const SearchResult = (props) => {
  let imgPath;
  let searchResult = props.searchResult.map((result) => {
    imgPath = result.pic;
    return (
      <tr key={"result-item-" + result.id} id={"result-item-" + result.id}>
        <td>
          <img src={imgPath} height="35" alt={result.name} />
        </td>
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
