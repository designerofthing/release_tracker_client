import React, { Component } from 'react'
import { register } from '../modules/auth'

export default class SignUp extends Component {
  state = {
    signupMessage: ""
  }

  componentDidMount() {
    if ( this.props.authenticated ) {
      this.props.goToPage("search")
    }
  }

  onSignup = async e => {
    e.preventDefault();
    const response = await register(
      e.target.email.value,
      e.target.password.value,
      e.target.password_confirmation.value
    );
    if (response.authenticated) {
      this.props.globalAuthHandler(true);
      this.props.goToPage("search")
    } else {
      this.setState({ signupMessage: response.message });
    }
  };

  render() {
    return (
      <>
        <div>
          <h2>Sign up</h2>
          <form id="signup-form" onSubmit={this.onSignup}>
            <label for="email">Email</label>
            <input name="email" type="email" id="email"></input>
            <label for="password">Password</label>
            <input name="password" type="password" id="password"></input>
            <label for="password_confirmation">Password confirmation</label>
            <input name="password_confirmation" type="password" id="password_confirmation"></input>
            <button id="submit">Submit</button>
            <p id="signup-message">{this.state.signupMessage}</p>
          </form>
        </div>
        <div> <a onClick={() => this.props.goToPage('login')}>Already have an account? Log in instead</a></div>
        <div> <a onClick={() => this.props.goToPage('search')}>Go back</a> </div>
      </>
    )
  }
}
