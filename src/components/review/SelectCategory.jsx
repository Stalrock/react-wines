import React from "react";

function SelectCategory(props) {
  const categories = props.categories.map((category) => {
    return (
      <option key={category.id} value={category.key}>
        {category.label}
      </option>
    );
  });

  return (
    <select
      name="categorySelected"
      value={props.categorySelected}
      onChange={props.onChange}
    >
      <option value="">Filter by category</option>
      {categories}
    </select>
  );
}
export default SelectCategory;
