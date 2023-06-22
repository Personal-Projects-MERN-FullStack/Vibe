import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
import { UiSlice } from "../store/ui-slice";
import { pd } from "../store/Product-handler";
import { Link, useNavigate } from "react-router-dom";
import uiSlice from "../store/ui-slice";
import Addresses from "../components/Auth/Addresses";
import { OrderProduct } from "../store/Actions/proudct-action";
const Chekout = () => {
  const [shippingCharges, setshippingCharges] = useState(60);

  const [subtotal, setsubtotal] = useState(0);

  const [selectedAdress, setselectedAdress] = useState();

  const cart = useSelector((state) => state.product.cart);
  const [orderplaced, setorderplaced] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const OnorderplacedSuccesfully = async () => {
    dispatch(OrderProduct(cart, user, subtotal, "Paid", selectedAdress)).then(
      (status) => {
        if (status) {
          dispatch(UiSlice.setorderplaced());
          dispatch(pd.ClearCart());
          navigate("/OrderPlaced");
         
          
         
          
        } else {
          dispatch(
            UiSlice.shownotificationbar({
              active: true,
              msg: "Failed to Order Product",
              path: "/cart",
              pathname: "Retry Again",
            })
          );
          setorderplaced(false);
        }
      }
    );
  };

  useEffect(() => {
    if (subtotal > 499) {
      setshippingCharges(0);
    } else {
      setshippingCharges(80);
    }
  }, [cart, subtotal]);

  const Getsubtotal = (items) => {
    return items.reduce(
      (subtotal, item) => subtotal + item.price * item.qty,
      0
    );
  };
  useEffect(() => {
    setsubtotal(Getsubtotal(cart));
  }, [cart]);

  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };
  const showrozerpay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are Offline Dear .... Failed to Load Rozorpay ");
      return;
    }
    const options = {
      key: "rzp_test_hohwVTs6y3uKSI",
      currency: "INR",
      amount: amount * 100,
      name: "Vibe Store",
      description: "Thanks For Connection With us",
      modal: true,

      handler: function (response) {
        if (response.razorpay_payment_id) {
          setorderplaced(true);
          OnorderplacedSuccesfully();
        } else {
          dispatch(
            UiSlice.shownotificationbar({
              active: true,
              msg: `You are Not Logged in`,
              path: "/",
              pathname: "login to see cart",
            })
          );
        }
      },

      prefill: {
        name: selectedAdress.fullname,
        email: selectedAdress.email,
        contact: selectedAdress.Phone_Number,
        address:
          selectedAdress.Address +
          " , " +
          selectedAdress.city +
          "," +
          selectedAdress.state +
          " , " +
          selectedAdress.pincode,
      },
    };

    const paymentobject = new window.Razorpay(options);
    paymentobject.open();
  };

  if (!orderplaced) {
    return (
      <div>
        {/* <Locationlookup/> */}
        <div class="container mx-auto px-4 py-8">
          <h1 class="text-2xl font-bold mb-4">Checkout</h1>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="col-span-2">
              {/* <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 class="text-lg font-bold mb-4">Shipping Address</h2>

                <div class="mb-6">
                  <h3 class="text-lg font-bold mb-2">Saved Addresses</h3>
                  {Address.length === 0 && (
                    <p className="text-red-500 ">You have no saved addresses</p>
                  )}
                  <ul class="space-y-2">
                    {Address.length > 0 &&
                      Address.map((add) => {
                        return (
                          <li key={add.id}>
                            <div class="flex items-center">
                              <input
                                type="radio"
                                id="address1"
                                name="address"
                                class="form-radio mr-2"
                                onChange={() => {
                                  setselectedAdress(add);
                                }}
                              />
                              <label for="address1" class="font-bold">
                                {add.name}
                              </label>
                              <span class="text-gray-500 ml-2">
                                {add.address1}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>

                <hr class="border-t border-gray-300 my-4" />
                {!AdressCardShow && (
                  <button
                    onClick={() => {
                      setAdressCardShow(true);
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add New Address
                  </button>
                )}

                {AdressCardShow && (
                  <div>
                    <h3 class="text-lg font-bold mb-2">Add New Address</h3>

                    <form onSubmit={OnAddresAddHandler} id="myForm">
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
                            required
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
                            id="phone"
                            name="phone"
                            class="form-input w-full"
                            placeholder="John Doe"
                            required
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
                          required
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
                          required
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
                            type="text"
                            id="zip"
                            name="zip"
                            class="form-input w-full"
                            placeholder="12345"
                            required
                          />
                        </div>
                        {!citygotted && (
                          <p className="text-red-500">Wrong pin code</p>
                        )}
                      </div>

                      <div class="mt-6">
                        <button
                          type="submit"
                          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Add Address
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div> */}
              <Addresses setselectedAdress={setselectedAdress} />

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
                          <p class="text-gray-500">{item.description}</p>
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
                <div class="flex justify-between">
                  <span class="text-sm font-sans">Total Product Bill</span>
                  <span class="font-semibold">₹ {subtotal}</span>
                </div>
                <div
                  class={`flex justify-between ${
                    shippingCharges === 0 ? "line-through" : ""
                  } `}
                >
                  <span class="text-sm font-sans">Shipping charges</span>
                  <span class="font-semibold">₹ {shippingCharges}</span>
                </div>
                <hr className="my-2" />
                <div class="flex justify-between">
                  <span class="font-bold">Total Payment</span>
                  <span class="font-bold">₹ {subtotal + shippingCharges}</span>
                </div>
                {shippingCharges > 0 && (
                  <p className="text-green-500">
                    Add ₹ {500 - subtotal} more for free shipping!
                  </p>
                )}
                {shippingCharges === 0 && (
                  <p className="text-green-500">Enjoy free shipping!</p>
                )}
                <div class="mt-6">
                  {selectedAdress && (
                    <button
                      onClick={() => {
                        showrozerpay(subtotal);
                      }}
                      type="submit"
                      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Place Order
                    </button>
                  )}
                  {!selectedAdress && (
                    <>
                      <button
                        type="submit"
                        class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Place Order
                      </button>
                      <p className="text-red-500">Select Atleast One Adress</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div class="flex flex-col items-center justify-center min-h-screen">
          <div class="bg-white p-8 rounded-lg shadow-lg max-w-md">
            <h1 class="text-3xl font-bold mb-4 text-center">Order Placement</h1>
            <div class="flex flex-col space-y-4">
              <p class="text-center text-gray-500 mb-4">
                Please wait while your order is being processed.
              </p>
              <p class="text-center text-red-500">
                Please do not press the back button or close this tab.
              </p>
            </div>

            <div class="flex items-center justify-center mt-8">
              <div class="w-4 h-4 bg-blue-500 rounded-full animate-ping animation-delay-0"></div>
              <div class="w-4 h-4 bg-blue-500 rounded-full animate-ping animation-delay-1"></div>
              <div class="w-4 h-4 bg-blue-500 rounded-full animate-ping animation-delay-2"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Chekout;
