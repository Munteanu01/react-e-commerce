import { Link } from "react-router-dom";
import { useState} from "react";
export default function Navbar(props){
    const collections = props.collections
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const toggleMenu = () => {
        setMenuIsOpen(!menuIsOpen);
    }
    const [collectionStates, setCollectionStates] = useState({});
    const toggleCollection = (collectionId) => {
        setCollectionStates((prevState) => {
        return {
            ...prevState,
            [collectionId]: !prevState[collectionId],
        };
        });
    };
    const [searchMenu, setSearchMenu] = useState(false)
    const toggleSearchMenu = () => {
        setSearchMenu(!searchMenu)
    }
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      if (searchQuery.trim() !== '') {
        window.location.href = `/search/${searchQuery}`;
      }
    };
    return(
    <nav className=" z-50 fixed bg-black">

        <div className="h-[50px] px-5 items-center flex w-[100vw]">
            <button className="w-[20px]">
                <img src={props.menu} onClick={toggleMenu} alt="" />
            </button>
            <Link to={'/'}>
                <img className="w-[37px] ml-5" src={props.eye} alt="" />
            </Link>
            <Link className="ml-auto" to={""}>
                <img className="w-[22px]" src={props.account} alt="" />
            </Link>
            <button onClick={toggleSearchMenu}>
                <img className="w-[24px] mx-5" src={props.search} alt="" />
            </button>
            {searchMenu && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                <form onSubmit={handleSubmit}>
                <img className="w-8 top-6 right-6 absolute" src={props.close} alt="" onClick={toggleSearchMenu}/>
                <input
                  type="search"
                  placeholder=""
                  className="p-2 text-bold text-4xl text-center text-white bg-transparent border-b-4 outline-none w-[50vw]"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}/>
                </form>
              </div>
            )}
            <button>
                <img className="w-[22px]" src={props.cart} alt="" />
            </button>
        </div>

        <div className={`${ menuIsOpen ? "left-[0px]" : "left-[-350px]"} md:pl-[40px] pl-[20px] pr-5 block absolute w-[260px] h-[100vh] inset-0 bg-black transition-all ease-in-out`}>
            <button className="flex w-[20px] pt-[18px] ml-auto">
                <img src={props.close} onClick={toggleMenu} alt="" />
            </button>
            <div className="pt-40 leading-9 font-bold text-white">
            <Link to={'/new'} onClick={toggleMenu}>NEW</Link>
            {collections.map((collection) => (
                <div className="items-center"  key={collection.id}>
                    
                    <div className="flex justify-between ">
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