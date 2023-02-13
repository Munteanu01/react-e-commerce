import Products from "../components/Products";

export default function New({ products }){
    const newProducts = products.filter(product => product.new === true);
    return (
        <div className="pt-20">
            <Products products={newProducts} />
        </div>
    )
}