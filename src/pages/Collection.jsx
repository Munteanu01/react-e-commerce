import { useParams } from "react-router-dom"
import Products from "../components/Products"
export default function Collection({ collections, products }){
    const params = useParams()
    const selectedCategory = params.category
    const selectedCollection = collections.find(c => c.slug === params.slug)
    if (!selectedCollection) return null;
    const selectedProducts = products.filter(p => p.collections.some(collection => collection.name === selectedCollection.name));
    const categoryFilters = [
        { type: "sizes"},
        { type: "colors"},
      ];
    return (
        <div>
            {selectedCategory ? (
                <Products products={selectedProducts.filter(product => product.categories.some(category => category === selectedCategory))} filters={categoryFilters} />
                ) : (
                <Products products={selectedProducts}/>)}
        </div>
    );
}