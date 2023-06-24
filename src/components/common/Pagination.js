import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ pagename }) => {
  return (
    <div class="flex items-center justify-start px-4 py-3 bg-gray-200">
     
        <div>
        <Link to="/" className="text-blue-900">
          <svg
            class="w-6 h-6 text-blue-600 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M9 19v-6h6v6h5v-8h3L12 3 1 11h3v8z" />
          </svg>
          </Link>
        </div>
      
      <div class="text-gray-600 ">>{pagename}</div>
    </div>
  );
};

export default Pagination;
