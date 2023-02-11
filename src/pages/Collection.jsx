import { useParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"
export default function Collection({ collections, products }){
    const params = useParams()
    const selectedCategory = params.category
    const selectedCollection = collections.find(c => c.slug === params.slug)
    if (!selectedCollection) return null;
    const selectedProducts = products.filter(p => p.collections.some(collection => collection.name === selectedCollection.name));

    return (
        <div className="pt-20">
            <h1 className="text-4xl">{selectedCollection.name}</h1>
                {selectedCategory ? (
                    selectedProducts.filter(product => product.categories.some(category => category === selectedCategory)).map((product) => (
                        <ProductCard key={product.id} product={product} />
                ))) : (
                selectedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                )))}
        </div>
    );
}