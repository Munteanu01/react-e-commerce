import { Link } from "react-router-dom";
import { useState } from "react";

export const Filter = (products) => {
  let sizesArr = [];
  let colorsArr = [];
  let categoriesArr = [];
  products.map((product) => {
    product.sizes.map((size) => {
      if (!sizesArr.includes(size)) {
        sizesArr.push(size);
      }
    });
    product.categories.map((category) => {
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

export default function ProductCard({ products }) {
  const { sizesArr, colorsArr, categoriesArr } = Filter(products);
  const filters = [
    { type: "categories", values: categoriesArr },
    { type: "sizes", values: sizesArr },
    { type: "colors", values: colorsArr },
  ];

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
      <button>FILTER</button>
      {filters.map((filter) =>
        filter.values.map((value) => (
          <div key={value}>
            <label htmlFor={value}>{value}</label>
            <input
              type="checkbox"
              name={value}
              id={value}
              data-filter-type={filter.type}
              onChange={handleFilterChange}
            />
          </div>
        ))
      )}
      {products.map((product) => {
        const hasSelectedFilters = (
          (selectedFilters.categories.length === 0 || selectedFilters.categories.every((category) => product.categories.includes(category))) &&
          (selectedFilters.sizes.length === 0 || selectedFilters.sizes.every((size) => product.sizes.includes(size))) &&
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