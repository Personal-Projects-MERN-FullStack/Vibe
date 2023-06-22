import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../store/auth-handler";
import { UiSlice } from "../store/ui-slice";
import {
  GetOrders,
  UpdateAderssesLocal,
  UploadCart,
  updateCartItems,
} from "../store/Actions/proudct-action";
import { pd } from "../store/Product-handler";

const useLoading = () => {
  const dispatch = useDispatch();
  const authed = useSelector((state) => state.auth.auth);
  const cart = useSelector((state) => state.product.cart);
  const [ucart, setucart] = useState(false);
  useEffect(() => {
    setucart(true);
    const authtoken = localStorage.getItem("authtoken");
    const user = localStorage.getItem("user");

    if (authtoken) {
      dispatch(UiSlice.loginmodel(false));
      dispatch(auth.setuser(JSON.parse(user)));
      dispatch(auth.Login());

      dispatch(
        UiSlice.shownotificationbar({
          active: true,
          msg: "Logged In Welcome Back",
          path: "/",
          pathname: "Enjoy Shopping",
        })
      );
    } else {
      dispatch(auth.Logout());
    }
  }, [dispatch]);
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (authed) {
      dispatch(GetOrders(JSON.parse(user)));
      dispatch(updateCartItems(JSON.parse(user)));
      dispatch(UpdateAderssesLocal(JSON.parse(user)));
    }
  }, [authed, dispatch]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (ucart && authed) {
      const userp = JSON.parse(user);

      dispatch(UploadCart(userp, cart));
    }
  }, [cart, dispatch, authed]);
  useEffect(() => {
    if (!authed) {
      dispatch(pd.clearorders());
      dispatch(pd.ClearCart());
      dispatch(pd.ClearAddress());
    }
  }, [authed, dispatch]);
};

export default useLoading;
