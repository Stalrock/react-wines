import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.baseState = this.state;
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.resetForm();
  }

  resetForm() {
    this.setState(this.baseState);
  }

  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="login"
          placeholder="Login"
          value={this.state.login}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button type="submit">Sign In</button>
      </form>
    );
  }
}
export default Login;
