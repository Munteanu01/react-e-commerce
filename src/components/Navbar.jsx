import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Searching from "./Searching";

export default function Navbar(props){
    const collections = props.collections
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const toggleMenu = () => {
        setMenuIsOpen(!menuIsOpen);
    };
    const [collectionStates, setCollectionStates] = useState({});
    const toggleCollection = (collectionId) => {
        setCollectionStates((prevState) => {
            return {
                ...prevState,
                [collectionId]: !prevState[collectionId],
            };
        });
    };


    return(
        <nav className="z-50 fixed bg-white">
            <div className="h-[50px] sm:px-5 px-3 md:pr-10 items-center flex w-screen">
                <button className="w-[20px]">
                    <img src={props.menu} onClick={toggleMenu} alt="" />
                </button>
                <Link to={'/'}>
                    <img className="sm:w-[37px] w-[32px] ml-5" src={props.eye} alt="" />
                </Link>
                <Link className="ml-auto" to="/account">
                    <img className="w-[22px]" src={props.account} alt="" />
                </Link>
                <Searching search={props.search} close={props.close}/>
                <Link to="/cart">
                    <img className="w-[22px]" src={props.cart} alt="" />
                </Link>

        </div>

        <div className={`${ menuIsOpen ? "left-[0px]" : "left-[-350px]"} md:pl-[40px] pl-[20px] pr-5 block absolute w-[260px] h-[100vh] inset-0 bg-white text-black transition-all ease-in-out`}>
            <button className="flex w-[20px] pt-[18px] ml-auto">
                <img src={props.close} onClick={toggleMenu} alt="" />
            </button>
            <div className="pt-40 leading-9 font-extrabold tracking-wider">
            <Link to={'/new'} onClick={toggleMenu}>NEW</Link>
            {collections.map((collection) => (
                <div className="items-center"  key={collection.id}>
                    
                    <div className="flex justify-between">
                        <Link to={`/${collection.slug}`} onClick={toggleMenu}>
                        <h1>{collection.name}</h1>
                        </Link>
                        {collection.categories.length !== 0 && (
                        <button className={collectionStates[collection.id] ? " rotate-90" : " rotate-0"} onClick={() => toggleCollection(collection.id)}>
                            <img className="w-[18px] h-[15px] mb-[4px]" src={props.arrow} alt="" />
                        </button>)}
                    </div>

                    <div className={ collectionStates[collection.id] ? "block" : "hidden"}>
                        {collection.categories.map((category) => (
                            <Link to={`/${collection.slug}/${category}`} onClick={toggleMenu} key={category}>
                            <h1 className="pl-5" >{category.toUpperCase()}</h1>
                            </Link>
                        ))}
                    </div>
                </div>
                ))}
            </div>
        </div>
        
    </nav>
    )
}