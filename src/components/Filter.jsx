import { useState } from "react";
import arrow from "../icons/arrow-white.png"
import filterClose from "../icons/filter-close-white.png"
import ascending from "../icons/ascending-white.png"
import ascendingBlack from "../icons/ascending-black.png"
import descending from "../icons/descending-white.png"
import descendingBlack from "../icons/descending-black.png"

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
    { value: 'name', label: 'NAME' },
    { value: 'price', label: 'PRICE', icon: ascending, iconBlack: ascendingBlack },
    { value: '-price', label: 'PRICE', icon: descending, iconBlack: descendingBlack },
  ];
  const filterTypes = [
    { key: 'sizes', label: (size) => size.toUpperCase() },
    { key: 'colors', label: (color) => color.toUpperCase() },
    { key: 'categories', label: (category) => category.toUpperCase() },
  ];
  return (
    <div className="sm:flex justify-between pb-10 mx-5">
      <div className="sm:flex">
        {filtersArr.map((filter) => (
          <div key={filter.type} className="font-black">
            <button className={`items-center flex pt-[7px] pb-[3px] px-2 justify-between w-full 
                    ${showFilter === filter.type && ' bg-neutral-900'}`}
                    onClick={() => handleFilterHeaderClick(filter.type)}>
              <p className=" text-[0.9rem]">{filter.type?.toUpperCase()}</p> 
              <img className={`w-[15px] h-[13px] mb-[3px]
                   ${showFilter === filter.type ? " rotate-90" : " rotate-0"}`} src={arrow} alt="" />
            </button>
            {showFilter === filter.type &&
            <div className="sm:flex sm:absolute text-center left-10 my-4 mx-6 text-[0.9rem] font-medium">
                {filter.values.map((value) => (
                    <label key={value} className={`cursor-pointer mx-3 px-[8px] pt-[7px] pb-[4px] ${selectedFilters[filter.type].includes(value) ? 'bg-white text-black' : ''}`}>
                     <span>{value.toUpperCase()}</span>
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
            </div>}
          </div>
        ))}
        </div>
        <div key="sort" className="font-black">
          <button className={`items-center flex pt-[7px] pb-[3px] px-2 justify-between w-full 
                  ${showSort && ' bg-neutral-900'}`}
                  onClick={handleSortHeaderClick}>
            <p className="text-[0.9rem]">SORT</p>
            <img className={`w-[15px] h-[13px] mb-[3px]  ${showSort ? " rotate-90" : " rotate-0"}`} src={arrow} alt="" />
          </button>
          {showSort && (
            <div className="sm:flex sm:absolute right-20 left-10 text-[0.9rem]"> 
              {sortOptions.map((option) => (
                <label key={option.value} 
                       className={`cursor-pointer block pt-[4px] pb-[1px] px-2
                       ${selectedSort === option.value ? 'bg-white text-black' : ''}`}>
                  <span>{option.label}</span>
                  {option.icon && <img  className="inline-block w-[15px] ml-1 pb-1" src={selectedSort === option.value ? option.iconBlack : option.icon}/> }
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
      <div className="flex flex-wrap bg-neutral-900 text-[0.85rem]">
        {filterTypes.map(({ key, label }) =>
          selectedFilters?.[key]?.map((filter) => (
            <button key={filter}
              className="font-bold px-2 py-2 flex items-center"
              onClick={() => removeFilter(key, filter)}>
              <p>{label(filter)}</p>
              <img className="w-[12px] h-[12px] ml-[3px] mb-[2px] " src={filterClose} alt="" />
            </button>
          ))
        )}
      </div>
    </div>
  );
}