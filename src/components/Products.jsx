import { Link } from "react-router-dom"
import { useState } from "react";

export const Filter = (products) => {
    const sizesArr = []
    const colorsArr = []
    const categoriesArr = [] 
    products.map((product) => {
        product.sizes.map((size) => {
            if (!sizesArr.includes(size)) { sizesArr.push(size)}})
        product.categories.map((category) => {
            if (!categoriesArr.includes(category)) {categoriesArr.push(category)}})
        if (!colorsArr.includes(product.colors)) {colorsArr.push(product.colors)}})
    return {sizesArr,colorsArr,categoriesArr}
}

export default function ProductCard({ products }) {
    const { sizesArr, colorsArr, categoriesArr } = Filter(products)
    const filters = [categoriesArr, sizesArr, colorsArr]

    const [selectedSizes, setSelectedSizes] = useState([]);
    const handleSizeChange = (event) => {
        const size = event.target.name;
        if (event.target.checked) {
            setSelectedSizes((prevSelectedSizes) => [...prevSelectedSizes, size]);
        } else {
            setSelectedSizes((prevSelectedSizes) => prevSelectedSizes.filter((selectedSize) => selectedSize !== size));
        }
    };

    return (
    <>
    <button>FILTER</button>
        {sizesArr.map((size) => (
            <div key={size}>
                <label htmlFor={size}>{size}</label>
                <input type="checkbox" name={size} id={size} onChange={handleSizeChange}/>
                </div>
        ))}
    {products.map((product) => {
        const hasSelectedSize = selectedSizes.length === 0 || selectedSizes.some((size) =>
            product.sizes.includes(size));
        return (
            <Link to={`/product/${product.slug}`} key={product.slug} className={!hasSelectedSize ? "hidden" : null}>
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