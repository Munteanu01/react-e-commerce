import { useState } from "react";

export const Filter = (products) => {
  let sizesArr = [];
  let colorsArr = [];
  let categoriesArr = [];
  products.map((product) => {
    product.sizes.map((size) => {
      if (!sizesArr.includes(size)) {
        sizesArr.push(size);
      }
    });
    product.categories.map((category) => {
      if (!categoriesArr.includes(category)) {
        categoriesArr.push(category);
      }
    });
    if (!colorsArr.includes(product.colors)) {
      colorsArr.push(product.colors);
    }
  });
  return { sizesArr, colorsArr, categoriesArr };
};

export default function Filtering({ products, handleFilterChange, selectedFilters }) {
  const { sizesArr, colorsArr, categoriesArr } = Filter(products);
  const filters = [
    { type: "categories", values: categoriesArr },
    { type: "sizes", values: sizesArr },
    { type: "colors", values: colorsArr },
  ];

  return (
    <>
      <button>FILTER</button>
      {filters.map((filter) =>
        filter.values.map((value) => (
          <div key={value}>
            <label htmlFor={value}>{value}</label>
            <input
              type="checkbox"
              name={value}
              id={value}
              data-filter-type={filter.type}
              onChange={handleFilterChange}
              checked={selectedFilters[filter.type].includes(value)}
            />
          </div>
        ))
      )}
    </>
  );
}