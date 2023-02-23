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

export default function Filtering({
  products,
  filters,
  removeFilter,
  handleFilterChange,
  selectedFilters,
  selectedSort,
  handleSortChange,
}) {
  const { sizesArr, colorsArr, categoriesArr } = Filter(products);
  const filtersArr = filters
    ? filters.map((filter) => ({
        type: filter.type,
        values: Filter(products)[`${filter.type}Arr`],
      }))
    : [
        categoriesArr.length > 0 && {
          type: "categories",
          values: categoriesArr,
        },
        sizesArr.length > 0 && { type: "sizes", values: sizesArr },
        colorsArr.length > 0 && { type: "colors", values: colorsArr },
      ].filter(Boolean);

  const [showFilter, setShowFilter] = useState("");
  const [showSort, setShowSort] = useState(false);

  const handleFilterHeaderClick = (filterType) => {
    setShowFilter(showFilter === filterType ? "" : filterType);
    setShowSort(false);
  };

  const handleSortHeaderClick = () => {
    setShowSort(!showSort);
    setShowFilter("");
  };
  const sortOptions = [
    { value: 'recommended', label: 'RECOMMENDED' },
    { value: 'price', label: 'PRICE' },
    { value: '-price', label: 'PRICE (Descending)' },
    { value: 'name', label: 'NAME' },
  ];
  
  return (
  <div>
    <div className="sm:flex justify-between pb-10 mx-5 font-bold">
      <div className="sm:flex">
        {filtersArr.map((filter) => (
          <div key={filter.type} className="ml-5">
            <button onClick={() => handleFilterHeaderClick(filter.type)}>
              {filter.type?.toUpperCase()}
            </button>
            <div className="sm:flex sm:absolute left-10">
              {showFilter === filter.type &&
                filter.values.map((value) => (
                    <label key={value} className={`cursor-pointer mr-1 ${selectedFilters[filter.type].includes(value) ? 'bg-white text-black' : ''}`}>
                     <span className="mr-1">{value.toUpperCase()}</span>
                     <input
                       type="checkbox"
                       name={value}
                       id={value}
                       data-filter-type={filter.type}
                       onChange={handleFilterChange}
                       checked={selectedFilters[filter.type].includes(value)}
                       className="hidden"/>
                    </label>
                ))}
            </div>
          </div>
        ))}
        </div>
        <div key="sort" className="ml-5">
          <button onClick={handleSortHeaderClick}>SORT</button>
          {showSort && (
            <div className="sm:flex sm:absolute right-20"> 
              {sortOptions.map((option) => (
                <label key={option.value} className={`cursor-pointer block ${selectedSort === option.value ? 'bg-white text-black' : ''}`}>
                  <span>{option.label}</span>
                  <input
                    type="checkbox"
                    name="sort"
                    value={option.value}
                    checked={selectedSort === option.value}
                    onChange={handleSortChange}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          )}
      </div>
    </div>
    <div>
    {selectedFilters?.sizes?.map((size) => (
  <button className="pr-3" key={size} onClick={() => removeFilter('sizes', size)}>
    {size.toUpperCase()}X
  </button>
))}

{selectedFilters?.colors?.map((color) => (
  <button key={color} onClick={() => removeFilter('colors', color)}>
    {color}
  </button>
))}

{selectedFilters?.categories?.map((category) => (
  <button key={category} onClick={() => removeFilter('categories', category)}>
    {category}
  </button>
))}
    </div>
  </div>
  );
}