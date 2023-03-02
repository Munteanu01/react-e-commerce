import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Product({ products }) {
  const params = useParams();
  const product = products.find((p) => p.slug === params.slug);
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes.includes("UNIQUE") ? "UNIQUE" : ""
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
        <div className="pt-10 p-3 justify-center grid xl:grid-cols-3 min-h-[95vh] items-center">
          <div className="mt-5">
            <img className=" max-h-[80vh]" src={product.image.url} alt="" />
          </div>
          <div className="p-5 xl:p-24 flex flex-col justify-between h-full">
            <div>
              <h1 className="text-xl xl:text-2xl">{product.name.toUpperCase()}</h1>
              <h1 className="text-lg xl:text-xl pt-2 font-bold">{product.price} €</h1>
            </div>
            {!product.sizes.includes("UNIQUE") && (
              <div className="mt-3 mb-5">
                <h1 className="pb-2 xl:pb-5 font-semibold">SIZE <span className="pl-2 text-neutral-500">{selectedSize}</span></h1>
                {product.sizes.map((size) => (
                  <label key={size} className={`px-5 mr-2 py-2 cursor-pointer border-[3px] 
                                    ${selectedSize === size ? 'border-black' : ' border-transparent'}`}>
                    <input type="checkbox" name="size" value={size} checked={selectedSize === size} 
                          onChange={(e) => setSelectedSize(e.target.checked ? size : "")} className="hidden" />
                    {size}
                  </label>
                ))}
              </div>
            )}
            <button onClick={handleAddToCart} disabled={!selectedSize} 
                    className="w-full bg-black text-white font-bold py-2">
                    {selectedSize ? "ADD TO CART" : "PLEASE SELECT A SIZE"}</button>
          </div>
        </div>
      ) : (<h1>Not found</h1>)}
    </>
    )
}