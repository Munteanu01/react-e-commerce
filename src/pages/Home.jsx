import { Link } from "react-router-dom"
export default function Home({background}){
    return(
        <div className="" key={background?.id}>
            <Link to={'/collection/new'}>
            <img className="h-screen w-screen object-cover" src={background?.image.url}  alt="" />
            </Link>
        </div>
    )
}