import React, { Component } from "react";
import Login from "./Login";
import { withRouter } from "react-router-dom";
import redirect from "../../redirect";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    document.title = this.props.title;
  }

  handleSubmit(data) {
    this.setState({ ...data });
    this.props.onLogin();
  }

  render() {
    if (this.props.isLogin)
      return redirect.to(this.props.location.state?.from.pathname || "/");
    return (
      <>
        <h1>Login</h1>
        <Login onSubmit={this.handleSubmit} />
      </>
    );
  }
}
export default withRouter(Auth);
