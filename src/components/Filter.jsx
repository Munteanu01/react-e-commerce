import { useState } from "react";
import arrow from "../icons/arrow-black.png"
import filterClose from "../icons/filter-close-white.png"
import ascending from "../icons/ascending-black.png"
import descending from "../icons/descending-black.png"

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
    { value: 'price', label: 'PRICE', icon: ascending},
    { value: '-price', label: 'PRICE', icon: descending},
    { value: 'name', label: 'NAME' },
    { value: 'recommended', label: 'RECOMMENDED' },
  ];
  const filterTypes = [
    { key: 'sizes', label: (size) => size.toUpperCase() },
    { key: 'colors', label: (color) => color.toUpperCase() },
    { key: 'categories', label: (category) => category.toUpperCase() },
  ];
  return (
  <div className="pb-10 relative text-[0.9rem]">
    <div className="sm:flex justify-between font-bold">
      <div className="sm:flex">
        {filtersArr.map((filter) => (
          <div key={filter.type} className="">
            <button className={`items-center flex pt-[7px] pb-[10px] px-2 justify-between w-full  
                               ${showFilter === filter.type && ' bg-[#EFEFEF]'}`}
                    onClick={() => handleFilterHeaderClick(filter.type)}>
              <p className="">{filter.type?.toUpperCase()}</p> 
              <img className={`ml-1 w-[15px] h-[13px] mb-[4px] ${showFilter === filter.type ? " rotate-90" : " rotate-0"}`} src={arrow} alt="" />
            </button>
            {showFilter === filter.type &&
            <div className="sm:flex sm:absolute flex-wrap left-0 mb-5 mt-3 sm:my-0 sm:mx-0 mx-6 font-semibold w-full sm:bg-[#EFEFEF]">
                {filter.values.map((value) => (
                    <label key={value} className={`cursor-pointer mx-3 sm:my-2 px-2 pt-[3px]
                                                 ${selectedFilters[filter.type].includes(value) ? 'bg-[#EFEFEF] sm:bg-black sm:text-white' : ''}`}>
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
        <div key="sort" className="">
          <button className={`items-center flex pt-[7px] pb-[3px] px-2 justify-between w-full
                    ${showSort && 'bg-[#EFEFEF]'}`}
                  onClick={handleSortHeaderClick}>
            <p className="">SORT</p>
            <img className={`w-[15px] h-[13px] mb-[3px]  ${showSort ? " rotate-90" : " rotate-0"}`} src={arrow} alt="" />
          </button>
          {showSort && (
            <div className="flex justify-between sm:absolute right-0 text-[0.85rem] mx-2 my-3 sm:my-0"> 
              {sortOptions.map((option) => (
                <label key={option.value} 
                       className={`cursor-pointer block pt-[7px] pb-[4px] px-1 sm:mx-1
                       ${selectedSort === option.value ? 'bg-[#EFEFEF]' : ''}`}>
                  <span>{option.label}</span>
                  {option.icon && <img  className="inline-block w-[15px] ml-1 pb-1" src={option.icon}/> }
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
    <div className={`sm:absolute w-full px-3 flex flex-wrap bg-[#EFEFEF]
                    ${(showFilter || showSort) && ' top-20'}`}>
     {filterTypes.map(({ key, label }) =>
       selectedFilters?.[key]?.map((filter) => (
         <button key={filter}
           className=" py-2 flex items-center px-2"
           onClick={() => removeFilter(key, filter)}>
           <p>{label(filter)}</p>
           <img className="w-[16px] ml-[1px] mb-[3px] sm:mb-[4px]" src={filterClose} alt="" />
         </button>
       ))
     )}
   </div>
  </div>
  );
}