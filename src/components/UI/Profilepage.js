import React, { useState } from "react";
import { UiSlice } from "../../store/ui-slice";
import { useDispatch } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaRegAddressCard } from "react-icons/fa";
import Chekout from "../../pages/Chekout";
import Addresses from "../Auth/Addresses";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const [selectedAdress, setselectedAdress] = useState();
  const [show, setshow] = useState("orders");
  const [showform, setshowform] = useState(false);
  const onclosehandler = () => {
    dispatch(UiSlice.profilechange());
  };
  return (
    <div
      className="relative z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto relative w-screen max-w-md">
              <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                <button
                  onClick={onclosehandler}
                  type="button"
                  className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="sr-only">Close panel</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <h2
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="slide-over-title"
                  >
                    Panel title
                  </h2>
                </div>

                {/* Profile Informations */}
                <div class="flex flex-col items-center ">
                  <div class="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center">
                        <img
                          class="h-12 w-12 rounded-full object-cover"
                          src="profile-image.jpg"
                          alt="Profile "
                        />
                        <div class="ml-4">
                          <h2 class="text-lg font-medium text-gray-900">
                            John Doe
                          </h2>
                          <p class="text-sm font-medium text-gray-500">
                            john.doe@example.com
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setshowform(!showform);
                        }}
                        class="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                    </div>
                    {showform && (
                      <div class="flex flex-col space-y-4">
                        <label for="first-name" class="font-bold">
                          First Name:
                        </label>
                        <input
                          type="text"
                          id="first-name"
                          name="first-name"
                          class="border border-gray-300 p-2 rounded-md"
                        />

                        <label for="last-name" class="font-bold">
                          Last Name:
                        </label>
                        <input
                          type="text"
                          id="last-name"
                          name="last-name"
                          class="border border-gray-300 p-2 rounded-md"
                        />

                        <div class="flex items-center justify-end">
                          <button
                            type="button"
                            id="save-button"
                            class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setshowform(false);
                            }}
                            id="close-button"
                            class="ml-2 text-gray-500 hover:text-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 1 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order and Address Buttons  */}
                <div class="flex m-2 space-x-2 bg-gray-100">
                  <div
                    onClick={() => {
                      setshow("orders");
                    }}
                    class="flex-1 cursor-pointer max-w-md bg-white justify-center  shadow-lg rounded-lg p-6 flex items-center space-x-4"
                  >
                    <span>
                      <HiOutlineShoppingBag />
                    </span>
                    <h2 class="text-lg font-medium text-gray-900">Orders</h2>
                  </div>
                  <div
                    onClick={() => {
                      setshow("address");
                    }}
                    class="flex-1 cursor-pointer max-w-md bg-white justify-center shadow-lg rounded-lg p-6 flex items-center space-x-4"
                  >
                    <span>
                      <FaRegAddressCard />
                    </span>
                    <h2 class="text-lg font-medium text-gray-900">Addresses</h2>
                  </div>
                </div>

                {/* Orders List  */}
                {show === "orders" && (
              <div class="flex m-2 space-x-2 bg-gray-100">
              <div class="flex-1 max-w-md bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
                <div>
                  <img src="product-photo.jpg" alt="Product" class="w-16 h-16 rounded-full"/>
                </div>
                <div class="flex flex-col">
                  <h3 class="text-xl font-bold">Order ID</h3>
                  <p class="text-gray-600">Purchase Date: June 20, 2023</p>
                  <p class="text-gray-600">Bill: $99.99</p>
                  <p class="text-gray-600">Payment Status: Paid</p>
                </div>
              </div>
            </div>
            
                )}

                {/* Addresss List */}

                {show === "address" && (
                  <div className="m-2">
                    <Addresses setselectedAdress={setselectedAdress} />
                  </div>
                )}
                <div className="relative mt-6 flex-1 px-4 sm:px-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
