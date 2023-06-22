import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UiSlice } from "../../store/ui-slice";
import { LoginHanlder, SignupHandler } from "../../store/Actions/auth-action";

const Login = () => {
  const [loginpage, setloginpage] = useState(true);
  const error = useSelector((state) => state.ui.formerror);
  const auth = useSelector((state) => state.auth.auth);
  const [errormsg, seterrormsg] = useState();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(false);
    seterrormsg(error);
    setTimeout(() => {
      seterrormsg("");
    }, 5000);
  }, [error, auth]);

  const dispatch = useDispatch();

  const onclosehandler = () => {
    dispatch(UiSlice.loginmodel());
  };
  const OnModeChangeHandler = () => {
    setloginpage(!loginpage);
  };

  const OnLoginClickHandler = (event) => {
    event.preventDefault();
    setloading(true);
    const logindetails = {
      email: event.target.username.value,
      password: event.target.password.value,
    };
    dispatch(LoginHanlder(logindetails));
  };
  const OnSignUpClickHandler = (event) => {
    event.preventDefault();
    setloading(true);

    const fullname = event.target.fullname.value;
    const username = event.target.username.value;
    const password = event.target.password.value;

    const SignupDetails = {
      name: fullname,
      email: username,
      password: password,
    };

    dispatch(SignupHandler(SignupDetails));
  };

  if (!loading) {
    return (
      <div>
        <div
          id="loginModal"
          className="fixed inset-0 flex items-center justify-center  z-50 backdrop-blur-sm"
        >
          {loginpage && (
            <div className="bg-gray-100 p-8 mx-4 rounded shadow-md w-11/12 max-w-md">
              <h2 className="text-2xl mb-4 text-modal">Login </h2>
              <label
                className="block text-red-900 text-sm font-bold mb-2 text-modal"
                htmlFor="username"
              >
                {errormsg}
              </label>

              <form onSubmit={OnLoginClickHandler}>
                <div className="mb-4">
                  <label
                    className="block text-gray-900 text-md font-bold mb-2 text-modal"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="email"
                    // name="username"
                    className="appearance-none border-modal rounded w-full py-2 px-3 text-modal leading-tight focus:outline-none focus-modal"
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-900 text-md font-bold mb-2 text-modal"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="appearance-none border-modal rounded w-full py-2 px-3 text-modal leading-tight focus:outline-none focus-modal"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    id="loginSubmitBtn"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Login
                  </button>
                  <button
                    onClick={onclosehandler}
                    id="closeBtn"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Close
                  </button>
                </div>
                <div className="flex justfiy-center items-center">
                  <div>Don't have an Account ? </div>
                  <div
                    onClick={OnModeChangeHandler}
                    className="text-lg mx-2 text-blue-900 cursor-pointer font-semibold"
                  >
                    Singup
                  </div>
                </div>
              </form>
            </div>
          )}
          {!loginpage && (
            <div className="bg-gray-100 p-8 mx-4 rounded shadow-md w-11/12 max-w-md">
              <h2 className="text-2xl mb-4 text-modal">SignUp</h2>
              <label
                className="block text-red-900 text-sm font-bold mb-2 text-modal"
                htmlFor="username"
              >
                {errormsg}
              </label>
              <form onSubmit={OnSignUpClickHandler}>
                <div className="mb-4">
                  <label
                    className="block text-gray-900 text-md font-bold mb-2 text-modal"
                    htmlFor="fullname"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    className="appearance-none border-modal rounded w-full py-2 px-3 text-modal leading-tight focus:outline-none focus-modal"
                    placeholder="Enter your Full Name"
                    required
                  />
                  <label
                    className="block text-gray-900 text-md font-bold mb-2 text-modal"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="email"
                    className="appearance-none border-modal rounded w-full py-2 px-3 text-modal leading-tight focus:outline-none focus-modal"
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-900 text-md font-bold mb-2 text-modal"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="appearance-none border-modal rounded w-full py-2 px-3 text-modal leading-tight focus:outline-none focus-modal"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    id="loginSubmitBtn"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    SignUp
                  </button>
                  <button
                    onClick={onclosehandler}
                    id="closeBtn"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Close
                  </button>
                </div>
                <div className="flex justfiy-center items-center">
                  <div>Don't have an Account ? </div>
                  <div
                    onClick={OnModeChangeHandler}
                    className="text-lg mx-2 text-blue-900 cursor-pointer font-semibold"
                  >
                    Login
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div
          id="loginModal"
          className="fixed inset-0 flex items-center justify-center  z-50 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 text-gray-500 mr-3"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20a8 8 0 01-8-8H0c0 4.418 3.582 8 8 8v-4zm7-2.709A7.963 7.963 0 0120 12h-4c0 3.536-2.228 6.519-5.354 7.641l3 2.647z"
              ></path>
            </svg>
            <span>Loading...</span>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
