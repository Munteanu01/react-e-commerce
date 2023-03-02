import { useState, useEffect } from "react";
import Filter from "./Filter";
import ProductCard from "./ProductCard";

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
        selectedFilters.colors.includes(product.colors));
    return hasSelectedFilters;
  });

  return (
    <div className="pt-16 mx-5 md:mx-10 max-w-[1600px] justify-center grid 2xl:mx-auto">
      <Filter removeFilter={removeFilter} products={products} filters={filters} handleFilterChange={handleFilterChange}
              selectedFilters={selectedFilters} selectedSort={selectedSort} handleSortChange={handleSortChange}/>
      <div className="grid grid-cols-2 md:grid-cols-3 justify-center sm:gap-10 gap-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center mt-10 text-gray-500">
            No products for this filter
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard product={product} hasSelectedFilters={true} key={product.id}/>
          ))
        )}
      </div>
    </div>
  );
}