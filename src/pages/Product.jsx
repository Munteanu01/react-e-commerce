import { useParams } from "react-router-dom"
export default function Product({products}){
    const params = useParams()
    const product = products.find(p => p.slug === params.slug);
    return (
        <div className="pt-40 flex">
        <img src={product?.image.url} alt="" />
        <h1>{product?.name}</h1>
        </div>
    )
}