import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./store/auth-handler";
import { UiSlice } from "./store/ui-slice";

function App() {
  
  const authtoken = useSelector((state) => state.auth.authtoken);
  const dispatch = useDispatch();
 
  useEffect(() => {
    const authtoken = localStorage.getItem("authtoken");

    if (authtoken) {
      dispatch(UiSlice.loginmodel(false))
      dispatch(auth.Login())
      dispatch(
        UiSlice.shownotificationbar({
          active: true,
          msg: "Logged In Welcome Back",
          path: "/",
          pathname: "Enjoy Shopping",
        })
      );
    } else {
      dispatch(auth.Logout())
    }
  }, [dispatch]);



  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
