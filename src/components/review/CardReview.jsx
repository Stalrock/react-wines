import React from "react";
import { Link } from "react-router-dom";
import "./CardReview.css";

function CardReview({ review }) {
  return (
    <div className="card-review">
      <Link to={`/review/${review.slug}`}>
        <h2>{review.title}</h2>
        <p>{review.description}</p>
        <p>{review.points}/100</p>
      </Link>
    </div>
  );
}
export default CardReview;
