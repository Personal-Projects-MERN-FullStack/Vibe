import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../store/auth-handler";
import { UiSlice } from "../store/ui-slice";
import {
  UpdateAderssesLocal,
  UploadCart,
  updateCartItems,
} from "../store/Actions/proudct-action";
import { pd } from "../store/Product-handler";

const useLoading = () => {
  const apiurl = process.env.REACT_APP_API_KEY;

    const dispatch = useDispatch();
    const authed = useSelector((state) => state.auth.auth);
    const cart = useSelector((state) => state.product.cart);
    const [ucart, setucart] = useState(false);
    useEffect(() => {
      setucart(true);
      const authtoken = localStorage.getItem("authtoken");
      const user = localStorage.getItem("user");
      const fetchData = async () => {
        // Perform your data fetching logic here
        const response = await fetch(`${apiurl}/product/products`);
        const data = await response.json();
        console.log(data)
        dispatch(pd.setproducts(data))
        
      };
      fetchData()
    
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
  
      dispatch(updateCartItems(JSON.parse(user)));
      dispatch(UpdateAderssesLocal(JSON.parse(user)));
    }, [authed, dispatch]);
  
    useEffect(() => {
      const user = localStorage.getItem("user");
      if (ucart) {
        const userp = JSON.parse(user);
  
        dispatch(UploadCart(userp, cart));
      }
    }, [cart, dispatch, authed]);
    useEffect(() => {
      if (!authed) {
        dispatch(pd.ClearCart());
        dispatch(pd.ClearAddress());
      }
    }, [authed, dispatch]);
};

export default useLoading;
