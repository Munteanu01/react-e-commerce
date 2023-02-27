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
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(true);
  return (
  <>
    <div className="pt-20 px-3 sm:px-5">
      <h1 className="font-bold text-xl mb-7">SHOPPING CART</h1>
      <ul className="grid">
        {cartItems.map((item) => (
          <li className="grid grid-cols-3 my-3 pb-3 border-b-2 border-[#E7E7E7]" key={`${item.id}-${item.size}`}>
            <Link to={`/product/${item.slug}`}>
              <img className="max-w-[110px]" src={item.image.url} alt="" />
            </Link>
            <div className="py-2 text-sm text-left">
              <p className="pb-2">{item.name.toUpperCase()}</p>
              <p>SIZE: {item.size}</p>
            </div>
            <div className="grid items-center justify-end text-center">
              <button className="w-6 flex p-1 ml-auto mb-auto hover:bg-[#EFEFEF]" onClick={() => handleRemoveItem(item.id, item.size)}>
                <img src={close} alt="" />
              </button>
              <p className="mt-6">{item.price * item.quantity} €</p>
              <div className="flex mx-auto items-center">
                <button className={`hover:text-neutral-500 text-lg ${item.quantity === 1 && 'opacity-0'}`} 
                        onClick={() => handleQuantityChange(item.id, item.size, -1)} disabled={item.quantity === 1}>-</button>
                <p className="px-6">{item.quantity}</p> 
                <button className="hover:text-neutral-500 text-lg" onClick={() => handleQuantityChange(item.id, item.size, 1)}>+</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="my-5 bg-[#F5F5F5]">
        <div className="border-b-2 p-2 border-[#E7E7E7]">
          <div className="flex justify-between">
            <p>PRODUCTS VALUE</p>
            <p>{totalPrice} €</p>
          </div>
          <div className="flex pt-3 justify-between">
            <p className=" items-center flex"> DELIVERY
              <button onClick={() => setShowDeliveryInfo(!showDeliveryInfo)}>
                <img className="w-4 h-4 mx-1 mb-1" src={info} alt="" />  
              </button>
            </p>
            <p>{totalPrice >= 80 ? "FREE" : "20 €"}</p>
          </div>
        </div>
        <div className="p-2 py-4 flex justify-between">
          <p>TOTAL</p>
          <p>{ totalPrice >= 80 ? totalPrice : totalPrice + 20} €</p>
        </div>
        
      </div>
      <Link to={'/checkout'}>
       <button className="flex justify-center mx-auto w-full py-2 px-10 font-bold tracking-wider my-10 text-lg
                          bg-black text-white hover:bg-[#EFEFEF] hover:text-neutral-900 transition duration-300 ease-out">CHECKOUT</button>
      </Link>
     
    </div>
    <div className={`overflow-hidden transition-all fixed bottom-0 bg-[#F5F5F5] w-full ${showDeliveryInfo ? 'translate-y-[180px]' : ' translate-y-0'}`}>
     <button className="w-5 mr-3 mt-3 flex ml-auto mb-auto"
             onClick={() => setShowDeliveryInfo(!showDeliveryInfo)}>  
       <img src={close} alt="" />
     </button>
     <p className="text-center pb-12 pt-6 px-12">BUY OVER 80 € AND YOU GET FREE SHIPING !</p>
    </div>
  </>
  );
}