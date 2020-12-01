import React from "react";
import db from "../../api/db.json";
import { withRouter } from "react-router-dom";
import CardReview from "./CardReview";
import SelectCategory from "./SelectCategory";
import SearchBar from "./Searchbar";
import Pagination from "./Pagination";

function Reviews(props) {
  const categorySelected = props.history.location.state?.categorySelected;
  document.title = `Reviews ${categorySelected || ""}`;
  const reviewsPerPage = 10;

  let parser = (url) =>
    url
      .slice(url.indexOf("?") + 1)
      .split("&")
      .reduce((a, c) => {
        let [key, value] = c.split("=");
        if (key) a[key] = decodeURIComponent(value.replace(/\+/g, " "));
        return a;
      }, {});
  const paramsUrl = parser(props.history.location.search);

  const search = paramsUrl["search"] || "";
  const orderByTitle = paramsUrl["order-by-title"] || "-1";
  const orderByPrice = paramsUrl["order-by-price"] || "-1";
  const page = parseInt(paramsUrl["page"]) || 1;

  // Filter by category & search
  const reviewsFiltered = db.reviews.filter((review) => {
    return (categorySelected === "" || !categorySelected) &&
      review.title.toLowerCase().trim().includes(search.toLowerCase())
      ? true
      : categorySelected === review.category &&
          review.title.toLowerCase().trim().includes(search.toLowerCase());
  });

  // Sort by title asc & desc
  if (orderByTitle === "asc") {
    reviewsFiltered.sort((a, b) => {
      let x = a.title.toLowerCase();
      let y = b.title.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }
  if (orderByTitle === "desc") {
    reviewsFiltered
      .sort((a, b) => {
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      })
      .reverse();
  }

  // Sort by price asc & desc
  if (orderByPrice === "asc")
    reviewsFiltered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  if (orderByPrice === "desc")
    reviewsFiltered
      .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      .reverse();

  const nbrPage = Math.ceil(reviewsFiltered.length / reviewsPerPage);
  const reviewsOnPage = reviewsFiltered.slice(
    page * reviewsPerPage - reviewsPerPage,
    reviewsPerPage * page
  );

  const reviews = reviewsOnPage.map((review, index) => {
    return <CardReview review={review} key={index} />;
  });

  const handleChangeQuery = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("order-by")) {
      Object.keys(paramsUrl).forEach((key) => {
        if (key.startsWith("order-by") && key !== name) delete paramsUrl[key];
      });
    }
    props.history.push({
      ...props.location,
      search: `?${new URLSearchParams({
        ...paramsUrl,
        [name]: value,
        page: 1,
      })}`,
    });
  };

  const handleClickPagination = (page) => {
    if (page > 0 && page <= nbrPage) {
      props.history.push({
        ...props.location,
        search: `?${new URLSearchParams({
          ...paramsUrl,
          page: page,
        })}`,
      });
      window.scrollTo(0, 0);
    }
  };

  const handleChangeCategory = (e) => {
    const { name, value } = e.target;
    props.history.push({
      ...props.location,
      state: {
        ...props.location.state,
        [name]: value,
      },
    });
  };

  return (
    <>
      <h1>Reviews</h1>
      <SelectCategory
        categorySelected={categorySelected || ""}
        categories={db.categories}
        onChange={handleChangeCategory}
      />
      <label>
        By Title
        <select
          name="order-by-title"
          value={orderByTitle}
          onChange={handleChangeQuery}
        >
          <option value="-1">Order by title</option>
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>
      </label>
      <label>
        By Price
        <select
          name="order-by-price"
          value={orderByPrice}
          onChange={handleChangeQuery}
        >
          <option value="-1">Order by price</option>
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>
      </label>
      <SearchBar search={search} onChange={handleChangeQuery} />
      {reviews.length !== 0 ? (
        <div className="result">
          <div className="reviews">{reviews}</div>
          <Pagination
            nbrPage={nbrPage}
            currentPage={page}
            onClick={handleClickPagination}
          />
        </div>
      ) : (
        <div className="result">
          <p>No result...</p>
        </div>
      )}
    </>
  );
}
export default withRouter(Reviews);
