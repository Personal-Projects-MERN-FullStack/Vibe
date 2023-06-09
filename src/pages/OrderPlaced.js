import React from "react";
import { Link } from "react-router-dom";
import { UiSlice } from "../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { GetOrders } from "../store/Actions/proudct-action";

const OrderPlaced = () => {
  const dispatch = useDispatch()
  const user = useSelector(state=>state.auth.user)
  dispatch(GetOrders(user));
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <div className="text-center">
          <svg
            className="h-12 w-12 text-green-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Order Placed Successfully
          </h2>
        </div>
        <div className="mt-8">
          <p className="text-lg text-gray-700 text-center">
            Thank you for your order!
          </p>
          <p className="text-sm text-gray-500 text-center">
            Your order has been successfully placed.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <Link
          onClick={()=>{dispatch(UiSlice.setorderplaced(false))}}
            to="/"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
