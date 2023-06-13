import React, { useState } from "react";
import axios from "axios";

const Chekout = () => {
  const [shippingCharges, setshippingCharges] = useState(60);
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [block, setblock] = useState("")

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
    
    if(event.target.value.length > 5){
      console.log("a")
      handleLookup()
    }
  };

  const handleLookup = async () => {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = response.data[0];
      if (data.Status === "Success" && data.PostOffice.length > 0) {
        console.log(data.PostOffice[0])
        const { District, State ,Block } = data.PostOffice[0];
        setCity(District);
        setState(State);
        setblock(Block)

      } else {
        setblock("")
        setCity("");
        setState("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
                      for="address2"
                    >
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      id="address2"
                      name="address2"
                      class="form-input w-full"
                      placeholder="Apartment, Suite, etc."
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

              <div class="flex justify-between mb-4">
                <div class="flex items-center">
                  <img
                    src="product1.jpg"
                    alt="Product 1"
                    class="w-16 h-16 mr-4"
                  />
                  <div>
                    <h3 class="font-bold">Product 1</h3>
                    <p class="text-gray-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
                <span class="font-bold">$19.99</span>
              </div>

              <div class="flex justify-between mb-4">
                <div class="flex items-center">
                  <img
                    src="product2.jpg"
                    alt="Product 2"
                    class="w-16 h-16 mr-4"
                  />
                  <div>
                    <h3 class="font-bold">Product 2</h3>
                    <p class="text-gray-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
                <span class="font-bold">$29.99</span>
              </div>

              <hr class="border-t border-gray-300 my-4" />

              <div class="flex justify-between">
                <span class="font-bold">Total</span>
                <span class="font-bold">$49.98</span>
              </div>
            </div>
          </div>

          <div class="col-span-1">
            <div class="bg-white rounded-lg shadow-lg p-6">
              <h2 class="text-lg font-bold mb-4">Payment Information</h2>

              <form>
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
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chekout;
