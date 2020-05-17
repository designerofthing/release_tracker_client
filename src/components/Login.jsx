import React, { Component } from "react";
import { authenticate } from "../modules/auth";
import { getUserSelection } from "../modules/tracking";
import { Form, Input, Button } from "semantic-ui-react";

export default class Login extends Component {
  state = {
    loginMessage: "",
  };

  onLogin = async (e) => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      let userSelection = await getUserSelection();
      this.props.setUserSelection(userSelection.response);
      this.props.globalAuthHandler(true);
      this.props.goToPage("search");
    } else {
      this.setState({ loginMessage: response.message });
    }
  };

  render() {
    return (
      <>
        <div>
          <h2>Log in</h2>
          <Form id="login-form" onSubmit={this.onLogin}>
            <Form.Group widths="equal">
              <Form.Field>
                <label for="email">Email</label>
                <Input name="email" type="email" id="email"></Input>
              </Form.Field>
              <Form.Field>
                <label for="password">Password</label>
                <Input name="password" type="password" id="password"></Input>
              </Form.Field>
            </Form.Group>
            <Button id="submit">Submit</Button>
            <p id="login-message">{this.state.loginMessage}</p>
          </Form>
        </div>
        <div>
          {" "}
          <a onClick={() => this.props.goToPage("signup")}>
            Need an account? Sign up instead
          </a>
        </div>
        <div>
          {" "}
          <a onClick={() => this.props.goToPage("search")}>Go back</a>{" "}
        </div>
      </>
    );
  }
}
