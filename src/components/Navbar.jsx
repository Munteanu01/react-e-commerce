import { Link } from "react-router-dom";
import { useState } from "react";
export default function Navbar(props){
    const collections = props.collections
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const toggleMenu = () => {
        setMenuIsOpen(!menuIsOpen);
    }
    const [isCartVisible, setIsCartVisible] = useState(false);

    const handleToggleCart = () => {
      setIsCartVisible((prevState) => !prevState);
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
    const [searchMenu, setSearchMenu] = useState(false)
    const toggleSearchMenu = () => {
        setSearchMenu(!searchMenu)
    }
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim() !== '') {
          const encodedQuery = encodeURIComponent(searchQuery).replace(/%20/g, '+').replace(/%2B/g, '+').toLowerCase();
          window.location.href = `/search/${encodedQuery}`;
        }
      };
    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = localStorage.getItem("cartItems");
        return storedCartItems ? JSON.parse(storedCartItems) : [];
      });
      const handleIncreaseQuantity = (id, size) => {
        const updatedItems = cartItems.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCartItems(updatedItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      };
      
      const handleDecreaseQuantity = (id, size) => {
        const updatedItems = cartItems
          .map((item) =>
            item.id === id && item.size === size
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0);
        setCartItems(updatedItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      };
      
      const handleRemoveItem = (id, size) => {
        const updatedItems = cartItems.filter((item) => item.id !== id || item.size !== size);
        setCartItems(updatedItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      };
    return(
    <nav className=" z-50 fixed bg-black">

        <div className="h-[50px] pl-5 pr-5 md:pr-10 items-center flex w-[100vw]">

            <button className="w-[20px]">
                <img src={props.menu} onClick={toggleMenu} alt="" />
            </button>
            <Link to={'/'}>
                <img className="w-[37px] ml-5" src={props.eye} alt="" />
            </Link>
            <Link className="ml-auto" to="/account">
                <img className="w-[22px]" src={props.account} alt="" />
            </Link>
            <button onClick={toggleSearchMenu}>
                <img className="w-[24px] mx-5" src={props.search} alt="" />
            </button>
            {searchMenu && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                <form onSubmit={handleSubmit}>
                <img className="w-8 top-3 right-5 absolute" src={props.close} alt="" onClick={toggleSearchMenu}/>
                <input
                  type="search"
                  placeholder=""
                  className="p-2 text-bold text-4xl text-center text-white bg-transparent border-b-4 outline-none w-[50vw]"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}/>
                </form>
              </div>
            )}
            <button onClick={handleToggleCart}>
                <img className="w-[22px]" src={props.cart} alt="" />
            </button>
            <div className={isCartVisible ? 'mt-14 top-0 right-0 absolute bg-black px-20' : 'hidden'}>
              <h1>Cart</h1>
                  <ul>
                     {cartItems.map((item) => (
                        <li key={`${item.id}-${item.size}`}>
                         <p>{item.name} {item.size}</p>
                         <button className="mx-3" onClick={() => handleDecreaseQuantity(item.id, item.size)}>-</button>
                           {item.quantity}
                         <button className="mx-3" onClick={() => handleIncreaseQuantity(item.id, item.size)}>+</button>

                         <button className="mx-3" onClick={() => handleRemoveItem(item.id, item.size)}>Remove</button>
                        </li>
                      ))}
                  </ul>
              <Link to="/cart">View all</Link>
            </div>

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