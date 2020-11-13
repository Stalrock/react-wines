import React from "react";
import "./Pagination.css";

function Pagination(props) {
  const pages = [];
  let { currentPage, nbrPage } = props;
  for (let p = 1; p <= nbrPage; p++) {
    pages.push(
      <li
        className={`link-pagination ${currentPage === p ? "active" : ""}`}
        key={p}
        onClick={() => props.onClick(p)}
      >
        {p}
      </li>
    );
  }
  return (
    <ul className="pagination">
      <li
        className="link-pagination"
        onClick={() => props.onClick(currentPage - 1)}
      >
        {"<<"}
      </li>
      {pages}
      <li
        className="link-pagination"
        onClick={() => props.onClick(currentPage + 1)}
      >
        {">>"}
      </li>
    </ul>
  );
}
export default Pagination;
