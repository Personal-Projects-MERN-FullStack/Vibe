import React, { useState } from "react";
import { UiSlice } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaRegAddressCard } from "react-icons/fa";
import Chekout from "../../pages/Chekout";
import Addresses from "../Auth/Addresses";
import { auth } from "../../store/auth-handler";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const [selectedAdress, setselectedAdress] = useState();
  const [show, setshow] = useState("orders");
  const [showform, setshowform] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.product.orders);
  // console.log(user.name.split(" "));
  const onclosehandler = () => {
    dispatch(UiSlice.profilechange());
  };

  const profileupdate = async (newFullName) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/auth/updateuser/${user.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: newFullName,
          }),
        }
      );
      // console.log(response);

      if (!response.ok) {
        throw new Error("Error updating user");
      }

      const responsedata = await response.json();
      setshowform(false);
      const updatedItem = JSON.stringify({
        email: responsedata.email,
        name: responsedata.name,
      });
      localStorage.setItem("user", updatedItem);
      dispatch(auth.setuser(responsedata));

      // console.log("User updated successfully:", responsedata);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const onprofileupdatehandler = (e) => {
    e.preventDefault();
    profileupdate(e.target.firstname.value + " " + e.target.lastname.value);
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
                    Account Information
                  </h2>
                </div>

                {/* Profile Informations */}
                <div className="flex flex-col items-center ">
                  <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-12 rounded-full object-cover"
                          src="https://i.ytimg.com/vi/tKB4h9gvmm0/maxresdefault.jpg"
                          alt="Profile "
                        />
                        <div className="ml-4">
                          <h2 className="text-lg font-medium text-gray-900">
                            {user.name}
                          </h2>
                          <p className="text-sm font-medium text-gray-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setshowform(!showform);
                        }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                    </div>
                    {showform && (
                      <form onSubmit={onprofileupdatehandler}>
                        <div className="flex flex-col space-y-4">
                          <label htmlFor="first-name" className="font-bold">
                            First Name:
                          </label>
                          <input
                            type="text"
                            id="firstname"
                            name="first-name"
                            className="border border-gray-300 p-2 rounded-md"
                            required
                          />

                          <label htmlFor="last-name" className="font-bold">
                            Last Name:
                          </label>
                          <input
                            type="text"
                            id="lastname"
                            name="last-name"
                            className="border border-gray-300 p-2 rounded-md"
                            required
                          />

                          <div className="flex items-center justify-end">
                            <button
                              type="submit"
                              id="save-button"
                              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setshowform(false);
                              }}
                              id="close-button"
                              className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
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
                      </form>
                    )}
                  </div>
                </div>

                {/* Order and Address Buttons  */}
                <div className="flex m-2 space-x-2 bg-gray-100">
                  <div
                    onClick={() => {
                      setshow("orders");
                    }}
                    className="flex-1 cursor-pointer max-w-md bg-white justify-center  shadow-lg rounded-lg p-6 flex items-center space-x-4"
                  >
                    <span>
                      <HiOutlineShoppingBag />
                    </span>
                    <h2 className="text-lg font-medium text-gray-900">
                      Orders
                    </h2>
                  </div>
                  <div
                    onClick={() => {
                      setshow("address");
                    }}
                    className="flex-1 cursor-pointer max-w-md bg-white justify-center shadow-lg rounded-lg p-6 flex items-center space-x-4"
                  >
                    <span>
                      <FaRegAddressCard />
                    </span>
                    <h2 className="text-lg font-medium text-gray-900">
                      Addresses
                    </h2>
                  </div>
                </div>

                {/* Orders List  */}
                {show === "orders" && (
                  <div className="flex m-2 space-x-2 bg-gray-100">
                    <div className="flex-1 max-w-md bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
                      <div>
                        <img
                          src="product-photo.jpg"
                          alt="Product"
                          className="w-16 h-16 rounded-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-xl font-bold">Order ID</h3>
                        <p className="text-gray-600">
                          Purchase Date: June 20, 2023
                        </p>
                        <p className="text-gray-600">Bill: $99.99</p>
                        <p className="text-gray-600">Payment Status: Paid</p>
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
