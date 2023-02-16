import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Filter from "./Filter";
import ProductCard from "./ProductCard";

export default function Products({ products }) {

  const [selectedSort, setSelectedSort] = useState("recommended");
  const [defaultSort, setDefaultSort] = useState([]);
  useEffect(() => {
    if (products.length > 0) {
      setDefaultSort([...products]);
    }
  }, [products]);
  const handleSortChange = (event) => {
    const value = event.target.value;
    setSelectedSort(value);

    if (value === "recommended") {
      setDefaultSort([...products]);
    } else {
      setDefaultSort(null);
    }
  };
  const sortedProducts = (() => {
    if (selectedSort === "recommended") {
      return defaultSort;
    } else {
      return [...products].sort((a, b) => {
        if (selectedSort === "name") {
          return a.name.localeCompare(b.name);
        } else {
          const ascending = selectedSort === "price";
          const comparison = a.price - b.price;
          return ascending ? comparison : -comparison;
        }
      });
    }
  })();

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

  return (
    <>
      <div>
        <label htmlFor="sort-select">Sort by:</label>
        <select
          className="text-black"
          id="sort-select"
          value={selectedSort}
          onChange={handleSortChange}
        >
          <option value="recommended">Recommended</option>
          <option value="price">Price (low to high)</option>
          <option value="-price">Price (high to low)</option>
          <option value="name">Name</option>
        </select>
      </div>
      <Filter
        products={products}
        handleFilterChange={handleFilterChange}
        selectedFilters={selectedFilters}
      />
      {sortedProducts.map((product) => {
        const hasSelectedFilters =
          (selectedFilters.categories.length === 0 ||
            selectedFilters.categories.some((category) =>
              product.categories.includes(category)
            )) &&
          (selectedFilters.sizes.length === 0 ||
            selectedFilters.sizes.some((size) => product.sizes.includes(size))) &&
          (selectedFilters.colors.length === 0 ||
            selectedFilters.colors.includes(product.colors));
        return (
          <ProductCard product={product} hasSelectedFilters={hasSelectedFilters} key={product.id}/>
        );
      })}
    </>
  );
}