import { useState } from "react";

export default function Cart() {
    const [cartItems, setCartItems] = useState(() => {
      const storedCartItems = localStorage.getItem("cartItems");
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    });
  
    const handleIncreaseQuantity = (id) => {
      const updatedItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    };
  
    const handleDecreaseQuantity = (id) => {
      const updatedItems = cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
      setCartItems(updatedItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    };
  
    const handleRemoveItem = (id) => {
      const updatedItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    };
  
    return (
      <div className="pt-20">
        <h1>Cart</h1>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} 
              <button className="mx-3" onClick={() => handleDecreaseQuantity(item.id)}>-</button>
              {item.quantity}
              <button className="mx-3" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
              <button className="mx-3" onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }