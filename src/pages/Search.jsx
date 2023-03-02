import { useParams } from "react-router-dom"
import Products from "../components/Products";
import noResults from "../icons/no-results.png"

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
    if(searchedProducts.length > 0){
        return (
            <Products products={searchedProducts}/>
        );
    }
    else{
        return (
        <div className="h-screen text-center flex flex-col justify-center">
            <img className="sm:max-w-[416px] max-w-xs mx-auto px-14" src={noResults} alt="" />
            <p className="text-xl font-extrabold mt-10 leading-8 px-3">We're sorry, we couldn't find any matching products.</p>
        </div>
        )
    }

}
