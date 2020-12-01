import React, { Component } from "react";
import redirect from "../../redirect";

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = this.props.title;
    if (this.props.isLogin) {
      this.props.onLogout();
    }
  }

  render() {
    return redirect.to("/");
  }
}
export default Logout;
