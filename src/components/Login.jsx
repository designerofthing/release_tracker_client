import React, { Component } from 'react'

export default class Login extends Component {

  render() {
    return (
      <div>
        <h2>Log in</h2>
        <form>
          <label for="email">Email</label>
          <input name="email" type="email" id="email"></input>
          <label for="password">Password</label>
          <input name="password" type="password" id="password"></input>
        </form>
      </div>
    )
  }
}
