import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Product({ products }) {
  const params = useParams();
  const product = products.find((p) => p.slug === params.slug);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.includes("UNIQUE") ? "UNIQUE" : ""
  );
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const handleAddToCart = () => {
    if (selectedSize) {
      const index = cartItems.findIndex((item) => item.id === product.id && item.size === selectedSize);
      if (index === -1) {
        setCartItems([...cartItems, { ...product, size: selectedSize, quantity: 1 }]);
      } else {
        const updatedItems = [...cartItems];
        updatedItems[index].quantity++;
        setCartItems(updatedItems);
      }
    }
  };
 
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return  (
    <>
      {product ? (
        <div className="pt-40 flex">
          <img className="w-[200px]" src={product.image.url} alt="" />
          <h1>{product.name}</h1>
          {!product.sizes.includes("UNIQUE") && (
           <div>
             <label htmlFor="size">Size:</label>
             <select id="size" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
               <option value="">Select a size</option>
               {product.sizes.map((size) => (
                     <option key={size} value={size}>{size}</option>
                ))}
             </select>
           </div>
          )}
          <button onClick={handleAddToCart} disabled={!selectedSize}>Add</button>
        </div>
      ) : (<h1>Not found</h1>)}
    </>
    )
}