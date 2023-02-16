import { Link } from "react-router-dom";
export default function ProductCard({ product, hasSelectedFilters }) {
    return(
        <Link
            to={`/product/${product.slug}`}
            key={product.slug}
            className={!hasSelectedFilters ? "hidden" : null}>
            <div className="max-w-lg  relative">
              <p>{product.name}</p>
              <div>
                {product.new && (
                  <div className="bg-black text-white p-3 m-2 absolute right-0">
                    NEW
                  </div>
                )}
                <img src={product.image.url} alt="" />
             
              </div>
              <p>{product.price}</p>
            </div>
        </Link>
    )
}