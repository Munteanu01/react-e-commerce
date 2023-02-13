import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";

export default function New({ products }){
    const newProducts = products.filter(product => product.new === true);
    return (
        <div className="pt-20">
            <Filter products={newProducts} />
            {newProducts.map((product) => {
                return <ProductCard key={product.id} product={product} />
            })}
        </div>
    )
}