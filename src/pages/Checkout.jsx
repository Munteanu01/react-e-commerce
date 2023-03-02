import { useState } from "react";
import { Link } from "react-router-dom";
import thankYouSticker from "../icons/thank-you.png"

export default function CheckoutForm() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [deliverySection, setDeliverySection] = useState(true);
  const [paymentSection, setPaymentSection] = useState(false);
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
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cvv, setCvv] = useState('');
  const finalPrice = localStorage.getItem("finalPrice");
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();
    setShowThankYou(true);
  };
  if(showThankYou){
    return(
      <div className="h-screen py-[25vh] text-center flex flex-col  justify-between">
          <img className=" sm:max-w-sm max-w-xs mx-auto px-14" src={thankYouSticker} alt="" />
          <p className="text-xl font-extrabold">Click <Link to={'/'} className="underline hover:line-through">here</Link> to go to main page</p>
      </div>
    )
  }
  else{
    return (
     <div className="pt-24 mx-3 sm:mx-32 lg:mx-auto max-w-[900px]">
        <div className="justify-center font-extrabold hidden sm:flex pb-10">
        <div className="flex">
            <p className="rounded-full bg-black text-white border-2 border-transparent mr-3  px-[9px] pt-[5px] pb-[3px] text-xs font-extrabold">1</p>
            <button className="pt-1" onClick={() => {setPaymentSection(false); setDeliverySection(true)}}>DELIVERY</button>
          </div>
          
          <div className={`w-full border-b-2 flex my-auto mx-6 ${paymentSection ? 'border-black' : 'border-[#949494]'}`}/>

          <div className={`flex  ${paymentSection ? 'text-black' :  'text-[#949494]' }`}>
            <p className={`rounded-full  border-2 border-[#949494] mr-3  px-[9px] pt-[5px] pb-[3px] text-xs font-extrabold 
               ${paymentSection ? 'border-transparent bg-black text-white'  : 'border-[#949494]'}`}>2</p>
            <button className="pt-1" disabled>PAYMENT</button>
          </div>
        </div>
        {deliverySection && (
          <div>
          <form onSubmit={() => {setPaymentSection(true); setDeliverySection(false)}}>
            
            <h1 className="font-bold pb-3 col-span-2">PERSONAL DETAILS</h1>
            <div className="grid lg:grid-cols-2 lg:gap-4 gap-2 pb-6">
              <input  className="bg-[#f7f7f7] pl-3 w-full pt-4 pb-3 my-1 text-sm focus:outline-none text-neutral-500
                                placeholder:text-[#a7a7a7] placeholder:text-xs placeholder:tracking-wider placeholder:translate-y-[-2px]
                                focus:placeholder:text-[0.60rem] focus:placeholder:translate-y-[-15px]" 
                      placeholder="First Name" required type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input  className="bg-[#f7f7f7] pl-3 w-full pt-4 pb-3 my-1 text-sm focus:outline-none text-neutral-500
                                placeholder:text-[#a7a7a7] placeholder:text-xs placeholder:tracking-wider placeholder:translate-y-[-2px]
                                focus:placeholder:text-[0.60rem] focus:placeholder:translate-y-[-15px] " 
                      placeholder="Last Name" required type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <input  className="bg-[#f7f7f7] pl-3 w-full pt-4 pb-3 my-1 text-sm focus:outline-none text-neutral-500
                                placeholder:text-[#a7a7a7] placeholder:text-xs placeholder:tracking-wider placeholder:translate-y-[-2px]
                                focus:placeholder:text-[0.60rem] focus:placeholder:translate-y-[-15px] " 
                      placeholder="E-mail" required type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input  className="bg-[#f7f7f7] pl-3 w-full pt-4 pb-3 my-1 text-sm focus:outline-none text-neutral-500
                                placeholder:text-[#a7a7a7] placeholder:text-xs placeholder:tracking-wider placeholder:translate-y-[-2px]
                                focus:placeholder:text-[0.60rem] focus:placeholder:translate-y-[-15px] " 
                      placeholder="Mobile Number" required type="tel" id="mobileNumber" name="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
            </div>

            <h1 className="font-bold pb-3 col-span-2">DELIVERY DETAILS</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4  lg:gap-4 gap-2 pb-6">
              <input  className="bg-[#f7f7f7] pl-3 w-full pt-4 pb-3 my-1 text-sm focus:outline-none text-neutral-500 col-span-2
                                  placeholder:text-[#a7a7a7] placeholder:text-xs placeholder:tracking-wider placeholder:translate-y-[-2px]
                                  focus:placeholder:text-[0.60rem] focus:placeholder:translate-y-[-15px]" 
                      placeholder="Address" required  type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
              <input  className="bg-[#f7f7f7] pl-3 w-full pt-4 pb-3 my-1 text-sm focus:outline-none text-neutral-500 col-span-2
                                  placeholder:text-[#a7a7a7] placeholder:text-xs placeholder:tracking-wider placeholder:translate-y-[-2px]
                                  focus:placeholder:text-[0.60rem] focus:placeholder:translate-y-[-15px] " 
                      placeholder="Further information (Optional)" type="text" id="furtherInformation" name="furtherInformation" value={furtherInformation} onChange={(e) => setFurtherInformation(e.target.value)} />
              <input  className="bg-[#f7f7f7] pl-3 w-full pt-4 pb-3 my-1 text-sm focus:outline-none text-neutral-500
                                  placeholder:text-[#a7a7a7] placeholder:text-xs placeholder:tracking-wider placeholder:translate-y-[-2px]
                                  focus:placeholder:text-[0.60rem] focus:placeholder:translate-y-[-15px] " 
                      placeholder="ZIP/Postal code" required type="text" id="postalCode" name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
              <input  className="bg-[#f7f7f7] pl-3 w-full pt-4 pb-3 my-1 text-sm focus:outline-none text-neutral-500
                                  placeholder:text-[#a7a7a7] placeholder:text-xs placeholder:tracking-wider placeholder:translate-y-[-2px]
                                  focus:placeholder:text-[0.60rem] focus:placeholder:translate-y-[-15px] " 
                      placeholder="Town"  type="text" required id="town" name="town" value={town} onChange={(e) => setTown(e.target.value)} />
              <input  className="bg-[#f7f7f7] pl-3 w-full pt-4 pb-3 my-1 text-sm focus:outline-none text-neutral-500
                                  placeholder:text-[#a7a7a7] placeholder:text-xs placeholder:tracking-wider placeholder:translate-y-[-2px]
                                  focus:placeholder:text-[0.60rem] focus:placeholder:translate-y-[-15px] " 
                      placeholder="District"  type="text" required id="district" name="district" value={district} onChange={(e) => setDistrict(e.target.value)} />
              <select className="bg-[#f7f7f7] pl-3 w-full pt-4 pb-3 my-1 text-sm focus:outline-none text-neutral-500 
                                 placeholder:text-[#a7a7a7] placeholder:text-xs placeholder:tracking-wider placeholder:translate-y-[-2px] 
                                 focus:placeholder:text-[0.60rem] focus:placeholder:translate-y-[-15px]"
                      placeholder="Country"  required id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                      <option value="">Select Country</option>
                      <option value="Romania">Romania</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
              </select>
              <button className="col-span-2 bg-black pt-4 mt-5 pb-3 lg:rounded-xl text-white text-lg font-bold" type="submit">CONTINUE TO PAYMENT</button>
            </div>
            
          </form>
        </div>
        )}
        {paymentSection && (
          <div className="pt-20 sm:pt-0">
          <form onSubmit={handleSubmit}>
            <h1 className="font-bold pb-3 col-span-2">CARD DETAILS</h1>
            <div className="grid grid-cols-3 lg:grid-cols-6  lg:gap-4 gap-2 pb-6">
              <input  className="bg-[#f7f7f7] pl-3 w-full pt-4 pb-3 my-1 text-sm focus:outline-none text-neutral-500 col-span-3
                                  placeholder:text-[#a7a7a7] placeholder:text-xs placeholder:tracking-wider placeholder:translate-y-[-2px]
                                  focus:placeholder:text-[0.60rem] focus:placeholder:translate-y-[-15px]" 
                      placeholder="Card Number" required  type="text" id="cardNumber" name="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
              <input  className="bg-[#f7f7f7] pl-3 w-full pt-4 pb-3 my-1 text-sm focus:outline-none text-neutral-500 col-span-3
                                  placeholder:text-[#a7a7a7] placeholder:text-xs placeholder:tracking-wider placeholder:translate-y-[-2px]
                                  focus:placeholder:text-[0.60rem] focus:placeholder:translate-y-[-15px]" 
                      placeholder="Card Holder" required  type="text" id="cardHolder" name="cardHolder" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} />
              <input  className="bg-[#f7f7f7] pl-3 w-full pt-4 pb-3 my-1 text-sm focus:outline-none text-neutral-500 
                                  placeholder:text-[#a7a7a7] placeholder:text-xs placeholder:tracking-wider placeholder:translate-y-[-2px]
                                  focus:placeholder:text-[0.60rem] focus:placeholder:translate-y-[-15px]" 
                      placeholder="Month" required type="text" id="expirationMonth" name="expirationMonth" value={expirationMonth} onChange={(e) => setExpirationMonth(e.target.value)} />
              <input  className="bg-[#f7f7f7] pl-3 w-full pt-4 pb-3 my-1 text-sm focus:outline-none text-neutral-500 
                                  placeholder:text-[#a7a7a7] placeholder:text-xs placeholder:tracking-wider placeholder:translate-y-[-2px]
                                  focus:placeholder:text-[0.60rem] focus:placeholder:translate-y-[-15px]" 
                      placeholder="Year" required  type="text" id="expirationYear" name="expirationYear" value={expirationYear} onChange={(e) => setExpirationYear(e.target.value)} />
              <input  className="bg-[#f7f7f7] pl-3 w-full pt-4 pb-3 my-1 text-sm focus:outline-none text-neutral-500 
                                  placeholder:text-[#a7a7a7] placeholder:text-xs placeholder:tracking-wider placeholder:translate-y-[-2px]
                                  focus:placeholder:text-[0.60rem] focus:placeholder:translate-y-[-15px]" 
                      placeholder="CVV" required  type="text" id="cvv" name="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} />
              <div className="col-span-3"></div>
              <button className="col-span-3  pt-4 mt-5 pb-3 lg:rounded-xl border-[3px] border-black hover:bg-black hover:text-white transition-all duration-300 text-lg font-bold lg:block hidden"
                      onClick={() => {setPaymentSection(false); setDeliverySection(true)}}>RETURN</button>
              <button className="col-span-3 bg-black pt-4 mt-5 pb-3 lg:rounded-xl text-white text-lg font-bold" type="submit">BUY AND PAY : {finalPrice} €</button>


            
            

          



            </div>
          </form>
          </div>
        )}
      </div>
        );
    }
       
};
