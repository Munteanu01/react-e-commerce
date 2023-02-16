import Products from "../components/Products";

export default function New({ products }){
    const newProducts = products.filter(product => product.new === true);
    const newFilters = [
        { type: "sizes"},
        { type: "colors"},
      ];
    return (
        <div className="pt-20">
            <Products products={newProducts} filters={newFilters}/>
        </div>
    )
}