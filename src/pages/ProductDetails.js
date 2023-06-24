import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { pd } from "../store/Product-handler";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { UiSlice } from "../store/ui-slice";
import ProductAvailability from "../components/common/ProductAvailability";
import ReviewForm from "../components/UI/ReviewForm";
import Pagination from "../components/common/Pagination";

const ProductDetails = () => {
  const [pdata, setpdata] = useState([]);
  const p = useSelector((state) => state.product.product);
  const auth = useSelector((state) => state.auth.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(pd.GetProduct(id));
  }, [id, dispatch]);
  useEffect(() => {
    setpdata(p);
  }, [id, dispatch, p]);

  const OnAddToCartHandler = () => {
    if (auth) {
      dispatch(pd.AddToCart(pdata[0], "something"));
      dispatch(
        UiSlice.shownotificationbar({
          active: true,
          msg: `${pdata[0].name} Added to Cart Successfully`,
          path: "/cart",
          pathname: "Check The Product in Cart",
        })
      );
    } else {
      dispatch(
        UiSlice.shownotificationbar({
          active: true,
          msg: `You are Not logged in`,
          path: "/",
          pathname: "Login To Enjoy Shopping",
        })
      );
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Pagination pagename={"Product Details"} />
      {pdata.length === 0 && <LoadingSpinner message="Product Not Available" />}
      {pdata.length > 0 && (
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 shadow-md rounded-lg">
              <img
                src={`https://source.unsplash.com/600x400/?${pdata.name},category:${pdata.category}`}
                alt="Product "
                className="w-full h-auto mb-4"
              />
              <h2 className="text-lg font-bold mb-2">{pdata[0].name}</h2>
              <p className="text-gray-600 mb-2">₹ {pdata[0].price}</p>
              <p className="text-gray-600 mb-2">Brand: {pdata[0].brand}</p>
              <p className="text-gray-600 mb-4">{pdata[0].description}</p>
              <h3 className="text-lg font-bold mb-2">Features</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                {pdata[0].features.map((fea) => {
                  return <li key={fea}>{fea}</li>;
                })}
              </ul>
              <p className="text-gray-600 mb-2">
                Availability:{" "}
                {pdata[0].availability.inStock ? "In Stock" : " Out Of Stock "}
              </p>
              {pdata[0].availability.inStock &&
                pdata[0].availability.quantity > 0 && (
                  <button
                    onClick={OnAddToCartHandler}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add to Cart
                  </button>
                )}
              {pdata[0].availability.quantity === 0 && (
                <button className="bg-gray-500 cursor-not-allowed hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Out Of Stock
                </button>
              )}
            </div>
            <div className="bg-white p-4 shadow-md rounded-lg col-span-2">
              <ProductAvailability quantity={pdata[0].availability.quantity} />
              <h3 className="text-lg font-bold mb-2">Reviews</h3>

              {pdata[0].reviews.length > 0 && (
                <div className=" border-gray-300 p-4 rounded-lg flex flex-col flex-nowrap my-auto ">
                  {pdata[0].reviews.map((Review, index) => {
                    return (
                      <div className="mb-4 shadow-lg rounded-xl bg-white p-4" key={index}>
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 bg-gray-400 rounded-full mr-2">
                            <img
                              src="https://img.lovepik.com/free-png/20210926/lovepik-cartoon-customer-service-avatar-png-image_401451024_wh1200.png"
                              alt="profile here"
                              className="rounded-full"
                            />
                          </div>
                          <div className="text-gray-700 font-bold">
                            {Review.username}
                          </div>
                        </div>
                        <div className="flex items-center mt-4">
                          {Array.from({
                            length: Math.floor(Review.rating),
                          }).map((_, i) => {
                            return (
                              <svg
                                className="text-yellow-400 fill-current"
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
                                className="text-gray-300 fill-current"
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
                        {Review.image.length > 0 && (
                          <>
                            <div className="text-start mt-4">
                              <p className="text-gray-500">Images</p>
                            </div>
                            <div
                              className="flex justify-start items-center w-full"
                              
                            >
                              <img
                                src={Review.image}
                                alt="Product Details"
                                className="h-12 w-14 hover:h-full hover:w-full"
                                onMouseEnter={() => openModal(Review.image)}
                              // onMouseLeave={closeModal}
                              />
                              {isModalOpen && (
                                <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
                                  <img
                                    src={modalImage}
                                    alt="Product Details"
                                    className="max-w-screen-xl max-h-screen p-4"
                                    onMouseLeave={closeModal}
                                  />
                                </div>
                              )}
                            </div>
                          </>
                        )}
                        <p className="text-gray-600 mt-2">{Review.comment}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              {pdata[0].reviews.length === 0 && <h1>No Review</h1>}
              <ReviewForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
