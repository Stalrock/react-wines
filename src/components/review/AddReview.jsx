import React, { Component } from "react";
import SelectCategory from "./SelectCategory";
import db from "../../api/db.json";
import { withRouter } from "react-router-dom";
import redirect from "../../redirect";

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      title: "",
      wine: "",
      categorySelected: "",
      price: "",
      review: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    if (!this.props.isLogin) return redirect.to("/login", this.props.location);
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={this.state.author}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="wine"
          placeholder="Wine"
          value={this.state.wine}
          onChange={this.handleChange}
        />
        <SelectCategory
          categorySelected={this.state.categorySelected}
          categories={db.categories}
          onChange={this.handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={this.state.price}
          onChange={this.handleChange}
        />
        <textarea
          type="text"
          name="review"
          placeholder="Review"
          value={this.state.review}
          onChange={this.handleChange}
        ></textarea>
        <button type="submit">Ajouter</button>
      </form>
    );
  }
}
export default withRouter(AddReview);
