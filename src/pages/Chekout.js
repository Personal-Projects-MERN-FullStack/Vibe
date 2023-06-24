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
    const pstatus = "Paid"
    dispatch(OrderProduct(cart, user, subtotal, pstatus, selectedAdress)).then(
      (status) => {
        if (status) {
          dispatch(UiSlice.setorderplaced(true));
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
      amount: amount * 100 + shippingCharges,
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
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2">
              {/* <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-lg font-bold mb-4">Shipping Address</h2>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2">Saved Addresses</h3>
                  {Address.length === 0 && (
                    <p className="text-red-500 ">You have no saved addresses</p>
                  )}
                  <ul className="space-y-2">
                    {Address.length > 0 &&
                      Address.map((add) => {
                        return (
                          <li key={add.id}>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="address1"
                                name="address"
                                className="form-radio mr-2"
                                onChange={() => {
                                  setselectedAdress(add);
                                }}
                              />
                              <label htmlFor="address1" className="font-bold">
                                {add.name}
                              </label>
                              <span className="text-gray-500 ml-2">
                                {add.address1}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>

                <hr className="border-t border-gray-300 my-4" />
                {!AdressCardShow && (
                  <button
                    onClick={() => {
                      setAdressCardShow(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add New Address
                  </button>
                )}

                {AdressCardShow && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">Add New Address</h3>

                    <form onSubmit={OnAddresAddHandler} id="myForm">
                      <div className="flex md:space-x-8 space-x-1">
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input w-full"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                          >
                            Phone Number
                          </label>
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="form-input w-full"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="address"
                        >
                          Address Line 1
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="form-input w-full"
                          placeholder="123 Main St"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="landmark"
                        >
                          Landmark
                        </label>
                        <input
                          type="text"
                          id="landmark"
                          name="landmark"
                          className="form-input w-full"
                          placeholder="Entery Nearby Landmark."
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="zip"
                          >
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            id="zip"
                            name="zip"
                            className="form-input w-full"
                            placeholder="12345"
                            required
                          />
                        </div>
                        {!citygotted && (
                          <p className="text-red-500">Wrong pin code</p>
                        )}
                      </div>

                      <div className="mt-6">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Add Address
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div> */}
              <Addresses setselectedAdress={setselectedAdress} />

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                {cart.map((item) => {
                  return (
                    <div className="flex justify-between mb-4" key={item.id}>
                      <div className="flex items-center">
                        <img
                          src={`https://source.unsplash.com/600x400/?${item.name},category:${item.category}`}
                          alt="Product 1"
                          className="w-16 h-16 mr-4"
                        />
                        <div>
                          <h3 className="font-bold">{item.name}</h3>
                          <p className="text-gray-500">{item.description}</p>
                        </div>
                      </div>
                      <span className="font-bold"> ₹ {item.price}</span>
                    </div>
                  );
                })}

                <hr className="border-t border-gray-300 my-4" />

                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">₹ {subtotal}</span>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-bold mb-4">Payment Information</h2>
                <div className="flex justify-between">
                  <span className="text-sm font-sans">Total Product Bill</span>
                  <span className="font-semibold">₹ {subtotal}</span>
                </div>
                <div
                  className={`flex justify-between ${
                    shippingCharges === 0 ? "line-through" : ""
                  } `}
                >
                  <span className="text-sm font-sans">Shipping charges</span>
                  <span className="font-semibold">₹ {shippingCharges}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <span className="font-bold">Total Payment</span>
                  <span className="font-bold">
                    ₹ {subtotal + shippingCharges}
                  </span>
                </div>
                {shippingCharges > 0 && (
                  <p className="text-green-500">
                    Add ₹ {500 - subtotal} more for free shipping!
                  </p>
                )}
                {shippingCharges === 0 && (
                  <p className="text-green-500">Enjoy free shipping!</p>
                )}
                <div className="mt-6">
                  {selectedAdress && (
                    <button
                      onClick={() => {
                        showrozerpay(subtotal);
                      }}
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Place Order
                    </button>
                  )}
                  {!selectedAdress && (
                    <>
                      <button
                        type="submit"
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
            <h1 className="text-3xl font-bold mb-4 text-center">
              Order Placement
            </h1>
            <div className="flex flex-col space-y-4">
              <p className="text-center text-gray-500 mb-4">
                Please wait while your order is being processed.
              </p>
              <p className="text-center text-red-500">
                Please do not press the back button or close this tab.
              </p>
            </div>

            <div className="flex items-center justify-center mt-8">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping animation-delay-0"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping animation-delay-1"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping animation-delay-2"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Chekout;
