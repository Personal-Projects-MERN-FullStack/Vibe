import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { pd } from "../store/Product-handler";
import { UiSlice } from "../store/ui-slice";

const Cart = () => {
  const Products = useSelector((state) => state.product.cart);
  const dispatch = useDispatch();
  const [subtotal, setSubtotal] = useState(0);
  const Getsubtotal = (items) => {
    return items.reduce(
      (subtotal, item) => subtotal + item.price * item.qty,
      0
    );
  };
  useEffect(() => {
    setSubtotal(Getsubtotal(Products));
  }, [Products]);

  const onQtyIncresseHandler = (item) => {
    dispatch(pd.AddToCart(item));
  };
  const onQtyDecressHandler = (item) => {
    dispatch(pd.RemoveFromCart(item));
  };
  const oncartclearhandler = () => {
    dispatch(pd.ClearCart());
    dispatch(
      UiSlice.shownotificationbar({
        active: true,
        msg: "Cart Cleard",
        path: "/",
        pathname: "Continue Shopping",
      })
    );
  };
  const ongotocarthandler =()=>{
    dispatch(UiSlice.cartchange())
  }
  return (
    <div class="container mx-auto py-8">
      <h1 class="text-2xl font-bold mb-4">
        Your Cart -
        <Link to="/cart">
          <button onClick={ongotocarthandler} className="text-xl text-blue-900 underline">
            Go To Cart
          </button>
        </Link>
      </h1>

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
            {Products.map((item) => {
              return (
                <tr>
                  <td class="py-2 px-4 border-b">
                    <div class="flex items-center">
                      <img
                        src={`https://source.unsplash.com/600x400/?${item.name},category:${item.category}`}
                        alt="Product "
                        class="w-16 h-16 mr-4"
                      />
                      <div>
                        <h2 class="font-bold">{item.name}</h2>
                        <p class="text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td class="py-2 px-4 border-b">₹ {item.price}</td>
                  <td class="py-2 px-4 border-b">
                    <div class="flex items-center">
                      <button
                        onClick={() => {
                          onQtyDecressHandler(item);
                        }}
                        class="text-blue-500 font-bold px-2"
                      >
                        -
                      </button>
                      <span class="px-2">{item.qty}</span>
                      <button
                        onClick={() => {
                          onQtyIncresseHandler(item);
                        }}
                        class="text-blue-500 font-bold px-2"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td class="py-2 px-4 border-b">
                    ₹ {Math.round(item.price * item.qty)}
                  </td>
                </tr>
              );
            })}

            <tr>
              <td colspan="3" class="py-2 px-4 font-bold text-right">
                Subtotal:
              </td>
              <td class="py-2 px-4">₹ {Math.round(subtotal)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4 flex flex-col md:flex-row justify-between">
        <button
          onClick={oncartclearhandler}
          href="#"
          class="text-white bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 mt-2 md:mt-0"
        >
          Clear Cart
        </button>
      </div>
      <div class="mt-4 flex flex-col md:flex-row justify-between">
        <Link
          to="/checkout"
          href="#"
          class="text-white bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 mt-2 md:mt-0"
        >
          Proceed to Checkout
        </Link>

        <Link
          to="/"
          href="#"
          class="text-blue-500 py-2 px-4 rounded hover:bg-blue-100 mt-2 md:mt-0"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;
