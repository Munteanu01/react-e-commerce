import { useState } from "react";

export default function Cart() {
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
  
  return (
    <div className="pt-20">
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
    </div>
  );
}