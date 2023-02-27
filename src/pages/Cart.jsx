import { useState } from "react";
import { Link } from "react-router-dom";
import close from '../icons/close-black.png'
import info from '../icons/info.png'

export default function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  
  const handleQuantityChange = (id, size, amount) => {
    const updatedItems = cartItems
      .map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: item.quantity + amount }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCartItems(updatedItems);
  };
  
  const handleRemoveItem = (id, size) => {
    const updatedItems = cartItems.filter((item) => item.id !== id || item.size !== size);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };
  
  return (
    <div className="pt-20 px-3 sm:px-5">
      <h1 className="font-bold text-xl mb-7 border-b-[3px] border-black">CART</h1>
      <ul className="grid">
        {cartItems.map((item) => (
          <li className="grid grid-cols-3 my-3 pb-3 border-b-[3px] border-black" key={`${item.id}-${item.size}`}>
            <Link to={`/product/${item.slug}`}>
              <img className="max-w-[110px]" src={item.image.url} alt="" />
            </Link>
            <div className="py-2 text-sm">
              <p className="pb-2">{item.name.toUpperCase()}</p>
              <p>SIZE: {item.size}</p>
            </div>
            <div className="grid items-center text-center">
              <button className="w-6 flex p-1 ml-auto mb-auto hover:bg-[#EFEFEF]" onClick={() => handleRemoveItem(item.id, item.size)}>
                <img src={close} alt="" />
              </button>
              <p className="mt-6">{item.price * item.quantity} €</p>
              <div className="flex mx-auto">
                <button className={`hover:text-neutral-500 ${item.quantity === 1 && 'opacity-0'}`} 
                        onClick={() => handleQuantityChange(item.id, item.size, -1)} disabled={item.quantity === 1}>-</button>
                <p className="px-6">{item.quantity}</p> 
                <button className="hover:text-neutral-500" onClick={() => handleQuantityChange(item.id, item.size, 1)}>+</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="my-5">
        <p>PRODUCTS VALUE: {}</p>
        <p className="flex items-center">DELIVERY 
          <button>
            <img className="w-4 h-4 mx-1 mb-1" src={info} alt="" />  
           
          </button>
          : {}
        </p>
        <p>Buy for xx to have free delivery</p>
        <p>TOTAL :</p>
      </div>
      <Link to={'/checkout'}>
       <button className="flex mx-auto  py-2 px-10 font-bold tracking-wider my-10 text-lg
                          bg-black text-white hover:bg-[#EFEFEF] hover:text-neutral-900 transition duration-300 ease-out">CHECKOUT</button>
      </Link>
    </div>
  );
}