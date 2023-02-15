import { Link } from "react-router-dom";
import { useState } from "react";
import Filter from "./Filter";

export default function ProductCard({ products }) {
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    sizes: [],
    colors: [],
  });
  const [selectedSort, setSelectedSort] = useState("price");
  
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
  
  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (selectedSort === "name") {
      return a.name.localeCompare(b.name);
    } else {
      const ascending = selectedSort === "price";
      const comparison = a.price - b.price;
      return ascending ? comparison : -comparison;
    }
  });

  return (
    <>
      <div>
        <label htmlFor="sort-select">Sort by:</label>
        <select className="text-black" id="sort-select" value={selectedSort} onChange={handleSortChange}>
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
        const hasSelectedFilters = (
          (selectedFilters.categories.length === 0 || selectedFilters.categories.some((category) => product.categories.includes(category))) &&
          (selectedFilters.sizes.length === 0 || selectedFilters.sizes.some((size) => product.sizes.includes(size))) &&
          (selectedFilters.colors.length === 0 || selectedFilters.colors.includes(product.colors))
        );
        return (
          <Link
            to={`/product/${product.slug}`}
            key={product.slug}
            className={!hasSelectedFilters ? "hidden" : null}
          >
            <div className="max-w-lg  relative">
              <p>{product.name}</p>
              <div>
                {product.new && (<div className="bg-black text-white p-3 m-2 absolute right-0">NEW</div>)}
                <img src={product.image.url} alt="" />
              </div>
              <p>{product.price}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}