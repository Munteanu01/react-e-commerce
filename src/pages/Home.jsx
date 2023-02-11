import { Link } from "react-router-dom"
export default function Home({backgrounds}){
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    const randomBackground = backgrounds[randomIndex];
    return(
        <div className="" key={randomBackground?.id}>
            <Link to={'/collection/new'}>
            <video className="h-screen w-screen object-cover" src={randomBackground?.image.url}  autoPlay loop muted alt="" />
            </Link>
        </div>
    )
}