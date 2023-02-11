import { useParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"
export default function Collection({collections}){
    const params = useParams()
    const collection = collections.find(c => c.slug === params.slug)
    return (
        <div className="pt-20">
            <h1 className="text-4xl">{collection?.name}</h1>
            {collection?.products.map((product) => {
                if (!params.category || product.categories.includes(params.category)) {
                    return (
                        <div key={product.id}>
                            <ProductCard product={product}/>
                        </div>
                    );
                }
                ;
            })}
        </div>
    )
}