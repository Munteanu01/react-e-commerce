import { useState } from "react";

export const Filter = (products) => {
  let sizesArr = [];
  let colorsArr = [];
  let categoriesArr = [];
  products.forEach((product) => {
    product.sizes.forEach((size) => {
      if (!sizesArr.includes(size)) {
        sizesArr.push(size);
      }
    });
    product.categories.forEach((category) => {
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

  const [showFilters, setShowFilters] = useState({});

  const handleFilterHeaderClick = (filterType) => {
    setShowFilters({ ...showFilters, [filterType]: !showFilters[filterType] });
  };

  return (
      filters.map((filter) => (
        <div key={filter.type}>
          <button onClick={() => handleFilterHeaderClick(filter.type)}>{filter.type.toUpperCase()}</button>
          {showFilters[filter.type] && filter.values.map((value) => (
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
          ))}
        </div>
      ))
  );
}




