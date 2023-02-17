import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Product({ products }) {
  const params = useParams();
  const product = products.find((p) => p.slug === params.slug);

  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const handleAddToCart = () => {
    const index = cartItems.findIndex((item) => item.id === product.id);
    if (index === -1) {
      // Product is not in the cart, add it with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    } else {
      // Product is already in the cart, increment its quantity
      const updatedItems = [...cartItems];
      updatedItems[index].quantity++;
      setCartItems(updatedItems);
    }
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="pt-40 flex">
      <img className="w-[200px]" src={product?.image.url} alt="" />
      <h1>{product?.name}</h1>
      <button onClick={handleAddToCart}>Add</button>
    </div>
  );
}