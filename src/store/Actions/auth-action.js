import { auth } from "../auth-handler";
import { UiSlice } from "../ui-slice";
const apiurl = process.env.REACT_APP_API_KEY;
console.log(apiurl);
export const LoginHanlder = (Logindata) => {
  return async (dispatch) => {
    const response = await fetch(`https://vibe-backend-83cg.onrender.com/auth/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Logindata),
    });
    const responseData = await response.json();
    if (!response.ok) {
      dispatch(UiSlice.setformerror(responseData.error));
    } else {
      dispatch(UiSlice.setformerror(""));
      localStorage.setItem("authtoken", responseData.authtoken);
      dispatch(
        UiSlice.shownotificationbar({
          active: true,
          msg: "Logged In Succefull",
          path: "/",
          pathname: "Enjoy Shopping",
        })
      );

      dispatch(auth.Login());

      dispatch(UiSlice.loginmodel(false));
    }
  };
};
export const SignupHandler = (SignUpdata) => {
  return async (dispatch) => {
    const response = await fetch(`https://vibe-backend-83cg.onrender.com/auth/CreateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(SignUpdata),
    });
    const responseData = await response.json();
    if (!response.ok) {
      dispatch(UiSlice.setformerror(responseData.error));
    } else {
      dispatch(UiSlice.setformerror(""));
      dispatch(UiSlice.loginmodel(false));
      dispatch(
        UiSlice.shownotificationbar({
          active: true,
          msg: "Logged In Succefull",
          path: "/",
          pathname: "Enjoy Shopping",
        })
      );
      localStorage.setItem("authtoken", responseData.authtoken);
      dispatch(auth.Login());
    }
  };
};
