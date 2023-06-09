import React from 'react'

const Cart = () => {
  return (
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-4">Your Cart</h1>

        <div class="overflow-x-auto">
            <table class="w-full border">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b">Product</th>
                        <th class="py-2 px-4 border-b">Price</th>
                        <th class="py-2 px-4 border-b">Quantity</th>
                        <th class="py-2 px-4 border-b">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="py-2 px-4 border-b">
                            <div class="flex items-center">
                                <img src="product-image.jpg" alt="Product Image" class="w-16 h-16 mr-4"/>
                                <div>
                                    <h2 class="font-bold">Product Name</h2>
                                    <p class="text-gray-500">Product Description</p>
                                </div>
                            </div>
                        </td>
                        <td class="py-2 px-4 border-b">$19.99</td>
                        <td class="py-2 px-4 border-b">
                            <div class="flex items-center">
                                <button class="text-blue-500 font-bold px-2">-</button>
                                <span class="px-2">2</span>
                                <button class="text-blue-500 font-bold px-2">+</button>
                            </div>
                        </td>
                        <td class="py-2 px-4 border-b">$39.98</td>
                    </tr>
                   
                    <tr>
                        <td colspan="3" class="py-2 px-4 font-bold text-right">Subtotal:</td>
                        <td class="py-2 px-4">$39.98</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mt-4 flex flex-col md:flex-row justify-between">
            <a href="#" class="text-white bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 mt-2 md:mt-0">Proceed to Checkout</a>
            <a href="#" class="text-blue-500 py-2 px-4 rounded hover:bg-blue-100 mt-2 md:mt-0">Continue Shopping</a>
        </div>
    </div>
  )
}

export default Cart