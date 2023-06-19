import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { pd } from "../../store/Product-handler";
import { UiSlice } from "../../store/ui-slice";
const ProductCard = ({ product, addtocart }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state=>state.auth.auth)
  const { name, category, reviews, price } = product;
  function calculateAverageRating(product) {
    if (!product.reviews || product.reviews.length === 0) {
      return 0;
    }

    const totalRatings = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRatings / product.reviews.length;

    return averageRating;
  }
  const OnAddToCartHandler = () => {
    if(auth){
      dispatch(pd.AddToCart(product));
    dispatch(
      UiSlice.shownotificationbar({
        active: true,
        msg: `${product.name} Added to Cart Succefully`,
        path: "/cart",
        pathname: "Chekout The Product on Cart",
      })
    );
    }else{
      dispatch(
        UiSlice.shownotificationbar({
          active: true,
          msg: `You are Not Logged In`,
          path: "/",
          pathname: "Login First",
        }))
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg ">
      <Link to={`/product/${product.id}`}>
        <img
          src={`https://source.unsplash.com/400x200/?${name},,category:${category}`}
          alt="Product "
          className="w-full cursor-pointer "
        />
      </Link>
      <div className="px-6 py-4">
        <Link to={`/product/${product.id}`}>
          <div className="font-bold text-xl mb-2 cursor-pointer">{name}</div>
        </Link>
        <p className="text-gray-700 text-base mb-4">Categories: {category}</p>
        <p className="text-gray-700 text-base">₹ {price}</p>
        {reviews.length > 0 && (
          <div className="flex items-center mt-4">
            {Array.from({
              length: Math.floor(calculateAverageRating(product)),
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
              length: 5 - Math.floor(calculateAverageRating(product)),
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
        )}
        {addtocart && (
          <div>
            {product.availability.inStock && (
              <button
                onClick={OnAddToCartHandler}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add to Cart
              </button>
            )}
            {!product.availability.inStock && (
              <button className="bg-gray-500 cursor-not-allowed hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Out Of Stock
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
