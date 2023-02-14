import { Link } from "react-router-dom";
import { useState } from "react";
import Filter from "./Filter";

export default function ProductCard({ products }) {
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
      <Filter
        products={products}
        handleFilterChange={handleFilterChange}
        selectedFilters={selectedFilters}
      />
      {products.map((product) => {
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