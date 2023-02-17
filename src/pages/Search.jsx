import { useParams } from "react-router-dom"

export default function Search({ products }){
    const { query } = useParams();
    const keywords = query.split("+");
        return (
            products.map(product => {
                if (keywords.some(keyword => 
                    product.colors === keyword || 
                    product.name.toLowerCase().includes(keyword) || 
                    product.sizes.some(size => size === keyword ))) {
                    console.log(product);
                }
            })
        );
}
