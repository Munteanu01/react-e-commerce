import ProductCard from "../components/ProductCard"

export default function New({ products }){
    return (
        <div className="pt-20">
        {products.map((product) => {
            if (product.new) {
                return <ProductCard key={product.id} product={product}/>
            }
            return null;
        })}
        </div>
    )
}