import React from "react";

function SearchBar(props) {
  return (
    <input
      type="text"
      name="search"
      placeholder="Search..."
      value={props.search}
      onChange={props.onChange}
    />
  );
}
export default SearchBar;
