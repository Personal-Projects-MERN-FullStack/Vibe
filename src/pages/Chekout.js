import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Chekout = () => {
  const [shippingCharges, setshippingCharges] = useState(60);
  const [subtotal, setsubtotal] = useState(0)
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [block, setblock] = useState("");
  const cart = useSelector((state) => state.product.cart);
  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
    handleLookup();
    if (event.target.value.length > 5) {
    }
  };

  const handleLookup = async () => {
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = response.data[0];
      if (data.Status === "Success" && data.PostOffice.length > 0) {
        console.log(data.PostOffice[0]);
        const { District, State, Block } = data.PostOffice[0];
        setCity(District);
        setState(State);
        setblock(Block);
      } else {
        setblock("");
        setCity("");
        setState("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const Getsubtotal = (items) => {
    return items.reduce(
      (subtotal, item) => subtotal + item.price * item.qty,
      0
    );
  };
  useEffect(() => {
    setsubtotal(Getsubtotal(cart));
  }, [cart]);

  const loadScript = (src) =>{
    return new Promise((resovle)=>{
      const script = document.createElement('script')
      script.src = src

      script.onload=()=>{
        resovle(true)
      }

      script.onerror= () =>{
        resovle(false)
      }

      document.body.appendChild(script)
    })
  }
  const showrozerpay = async (amount)=>{
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    
    if(!res){
      alert('You are Online Dear .... Failed to Load Rozorpay ')
      return
    }
    const options = {
      key:"rzp_test_hohwVTs6y3uKSI",
      currency :"INR",
      amount : amount * 100,
      name : "Vibe Store",
      description : "Thanks For Connection With us",

      handler: function (response) {
        alert(response.razorpay_payment_id)
        alert("payment Succefull")
      },
      prefill:{
        name : "vibe store"
      }
    }

    const paymentobject = new window.Razorpay(options)
    paymentobject.open()
  }
  return (
    <div>
      {/* <Locationlookup/> */}
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-4">Checkout</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="col-span-2">
            <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 class="text-lg font-bold mb-4">Shipping Address</h2>

              <div class="mb-6">
                <h3 class="text-lg font-bold mb-2">Saved Addresses</h3>
                <ul class="space-y-2">
                  <li>
                    <div class="flex items-center">
                      <input
                        type="radio"
                        id="address1"
                        name="address"
                        class="form-radio mr-2"
                        checked
                      />
                      <label for="address1" class="font-bold">
                        John Doe
                      </label>
                      <span class="text-gray-500 ml-2">
                        123 Main St, New York, 12345, United States
                      </span>
                    </div>
                  </li>
                  <li>
                    <div class="flex items-center">
                      <input
                        type="radio"
                        id="address2"
                        name="address"
                        class="form-radio mr-2"
                      />
                      <label for="address2" class="font-bold">
                        Jane Smith
                      </label>
                      <span class="text-gray-500 ml-2">
                        456 Elm St, Los Angeles, 67890, United States
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <hr class="border-t border-gray-300 my-4" />

              <div>
                <h3 class="text-lg font-bold mb-2">Add New Address</h3>

                <form>
                  <div className="flex md:space-x-8 space-x-1">
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="name"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        class="form-input w-full"
                        placeholder="John Doe"
                      />
                    </div>
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="name"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        class="form-input w-full"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div class="mb-4">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="address"
                    >
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      class="form-input w-full"
                      placeholder="123 Main St"
                    />
                  </div>

                  <div class="mb-4">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="landmark"
                    >
                      Landmark
                    </label>
                    <input
                      type="text"
                      id="landmark"
                      name="landmark"
                      class="form-input w-full"
                      placeholder="Entery Nearby Landmark."
                    />
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="zip"
                      >
                        ZIP Code
                      </label>
                      <input
                        onChange={handlePincodeChange}
                        type="text"
                        id="zip"
                        name="zip"
                        class="form-input w-full"
                        placeholder="12345"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="city"
                      >
                        Village
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        class="form-input w-full"
                        placeholder="New York"
                        value={block}
                      />
                    </div>
                    <div>
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="city"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        class="form-input w-full"
                        placeholder="New York"
                        value={city}
                      />
                    </div>
                    <div>
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="city"
                      >
                        state
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        class="form-input w-full"
                        placeholder="New York"
                        value={state}
                      />
                    </div>
                  </div>

                  <div class="mt-6">
                    <button
                      type="button"
                      onClick={handleLookup}
                      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Add Address
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-6">
              <h2 class="text-lg font-bold mb-4">Order Summary</h2>

              {cart.map((item) => {
                return (
                  <div class="flex justify-between mb-4">
                    <div class="flex items-center">
                      <img
                        src={`https://source.unsplash.com/600x400/?${item.name},category:${item.category}`}
                        alt="Product 1"
                        class="w-16 h-16 mr-4"
                      />
                      <div>
                        <h3 class="font-bold">{item.name}</h3>
                        <p class="text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <span class="font-bold"> ₹ {item.price}</span>
                  </div>
                );
              })}

              <hr class="border-t border-gray-300 my-4" />

              <div class="flex justify-between">
                <span class="font-bold">Total</span>
                <span class="font-bold">₹ {subtotal}</span>
              </div>
            </div>
          </div>

          <div class="col-span-1">
            <div class="bg-white rounded-lg shadow-lg p-6">
              <h2 class="text-lg font-bold mb-4">Payment Information</h2>

              <div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="card"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="card"
                    name="card"
                    class="form-input w-full"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="expiry"
                    >
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      class="form-input w-full"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="cvv"
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      class="form-input w-full"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div class="mt-6">
                  <button
                    onClick={()=>{showrozerpay(subtotal)}}
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chekout;
