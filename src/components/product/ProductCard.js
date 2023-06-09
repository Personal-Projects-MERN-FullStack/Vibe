import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
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

  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg ">
      <Link to={`/product/${product.id}`}>
        <img
          src={`https://source.unsplash.com/800x600/?${name},,category:${category}`}
          alt="Product "
          class="w-full cursor-pointer "
        />
      </Link>
      <div class="px-6 py-4">
        <Link to={`/product/${product.id}`}>
         
          <div class="font-bold text-xl mb-2 cursor-pointer">{name}</div>
        </Link>
        <p class="text-gray-700 text-base mb-4">Categories: {category}</p>
        <p class="text-gray-700 text-base">₹ {price}</p>
        {reviews.length > 0 && (
          <div class="flex items-center mt-4">
            {Array.from({
              length: Math.floor(calculateAverageRating(product)),
            }).map((_, i) => {
              return (
                <svg
                  class="text-yellow-400 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  width="20"
                  height="20"
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
                  class="text-gray-300 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  width="20"
                  height="20"
                >
                  <path d="M10 12.585L3.293 16.45l1.777-6.017L.268 6.715l6.307-.533L10 0l3.425 6.182 6.307.533-4.802 3.718 1.777 6.017L10 12.585z" />
                </svg>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
