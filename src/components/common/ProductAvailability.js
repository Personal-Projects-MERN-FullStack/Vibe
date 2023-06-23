import React from "react";

const ProductAvailability = ({ quantity }) => {
  const availabilityPercentage = (quantity / 100) * 100; // Calculate availability percentage
  let availabilityState = "";

  if (quantity === 0) {
    availabilityState = "Out of Stock";
  } else if (quantity < 20) {
    availabilityState = "Stock Low";
  } else {
    availabilityState = "Buy Early";
  }

  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Product Availability</h1>

        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div className="h-2 bg-gray-300 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${availabilityPercentage}%` }}
              ></div>
            </div>
          </div>
          <p className="ml-4 text-gray-500">{availabilityPercentage.toFixed(2)}% Available</p>
        </div>

        <p className="mt-4 text-center">{availabilityState}</p>
      </div>
    </div>
  );
};

export default ProductAvailability;
