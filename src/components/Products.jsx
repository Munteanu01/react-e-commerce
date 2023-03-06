import { useState, useEffect } from "react";
import Filter from "./Filter";
import ProductCard from "./ProductCard";
import noResults from '../icons/no-results-2.png'

export default function Products({ products, filters }) {
  const [selectedSort, setSelectedSort] = useState("recommended");
  const [defaultSort, setDefaultSort] = useState([]);

  useEffect(() => {
    setDefaultSort(products.length > 0 ? [...products] : []);
  }, [products]);

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSelectedSort(value);
    setDefaultSort(value === "recommended" ? [...products] : []);
  };

  const sortedProducts = selectedSort === "recommended"
    ? defaultSort
    : [...products].sort((a, b) => {
        if (selectedSort === "name") {
          return a.name.localeCompare(b.name);
        }
        const ascending = selectedSort === "price";
        const comparison = a.price - b.price;
        return ascending ? comparison : -comparison;
      });

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    sizes: [],
    colors: [],
  });

  const handleFilterChange = (event) => {
    const filterType = event.target.getAttribute("data-filter-type");
    const filterValue = event.target.name;
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      [filterType]: event.target.checked
        ? [...prevSelectedFilters[filterType], filterValue]
        : prevSelectedFilters[filterType].filter(
            (selectedValue) => selectedValue !== filterValue
          ),
    }));
  };

  const removeFilter = (filterType, filterValue) => {
    setSelectedFilters((prevSelectedFilters) => {
      const updatedFilters = { ...prevSelectedFilters };
      const filterIndex = updatedFilters[filterType].indexOf(filterValue);
      if (filterIndex > -1) {
        updatedFilters[filterType].splice(filterIndex, 1);
      }
      return updatedFilters;
    });
  };

  const filteredProducts = sortedProducts.filter((product) => {
    const hasSelectedFilters =
      (selectedFilters.categories.length === 0 ||
        selectedFilters.categories.some((category) =>
          product.categories.includes(category)
        )) &&
      (selectedFilters.sizes.length === 0 ||
        selectedFilters.sizes.some((size) =>
          product.sizes.includes(size)
        )) &&
      (selectedFilters.colors.length === 0 ||
        selectedFilters.colors.some((color)  =>
        product.colors.includes(color)
      )) 
    return hasSelectedFilters;
  });

  useEffect(() => {
    setSelectedFilters({ categories: [], sizes: [], colors: [] });
  }, [location.path]);

  return (
    <div className="py-16 mx-5 md:mx-10 max-w-[1600px] justify-center grid 2xl:mx-auto">
      <Filter removeFilter={removeFilter} products={products} filters={filters} handleFilterChange={handleFilterChange}
              selectedFilters={selectedFilters} selectedSort={selectedSort} handleSortChange={handleSortChange}/>
      <div className="grid grid-cols-2 md:grid-cols-3 justify-center sm:gap-10 gap-4">
        {filteredProducts.length === 0 ? (
        <>
          <img className="xl:max-w-sm flex mx-auto mt-12" src={noResults} alt="" />
          <p className="sm:text-2xl  text-center break-words items-center ml-auto md:px-10 flex font-extrabold mt-14 leading-8 md:col-span-2">We're sorry, we couldn't find any matching products.</p>
        </>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard product={product} hasSelectedFilters={true} key={product.id}/>
          ))
        )}
      </div>
    </div>
  );
}