import Products from "../components/Products";

export default function New({ products }){
    const newProducts = products.filter(product => product.new === true);
    const newFilters = [
        { type: "sizes"},
        { type: "colors"},
      ];
    return (
        <div>
            <Products products={newProducts} filters={newFilters}/>
        </div>
    )
}