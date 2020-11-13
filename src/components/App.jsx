import React, { Component } from "react";
import Reviews from "./review/Reviews";
import Review from "./review/Review";
import Home from "./home/Home";
import Auth from "./auth/Auth";
import Logout from "./auth/Logout";
import AddReview from "./review/AddReview";
import logo from "../assets/logo.png";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    if (!this.state.isLogin) this.setState({ isLogin: true });
  }

  handleLogout() {
    if (this.state.isLogin) this.setState({ isLogin: false });
  }

  render() {
    let authLink;
    if (this.state.isLogin) {
      authLink = (
        <li>
          <Link to="logout">Logout</Link>
        </li>
      );
    } else {
      authLink = (
        <li>
          <Link to="login">Login</Link>
        </li>
      );
    }
    return (
      <Router>
        <nav fx="">
          <header>
            <a href="/">
              <img src={logo} alt="React-Wines logo" />
            </a>
          </header>

          <ul>
            <li>
              <Link to="home">Home</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
            <li>
              <Link to="add-review">Add Review</Link>
            </li>
            {authLink}
          </ul>
        </nav>

        <main>
          <section>
            <Switch>
              <Route name="login" path="/login">
                <Auth onLogin={this.handleLogin} isLogin={this.state.isLogin} />
              </Route>
              <Route name="logout" path="/logout">
                <Logout
                  onLogout={this.handleLogout}
                  isLogin={this.state.isLogin}
                />
              </Route>
              <Route name="reviews" path="/reviews">
                <Reviews />
              </Route>
              <Route name="review" path="/review/:slug">
                <Review />
              </Route>
              <Route name="add-review" path="/add-review">
                <AddReview isLogin={this.state.isLogin} />
              </Route>
              <Route name="home" path="/">
                <Home />
              </Route>
            </Switch>
          </section>
        </main>

        <footer>
          <p>Université de La Rochelle</p>
        </footer>
      </Router>
    );
  }
}
export default App;
