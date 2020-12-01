import React from "react";
import db from "../../api/db.json";
import { useParams } from "react-router";

function Review(props) {
  const { slug } = useParams();
  const review = db.reviews.find((review) => review.slug === slug);
  document.title = review.title;
  let reviewShow;
  if (review) {
    reviewShow = (
      <div className="review">
        <h2>{review.title}</h2>
        <p>{review.description}</p>
        <p>{review.winery}</p>
        <p>${review.price}</p>
        <p>{review.points}/100</p>
      </div>
    );
  } else {
    reviewShow = <p>Aucune review ne correspond</p>;
  }

  return <div className="review">{reviewShow}</div>;
}

export default Review;
