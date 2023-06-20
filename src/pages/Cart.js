import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { pd } from "../store/Product-handler";
import { UiSlice } from "../store/ui-slice";

const Cart = () => {
  const Products = useSelector((state) => state.product.cart);
  const cartchange = useSelector((state) => state.ui.showcart);
  const auth = useSelector((state) => state.auth.auth);
  const navigate = useNavigate();
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
  const ongotocarthandler = () => {
    dispatch(UiSlice.cartchange());
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">
        Your Cart
        <Link to="/cart">
          {cartchange && (
            <button
              onClick={ongotocarthandler}
              className="text-xl text-blue-900 underline"
            >
              - Go To Cart
            </button>
          )}
        </Link>
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {Products.map((item) => {
              return (
                <tr>
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center">
                      <img
                        src={`https://source.unsplash.com/600x400/?${item.name},category:${item.category}`}
                        alt="Product "
                        className="w-16 h-16 mr-4"
                      />
                      <div>
                        <h2 className="font-bold">{item.name}</h2>
                        <p className="text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">₹ {item.price}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          onQtyDecressHandler(item);
                        }}
                        className="text-blue-500 font-bold px-2"
                      >
                        -
                      </button>
                      <span className="px-2">{item.qty}</span>
                      <button
                        onClick={() => {
                          onQtyIncresseHandler(item);
                        }}
                        className="text-blue-500 font-bold px-2"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    ₹ {Math.round(item.price * item.qty)}
                  </td>
                </tr>
              );
            })}

            <tr>
              <td colSpan="3" className="py-2 px-4 font-bold text-right">
                Subtotal:
              </td>
              <td className="py-2 px-4">₹ {Math.round(subtotal)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {Products.length > 0 && (
        <div className="mt-4 flex flex-col md:flex-row justify-between">
          <button
            onClick={oncartclearhandler}
            href="#"
            className="text-white bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 mt-2 md:mt-0"
          >
            Clear Cart
          </button>
        </div>
      )}
      <div className="mt-4 flex flex-col md:flex-row justify-between">
        {Products.length > 0 && (
          <Link
            to="/checkout"
          
            className="text-white bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 mt-2 md:mt-0"
          >
            Proceed to Checkout
          </Link>
        )}
        <Link to="/">
          <div
            onClick={() => {
              dispatch(UiSlice.cartchange());
            }}
            className="text-blue-500 py-2 px-4 rounded hover:bg-blue-100 mt-2 md:mt-0"
          >
            Continue Shopping
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
