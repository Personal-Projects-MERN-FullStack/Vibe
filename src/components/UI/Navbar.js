import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { UiSlice } from "../../store/ui-slice";
import { pd } from "../../store/Product-handler";
import { auth } from "../../store/auth-handler";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authticated = useSelector((state) => state.auth.auth);
  const searchcontent = useSelector((state) => state.ui.search);
  const cart = useSelector((state) => state.product.cart.length);
  useEffect(() => {
    onsearchhandlerfun(searchcontent);
  }, [searchcontent]);

  const onsearchhandlerfun = (value) => {
    if (value.length > 0) {
      navigate(`/product-search/${value}`);
      dispatch(pd.SearchedProducts(value));
      dispatch(UiSlice.updatesearchcontent(value));
    } else {
      navigate("/");
    }
  };

  const onsearchhandler = (event) => {
    onsearchhandlerfun(event.target.value);
  };

  const oncartbuttonhandler = () => {
    if (!authticated) {
      dispatch(
        UiSlice.shownotificationbar({
          active: true,
          msg: `You are Not Logged in`,
          path: "/",
          pathname: "login to see cart",
        })
      );
    }
    dispatch(UiSlice.cartchange());
  };
  const onloginclickhandler = () => {
    dispatch(UiSlice.loginmodel());
  };
  const onlogouthandler = () => {
    dispatch(auth.Logout());
  };
  const onprofilebuttonchangehandler = ()=>{
    dispatch(UiSlice.profilechange())
  }
  return (
    <nav className="bg-gray-800 ">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            {/* <img src="vibe.jpg" alt="logo here" className="w-full h-full"/> */}
            <div href="s" className="text-white text-lg font-semibold">
              <Link to="/">Vibe</Link>
            </div>
          </div>

          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="w-full max-w-sm">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute  inset-y-0 left-0 pl-3 flex items-center justify-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.586,13.586 L18,17 L17,18 L13.586,14.586 C12.823,15.192 11.927,15.5 11,15.5 C8.51472,15.5 6.5,13.4853 6.5,11 C6.5,8.51472 8.51472,6.5 11,6.5 C13.4853,6.5 15.5,8.51472 15.5,11 C15.5,11.927 15.192,12.823 14.586,13.586 ZM11,14 C12.657,14 14,12.657 14,11 C14,9.343 12.657,8 11,8 C9.343,8 8,9.343 8,11 C8,12.657 9.343,14 11,14 Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:ring-blue-200 focus:ring-2 sm:text-sm"
                  type="search"
                  onChange={onsearchhandler}
                  placeholder="Search Products"
                />
              </div>
            </div>
          </div>

          <div className="flex lg:ml-4">
            {!authticated && (
              <div
                onClick={onloginclickhandler}
                className="text-gray-300 hover:bg-gray-700 flex justify-center items-center cursor-pointer hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </div>
            )}
            {authticated && (
              <>
                <div
                  onClick={onlogouthandler}
                  className="text-gray-300 hover:bg-gray-700 flex justify-center items-center cursor-pointer hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </div>
                <div className="relative">
                  <button
                    className="flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-2xl font-medium"
                    onClick={onprofilebuttonchangehandler}
                  >
                    <CgProfile />
                  </button>
                </div>
              </>
            )}
            <div className="relative">
              <button
                className="flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-2xl font-medium"
                onClick={oncartbuttonhandler}
              >
                <AiOutlineShoppingCart />
              </button>

              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cart}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
