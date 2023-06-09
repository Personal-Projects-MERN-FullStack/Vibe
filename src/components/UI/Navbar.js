import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from "react-router-dom";
const Navbar = () => {
  const authticated = useSelector(state => state.auth.auth)
  const onsearchhandler = (event) => {
    if (event.keyCode === 13) {
      alert("fuck you");
    }
  };
  return (
    <nav class="bg-gray-800 ">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex-shrink-0">
          <a href="s" class="text-white text-lg font-semibold">
            Vibe
          </a>
        </div>

        <div class="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
          <div class="w-full max-w-sm">
            <label for="search" class="sr-only">
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14.586,13.586 L18,17 L17,18 L13.586,14.586 C12.823,15.192 11.927,15.5 11,15.5 C8.51472,15.5 6.5,13.4853 6.5,11 C6.5,8.51472 8.51472,6.5 11,6.5 C13.4853,6.5 15.5,8.51472 15.5,11 C15.5,11.927 15.192,12.823 14.586,13.586 ZM11,14 C12.657,14 14,12.657 14,11 C14,9.343 12.657,8 11,8 C9.343,8 8,9.343 8,11 C8,12.657 9.343,14 11,14 Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="search"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:ring-blue-200 focus:ring-2 sm:text-sm"
                placeholder="Search"
                type="search"
                onKeyDown={onsearchhandler}
              />
            </div>
          </div>
        </div>

        <div class="flex lg:ml-4">
         {authticated &&  <div
            href="s"
            class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Logout
          </div>}
          <div
            href="s"
            class="ml-4  text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-2xl font-medium"
          >
            <Link to="/cart"><AiOutlineShoppingCart/></Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
