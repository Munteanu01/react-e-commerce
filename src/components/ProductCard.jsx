import { Link } from "react-router-dom";
export default function ProductCard({ product, hasSelectedFilters }) {
    return(
        <Link
            to={`/product/${product.slug}`}
            key={product.slug}
            className={!hasSelectedFilters ? "hidden" : null}>
            <div className=" max-w-sm relative mx-auto font-bold">
              <div>
                {product.new && (
                  <div className="bg-black text-white lg:px-4 px-2 lg:py-2 m-2 absolute right-0">
                    NEW
                  </div>
                )}
                <img src={product.image.url} alt="" />
             
              </div>
              <div className="grid grid-cols-4 pt-2 px-1 justify-between lg:text-lg">
                 <p className="col-span-3">{product.name.toUpperCase()}</p>
                 <p className="text-end col-span-1">{product.price}  €</p>
              </div>
            </div>
        </Link>
    )
}