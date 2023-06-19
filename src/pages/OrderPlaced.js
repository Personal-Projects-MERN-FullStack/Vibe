import React from 'react'
import { Link } from 'react-router-dom'

const OrderPlaced = () => {
  return (
    <div class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white p-8 rounded shadow-lg">
      <div class="text-center">
        <svg
          class="h-12 w-12 text-green-500 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <h2 class="mt-4 text-2xl font-bold text-gray-800">
          Order Placed Successfully
        </h2>
      </div>
      <div class="mt-8">
        <p class="text-lg text-gray-700 text-center">
          Thank you for your order!
        </p>
        <p class="text-sm text-gray-500 text-center">
          Your order has been successfully placed.
        </p>
      </div>
      <div class="mt-8 flex justify-center">
        <Link
          to="/"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  </div>
  )
}

export default OrderPlaced