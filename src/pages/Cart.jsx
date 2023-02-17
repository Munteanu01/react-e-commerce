export default function Cart() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
    return (
      <div className="pt-20">
        <h1>Cart</h1>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    );
  }