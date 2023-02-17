import { useParams } from "react-router-dom"
import Products from "../components/Products";

export default function Search({ products }){
    const { query } = useParams();
    const keywords = query.split("+");
    const searchedProducts = products.filter(product => {
        const matchingKeywords = keywords.filter(keyword => 
            product.colors.toLowerCase() === (keyword) || 
            product.name.toLowerCase().includes(keyword) || 
            product.sizes.some(size => size.toLowerCase() === keyword)
        );
        return matchingKeywords.length === keywords.length;
    });
    
        return (
            <Products products={searchedProducts}/>
        );
}
