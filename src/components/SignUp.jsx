import React, { Component } from "react";
import { register } from "../modules/auth";
import { Form, Input, Button } from "semantic-ui-react";

export default class SignUp extends Component {
  state = {
    signupMessage: "",
  };

  componentDidMount() {
    if (this.props.authenticated) {
      this.props.goToPage("search");
    }
  }

  onSignup = async (e) => {
    e.preventDefault();
    const response = await register(
      e.target.email.value,
      e.target.password.value,
      e.target.password_confirmation.value
    );
    if (response.authenticated) {
      this.props.globalAuthHandler(true);
      this.props.goToPage("search");
    } else {
      this.setState({ signupMessage: response.message });
    }
  };

  render() {
    return (
      <>
        <div>
          <h2>Sign up</h2>
          <Form id="signup-form" onSubmit={this.onSignup}>
            <Form.Group widths="equal">
              <Form.Field>
                <label for="email">Email</label>
                <Input name="email" type="email" id="email"></Input>
              </Form.Field>
              <Form.Field>
                <label for="password">Password</label>
                <Input name="password" type="password" id="password"></Input>
              </Form.Field>
              <Form.Field>
                <label for="password_confirmation">Password confirmation</label>
                <Input
                  name="password_confirmation"
                  type="password"
                  id="password_confirmation"
                ></Input>
              </Form.Field>
            </Form.Group>
            <Button id="submit">Submit</Button>
            <p id="signup-message">{this.state.signupMessage}</p>
          </Form>
        </div>
        <div>
          {" "}
          <a onClick={() => this.props.goToPage("login")}>
            Already have an account? Log in instead
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
