import { useState } from "react";

export default function CheckoutForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [cvv, setCvv] = useState('');
    const handleSubmit = (e) => {
      e.preventDefault();
    };
  
    return (
      <form onSubmit={handleSubmit} className="max-w-md mx-auto  p-4  rounded-lg">
        <h2 className="text-2xl font-bold mb-4 mt-20">CHECKOUT</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block font-bold mb-2" required>
            NAME
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border py-2 px-3 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-2">
            EMAIL
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border py-2 px-3 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block font-bold mb-2">
            ADDRESS
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border py-2 px-3 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block font-bold mb-2">
            CITY
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border py-2 px-3 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block font-bold mb-2">
            STATE
          </label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border py-2 px-3 rounded"
            required
          />
        </div>
        <div className="mb-4">
            <label htmlFor="zip" className="block font-bold mb-2">
            ZIP
            </label>
            <input
            type="text"
            id="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="w-full border py-2 px-3 rounded"
            required/>
        </div>
        <hr className="my-8" />
        <div className="mb-4">
            <label htmlFor="cardNumber" className="block font-bold mb-2">
            CARD NUMBER
            </label>
            <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full border py-2 px-3 rounded"
            required/>
        </div>
        <div className="flex mb-4">
            <div className="w-1/2 mr-4">
            <label htmlFor="expMonth" className="block font-bold mb-2">
                EXPIRATION MONTH
            </label>
            <input
                type="text"
                id="expMonth"
                value={expMonth}
                onChange={(e) => setExpMonth(e.target.value)}
                className="w-full border py-2 px-3 rounded"
                required/>
            </div>
            <div className="w-1/2 ml-4">
            <label htmlFor="expYear" className="block font-bold mb-2">
                EXPIRATION YEAR
            </label>
            <input
                type="text"
                id="expYear"
                value={expYear}
                onChange={(e) => setExpYear(e.target.value)}
                className="w-full border py-2 px-3 rounded"
                required/>
            </div>
        </div>
        <div className="mb-4">
            <label htmlFor="cvv" className="block font-bold mb-2">
            CVV
            </label>
            <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="w-full border py-2 px-3 rounded"
            required
            />
        </div>
        <button type="submit" className="bg-black text-white hover:bg-[#EFEFEF] hover:text-neutral-900 transition duration-300 ease-out flex justify-center w-full py-2 px-4 rounded font-bold text-lg">
            PLACE ORDER
        </button>
        </form>
        );
};
