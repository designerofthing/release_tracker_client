import React from "react";

const Search = ({ searchResult, searchHandler, searchReq }) => {
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
          <td>{result.name}</td>
          <td>{result.latestProd.movieName}</td>
          <td>{result.latestProd.year}</td>
          <td>{result.latestProd.role}</td>
        </tr>
      );
    }));

  return (
    <>
      <form>
        <input
          type="text"
          id="search"
          name="searchText"
          onChange={(e) => searchHandler(e)}
        />
        <button type="submit" onClick={(e) => searchReq(e)}>
          Search
        </button>
      </form>
      <div>{sResult}</div>
    </>
  );
};

export default Search;
