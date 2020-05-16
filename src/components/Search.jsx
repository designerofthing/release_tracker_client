import React from "react";

const Search = ({ searchResult, searchReq, moviePersonSearch }) => {
  let imgPath;
  let sResult;

  searchResult &&
    (sResult = searchResult.map((result) => {
      imgPath = result.pic;
      return (
        <tr key={"result-item-" + result.id} id={"result-item-" + result.id}>
          <td>
            <img src={imgPath} height="35" alt={result.name} />
          </td>
          <td>
            <a
              data-id={result.id}
              id={"track-" + result.id}
              onClick={(e) => {
                moviePersonSearch(e);
              }}
            >
              {result.name}
            </a>
          </td>
          <td>{result.latestProd.movieName}</td>
          <td>{result.latestProd.year}</td>
          <td>{result.latestProd.role}</td>
        </tr>
      );
    }));

  return (
    <>
      <form onSubmit={searchReq}>
        <input type="text" id="search" name="searchText" />
        <button type="submit">Search</button>
      </form>
      <div>{sResult}</div>
    </>
  );
};

export default Search;
