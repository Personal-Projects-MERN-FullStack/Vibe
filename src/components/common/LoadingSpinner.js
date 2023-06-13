import React from "react";

const LoadingSpinner = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <svg
          className="animate-spin h-12 w-12 mx-auto mb-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm10-9.582A7.962 7.962 0 0120 12h-4c0-3.042-1.135-5.824-3-7.938l3 1.647z"
          ></path>
        </svg>
        <h2 className="text-lg text-gray-700 font-bold">{message}...</h2>
      </div>
    </div>
  );
};

export default LoadingSpinner;
