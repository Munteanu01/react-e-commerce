import { useState } from "react";
import { Link } from "react-router-dom";

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
          <li className="grid grid-cols-2 mb-3 pb-3 border-b-[3px] border-black" key={`${item.id}-${item.size}`}>
            <div>
              <Link to={`/product/${item.slug}`}>
                <img className="max-w-[150px]" src={item.image.url} alt="" />
                <p className="py-2">{item.name.toUpperCase()}</p>
              </Link>
              <p className=" text-sm">SIZE: {item.size}</p>
            </div>
            <div className="grid items-center text-center">
              <div className="flex mx-auto">
                <button className="hover:text-neutral-500" onClick={() => handleQuantityChange(item.id, item.size, -1)}>-</button>
                <p className="px-6">{item.quantity}</p> 
                <button className="hover:text-neutral-500" onClick={() => handleQuantityChange(item.id, item.size, 1)}>+</button>
              </div>
              <button className="pt-1 hover:bg-red-600 mx-10 hover:text-[#EFEFEF]  transition duration-300 ease-out" 
                      onClick={() => handleRemoveItem(item.id, item.size)}>REMOVE</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to={'/checkout'}>
       <button className="flex mx-auto  py-2 px-10 font-bold tracking-wider my-10 text-lg
                          bg-black text-white hover:bg-[#EFEFEF] hover:text-neutral-900 transition duration-300 ease-out">CHECKOUT</button>
      </Link>
    </div>
  );
}