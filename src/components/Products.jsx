import { useState, useEffect } from "react";
import Filter from "./Filter";
import ProductCard from "./ProductCard";
import Sort from "./Sort";

export default function Products({ products, filters }) {

//SORTING
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

//FILTERING
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
    <div className="pt-20">
      <div className="flex justify-between pb-10 mx-12 font-bold">
        <Filter products={products} filters={filters} handleFilterChange={handleFilterChange} selectedFilters={selectedFilters}/>
        <Sort selectedSort={selectedSort} handleSortChange={handleSortChange}/>
      </div>
{/*PRODUCTS*/}
      <div className="grid grid-cols-3 gap-4 mx-12">
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
      </div>
    </div>
  );
}