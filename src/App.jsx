import React, { Component } from "react";

export class App extends Component {
  state = {
    searchText: "",
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>Release Tracker</h1>

        <form>
          <input
            type="text"
            id="search"
            name="searchText"
            onChange={this.onChangeHandler}
          />
          <button type="submit" onClick={this.XXXXX}>
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default App;
