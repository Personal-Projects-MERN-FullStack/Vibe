import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UiSlice } from "../../store/ui-slice";

const Notification = ({ ninfo }) => {
  const dispatch = useDispatch();
  setTimeout(() => {
    dispatch(
      UiSlice.shownotificationbar({
        active: false,
        msg: "",
        path: "",
        pathname: "",
      })
    );
  }, 5000);
  return (
    <div>
      {/* <div class="h-screen w-screen bg-gradient-to-br from-slate-100 to-slate-300 py-32"> */}
      <div class="bg-white/60 backdrop-blur-xl z-20 max-w-md fixed right-5 top-5 rounded-lg p-6 shadow">
        <h1 class="text-xl text-slate-700 font-medium">{ninfo.msg} 👋</h1>
        <div class="flex justify-between items-center">
          <a
            href="a"
            class="text-slate-500 hover:text-slate-700 text-sm inline-flex space-x-1 items-center"
          >
            <Link to={ninfo.path}>{ninfo.pathname}</Link>
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </a>
        </div>
      </div>

      {/* </div> */}
    </div>
  );
};

export default Notification;
