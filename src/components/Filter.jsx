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
        colorsArr.push(product.colors);}
  });
  return { sizesArr, colorsArr, categoriesArr };
};

export default function Filtering({ products, filters, handleFilterChange, selectedFilters }) {
  const { sizesArr, colorsArr, categoriesArr } = Filter(products);
  const filtersArr = filters ? filters.map(filter => ({
    type: filter.type,
    values: Filter(products)[`${filter.type}Arr`],
  })) : [
    categoriesArr.length > 0 && { type: "categories", values: categoriesArr },
    sizesArr.length > 0 && { type: "sizes", values: sizesArr },
    colorsArr.length > 0 && { type: "colors", values: colorsArr },
  ].filter(Boolean);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const handleFilterButtonClick = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  const [showFilters, setShowFilters] = useState({});
  const handleFilterHeaderClick = (filterType) => {
    setShowFilters({ ...showFilters, [filterType]: !showFilters[filterType] });};
  return (
    <div className="">
      <button onClick={handleFilterButtonClick}>FILTER</button>
      <div className={isFilterVisible ? 'flex' : 'hidden'}>
      {filtersArr.map((filter) => (
        <div key={filter.type} className="mx-10">
        <button onClick={() => handleFilterHeaderClick(filter.type)}>{filter.type?.toUpperCase()}</button>
        {showFilters[filter.type] && filter.values.map((value) => (
          <div key={value}>
            <label htmlFor={value}>{value}</label>
            <input type="checkbox"
              name={value}
              id={value}
              data-filter-type={filter.type}
              onChange={handleFilterChange}
              checked={selectedFilters[filter.type].includes(value)}
            />
          </div>
        ))}
        </div>
      ))}
      </div>
    </div>
  )
}




