import { Link } from "react-router-dom"
import { useState } from "react";

export default function ProductCard({ products }){
    return(
    <>
        <button>FILTER</button>
        
        {products.map((product) => (
            <Link  to={`/product/${product.slug}`} key={product.slug}>
                <div className="max-w-lg  relative">
                    <p>{product.name}</p>
                    <div>
                    {product.new &&
                    <div className="bg-black text-white p-3 m-2 absolute right-0">NEW</div>}
                    <img src={product.image.url} alt="" />
                    </div>
                    <p>{product.price}</p>
                </div>
            </Link>
        ))}
    </>
    )
}