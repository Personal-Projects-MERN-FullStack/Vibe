import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UiSlice } from "../../store/ui-slice";
import { LoginHanlder, SignupHandler } from "../../store/Actions/auth-action";

const Login = () => {
  const [loginpage, setloginpage] = useState(true);
  const dispatch = useDispatch();
  const onclosehandler = () => {
    dispatch(UiSlice.loginmodel());
  };
  const OnModeChangeHandler = () => {
    setloginpage(!loginpage);
  };

  const OnLoginClickHandler = (event) => {
    event.preventDefault();
    const logindetails = {
      "email":event.target.username.value,
      "password":event.target.password.value
    }
    dispatch(LoginHanlder(logindetails));
  };
  const OnSignUpClickHandler = (event) => {
    event.preventDefault();
  
    const fullname = event.target.fullname.value;
    const username = event.target.username.value;
    const password = event.target.password.value;
  
    const SignupDetails = {
      name: fullname,
      email: username,
      password: password,
    };
  
    dispatch(SignupHandler(SignupDetails))
  };
  
  
  return (
    <div>
      <div
        id="loginModal"
        class="fixed inset-0 flex items-center justify-center  z-50 backdrop-blur-sm"
      >
        {loginpage && (
          <div class="bg-gray-100 p-8 mx-4 rounded shadow-md w-11/12 max-w-md">
            <h2 class="text-2xl mb-4 text-modal">Login </h2>
            <form onSubmit={OnLoginClickHandler}>
              <div class="mb-4">
                <label
                  class="block text-gray-900 text-md font-bold mb-2 text-modal"
                  for="username"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="email"
                  // name="username"
                  class="appearance-none border-modal rounded w-full py-2 px-3 text-modal leading-tight focus:outline-none focus-modal"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-900 text-md font-bold mb-2 text-modal"
                  for="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  class="appearance-none border-modal rounded w-full py-2 px-3 text-modal leading-tight focus:outline-none focus-modal"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div class="flex items-center justify-between">
                <button
                  id="loginSubmitBtn"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Login
                </button>
                <button
                  onClick={onclosehandler}
                  id="closeBtn"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
          <div class="bg-gray-100 p-8 mx-4 rounded shadow-md w-11/12 max-w-md">
            <h2 class="text-2xl mb-4 text-modal">SignUp</h2>
            <form onSubmit={OnSignUpClickHandler}>
              <div class="mb-4">
                <label
                  class="block text-gray-900 text-md font-bold mb-2 text-modal"
                  for="fullname"
                >
                  Full Name
                </label>
                <input
                  id="fullname"
                  type="text"
                  class="appearance-none border-modal rounded w-full py-2 px-3 text-modal leading-tight focus:outline-none focus-modal"
                  placeholder="Enter your Full Name"
                  required
                />
                <label
                  class="block text-gray-900 text-md font-bold mb-2 text-modal"
                  for="username"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="email"
                  class="appearance-none border-modal rounded w-full py-2 px-3 text-modal leading-tight focus:outline-none focus-modal"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-900 text-md font-bold mb-2 text-modal"
                  for="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  class="appearance-none border-modal rounded w-full py-2 px-3 text-modal leading-tight focus:outline-none focus-modal"
                  placeholder="Enter your password"
                  required
                />
              </div>
             
              <div class="flex items-center justify-between">
                <button
                
                  id="loginSubmitBtn"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  SignUp
                </button>
                <button
                  onClick={onclosehandler}
                  id="closeBtn"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
};

export default Login;
