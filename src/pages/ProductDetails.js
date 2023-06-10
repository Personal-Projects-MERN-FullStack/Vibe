import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { pd } from "../store/Product-handler";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { UiSlice } from "../store/ui-slice";

const ProductDetails = () => {
  const [pdata, setpdata] = useState([]);
  const p = useSelector((state) => state.product.product);

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(pd.GetProduct(id));
  }, [id, dispatch]);
  useEffect(() => {
    setpdata(p);
  }, [id, dispatch, p]);

  const OnAddToCartHandler = () => {
    dispatch(pd.AddToCart(pdata[0], "something"));
    dispatch(
      UiSlice.shownotificationbar({
        active: true,
        msg: `${pdata[0].name} Added to Cart Succefully`,
        path: "/cart",
        pathname: "Chekout The Product on Cart",
      })
    );
  };
  return (
    <div>
      {pdata.length === 0 && <LoadingSpinner message="Product Not Available" />}
      {pdata.length > 0 && (
        <div class="container mx-auto p-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-white p-4 shadow-md rounded-lg">
              <img
                src={`https://source.unsplash.com/600x400/?${pdata.name},category:${pdata.category}`}
                alt="Product "
                class="w-full h-auto mb-4"
              />
              <h2 class="text-lg font-bold mb-2">{pdata[0].name}</h2>
              <p class="text-gray-600 mb-2">₹ {pdata[0].price}</p>
              <p class="text-gray-600 mb-2">Brand: {pdata[0].brand}</p>
              <p class="text-gray-600 mb-4">{pdata[0].description}</p>
              <h3 class="text-lg font-bold mb-2">Features</h3>
              <ul class="list-disc list-inside text-gray-600 mb-4">
                {pdata[0].features.map((fea) => {
                  return <li>{fea}</li>;
                })}
              </ul>
              <p class="text-gray-600 mb-2">
                Availability:{" "}
                {pdata[0].availability.inStock ? "In Stock" : " Out Of Stock "}
              </p>
              {pdata[0].availability.inStock && (
                <button
                  onClick={OnAddToCartHandler}
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add to Cart
                </button>
              )}
              {!pdata[0].availability.inStock && (
                <button class="bg-gray-500 cursor-not-allowed hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Out Of Stock
                </button>
              )}
            </div>
            <div class="bg-white p-4 shadow-md rounded-lg col-span-2">
              <h3 class="text-lg font-bold mb-2">Reviews</h3>
              {pdata[0].reviews.length > 0 && (
                <div class="border border-gray-300 p-4 rounded-lg flex flex-col flex-nowrap my-auto ">
                  {pdata[0].reviews.map((Review) => {
                    return (
                      <div class="mb-4">
                        <div class="flex items-center mb-2">
                          <div class="w-10 h-10 bg-gray-400 rounded-full mr-2"></div>
                          <div class="text-gray-700 font-bold">
                            {Review.username}
                          </div>
                        </div>
                        <div class="flex items-center mt-4">
                          {Array.from({
                            length: Math.floor(Review.rating),
                          }).map((_, i) => {
                            return (
                              <svg
                                class="text-yellow-400 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                width="20"
                                height="20"
                                key={i}
                              >
                                <path d="M10 12.585L3.293 16.45l1.777-6.017L.268 6.715l6.307-.533L10 0l3.425 6.182 6.307.533-4.802 3.718 1.777 6.017L10 12.585z" />
                              </svg>
                            );
                          })}
                          {Array.from({
                            length: 5 - Math.floor(Review.rating),
                          }).map((_, i) => {
                            return (
                              <svg
                                class="text-gray-300 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                width="20"
                                height="20"
                                key={i}
                              >
                                <path d="M10 12.585L3.293 16.45l1.777-6.017L.268 6.715l6.307-.533L10 0l3.425 6.182 6.307.533-4.802 3.718 1.777 6.017L10 12.585z" />
                              </svg>
                            );
                          })}
                        </div>
                        <p class="text-gray-600 mt-2">{Review.comment}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              {pdata[0].reviews.length === 0 && <h1>No Review </h1>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
