import { useState } from "react";
import { Link } from "react-router-dom";

export default function CheckoutForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [furtherInformation, setFurtherInformation] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [town, setTown] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");

  const [deliverySection, setDeliverySection] = useState(true);
  const [paymentSection, setPaymentSection] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();
    setShowThankYou(true);
  };
  if(showThankYou){
    return(
      <div className="h-screen pt-20">
          <p className="text-4xl">THANKS</p>
          <Link to={'/'}>
            <button>GO TO MAIN PAGE</button>
          </Link>
      </div>
    )
  }
  else{
    return (
     <div className="pt-24">
        <div className="flex justify-center font-bold">
        <div className="flex">
            <p className="rounded-full bg-black text-white border-2 border-transparent mr-3  px-[9px] pt-[5px] pb-[3px] text-xs font-extrabold">1</p>
            <button className="pt-1" onClick={() => {setPaymentSection(false); setDeliverySection(true)}}>DELIVERY</button>
          </div>
          
          <div className={`w-20 border-b-2 flex my-auto mx-5 ${paymentSection ? 'border-black' : 'border-[#949494]'}`}/>

          <div className={`flex  ${paymentSection ? 'text-black' :  'text-[#949494]' }`}>
            <p className={`rounded-full  border-2 border-[#949494] mr-3  px-[9px] pt-[5px] pb-[3px] text-xs font-extrabold 
               ${paymentSection ? 'border-transparent bg-black text-white'  : 'border-[#949494]'}`}>2</p>
            <button className="pt-1" onClick={() => {setPaymentSection(true); setDeliverySection(false)}}>PAYMENT</button>
          </div>
        </div>
        {deliverySection && (
          <div>
          <h1>DELIVERY</h1>
          <form onSubmit={() => {setPaymentSection(true); setDeliverySection(false)}}>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <br />
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <br />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input type="tel" id="mobileNumber" name="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
            <br />
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <br />
            <label htmlFor="furtherInformation">Further Information:</label>
            <input type="text" id="furtherInformation" name="furtherInformation" value={furtherInformation} onChange={(e) => setFurtherInformation(e.target.value)} />
            <br />
            <label htmlFor="postalCode">ZIP/Postal Code:</label>
            <input type="text" id="postalCode" name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            <br />
            <label htmlFor="town">Town:</label>
            <input type="text" id="town" name="town" value={town} onChange={(e) => setTown(e.target.value)} />
            <br />
            <label htmlFor="district">District:</label>
            <input type="text" id="district" name="district" value={district} onChange={(e) => setDistrict(e.target.value)} />
            <br />
            <label htmlFor="country">Country:</label>
            <select id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">Select Country</option>
              <option value="Romania">Romania</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
            </select>
            <br />
            <button type="submit">Continue to Payment</button>
          </form>
        </div>
        )}
        {paymentSection && (
          <div>
            <h1>THIS IS THE PAYMENT SECTION</h1>
          </div>
        )}
      </div>
        );
    }
       
};
